# Wuzzify — Next.js Landing (Arabic RTL)

Production-ready App Router code that mirrors `Wuzzify Landing.html`. Built with:

- **Next.js 14+ App Router** (`app/` directory, RSC by default)
- **Tailwind CSS** with brand tokens mapped under `theme.extend.colors.brand`
- **Cairo** Arabic font via `next/font/google`
- **Full RTL** — `<html dir="rtl" lang="ar">` + logical Tailwind props (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`)

## Drop-in instructions

1. Copy `app/` and `components/` into your project root.
2. Replace your `tailwind.config.ts` with the one provided (or merge the `theme.extend` block).
3. Replace `app/globals.css` (or merge the layer/CSS variable block).
4. Ensure your `package.json` has Tailwind v3.4+. No other deps needed — icons are inline SVG.

## File map

```
app/
  layout.tsx            ← RTL + Cairo font + metadata
  page.tsx              ← composes the landing
  globals.css           ← Tailwind layers + CSS vars
components/
  Icons.tsx             ← SVG sprite (W mark + lucide-style icons)
  Nav.tsx
  Hero.tsx
  TrustBar.tsx
  AgentsGrid.tsx
  HowItWorks.tsx
  Comparison.tsx
  Stats.tsx
  Pricing.tsx
  FAQ.tsx
  CTABanner.tsx
  Footer.tsx
tailwind.config.ts
```

All components are server components (no `"use client"` directive needed) since they're pure markup. The FAQ uses native `<details>` so no client JS required.

## Telegram lead capture

The CTA email form now posts to `app/api/contact/route.ts` and forwards submissions to Telegram.

Set one of these environment variable pairs before running the app:

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
