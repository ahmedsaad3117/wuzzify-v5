import { useTranslations } from "next-intl";
import { Icon } from "./Icons";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const t = useTranslations("Nav");

  const links = [
    { href: "#agents",  label: t("agents") },
    { href: "#how",     label: t("how") },
    { href: "#compare", label: t("compare") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq",     label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-line">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <Icon id="wmark" width={26} height={19} className="text-brand-600" />
          <span className="font-extrabold tracking-tight text-[20px] text-brand-700">
            {t("brand")}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-[14.5px] text-ink-2 font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-600 transition">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#"
            className="hidden sm:inline-flex h-10 items-center px-4 text-[14px] font-semibold text-ink-2 hover:text-ink transition"
          >
            {t("signIn")}
          </a>
          <a
            href="#cta"
            className="inline-flex h-10 items-center gap-2 px-5 bg-brand-600 hover:bg-brand-700 text-white text-[14px] font-semibold rounded-xs transition shadow-sm"
          >
            {t("startFree")}
            <Icon id="i-arrow" width={14} height={14} />
          </a>
        </div>
      </div>
    </header>
  );
}
