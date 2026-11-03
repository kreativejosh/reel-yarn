import { creditCosts, editFeatures, faqs, formats, icps, packs, pricing, sampleVideos, site, startWays } from "@/content/site";

// Plain-text summaries for AI assistants (https://llmstxt.org).
export function llmsSummary() {
  return `# ${site.name}

> ${site.description}

${site.name} is a web-based AI video maker. You type one line (or paste your website, upload photos, a logo or a talking video) and it writes the script, designs every scene, adds an AI voiceover and captions, and exports a ready-to-post video in 9:16, 1:1 and 16:9.

## Key facts
- Pricing: pay as you go with credits. ${pricing.pills.join(". ")}. Packs from $${packs[0][1]} (${packs[0][0]} credits) to $${packs[packs.length - 1][1]} (${packs[packs.length - 1][0].toLocaleString("en-US")} credits).
- A 30-second video costs about 11 credits. Failed videos refund their credits.
- Languages: English, Pidgin, French, Spanish, Portuguese and Arabic, with selectable accents.
- Users own the videos they make.
- Contact: ${site.email}

## Pages
- [Home](${site.url}/): product overview, examples, pricing and FAQ
- [Full details](${site.url}/llms-full.txt): every fact on the site in plain text
`;
}

export function llmsFull() {
  return `${llmsSummary()}
## Who it's for
${icps.map((c) => `- ${c.who} (${c.tag}): "${c.quote}"`).join("\n")}

## What you can make
${formats.intro}
${formats.kinds.map((k) => `- ${k}`).join("\n")}

## Ways to start
${startWays.map((w) => `- ${w.title}: ${w.body}`).join("\n")}

## Editing features
${editFeatures.map((f) => `- ${f.name}: ${f.body}`).join("\n")}

## Pricing
${pricing.intro}
${packs.map(([c, usd]) => `- ${c.toLocaleString("en-US")} credits: $${usd} one-time`).join("\n")}

What credits cost:
${creditCosts.map((c) => `- ${c.what}: ${c.credits} credits`).join("\n")}

## Sample videos made with ${site.name}
${sampleVideos.map((v) => `- ${v.title} (${v.seconds} s): ${site.url}/media/${v.slug}.mp4. Prompt: "${v.prompt}"`).join("\n")}

## Frequently asked questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
}
