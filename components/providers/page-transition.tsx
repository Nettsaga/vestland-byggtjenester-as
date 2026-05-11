"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fades the route content in on every pathname change.
 *
 * IMPORTANT: This MUST be opacity-only — no `transform`, no `y`/`x`.
 * A `transform` on an ancestor establishes a containing block for
 * `position: fixed` descendants, which breaks our fixed Topbar + Header
 * (they would scroll with the page instead of staying pinned to the
 * viewport). See https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed_positioning
 *
 * Pair with the Lenis SmoothScrollProvider for ScrollTrigger sync.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

export default PageTransition;
