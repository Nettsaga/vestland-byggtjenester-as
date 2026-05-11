"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import {
  useLocalizedContent,
  useTranslation,
} from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { siteConfig } from "@/lib/site-config";

export function GalleryPage() {
  const { headline, description, images } = siteConfig.gallery;
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const resolvedHeadline = headline
    ? tc("content.gallery.headline", headline)
    : t("section.ourWork");
  const resolvedDescription = description
    ? tc("content.gallery.description", description)
    : null;
  const localizedImages = images.map((image, index) => ({
    ...image,
    alt: tc(`content.gallery.${index}.alt`, image.alt),
  }));
  const bannerImage = localizedImages[0]?.src ?? "/placeholder.svg";
  const open = openIndex !== null;
  const activeImage = openIndex !== null ? localizedImages[openIndex] : null;

  useEffect(() => setMounted(true), []);
  useLockScroll(open);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((index) =>
        index === null ? null : (index + 1) % localizedImages.length,
      ),
    [localizedImages.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((index) =>
        index === null
          ? null
          : (index - 1 + localizedImages.length) % localizedImages.length,
      ),
    [localizedImages.length],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, next, open, prev]);

  return (
    <main className="w-full bg-white">
      <div className="relative isolate flex h-[45svh] min-h-[320px] w-full items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={bannerImage}
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
            {t("nav.gallery")}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {resolvedHeadline}
          </h1>
          {resolvedDescription && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              {resolvedDescription}
            </p>
          )}
        </Reveal>
      </div>

      <div className="w-full bg-white py-16 md:py-24">
        <Reveal
          stagger
          staggerAmount={0.08}
          className="mx-auto grid max-w-[1500px] gap-3 px-4 sm:grid-cols-2 md:gap-4 md:px-8 lg:grid-cols-3"
        >
          {localizedImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative aspect-[4/3] w-full overflow-hidden bg-white transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${t("cta.openImage")}: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </Reveal>
      </div>

      {mounted &&
        open &&
        activeImage &&
        createPortal(
          <div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.alt}
            className="fixed inset-0 z-[100] flex animate-in items-center justify-center bg-black/90 p-4 fade-in duration-200"
            onClick={close}
          >
            <div
              className="relative flex aspect-[4/3] w-[min(95vw,1400px)] max-h-[90vh] items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={openIndex}
                src={activeImage.src}
                alt={activeImage.alt}
                className="block max-h-full max-w-full animate-in object-contain fade-in duration-300"
              />

              <button
                type="button"
                onClick={close}
                aria-label={t("cta.closeLightbox")}
                className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={prev}
                aria-label={t("cta.previousImage")}
                className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("cta.nextImage")}
                className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                {openIndex !== null ? openIndex + 1 : 0} /{" "}
                {localizedImages.length}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
}

export default GalleryPage;
