# Wuzzify — Next.js Landing (Arabic + English, Arabic default)

Production-ready App Router code with bilingual support (Arabic RTL + English LTR), Arabic as the default. Built with:

- **Next.js 14+ App Router** (`app/` directory, RSC by default)
- **next-intl** for routing + translations
- **Tailwind CSS** with brand tokens mapped under `theme.extend.colors.brand`
- **Cairo** Arabic font (also covers Latin); **Inter** loaded for English pages
- **Full RTL/LTR** — `<html dir>` and `<html lang>` are set per locale, components use logical Tailwind props (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`)

## Drop-in instructions

1. Copy `app/`, `components/`, `i18n/`, `messages/`, `middleware.ts`, and `next.config.ts` into your project root.
2. Replace your `tailwind.config.ts` with the one provided (or merge `theme.extend`).
3. Replace `app/globals.css` (or merge the layer/CSS variable block).
4. Install dependencies:
   ```bash
   npm install next-intl
   ```
   Plus Tailwind v3.4+, Next.js 14+, React 18+.

## URLs

- `/` → Arabic (default, no prefix)
- `/en` → English

This is the `localePrefix: 'as-needed'` mode from next-intl. Switch the strategy in `i18n/routing.ts` if you want every locale to be prefixed.

## File map

```
app/
  [locale]/
    layout.tsx          ← dir/lang per locale, Cairo + Inter fonts, NextIntlClientProvider, metadata
    page.tsx            ← composes the landing
  api/contact/route.ts  ← Telegram lead capture (not localized)
  globals.css           ← Tailwind layers + CSS vars
components/
  Icons.tsx
  LanguageSwitcher.tsx  ← AR/EN toggle in the nav
  Nav.tsx
  Hero.tsx
  AgentsGrid.tsx
  HowItWorks.tsx
  Comparison.tsx
  Stats.tsx
  Pricing.tsx
  FAQ.tsx
  CTABanner.tsx
  Footer.tsx
i18n/
  routing.ts            ← locales, defaultLocale, localePrefix
  request.ts            ← getRequestConfig — loads messages per request
messages/
  ar.json               ← Arabic strings (default)
  en.json               ← English strings
middleware.ts           ← next-intl locale detection + routing
next.config.ts          ← wraps config with createNextIntlPlugin
tailwind.config.ts
```

All components remain server components except `CTABanner.tsx` (form state) and `LanguageSwitcher.tsx` (router navigation). The FAQ uses native `<details>` — no client JS required.

## Adding a translation string

1. Add the key to **both** `messages/ar.json` and `messages/en.json` under the same namespace.
2. Read it in a component via `const t = useTranslations("Namespace");` then `t("key")`.

## Adding a new locale (e.g. French)

1. Add the locale code to `routing.ts`:
   ```ts
   locales: ["ar", "en", "fr"]
   ```
2. Drop a `messages/fr.json` translating every key (copy the structure from `ar.json` or `en.json`).
3. Update `LanguageSwitcher.tsx` if you want a distinct label for it.
4. In `app/[locale]/layout.tsx`, decide the `dir` for new locales (currently only `ar` is RTL).

## Telegram lead capture

The CTA email form posts to `app/api/contact/route.ts` and forwards submissions to Telegram. The route is **not** under `[locale]/`, so the URL stays `/api/contact` regardless of language.

Set one of these env var pairs before running:

- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
- `BOT_TOKEN` and `CHAT_ID`

Example `.env.local`:

```bash
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_CHAT_ID
```

## Brand tokens

```ts
brand: {
  50:'#F7F4FC', 100:'#EFEAF8', 200:'#D9CFEF', 300:'#B9A8E6',
  400:'#8058E0', 500:'#6E55B4', 600:'#4C3491', /* primary */
  700:'#3B286F', 800:'#2E1F66', 900:'#1C133F',
}
```

Reach for `bg-brand-600`, `text-brand-700`, `border-brand-300`, etc. Never invent new shades.
