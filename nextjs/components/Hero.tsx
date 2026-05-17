import { Icon } from "./Icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-halo" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
        {/* Copy column */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-brand-100 text-brand-700 text-[12px] font-semibold tracking-wide">
            <span className="size-1.5 rounded-full bg-brand-600 animate-pulse-dot" />
            موظفون بالذكاء الاصطناعي · جاهزون اليوم
          </span>

          <h1 className="display text-[44px] sm:text-[56px] lg:text-[68px] mt-6 text-ink">
            استبدل <span className="grad-text">٥ موظفين</span>
            <br />
            بوكيلٍ ذكي واحد.
          </h1>

          <p className="mt-6 text-[18px] leading-loose text-ink-2 max-w-[56ch]">
            وكلاء وُظيفاي يديرون المبيعات والدعم والتسويق ومعالجة المستندات على مدار الساعة،
            بأداء أسرع من فريق كامل — وبربع التكلفة. لا إجازات، لا تدريب، لا انتظار.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex h-12 items-center gap-2 px-6 bg-brand-600 hover:bg-brand-700 text-white text-[15px] font-semibold rounded-xs shadow-glow transition"
            >
              وظّف وكيلك الآن
              <Icon id="i-arrow" />
            </a>
          </div>

          {/* Micro-proofs */}
          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-[520px]">
            {[
              { k: "معدل الحل", v: "٩٤٪" },
              { k: "زمن الرد", v: "١٫٢ث" },
              { k: "العمل",   v: "٢٤/٧" },
            ].map((p) => (
              <div key={p.k}>
                <dt className="text-[12px] font-semibold tracking-wider text-ink-3 uppercase">{p.k}</dt>
                <dd className="display text-[28px] text-brand-700 num mt-1">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual column */}
        <div className="relative z-10">
          <div className="absolute -inset-8 grad-bg rounded-2xl opacity-90 blur-2xl -z-10" />

          <div className="bg-white border border-line rounded-xl shadow-lift p-5 relative">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-brand-600 text-white grid place-items-center">
                  <Icon id="wmark" width={16} height={11} />
                </div>
                <div>
                  <div className="font-semibold text-[14px]">وكيل المبيعات · سارة</div>
                  <div className="text-[11.5px] text-ink-3 flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                    نشط الآن · يتعامل مع ٢٤ محادثة
                  </div>
                </div>
              </div>
              <span className="text-[11px] tracking-wider font-semibold text-brand-700 bg-brand-100 px-2 py-1 rounded-xs">
                SALES
              </span>
            </div>

            <div className="mt-4 space-y-3 text-[13.5px]">
              <Bubble side="user">مرحباً، أبحث عن باقة لـ ٥٠ موظف في فريقي. كم سيكلفني ذلك شهرياً؟</Bubble>
              <Bubble side="agent">
                أهلاً بك. باقة الأعمال لـ ٥٠ مستخدم تبدأ من <b className="num">٢٬٤٠٠</b> ر.س شهرياً، وتشمل ٣ وكلاء.
                هل تفضّل عرضاً مخصصاً يشمل التكامل مع نظامكم؟
              </Bubble>
              <Bubble side="user">نعم، نستخدم Salesforce. هل التكامل مدعوم؟</Bubble>
              <Bubble side="agent">نعم. سأرسل لك مقترحاً خلال دقائق مع روابط التكامل.</Bubble>
            </div>

            <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-[11.5px] text-ink-3">
              <span className="num">المحادثة #٢٬٣٤١ · اليوم ٠٩:٤٢</span>
              <span className="flex items-center gap-1.5 text-brand-700 font-semibold">
                <Icon id="i-bolt" width={12} height={12} />
                ردّ خلال ١٫٢ث
              </span>
            </div>
          </div>

          {/* Floating stat card — RTL: pin to logical start (visually right in LTR, left in RTL) */}
          <div className="absolute -bottom-8 start-2 sm:start-6 bg-white border border-line rounded-lg p-4 shadow-lift w-[200px]">
            <div className="text-[11px] font-semibold tracking-wider text-ink-3 uppercase">صفقات أُغلقت اليوم</div>
            <div className="display text-[32px] text-ink num mt-1">٤٧</div>
            <div className="text-[12px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span>↑ ٢٢٪</span>
              <span className="text-ink-3 font-normal">عن أمس</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "user" | "agent";
  children: React.ReactNode;
}) {
  if (side === "user") {
    return (
      <div className="flex gap-2 items-start justify-end">
        <div className="bg-wash border border-line rounded-lg px-3 py-2 max-w-[78%]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-start">
      <div className="bg-brand-600 text-white rounded-lg px-3 py-2 max-w-[78%]">
        {children}
      </div>
    </div>
  );
}
