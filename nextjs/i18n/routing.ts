import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
  // Always serve Arabic at "/" — don't auto-redirect to /en based on the
  // browser's Accept-Language header (which also broke switching back to AR).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
