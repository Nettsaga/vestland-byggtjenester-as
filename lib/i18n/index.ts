import { no } from "./no";
import { en } from "./en";

export type Language = "no" | "en";

export const translations = { no, en } satisfies Record<Language, Record<string, string>>;

export type TranslationKey = keyof typeof en;

export function interpolate(
  message: string,
  vars: Record<string, string | number> = {},
): string {
  return message.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}
