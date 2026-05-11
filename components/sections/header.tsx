"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import {
  useTranslation,
  useLocalizedContent,
} from "@/components/providers/i18n-provider";
import type { TranslationKey } from "@/lib/i18n";
import { useLenis } from "@/hooks/use-lenis";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/sections/_social-icon";

interface NavLink {
  key: TranslationKey;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { key: "nav.home", href: "#hero" },
  { key: "nav.about", href: "/om-oss" },
  { key: "nav.services", href: "#services" },
  { key: "nav.gallery", href: "/galleri" },
  { key: "nav.reviews", href: "#reviews" },
  { key: "nav.contact", href: "#contact" },
];

export function Header(_props: { forceSolid?: boolean } = {}) {
  const company = siteConfig.company;
  const { t, language, setLanguage } = useTranslation();
  const tc = useLocalizedContent();
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useLockScroll(mobileOpen);

  const serviceLinks = siteConfig.services.map((s, i) => ({
    label: tc(`content.services.${i}.title`, s.title),
    href: `/services/${s.slug}`,
  }));

  const scrollTo = useCallback(
    (target: string) => {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: window.innerWidth >= 768 ? -140 : -90,
        });
      } else if (typeof window !== "undefined") {
        const el = document.querySelector(target);
        if (el instanceof HTMLElement) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) {
        setMobileOpen(false);
        return;
      }
      e.preventDefault();
      setMobileOpen(false);
      // Cross-page anchor: navigate home then let ScrollToTop pick up the hash.
      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }
      setTimeout(() => scrollTo(href), 100);
    },
    [scrollTo, pathname, router],
  );

  const ctaLabel = t("cta.contactUs");

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-300",
          "top-0 md:top-10",
          "bg-white text-foreground shadow-sm",
        )}
      >
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col leading-tight transition-opacity hover:opacity-90"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  scrollTo("#hero");
                }
              }}
            >
              <Image
                src="/logo.png"
                alt={company.name}
                width={150}
                height={52}
                priority
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const label = t(link.key);
                if (link.key === "nav.services") {
                  return (
                    <NavDropdown
                      key={link.key}
                      label={label}
                      triggerHref={"/services"}
                      onTriggerClick={handleNavClick}
                      items={serviceLinks}
                      align="center"
                    />
                  );
                }
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm font-medium transition-opacity hover:opacity-80"
                  >
                    {label}
                  </a>
                );
              })}
            </nav>

            {/* Right cluster — CTA, hamburger */}
            <div className="flex items-center gap-3 md:gap-4">
              <Button
                asChild
                size="sm"
                className="hidden h-10 px-5 text-sm md:inline-flex"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  {ctaLabel}
                </a>
              </Button>

              {/* Hamburger */}
              <button
                type="button"
                aria-label={t("cta.openMenu")}
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-current/20"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer + backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      <aside
        data-lenis-prevent
        className={cn(
          "fixed top-0 right-0 z-[55] flex h-full w-[min(85vw,360px)] flex-col bg-background text-foreground shadow-2xl md:hidden transition-transform duration-300 ease-out overflow-y-auto",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight">
              {company.name}
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
              {tc("content.company.tagline", company.tagline)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label={t("cta.closeMenu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 px-6 py-6">
          <AnimatePresence>
            {mobileOpen &&
              NAV_LINKS.map((link, i) => {
                const label = t(link.key);
                if (link.key === "nav.services") {
                  return (
                    <MobileNavDropdown
                      key={link.key}
                      index={i}
                      label={label}
                      open={mobileServicesOpen}
                      onToggle={() => setMobileServicesOpen((v) => !v)}
                      items={serviceLinks}
                      onItemClick={() => setMobileOpen(false)}
                    />
                  );
                }
                return (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="block py-3 text-base font-semibold hover:text-primary transition-colors"
                  >
                    {label}
                  </motion.a>
                );
              })}
          </AnimatePresence>
        </div>

        <div className="border-t border-border px-6 py-6 space-y-4">
          <a
            href={`tel:${company.phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{company.phone}</span>
          </a>
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>{company.email}</span>
          </a>

          {company.socials.length > 0 && (
            <div className="flex items-center gap-3 pt-1">
              {company.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 text-sm">
            <button
              type="button"
              aria-label={t("lang.norwegian")}
              onClick={() => setLanguage("no")}
              className={cn(
                "flex items-center gap-1 transition-opacity",
                language === "no"
                  ? "font-semibold opacity-100"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <span>NO</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/flags/no.svg" alt="" className="h-[14px] w-auto" />
            </button>
            <span aria-hidden className="opacity-50">/</span>
            <button
              type="button"
              aria-label={t("lang.english")}
              onClick={() => setLanguage("en")}
              className={cn(
                "flex items-center gap-1 transition-opacity",
                language === "en"
                  ? "font-semibold opacity-100"
                  : "opacity-60 hover:opacity-100",
              )}
            >
              <span>EN</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/flags/en.svg" alt="" className="h-[14px] w-auto" />
            </button>
          </div>

          <Button asChild className="w-full h-11">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              {ctaLabel}
            </a>
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Header;

interface DropdownItem {
  label: string;
  href: string;
}

function NavDropdown({
  label,
  triggerHref,
  onTriggerClick,
  items,
  align,
}: {
  label: string;
  triggerHref: string;
  onTriggerClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  items: DropdownItem[];
  align: "center" | "right";
}) {
  return (
    <div className="relative group">
      <a
        href={triggerHref}
        onClick={(e) => onTriggerClick(e, triggerHref)}
        className="flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80"
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
      </a>
      <div
        className={cn(
          "absolute top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "right" && "right-0",
        )}
      >
        <div className="overflow-hidden bg-background text-foreground border border-border rounded-md shadow-lg min-w-[260px]">
          {items.map((item) =>
            item.href.startsWith("#") || item.href.startsWith("/#") ? (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (
                    item.href.startsWith("#") ||
                    (typeof window !== "undefined" &&
                      window.location.pathname === "/" &&
                      item.href.startsWith("/#"))
                  ) {
                    onTriggerClick(e, item.href.replace(/^\//, ""));
                  }
                }}
                className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function MobileNavDropdown({
  index,
  label,
  open,
  onToggle,
  items,
  onItemClick,
}: {
  index: number;
  label: string;
  open: boolean;
  onToggle: () => void;
  items: DropdownItem[];
  onItemClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 text-base font-semibold hover:text-primary transition-colors"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-foreground/40 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="ml-4 overflow-hidden"
          >
            {items.map((s, j) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2, delay: j * 0.05 }}
              >
                <Link
                  href={s.href}
                  onClick={onItemClick}
                  className="block py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {s.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
