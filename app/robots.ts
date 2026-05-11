import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

// Required for `output: "export"` — Route Handlers must opt into static
// generation explicitly so Next can emit them at build time.
export const dynamic = "force-static";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function robots(): MetadataRoute.Robots {
  void siteConfig;
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
