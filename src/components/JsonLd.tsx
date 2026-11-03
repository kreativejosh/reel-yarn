import { faqs, packs, sampleVideos, SAMPLES_PUBLISHED, site, editFeatures, formats } from "@/content/site";

type Ld = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const APP_ID = `${site.url}/#software`;

export function JsonLd({ data }: { data: Ld | Ld[] }) {
  const graph = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe once "<" is escaped, so a "</script>" in copy can't break out.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = (): Ld => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/media/logo.svg` },
  email: site.email,
  contactPoint: { "@type": "ContactPoint", email: site.email, contactType: "customer support", availableLanguage: ["English", "French"] },
  sameAs: Object.values(site.social).filter((u) => u.startsWith("http")),
});

export const websiteLd = (): Ld => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
});

export const webPageLd = (): Ld => ({
  "@type": "WebPage",
  "@id": `${site.url}/#webpage`,
  url: site.url,
  name: site.title,
  description: site.description,
  isPartOf: { "@id": SITE_ID },
  about: { "@id": APP_ID },
  primaryImageOfPage: `${site.url}/opengraph-image`,
  inLanguage: "en",
});

export const softwareLd = (): Ld => ({
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: "MultimediaApplication",
  applicationSubCategory: "AI video generator",
  operatingSystem: "Web browser",
  publisher: { "@id": ORG_ID },
  featureList: [...editFeatures.map((f) => `${f.name}: ${f.body}`), ...formats.kinds.map((k) => `Make ${k.toLowerCase()} videos`)],
  inLanguage: ["en", "pcm", "fr", "es", "pt", "ar"],
  offers: [
    { "@type": "Offer", name: "Free start", price: "0", priceCurrency: "USD", description: "20 free credits for new accounts, valid for 30 days. No card needed." },
    {
      "@type": "AggregateOffer",
      name: "Credit packs (one-time, no subscription)",
      priceCurrency: "USD",
      lowPrice: String(packs[0][1]),
      highPrice: String(packs[packs.length - 1][1]),
      offerCount: packs.length,
      offers: packs.map(([credits, usd]) => ({ "@type": "Offer", name: `${credits.toLocaleString("en-US")} credits`, price: String(usd), priceCurrency: "USD" })),
    },
  ],
});

export const faqLd = (): Ld => ({
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const videosLd = (): Ld => ({
  "@type": "ItemList",
  "@id": `${site.url}/#examples`,
  name: "Sample videos made with ReelYarn",
  itemListElement: sampleVideos.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: v.title,
      description: `Made with ReelYarn from the prompt: ${v.prompt}`,
      thumbnailUrl: `${site.url}/media/${v.poster}`,
      contentUrl: `${site.url}/media/${v.slug}.mp4`,
      uploadDate: SAMPLES_PUBLISHED,
      duration: `PT${v.seconds}S`,
      width: v.width,
      height: v.height,
      publisher: { "@id": ORG_ID },
    },
  })),
});
