"use client";

import { useState } from "react";
import { StepCard } from "../../components/StepСard";
import HireDevelopersHero from "../../components/HireDevelopersHero";
import { ExpertCard } from "../../components/ExpertCard";
import HireUsModal from "../../components/HireUsModal";
import { useLocale, useTranslations } from "next-intl";

export default function HireDedicatedTeamPage() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("dedicatedHero");
  const locale = useLocale();

  return (
    <section className="relative w-full pb-20">

      <HireDevelopersHero text={t("requestTeam")} />

      {/* STEPS */}
      <div className="relative mt-12 md:mt-20 lg:mt-24">

        <div className="dots-pattern absolute left-0 top-[-60px] h-[140px] w-[40px] z-0" />
        <div className="dots-pattern absolute left-0 bottom-[-80px] h-[320px] w-[28%] -z-10" />

        <h2 className="relative z-10 mb-10 px-4 text-center font-bold uppercase tracking-wide text-[clamp(22px,4vw,36px)]">
          {t("title")}
        </h2>

        <div className="relative z-10 mx-auto flex w-full max-w-[1476px] flex-col items-stretch gap-6 px-4 md:flex-row md:justify-between md:gap-4">

          <StepCard
            step={locale === "en" ? "STEP 1" : "ШАГ 1"}
            text={t("steps.step1")}
          />

          <StepCard
            step={locale === "en" ? "STEP 2" : "ШАГ 2"}
            text={t("steps.step2")}
          />

          <StepCard
            step={locale === "en" ? "STEP 3" : "ШАГ 3"}
            showArrow={false}
            text={t("steps.step3")}
          />

        </div>
      </div>

      {/* EXPERTS TITLE */}
      <h2 className="mx-auto mt-16 mb-10 max-w-[1476px] px-4 text-center font-bold uppercase tracking-wide text-[clamp(22px,4vw,36px)]">
        {t("expertsTitle")}
      </h2>

      {/* EXPERTS GRID */}
      <div className="mx-auto grid w-full max-w-[1476px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        <ExpertCard
          title={t("experts.pmTitle")}
          text={t("experts.pmText")}
        />

        <ExpertCard
          title={t("experts.baTitle")}
          text={t("experts.baText")}
        />

        <ExpertCard
          title={t("experts.uxTitle")}
          text={t("experts.uxText")}
        />

        <ExpertCard
          title={t("experts.devTitle")}
          text={t("experts.devText")}
        />

        <ExpertCard
          title={t("experts.qaTitle")}
          text={t("experts.qaText")}
        />

      </div>

      {/* CTA */}
      <div className="mx-auto mt-12 flex max-w-[1476px] justify-center px-4 md:mt-20">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full max-w-[370px] cursor-pointer border-[4px] sm:border-[6px] border-blue-700 bg-blue-700 px-8 py-4 text-lg sm:text-xl font-semibold uppercase text-white transition duration-500 hover:bg-white hover:text-blue-700"
        >
          {t("cta")}
        </button>
      </div>

      {isOpen && <HireUsModal onClose={() => setIsOpen(false)} />}

    </section>
  );
}

