"use client";

import ModalPortal from "./ModalPortal";
import { useTranslations } from "next-intl";

type HireUsModalProps = {
  onClose: () => void;
};

export default function HireUsModal({ onClose }: HireUsModalProps) {
  const t = useTranslations("contactForm");

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-white p-6 md:p-10 shadow-xl mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-10 flex items-start justify-between">
            <h2 className="text-2xl font-bold text-black">{t("title")}</h2>

            <button
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer text-2xl font-light text-blue-600 hover:opacity-70"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form className="space-y-10">
            <div>
              <label className="block text-sm">{t("name")}</label>
              <input className="mt-3 w-full border-b border-gray-400 py-2 outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block text-sm">{t("workEmail")}</label>
              <input className="mt-3 w-full border-b border-gray-400 py-2 outline-none focus:border-blue-600" />
            </div>

            <div>
              <label className="block text-sm">{t("shortMessage")}</label>
              <textarea
                className="mt-3 w-full resize-none border-b border-gray-400 outline-none focus:border-blue-600"
              />
            </div>

            <div className="pt-6 text-center">
              <button className="cursor-pointer bg-blue-600 px-20 py-4 text-sm font-semibold uppercase tracking-wide text-white hover:bg-blue-700">
                {t("send")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}
