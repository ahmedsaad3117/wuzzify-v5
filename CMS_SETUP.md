# Wuzzify v5 — Articles CMS

A standalone CMS for the **مقالات (Articles)** section: a NestJS + PostgreSQL
backend and a custom admin dashboard inside the Next.js app.

```
wuzzify-v5/
├── backend/            ← NestJS + PostgreSQL + JWT API (port 4001)
└── nextjs/
    ├── app/[locale]/articles/        ← public مقالات pages (list + detail)
    └── app/admin/                    ← custom admin dashboard (login + CRUD)
```

## 1. Database

Create a PostgreSQL database, e.g.:

```sql
CREATE DATABASE wuzzify_v5;
```

## 2. Backend (`backend/`)

```bash
cd backend
cp .env.example .env          # set DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run start:dev
```

- Runs at `http://localhost:4001/api/v1`.
- With `DB_SYNC=true` the schema is created automatically and the admin user is
  seeded from `ADMIN_EMAIL` / `ADMIN_PASSWORD` on first boot.
- For production, set `DB_SYNC=false` and run `backend/migrations/0001_init.sql`.

See [backend/README.md](backend/README.md) for the full API reference.

## 3. Frontend (`nextjs/`)

```bash
cd nextjs
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_BASE_URL (defaults to :4001)
npm install
npm run dev
```

- Public articles: `http://localhost:3000/articles` (Arabic) and
  `http://localhost:3000/en/articles` (English).
- Admin dashboard: `http://localhost:3000/admin` — log in with the seeded admin
  credentials. Create / edit / publish / delete articles (bilingual, rich text).

Make sure the backend's `CORS_ORIGINS` includes the Next.js origin
(`http://localhost:3000`).

## Production deployment

For deploying both services to an Ubuntu/Debian server (PM2 + Nginx + Let's
Encrypt), see [deploy/DEPLOY.md](deploy/DEPLOY.md). In short:

```bash
cp deploy/deploy.env.example deploy/deploy.env   # set domains, DB, secrets
sudo bash deploy/setup-server.sh                 # install Node/Postgres/PM2/Nginx/Certbot + DB
bash deploy/deploy.sh                            # build + migrate + PM2 + Nginx + TLS
```

## How it fits together

- The public pages are **server components** that fetch published articles from
  the backend (`GET /articles`, `/articles/by-slug/:slug`) with 60s ISR.
- The admin dashboard is a **client app** under `/admin` (excluded from the
  next-intl middleware). It stores the JWT in a cookie and calls the
  JWT-protected admin endpoints (`/articles/admin/*`).
- Articles are bilingual: Arabic fields are required, English fields optional.
  The public site shows the English variant on `/en/*` when present, otherwise
  falls back to Arabic.

## Note on the static `index.html`

The unified `index.html` / `privacy.html` are static and have no server runtime,
so the dynamic, CMS-managed مقالات section lives in the Next.js app. If you also
want a static articles page, it would need to fetch the API client-side; tell me
and I can add a `articles.html` that does that.
