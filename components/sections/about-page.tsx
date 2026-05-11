"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import {
  useLocalizedContent,
  useTranslation,
} from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function AboutPage() {
  const { body, approvals } = siteConfig.about;
  const { name } = siteConfig.company;
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const localizedBody = body.map((p, i) => tc(`content.about.body.${i}`, p));
  const approvalsHeadline = approvals
    ? tc("content.about.approvals.headline", approvals.headline)
    : null;
  const approvalsBody = approvals
    ? tc("content.about.approvals.body", approvals.body)
    : null;
  const approvalsLinkLabel = approvals
    ? tc("content.about.approvals.linkLabel", approvals.linkLabel)
    : null;
  const images = [
    {
      src: siteConfig.about.image,
      alt: tc("content.gallery.4.alt", "Trehus i Bergen"),
    },
    {
      src: siteConfig.gallery.images[0]?.src ?? "/placeholder.svg",
      alt: tc("content.gallery.0.alt", "Tømrerarbeid på bolig under rehabilitering"),
    },
    {
      src: siteConfig.services[1]?.image ?? "/placeholder.svg",
      alt: tc("content.gallery.1.alt", "Takarbeid på bolig"),
    },
  ];

  return (
    <main className="w-full bg-white text-foreground">
      <section className="relative isolate flex h-[45svh] min-h-[320px] w-full items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteConfig.about.image}
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
            {t("nav.about")}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {t("nav.about")} {name}
          </h1>
        </Reveal>
      </section>

      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <Reveal
            stagger
            staggerAmount={0.08}
            className="grid gap-4 md:grid-cols-3"
          >
            {images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-[4/3] overflow-hidden bg-white"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {localizedBody.join(" ")}
            </p>
          </Reveal>
        </div>
      </section>

      {approvals && approvalsHeadline && approvalsBody && approvalsLinkLabel && (
        <section className="w-full bg-accent py-14 text-accent-foreground md:py-20">
          <div className="mx-auto grid max-w-[1500px] items-center gap-8 px-4 md:grid-cols-[260px_1fr_auto] md:px-8">
            <div className="flex justify-start">
              <Image
                src="/badges/godkjent-for-ansvarsrett.svg"
                alt={approvalsHeadline}
                width={274}
                height={236}
                className="h-auto w-[220px]"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {approvalsHeadline}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-accent-foreground/90 md:text-lg">
                {approvalsBody}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-11 border-primary bg-primary px-6 text-white hover:bg-primary/90 hover:text-white"
            >
              <a
                href={approvals.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                {approvalsLinkLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}

export default AboutPage;
