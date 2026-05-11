"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";

// The 404 is intentionally chrome-free — no Topbar, no Header, no Footer.
// Reasons:
//  - Next.js 16's not-found boundary re-attempts route matching on re-render,
//    so any in-page language/state toggle (e.g. the topbar) bumps the user
//    onto a real route mid-click.
//  - A full-chrome 404 invites the user to keep exploring on a broken URL;
//    a minimal one funnels them straight back home.
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-svh w-full flex-1 items-center justify-center bg-background px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <Link
          href="/"
          className="mx-auto inline-flex flex-col leading-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="text-xl font-bold tracking-tight">
            {siteConfig.company.name}
          </span>
          <span className="text-[10px] font-medium tracking-widest uppercase opacity-70">
            {siteConfig.company.tagline}
          </span>
        </Link>

        <p className="mt-12 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          {t("notFound.description")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="h-12 px-7 text-base">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("notFound.backHome")}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
