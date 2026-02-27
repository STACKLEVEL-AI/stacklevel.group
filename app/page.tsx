import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import SiteLayout from "./components/SiteLayout";
import LocaleHomePage from "./[locale]/page";

export function generateStaticParams() {
  return [];
}

export const metadata: Metadata = {
  title: "Stacklevel Group | Инженерия ИИ, аудит и соответствие",
  description:
    "Stacklevel Group внедряет инженерные практики ИИ, аудит и соответствие по дизайну для корпоративных производственных сред.",
  alternates: {
    languages: {
      ru: "/",
      en: "/en",
    },
  },
};

export default async function RootPage() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const messagesPath = join(__dirname, "../messages", "ru.json");
  const messages = JSON.parse(readFileSync(messagesPath, "utf-8"));

  return (
    <NextIntlClientProvider locale="ru" messages={messages}>
      <SiteLayout>
        {await LocaleHomePage({ params: Promise.resolve({ locale: "ru" }) })}
      </SiteLayout>
    </NextIntlClientProvider>
  );
}
