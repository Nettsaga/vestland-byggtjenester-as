"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { siteConfig } from "@/lib/site-config";
import { useLocalizedContent } from "@/components/providers/i18n-provider";
import { useLenis } from "@/hooks/use-lenis";
import { getScrollOffset } from "@/lib/scroll-offset";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5000;

export function Hero() {
  const lenis = useLenis();

  const images =
    siteConfig.hero.images.length > 0
      ? siteConfig.hero.images
      : ["/placeholder.svg"];

  const [active, setActive] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    if (!contentRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Make all hero elements immediately visible with no animation
      gsap.set("[data-hero-anim]", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-anim]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, {
          offset: getScrollOffset(),
        });
      } else if (typeof window !== "undefined") {
        const el = document.querySelector(href);
        if (el instanceof HTMLElement) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  const { headline, subheadline, primaryCta, secondaryCta } = siteConfig.hero;
  const tc = useLocalizedContent();
  const localizedHeadline = tc("content.hero.headline", headline);
  const localizedSubheadline = tc("content.hero.subheadline", subheadline);
  const localizedPrimaryLabel = tc("content.hero.primaryCta", primaryCta.label);
  const localizedSecondaryLabel = secondaryCta
    ? tc("content.hero.secondaryCta", secondaryCta.label)
    : null;

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden text-white"
    >
      <div className="absolute inset-0 -z-10">
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        {/* Gradient overlay: stronger at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 pb-16 pt-40 md:pb-24 md:pt-48">
        <div className="max-w-2xl" ref={contentRef}>
          <h1 data-hero-anim className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            {localizedHeadline}
          </h1>
          <p data-hero-anim className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/85">
            {localizedSubheadline}
          </p>

          <div data-hero-anim className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Button asChild size="lg" className="h-10 px-4 text-sm md:h-12 md:px-7 md:text-base">
              <a
                href={primaryCta.href}
                onClick={(e) => handleAnchorClick(e, primaryCta.href)}
              >
                {localizedPrimaryLabel}
              </a>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-10 px-4 text-sm md:h-12 md:px-7 md:text-base bg-transparent border-white text-white hover:bg-background hover:text-foreground"
              >
                <a
                  href={secondaryCta.href}
                  onClick={(e) => handleAnchorClick(e, secondaryCta.href)}
                >
                  {localizedSecondaryLabel}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
