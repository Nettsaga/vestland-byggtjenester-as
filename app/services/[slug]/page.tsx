import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { Topbar } from "@/components/sections/topbar";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ServiceDetail } from "@/components/sections/service-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service not found" };
  }
  return {
    title: `${service.title} | ${siteConfig.company.name}`,
    description: service.short,
    openGraph: {
      title: service.title,
      description: service.short,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) notFound();

  // key={slug} remounts ServiceDetail so GSAP Reveal animations re-fire on
  // detail-to-detail navigation.
  return (
    <>
      <Topbar />
      <Header />
      <ServiceDetail key={slug} service={service} />
      <Footer />
    </>
  );
}
