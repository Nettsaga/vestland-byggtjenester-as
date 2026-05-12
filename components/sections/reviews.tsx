"use client";

import { Star } from "lucide-react";

import {
  siteConfig,
  type Review,
  type ReviewPlatform,
} from "@/lib/site-config";
import {
  useTranslation,
  useLocalizedContent,
} from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Reviews() {
  const { t } = useTranslation();
  const { items, platforms } = siteConfig.reviews;
  const safePlatforms = platforms ?? [];

  const baseItems =
    items.length > 0
      ? Array.from(
          { length: Math.max(items.length, 8) },
          (_, index) => items[index % items.length],
        )
      : [];
  const row1 = [...baseItems, ...baseItems, ...baseItems];
  const row2 = [...baseItems, ...baseItems, ...baseItems];

  return (
    <section id="reviews" className="w-full overflow-hidden bg-white py-16 md:py-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex bg-primary px-5 py-3 text-2xl font-bold tracking-tight text-primary-foreground md:px-6 md:text-3xl">
              {t("section.customerReviewsPrompt")}
            </span>
          </div>

          {safePlatforms.length > 0 && (
            <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-3">
              {safePlatforms.map((platform) => (
                <ReviewPlatformBadge key={platform.name} platform={platform} />
              ))}
            </div>
          )}
        </Reveal>
      </div>

      <div className="mt-14 px-5 md:hidden">
        <Reveal stagger staggerAmount={0.08} className="grid gap-4 sm:grid-cols-2">
          {items.map((review) => (
            <ReviewCard key={`m-${review.id}`} review={review} />
          ))}
        </Reveal>
      </div>

      <Reveal
        stagger
        staggerAmount={0.12}
        className="mt-14 hidden space-y-4 md:block"
      >
        <div className="relative">
          <div className="flex gap-4 animate-marquee-left">
            {row1.map((review, index) => (
              <ReviewCard key={`r1-${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-4 animate-marquee-right">
            {row2.map((review, index) => (
              <ReviewCard key={`r2-${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ReviewPlatformBadge({ platform }: { platform: ReviewPlatform }) {
  const { t } = useTranslation();

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="review-platform flex w-full md:flex-1 md:min-w-[150px] flex-wrap items-center gap-x-3 gap-y-1 border border-border bg-white px-4 py-3 min-h-[72px] transition-colors hover:bg-white"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={platform.logo} alt={platform.name} className="h-8 w-auto max-w-[140px] shrink-0 object-contain" />
      <span className="whitespace-nowrap text-sm text-muted-foreground">
        ({t("rating.reviews", { count: platform.count })})
      </span>
    </a>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const reviewText = tc(`content.reviews.items.${review.id}.text`, review.text);

  return (
    <article className="flex w-full shrink-0 flex-col border border-border bg-white p-6 md:min-h-[260px] md:w-[320px] md:p-7">
      <div
        className="flex items-center gap-1"
        aria-label={t("rating.outOfFive", { count: review.rating })}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="flex h-7 w-7 items-center justify-center bg-accent">
            <Star
              className={cn(
                "h-4 w-4",
                i < review.rating ? "fill-white text-white" : "fill-white/30 text-white/30",
              )}
            />
          </span>
        ))}
      </div>

      <p className="mt-5 flex-1 text-base leading-relaxed text-muted-foreground">{reviewText}</p>

      <div className="mt-8 flex items-center gap-3">
        <div className="review-avatar flex h-10 w-10 shrink-0 items-center justify-center bg-muted text-sm font-semibold text-foreground">
          {review.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>
        <span className="text-base font-semibold text-foreground">{review.name}</span>
      </div>
    </article>
  );
}

export default Reviews;
