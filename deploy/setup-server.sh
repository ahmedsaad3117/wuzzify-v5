#!/usr/bin/env bash
# ============================================================================
# Wuzzify v5 — server provisioning (run ONCE, as root)
#
#   sudo bash deploy/setup-server.sh
#
# Installs Node.js, MySQL, PM2, Nginx, Certbot and the firewall, then
# creates the database + user. Idempotent: safe to re-run.
# ============================================================================
set -euo pipefail

# --- Load config ------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/deploy.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: ${ENV_FILE} not found. Run: cp deploy.env.example deploy.env && edit it." >&2
  exit 1
fi
set -a; . "$ENV_FILE"; set +a

if [ "$(id -u)" -ne 0 ]; then
  echo "ERROR: run this script as root (sudo)." >&2
  exit 1
fi

log() { echo -e "\n\033[1;35m==> $*\033[0m"; }

export DEBIAN_FRONTEND=noninteractive

# --- Base packages ----------------------------------------------------------
log "Updating apt and installing base packages"
apt-get update -y
apt-get install -y ca-certificates curl gnupg git build-essential ufw

# --- Node.js (NodeSource) ---------------------------------------------------
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | sed 's/v\([0-9]*\).*/\1/')" -lt "${NODE_MAJOR}" ]; then
  log "Installing Node.js ${NODE_MAJOR}.x"
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
else
  log "Node.js already present: $(node -v)"
fi

# --- PM2 --------------------------------------------------------------------
if ! command -v pm2 >/dev/null 2>&1; then
  log "Installing PM2 globally"
  npm install -g pm2
else
  log "PM2 already present: $(pm2 -v)"
fi

# --- Nginx + Certbot --------------------------------------------------------
log "Installing Nginx and Certbot"
apt-get install -y nginx certbot python3-certbot-nginx
systemctl enable --now nginx


log "Creating database and user (idempotent)"
# Fresh MySQL on Ubuntu uses auth_socket for root, so `mysql` works for root here.
mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
ALTER USER '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

# --- Firewall ---------------------------------------------------------------
log "Configuring UFW firewall (OpenSSH + Nginx)"
ufw allow OpenSSH || true
ufw allow 'Nginx Full' || true
yes | ufw enable || true

# --- PM2 startup for the app user -------------------------------------------
APP_HOME="$(getent passwd "${APP_USER}" | cut -d: -f6)"
if [ -n "${APP_HOME}" ]; then
  log "Enabling PM2 startup on boot for user ${APP_USER}"
  env PATH="$PATH:/usr/bin" pm2 startup systemd -u "${APP_USER}" --hp "${APP_HOME}" || true
else
  echo "WARNING: user '${APP_USER}' not found — create it and re-run, or set APP_USER in deploy.env." >&2
fi

log "Provisioning complete."
echo "Next: switch to the '${APP_USER}' user and run:  bash deploy/deploy.sh"
