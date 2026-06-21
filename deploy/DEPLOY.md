# Wuzzify v5 — Server Deployment (Ubuntu/Debian · PM2 · Nginx · Let's Encrypt)

Deploys both services natively on one host:

- **Frontend** (Next.js) → PM2 app on `127.0.0.1:3000`, served by Nginx at `https://DOMAIN`
- **Backend** (NestJS) → PM2 app on `127.0.0.1:4001`, served by Nginx at `https://API_DOMAIN`
- **MySQL** on the same host

The backend gets its own subdomain so the frontend's own `/api/contact` route
doesn't collide with the NestJS API.

```
deploy/
├── deploy.env.example   ← copy to deploy.env and fill in
├── setup-server.sh      ← run ONCE as root: installs everything + DB
├── deploy.sh            ← build + migrate + PM2 + Nginx + TLS (run as APP_USER)
└── ecosystem.config.js  ← PM2 process definitions
```

## Prerequisites

1. An Ubuntu/Debian server with a sudo-capable non-root user (the `APP_USER`).
2. DNS **A records** already pointing to the server's public IP for:
   - `DOMAIN` (e.g. `example.com`) and optionally `www.DOMAIN`
   - `API_DOMAIN` (e.g. `api.example.com`)
3. The repository checked out on the server (e.g. `/home/deploy/wuzzify-v5`).

## Steps

```bash
# 0) Get the code onto the server
git clone <your-repo> wuzzify-v5 && cd wuzzify-v5

# 1) Configure
cp deploy/deploy.env.example deploy/deploy.env
nano deploy/deploy.env        # set domains, email, DB password, JWT secret, admin creds

# 2) Provision the server (installs Node, MySQL, PM2, Nginx, Certbot; creates DB)
sudo bash deploy/setup-server.sh

# 3) Build + deploy everything (run as your APP_USER, NOT root)
bash deploy/deploy.sh
```

When it finishes:

- Site: `https://DOMAIN`
- Articles: `https://DOMAIN/articles`
- Admin: `https://DOMAIN/admin` (log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- API health: `https://API_DOMAIN/api/v1/health`

## Day-to-day

```bash
git pull
bash deploy/deploy.sh build     # reinstall, rebuild, migrate, reload PM2
bash deploy/deploy.sh restart   # just reload the running apps
bash deploy/deploy.sh nginx     # re-render + reload Nginx
bash deploy/deploy.sh tls       # obtain/renew certificates
bash deploy/deploy.sh status    # pm2 status
bash deploy/deploy.sh logs      # tail logs
```

`deploy.sh` (no argument) runs the full pipeline: backend build + DB migration,
frontend build, PM2 start/reload, Nginx config, and certificate issuance.

## Notes & gotchas

- **Run order matters once:** `setup-server.sh` (as root) → then `deploy.sh`
  (as the app user). `deploy.sh` refuses to run as root and uses `sudo` only for
  Nginx/Certbot.
- **Secrets:** `deploy/deploy.env` holds passwords and is git-ignored. The script
  writes `backend/.env` and `nextjs/.env.production` from it on every deploy.
- **`NEXT_PUBLIC_API_BASE_URL`** is baked into the frontend at build time
  (`https://API_DOMAIN/api/v1`), so the browser admin dashboard talks to the API
  over HTTPS. Change the domain → rebuild (`deploy.sh build`).
- **Admin user** is seeded automatically on the backend's first boot from
  `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Change the password afterwards by updating the
  DB (or re-seed with a fresh email).
- **DB schema** is applied from `backend/migrations/0001_init.sql` (idempotent);
  production runs with `DB_SYNC=false`.
- **Cert auto-renewal** is handled by the system `certbot.timer` (installed with
  certbot). Verify with `systemctl list-timers | grep certbot`.
- **Line endings:** these are shell scripts — keep LF endings (a `.gitattributes`
  enforces it). If you copied them via Windows and they fail with `\r` errors,
  run `sed -i 's/\r$//' deploy/*.sh`.
- If a password contains URL-special characters (`@ : / ?`), URL-encode it in the
  generated `DATABASE_URL`, or keep DB passwords alphanumeric.
