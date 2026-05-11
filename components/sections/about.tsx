"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";
import {
  useLocalizedContent,
  useTranslation,
} from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";

export function About() {
  const { headline, body, image, approvals } = siteConfig.about;
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const localizedHeadline = tc("content.about.headline", headline);
  const localizedBody = body.map((p, i) => tc(`content.about.body.${i}`, p));
  const approvalsHeadline = approvals
    ? tc("content.about.approvals.headline", approvals.headline)
    : null;
  const approvalsBody = approvals
    ? tc("content.about.approvals.body", approvals.body)
    : null;

  return (
    <section id="about" className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        {/*
          Mobile (flex-col):  1. badge+h2  →  2. image  →  3. body+button
          Desktop (lg:grid):  image (col1, row1-2)  |  badge+h2 (col2, row1)
                                                       body+button (col2, row2)
        */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
          {/* 1 — Badge + headline */}
          <Reveal className="flex flex-col items-center md:items-start bg-white p-6 md:p-10 lg:col-start-2 lg:row-start-1">
            <p className="inline-flex w-fit bg-primary px-5 py-3 text-3xl font-bold tracking-tight text-primary-foreground md:px-6 md:text-5xl">
              {t("nav.about")}
            </p>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground md:text-2xl text-center md:text-left">
              {localizedHeadline}
            </h2>
          </Reveal>

          {/* 2 — Image */}
          <Reveal
            direction="left"
            className="relative isolate aspect-square w-full overflow-hidden bg-white lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:aspect-auto lg:min-h-[560px]"
          >
            <Image
              src={image}
              alt={localizedHeadline}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="z-0 object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.58) 72%, rgba(0,0,0,0.92) 100%)",
              }}
            />
            {approvals && approvalsHeadline && approvalsBody && (
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/75 to-transparent p-4 text-white md:p-6">
                <div className="flex items-end gap-4">
                  <Image
                    src="/badges/godkjent-for-ansvarsrett-white.png"
                    alt={approvalsHeadline}
                    width={112}
                    height={96}
                    className="h-auto w-20 shrink-0 md:w-24"
                  />
                  <div className="min-w-0">
                    <p className="text-base font-bold md:text-lg">
                      {approvalsHeadline}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/90">
                      {approvalsBody}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Reveal>

          {/* 3 — Body + button */}
          <Reveal className="bg-white p-8 md:p-10 lg:col-start-2 lg:row-start-2">
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {localizedBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex justify-center md:justify-start">
              <Button asChild className="h-11 px-6">
                <Link href="/om-oss" className="inline-flex items-center gap-2">
                  {t("cta.learnMore")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
