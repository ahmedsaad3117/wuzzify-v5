import { useTranslations } from "next-intl";
import { Icon } from "./Icons";

export default function AgentsGrid() {
  const t = useTranslations("AgentsGrid");

  const salesStats = [
    { k: t("salesStat1Key"), v: t("salesStat1Value") },
    { k: t("salesStat2Key"), v: t("salesStat2Value") },
    { k: t("salesStat3Key"), v: t("salesStat3Value") },
  ];

  const agents = [
    {
      icon: "i-support",
      tag: t("supportTag"),
      title: t("supportTitle"),
      body: t("supportBody"),
      cta: t("supportCta"),
    },
    {
      icon: "i-seo",
      tag: t("seoTag"),
      title: t("seoTitle"),
      body: t("seoBody"),
      cta: t("seoCta"),
    },
    {
      icon: "i-marketing",
      tag: t("marketingTag"),
      title: t("marketingTitle"),
      body: t("marketingBody"),
      cta: t("marketingCta"),
    },
    {
      icon: "i-ocr",
      tag: t("ocrTag"),
      title: t("ocrTitle"),
      body: t("ocrBody"),
      cta: t("ocrCta"),
    },
  ];

  return (
    <section id="agents" className="py-24 lg:py-32">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-brand-100 px-2.5 py-1 rounded-xs">
            {t("tag")}
          </span>
          <h2 className="display text-[40px] lg:text-[52px] mt-4">
            {t("headlinePart1")} <span className="grad-text">{t("headlineHighlight")}</span> {t("headlinePart2")}
          </h2>
          <p className="mt-5 text-[18px] leading-loose text-ink-2">
            {t("body")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured Sales card */}
          <article className="lg:col-span-2 relative bg-brand-600 text-white rounded-xl p-8 overflow-hidden transition hover:shadow-lift">
            <Icon id="wmark" width={280} height={200} className="absolute -top-6 -start-6 opacity-10 text-white" />
            <div className="relative">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">{t("salesTag")}</span>
              <h3 className="display text-[32px] mt-3">{t("salesTitle")}</h3>
              <p className="mt-4 text-[15.5px] leading-loose opacity-90 max-w-[52ch]">
                {t("salesBody")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xs text-[12.5px] font-medium">
                  {t("salesChip1")}
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xs text-[12.5px] font-medium">
                  {t("salesChip2")}
                </span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 max-w-md">
                {salesStats.map((s) => (
                  <div key={s.k}>
                    <div className="text-[11px] uppercase tracking-wider opacity-70">{s.k}</div>
                    <div className="display text-[24px] num mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {agents.map((a) => (
            <article
              key={a.tag}
              className="bg-white border border-line rounded-xl p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift hover:border-brand-300"
            >
              <div className="size-11 rounded-lg bg-brand-100 text-brand-700 grid place-items-center mb-5">
                <Icon id={a.icon} width={22} height={22} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600">{a.tag}</span>
              <h3 className="font-bold text-[22px] mt-2 text-ink">{a.title}</h3>
              <p className="mt-3 text-[14.5px] leading-loose text-ink-2">{a.body}</p>
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-1.5 text-brand-700 font-semibold text-[14px] hover:gap-2.5 transition-all"
              >
                {a.cta}
                <Icon id="i-arrow" width={14} height={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
