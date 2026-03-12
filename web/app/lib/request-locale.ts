import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

const ACCEPT_LANGUAGE_LOCALE_MAP: Record<string, Locale> = {
  be: "ru",
  en: "en",
  kk: "ru",
  ru: "ru",
  uk: "ru",
};

function parseAcceptLanguage(header: string) {
  return header
    .split(",")
    .map((part) => {
      const [tagPart, ...params] = part.trim().toLowerCase().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qParam ? Number(qParam.trim().slice(2)) : 1;

      return {
        quality: Number.isFinite(quality) ? quality : 0,
        tag: tagPart,
      };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((left, right) => right.quality - left.quality);
}

export function detectPreferredLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) {
    return routing.defaultLocale;
  }

  for (const entry of parseAcceptLanguage(acceptLanguage)) {
    const baseLanguage = entry.tag.split("-")[0];
    const locale = ACCEPT_LANGUAGE_LOCALE_MAP[baseLanguage];

    if (locale) {
      return locale;
    }
  }

  return routing.defaultLocale;
}
