import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import InnerHero from "../../components/InnerHero";
import Accordion from "../../components/Accordion";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "Материалы | Управляемое корпоративное ИИ" : "Resources | Governed Enterprise AI",
    description: isRu
      ? "Практические материалы по управляемому внедрению ИИ, отслеживаемости аудита и комплаенсу по дизайну для корпоративных команд."
      : "Practical resources on governed AI implementation, audit traceability, and compliance-by-design for enterprise teams.",
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  const featuredTopics = isRu
    ? [
        "Управление LLM в локальных (on-prem) развёртываниях для закрытых сред.",
        "Восстановление по источникам с ссылками для проверяемых и готовых к ревью ответов.",
        "Этапы оценки для релиза и контроль качества во время работы.",
        "Аудиторские журналы и структуры отслеживаемости для рабочих процессов ИИ.",
        "Поиск с учётом прав доступа для ответов, ограниченных правами.",
        "Паттерны изолированного развёртывания для ограждённых контуров.",
      ]
    : [
        "On-prem LLM governance in private deployment environments.",
        "RAG with citations for verifiable and reviewable responses.",
        "Evaluation gates for release and runtime quality control.",
        "Audit trails and traceability structures for AI workflows.",
        "IAM-aware retrieval for permission-bound responses.",
        "Air-gapped deployment patterns for isolated operations.",
      ];

  const extraTopics = isRu
    ? [
        "Формулировка рисков модели для корпоративных ИИ-программ.",
        "Шаблоны референсных архитектур для регулируемого развёртывания.",
        "Операционный ритм управления для кросс-функциональных команд ревью.",
        "Модели управления изменениями инструкций и политик для промышленного ИИ.",
      ]
    : [
        "Model risk framing for enterprise AI programs.",
        "Reference architecture patterns for regulated rollout.",
        "Governance operating cadence for cross-functional review teams.",
        "Prompt and policy change-control models for production AI.",
      ];

  return (
    <div className="relative">
      <InnerHero
        lines={
          isRu
              ? [
                  { text: "Материалы для" },
                  { text: "Управляемого ИИ", accent: true },
                  { text: "Операций" },
                ]
            : [
                { text: "Resources for" },
                { text: "Governed AI", accent: true },
                { text: "Operations" },
              ]
        }
        subtitle={
          isRu
            ? "Практические референсы для команд, внедряющих ИИ в регулируемых и ответственных средах."
            : "Practical references for teams building AI in regulated or high-accountability environments."
        }
        primaryCta={{ label: isRu ? "Запросить брифинг" : "Request briefing", href: "/contact?topic=Partnership" }}
        secondaryCta={{ label: isRu ? "Смотреть кейсы" : "View case studies", href: "/case-studies", ghost: true }}
        chips={
          isRu
            ? ["Контролы и доказательства", "Операционные практики", "Корпоративное развёртывание"]
            : ["Controls and evidence", "Operational guidance", "Enterprise rollout"]
        }
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative">
          <h2 className="stack-grid-title text-[var(--black)]">
            {isRu ? (
              <>
                Ключевые <span className="stack-accent">темы</span>
              </>
            ) : (
              <>
                Featured <span className="stack-accent">topics</span>
              </>
            )}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {featuredTopics.map((topic, index) => (
              <article key={topic} className={`${index % 2 === 0 ? "stack-panel" : "stack-panel-pale"} p-5`}>
                <p className="text-sm text-[var(--black)]">{topic}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper">
          <h2 className="stack-grid-title text-[var(--black)]">
            {isRu ? (
              <>
                Дополнительные <span className="stack-accent">темы</span>
              </>
            ) : (
              <>
                More <span className="stack-accent">topics</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--black)]/84">
            {isRu
              ? "Дополнительные брифинги фокусируются на решениях по внедрению, операциях управления и артефактах, готовых к ревью."
              : "Additional briefings focus on implementation decisions, governance operations, and review-readiness artifacts."}
          </p>
          <Accordion
            className="mt-6"
            items={[
              {
                title: isRu ? "Показать все темы" : "View all topics",
                content: (
                  <ul className="list-disc space-y-2 pl-5 text-sm min-h-[120px] h-[100%] max-[500px]:min-h-[140px] max-[400px]:min-h-[200px]">
                    {extraTopics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            <Link href="/contact?topic=Partnership" className="stack-cta text-xl md:text-2xl">
              {isRu ? "Запросить briefing" : "Request briefing"}
            </Link>
            <Link href="/case-studies" className="stack-cta-ghost text-xl md:text-2xl">
              {isRu ? "Смотреть кейсы" : "View case studies"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
