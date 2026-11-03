// Single source of truth for page copy. The page, the JSON-LD structured data,
// the sitemap and /llms.txt all read from here, so search engines and AI
// assistants always see the same facts as visitors.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://reelyarn.com").replace(/\/$/, "");

export const site = {
  name: "ReelYarn",
  url: SITE_URL,
  title: "ReelYarn: AI video maker that turns one line into a ready-to-post video",
  shortTitle: "ReelYarn: AI video maker",
  description:
    "ReelYarn writes, designs, voices and captions videos from one line of text. Make promos, lessons, product ads and captions in 9:16, 1:1 and 16:9. No subscription, 20 free credits.",
  tagline: "Start creating content with just one line",
  email: "hello@reelyarn.com",
  locale: "en_US",
  // Replace these with the real app routes when they exist.
  links: {
    signIn: "#",
    signUp: "#",
    academy: "#",
    community: "#",
    services: "#",
    contact: "#",
    refund: "#",
    terms: "#",
    privacy: "#",
    acceptableUse: "#",
    copyright: "#",
  },
  social: {
    instagram: "#",
    tiktok: "#",
    youtube: "#",
    linkedin: "#",
  },
  keywords: [
    "AI video maker",
    "text to video",
    "AI video generator",
    "promo video maker",
    "auto captions",
    "AI voiceover",
    "faceless video",
    "stick figure video",
    "short-form video",
    "TikTok video maker",
    "Instagram Reels maker",
    "video for small business",
    "lesson video maker",
    "Pidgin voiceover",
  ],
} as const;

