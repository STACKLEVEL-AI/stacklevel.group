"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isRuLocale } from "@/i18n/localeUtils";

const TOPICS = ["Program intro", "Scoping call", "Audit brief", "Product demo", "Partnership"] as const;

type Topic = (typeof TOPICS)[number];

function getTopicFromQuery(value: string | null) {
  if (!value) {
    return "Scoping call" as Topic;
  }

  const normalized = value.toLowerCase().trim();
  const found = TOPICS.find((topic) => topic.toLowerCase() === normalized);
  if (found) {
    return found;
  }

  if (normalized.includes("аудит")) return "Audit brief";
  if (normalized.includes("демо")) return "Product demo";
  if (normalized.includes("партнер") || normalized.includes("partner")) return "Partnership";
  if (normalized.includes("program") || normalized.includes("программ")) return "Program intro";

  return "Scoping call";
}

const ruTopicLabels: Record<Topic, string> = {
  "Program intro": "Введение в программу",
  "Scoping call": "Звонок для уточнения объёма",
  "Audit brief": "Бриф аудита",
  "Product demo": "Демонстрация продукта",
  Partnership: "Партнёрство",
};

export default function ContactForm() {
  const locale = useLocale();
  const isRu = isRuLocale(locale);
  const t = useTranslations("contactForm");
  const searchParams = useSearchParams();
  const initialTopic = useMemo(() => getTopicFromQuery(searchParams.get("topic")), [searchParams]);
  const [topic, setTopic] = useState<Topic>(initialTopic);

  useEffect(() => {
    setTopic(initialTopic);
  }, [initialTopic]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = `${topic} | Stacklevel request`;

    const body = [
      `${t("name")} : ${String(formData.get("name") ?? "").trim()}`,
      `${t("workEmail")} : ${String(formData.get("workEmail") ?? "").trim()}`,
      `${t("company")} : ${String(formData.get("company") ?? "").trim()}`,
      `${t("topic")} : ${topic}`,
      "",
      `${t("shortMessage")} :`,
      `${String(formData.get("message") ?? "").trim()}`,
    ].join("\n");

    const mailtoLink = `mailto:v.bakhmat@stacklevel.group?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <form onSubmit={handleSubmit} className="stack-panel bg-white p-6 md:p-8">
      <h2 className="stack-title text-3xl text-[var(--black)]">{t("title")}</h2>
      <p className="mt-2 text-sm text-[var(--black)]">{t("subtitle")}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("name")}
          <input
            required
            name="name"
            type="text"
            className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("workEmail")}
          <input
            required
            name="workEmail"
            type="email"
            className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("company")}
          <input
            required
            name="company"
            type="text"
            className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("topic")}
          <select
            required
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value as Topic)}
            className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]"
          >
            {TOPICS.map((topicOption) => (
              <option key={topicOption} value={topicOption}>
                {isRu ? ruTopicLabels[topicOption] : topicOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
        {t("shortMessage")}
        <textarea
          required
          name="message"
          rows={5}
          className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]"
        />
      </label>

      <p className="mt-3 text-xs text-[var(--black)]/80">
        {isRu
          ? "Укажите целевой рабочий процесс, ограничения развёртывания (локальное/гибридное) и требования к ревью."
          : "Include target workflow, deployment constraints (on-prem/hybrid), and review requirements."}
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <button type="submit" className="stack-cta cursor-pointer text-xl md:text-2xl">
          {t("send")}
        </button>
        <a href="mailto:v.bakhmat@stacklevel.group" className="stack-cta-ghost justify-center text-xl md:text-2xl">
          {t("emailUs")}
        </a>
      </div>
    </form>
  );
}
