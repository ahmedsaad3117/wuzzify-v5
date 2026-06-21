-- Wuzzify v5 CMS — initial schema
-- Run this against your PostgreSQL database when DB_SYNC is not enabled.

create extension if not exists "pgcrypto";

-- Admins ----------------------------------------------------------------
create table if not exists admins (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  name          text,
  created_at    timestamptz not null default now()
);

-- Articles --------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'articles_status_enum') then
    create type articles_status_enum as enum ('draft', 'published');
  end if;
end$$;

create table if not exists articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title_ar     text not null,
  title_en     text,
  excerpt_ar   text,
  excerpt_en   text,
  content_ar   text not null default '',
  content_en   text,
  cover_url    text,
  status       articles_status_enum not null default 'draft',
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_articles_status_published_at
  on articles (status, published_at);
