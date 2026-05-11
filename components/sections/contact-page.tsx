"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import {
  useTranslation,
  useLocalizedContent,
} from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/ui/reveal";
import { SocialIcon } from "@/components/sections/_social-icon";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", service: "", message: "" };

export function ContactPage() {
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const { phone, email, address, socials } = siteConfig.company;
  const { headline, description } = siteConfig.contact;

  const resolvedHeadline = headline
    ? tc("content.contact.headline", headline)
    : t("section.getInTouch");
  const resolvedDescription = description
    ? tc("content.contact.description", description)
    : null;

  const [values, setValues] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log("Contact form submitted:", values);
    setSubmitted(true);
    setValues(EMPTY);
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="w-full bg-white text-foreground">
      {/* Hero banner — same pattern as about-page */}
      <section className="relative isolate flex h-[45svh] min-h-[320px] w-full items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteConfig.hero.images[0] ?? "/placeholder.svg"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <Reveal
          stagger
          staggerAmount={0.12}
          className="mx-auto w-full max-w-[1500px] px-4 pt-24 text-center md:px-8 md:pt-28"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
            {t("nav.contact")}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            {resolvedHeadline}
          </h1>
        </Reveal>
      </section>

      {/* Contact content */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <div className="mt-0 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Contact details */}
            <Reveal className="h-full">
              <div className="flex h-full min-h-[520px] max-h-[900px] flex-col border border-border bg-card p-6 md:p-8">
                {resolvedDescription && (
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground border-b border-border pb-6">
                    {resolvedDescription}
                  </p>
                )}
                <h2 className="text-xl font-semibold text-foreground">
                  {t("section.reachOutDirectly")}
                </h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        {t("contact.phone")}
                      </div>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="text-base text-foreground hover:underline"
                      >
                        {phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        {t("contact.email")}
                      </div>
                      <a
                        href={`mailto:${email}`}
                        className="text-base text-foreground hover:underline"
                      >
                        {email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        {t("contact.address")}
                      </div>
                      <div className="text-base text-foreground">{address}</div>
                    </div>
                  </li>
                </ul>

                {socials.length > 0 && (
                  <div className="mt-8">
                    <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      {t("section.followUs")}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      {socials.map((s) => (
                        <a
                          key={s.platform}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform}
                          className="text-foreground/70 transition-colors hover:text-primary"
                        >
                          <SocialIcon platform={s.platform} className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal className="h-full">
              <form
                onSubmit={onSubmit}
                className="flex h-full min-h-[520px] max-h-[900px] flex-col border border-border bg-card p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold text-foreground">
                  {t("section.sendUsAMessage")}
                </h2>

                <div className="mt-6 flex-1 space-y-4">
                  <div>
                    <label
                      htmlFor="cp-name"
                      className="block text-sm font-medium text-foreground"
                    >
                      {t("form.name")}
                    </label>
                    <Input
                      id="cp-name"
                      type="text"
                      required
                      value={values.name}
                      onChange={onChange("name")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cp-email"
                      className="block text-sm font-medium text-foreground"
                    >
                      {t("form.email")}
                    </label>
                    <Input
                      id="cp-email"
                      type="email"
                      required
                      value={values.email}
                      onChange={onChange("email")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cp-phone"
                      className="block text-sm font-medium text-foreground"
                    >
                      {t("form.phoneOptional")}
                    </label>
                    <Input
                      id="cp-phone"
                      type="tel"
                      value={values.phone}
                      onChange={onChange("phone")}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cp-service"
                      className="block text-sm font-medium text-foreground"
                    >
                      {t("form.whatService")}
                    </label>
                    <ServiceSelect
                      value={values.service}
                      onChange={(v) => setValues((s) => ({ ...s, service: v }))}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cp-message"
                      className="block text-sm font-medium text-foreground"
                    >
                      {t("form.message")}
                    </label>
                    <textarea
                      id="cp-message"
                      required
                      rows={5}
                      value={values.message}
                      onChange={onChange("message")}
                      className="mt-1.5 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="mt-6 h-11 w-full">
                  {t("cta.sendMessage")}
                </Button>

                {submitted && (
                  <p role="status" className="mt-4 text-sm text-green-600 dark:text-green-400">
                    {t("form.thanksMessage")}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section aria-label={t("contact.mapLabel")} className="h-[420px] w-full md:h-[520px]">
        <iframe
          title="JHK Tømrerservice AS — kart"
          src="https://maps.google.com/maps?q=JHK+T%C3%B8mrerservice+As%2C+Tjuvikvegen+18%2C+5108+Hordvik%2C+Norway&output=embed&z=16"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </main>
  );
}

export default ContactPage;

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const generalInquiry = t("form.generalInquiry");
  const displayValue = value || generalInquiry;
  const options = [generalInquiry, ...siteConfig.services.map((s) => s.title)];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative mt-1.5">
      <button
        id="cp-service"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <span>{displayValue}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg"
        >
          {options.map((opt) => {
            const active = opt === displayValue;
            return (
              <li key={opt} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt === generalInquiry ? "" : opt);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                    active && "font-medium",
                  )}
                >
                  <span>{opt}</span>
                  {active && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
