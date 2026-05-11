import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Required for `output: "export"` — Route Handlers must opt into static
// generation explicitly so Next can emit them at build time.
export const dynamic = "force-static";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomrerservice.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/om-oss`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/galleri`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
  for (const service of siteConfig.services) {
    staticRoutes.push({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return staticRoutes;
}
