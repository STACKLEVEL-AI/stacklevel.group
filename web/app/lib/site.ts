import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://stacklevel.group";

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return new URL(DEFAULT_SITE_URL);
  }

  try {
    const url = new URL(raw);
    return url.hostname === "stacklevel.group" && url.protocol === "https:" ? url : new URL(DEFAULT_SITE_URL);
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
      "x-default": localizedPath("en", pathname),
    },
  };
}

export function localizedOpenGraph(locale: string, pathname: string, title: string, description: string) {
  const url = new URL(localizedPath(locale === "en" ? "en" : "ru", pathname), getSiteUrl()).toString();
  const image = new URL("/images/hero-bg.png", getSiteUrl()).toString();

  return {
    title,
    description,
    url,
    locale: locale === "ru" ? "ru_BY" : "en_US",
    images: [{ url: image, alt: "Stacklevel Group" }],
  };
}
