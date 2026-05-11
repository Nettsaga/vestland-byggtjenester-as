"use client";

import * as React from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LenisContext = React.createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return React.useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Stored in state (not ref) so context consumers re-render when the
  // instance becomes available. See workflow-build.md "Cross-Page Anchor
  // Navigation — Technical Solution".
  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync with Lenis-driven scroll position.
    instance.on("scroll", ScrollTrigger.update);

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const resizeObserver = new ResizeObserver(() => {
      instance.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    setLenis(instance);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
