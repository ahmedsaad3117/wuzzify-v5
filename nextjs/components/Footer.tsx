import { Icon } from "./Icons";

const cols = [
  {
    title: "المنتج",
    links: ["وكيل المبيعات", "وكيل الدعم", "وكيل السيو", "وكيل التسويق", "وكيل المستندات"],
  },
  {
    title: "الشركة",
    links: ["من نحن", "المدوّنة", "الوظائف", "تواصل معنا"],
  },
  {
    title: "قانوني",
    links: ["الخصوصية", "الشروط", "الأمن"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div>
          <a href="#" className="flex items-center gap-2.5">
            <Icon id="wmark" width={28} height={20} className="text-brand-600" />
            <span className="font-extrabold tracking-tight text-[22px] text-brand-700">
              وُظيفاي
            </span>
          </a>
          <p className="mt-5 text-[14px] leading-loose text-ink-2 max-w-sm">
            موظفون بالذكاء الاصطناعي للسوق العربي. مقرّنا الرياض والقاهرة.
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
          <div className="num">© ٢٠٢٦ وُظيفاي. كل الحقوق محفوظة.</div>
          <div>صُنع بإتقان في الرياض والقاهرة.</div>
        </div>
      </div>
    </footer>
  );
}
