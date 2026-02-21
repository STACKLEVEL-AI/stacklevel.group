import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function requestConfig({
  requestLocale
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested = await requestLocale;

  const locale: Locale = routing.locales.includes(
    requested as Locale
  )
    ? (requested as Locale)
    : routing.defaultLocale;

  // Read JSON file synchronously
  const messagesPath = join(__dirname, '..', 'messages', `${locale}.json`);
  const messagesContent = readFileSync(messagesPath, 'utf-8');
  const messages = JSON.parse(messagesContent);

  return {
    locale,
    messages
  };
}