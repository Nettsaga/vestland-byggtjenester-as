"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig, type Service } from "@/lib/site-config";
import {
  useTranslation,
  useLocalizedContent,
} from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface ServicesProps {
  heading?: string;
  description?: string;
}

export function Services({ heading, description }: ServicesProps) {
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const resolvedHeading = heading ?? t("section.ourServices");

  const services = siteConfig.services.slice(0, 4);
  const viewAllHref = "/services";

  return (
    <section id="services" className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <Reveal className="flex flex-col items-center md:items-start max-w-3xl">
          <h2 className="inline-flex bg-accent px-5 py-3 text-3xl font-bold leading-[1.05] tracking-tight text-accent-foreground md:px-6 md:text-5xl">
            {resolvedHeading}
          </h2>
          {description && (
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-8 md:mt-16 md:gap-10">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 border-accent bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90"
          >
            <Link href={viewAllHref} className="inline-flex items-center gap-2">
              {t("cta.viewAllServices")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const localizedTitleValue = tc(`content.services.${index}.title`, service.title);
  const localizedShortValue = tc(`content.services.${index}.short`, service.short);

  return (
    <article
      id={service.id}
      className="group grid overflow-hidden border border-border bg-white transition-shadow hover:shadow-lg lg:grid-cols-2"
    >
      <Link
        href={`/services/${service.slug}`}
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden bg-white lg:aspect-auto lg:min-h-[460px]",
          index % 2 === 1 && "lg:order-2",
        )}
      >
        <Image
          src={service.image}
          alt={localizedTitleValue}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div
        className={cn(
          "flex flex-col justify-center p-7 md:p-12 lg:min-h-[460px]",
          index % 2 === 1 && "lg:order-1",
        )}
      >
        <h3 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {localizedTitleValue}
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
          {localizedShortValue}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild className="h-11 bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2"
            >
              {t("cta.learnMore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-accent bg-white px-6 text-accent hover:bg-accent hover:text-white"
          >
            <Link href="/#contact">{t("cta.contactUs")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default Services;
