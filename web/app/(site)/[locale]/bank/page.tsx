import type { Metadata } from "next";
import BankLanding from "@/app/components/BankLanding";
import JsonLd from "@/app/components/JsonLd";
import { localizedAlternates } from "@/app/lib/site";
import { isRuLocale } from "@/i18n/localeUtils";
import { buildBreadcrumbSchema, buildPageSchema, schemaId } from "@/app/lib/schema";

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
  const isRu = isRuLocale(locale);
  const normalizedLocale = isRu ? "ru" : "en";
  const pageName = isRu
    ? "AI-аналитика банковских продуктов | Stacklevel Group"
    : "AI Analytics for Banking Products | Stacklevel Group";
  const pageDescription = isRu
    ? "Лендинг Stacklevel для банков: 10 AI-агентов мониторят 21 банк по 8 продуктовым доменам и ускоряют решения по продукту, маркетингу и комитетам."
    : "Stacklevel banking landing page: 10 AI agents monitor 21 banks across 8 product domains to accelerate product, marketing, and committee decisions.";
  const breadcrumbSchema = buildBreadcrumbSchema(locale, "/bank", [
    { name: isRu ? "Главная" : "Home", path: "/" },
    { name: isRu ? "Банковский AI" : "Banking AI", path: "/bank" },
  ]);
  const pageSchema = buildPageSchema({
    locale,
    path: "/bank",
    name: pageName,
    description: pageDescription,
    breadcrumbId: schemaId(locale, "/bank", "breadcrumb"),
  });

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema]} />
      <BankLanding locale={normalizedLocale} />
    </>
  );
}
