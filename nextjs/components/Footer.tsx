import { useLocale, useTranslations } from "next-intl";
import { Icon } from "./Icons";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const locale = useLocale();
  const base = locale === "ar" ? "" : `/${locale}`;
  const privacyHref = `${base}/privacy`;

  const cols = [
    {
      title: t("productTitle"),
      links: [
        { label: t("productLink1"), href: "#" },
        { label: t("productLink2"), href: "#" },
        { label: t("productLink3"), href: "#" },
        { label: t("productLink4"), href: "#" },
        { label: t("productLink5"), href: "#" },
      ],
    },
    {
      title: t("companyTitle"),
      links: [
        { label: t("companyLink1"), href: "#" },
        { label: tNav("articles"), href: `${base}/articles` },
        { label: t("companyLink3"), href: "#" },
        { label: t("companyLink4"), href: "#" },
      ],
    },
    {
      title: t("legalTitle"),
      links: [
        { label: t("legalLink1"), href: privacyHref },
        { label: t("legalLink2"), href: "#" },
        { label: t("legalLink3"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-white">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div>
          <a href="#" className="flex items-center gap-2.5">
            <Icon id="wmark" width={28} height={20} className="text-brand-600" />
            <span className="font-extrabold tracking-tight text-[22px] text-brand-700">
              {t("brand")}
            </span>
          </a>
          <p className="mt-5 text-[14px] leading-loose text-ink-2 max-w-sm">
            {t("tagline")}
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-[12px] font-bold tracking-widest uppercase text-ink-3 mb-4">
              {c.title}
            </h4>
            <ul className="space-y-3 text-[14px] text-ink-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-brand-700 transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-ink-3">
          <div className="num">{t("copyright")}</div>
          <div>{t("madeIn")}</div>
        </div>
      </div>
    </footer>
  );
}
