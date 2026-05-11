"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/lib/site-config";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useTranslation } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function Gallery() {
  const { images } = siteConfig.gallery;
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [mounted, setMounted] = useState(false);
  const open = openIndex !== null;

  // SSR safety: `document.body` doesn't exist during server render, so gate
  // `createPortal()` behind a post-mount flag. Without this, the section
  // throws a ReferenceError during the static prerender.
  useEffect(() => setMounted(true), []);

  // Halts Lenis smooth-scroll AND body scroll while the lightbox is open.
  // Lenis hijacks the wheel event globally; without this hook the page would
  // continue scrolling under the overlay when the user wheels over the image.
  useLockScroll(open);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  // Keyboard navigation when lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, close]);

  const activeImage = openIndex !== null ? images[openIndex] : null;
  const previewImages = Array.from({ length: Math.min(3, images.length) }, (_, i) => {
    const imageIndex = (startIndex + i) % images.length;
    return { ...images[imageIndex], imageIndex };
  });
  const showGalleryControls = images.length > previewImages.length;

  const nextPreview = useCallback(() => {
    setSlideDirection(1);
    setStartIndex((index) => (index + 1) % images.length);
  }, [images.length]);

  const prevPreview = useCallback(() => {
    setSlideDirection(-1);
    setStartIndex((index) => (index - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <section id="gallery" className="w-full bg-accent py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="inline-flex bg-primary px-5 py-3 text-3xl font-bold tracking-tight text-primary-foreground md:px-6 md:text-5xl">
              {t("section.exploreOurWork")}
            </h2>
          </div>
          {showGalleryControls && (
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={prevPreview}
                aria-label={t("cta.previousImage")}
                className="inline-flex h-11 w-11 items-center justify-center border border-white bg-white text-accent transition-colors hover:bg-accent hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextPreview}
                aria-label={t("cta.nextImage")}
                className="inline-flex h-11 w-11 items-center justify-center border border-white bg-white text-accent transition-colors hover:bg-accent hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-4 overflow-hidden md:grid-cols-[1fr_1fr_2fr]">
            <AnimatePresence mode="popLayout" initial={false} custom={slideDirection}>
              {previewImages.map((img, i) => (
                <motion.button
                  layout
                  custom={slideDirection}
                  initial={{ opacity: 0, x: slideDirection * 56 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection * -56 }}
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.04,
                  }}
                  key={`${img.src}-${img.imageIndex}`}
                  type="button"
                  onClick={() => setOpenIndex(img.imageIndex)}
                  className="group relative h-[360px] w-full overflow-hidden bg-white transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-[430px]"
                  aria-label={`${t("cta.openImage")}: ${img.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <Button asChild size="lg" className="h-12 bg-white px-8 text-base text-accent hover:bg-white/90 hover:text-accent">
            <Link href="/galleri" className="inline-flex items-center gap-2">
              {t("cta.viewAllWork")}
            </Link>
          </Button>
        </Reveal>
      </div>

      {/* Custom portal-based lightbox â€” pairs with useLockScroll() to halt Lenis. */}
      {mounted &&
        open &&
        activeImage &&
        createPortal(
          <div
            // Belt-and-suspenders alongside useLockScroll: tells Lenis to ignore
            // wheel/touch events that originate inside the overlay subtree, so
            // the user can still scroll natively if the image overflows.
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.alt}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
            onClick={close}
          >
            <div
              // Deterministic 4:3 box (clamped to 95vw / 90vh) anchors the
              // close/prev/next buttons regardless of the inner image's
              // intrinsic size. Bug history: SVG placeholders without
              // width/height attrs collapsed this container to 0Ã—0, which
              // floated the controls to the viewport corners. Forcing the
              // aspect ratio here keeps the chrome stable for ANY src.
              className="relative flex aspect-[4/3] w-[min(95vw,1400px)] max-h-[90vh] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Plain <img> instead of next/image: lightbox sources can be
                  arbitrary SVG/placeholder content without intrinsic dimensions,
                  which next/image (in `fill` mode) requires a sized parent for.
                  `key={openIndex}` re-mounts the element on prev/next so the
                  fade-in animation re-plays per slide. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={openIndex}
                src={activeImage.src}
                alt={activeImage.alt}
                className="block max-h-full max-w-full object-contain animate-in fade-in duration-300"
              />

              <button
                type="button"
                onClick={close}
                aria-label={t("cta.closeLightbox")}
                className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={prev}
                aria-label={t("cta.previousImage")}
                className="absolute top-1/2 -translate-y-1/2 left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t("cta.nextImage")}
                className="absolute top-1/2 -translate-y-1/2 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs">
                {openIndex !== null ? openIndex + 1 : 0} / {images.length}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

export default Gallery;
