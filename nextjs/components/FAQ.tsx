import { useTranslations } from "next-intl";
import { Icon } from "./Icons";

export default function FAQ() {
  const t = useTranslations("FAQ");

  const faqs = [
    { q: t("q1"), a: t("a1"), open: true },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
  ];

  return (
    <section id="faq" className="bg-wash border-y border-line py-24">
      <div className="max-w-[920px] mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-white border border-line px-2.5 py-1 rounded-xs">
            {t("tag")}
          </span>
          <h2 className="display text-[36px] lg:text-[44px] mt-4">{t("title")}</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              open={f.open}
              className="group bg-white border border-line rounded-xl p-6 open:shadow-card"
            >
              <summary className="flex items-center justify-between gap-4">
                <span className="font-bold text-[17px]">{f.q}</span>
                <Icon id="i-chev" width={20} height={20} className="chev text-ink-3 shrink-0" />
              </summary>
              <p className="mt-4 text-[14.5px] leading-loose text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
