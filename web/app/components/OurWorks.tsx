import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function OurWorks() {
  const t = useTranslations("ourWorks");

  const ndaCases = [
    {
      title: t("cases.financial.title"),
      industry: t("cases.financial.industry"),
      focus: t("cases.financial.focus"),
      tone: "stack-panel-accent",
    },
    {
      title: t("cases.public.title"),
      industry: t("cases.public.industry"),
      focus: t("cases.public.focus"),
      tone: "stack-panel-dark",
    },
    {
      title: t("cases.industrial.title"),
      industry: t("cases.industrial.industry"),
      focus: t("cases.industrial.focus"),
      tone: "stack-panel-pale",
    },
  ] as const;

  return (
    <section id="our-works" className="relative overflow-hidden bg-[#f4f4f6] py-12 md:py-16">
      <div className="width-wrapper relative">
        <h2 className="stack-grid-title max-w-4xl text-[var(--black)]">
          {t("title")} <span className="stack-accent">Case</span> Studies
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--black)]/85">
          {t("subtitle")}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ndaCases.map((item) => (
            <article key={item.title} className={`${item.tone} p-5`}>
              <p className="text-xs font-bold uppercase tracking-wide opacity-90">{item.industry}</p>
              <h3 className="stack-title mt-3 text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{item.focus}</p>
            </article>
          ))}
        </div>

        <Link href="/case-studies" className="stack-cta mt-8 w-full max-w-[360px] text-xl md:text-2xl">
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
