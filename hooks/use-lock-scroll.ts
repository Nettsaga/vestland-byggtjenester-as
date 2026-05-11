"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/use-lenis";

/**
 * Locks page scroll while an overlay (mobile menu, lightbox, modal) is open.
 * Stops the Lenis instance and pins the body so the background page can't scroll.
 * Pair every overlay container with `data-lenis-prevent` so native scroll
 * still works inside the overlay.
 */
export const useLockScroll = (locked: boolean) => {
  const lenis = useLenis();
  useEffect(() => {
    if (locked) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [locked, lenis]);
};
