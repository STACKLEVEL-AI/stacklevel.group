import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://stacklevel.group";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return new URL(DEFAULT_SITE_URL);
  }

  try {
    return new URL(raw);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function localizedPath(locale: string, pathname = "/") {
  const cleanPath = pathname === "/" ? "" : pathname;
  return `/${locale}${cleanPath}`;
}

export function localizedAlternates(locale: string, pathname = "/"): Metadata["alternates"] {
  const currentLocale = locale === "en" ? "en" : "ru";

  return {
    canonical: localizedPath(currentLocale, pathname),
    languages: {
      ru: localizedPath("ru", pathname),
      en: localizedPath("en", pathname),
      "x-default": localizedPath("ru", pathname),
    },
  };
}
