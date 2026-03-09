export function isRuLocale(locale?: string | null) {
  if (!locale) return false;
  return locale === "ru" || locale.toLowerCase().startsWith("ru-");
}

export function chooseByLocale<T>(locale: string | undefined | null, ruValue: T, enValue: T): T {
  return isRuLocale(locale) ? ruValue : enValue;
}
