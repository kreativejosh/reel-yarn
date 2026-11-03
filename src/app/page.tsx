import { Nav, Hero } from "@/components/Hero";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Gallery } from "@/components/Gallery";
import { Formats, StartWays, Support, Faq } from "@/components/Sections";
import { EditFeatures } from "@/components/EditFeatures";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { JsonLd, faqLd, softwareLd, videosLd, webPageLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={[webPageLd(), softwareLd(), faqLd(), videosLd()]} />
      <Nav />
      <main>
        <Hero />
        <WhoItsFor />
        <Gallery />
        <Formats />
        <StartWays />
        <EditFeatures />
        <Pricing />
        <Support />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
