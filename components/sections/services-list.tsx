"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "â€¦";
}

export function ServicesList() {
  const services = siteConfig.services;
  const heroImg = services[0]?.image ?? "/placeholder.svg";
  const { t } = useTranslation();

  return (
    <main className="w-full">
      {/* Banner */}
      <div className="relative isolate w-full h-[45svh] min-h-[320px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImg}
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
            {t("section.ourServices")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            {t("section.exploreServices")}
          </p>
        </Reveal>
      </div>

      {/* Rows */}
      <div className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 space-y-20 md:space-y-28">
          {services.map((service, i) => {
            // Alternate image side per row (spec: row layout for many-services pages).
            const reverse = i % 2 === 1;
            return (
              <section
                key={service.id}
                id={service.id}
                className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center"
              >
                <Reveal
                  direction={reverse ? "right" : "left"}
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden bg-white",
                    reverse && "lg:order-2",
                  )}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full w-full group"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </Reveal>

                <Reveal
                  direction={reverse ? "left" : "right"}
                  className={cn(reverse && "lg:order-1")}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                    {truncateWords(service.description, 45)}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild className="h-11 px-6">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2"
                      >
                        {t("cta.readMore")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-11 px-6">
                      <Link href="/#contact">{t("cta.contactUs")}</Link>
                    </Button>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default ServicesList;
