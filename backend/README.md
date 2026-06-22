# Wuzzify v5 — CMS Backend

Standalone REST API that powers the **مقالات (Articles)** section of the Wuzzify v5
site. Bilingual (Arabic / English) articles with a draft → published workflow and a
JWT-protected admin surface for the custom admin dashboard.

## Stack

- NestJS 10
- MySQL 8 (TypeORM + mysql2)
- JWT auth (`@nestjs/jwt`) + bcrypt password hashing
- `class-validator` DTO validation, Helmet, CORS

## Base URL

```
http://localhost:4001/api/v1
```

## Endpoints

**Public**

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Liveness check |
| GET | `/articles?limit=&offset=` | List **published** articles (newest first) |
| GET | `/articles/by-slug/:slug` | Single published article |

**Auth**

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/login` | `{ email, password }` → `{ token, admin }` |
| GET | `/auth/me` | Current admin (Bearer token) |

**Admin** (all require `Authorization: Bearer <token>`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/articles/admin/all` | List all articles incl. drafts |
| GET | `/articles/admin/:id` | Get one by id |
| POST | `/articles/admin` | Create |
| PATCH | `/articles/admin/:id` | Update |
| DELETE | `/articles/admin/:id` | Delete |

**Chat** (n8n-backed live chat)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/chat/send` | Browser → `{ sessionId?, message }` → `{ sessionId }`. Forwards to n8n. |
| POST | `/chat/callback` | n8n → delivers the agent reply for a session (auth via token). |
| GET | `/chat/poll?sessionId=&after=` | Browser → agent replies newer than `after` → `{ messages, cursor }`. |

### Chat ↔ n8n contract

1. **Browser → backend:** `POST /chat/send`. The backend creates/refreshes a
   session (keyed by a `sessionId` the browser stores in a cookie) and records
   the visitor's IP.
2. **Backend → your n8n webhook** (`N8N_WEBHOOK_URL`), POST JSON:
   ```jsonc
   {
     "sessionId": "uuid",
     "ip": "203.0.113.7",
     "message": "the user's text",
     "timestamp": "2026-06-21T…Z",
     "callbackUrl": "https://api.example.com/api/v1/chat/callback",
     "callbackToken": "your N8N_CALLBACK_TOKEN"
   }
   ```
3. **n8n agent → backend callback:** when the agent has a reply, n8n calls
   `callbackUrl` with the token (header `x-callback-token` **or** body `token`):
   ```jsonc
   // POST {callbackUrl}   header: x-callback-token: <N8N_CALLBACK_TOKEN>
   { "sessionId": "uuid", "reply": "the agent's answer" }
   ```
   The `reply` field may instead be named `message`, `text`, or `output`.
4. **Browser polls** `GET /chat/poll` every couple of seconds and shows new
   agent replies for its session.

> If your n8n workflow ends with a **"Respond to Webhook"** node that returns
> `{ "reply": "…" }` synchronously, the backend will also show that immediately —
> so both async-callback and synchronous styles work.

Sessions are held in memory (single PM2 instance) and expire after
`CHAT_SESSION_TTL_MIN` minutes of inactivity.

### Article shape

```jsonc
{
  "id": "uuid",
  "slug": "my-first-article",
  "title_ar": "عنوان",
  "title_en": "Title",
  "excerpt_ar": "مقتطف",
  "excerpt_en": "Excerpt",
  "content_ar": "<p>HTML…</p>",
  "content_en": "<p>HTML…</p>",
  "cover_url": "https://…",
  "status": "draft | published",
  "published_at": "2026-06-21T…Z | null",
  "created_at": "…",
  "updated_at": "…"
}
```

`slug` is optional on create/update — if omitted it is derived from `title_ar`
(Arabic-safe) and de-duplicated automatically.

## Setup

```bash
cd backend
cp .env.example .env        # then edit DATABASE_URL, JWT_SECRET, ADMIN_*
npm install
npm run start:dev
```

With `DB_SYNC=true` (default in `.env.example`) the tables are created
automatically on boot and an admin account is seeded from `ADMIN_EMAIL` /
`ADMIN_PASSWORD`. For production, set `DB_SYNC=false` and apply
`migrations/0001_init.sql` instead.

Health check:

```bash
curl http://localhost:4001/api/v1/health
```

## Environment variables

| Var | Required | Description |
|-----|----------|-------------|
| `PORT` | no | Defaults to 4001 |
| `NODE_ENV` | no | `development` / `production` |
| `CORS_ORIGINS` | yes | Comma-separated allowed origins (the Next.js site) |
| `DATABASE_URL` | yes | MySQL connection string (`mysql://user:pass@host:3306/db`) |
| `DB_SSL` | no | `true` for managed MySQL that requires TLS |
| `DB_SYNC` | no | `true` to auto-sync schema (dev only) |
| `JWT_SECRET` | yes | Secret used to sign/verify JWTs |
| `JWT_EXPIRES_IN` | no | JWT lifetime (default `7d`) |
| `ADMIN_EMAIL` | no | Seed admin email |
| `ADMIN_PASSWORD` | no | Seed admin password |
| `ADMIN_NAME` | no | Seed admin display name |
