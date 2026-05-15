import { Icon } from "./Icons";

const rows = [
  { label: "التكلفة الشهرية",   trad: "١٢٬٠٠٠ ر.س +",                              wz: "٢٬٤٠٠ ر.س" },
  { label: "ساعات العمل",        trad: "٨ ساعات / يوم",                              wz: "٢٤ ساعة × ٧ أيام" },
  { label: "زمن الاستجابة",      trad: "دقائق إلى ساعات",                            wz: "١٫٢ ثانية" },
  { label: "السعة اليومية",      trad: "~ ٥٠ محادثة",                                wz: "٢٬٣٤١ محادثة" },
  { label: "الإجازات والغياب",   trad: { icon: "i-x", text: "٢١ يوم/سنة", color: "text-red-500" },
                                                                                       wz: { icon: "i-check", text: "صفر", color: "text-brand-600" } },
  { label: "مدة التدريب",        trad: "٤–٨ أسابيع",                                  wz: "١٠ دقائق" },
];

function Cell({ value, accent = false }: { value: any; accent?: boolean }) {
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
  return (
    <section id="compare" className="py-24 lg:py-32">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-14">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-brand-100 px-2.5 py-1 rounded-xs">
            المقارنة
          </span>
          <h2 className="display text-[40px] lg:text-[52px] mt-4">
            موظف تقليدي مقابل <span className="grad-text">وكيل وُزّيفاي.</span>
          </h2>
          <p className="mt-5 text-[18px] leading-loose text-ink-2">الأرقام تتحدّث عن نفسها.</p>
        </div>

        <div className="border border-line rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr] bg-wash text-[12px] font-bold tracking-wider uppercase text-ink-3">
            <div className="px-6 py-4">المعيار</div>
            <div className="px-6 py-4 border-s border-line">موظف تقليدي</div>
            <div className="px-6 py-4 border-s border-line bg-brand-600 text-white">وكيل وُزّيفاي</div>
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
