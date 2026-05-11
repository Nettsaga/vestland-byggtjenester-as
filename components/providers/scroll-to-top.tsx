"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@/components/providers/smooth-scroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Resets scroll to the top of the page on every App Router pathname change
 * AND on first mount, then forces Lenis to recompute its cached scroll
 * dimensions for the new route.
 *
 * Lenis caches `scroll` + `limit` and does not auto-recompute when the
 * App Router swaps the page tree (e.g. from `/services/foo` — a tall page —
 * to `/`). Without `lenis.resize()` the user is stuck unable to scroll
 * past the OLD page's height. ScrollTrigger.refresh() keeps GSAP pins/
 * triggers honest after the layout has settled.
 *
 * Per workflow-build.md ("Cross-Page Anchor Navigation — Technical Solution"),
 * Lenis intercepts `window.scrollTo`, so we must also explicitly stop Lenis,
 * call `lenis.scrollTo(0, { immediate: true })` on the next frame, and
 * restart it.
 *
 * Mount this once inside `app/layout.tsx` (must be a client component).
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // If the URL has a hash, we want to scroll to that anchor instead of
    // resetting to the top. This makes cold-loads of `/#contact` (or
    // cross-page nav like `/services/x` → `/#contact`) actually land at
    // the section, not at scrollY=0.
    const hash = window.location.hash;

    if (!hash) {
      // Native reset first (covers the case where Lenis isn't ready yet).
      window.scrollTo(0, 0);
    }

    if (!lenis) return;

    lenis.stop();

    const raf = requestAnimationFrame(() => {
      // Recompute Lenis' cached scroll height for the NEW route's content
      // BEFORE attempting any scrollTo so the limit is correct.
      lenis.resize();

      if (hash) {
        // Two RAFs lets the new route's DOM paint before scroll target lookup.
        requestAnimationFrame(() => {
          lenis.scrollTo(hash, {
            offset: window.innerWidth >= 768 ? -140 : -90,
            immediate: false,
          });
          lenis.start();
          ScrollTrigger.refresh();
        });
      } else {
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
        ScrollTrigger.refresh();
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
