"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: string) {
    if (next === locale) return;

    const segments = pathname.split("/");
    // Strip current locale prefix if present
    if (segments[1] && (routing.locales as readonly string[]).includes(segments[1])) {
      segments.splice(1, 1);
    }
    const stripped = segments.join("/") || "/";
    const target =
      next === routing.defaultLocale
        ? stripped
        : `/${next}${stripped === "/" ? "" : stripped}`;

    router.push(target);
    router.refresh();
  }

  return (
    <div
      className="inline-flex items-center rounded-xs border border-line bg-white overflow-hidden text-[12.5px] font-semibold"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={active}
            className={
              "h-9 px-3 transition " +
              (active
                ? "bg-brand-600 text-white"
                : "text-ink-2 hover:text-brand-700 hover:bg-brand-50")
            }
          >
            {l === "ar" ? t("ar") : t("en")}
          </button>
        );
      })}
    </div>
  );
}
