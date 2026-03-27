import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import InnerHero from "@/app/components/InnerHero";
import JsonLd from "@/app/components/JsonLd";
import { isRuLocale } from "@/i18n/localeUtils";
import { buildBreadcrumbSchema, buildItemListSchema, buildPageSchema, localizedAbsoluteUrl, schemaId } from "@/app/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu
      ? "Продукты для управляемого внедрения ИИ | Stacklevel Group"
      : "Products for Governed AI Delivery | Stacklevel Group",
    description: isRu
      ? "Продуктовые решения Stacklevel ускоряют управляемое внедрение ИИ, где Century является основным решением для корпоративного развёртывания."
      : "Stacklevel product assets accelerate governed AI rollout, with Century as the primary platform for controlled enterprise deployment.",
  };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);
  const pageName = isRu
    ? "Продукты для управляемого внедрения ИИ | Stacklevel Group"
    : "Products for Governed AI Delivery | Stacklevel Group";
  const pageDescription = isRu
    ? "Продуктовые решения Stacklevel ускоряют управляемое внедрение ИИ, где Century является основным решением для корпоративного развёртывания."
    : "Stacklevel product assets accelerate governed AI rollout, with Century as the primary platform for controlled enterprise deployment.";

  const centuryHighlights = isRu
    ? [
        "Подход с приоритетом ссылок на источники для проверяемых ответов.",
        "Поиск с учётом управления доступом и границ ответов.",
        "Аудиторские журналы и этапы оценки для контролируемого релиза.",
        "Локальное, изолированное и гибридное развёртывание.",
      ]
    : [
        "Citations-first RAG for verifiable responses.",
        "IAM-aware retrieval and response boundaries.",
        "Audit logs and evaluation gates for controlled release.",
        "On-prem, air-gapped, and hybrid deployment options.",
      ];

  const validationTrack = isRu
    ? [
        "Референсные архитектуры для ранней корпоративной валидации.",
        "Прототипные треки, выровненные с ограничениями управления.",
        "Поддержка решений для перехода от пилота к промышленной эксплуатации.",
      ]
    : [
        "Reference architectures for early enterprise validation.",
        "Prototype tracks aligned to governance constraints.",
        "Decision support for pilot-to-production roadmap choices.",
      ];

  const breadcrumbSchema = buildBreadcrumbSchema(locale, "/products", [
    { name: isRu ? "Главная" : "Home", path: "/" },
    { name: isRu ? "Продукты" : "Products", path: "/products" },
  ]);
  const productListId = schemaId(locale, "/products", "product-list");
  const productListSchema = buildItemListSchema(
    productListId,
    isRu ? "Продукты Stacklevel Group" : "Stacklevel Group products",
    [
      {
        name: "Century",
        url: localizedAbsoluteUrl(locale, "/products/century"),
      },
    ],
  );
  const pageSchema = buildPageSchema({
    locale,
    path: "/products",
    name: pageName,
    description: pageDescription,
    type: "CollectionPage",
    breadcrumbId: schemaId(locale, "/products", "breadcrumb"),
    mainEntity: { "@id": productListId },
  });

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema, productListSchema]} />
      <div className="relative">
      <InnerHero
        lines={
          isRu
              ? [
                  { text: "Продукты для" },
                  { text: "Управляемого ИИ", accent: true },
                  { text: "Внедрение" },
                ]
            : [
                { text: "Products for" },
                { text: "Governed AI", accent: true },
                { text: "Delivery" },
              ]
        }
        subtitle={
          isRu
            ? "Продуктовые решения, которые стандартизируют контролы и ускоряют развёртывание в регулируемых средах."
            : "Product assets that standardize controls and accelerate rollout in regulated environments."
        }
        primaryCta={{ label: isRu ? "Запросить демонстрацию продукта" : "Request product demo", href: "/contact?topic=Product%20demo" }}
        secondaryCta={{ label: isRu ? "Смотреть Century" : "Explore Century", href: "/products/century", ghost: true }}
        chips={
          isRu
            ? ["Платформа Century", "Треки валидации", "Управляемое развёртывание"]
            : ["Century platform", "Validation tracks", "Regulated rollout"]
        }
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative">
          <article className="stack-panel-accent p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-white/86">
              {isRu ? "Ключевой продуктовый asset" : "Primary product asset"}
            </p>
            <h2 className="stack-grid-title mt-2 text-white">
              {isRu ? (
                <>
                  Century для production <span className="stack-accent">governance</span>
                </>
              ) : (
                <>
                  Century for production <span className="stack-accent">governance</span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-4xl text-white/90">
              {isRu
                ? "Century — основной продукт Stacklevel для корпоративного развёртывания LLM, где необходимы отслеживаемость, контроль доступа и готовность к аудиту."
                : "Century is the core Stacklevel product for enterprise LLM deployment where traceability, access control, and auditability are mandatory."}
            </p>
<ul className="mt-5 grid list-disc gap-2 pl-5 text-sm text-white/90 md:grid-cols-2">
              {centuryHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products/century" className="stack-cta-ghost text-lg">
                {isRu ? "Смотреть Century" : "View Century"}
              </Link>
              <Link href="/contact?topic=Product%20demo" className="stack-cta text-lg">
                {isRu ? "Запросить демонстрацию продукта" : "Request product demo"}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper grid gap-4 md:grid-cols-[1fr_1.05fr]">
          <article className="stack-panel p-5">
            <h2 className="stack-grid-title text-[var(--black)]">
              {isRu ? (
                <>
                  Validation <span className="stack-accent">tracks</span>
                </>
              ) : (
                <>
                  Validation <span className="stack-accent">tracks</span>
                </>
              )}
            </h2>
<p className="mt-4 text-sm text-[var(--black)]/85">
              {isRu
                ? "Prototypes и research tracks остаются компактными и поддерживают production-решения, а не раздувают каталог продуктов."
                : "Prototypes and research tracks stay compact and support production decisions, not standalone product sprawl."}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--black)]">
              {validationTrack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="stack-panel-dark p-5">
            <h3 className="stack-title text-2xl">{isRu ? "Нужна валидация product fit?" : "Need product fit validation?"}</h3>
            <p className="mt-4 text-sm text-white/88">
              {isRu
                ? "Привязываем модули к workflows, integration boundaries и governance-требованиям до масштабирования."
                : "We map modules to workflows, integration boundaries, and governance requirements before scaling."}
            </p>
            <div className="mt-6 grid gap-3">
              <Link href="/contact?topic=Product%20demo" className="stack-cta text-lg">
                {isRu ? "Запросить демонстрацию продукта" : "Request product demo"}
              </Link>
              <Link href="/products/century" className="stack-cta-ghost text-lg">
                {isRu ? "Смотреть Century" : "Explore Century"}
              </Link>
            </div>
          </article>
        </div>
      </section>
      </div>
    </>
  );
}
