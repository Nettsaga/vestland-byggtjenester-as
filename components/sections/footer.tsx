"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { useLenis } from "@/hooks/use-lenis";
import {
  useTranslation,
  useLocalizedContent,
} from "@/components/providers/i18n-provider";
import { SocialIcon } from "@/components/sections/_social-icon";

export function Footer() {
  const lenis = useLenis();
  const { name, tagline, phone, email, address, socials } = siteConfig.company;
  const { tagline: footerTagline, legalLinks, copyright } = siteConfig.footer;
  const { t } = useTranslation();
  const tc = useLocalizedContent();
  const localizedCompanyTagline = tc("content.company.tagline", tagline);
  const localizedFooterTagline = tc("content.footer.tagline", footerTagline);
  const localizedCopyright = tc("content.footer.copyright", copyright);

  // Quick links reuse the `nav.*` translation keys (not footer-specific keys)
  // so the footer and navbar stay perfectly in sync across language toggles.
  // `/` is intentionally a real route (not `#home`) â€” anchor-only links break
  // when the user is on a non-home route like `/services/[slug]`.
  const quickLinks: { key: "nav.home" | "nav.about" | "nav.services" | "nav.gallery" | "nav.reviews" | "nav.contact"; href: string }[] = [
    { key: "nav.home", href: "/" },
    { key: "nav.about", href: "/om-oss" },
    { key: "nav.services", href: "/#services" },
    { key: "nav.gallery", href: "/galleri" },
    { key: "nav.reviews", href: "/#reviews" },
    { key: "nav.contact", href: "/#contact" },
  ];

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Cross-page links (e.g. `/`) must fall through to next/link â€” Lenis
      // can't scroll to a section that isn't mounted on the current route.
      if (!href.startsWith("#")) return;
      e.preventDefault();
      if (lenis) {
        // Offsets compensate for the sticky header so anchors don't land
        // hidden behind it (taller on desktop because the topbar adds rows).
        lenis.scrollTo(href, {
          offset: window.innerWidth >= 768 ? -140 : -90,
        });
      } else {
        // Fallback for the brief window before Lenis mounts (or if disabled
        // for reduced-motion users).
        const el = document.querySelector(href);
        if (el instanceof HTMLElement) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  return (
    <footer id="contact" className="w-full bg-[#000000] text-background">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-5">
              <Image
                src="/logo.png"
                alt={name}
                width={150}
                height={52}
                className="h-10 w-auto brightness-0 invert"
              />
              <Image
                src="/badges/godkjent-for-ansvarsrett-white.png"
                alt="Sentral godkjenning for ansvarsrett"
                width={120}
                height={103}
                className="h-14 w-auto brightness-0 invert opacity-80"
              />
            </div>
            <div className="mt-3 text-xs font-medium tracking-widest uppercase opacity-70">
              {localizedCompanyTagline}
            </div>
            <p className="mt-5 text-sm leading-relaxed opacity-80 max-w-xs">
              {localizedFooterTagline}
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <SocialIcon platform={s.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}

          </div>

          {/* Quick links */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-90">
              {t("footer.quickLinks")}
            </div>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link) => {
                const label = t(link.key);
                return (
                  <li key={link.key}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest opacity-90">
              {t("footer.contact")}
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-start gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-2 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 opacity-80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 py-5 flex flex-col-reverse md:flex-row items-center justify-between gap-3 text-xs">
          <span className="opacity-70">{localizedCopyright}</span>
          {legalLinks.length > 0 && (
            <ul className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
