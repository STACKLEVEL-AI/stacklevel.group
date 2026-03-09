import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import { readFileSync } from "fs";
import { join } from "path";
import Clients from "@/app/components/Clients";
import LeadershipQuotesSlider from "@/app/components/LeadershipQuotesSlider";
import InnerHero from "../../components/InnerHero";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "О компании | Stacklevel Group" : "Company | Stacklevel Group",
    description: isRu
      ? "Профиль Stacklevel Group: управляемая инженерия ИИ, аудит и соблюдение требований для корпоративных команд."
      : "Stacklevel Group profile: governed AI engineering, audit, and compliance delivery for enterprise teams.",
  };
}

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  const isRu = isRuLocale(locale);
  
  // Read messages directly for static export
  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, "utf-8"));
  
  // Get company page translations
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages.pages?.company;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

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
      <InnerHero
        lines={
          isRu
            ? [
                { text: "StackLevel", accent: true },
                { text: "Group", accent: false },
              ]
            : [
                { text: "StackLevel", accent: true },
                { text: "Group", accent: false },
              ]
        }
        subtitle={t("subtitle")}
        primaryCta={{ label: t("primaryCta"), href: "/contact?topic=Scoping%20call" }}
        secondaryCta={{ label: t("secondaryCta"), href: "/services", ghost: true }}
        chips={isRu ? ["AI Engineering", "Аудит", "Комплаенс"] : t("chips").split(", ")}
      />

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

      <Clients title={t("clientsTitle")} className="py-6 md:py-8" />

      <section className="relative py-8 md:py-12">
        <div className="width-wrapper">
          <article
            className="relative overflow-hidden border border-[rgba(0,0,0,.12)] bg-[rgba(245,244,247,.56)] px-5 py-7 sm:px-6 md:px-10 md:py-10"
            style={{ backgroundPosition: "14px 14px" }}
          >
            <div className="mb-6 lg:hidden">
              <h2 className="stack-title text-[clamp(30px,7.4vw,44px)] text-[var(--black)]">
                {t("heroSection.title")}
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-[130px_1fr] xl:grid-cols-[150px_1fr]">
              <div className="relative hidden min-h-[360px] items-center justify-center lg:flex">
                <span
                  className="stack-title absolute translate-x-[8px] translate-y-[14px] text-[72px] tracking-wide text-[var(--brand-gray)]/45"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {t("heroSection.title")}
                </span>
                <span
                  className="stack-title relative z-10 text-[72px] tracking-wide text-[var(--black)]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {t("heroSection.title")}
                </span>
              </div>

              <div className="grid items-start gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                <article>
                  <p className="text-[clamp(40px,3.6vw,58px)] font-bold uppercase leading-[1] text-[var(--accent)]">{t("heroSection.experienced")}</p>
                  <p className="stack-title mt-3 text-[clamp(28px,2.3vw,34px)] leading-[1.08] text-[var(--black)]">
                    {t("stats.experienced")}
                  </p>
                </article>

                <article>
                  <p className="text-[clamp(40px,3.6vw,58px)] font-bold uppercase leading-[1] text-[var(--accent)]">{t("heroSection.years")}</p>
                  <p className="stack-title mt-3 text-[clamp(28px,2.3vw,34px)] leading-[1.08] text-[var(--black)]">
                    {t("stats.years")}
                  </p>
                </article>

                <article>
                  <p className="text-[clamp(40px,3.6vw,58px)] font-bold uppercase leading-[1] text-[var(--accent)]">{t("heroSection.projects")}</p>
                  <p className="stack-title mt-3 text-[clamp(28px,2.3vw,34px)] leading-[1.08] text-[var(--black)]">
                    {t("stats.success")}
                  </p>
                </article>

                <article>
                  <p className="text-[clamp(40px,3.6vw,58px)] font-bold uppercase leading-[1] text-[var(--accent)]">{t("heroSection.returnedClients")}</p>
                  <p className="stack-title mt-3 text-[clamp(28px,2.3vw,34px)] leading-[1.08] text-[var(--black)]">
                    {t("stats.returned")}
                  </p>
                </article>

                <article>
                  <p className="stack-title text-[clamp(28px,2.2vw,34px)] leading-[1.08] text-[var(--black)]">
                    {t("heroSection.positiveFeedback")}
                  </p>
                  <p className="stack-title mt-3 text-[clamp(28px,2.3vw,34px)] leading-[1.08] text-[var(--accent)]">
                    {t("stats.positive")}
                  </p>
                </article>

                <div className="md:col-span-2 xl:col-span-1">
                  <Link
                    href="/contact?topic=Scoping%20call"
                    className="inline-flex min-h-[100px] w-full max-w-[410px] items-center border border-[var(--accent)] bg-[var(--accent)] px-7 py-4 text-[clamp(26px,2vw,42px)] font-bold uppercase leading-[1.02] text-white transition hover:bg-white hover:text-[var(--accent)]"
                  >
                    {t("cta.more")}
                  </Link>
                </div>
              </div>
            </div>
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
              {t("ctaSection.title")}
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/90 md:text-lg">
              {t("ctaSection.description")}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:max-w-4xl">
              <Link href="/contact?topic=Scoping%20call" className="stack-cta text-lg md:text-xl">
                {t("ctaSection.ctaPrimary")}
              </Link>
              <Link href="/contact?topic=Audit%20brief" className="stack-cta-ghost text-lg md:text-xl">
                {t("ctaSection.ctaSecondary")}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
