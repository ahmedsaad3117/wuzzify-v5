#!/usr/bin/env bash
# ============================================================================
# Wuzzify v5 — build & deploy (run as the APP_USER, NOT root)
#
#   bash deploy/deploy.sh            # full deploy: build + migrate + pm2 + nginx + tls
#   bash deploy/deploy.sh build      # only install deps, build, migrate, (re)start pm2
#   bash deploy/deploy.sh restart    # only restart the pm2 apps
#   bash deploy/deploy.sh nginx      # only (re)write + reload the Nginx configs
#   bash deploy/deploy.sh tls        # only obtain/renew Let's Encrypt certs
#   bash deploy/deploy.sh status     # pm2 status
#   bash deploy/deploy.sh logs       # tail pm2 logs
#
# Prereq: run `sudo bash deploy/setup-server.sh` once first.
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/nextjs"
ENV_FILE="$SCRIPT_DIR/deploy.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: ${ENV_FILE} not found. Run: cp deploy.env.example deploy.env && edit it." >&2
  exit 1
fi
set -a; . "$ENV_FILE"; set +a

if [ "$(id -u)" -eq 0 ]; then
  echo "ERROR: run deploy.sh as the application user (not root). It uses sudo where needed." >&2
  exit 1
fi

log()  { echo -e "\n\033[1;36m==> $*\033[0m"; }
need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing '$1'. Run setup-server.sh first." >&2; exit 1; }; }

# ── npm install helper: prefer reproducible `npm ci`, fall back to install ──
install_deps() {
  if [ -f package-lock.json ]; then npm ci; else npm install; fi
}

# ── Backend: env, deps, build, migrate ─────────────────────────────────────
deploy_backend() {
  need node; need mysql
  log "Writing backend .env"
  cat > "$BACKEND_DIR/.env" <<EOF
PORT=${BACKEND_PORT}
NODE_ENV=production
CORS_ORIGINS=https://${DOMAIN}$([ "${INCLUDE_WWW:-false}" = "true" ] && echo ",https://www.${DOMAIN}")
DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
DB_SSL=${DB_SSL:-false}
DB_SYNC=false
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
ADMIN_EMAIL=${ADMIN_EMAIL}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
ADMIN_NAME=${ADMIN_NAME}
ARTICLES_API_KEY=${ARTICLES_API_KEY:-}
N8N_WEBHOOK_URL=${N8N_WEBHOOK_URL:-}
N8N_CALLBACK_TOKEN=${N8N_CALLBACK_TOKEN:-}
CHAT_CALLBACK_URL=https://${API_DOMAIN}/api/v1/chat/callback
CHAT_SESSION_TTL_MIN=120
EOF

  log "Installing backend dependencies"
  ( cd "$BACKEND_DIR" && install_deps )

  log "Building backend (nest build)"
  ( cd "$BACKEND_DIR" && npm run build )

  log "Applying database migrations"
  MYSQL_PWD="$DB_PASSWORD" mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" \
    < "$BACKEND_DIR/migrations/0001_init.sql"
}

# ── Frontend: env, deps, build ─────────────────────────────────────────────
deploy_frontend() {
  need node
  log "Writing frontend .env.production"
  cat > "$FRONTEND_DIR/.env.production" <<EOF
NEXT_PUBLIC_API_BASE_URL=https://${API_DOMAIN}/api/v1
TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN:-}
TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID:-}
EOF

  log "Installing frontend dependencies"
  ( cd "$FRONTEND_DIR" && install_deps )

  log "Building frontend (next build)"
  ( cd "$FRONTEND_DIR" && npm run build )
}

# ── PM2 ────────────────────────────────────────────────────────────────────
pm2_up() {
  need pm2
  log "Starting/reloading PM2 apps"
  FRONTEND_PORT="$FRONTEND_PORT" pm2 startOrReload "$SCRIPT_DIR/ecosystem.config.js" --update-env
  pm2 save
}

# ── Nginx ──────────────────────────────────────────────────────────────────
configure_nginx() {
  need nginx
  log "Writing Nginx site configs"

  local proxy_common
  proxy_common=$(cat <<'NG'
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 60s;
NG
)

  local fe_names="${DOMAIN}"
  [ "${INCLUDE_WWW:-false}" = "true" ] && fe_names="${DOMAIN} www.${DOMAIN}"

  sudo tee /etc/nginx/sites-available/wuzzify-frontend.conf >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${fe_names};

    location / {
        proxy_pass http://127.0.0.1:${FRONTEND_PORT};
${proxy_common}
    }
}
EOF

  sudo tee /etc/nginx/sites-available/wuzzify-backend.conf >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${API_DOMAIN};

    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:${BACKEND_PORT};
${proxy_common}
    }
}
EOF

  sudo ln -sf /etc/nginx/sites-available/wuzzify-frontend.conf /etc/nginx/sites-enabled/wuzzify-frontend.conf
  sudo ln -sf /etc/nginx/sites-available/wuzzify-backend.conf  /etc/nginx/sites-enabled/wuzzify-backend.conf
  [ -e /etc/nginx/sites-enabled/default ] && sudo rm -f /etc/nginx/sites-enabled/default

  log "Testing and reloading Nginx"
  sudo nginx -t
  sudo systemctl reload nginx
}

# ── Let's Encrypt ──────────────────────────────────────────────────────────
configure_tls() {
  need certbot
  log "Obtaining/renewing TLS certificates"
  local args="-d ${DOMAIN}"
  [ "${INCLUDE_WWW:-false}" = "true" ] && args="$args -d www.${DOMAIN}"
  args="$args -d ${API_DOMAIN}"
  # shellcheck disable=SC2086
  sudo certbot --nginx --non-interactive --agree-tos --keep-until-expiring \
    -m "${LETSENCRYPT_EMAIL}" $args --redirect
}

# ── Dispatcher ─────────────────────────────────────────────────────────────
case "${1:-all}" in
  all)
    deploy_backend
    deploy_frontend
    pm2_up
    configure_nginx
    configure_tls
    log "Deploy complete →  https://${DOMAIN}   (admin: https://${DOMAIN}/admin)"
    ;;
  build)    deploy_backend; deploy_frontend; pm2_up ;;
  restart)  need pm2; FRONTEND_PORT="$FRONTEND_PORT" pm2 reload "$SCRIPT_DIR/ecosystem.config.js" --update-env || pm2_up ;;
  nginx)    configure_nginx ;;
  tls)      configure_tls ;;
  status)   need pm2; pm2 status ;;
  logs)     need pm2; pm2 logs ;;
  *) echo "Usage: $0 [all|build|restart|nginx|tls|status|logs]" >&2; exit 1 ;;
esac
