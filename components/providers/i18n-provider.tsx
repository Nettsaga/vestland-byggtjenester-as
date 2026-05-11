"use client";

import * as React from "react";

import {
  interpolate,
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/i18n";

interface I18nContextValue {
  language: Language;
  override: Language | null;
  setLanguage: (lang: Language | null) => void;
}

const I18nContext = React.createContext<I18nContextValue | null>(null);

const LANG_KEY = "jhk.lang";
const isLang = (v: unknown): v is Language => v === "no" || v === "en";

function readStoredLang(): Language | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(LANG_KEY);
    return isLang(raw) ? raw : null;
  } catch {
    return null;
  }
}

function writeStoredLang(value: Language | null) {
  if (typeof window === "undefined") return;
  try {
    if (value === null) window.sessionStorage.removeItem(LANG_KEY);
    else window.sessionStorage.setItem(LANG_KEY, value);
  } catch {
    // ignore
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverrideState] = React.useState<Language | null>(null);

  React.useEffect(() => {
    const stored = readStoredLang();
    if (stored) setOverrideState(stored);
  }, []);

  const setLanguage = React.useCallback((next: Language | null) => {
    setOverrideState(next);
    writeStoredLang(next);
  }, []);

  // NO is the default language; toggle flips to "en".
  const language: Language = override ?? "no";

  const value = React.useMemo<I18nContextValue>(
    () => ({
      language,
      override,
      setLanguage,
    }),
    [language, override, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18nContext(): I18nContextValue {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within <I18nProvider>");
  }
  return ctx;
}

/**
 * Returns the translation helpers for the current language.
 */
export function useTranslation() {
  const { language, setLanguage } = useI18nContext();
  const t = React.useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      const localized =
        translations[language]?.[key] ?? translations.en[key] ?? (key as string);
      return vars ? interpolate(localized, vars) : localized;
    },
    [language],
  );
  return { t, language, setLanguage };
}

/**
 * Returns a localized-content lookup with fallback to siteConfig values.
 *
 * Used by section components for content strings (hero copy, service titles,
 * etc.) that live in lib/site-config.ts. Looks up content.* keys (typically
 * added by the apply_translations MCP tool) so the language toggle swaps
 * BOTH UI chrome AND business content.
 */
export function useLocalizedContent() {
  const { language } = useI18nContext();
  return React.useCallback(
    (key: string, fallback: string): string => {
      const dict = translations[language] as Record<string, string | undefined>;
      const en = translations.en as Record<string, string | undefined>;
      return dict[key] ?? en[key] ?? fallback;
    },
    [language],
  );
}
