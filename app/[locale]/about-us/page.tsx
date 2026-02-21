"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isRuLocale } from "@/i18n/localeUtils";

type Interviewer = {
  name: string;
  role: string;
  quote: string;
  image?: string;
  imageAlt: string;
  initials: string;
};

export default function AboutUsPage() {
  const t = useTranslations("aboutUs");
  const locale = useLocale();
  const isRu = isRuLocale(locale);
  const [activeInterviewer, setActiveInterviewer] = useState(0);

  const interviewers = useMemo<Interviewer[]>(
    () => [
      {
        name: t("ceo.name"),
        role: t("ceo.position"),
        quote: t("ceo.quote"),
        image: "/images/persons/max.jpg",
        imageAlt: "Maxim Garbar",
        initials: "MG",
      },
      {
        name: "TBD",
        role: isRu ? "Руководитель AI Engineering" : "Head of AI Engineering",
        quote: isRu
          ? "Мы превращаем AI-инициативы в производственные процессы: интеграции, ограничения деплоя и оптимизацию производительности/стоимости."
          : "We turn AI initiatives into production workflows: integrations, deployment constraints, and performance/cost optimization.",
        imageAlt: "Head of AI Engineering",
        initials: "AE",
      },
      {
        name: "TBD",
        role: isRu ? "Руководитель AI Audit & Compliance" : "Head of AI Audit & Compliance",
        quote: isRu
          ? "Мы переводим требования безопасности и регуляторов в контролируемые политики, аудит и практики governance."
          : "We translate regulatory and security requirements into enforceable controls, audits, and governance playbooks.",
        imageAlt: "Head of AI Audit & Compliance",
        initials: "AC",
      },
    ],
    [locale, t]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveInterviewer((prev) => (prev + 1) % interviewers.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [interviewers.length]);

  const current = interviewers[activeInterviewer];

  return (
    <section className="w-full bg-white mb-16 md:mb-24">
      {/* TOP BLOCK */}
      <div className="width-wrapper stack-panel my-8 flex flex-col overflow-hidden md:my-12 md:flex-row">
        {/* LEFT */}
        <div className="hidden w-full items-center justify-center bg-white px-4 py-8 md:flex md:w-[42%] md:py-12">
          <div className="relative aspect-[470/170] w-full max-w-[470px]">
            <Image
              src="/logo.svg"
              alt="STACKLEVEL GROUP"
              width={470}
              height={170}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full bg-[var(--accent)] px-5 py-10 text-white sm:px-6 md:w-[58%] md:px-12 md:py-14">
          {/* TEXT */}
          <div className="relative z-10 w-full max-w-[720px]">
            <h1 className="stack-title text-2xl text-white sm:text-3xl md:text-4xl">
              {isRu ? "МЫ СОЗДАЕМ УПРАВЛЯЕМЫЕ AI-СИСТЕМЫ ДЛЯ РЕАЛЬНОГО ПРОДАКШНА" : "WE BUILD GOVERNED AI SYSTEMS FOR REAL PRODUCTION"}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/92 md:text-lg">{t("intro.first")}</p>
            <p className="mt-3 text-base leading-relaxed text-white/92 md:text-lg">{t("intro.second")}</p>
          </div>

          {/* SVG */}
          <div className="pointer-events-none absolute -right-2 -top-5 w-[80px] opacity-45 sm:w-[120px] md:w-[170px] md:opacity-90">
            <Image
              src="/images/vector3.svg"
              alt=""
              width={260}
              height={680}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* INTERVIEWERS ROTATOR */}
      <div className="width-wrapper pb-2 pt-4 md:pt-6">
        <article className="stack-panel relative bg-white p-4 sm:p-6 md:p-8">
          <div className="pointer-events-none absolute right-4 top-4 w-14 opacity-90 sm:right-6 sm:top-5 sm:w-16 md:w-20">
            <Image src="/images/_quotes.svg" alt="" width={146} height={111} className="h-auto w-full" />
          </div>

          <div className="grid gap-4 md:grid-cols-[280px_1fr] md:gap-6">
            <div className="relative overflow-hidden border border-[rgba(0,0,0,.15)] bg-[var(--pale-gray)]">
              {current.image ? (
                <div className="relative min-h-[320px]">
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex min-h-[320px] items-center justify-center text-5xl font-bold uppercase text-[var(--accent)]">
                  {current.initials}
                </div>
              )}
              <div className="absolute bottom-0 left-0 h-[4px] w-full bg-[var(--accent)]" />
            </div>

            <div className="flex min-h-[320px] flex-col justify-between border border-[rgba(0,0,0,.15)] bg-white p-5 md:p-6">
              <div>
                <h2 className="stack-title text-2xl text-[var(--accent)] sm:text-3xl">{current.name}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[var(--black)]/80">{current.role}</p>
                <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[var(--black)] sm:text-xl">{current.quote}</p>
              </div>
              <div className="mt-7 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-wide text-[var(--black)]/58">
                  {isRu ? "Интервьюеры переключаются автоматически" : "Interviewers rotate automatically"}
                </p>
                <div className="flex items-center gap-2">
                  {interviewers.map((item, index) => {
                    const isActive = index === activeInterviewer;
                    return (
                      <button
                        key={`${item.role}-${index}`}
                        type="button"
                        onClick={() => setActiveInterviewer(index)}
                        className={`h-2.5 transition-all ${isActive ? "w-10 bg-[var(--accent)]" : "w-6 bg-[var(--brand-gray)]"}`}
                        aria-label={`${isRu ? "Показать" : "Show"} ${item.role}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
