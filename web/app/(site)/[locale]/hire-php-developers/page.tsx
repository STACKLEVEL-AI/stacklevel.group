import type { Metadata } from "next";
import InnerHero from "@/app/components/InnerHero";
import PhpAboutSection from "@/app/components/PhpAboutSection";
import { localizedAlternates } from "@/app/lib/site";
import { isRuLocale } from "@/i18n/localeUtils";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "PHP разработка | Stacklevel Group" : "PHP Development | Stacklevel Group",
    description: isRu
      ? "Услуги PHP разработки от Stacklevel Group."
      : "PHP development services from Stacklevel Group.",
    alternates: localizedAlternates(locale, "/hire-php-developers"),
  };
}

export default async function HirePhpDevelopersPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return (
    <div className="relative">
      <InnerHero
        lines={
          isRu
            ? [{ text: "PHP" }, { text: "разработка", accent: true }]
            : [{ text: "PHP" }, { text: "development", accent: true }]
        }
        subtitle={
          isRu
            ? "Stacklevel Group разрабатывает и поддерживает PHP-системы для команд, которым нужны предсказуемая разработка, безопасная архитектура и понятный путь масштабирования."
            : "Stacklevel Group builds and supports PHP systems for teams that need predictable delivery, secure architecture, and a clear scaling path."
        }
        primaryCta={{
          label: isRu ? "Запросить команду" : "Request team",
          href: "/hire-dedicated-team",
        }}
        secondaryCta={{
          label: isRu ? "Связаться с нами" : "Contact us",
          href: "/contact?topic=Scoping%20call",
          ghost: true,
        }}
        chips={["PHP", "Symfony", "Laravel", "Web"]}
      />
      <PhpAboutSection />
    </div>
  );
}
