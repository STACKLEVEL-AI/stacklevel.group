import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { routing } from "../i18n/routing";

type Locale = (typeof routing.locales)[number];

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function requestConfig({
  requestLocale
}: {
  requestLocale?: Promise<string | undefined>;
} = {}) {
  let locale: Locale = routing.defaultLocale;

  // If requestLocale is provided, use it; otherwise use default
  if (requestLocale) {
    try {
      const requested = await requestLocale;
      if (requested && routing.locales.includes(requested as Locale)) {
        locale = requested as Locale;
      }
    } catch {
      // In static export, requestLocale may fail; fall back to default
      locale = routing.defaultLocale;
    }
  }

  // Read JSON file synchronously
  const messagesPath = join(__dirname, '..', 'messages', `${locale}.json`);
  const messagesContent = readFileSync(messagesPath, 'utf-8');
  const messages = JSON.parse(messagesContent);

  return {
    locale,
    messages
  };
}
