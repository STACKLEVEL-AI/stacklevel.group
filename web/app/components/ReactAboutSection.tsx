"use client";

import { useTranslations } from "next-intl";
import HireLinks from "./HireLinks";

export default function ReactAboutSection() {
  const t = useTranslations("reactPage");

  const services = [
    "mobile",
    "upgrade",
    "integration",
    "web",
    "frontend"
  ] as const;

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-[1200px] px-4">

        {/* Intro */}
        <p className="mb-12 md:mb-20 text-[24px] md:text-[36px] font-bold leading-[1.2] text-black">
          {t("intro")}
        </p>

        {/* What is React */}
        <h2 className="mb-4 md:mb-6 text-[28px] md:text-[36px] font-bold text-black">
          {t("whatIsTitle")}
        </h2>

        <p className="w-full max-w-[1000px] mb-8 md:mb-12 text-[18px] md:text-[21px] leading-[1.2] text-black">
          {t("whatIsText")}
        </p>

        {/* Where */}
        <h2 className="mb-4 md:mb-6 text-[26px] md:text-[32px] font-bold text-black">
          {t("whereTitle")}
        </h2>

        <p className="mb-4 md:mb-6 max-w-[1000px] text-[18px] md:text-[21px] leading-[1.2] text-black">
          {t("whereIntro")}
        </p>

        <ul className="mb-12 md:mb-20 space-y-4 pl-6">
          {services.map((key) => (
            <li
              key={key}
              className="relative text-[16px] md:text-[21px] leading-[1.6] text-black"
            >
              <span className="absolute -left-6 top-[15px] h-1.5 w-1.5 bg-blue-600" />
              {t(`services.${key}`)}
            </li>
          ))}
        </ul>

        {/* Why */}
        <h2 className="mb-4 md:mb-6 text-[28px] md:text-[36px] font-bold text-black">
          {t("whyTitle")}
        </h2>

        <h3 className="mb-4 md:mb-6 text-[24px] md:text-[30px] font-bold text-blue-600">
          {t("benefit1Title")}
        </h3>

        <p className="w-full mb-12 max-w-[1000px] text-[21px] leading-[1.2] text-black">
          {t("benefit1Text")}
        </p>

        <h3 className="mb-4 md:mb-6 text-[22px] md:text-[26px] font-bold text-blue-600">
          {t("benefit2Title")}
        </h3>

        <p className="mb-8 md:mb-12 max-w-[1000px] text-[18px] md:text-[21px] leading-[1.2] text-black">
          {t("benefit2Text")}
        </p>

        <h3 className="mb-3 md:mb-4 text-[22px] md:text-[26px] font-bold text-blue-600">
          {t("benefit3Title")}
        </h3>

        <p className="mb-8 md:mb-12 max-w-[1000px] text-[18px] md:text-[21px] leading-[1.2] text-black">
          {t("benefit3Text")}
        </p>

        <h3 className="mb-3 md:mb-4 text-[22px] md:text-[26px] font-bold text-blue-600">
          {t("benefit4Title")}
        </h3>

        <p className="mb-16 md:mb-24 max-w-[1000px] text-[18px] md:text-[21px] leading-[1.2] text-black">
          {t("benefit4Text")}
        </p>

        {/* Team */}
        <h2 className="w-full max-w-[1000px] mb-4 md:mb-6 text-[28px] md:text-[36px] font-bold text-black">
          {t("teamTitle")}
        </h2>

        <p className="w-full max-w-[1000px] text-[18px] md:text-[21px] leading-[1.2] text-black">
          {t("teamText")}
        </p>

        <HireLinks />
      </div>
    </section>
  );
}
