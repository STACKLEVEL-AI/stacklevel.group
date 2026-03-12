import type { Metadata } from "next";
import InnerHero from "@/app/components/InnerHero";
import ReactAboutSection from "@/app/components/ReactAboutSection";
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
    title: isRu ? "React разработка | Stacklevel Group" : "React Development | Stacklevel Group",
    description: isRu
      ? "Услуги React и React Native разработки от Stacklevel Group."
      : "React and React Native development services from Stacklevel Group.",
    alternates: localizedAlternates(locale, "/hire-react-developers"),
  };
}

export default async function HireReactDevelopersPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return (
    <div className="relative">
      <InnerHero
        lines={
          isRu
            ? [{ text: "React" }, { text: "разработка", accent: true }]
            : [{ text: "React" }, { text: "development", accent: true }]
        }
        subtitle={
          isRu
            ? "Команда Stacklevel Group проектирует и внедряет React и React Native решения для продуктов, которым нужна понятная скорость поставки и стабильная поддержка."
            : "Stacklevel Group designs and delivers React and React Native solutions for teams that need predictable delivery speed and stable long-term support."
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
        chips={["React", "React Native", "Frontend", "Mobile"]}
      />
      <ReactAboutSection />
    </div>
  );
}
