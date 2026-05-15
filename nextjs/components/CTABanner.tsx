import { Icon } from "./Icons";

export default function CTABanner() {
  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="relative rounded-2xl overflow-hidden grad-bg p-12 lg:p-20">
          <Icon
            id="wmark"
            width={320}
            height={220}
            className="absolute -top-10 -end-10 text-white/15"
          />
          <div className="relative max-w-2xl">
            <h2 className="display text-[36px] lg:text-[52px] text-white">
              فريقك الذكي. جاهز خلال ١٠ دقائق.
            </h2>
            <p className="mt-5 text-[18px] leading-loose text-white/90 max-w-[52ch]">
              لا حاجة لبطاقة ائتمان. لا التزامات. فقط جرّب وقرّر.
            </p>
            <form className="mt-8 flex flex-wrap gap-3 max-w-md">
              <input
                type="email"
                placeholder="البريد الإلكتروني للعمل"
                className="flex-1 min-w-[220px] h-12 px-4 rounded-xs bg-white border border-white/0 text-ink placeholder:text-ink-3 focus:outline-none focus:border-brand-600 text-[14px]"
              />
              <button
                type="submit"
                className="h-12 px-6 bg-ink hover:bg-brand-900 text-white text-[14px] font-semibold rounded-xs transition inline-flex items-center gap-2"
              >
                ابدأ التجربة المجانية
                <Icon id="i-arrow" />
              </button>
            </form>
            <p className="mt-3 text-[12.5px] text-white/75">
              ٧ أيام كاملة · إلغاء بنقرة واحدة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
