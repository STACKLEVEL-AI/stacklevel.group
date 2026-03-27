import type { Metadata } from "next";
import BankLanding from "@/app/components/BankLanding";
import { localizedAlternates } from "@/app/lib/site";
import { isRuLocale } from "@/i18n/localeUtils";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu
      ? "AI-аналитика банковских продуктов | Stacklevel Group"
      : "AI Analytics for Banking Products | Stacklevel Group",
    description: isRu
      ? "Лендинг Stacklevel для банков: 10 AI-агентов мониторят 21 банк по 8 продуктовым доменам и ускоряют решения по продукту, маркетингу и комитетам."
      : "Stacklevel banking landing page: 10 AI agents monitor 21 banks across 8 product domains to accelerate product, marketing, and committee decisions.",
    alternates: localizedAlternates(locale, "/bank"),
  };
}

export default async function BankPage({ params }: Props) {
  const { locale } = await params;
  const normalizedLocale = isRuLocale(locale) ? "ru" : "en";

  return <BankLanding locale={normalizedLocale} />;
}
