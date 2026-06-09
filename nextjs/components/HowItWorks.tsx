import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { n: t("step1Number"), title: t("step1Title"), body: t("step1Body") },
    { n: t("step2Number"), title: t("step2Title"), body: t("step2Body") },
    { n: t("step3Number"), title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <section id="how" className="bg-wash py-24 lg:py-32 border-y border-line relative overflow-hidden">
      <div className="absolute inset-0 dotgrid opacity-40" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-white border border-line px-2.5 py-1 rounded-xs">
            {t("tag")}
          </span>
          <h2 className="display text-[40px] lg:text-[52px] mt-4">
            {t("headlinePart1")} <span className="grad-text">{t("headlineHighlight")}</span>
          </h2>
        </div>

        <ol className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <li key={s.n} className="bg-white border border-line rounded-xl p-8 relative">
              <div className="absolute top-6 start-6 display text-[64px] text-brand-100 leading-none num">
                {s.n}
              </div>
              <h3 className="font-bold text-[22px] mt-16">{s.title}</h3>
              <p className="mt-3 text-[14.5px] leading-loose text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
