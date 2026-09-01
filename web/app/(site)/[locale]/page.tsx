import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import Clients from "@/app/components/Clients";
import HomeHero from "@/app/components/HomeHero";
import JsonLd from "@/app/components/JsonLd";
import { localizedAlternates } from "@/app/lib/site";
import { ORGANIZATION_ID, buildPageSchema } from "@/app/lib/schema";
import { readFileSync } from "fs";
import { join } from "path";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "Stacklevel Group | Инженерия ИИ, аудит и соответствие" : "Stacklevel Group | AI Engineering, Audit & Compliance",
    description: isRu
      ? "Stacklevel Group внедряет инженерные практики ИИ, аудит и соответствие по дизайну для корпоративных производственных сред."
      : "Stacklevel Group delivers AI engineering, AI audit, and compliance-by-design for enterprise production environments.",
    alternates: localizedAlternates(locale, "/"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);
  const pageName = isRu
    ? "Stacklevel Group | Инженерия ИИ, аудит и соответствие"
    : "Stacklevel Group | AI Engineering, Audit & Compliance";
  const pageDescription = isRu
    ? "Stacklevel Group внедряет инженерные практики ИИ, аудит и соответствие по дизайну для корпоративных производственных сред."
    : "Stacklevel Group delivers AI engineering, AI audit, and compliance-by-design for enterprise production environments.";
  const pageSchema = buildPageSchema({
    locale,
    path: "/",
    name: pageName,
    description: pageDescription,
    mainEntity: { "@id": ORGANIZATION_ID },
    about: [{ "@id": ORGANIZATION_ID }],
  });
  
  // Read messages directly for static export
  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, "utf-8"));
  
  // Get all translations from messages directly
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages.pages?.home;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    return typeof value === 'string' ? value : key;
  };
  
  // Get clients translations directly from messages
  const clientsTitle = messages.clients?.title || "Trusted since 2018";
  const clientsDisclaimer = messages.clients?.disclaimer || "";

  // Get pillars from translations
  const pillarsData = messages.pages?.home?.pillars || {};
  const pillars: Array<{
    title: string;
    bullets: string[];
    tone: string;
    textTone: string;
  }> = [
    {
      title: pillarsData.engineering?.title || "Engineering",
      bullets: pillarsData.engineering?.bullets || [
        "Production LLM workflows and enterprise integrations.",
        "On-prem and hybrid delivery aligned to security boundaries.",
      ],
      tone: "stack-panel-accent",
      textTone: "text-white/90",
    },
    {
      title: pillarsData.audit?.title || "Audit",
      bullets: pillarsData.audit?.bullets || [
        "Evidence structures and traceability for review committees.",
        "Evaluation methodology with review-ready artifacts.",
      ],
      tone: "stack-panel-dark",
      textTone: "text-white/90",
    },
    {
      title: pillarsData.compliance?.title || "Compliance",
      bullets: pillarsData.compliance?.bullets || [
        "Access control, logging, and change-control patterns.",
        "Controls implemented in systems, not slide decks.",
      ],
      tone: "stack-panel-pale",
      textTone: "text-[var(--black)]",
    },
  ];

  // Get use cases from translations
  const useCases: string[] = messages.pages?.home?.useCases || [
    "Policy assistant with citation-backed responses.",
    "IAM-aware internal knowledge copilot.",
    "Audit evidence retrieval with traceable reasoning.",
    "Air-gapped operational support workflows.",
  ];

  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="relative">
      <HomeHero />

      <Clients title={clientsTitle} disclaimer={clientsDisclaimer} />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title max-w-5xl text-[var(--black)]">
            {t("heading")}
          </h2>
            <p className="mt-4 max-w-3xl text-[var(--black)] text-lg font-samibold">{t("lead")}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className={`${pillar.tone} p-5 transition-transform duration-700 hover:scale-102 cursor-pointer`}>
                <h3 className="stack-title text-2xl">{pillar.title}</h3>
                <ul className={`mt-3 list-disc space-y-2 pl-5 text-sm ${pillar.textTone}`}>
                  {pillar.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <article className="stack-panel mt-6 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{t("usecasesTitle")}</p>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--black)] md:grid-cols-2">
              {useCases.map((useCase) => (
                <li key={useCase} className="border border-[rgba(0,0,0,.12)] bg-white px-3 py-2">
                  {useCase}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper relative grid gap-6 md:grid-cols-[1.2fr_0.9fr]">
          <article className="stack-panel bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{t("product.title")}</p>
            <h2 className="stack-grid-title mt-2 text-[var(--black)]">{t("product.heading")}</h2>
            <p className="mt-4 text-[var(--black)]/86">{t("product.lead")}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-[var(--black)]">
              <li>{t("product.bullet1")}</li>
              <li>{t("product.bullet2")}</li>
              <li>{t("product.bullet3")}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products/century" className="stack-cta text-lg">{t("product.ctaView")}</Link>
              <Link href="/contact?topic=Product%20demo" className="stack-cta-ghost text-lg">{t("product.ctaDemo")}</Link>
            </div>
          </article>

          <article className="stack-panel-dark p-6">
            <h3 className="stack-title text-2xl">{t("scoping.title")}</h3>
            <p className="mt-4 text-sm text-white/88">{t("scoping.lead")}</p>
            <Link href="/contact?topic=Scoping%20call" className="stack-cta mt-6 w-full text-lg">{t("scoping.cta")}</Link>
          </article>
        </div>
      </section>
      </div>
    </>
  );
}
