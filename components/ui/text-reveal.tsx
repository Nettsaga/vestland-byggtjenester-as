"use client";

import * as React from "react";
import { gsap } from "gsap";

type Tag = "h1" | "h2" | "h3" | "h4" | "p";

interface TextRevealProps {
  text: string;
  as?: Tag;
  highlight?: string;
  className?: string;
  highlightClassName?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  trigger?: "scroll" | "mount";
}

const DEFAULT_HIGHLIGHT =
  "inline-block bg-primary text-primary-foreground px-3 md:px-4 leading-[0.95] align-baseline";

export function TextReveal({
  text,
  as = "h2",
  highlight,
  className,
  highlightClassName = DEFAULT_HIGHLIGHT,
  stagger = 0.06,
  duration = 0.7,
  delay = 0,
  start = "top 85%",
  trigger = "scroll",
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const words = el.querySelectorAll<HTMLElement>("[data-text-reveal-word]");
    if (words.length === 0) return;

    if (reduced) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(words, { yPercent: 110, opacity: 0 });

    const tween: gsap.TweenVars = {
      yPercent: 0,
      opacity: 1,
      ease: "power3.out",
      duration,
      delay,
      stagger,
    };

    if (trigger === "mount") {
      gsap.to(words, tween);
      return () => {
        gsap.killTweensOf(words);
      };
    }

    let played = false;
    const match = /top\s+(\d+)%/.exec(start);
    const topPct = match ? Number(match[1]) : 85;
    const rootMarginBottom = -(100 - topPct);
    const triggerY = window.innerHeight * (topPct / 100);

    if (el.getBoundingClientRect().top <= triggerY) {
      played = true;
      gsap.to(words, tween);
      return () => {
        gsap.killTweensOf(words);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            gsap.to(words, tween);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: `0px 0px ${rootMarginBottom}% 0px`, threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      gsap.killTweensOf(words);
    };
  }, [text, highlight, stagger, duration, delay, start, trigger]);

  const words = text.split(/\s+/).filter(Boolean);

  let highlightStart = -1;
  let highlightEnd = -1;
  if (highlight) {
    const highlightWords = highlight.split(/\s+/).filter(Boolean);
    const joined = highlightWords.join(" ");
    for (let i = 0; i <= words.length - highlightWords.length; i++) {
      if (words.slice(i, i + highlightWords.length).join(" ") === joined) {
        highlightStart = i;
        highlightEnd = i + highlightWords.length - 1;
        break;
      }
    }
  }

  const renderWord = (word: string, idx: number, trailingSpace: boolean) => (
    <span
      key={`w-${idx}`}
      className={
        "inline-block overflow-hidden align-bottom" +
        (trailingSpace ? " me-[0.25em]" : "")
      }
      aria-hidden="true"
    >
      <span data-text-reveal-word className="inline-block will-change-transform">
        {word}
      </span>
    </span>
  );

  const renderSpace = (key: string) => (
    <span
      key={key}
      className="inline-block overflow-hidden align-bottom me-[0.25em]"
      aria-hidden="true"
    >
      <span data-text-reveal-word className="inline-block will-change-transform">
        {" "}
      </span>
    </span>
  );

  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < words.length) {
    if (i === highlightStart) {
      const group: React.ReactNode[] = [];
      for (let j = highlightStart; j <= highlightEnd; j++) {
        const hasTrailingSpace = j < highlightEnd;
        group.push(renderWord(words[j], j, hasTrailingSpace));
      }
      nodes.push(
        <span key={`hl-${highlightStart}`} className={highlightClassName}>
          {group}
        </span>,
      );
      if (highlightEnd < words.length - 1) {
        nodes.push(renderSpace(`hl-space-${highlightEnd}`));
      }
      i = highlightEnd + 1;
    } else {
      const hasTrailingSpace = i < words.length - 1 && i + 1 !== highlightStart;
      nodes.push(renderWord(words[i], i, hasTrailingSpace));
      if (i + 1 === highlightStart) {
        nodes.push(renderSpace(`pre-hl-space-${i}`));
      }
      i++;
    }
  }

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {nodes}
    </Tag>
  );
}

export default TextReveal;