export const nav = [
  { href: "#who", label: "Who it's for" },
  { href: "#gallery", label: "Examples" },
  { href: "#formats", label: "What you can make" },
  { href: "#edit", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export const hero = {
  lines: ["Start creating content", "with just one line"],
  sub: "For businesses growing with video, creators building a niche, and teachers turning what they know into courses. ReelYarn writes, designs, voices and captions every video, ready to post.",
  fine: "20 free credits. No card. No editing skills.",
};

export type Icp = { who: string; tag: string; quote: string; photo: string };

export const icps: Icp[] = [
  { who: "Business owners", tag: "Promos & offers", quote: "Post a new offer every week without hiring an editor.", photo: "1758887261865-a2b89c0f7ac5" },
  { who: "Teachers & tutors", tag: "Courses & lessons", quote: "Turn what I teach in class into lessons people pay for.", photo: "1758685847747-597ce085906e" },
  { who: "Creators", tag: "Niche channels", quote: "Show up every day in my niche and get paid for it.", photo: "1673767298248-b128f17f89af" },
  { who: "Coaches & consultants", tag: "Personal brand", quote: "Share what I know daily, so clients come to me.", photo: "1757620765404-a1ee66df5e27" },
  { who: "Online sellers", tag: "Product videos", quote: "A video for every product, the day it lands in stock.", photo: "1770013413878-2530e2c3d82b" },
  { who: "Freelancers & agencies", tag: "Client content", quote: "Deliver a month of client videos in one afternoon.", photo: "1781888679143-01d758aedbe6" },
];

export type SampleVideo = {
  slug: string;
  tag: string;
  title: string;
  prompt: string;
  poster: string;
  width: number;
  height: number;
  seconds: number;
  wide?: boolean;
};

// Sample videos made with ReelYarn. `title` is used for structured data.
export const sampleVideos: SampleVideo[] = [
  { slug: "promo-coffee", tag: "Café promo", title: "Café promo video made from one line", prompt: "Promo for Juniper Coffee. Butter croissants fresh from the oven every morning at 7, 9:16.", poster: "promo-coffee.jpg", width: 432, height: 768, seconds: 6 },
  { slug: "captions-barista", tag: "Auto captions", title: "Auto captions on a café video", prompt: "Caption my café video. Bold captions, highlight the key words.", poster: "captions-barista.jpg", width: 540, height: 960, seconds: 10 },
  { slug: "promo-slick-wide", tag: "Product promo · 16:9", title: "16:9 product promo for a newsletter tool", prompt: "Promo for my newsletter tool: your first 100 subscribers cost nothing. Bold type, 16:9.", poster: "promo-slick-wide.jpg", width: 960, height: 540, seconds: 10, wide: true },
  { slug: "lesson-fractions", tag: "Lesson", title: "Lesson video on equivalent fractions", prompt: "Lesson for 10-year-olds on equivalent fractions. Show every step.", poster: "lesson-fractions.jpg", width: 540, height: 960, seconds: 10 },
  { slug: "event-birthday", tag: "Event invite", title: "Birthday party invite video for a café", prompt: "Invite for Juniper Coffee's 5th birthday party. Warm and friendly, 9:16.", poster: "event-birthday.jpg", width: 540, height: 960, seconds: 12 },
  { slug: "stick-promo", tag: "Stick-figure story", title: "Stick-figure story for a family counselling page", prompt: "Stick-figure story for my family counselling page: a couple argues over chores while the kids watch.", poster: "stick-promo-poster.jpg", width: 540, height: 960, seconds: 11 },
  { slug: "realistic-coffee", tag: "Realistic video", title: "Realistic AI video of a barista serving croissants", prompt: "Realistic video of our barista serving fresh croissants at 7 am.", poster: "realistic-coffee.jpg", width: 432, height: 768, seconds: 6 },
];

export const SAMPLES_PUBLISHED = "2026-10-01";

export const formats = {
  heading: "Make any kind of video with ReelYarn",
  intro: "Promos, lessons, top lists, trivia, kids' stories, slideshows and captions on your own videos. No editing or design skills needed.",
  kinds: ["Lessons", "Top lists & trivia", "Promos from your website", "Captions", "Stick-figure stories", "Product ads"],
};

export const startWays = [
  { title: "Upload what you already have", body: "Start with photos, your logo or a video of yourself talking. ReelYarn turns them into a slideshow, a step-by-step or a captioned clip." },
  { title: "Paste your website", body: "ReelYarn visits your site like a customer would, picks your real products and screens, and writes the promo for you." },
];

export type EditFeature = { key: "voice" | "caps" | "lang" | "shape" | "words"; name: string; body: string };

export const editFeatures: EditFeature[] = [
  { key: "voice", name: "AI voiceovers", body: "Natural voices in the accent your audience knows, timed to every scene." },
  { key: "caps", name: "Auto captions", body: "Every word appears as it's said. Pick Bold, Clean, Pop or Minimal." },
  { key: "lang", name: "Your language", body: "Write in English, Pidgin, French, Spanish, Portuguese or Arabic." },
  { key: "shape", name: "Every shape", body: "One video comes out tall, square and wide, with the post text for each app." },
  { key: "words", name: "Changes in plain words", body: "Type what you want changed. Only that part is redone." },
];

export const voices: [string, string[], boolean][] = [
  ["Ada", ["Warm", "Conversational", "Nigerian", "Female"], true],
  ["Kofi", ["Energetic", "Narrative", "Ghanaian", "Male"], true],
  ["Chidi", ["Lively", "Pidgin", "Nigerian", "Male"], false],
  ["Wanjiru", ["Calm", "Teacher", "Kenyan", "Female"], false],
  ["Amélie", ["Friendly", "Conversational", "French", "Female"], false],
  ["Tom", ["Calm", "Narrative", "British", "Male"], false],
];

export const languages: [string, string[]][] = [
  ["English", ["Nigerian", "Ghanaian", "Kenyan", "British", "American"]],
  ["Pidgin", ["Lagos", "Accra"]],
  ["Français", ["West African", "France"]],
  ["Español", ["Latin American", "Spain"]],
  ["Português", ["Brazil", "Angola"]],
  ["العربية", ["Egyptian", "Gulf"]],
];

// [credits, US dollars]
export const packs: [number, number][] = [
  [50, 5],
  [120, 10],
  [300, 22],
  [800, 50],
  [2000, 120],
  [5000, 290],
  [10000, 560],
];
export const NGN_PER_USD = 1402;
export const DEFAULT_PACK = 2;

export const creditCosts = [
  { icon: "promo", what: "30-second promos, explainers or social posts", credits: 11 },
  { icon: "captions", what: "Captions on videos you filmed", credits: 3 },
  { icon: "cinematic", what: "30-second cinematic explainers", credits: 15 },
  { icon: "realistic", what: "Realistic AI shots, 10 s with sound", credits: 30 },
  { icon: "change", what: "Changes to a video you made", credits: 3 },
] as const;

export const pricing = {
  heading: "Pay as you post. Never a subscription.",
  intro: "Buy credits when you need them and spend them on any kind of video. Post daily this month, take a break next month. Paid credits never run out.",
  pills: ["No monthly fee", "Credits never expire", "20 free credits to start"],
};

export const faqs = [
  { q: "What is ReelYarn, and who is it for?", a: "ReelYarn is an AI video maker that turns one line into a ready-to-post video. It's for small businesses that want to grow with video, creators starting or growing a niche, teachers turning their skills into lessons and courses, and anyone who wants to start posting." },
  { q: "What kinds of videos can I make with ReelYarn?", a: "Promos, event invites, product ads, customer reviews, lessons, quizzes, how-tos, top lists, trivia, kids' stories, stick-figure stories, photo slideshows and captions on your own talking videos." },
  { q: "What can I start with to make a video?", a: "A line or two about what you want, your website, your photos, your logo or a video of yourself talking." },
  { q: "Do I need editing or design skills?", a: "No. ReelYarn writes the script, designs every scene, adds the voice and captions. If something is off, type the change, like “make the price bigger”." },
  { q: "How is ReelYarn different from editing apps and other AI video generators?", a: "Editing apps still need you to write, design and cut. Most AI generators give you a clip from a prompt. ReelYarn gives you a finished video for a real purpose, like a promo or a lesson, in every shape, with captions and post text, in your language." },
  { q: "Which languages and accents can I use?", a: "English, Pidgin, French, Spanish, Portuguese and Arabic, and you can pick the accent you want." },
  { q: "How does pricing work?", a: "New accounts get 20 free credits. After that, buy credits from $5. A 30-second video costs about 11 credits. There's no subscription, paid credits never expire, and if a video fails, its credits come back." },
  { q: "Who owns the videos?", a: "You do. Download every shape and use them anywhere you like." },
];

export const footerNav = {
  make: ["Promo videos", "Explainers and quizzes", "Stick-figure videos", "Videos from photos", "Caption my video", "Clips from long videos", "Translate my video"],
};
