"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/components/providers/i18n-provider";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/sections/_social-icon";

export function Topbar() {
  const { phone, email, socials } = siteConfig.company;
  const { language, setLanguage, t } = useTranslation();
  const scrolled = useScrolled();

  return (
    <div
      className={cn(
        "hidden md:block fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300",
        scrolled ? "bg-foreground text-background" : "bg-transparent text-white",
      )}
    >
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <div className="flex h-10 items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{email}</span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="transition-opacity hover:opacity-80"
                  >
                    <SocialIcon platform={s.platform} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
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
                <Image
                  src="/flags/no.svg"
                  alt=""
                  width={20}
                  height={14}
                  style={{ width: "auto", height: "14px" }}
                />
              </button>
              <span aria-hidden className="opacity-50">
                /
              </span>
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
                <Image
                  src="/flags/en.svg"
                  alt=""
                  width={20}
                  height={14}
                  style={{ width: "auto", height: "14px" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
