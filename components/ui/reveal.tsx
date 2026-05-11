"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction the element travels FROM. Default "up" (slides up into place). */
  direction?: Direction;
  /** Travel distance in pixels. Default 32. */
  distance?: number;
  /** Animation duration in seconds. Default 0.8. */
  duration?: number;
  /** Delay in seconds before the animation starts. Default 0. */
  delay?: number;
  /**
   * If true, treats direct children as items in a stagger reveal —
   * each child animates in sequence.
   */
  stagger?: boolean;
  /** Stagger amount in seconds. Default 0.1. */
  staggerAmount?: number;
  /**
   * The scroll position (relative to the viewport) at which the reveal fires.
   * Default "top 85%".
   */
  start?: string;
  /** Render as a different element. Default "div". */
  as?: keyof React.JSX.IntrinsicElements;
}

const offsetForDirection = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "none":
    default:
      return {};
  }
};

export function Reveal({
  direction = "up",
  distance = 32,
  duration = 0.8,
  delay = 0,
  stagger = false,
  staggerAmount = 0.1,
  start = "top 85%",
  as = "div",
  children,
  className,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      const offset = offsetForDirection(direction, distance);

      gsap.from(targets, {
        opacity: 0,
        ...offset,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, distance, duration, delay, stagger, staggerAmount, start]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export default Reveal;
