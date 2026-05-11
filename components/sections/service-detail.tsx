"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { Service } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";
import { useTranslation, useLocalizedContent } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { EditorialCta } from "@/components/sections/editorial-cta";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const serviceIndex = siteConfig.services.findIndex((s) => s.id === service.id);
  return (
    <article className="w-full">
      {/* Banner */}
      <div className="relative isolate w-full h-[45svh] min-h-[320px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
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
            {tc(`content.services.${serviceIndex}.title`, service.title)}
          </h1>
        </Reveal>
      </div>

      {/* Breadcrumb */}
      <div className="w-full bg-background border-b border-border">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <nav
            aria-label={t("nav.breadcrumb")}
            className="flex items-center gap-1.5 py-4 text-sm"
          >
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <Link
              href="/services"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("breadcrumb.services")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span aria-current="page" className="font-medium text-foreground">
              {tc(`content.services.${serviceIndex}.title`, service.title)}
            </span>
          </nav>
        </div>
      </div>

      {/* Description + sections */}
      <div className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <Reveal className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {t("serviceDetail.overview")}
            </h2>
            {tc(`content.services.${serviceIndex}.description`, service.description)
              .split(/\n\n+/)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </Reveal>

          {/* 3 images side by side */}
          {service.images && service.images.length > 0 && (
            <Reveal stagger staggerAmount={0.1} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {service.images.slice(0, 3).map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt={`${tc(`content.services.${serviceIndex}.title`, service.title)} ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </Reveal>
          )}

          {/* Rich sub-sections (e.g. monteringsarbeid) */}
          {service.sections && service.sections.length > 0 && (
            <Reveal stagger staggerAmount={0.1} className="mt-16 grid gap-12 md:grid-cols-2">
              {service.sections.map((section, sectionIndex) => {
                const localTitle = tc(
                  `content.services.${serviceIndex}.sections.${sectionIndex}.title`,
                  section.title,
                );
                const localBody = tc(
                  `content.services.${serviceIndex}.sections.${sectionIndex}.body`,
                  section.body,
                );
                return (
                  <div key={section.title}>
                    {section.image && (
                      <div className="relative mb-4 aspect-[16/9] overflow-hidden">
                        <Image
                          src={section.image}
                          alt={localTitle}
                          fill
                          loading="lazy"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {localTitle}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {localBody}
                    </p>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((bullet, bulletIndex) => {
                          const localBullet = tc(
                            `content.services.${serviceIndex}.sections.${sectionIndex}.bullets.${bulletIndex}`,
                            bullet,
                          );
                          return (
                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {localBullet}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </Reveal>
          )}
        </div>
      </div>

      <EditorialCta variant="page" />
    </article>
  );
}

export default ServiceDetail;
