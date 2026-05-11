import { siteConfig } from "@/lib/site-config";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Server-rendered LocalBusiness JSON-LD.
 */
export function LocalBusinessJsonLd() {
  const c = siteConfig.company;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: c.name,
    description: c.tagline,
    url: SITE_URL,
    telephone: c.phone,
    email: c.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
    },
    sameAs: c.socials.map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
