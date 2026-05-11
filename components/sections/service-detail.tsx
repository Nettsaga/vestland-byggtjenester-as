"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import type { Service } from "@/lib/site-config";
import { useTranslation } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const { t } = useTranslation();
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
          {/* Mandatory 50% dark overlay */}
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
            {service.title}
          </h1>
        </Reveal>
      </div>

      {/* Breadcrumb â€” Home / Services / {title}. */}
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
              {service.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Body */}
      <div className="w-full bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <Reveal className="lg:col-span-2 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {t("serviceDetail.overview")}
              </h2>
              {service.description.split(/\n\n+/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal direction="right" as="aside" className="space-y-8">
              {service.features && service.features.length > 0 && (
                <div className="bg-white p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t("serviceDetail.whatsIncluded")}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-foreground text-background p-6">
                <h3 className="text-lg font-semibold">
                  {t("serviceDetail.readyToStart")}
                </h3>
                <p className="mt-2 text-sm opacity-85">
                  {t("serviceDetail.noObligationQuote")}
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="mt-5 w-full h-11"
                >
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    {t("cta.getQuote")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Pre-footer CTA */}
      <section className="w-full bg-foreground text-background">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 py-16 md:py-24">
          <Reveal className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("serviceDetail.readyToGetStartedWith")} {service.title}?
              </h2>
              <p className="mt-4 text-base md:text-lg opacity-80">
                {t("serviceDetail.preFooterDescription")}
              </p>
            </div>
            {/* Two-button pre-footer: primary goes to home `/#contact` (cross-page
                hash, resolved by the home ScrollToTop hook); secondary returns to
                `/services` so users can pivot to a sibling service. */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="h-12 px-7 text-base"
              >
                <Link href="/#contact" className="inline-flex items-center gap-2">
                  {t("cta.getQuote")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base bg-transparent border-background/40 text-background hover:bg-background hover:text-foreground"
              >
                <Link href="/services">{t("cta.allServices")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

export default ServiceDetail;
