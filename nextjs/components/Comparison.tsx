import { useTranslations } from "next-intl";
import { Icon } from "./Icons";

type CellValue = string | { icon: string; text: string; color: string };

function Cell({ value, accent = false }: { value: CellValue; accent?: boolean }) {
  const base = "px-6 py-5 border-s border-line " + (accent ? "bg-brand-50 text-brand-700 font-bold" : "text-ink-2");
  if (typeof value === "string") {
    return <div className={`${base} num`}>{value}</div>;
  }
  return (
    <div className={`${base} inline-flex items-center gap-2`}>
      <Icon id={value.icon} width={16} height={16} className={value.color} />
      {value.text}
    </div>
  );
}

export default function Comparison() {
  const t = useTranslations("Comparison");

  const rows: { label: string; trad: CellValue; wz: CellValue }[] = [
    { label: t("row1Label"), trad: t("row1Trad"), wz: t("row1Wz") },
    { label: t("row2Label"), trad: t("row2Trad"), wz: t("row2Wz") },
    { label: t("row3Label"), trad: t("row3Trad"), wz: t("row3Wz") },
    { label: t("row4Label"), trad: t("row4Trad"), wz: t("row4Wz") },
    { label: t("row5Label"), trad: t("row5TradText"), wz: t("row5WzText") },
    { label: t("row6Label"), trad: t("row6Trad"), wz: t("row6Wz") },
  ];

  return (
    <section id="compare" className="py-24 lg:py-32">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-brand-100 px-2.5 py-1 rounded-xs">
            {t("tag")}
          </span>
          <h2 className="display text-[40px] lg:text-[52px] mt-4">
            {t("headlinePart1")} <span className="grad-text">{t("headlineHighlight")}</span>
          </h2>
          <p className="mt-5 text-[18px] leading-loose text-ink-2">{t("subtitle")}</p>
        </div>

        <div className="border border-line rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr] bg-wash text-[12px] font-bold tracking-wider uppercase text-ink-3">
            <div className="px-6 py-4">{t("colMetric")}</div>
            <div className="px-6 py-4 border-s border-line">{t("colTraditional")}</div>
            <div className="px-6 py-4 border-s border-line bg-brand-600 text-white">{t("colWuzzify")}</div>
          </div>
          <div className="divide-y divide-line">
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[1.4fr_1fr_1.2fr] items-center">
                <div className="px-6 py-5 font-semibold">{r.label}</div>
                <Cell value={r.trad} />
                <Cell value={r.wz} accent />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
