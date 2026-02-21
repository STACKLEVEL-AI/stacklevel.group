"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import HireUsModal from "./HireUsModal";
import { useTranslations } from "next-intl";

type Stack = "all" | "react" | "php";

export default function DevelopersFilter() {
  const t = useTranslations("pageWebDevelopers");
  const [active, setActive] = useState<Stack>("all");
  const [isOpen, setIsOpen] = useState(false);

  const CTA_CONFIG: Record<Stack, { label: string; href?: string }> = {
    all: { label: t("textButtonAll") },
    react: { label: t("textButtonReact"), href: "/hire-react-developers" },
    php: { label: t("textButtonPHP"), href: "/hire-php-developers" },
  };

  const { label, href } = CTA_CONFIG[active];

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-[1476px] flex-col items-center gap-8 px-4 sm:gap-10 md:gap-12 lg:items-start lg:px-6">

        {/* Filter */}
        <div className="w-full max-w-[260px] border border-gray-200 bg-white p-4 sm:p-5 md:p-6 lg:w-[220px]">
          <ul className="space-y-3 text-base sm:text-lg">
            {(["all", "react", "php"] as Stack[]).map((item) => (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={`cursor-pointer ${active === item ? "font-semibold text-blue-600 underline decoration-4 underline-offset-4" : "font-medium hover:text-blue-600 hover:underline decoration-4 underline-offset-4"}`}
              >
                {item === "all" ? t("allDevelopers") : item.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex w-full justify-center">
          {active === "all" ? (
            <button
              onClick={() => setIsOpen(true)}
              className="flex w-full max-w-[900px] max-[1025px]:max-w-[700px] max-[769px]:max-w-[500px] max-[624px]:max-w-[400px] max-[464px]:max-w-[350px] cursor-pointer items-center justify-center border-[4px] sm:border-[6px] border-blue-600 bg-blue-600 px-6 py-4 sm:py-5 md:py-6 text-center text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              {label}
            </button>
          ) : (
            <Link
              href={href!}
              className="flex w-full max-w-[900px] cursor-pointer items-center justify-center border-[4px] sm:border-[6px] border-blue-600 bg-blue-600 px-6 py-4 sm:py-5 md:py-6 text-center text-base sm:text-lg md:text-xl font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              {label}
            </Link>
          )}
        </div>

      </div>

      {isOpen && <HireUsModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
