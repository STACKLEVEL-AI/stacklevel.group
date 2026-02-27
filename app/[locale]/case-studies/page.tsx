import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import InnerHero from "../../components/InnerHero";
import Clients from "../../components/Clients";
import CaseStudiesFilter, { CaseStudyItem } from "../../components/CaseStudiesFilter";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "Кейсы | Управляемое внедрение ИИ" : "Case Studies | Governed AI Delivery",
    description: isRu
      ? "NDA-safe формат кейсов: постановка проблемы, дизайн решения, контролы и операционные результаты для регулируемого внедрения ИИ."
      : "NDA-safe case study formats focused on problem framing, solution design, controls, and operational outcomes for regulated AI delivery.",
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  const cases: CaseStudyItem[] = isRu
    ? [
        {
          title: "Ассистент для финансового сектора",
          industry: "Финансовые сервисы (NDA)",
          category: "Финансы",
          problem: "Рекомендации по продуктам и политикам отличались между командами.",
          solution: "Внедрили контролируемого ассистента с поиском по утверждённым внутренним источникам.",
          controls: [
            "Границы поиска с учётом прав доступа",
            "Ссылки на источники в каждом ответе",
            "Аудиторское логирование запросов и ответов",
            "Этапы оценки для принятия решения о релизе",
          ],
          outcome: "Результаты доступны по запросу (NDA).",
        },
        {
          title: "Ассистент операционных процессов",
          industry: "Госсектор (NDA)",
          category: "Госсектор",
          problem: "Ручная обработка документов замедляла response и review-процессы.",
          solution: "Развернули ассистента с привязкой к документам и прослеживаемыми ответами.",
          controls: [
            "Модель видимости по ролям",
            "Атрибуция документов и отслеживаемость",
            "Логирование изменений контента",
            "Контрольные точки утверждения перед развёртыванием",
          ],
          outcome: "Результаты доступны по запросу (NDA).",
        },
        {
          title: "Copilot для промышленной поддержки",
          industry: "Промышленность (NDA)",
          category: "Промышленность",
          problem: "Разрозненные знания приводили к повторным эскалациям.",
          solution: "Создан производственный copilоt для устранения неисправностей с поиском по утверждённым источникам.",
          controls: [
            "Политика индексирования утверждённых источников",
            "Формат ответа с ссылками на источники",
            "Контрольные точки для обновлений рабочих процессов",
            "Логирование операционных событий",
          ],
          outcome: "Результаты доступны по запросу (NDA).",
        },
        {
          title: "Enterprise support copilot",
          industry: "Технологические операции (NDA)",
          category: "Технологии",
          problem: "Support-командам не хватало доказательной базы в AI-ответах.",
          solution: "Внедрили контролируемые потоки ассистента с контрольными точками управления.",
          controls: [
            "Ограничения ответов с проверкой прав доступа",
            "Аудиторский след для взаимодействий поддержки",
            "Проверки качества ответов",
            "Управление изменениями для prompt и политик",
          ],
          outcome: "Результаты доступны по запросу (NDA).",
        },
      ]
    : [
        {
          title: "Financial Services Assistant",
          industry: "Financial services (NDA)",
          category: "Financial services",
          problem: "Policy and product guidance was inconsistent across internal teams.",
          solution: "Implemented a controlled RAG assistant connected to approved internal sources.",
          controls: [
            "IAM-aware retrieval boundaries",
            "Source citations in every response",
            "Audit logging for request/response events",
            "Evaluation gates for release decisions",
          ],
          outcome: "Outcomes available upon request (NDA).",
        },
        {
          title: "Public Operations Workflow Assistant",
          industry: "Public sector operations (NDA)",
          category: "Public sector",
          problem: "Manual document handling slowed response and review workflows.",
          solution: "Deployed a workflow assistant with document-grounded and traceable outputs.",
          controls: [
            "Role-based visibility model",
            "Document attribution and traceability",
            "Change logging across content updates",
            "Approval checkpoints for rollout",
          ],
          outcome: "Outcomes available upon request (NDA).",
        },
        {
          title: "Industrial Troubleshooting Copilot",
          industry: "Industrial operations (NDA)",
          category: "Industrial",
          problem: "Fragmented operational knowledge led to repeated escalations.",
          solution: "Built a guided troubleshooting copilot with approved-source retrieval.",
          controls: [
            "Approved-source indexing policy",
            "Citation-backed answer formatting",
            "Review gates for workflow updates",
            "Operational event logging",
          ],
          outcome: "Outcomes available upon request (NDA).",
        },
        {
          title: "Enterprise Support Copilot",
          industry: "Technology operations (NDA)",
          category: "Technology",
          problem: "Support teams lacked consistent evidence in AI-assisted responses.",
          solution: "Introduced controlled support assistant flows with governance checkpoints.",
          controls: [
            "Permission-aware response restrictions",
            "Audit trail for support interactions",
            "Evaluation checks for answer quality",
            "Change-control for prompt and policy updates",
          ],
          outcome: "Outcomes available upon request (NDA).",
        },
      ];

  return (
    <div className="relative">
      <InnerHero
        lines={
          isRu
            ? [
                { text: "Кейсы" },
                { text: "Управляемый ИИ", accent: true },
                { text: "Внедрение" },
              ]
            : [
                { text: "Case Studies" },
                { text: "Governed AI", accent: true },
                { text: "Delivery" },
              ]
        }
        subtitle={
          isRu
            ? "NDA-safe формат кейсов с фокусом на контролях, отслеживаемости и операционном исполнении."
            : "NDA-safe case formats focused on controls, traceability, and operational execution."
        }
        primaryCta={{ label: isRu ? "Запросить релевантный кейс-бриф" : "Request relevant case brief", href: "/contact?topic=Partnership" }}
        secondaryCta={{ label: isRu ? "Аудит и комплаенс" : "Audit & Compliance", href: "/audit-compliance", ghost: true }}
        chips={
          isRu
            ? ["От проблемы к решению", "Соответствие контролям", "NDA-safe результаты"]
            : ["Problem to solution", "Control mapping", "NDA-safe outcomes"]
        }
      />

      <Clients />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title text-[var(--black)]">
            {isRu ? (
              <>
                Кейсы по <span className="stack-accent">отраслевым</span>
              </>
            ) : (
              <>
                Industry-filtered <span className="stack-accent">cases</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--black)]/84">
            {isRu
              ? "Фильтруйте кейсы по отрасли, чтобы увидеть релевантные паттерны внедрения и управление контролями."
              : "Filter by industry to review relevant implementation patterns and governance controls."}
          </p>
          <div className="mt-7">
            <CaseStudiesFilter
              items={cases}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="stack-hero-bg absolute inset-0 opacity-88" />
        <div className="absolute inset-0 bg-black/46" />
        <div className="width-wrapper relative grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <h2 className="stack-grid-title max-w-4xl text-white">
            {isRu ? (
              <>
                Нужен кейс-бриф под вашу <span className="stack-accent">отрасль</span>?
              </>
            ) : (
              <>
                Need a case brief matched to your <span className="stack-accent">industry</span>?
              </>
            )}
          </h2>
            <div className="grid gap-3">
            <Link href="/contact?topic=Partnership" className="stack-cta text-xl md:text-2xl">
              {isRu ? "Запросить релевантный кейс-бриф" : "Request relevant case brief"}
            </Link>
            <Link href="/contact?topic=Audit%20brief" className="stack-cta-ghost text-xl md:text-2xl">
              {isRu ? "Запросить аудит" : "Request audit brief"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
