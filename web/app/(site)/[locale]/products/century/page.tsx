import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import InnerHero from "@/app/components/InnerHero";
import JsonLd from "@/app/components/JsonLd";
import { isRuLocale } from "@/i18n/localeUtils";
import { ORGANIZATION_ID, buildBreadcrumbSchema, buildPageSchema, localizedAbsoluteUrl, schemaId } from "@/app/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu
      ? "Century | Производственная LLM-платформа для управляемого развёртывания"
      : "Century | Production LLM Platform for Governed Deployment",
    description: isRu
      ? "Century — производственная LLM-платформа Stacklevel для корпоративных сред с атрибуцией источников, учётом прав доступа и готовностью к аудиту."
      : "Century is Stacklevel's production LLM platform for enterprise environments requiring citations, IAM-aware behavior, and audit-grade traceability.",
  };
}

export default async function CenturyPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);
  const pageName = isRu
    ? "Century | Производственная LLM-платформа для управляемого развёртывания"
    : "Century | Production LLM Platform for Governed Deployment";
  const pageDescription = isRu
    ? "Century — производственная LLM-платформа Stacklevel для корпоративных сред с атрибуцией источников, учётом прав доступа и готовностью к аудиту."
    : "Century is Stacklevel's production LLM platform for enterprise environments requiring citations, IAM-aware behavior, and audit-grade traceability.";

  const capabilities = isRu
    ? [
        "Подход с приоритетом ссылок на источники для проверяемых ответов.",
        "Поиск с учётом прав доступа и границы ответов.",
        "Аудиторские журналы, отслеживаемость и операционная наблюдаемость.",
        "Этапы оценки до релиза и в процессе эксплуатации.",
      ]
    : [
        "Citations-first RAG for verifiable answers.",
        "IAM-aware retrieval and response boundaries.",
        "Audit logs, traceability, and operational observability.",
        "Evaluation gates before release and during operation.",
      ];

  const securityApproval = isRu
    ? [
        "Связи с доказательной базой прозрачны и готовы к проверке.",
        "Поведение с учётом прав доступа соответствует корпоративной модели идентификации.",
        "Операционные контролы покрывают журналирование, управление изменениями и этапы релиза.",
      ]
    : [
        "Evidence links are explicit and review-ready.",
        "Permission-aware behavior aligns with enterprise identity models.",
        "Operational controls cover logging, change control, and release gates.",
      ];

  const deploymentModes = isRu ? ["Локальное", "Изолированное", "Гибридное"] : ["On-prem", "Air-gapped", "Hybrid"];

  const useCases = isRu
    ? [
        {
          title: "Ассистент политик и контролов",
          text: "Формирует ответы на базе контролируемых источников с обязательным цитированием источников.",
        },
        {
          title: "Ассистент по доказательной базе комплаенса",
          text: "Поддерживает сбор доказательной базы и прослеживаемых резюме для процессов ревью.",
        },
        {
          title: "Операционный ассистент по знаниям",
          text: "Помогает командам работать только с утверждёнными источниками в контролируемых средах.",
        },
      ]
    : [
        {
          title: "Policy and controls assistant",
          text: "Retrieves governed answers with citations for internal policy workflows.",
        },
        {
          title: "Compliance evidence assistant",
          text: "Supports evidence retrieval and traceable summaries for review activities.",
        },
        {
          title: "Operations knowledge assistant",
          text: "Guides teams with approved-source retrieval in controlled environments.",
        },
      ];

  const breadcrumbSchema = buildBreadcrumbSchema(locale, "/products/century", [
    { name: isRu ? "Главная" : "Home", path: "/" },
    { name: isRu ? "Продукты" : "Products", path: "/products" },
    { name: "Century", path: "/products/century" },
  ]);
  const productId = schemaId(locale, "/products/century", "product");
  const pageSchema = buildPageSchema({
    locale,
    path: "/products/century",
    name: pageName,
    description: pageDescription,
    breadcrumbId: schemaId(locale, "/products/century", "breadcrumb"),
    mainEntity: { "@id": productId },
  });
  const productSchema = {
    "@type": ["Product", "SoftwareApplication"],
    "@id": productId,
    name: "Century",
    url: localizedAbsoluteUrl(locale, "/products/century"),
    description: pageDescription,
    brand: { "@id": ORGANIZATION_ID },
    manufacturer: { "@id": ORGANIZATION_ID },
    applicationCategory: "BusinessApplication",
    operatingSystem: isRu
      ? "Веб, локальное, изолированное и гибридное развертывание"
      : "Web, on-prem, air-gapped, and hybrid deployment",
    featureList: capabilities,
  };

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema, productSchema]} />
      <div className="relative">
      <InnerHero
        lines={
          isRu
            ? [
                { text: "Century" },
                { text: "Управляемое", accent: true },
                { text: "развёртывание LLM" },
              ]
            : [
                { text: "Century" },
                { text: "Governed LLM", accent: true },
                { text: "Deployment" },
              ]
        }
        subtitle={
          isRu
            ? "Создано для сред, где каждый ответ требует атрибуции источника, проверки прав доступа и готовности к аудиту."
            : "Built for environments where every answer may require attribution, access validation, and auditability."
        }
        primaryCta={{ label: isRu ? "Запросить демонстрацию" : "Request demo", href: "/contact?topic=Product%20demo" }}
        secondaryCta={{ label: isRu ? "Запросить бриф по безопасности" : "Request security brief", href: "/contact?topic=Audit%20brief", ghost: true }}
        chips={
          isRu
            ? ["Атрибуция источников", "Учёт прав доступа", "Аудиторские журналы и этапы"]
            : ["Citations", "IAM-aware behavior", "Audit logs and gates"]
        }
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title text-[var(--black)]">
            {isRu ? (
              <>
                Ключевые <span className="stack-accent">возможности</span>
              </>
            ) : (
              <>
                Core <span className="stack-accent">capabilities</span>
              </>
            )}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {capabilities.map((item, index) => (
              <article key={item} className={`${index % 2 === 0 ? "stack-panel" : "stack-panel-pale"} p-5`}>
                <p className="text-sm text-[var(--black)]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper grid gap-4 md:grid-cols-[1.1fr_1fr]">
          <article className="stack-panel bg-white p-5">
            <h2 className="stack-grid-title text-[var(--black)]">
              {isRu ? (
                <>
                  Почему это одобряют <span className="stack-accent">команды безопасности</span>
                </>
              ) : (
                <>
                  Why security teams <span className="stack-accent">approve</span> it
                </>
              )}
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-[var(--black)]">
              {securityApproval.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="stack-panel-dark p-5">
            <h3 className="stack-title text-2xl">{isRu ? "Режимы развёртывания" : "Deployment modes"}</h3>
            <p className="mt-4 text-sm text-white/88">
              {isRu
                ? "Выбор зависит от требований безопасности и вашей операционной модели."
                : "Choose based on security boundary and operating model."}
            </p>
            <p className="mt-4 text-base font-semibold uppercase tracking-wide text-white">{deploymentModes.join(" • ")}</p>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="stack-hero-bg absolute inset-0 opacity-88" />
        <div className="absolute inset-0 bg-black/46" />
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title max-w-4xl text-white">
            {isRu ? (
              <>
                Корпоративные сценарии с результатами, защищёнными NDA
              </>
            ) : (
              <>
                Enterprise use cases with <span className="stack-accent">NDA-safe</span> outcomes
              </>
            )}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {useCases.map((item) => (
              <article key={item.title} className="stack-panel bg-white p-5">
                <h3 className="stack-title text-xl text-[var(--black)]">{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--black)]">{item.text}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {isRu ? "Ключевые показатели доступны по запросу (NDA)." : "KPIs available upon request (NDA)."}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            <Link href="/contact?topic=Product%20demo" className="stack-cta text-xl md:text-2xl">
              {isRu ? "Запросить демо" : "Request demo"}
            </Link>
            <Link href="/contact?topic=Audit%20brief" className="stack-cta-ghost text-xl md:text-2xl">
              {isRu ? "Запросить бриф по безопасности" : "Request security brief"}
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
