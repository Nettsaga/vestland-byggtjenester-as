"use client";

import Image from "next/image";

import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCard } from "@/components/sections/services";
import { EditorialCta } from "@/components/sections/editorial-cta";

export function ServicesList() {
  const services = siteConfig.services;
  const heroImg = services[0]?.image ?? "/placeholder.svg";
  const { t } = useTranslation();

  return (
    <main className="w-full">
      {/* Banner */}
      <div className="relative isolate flex h-[45svh] min-h-[320px] w-full items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImg} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <Reveal
          stagger
          staggerAmount={0.12}
          className="mx-auto w-full max-w-[1500px] px-4 pt-24 text-center md:px-8 md:pt-28"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
            {t("nav.services")}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {t("section.ourServices")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            {t("section.exploreServices")}
          </p>
        </Reveal>
      </div>

      {/* Service cards — same style as home services section */}
      <div className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <Reveal stagger className="grid gap-8 md:gap-10">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </Reveal>
        </div>
      </div>

      <EditorialCta variant="page" />
    </main>
  );
}

export default ServicesList;
