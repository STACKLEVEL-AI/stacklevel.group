"use client";

import { useState } from "react";
import HireUsModal from "./HireUsModal";
import { useTranslations } from "next-intl";

export default function HireCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("pageWebDevelopers");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          cursor-pointer
          w-full h-full border-6 border-blue-600
          bg-blue-600 py-4
          text-2xl font-semibold uppercase tracking-wide text-white
          transition-all duration-200
          hover:bg-white hover:text-blue-600
        "
      >
        {t("textButtonAll")}
      </button>

      {isOpen && <HireUsModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
