"use client";

import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { useTranslation, useLocalizedContent } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";

interface EditorialCtaProps {
  variant?: "home" | "page";
}

export function EditorialCta({ variant = "home" }: EditorialCtaProps) {
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const contactHeadline = tc("content.contact.headline", siteConfig.contact.headline ?? "");
  const contactDescription = tc("content.contact.description", siteConfig.contact.description);

  const isHome = variant === "home";
  const secondaryHref = isHome ? "#services" : "/services";

  return (
    <section className="relative w-full overflow-hidden bg-primary text-primary-foreground">
      {/* Concentric ring decorations */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.18]">
        <div className="absolute h-[700px] w-[700px] rounded-full border-2 border-primary-foreground" />
        <div className="absolute h-[500px] w-[500px] rounded-full border-2 border-primary-foreground" />
        <div className="absolute h-[300px] w-[300px] rounded-full border-2 border-primary-foreground" />
      </div>

      <Reveal
        className={
          isHome
            ? "relative mx-auto max-w-[1500px] px-5 py-20 text-center md:px-10 md:py-28"
            : "relative mx-auto max-w-[1500px] px-5 py-14 text-center md:px-10 md:py-20"
        }
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-foreground/60">
          {t("section.getInTouch")}
        </p>

        <h2
          className={
            isHome
              ? "mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
              : "mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl"
          }
        >
          {contactHeadline}
        </h2>

        {contactDescription && (
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
            {contactDescription}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/kontakt"
            className="inline-flex h-12 items-center bg-primary-foreground px-8 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
          >
            {t("cta.contactUs")}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex h-12 items-center bg-primary-foreground/15 px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/25"
          >
            {t("cta.ourServices")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default EditorialCta;
