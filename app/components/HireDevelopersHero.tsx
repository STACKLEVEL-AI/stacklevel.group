"use client";

import { useState } from "react";
import HireUsModal from "./HireUsModal";
import { useTranslations } from "next-intl";

type ButtonVariant = "default" | "outlined";

type Props = {
  buttonVariant?: ButtonVariant;
  text?: string;
};

export default function HireDevelopersHero({
  buttonVariant = "default",
  text,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("hireHero");
  const buttonText = text ?? t("requestDeveloper");

  return (
    <div className="w-full py-5 hire-developers-hero relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(197.93deg, #1b0dff 0.06%, #ff0052 120%)",
        }}
      />

      <div
        className="hire-developers-hero-dots absolute inset-0 z-[1]"
        aria-hidden
      />

      <div className="width-wrapper relative z-10 flex min-h-[200px] flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 md:py-12 lg:px-8">
        <h1 className="font-semibold leading-tight text-white text-2xl">
          <span className="block">{t("line1")}</span>
          <span className="block">{t("line2")}</span>
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className={`
              w-full
              max-w-[300px]
              sm:w-[300px]
              h-[65px]
              cursor-pointer
              px-6 py-4
              font-medium uppercase
              transition-all duration-300
              text-lg
              sm:text-base
              border-[4px]

              ${buttonVariant === "outlined"
              ? `
                    bg-blue-700
                    text-white
                    border-blue-700
              
                    hover:bg-white
                    hover:text-blue-700
                    hover:border-blue-700
                  `
              : `
                    bg-white
                    text-blue-700
                    border-white
                
                    hover:bg-blue-700
                    hover:text-white
                    hover:border-white
                  `
            }
  `}
        >
          {buttonText}
        </button>


        {isOpen && <HireUsModal onClose={() => setIsOpen(false)} />}
      </div>
    </div>
  );
}


