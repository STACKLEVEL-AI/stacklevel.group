import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SiteLayout from "../components/SiteLayout";
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Disable static params generation to allow on-demand rendering
// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load messages directly for static export (no headers() dependency)
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const messagesPath = join(__dirname, '../../messages', `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, 'utf-8'));

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteLayout>{children}</SiteLayout>
    </NextIntlClientProvider>
  );
}
