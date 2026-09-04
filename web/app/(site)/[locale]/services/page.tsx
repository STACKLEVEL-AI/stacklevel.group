import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Accordion from "@/app/components/Accordion";
import InnerHero from "@/app/components/InnerHero";
import JsonLd from "@/app/components/JsonLd";
import { isRuLocale } from "@/i18n/localeUtils";
import { buildBreadcrumbSchema, buildItemListSchema, buildPageSchema, schemaId } from "@/app/lib/schema";
import { localizedAlternates } from "@/app/lib/site";
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
    title: isRu
      ? "Услуги по инженерии ИИ для регулируемых сред | Stacklevel"
      : "AI Engineering Services for Regulated Production | Stacklevel",
    description: isRu
      ? "Услуги по инженерии ИИ для регулируемых сред с встроенными контролями и доказательной базой для проверки."
      : "Outcome-driven AI engineering packages for regulated environments, with controls and evidence built into delivery.",
    alternates: localizedAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);
  const pageName = isRu
    ? "Услуги по инженерии ИИ для регулируемых сред | Stacklevel"
    : "AI Engineering Services for Regulated Production | Stacklevel";
  const pageDescription = isRu
    ? "Услуги по инженерии ИИ для регулируемых сред с встроенными контролями и доказательной базой для проверки."
    : "Outcome-driven AI engineering packages for regulated environments, with controls and evidence built into delivery.";
  
  // Read messages directly for static export
  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, "utf-8"));
  
  // Get services translations
  const engagementDetailsTitle = messages.services?.engagementDetails || (isRu ? "Детали взаимодействия" : "Engagement details");

  const serviceLines = isRu
    ? [
        {
          title: "Инженерия LLM-решений",
          outcome: "Выпустить управляемого ассистента, готового к корпоративному ревью.",
          bullets: [
            "Восстановление по источникам (RAG) и рабочие сценарии агентов, привязанные к бизнес-операциям.",
            "Границы интеграции с корпоративными данными и системами определяются заранее.",
            "Этапы оценки от пилота до промышленного развёртывания.",
          ],
          details: [
            {
              title: "Результаты",
              content: "Архитектурный план, план интеграции и пакет пилотной реализации.",
            },
            {
              title: "Входные данные",
              content: "Целевые рабочие процессы, источники данных, модель доступа и критерии приёмки.",
            },
            {
              title: "Подход по срокам",
              content: "Планирование на этапе discovery с учётом зависимостей и ограничений управления.",
            },
          ],
        },
        {
          title: "Локальное / гибридное развёртывание",
          outcome: "Развернуть промышленный ИИ в соответствии с вашей моделью безопасности и инфраструктуры.",
          bullets: [
            "Топология согласуется с сетевыми, данными и контролями идентификации.",
            "Укрепление безопасности и операционный базовый набор для стабильной эксплуатации.",
            "Критерии готовности к выпуску согласуются с утверждениями заинтересованных сторон.",
          ],
          details: [
            {
              title: "Результаты",
              content: "Расположение рантайма, сценарии развёртывания и чек-лист укрепления безопасности.",
            },
            {
              title: "Входные данные",
              content: "Ограничения инфраструктуры, сетевая модель, политика безопасности и владельцы платформы.",
            },
            {
              title: "Подход по срокам",
              content: "План строится от готовности окружения и зависимостей ревью.",
            },
          ],
        },
        {
          title: "Оценка и готовность к аудиту",
          outcome: "Построить контролируемую оценку качества и поведения до масштабирования.",
          bullets: [
            "Фреймворк оценки, привязанный к рискам и ожиданиям качества.",
            "Отслеживаемость и артефакты аудита формируются по ходу выполнения.",
            "Регулярный ритм ревью с ответственностями и путями эскалации.",
          ],
          details: [
            {
              title: "Результаты",
              content: "Матрица оценки, пакет доказательной базы и шаблоны для ревью.",
            },
            {
              title: "Входные данные",
              content: "Пороговые значения риска, требования к утверждению и политика журналирования.",
            },
            {
              title: "Подход по срокам",
              content: "Синхронизация с пилотными этапами и окнами для комитетов ревью.",
            },
          ],
        },
        {
          title: "Производительность и контроль затрат",
          outcome: "Стабилизировать задержки и затраты без утраты управляемых контролей.",
          bullets: [
            "Оптимизация модели и рантайм-стека на основе бенчмарков.",
            "Метрики затрат и задержек отслеживаются по окружениям и нагрузкам.",
            "Операционный профиль готов к передаче в эксплуатацию продукта.",
          ],
          details: [
            {
              title: "Результаты",
              content: "Матрица бенчмарков, действия по оптимизации и профиль рантайма после тюнинга.",
            },
            {
              title: "Входные данные",
              content: "Профиль трафика, целевые задержки, стек моделей и ограничения по затратам.",
            },
            {
              title: "Подход по срокам",
              content: "Итерации строятся на измеримых базовых показателях и целевых порогах.",
            },
          ],
        },
      ]
    : [
        {
          title: "LLM Solutions Engineering",
          outcome: "Ship a governed assistant that passes enterprise review.",
          bullets: [
            "RAG and agent workflows aligned to business operations.",
            "Enterprise data and system integration boundaries defined early.",
            "Evaluation gates from pilot through production rollout.",
          ],
          details: [
            {
              title: "Deliverables",
              content: "Architecture blueprint, integration plan, and pilot implementation package.",
            },
            {
              title: "Inputs",
              content: "Target workflows, source systems, access model, and acceptance criteria.",
            },
            {
              title: "Timeline approach",
              content: "Sequenced in discovery based on dependency and governance constraints.",
            },
          ],
        },
        {
          title: "On-Prem / Hybrid Deployment Engineering",
          outcome: "Deploy production AI under your security and infrastructure model.",
          bullets: [
            "Topology aligned to network, data, and identity controls.",
            "Hardening and operations baseline for sustained runtime use.",
            "Release readiness criteria mapped to stakeholder approvals.",
          ],
          details: [
            {
              title: "Deliverables",
              content: "Runtime topology, deployment playbooks, and hardening checklist.",
            },
            {
              title: "Inputs",
              content: "Infrastructure limits, network model, security policy, and platform ownership.",
            },
            {
              title: "Timeline approach",
              content: "Planned against environment readiness and review dependencies.",
            },
          ],
        },
        {
          title: "Evaluation & Audit Readiness",
          outcome: "Create evidence quality and behavior controls before scale-up.",
          bullets: [
            "Evaluation framework tied to risk and quality expectations.",
            "Traceability and audit artifacts generated during delivery.",
            "Recurring review cadence with ownership and escalation paths.",
          ],
          details: [
            {
              title: "Deliverables",
              content: "Evaluation matrix, governance evidence pack, and review templates.",
            },
            {
              title: "Inputs",
              content: "Risk thresholds, approval requirements, and logging policy.",
            },
            {
              title: "Timeline approach",
              content: "Anchored to pilot milestones and committee review windows.",
            },
          ],
        },
        {
          title: "Runtime Performance & Cost Control",
          outcome: "Stabilize latency and serving cost without sacrificing governance.",
          bullets: [
            "Benchmark-first optimization of model and runtime stack.",
            "Cost/latency targets tracked by environment and workload.",
            "Operational profile prepared for production ownership handoff.",
          ],
          details: [
            {
              title: "Deliverables",
              content: "Benchmark matrix, optimization actions, and post-tuning runtime profile.",
            },
            {
              title: "Inputs",
              content: "Traffic profile, latency targets, model stack, and cost boundaries.",
            },
            {
              title: "Timeline approach",
              content: "Iterative cycles defined by measurable baseline and target thresholds.",
            },
          ],
        },
      ];

  const engagementSteps = isRu
    ? [
        {
          title: "1. Диагностика",
          text: "Фиксируем рабочие процессы, ограничения и ожидания по контролям со всеми участниками.",
        },
        {
          title: "2. Пилот",
          text: "Поставляем управляемое решение с доказательной базой и контрольными точками оценки.",
        },
        {
          title: "3. Промышленное развёртывание",
          text: "Укрепляем эксплуатацию, передаём ответственность команде и масштабируем решение с дисциплиной регулярного ревью.",
        },
      ]
    : [
        {
          title: "1. Discovery",
          text: "Scope workflows, constraints, and control expectations with all stakeholders.",
        },
        {
          title: "2. Pilot",
          text: "Deliver a governed implementation with evidence and evaluation checkpoints.",
        },
        {
          title: "3. Production rollout",
          text: "Harden operations, transfer ownership, and scale with review discipline.",
        },
      ];

  const breadcrumbSchema = buildBreadcrumbSchema(locale, "/services", [
    { name: isRu ? "Главная" : "Home", path: "/" },
    { name: isRu ? "Услуги" : "Services", path: "/services" },
  ]);
  const serviceListId = schemaId(locale, "/services", "service-list");
  const serviceListSchema = buildItemListSchema(
    serviceListId,
    isRu ? "Направления услуг Stacklevel Group" : "Stacklevel Group service lines",
    serviceLines.map((serviceLine) => ({ name: serviceLine.title })),
  );
  const pageSchema = buildPageSchema({
    locale,
    path: "/services",
    name: pageName,
    description: pageDescription,
    type: "CollectionPage",
    breadcrumbId: schemaId(locale, "/services", "breadcrumb"),
    mainEntity: { "@id": serviceListId },
  });

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbSchema, serviceListSchema]} />
      <div className="relative">
      <InnerHero
        lines={
          isRu
                ? [
                    { text: "Инженерия ИИ" },
                    { text: "для регулируемого", accent: true },
                    { text: "производства" },
                  ]
            : [
                { text: "AI Engineering" },
                { text: "for Regulated", accent: true },
                { text: "Production" },
              ]
        }
        subtitle={
          isRu
            ? "Ориентированная на результат поставка с интегрированными контролями управления с первого дня."
            : "Outcome-driven delivery with governance controls embedded from day one."
        }
        primaryCta={{ label: isRu ? "Запросить звонок для уточнения объёма" : "Request scoping call", href: "/contact?topic=Scoping%20call" }}
        secondaryCta={{ label: isRu ? "Аудит и комплаенс" : "Audit & Compliance", href: "/audit-compliance", ghost: true }}
        chips={
          isRu
            ? ["LLM-решения для корпоративных сред: локальное или гибридное развёртывание, встроенные контролы и доказательная база для ревью."]
            : ["Enterprise LLM delivery with on-prem or hybrid deployment, embedded controls, and review-ready evidence."]
        }
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title text-[var(--black)]">
            {isRu ? (
                <>
                  Направления <span className="stack-accent">услуг</span>
                </>
              ) : (
                <>
                  Service <span className="stack-accent">lines</span>
                </>
              )}
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--black)] text-bold">
            {isRu
              ? "Четыре пакета исполнения для корпоративных команд, которым нужны производственные результаты и готовые к ревью артефакты."
              : "Four execution packages designed for enterprise teams that need production outcomes and review readiness."}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {serviceLines.map((service, index) => (
              <article
                key={service.title}
                className={`${index % 2 === 0 ? "stack-panel" : "stack-panel-pale"} flex h-full flex-col justify-between p-5 md:p-6`}
              >
                <h3 className="stack-title text-2xl text-[var(--black)]">{service.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--accent)]">{service.outcome}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[var(--black)]">
                  {service.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Accordion
                  className="mt-4"
                  items={[
                    {
                      title: engagementDetailsTitle,
                      content: (
                        <div className="grid gap-2 text-sm min-h-[180px] max-[1000px]:min-h-[250px] max-[768px]:min-h-[180px] max-[500px]:min-h-[265px]">
                          {service.details.map((detail) => (
                            <p key={detail.title}>
                              <span className="font-bold uppercase">{detail.title}:</span> {detail.content}
                            </p>
                          ))}
                        </div>
                      ),
                    },
                  ]}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title max-w-4xl text-[var(--black)]">
            {isRu ? (
                <>
                  Как работает <span className="stack-accent">взаимодействие</span>
                </>
              ) : (
                <>
                  How engagement <span className="stack-accent">works</span>
                </>
              )}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {engagementSteps.map((step, index) => (
              <article key={step.title} className={`${index === 1 ? "stack-panel-accent text-white" : "stack-panel bg-white"} p-5`}>
                <h3 className="stack-title text-2xl">{step.title}</h3>
                <p className={`mt-3 text-sm ${index === 1 ? "text-white/90" : "text-[var(--black)]"}`}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="stack-hero-bg absolute inset-0 opacity-88" />
        <div className="absolute inset-0 bg-black/44" />
        <div className="width-wrapper relative grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <h2 className="stack-grid-title max-w-4xl text-white">
            {isRu ? (
              <>
                Готовы определить первый <span className="stack-accent">спринт внедрения</span>?
              </>
            ) : (
              <>
                Ready to scope the first <span className="stack-accent">delivery sprint</span>?
              </>
            )}
          </h2>
          <div className="grid gap-3">
            <Link href="/contact?topic=Scoping%20call" className="stack-cta text-xl md:text-2xl">
              {isRu ? "Запросить звонок для уточнения объёма" : "Request scoping call"}
            </Link>
            <Link href="/audit-compliance" className="stack-cta-ghost text-xl md:text-2xl">
              {isRu ? "Аудит и комплаенс" : "Audit & Compliance"}
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
