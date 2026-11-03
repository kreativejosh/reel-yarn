import type { MetadataRoute } from "next";
import { sampleVideos, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/opengraph-image`, ...sampleVideos.map((v) => `${site.url}/media/${v.poster}`)],
      videos: sampleVideos.map((v) => ({
        title: v.title,
        thumbnail_loc: `${site.url}/media/${v.poster}`,
        description: `Made with ReelYarn from the prompt: ${v.prompt}`,
        content_loc: `${site.url}/media/${v.slug}.mp4`,
        duration: v.seconds,
      })),
    },
  ];
}
