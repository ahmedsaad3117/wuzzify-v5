import { setRequestLocale } from "next-intl/server";
import Nav         from "@/components/Nav";
import Hero        from "@/components/Hero";
import AgentsGrid  from "@/components/AgentsGrid";
import HowItWorks  from "@/components/HowItWorks";
import Comparison  from "@/components/Comparison";
import Stats       from "@/components/Stats";
import Pricing     from "@/components/Pricing";
import FAQ         from "@/components/FAQ";
import CTABanner   from "@/components/CTABanner";
import Footer      from "@/components/Footer";
import IconSprite  from "@/components/Icons";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <IconSprite />
      <Nav />
      <main>
        <Hero />
        <AgentsGrid />
        <HowItWorks />
        <Comparison />
        <Stats />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
