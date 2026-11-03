# ReelYarn website (Next.js)

The ReelYarn landing page, ported from `../reelyarn-landing.html` to Next.js 16 (App Router), with the same design.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the live domain before deploying. Canonical links, the sitemap, Open Graph and structured data all use it. It defaults to `https://reelyarn.com`.

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | All copy, links, prices, FAQs and sample videos. Edit text here. |
| `src/components/` | One component per section. Interactive parts (carousel, video player, edit tabs, pricing slider, subscribe form) are client components, but they are still rendered to HTML on the server. |
| `src/app/globals.css` | The original stylesheet, almost unchanged. |
| `public/media/` | Sample videos, posters, the hero ribbon and the logo. |

Sign-in, sign-up, legal and social links are `#` placeholders in `site.links` and `site.social`. Fill them in there.

## SEO and AI search

- **Fully static HTML:** every section, including all carousel cards, every edit-feature panel and every FAQ answer, is in the HTML. Crawlers don't need to run JavaScript.
- **Metadata:** title, description, keywords, canonical URL, Open Graph and Twitter cards, and robots directives that allow large image and video previews (`layout.tsx`).
- **Structured data (JSON-LD):** `Organization`, `WebSite`, `WebPage`, `SoftwareApplication` (with free and credit-pack offers), `FAQPage`, and an `ItemList` with a `VideoObject` for each sample video (`components/JsonLd.tsx`).
- **`/sitemap.xml`** includes video and image entries. **`/robots.txt`** explicitly allows search engines and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others).
- **`/llms.txt`** and **`/llms-full.txt`** are plain-text summaries for AI assistants, generated from `site.ts`, so they never drift from the page.
- **Generated social image** at `/opengraph-image` and `/twitter-image`. There is also an SVG favicon and a web manifest.
- **Semantic markup:** one `h1`, a label on every section, FAQ questions as headings, `header`/`main`/`footer` landmarks, and self-hosted fonts through `next/font` (no layout shift and no third-party font request).
- **Optimised images:** `next/image` serves AVIF/WebP at responsive sizes. Media gets long cache headers.

After launch, submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Bing's index also feeds ChatGPT search.
