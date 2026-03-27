"use client";

import { Suspense } from "react";
import ContactForm from "./ContactForm";
import ModalPortal from "./ModalPortal";

type HireUsModalProps = {
  onClose: () => void;
};

export default function HireUsModal({ onClose }: HireUsModalProps) {
  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <div
          className="relative mx-4 max-h-[90vh] w-full max-w-6xl overflow-y-auto bg-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center border border-[rgba(0,0,0,.18)] bg-white text-3xl leading-none text-[var(--accent)] shadow-sm transition-opacity hover:opacity-70"
          >
            ×
          </button>

          <Suspense fallback={<div className="stack-panel bg-white p-6 md:p-8">Loading form…</div>}>
            <ContactForm defaultTopic="Scoping call" />
          </Suspense>
        </div>
      </div>
    </ModalPortal>
  );
}
