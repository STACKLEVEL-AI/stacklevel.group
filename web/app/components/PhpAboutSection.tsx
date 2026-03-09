"use client";

import HireLinks from "./HireLinks";
import { useTranslations } from "next-intl";

export default function PhpAboutSection() {
  const t = useTranslations("phpAbout");

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 font-formular">
        {/* Hero text */}
        <h1 className="mb-24 font-formular text-[calc(24px+12*((100vw-300px)/1300))] font-bold leading-snug text-black md:text-[36px]">
          {t("hero")}
        </h1>

        {/* Section title */}
        <h2 className="mb-8 font-formular text-[calc(24px+12*((100vw-300px)/1300))] font-bold text-black md:text-[28px]">
          {t("whatIsTitle")}
        </h2>

        {/* Description */}
        <p className="max-w-[1000px] font-formular font-medium text-[calc(16px+12*((100vw-300px)/1300))] leading-[1.2] text-black md:text-[18px]">
          {t("whatIsText")}
        </p>

        <h2 className="text-[calc(24px+12*((100vw-300px)/1300))] font-bold text-black md:text-[32px] py-[50px]">
          {t("whereTitle")}
        </h2>

        <p className="w-full max-w-[1000px] mb-8 leading-[1.2] text-black md:text-[calc(16px+5*((100vw-300px)/1300))] font-medium">
          {t("whereText")}
        </p>

        <ul className="mb-20 space-y-5 pl-6 text-[16px] md:text-[calc(16px+5*((100vw-300px)/1300))]">
          {[
            t("services.customApps"),
            t("services.websites"),
            t("services.social"),
            t("services.ecommerce"),
            t("services.customPhp"),
          ].map((item) => (
            <li key={item} className="relative pl-6">
              <span className="absolute left-0 top-3.5 h-1.5 w-1.5 bg-blue-600" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-12 text-[32px] font-bold text-black md:text-[calc(24px+12*((100vw-300px)/1300))]">
          {t("whyTitle")}
        </h2>

        <h3 className="mb-4 text-[22px] font-semibold text-blue-600 md:text-[calc(20px+10*((100vw-300px)/1300))]">
          {t("benefit1Title")}
        </h3>

        <p className="w-full max-w-[1000px] mb-12 text-[16px] leading-[1.2] text-black md:text-[calc(16px+5*((100vw-300px)/1300))]">
          {t("benefit1Text")}
        </p>

        <h3 className="mb-4 text-[22px] font-semibold text-blue-600 md:text-[calc(20px+10*((100vw-300px)/1300))]">
          {t("benefit2Title")}
        </h3>

        <p className="w-full mb-12 max-w-[1000px] text-[16px] leading-[1.2] text-black md:text-[calc(16px+5*((100vw-300px)/1300))]">
          {t("benefit2Text")}
        </p>

        <h3 className="mb-4 text-[22px] font-semibold text-blue-600 md:text-[calc(20px+10*((100vw-300px)/1300))]">
          {t("benefit3Title")}
        </h3>

        <p className="w-full max-w-[1000px] mb-12 text-[16px] leading-[1.2] text-black md:text-[calc(16px+5*((100vw-300px)/1300))]">
          {t("benefit3Text")}
        </p>

        <h3 className="mb-4 text-[22px] font-semibold text-blue-600 md:text-[calc(20px+10*((100vw-300px)/1300))]">
          {t("benefit4Title")}
        </h3>

        <p className="w-full max-w-[1000px] mb-24 text-[16px] leading-[1.2] text-black md:text-[calc(16px+5*((100vw-300px)/1300))]">
          {t("benefit4Text")}
        </p>

        <h2 className="w-full max-w-[1000px] mb-8 text-[32px] font-bold leading-tight text-black md:text-[calc(24px+12*((100vw-300px)/1300))]">
          {t("teamTitle")}
        </h2>

        <p className="w-full max-w-[1000px] text-[16px] leading-[1.2] text-black md:text-[calc(16px+5*((100vw-300px)/1300))]">
          {t("teamText")}
        </p>

        <HireLinks />
      </div>
    </section>
  );
}
