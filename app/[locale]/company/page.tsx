import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import Clients from "@/app/components/Clients";
import LeadershipQuotesSlider from "@/app/components/LeadershipQuotesSlider";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const isRu = isRuLocale(params.locale);

  return {
    title: isRu ? "О компании | Stacklevel Group" : "Company | Stacklevel Group",
    description: isRu
      ? "Профиль Stacklevel Group: управляемая инженерия ИИ, аудит и соблюдение требований для корпоративных команд."
      : "Stacklevel Group profile: governed AI engineering, audit, and compliance delivery for enterprise teams.",
  };
}

export default function CompanyPage({ params }: Props) {
  const isRu = isRuLocale(params.locale);

  const pillars = isRu
    ? [
        {
          title: "Инженерия ИИ",
          bullets: [
            "Производственные сценарии обработки LLM и интеграции для enterprise-сред.",
            "Локальное и гибридное развёртывание с учётом ограничений.",
            "Оптимизация производительности и затрат на вывод моделей.",
          ],
        },
        {
          title: "Аудит ИИ",
          bullets: [
            "Требования к доказательной базе и отслеживаемости (traceability).",
            "Методология оценки и артефакты для ревью.",
            "Формат отчётности, готовый для аудита.",
          ],
        },
        {
          title: "Комплаенс и управление ИИ",
          bullets: [
            "Политики, контроль доступа, журналирование и управление изменениями.",
            "Контролы реализуются в системах, а не в презентациях.",
            "Шаблоны управления для повторяемого развёртывания.",
          ],
        },
      ]
    : [
        {
          title: "AI Engineering",
          bullets: [
            "Production LLM workflows and enterprise integrations.",
            "On-prem and hybrid delivery aligned with constraints.",
            "Performance and cost optimization for inference.",
          ],
        },
        {
          title: "AI Audit",
          bullets: [
            "Evidence and traceability requirements.",
            "Evaluation methodology and review artifacts.",
            "Audit-ready reporting artifacts and formats.",
          ],
        },
        {
          title: "Compliance & Governance",
          bullets: [
            "Policies, access control, logging and change management.",
            "Controls implemented in systems, not slides.",
            "Governance templates for repeatable rollout.",
          ],
        },
      ];

  return (
    <div className="relative pb-16 md:pb-20">
      <section className="relative py-10 md:py-14">
        <div className="width-wrapper">
          <article className="stack-panel-accent p-6 md:p-8 lg:p-10">
            <h1 className="stack-grid-title max-w-6xl text-white">
              {isRu
                ? "Мы строим управляемые системы ИИ, которые проходят проверку по безопасности, соответствию и аудиту."
                : "We build governed AI systems that survive security, compliance, and audit."}
            </h1>
            <p className="mt-5 max-w-5xl text-base leading-relaxed text-white/93 md:text-lg">
              {isRu
                ? "С 2018 года Stacklevel Group поставляет сложные корпоративные системы и интеграции. Сегодня мы фокусируемся на управляемой инженерии ИИ: инжиниринге, аудите и соблюдении требований, чтобы ИИ доходил до производственной эксплуатации, а не оставался на уровне пилота."
                : "Since 2018, Stacklevel Group has delivered complex enterprise systems and integrations. Today we focus on governed AI: engineering, audit, and compliance, so AI can be deployed in regulated production, not just piloted."}
            </p>
            <p className="mt-3 max-w-5xl text-base leading-relaxed text-white/93 md:text-lg">
              {isRu
                ? "Мы сочетаем дисциплину поставки с продуктовыми решениями, включая Century, чтобы стандартизировать доказательную базу, управление доступом, оценку и аудиторские журналы."
                : "We combine delivery discipline with product assets, including Century, to standardize evidence, access control, evaluation, and audit trails."}
            </p>
          </article>
        </div>
      </section>

      <section className="relative py-8 md:py-12">
        <div className="width-wrapper">
          <article className="stack-panel bg-white p-6 md:p-8">
            <h2 className="stack-grid-title max-w-5xl text-[var(--black)]">
              {isRu ? (
                <>
                  Engineering. Audit. <span className="stack-accent">Compliance</span> в одном плане исполнения.
                </>
              ) : (
                <>
                  Engineering. Audit. <span className="stack-accent">Compliance</span> - one execution plan.
                </>
              )}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pillars.map((pillar) => (
                <section key={pillar.title} className="stack-panel-pale p-4 md:p-5">
                  <h3 className="stack-title text-xl text-[var(--black)]">{pillar.title}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--black)]">
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>

      <Clients title={isRu ? "Нам доверяют с 2018 года" : "Trusted by leading enterprises since 2018"} className="py-6 md:py-8" />

      <section className="relative py-8 md:py-12">
        <div className="width-wrapper">
          <article className="relative overflow-hidden bg-[rgba(245,244,247,.84)] px-5 py-7 sm:px-6 md:px-10 md:py-10">
            <div className="mb-5 lg:hidden">
              <h2 className="stack-title text-4xl text-[var(--black)]">
                WE <span className="stack-accent">ARE ...</span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[190px_1fr]">
              <div className="relative hidden min-h-[280px] items-center justify-start lg:flex">
                <span
                  className="stack-title absolute translate-x-[10px] translate-y-[24px] text-6xl tracking-wide text-[var(--brand-gray)]/45"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  МЫ — ...
                </span>
                <span
                  className="stack-title relative z-10 text-6xl tracking-wide text-[var(--black)]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  МЫ — ...
                </span>
              </div>

              <div className="grid gap-y-10 gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                <div className="space-y-10 md:space-y-12">
                  <article>
                    <p className="stack-title text-[clamp(32px,2.7vw,56px)] text-[var(--accent)]">30+</p>
                    <p className="stack-title mt-1 text-[clamp(24px,2vw,46px)] leading-[0.96] text-[var(--black)]">
                      {isRu ? "ОПЫТНЫЕ РАЗРАБОТЧИКИ" : "EXPERIENCED DEVELOPERS"}
                    </p>
                  </article>
                  <article>
                    <p className="stack-title text-[clamp(32px,2.7vw,56px)] text-[var(--accent)]">92%</p>
                    <p className="stack-title mt-1 text-[clamp(24px,2vw,46px)] leading-[0.96] text-[var(--black)]">
                      {isRu ? "ВОЗВРАЩАЮЩИХСЯ КЛИЕНТОВ" : "OF RETURNED CUSTOMERS"}
                    </p>
                  </article>
                </div>

                <div className="space-y-10 md:space-y-12">
                  <article>
                    <p className="stack-title text-[clamp(32px,2.7vw,56px)] text-[var(--accent)]">3+</p>
                    <p className="stack-title mt-1 text-[clamp(24px,2vw,46px)] leading-[0.96] text-[var(--black)]">
                      {isRu ? "ЛЕТ НА РЫНКЕ" : "YEARS ON THE MARKET"}
                    </p>
                  </article>
                  <article>
                    <p className="stack-title text-[clamp(32px,2.7vw,56px)] text-[var(--accent)]">ТОЛЬКО ...</p>
                    <p className="stack-title mt-1 text-[clamp(24px,2vw,46px)] leading-[0.96] text-[var(--accent)]">
                      {isRu ? "ПОЗИТИВНЫЕ ОТЗЫВЫ" : "POSITIVE FEEDBACK"}
                    </p>
                  </article>
                </div>

                <div className="space-y-10 md:space-y-12 sm:col-span-2 xl:col-span-1">
                  <article>
                    <p className="stack-title text-[clamp(32px,2.7vw,56px)] text-[var(--accent)]">20+</p>
                    <p className="stack-title mt-1 text-[clamp(24px,2vw,46px)] leading-[0.96] text-[var(--black)]">
                      {isRu ? "УСПЕШНЫЕ ПРОЕКТЫ" : "SUCCESSFUL PROJECTS"}
                    </p>
                  </article>

                  <Link
                    href="/contact?topic=Scoping%20call"
                    className="inline-flex min-h-[104px] w-full max-w-[360px] items-center border border-[var(--accent)] bg-[var(--accent)] px-6 py-4 text-[clamp(20px,1.6vw,32px)] font-bold uppercase leading-[1.03] text-white transition hover:bg-white hover:text-[var(--accent)]"
                  >
                    {isRu ? "ХОТИТЕ УЗНАТЬ О НАС БОЛЬШЕ?" : "WANT TO KNOW MORE ABOUT US?"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 h-3 bg-[var(--accent)]" />
          </article>
        </div>
      </section>

      <section className="relative py-8 md:py-12">
        <div className="width-wrapper">
          <LeadershipQuotesSlider />
        </div>
      </section>

      <section className="relative py-8 md:py-12">
        <div className="width-wrapper">
          <article className="stack-panel-dark p-6 md:p-8">
            <h2 className="stack-grid-title max-w-4xl text-white">
              {isRu ? (
                <>
                  Готовы обсудить <span className="stack-accent">управляемое</span> развёртывание ИИ?
                </>
              ) : (
                <>
                  Ready to scope a <span className="stack-accent">governed</span> AI rollout?
                </>
              )}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/90 md:text-lg">
              {isRu
                ? "Опишите рабочий процесс и ограничения. Мы предложим наиболее подходящий путь: инжиниринговую поставку, бриф аудита или демонстрацию продукта."
                : "Share your workflow and constraints. We will suggest the fastest path: engineering delivery, audit brief, or a product demo."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:max-w-4xl">
              <Link href="/contact?topic=Scoping%20call" className="stack-cta text-lg md:text-xl">
                {isRu ? "Запросить звонок для уточнения объёма" : "Request scoping call"}
              </Link>
              <Link href="/contact?topic=Audit%20brief" className="stack-cta-ghost text-lg md:text-xl">
                {isRu ? "Запросить бриф аудита" : "Request audit brief"}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
