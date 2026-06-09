import { useTranslations } from "next-intl";
import { Icon } from "./Icons";

type Tier = {
  name: string;
  desc: string;
  price: string;
  unit?: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

export default function Pricing() {
  const t = useTranslations("Pricing");

  const tiers: Tier[] = [
    {
      name: t("starterName"),
      desc: t("starterDesc"),
      price: t("starterPrice"),
      unit: t("starterUnit"),
      features: [
        t("starterFeature1"),
        t("starterFeature2"),
        t("starterFeature3"),
        t("starterFeature4"),
      ],
      ctaLabel: t("starterCta"),
    },
    {
      name: t("proName"),
      desc: t("proDesc"),
      price: t("proPrice"),
      unit: t("proUnit"),
      features: [
        t("proFeature1"),
        t("proFeature2"),
        t("proFeature3"),
        t("proFeature4"),
        t("proFeature5"),
      ],
      ctaLabel: t("proCta"),
      highlighted: true,
    },
    {
      name: t("entName"),
      desc: t("entDesc"),
      price: t("entPrice"),
      features: [
        t("entFeature1"),
        t("entFeature2"),
        t("entFeature3"),
        t("entFeature4"),
        t("entFeature5"),
      ],
      ctaLabel: t("entCta"),
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-brand-100 px-2.5 py-1 rounded-xs">
            {t("tag")}
          </span>
          <h2 className="display text-[40px] lg:text-[52px] mt-4">
            {t("headlinePart1")} <span className="grad-text">{t("headlineHighlight")}</span>{t("headlinePart2")}
          </h2>
          <p className="mt-5 text-[17px] leading-loose text-ink-2">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} popularBadge={t("popularBadge")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, popularBadge }: { tier: Tier; popularBadge: string }) {
  if (tier.highlighted) {
    return (
      <div className="bg-brand-600 text-white rounded-xl p-8 flex flex-col relative shadow-glow ring-1 ring-brand-700">
        <span className="absolute -top-3 end-6 bg-brand-100 text-brand-700 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xs">
          {popularBadge}
        </span>
        <h3 className="font-bold text-[20px]">{tier.name}</h3>
        <p className="text-[14px] text-white/75 mt-1">{tier.desc}</p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="display text-[48px] num">{tier.price}</span>
          {tier.unit && <span className="text-white/70 text-[14px]">{tier.unit}</span>}
        </div>
        <ul className="mt-6 space-y-3 text-[14px] text-white/90 flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Icon id="i-check" className="text-brand-200 mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="mt-8 inline-flex h-11 items-center justify-center px-6 bg-white text-brand-700 hover:bg-brand-50 font-semibold text-[14px] rounded-xs transition"
        >
          {tier.ctaLabel}
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-line rounded-xl p-8 flex flex-col">
      <h3 className="font-bold text-[20px]">{tier.name}</h3>
      <p className="text-[14px] text-ink-2 mt-1">{tier.desc}</p>
      <div className="mt-6 flex items-baseline gap-2">
        {tier.unit ? (
          <>
            <span className="display text-[48px] text-ink num">{tier.price}</span>
            <span className="text-ink-3 text-[14px]">{tier.unit}</span>
          </>
        ) : (
          <span className="display text-[34px] text-ink">{tier.price}</span>
        )}
      </div>
      <ul className="mt-6 space-y-3 text-[14px] text-ink-2 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Icon id="i-check" className="text-brand-600 mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-8 inline-flex h-11 items-center justify-center px-6 border border-line hover:border-brand-300 text-ink font-semibold text-[14px] rounded-xs transition"
      >
        {tier.ctaLabel}
      </a>
    </div>
  );
}
