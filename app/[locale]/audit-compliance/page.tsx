import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import InnerHero from "../../components/InnerHero";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "Аудит ИИ и соответствие требованиям | Stacklevel" : "AI Audit & Compliance by Design | Stacklevel",
    description: isRu
      ? "Сервисы аудита и управления для корпоративных ИИ‑программ: формируем доказательную базу, прослеживаемость и исполнимые контролы."
      : "Audit and governance services for enterprise AI programs that require evidence, traceability, and enforceable controls.",
  };
}

export default async function AuditCompliancePage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  const pillars = isRu
    ? [
        {
          title: "Аудит",
          bullets: [
            "Структура доказательной базы для технического и управленческого ревью.",
            "Прослеживаемость от ответа до источников и контрольных точек.",
            "Методология оценки надёжности и риск‑поведения.",
          ],
          tone: "stack-panel-accent",
          textTone: "text-white/90",
        },
        {
          title: "Управление",
          bullets: [
            "Политики переводятся в операционные контрольные шаблоны.",
            "Ролевые и границы прав доступа отражаются в поведении в рантайме.",
            "Модель логирования и управления изменениями для регулярного ревью.",
          ],
          tone: "stack-panel-dark",
          textTone: "text-white/90",
        },
        {
          title: "Комплаенс по дизайну",
          bullets: [
            "Контролы встраиваются в архитектуру и рабочие процессы.",
            "Артефакты для ревью формируются в процессе доставки.",
            "Пути устранения привязаны к владельцам инженерных команд.",
          ],
          tone: "stack-panel-pale",
          textTone: "text-[var(--black)]",
        },
      ]
    : [
        {
          title: "Audit",
          bullets: [
            "Evidence structure for technical and executive review.",
            "Traceability from outputs to sources and control points.",
            "Evaluation methodology for reliability and risk behavior.",
          ],
          tone: "stack-panel-accent",
          textTone: "text-white/90",
        },
        {
          title: "Governance",
          bullets: [
            "Policy translated into operational control patterns.",
            "Role and permission boundaries mapped to runtime behavior.",
            "Logging and change-management model for recurring review.",
          ],
          tone: "stack-panel-dark",
          textTone: "text-white/90",
        },
        {
          title: "Compliance-by-design",
          bullets: [
            "Controls embedded in architecture and workflows.",
            "Review artifacts generated during delivery execution.",
            "Remediation paths linked to engineering ownership.",
          ],
          tone: "stack-panel-pale",
          textTone: "text-[var(--black)]",
        },
      ];

  const auditPack = isRu
    ? [
        "Отчёт об оценке с выводами и формулировкой рисков.",
        "Матрица контролей: требования и реализованные механизмы.",
        "План устранения с шагами и ответственностями.",
        "Шаблоны процессов управления для регулярного ревью.",
        "Чек‑лист доказательств для готовности к аудиту.",
      ]
    : [
        "Evaluation report with findings and risk framing.",
        "Control matrix linking requirements to implemented controls.",
        "Remediation plan with sequencing and ownership.",
        "Governance workflow templates for recurring review.",
        "Evidence checklist for audit-readiness operations.",
      ];

  const whenYouNeedThis = isRu
    ? [
        "Перед переходом от пилота к производственной эксплуатации в регулируемой среде.",
        "Когда службы безопасности или комплаенса запрашивают прослеживаемость и контролы.",
        "Когда для утверждения руководством требуются артефакты управления.",
      ]
    : [
        "Before moving from pilot to production in a regulated environment.",
        "When security or compliance teams request traceability and controls.",
        "When governance artifacts are required for executive sign-off.",
      ];

  return (
    <div className="relative">
      <InnerHero
        lines={
          isRu
            ? [
                { text: "Аудит ИИ" },
                { text: "и соответствие требованиям", accent: true },
                { text: "Инжиниринг" },
              ]
            : [
                { text: "AI Audit" },
                { text: "& Compliance", accent: true },
                { text: "Engineering" },
              ]
        }
        subtitle={
          isRu
            ? "Контролы, доказательная база и отслеживаемость для команд, внедряющих ИИ в регулируемых и ответственных средах."
            : "Controls, evidence, and traceability for teams deploying AI in regulated or high-accountability environments."
        }
        primaryCta={{ label: isRu ? "Запросить аудит" : "Request audit brief", href: "/contact?topic=Audit%20brief" }}
        secondaryCta={{ label: isRu ? "Смотреть кейсы" : "View case studies", href: "/case-studies", ghost: true }}
        chips={
          isRu
            ? ["Доказательная база", "Отслеживаемость", "Контролы в системах"]
            : ["Evidence-first", "Traceability", "Controls, not slides"]
        }
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className={`${pillar.tone} p-5`}>
              <h2 className="stack-title text-2xl">{pillar.title}</h2>
              <ul className={`mt-3 list-disc space-y-2 pl-5 text-sm ${pillar.textTone}`}>
                {pillar.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper grid gap-4 md:grid-cols-2">
          <article className="stack-panel bg-white p-5">
            <h2 className="stack-grid-title text-[var(--black)]">
              {isRu ? (
              <>
                Аудиторский <span className="stack-accent">пакет</span>
              </>
            ) : (
              <>
                Audit <span className="stack-accent">pack</span>
              </>
            )}
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-[var(--black)]">
              {auditPack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[var(--black)]">
              {isRu
                ? "Соответствие по дизайну означает, что контролы реализованы в системах."
                : "Compliance-by-design means controls implemented in systems."}
            </p>
          </article>

          <article className="stack-panel p-5">
            <h2 className="stack-grid-title text-[var(--black)]">
              {isRu ? (
                <>
                  Когда это <span className="stack-accent">нужно</span>
                </>
              ) : (
                <>
                  When you need <span className="stack-accent">this</span>
                </>
              )}
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-[var(--black)]">
              {whenYouNeedThis.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="stack-hero-bg absolute inset-0 opacity-88" />
        <div className="absolute inset-0 bg-black/44" />
        <div className="width-wrapper relative grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <h2 className="stack-grid-title max-w-4xl text-white">
            {isRu ? (
              <>
                Нужен базовый уровень управления до <span className="stack-accent">производственной эксплуатации</span>?
              </>
            ) : (
              <>
                Need a governance baseline before <span className="stack-accent">production</span>?
              </>
            )}
          </h2>
          <div className="grid gap-3">
            <Link href="/contact?topic=Audit%20brief" className="stack-cta text-xl md:text-2xl">
              {isRu ? "Запросить бриф аудита" : "Request audit brief"}
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
