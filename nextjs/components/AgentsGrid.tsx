import { Icon } from "./Icons";

const agents = [
  {
    icon: "i-support",
    tag: "SUPPORT · دعم",
    title: "دعم العملاء بلا انتظار.",
    body: "٢٬٣٤١ محادثة. وكيل واحد. الثلاثاء الماضي. ٩٤٪ حُلَّت دون تدخّل بشري.",
    cta: "المزيد عن الدعم",
  },
  {
    icon: "i-seo",
    tag: "SEO · سيو",
    title: "صفحات تتصدّر جوجل.",
    body: "يبحث عن الكلمات المفتاحية، يكتب المحتوى، ويُحسّن الميتا — أسبوعياً، تلقائياً.",
    cta: "المزيد عن السيو",
  },
  {
    icon: "i-marketing",
    tag: "MARKETING · تسويق",
    title: "حملات بريد ومنشورات يومية.",
    body: "يصمّم، يكتب، ويُجدوِل — لانستغرام، تويتر، ولينكدإن. تقارير أسبوعية تلقائية.",
    cta: "المزيد عن التسويق",
  },
  {
    icon: "i-ocr",
    tag: "OCR · مستندات",
    title: "من ورقة إلى بيانات. فوراً.",
    body: "فواتير، عقود، هوايا، شيكات — تُستخرج وتُصنَّف بدقّة ٩٩٪، عربي وإنجليزي.",
    cta: "المزيد عن المستندات",
  },
];

export default function AgentsGrid() {
  return (
    <section id="agents" className="py-24 lg:py-32">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-brand-100 px-2.5 py-1 rounded-xs">
            المنتج
          </span>
          <h2 className="display text-[40px] lg:text-[52px] mt-4">
            خمسة وكلاء. <span className="grad-text">تخصّص واحد</span> لكلٍّ منهم.
          </h2>
          <p className="mt-5 text-[18px] leading-loose text-ink-2">
            كل وكيل مُدرَّب على وظيفة بعينها — لا قوالب عامّة، لا ردود مبهمة. أَطلِق الفريق الذي تحتاجه فقط.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured Sales card */}
          <article className="lg:col-span-2 relative bg-brand-600 text-white rounded-xl p-8 overflow-hidden transition hover:shadow-lift">
            <Icon id="wmark" width={280} height={200} className="absolute -top-6 -start-6 opacity-10 text-white" />
            <div className="relative">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">SALES · مبيعات</span>
              <h3 className="display text-[32px] mt-3">وكيل المبيعات يُغلق الصفقات وأنت نائم.</h3>
              <p className="mt-4 text-[15.5px] leading-loose opacity-90 max-w-[52ch]">
                يتعرّف على العملاء المحتملين، يجيب عن أسئلتهم، ويرسل العروض المخصّصة مباشرة من CRM الخاص بك.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xs text-[12.5px] font-medium">
                  تكامل مع Salesforce و HubSpot
                </span>
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xs text-[12.5px] font-medium">
                  عربية فصحى ولهجات الخليج
                </span>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 max-w-md">
                {[
                  { k: "صفقات/يوم", v: "٤٧" },
                  { k: "معدل التحويل", v: "١٨٪" },
                  { k: "جاهز خلال", v: "١٠د" },
                ].map((s) => (
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
