import { useTranslations } from "next-intl";
import { Icon } from "./Icons";

export default function Footer() {
  const t = useTranslations("Footer");

  const cols = [
    {
      title: t("productTitle"),
      links: [
        t("productLink1"),
        t("productLink2"),
        t("productLink3"),
        t("productLink4"),
        t("productLink5"),
      ],
    },
    {
      title: t("companyTitle"),
      links: [
        t("companyLink1"),
        t("companyLink2"),
        t("companyLink3"),
        t("companyLink4"),
      ],
    },
    {
      title: t("legalTitle"),
      links: [t("legalLink1"), t("legalLink2"), t("legalLink3")],
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
                <li key={l}>
                  <a href="#" className="hover:text-brand-700 transition">
                    {l}
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
