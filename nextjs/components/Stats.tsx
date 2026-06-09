import { useTranslations } from "next-intl";

export default function Stats() {
  const t = useTranslations("Stats");

  const stats = [
    { v: t("stat1Value"), k: t("stat1Key") },
    { v: t("stat2Value"), k: t("stat2Key") },
    { v: t("stat3Value"), k: t("stat3Key") },
    { v: t("stat4Value"), k: t("stat4Key") },
  ];

  return (
    <section className="relative bg-ink text-white py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(800px 400px at 80% 50%,rgba(128,88,224,0.35),transparent 60%),radial-gradient(800px 400px at 20% 50%,rgba(76,52,145,0.35),transparent 60%)",
        }}
      />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 grid md:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((s) => (
          <div key={s.k}>
            <div className="display text-[64px] grad-text num">{s.v}</div>
            <div className="text-[14px] text-white/70 mt-1">{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
