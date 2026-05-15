import { Icon } from "./Icons";

const faqs = [
  {
    q: "هل وكلاء وُزّيفاي يفهمون اللهجات العربية المختلفة؟",
    a: "نعم. الوكلاء مُدرَّبون على العربية الفصحى ولهجات الخليج ومصر والشام. يمكنك أيضاً رفع أمثلة من محادثاتك السابقة لضبط اللهجة لتناسب جمهورك بدقة.",
    open: true,
  },
  {
    q: "كم من الوقت يستغرق تشغيل وكيلي؟",
    a: "عشر دقائق في المتوسط. اختر القالب، صل مصادر البيانات، ودع التدريب التلقائي يقوم بالباقي.",
  },
  {
    q: "أين تُخزَّن بياناتي؟",
    a: "في مراكز بيانات داخل المملكة العربية السعودية وفقاً لمتطلبات الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا). تشفير كامل أثناء النقل والتخزين.",
  },
  {
    q: "هل يمكنني ربط الوكيل بأنظمتي الحالية؟",
    a: "نعم. تكاملات جاهزة مع Salesforce، HubSpot، Zoho، Zendesk، Intercom، واتساب بزنس، الجيميل، وأكثر من ٥٠ أداة أخرى. وواجهة API مفتوحة لأي ربط مخصّص.",
  },
  {
    q: "ماذا لو لم يكن الوكيل مناسباً؟",
    a: "ألغِ في أي وقت دون أسئلة. التجربة المجانية ٧ أيام لا تتطلّب بطاقة ائتمانية.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-wash border-y border-line py-24">
      <div className="max-w-[920px] mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-white border border-line px-2.5 py-1 rounded-xs">
            الأسئلة الشائعة
          </span>
          <h2 className="display text-[36px] lg:text-[44px] mt-4">كل ما تودّ معرفته. باختصار.</h2>
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
