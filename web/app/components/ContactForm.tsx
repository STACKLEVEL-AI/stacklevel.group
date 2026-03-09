"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isRuLocale } from "@/i18n/localeUtils";

const TOPICS = ["Program intro", "Scoping call", "Audit brief", "Product demo", "Partnership"] as const;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Topic = (typeof TOPICS)[number];
type SubmitStatus = "idle" | "submitting" | "success" | "error";

function getTopicFromQuery(value: string | null) {
  if (!value) return "Scoping call";

  const normalized = value.toLowerCase().trim();
  const found = TOPICS.find((topic) => topic.toLowerCase() === normalized);
  if (found) return found;

  if (normalized.includes("аудит")) return "Audit brief";
  if (normalized.includes("демо")) return "Product demo";
  if (normalized.includes("партнер") || normalized.includes("partner")) return "Partnership";
  if (normalized.includes("program") || normalized.includes("программ")) return "Program intro";

  return "Scoping call";
}

const ruTopicLabels: Record<Topic, string> = {
  "Program intro": "Введение в программу",
  "Scoping call": "Звонок для уточнения объема",
  "Audit brief": "Бриф аудита",
  "Product demo": "Демонстрация продукта",
  Partnership: "Партнерство",
};

export default function ContactForm() {
  const locale = useLocale();
  const isRu = isRuLocale(locale);
  const t = useTranslations("contactForm");
  const searchParams = useSearchParams();
  const initialTopic = useMemo(() => getTopicFromQuery(searchParams.get("topic")), [searchParams]);
  const [topic, setTopic] = useState<Topic>(initialTopic);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTopic(initialTopic);
  }, [initialTopic]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!RECAPTCHA_SITE_KEY) {
      setSubmitStatus("error");
      setErrorMessage(isRu ? "Капча не настроена." : "Captcha is not configured.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const captchaToken = String(formData.get("g-recaptcha-response") ?? "").trim();

    if (!captchaToken) {
      setSubmitStatus("error");
      setErrorMessage(isRu ? "Подтвердите, что вы не робот." : "Please confirm that you are not a robot.");
      return;
    }

    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          name: String(formData.get("name") ?? "").trim(),
          workEmail: String(formData.get("workEmail") ?? "").trim(),
          company: String(formData.get("company") ?? "").trim(),
          topic,
          message: String(formData.get("message") ?? "").trim(),
          captchaToken,
          website: String(formData.get("website") ?? "").trim(),
          startedAt,
        }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSubmitStatus("error");
        setErrorMessage(result?.error ?? (isRu ? "Не удалось отправить сообщение. Попробуйте снова." : "Failed to send message. Please try again."));
        return;
      }

      form.reset();
      const grecaptcha = (window as unknown as { grecaptcha?: { reset?: () => void } }).grecaptcha;
      grecaptcha?.reset?.();
      setTopic("Scoping call");
      setStartedAt(Date.now());
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setErrorMessage(isRu ? "Сетевая ошибка. Попробуйте позже." : "Network error. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stack-panel bg-white p-6 md:p-8">
      {RECAPTCHA_SITE_KEY && isClient ? <Script src="https://www.google.com/recaptcha/api.js" async defer /> : null}

      <h2 className="stack-title text-3xl text-[var(--black)]">{t("title")}</h2>
      <p className="mt-2 text-sm text-[var(--black)]">{t("subtitle")}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("name")}
          <input required name="name" type="text" className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]" />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("workEmail")}
          <input required name="workEmail" type="email" className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]" />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("company")}
          <input required name="company" type="text" className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]" />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wide text-[var(--black)]">
          {t("topic")}
          <select required name="topic" value={topic} onChange={(event) => setTopic(event.target.value as Topic)} className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]">
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
        <textarea required name="message" rows={5} className="border border-[rgba(0,0,0,.32)] bg-white px-3 py-2 text-sm font-normal text-[var(--black)] outline-none focus:border-[var(--accent)]" />
      </label>

      <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" aria-hidden="true" />
      <input type="hidden" name="startedAt" value={String(startedAt)} />

      <div className="mt-4" suppressHydrationWarning>
        {RECAPTCHA_SITE_KEY ? (
          isClient ? <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} /> : <div className="h-[78px]" />
        ) : (
          <p className="text-sm text-red-700">{isRu ? "Капча недоступна. Используйте email ниже." : "Captcha unavailable. Use the email option below."}</p>
        )}
      </div>

      {submitStatus === "success" ? <p className="mt-3 text-sm text-emerald-700">{isRu ? "Сообщение отправлено. Мы скоро свяжемся с вами." : "Message sent. We will contact you shortly."}</p> : null}
      {submitStatus === "error" ? <p className="mt-3 text-sm text-red-700">{errorMessage}</p> : null}

      <p className="mt-3 text-xs text-[var(--black)]/80">
        {isRu ? "Укажите целевой рабочий процесс, ограничения развертывания (локальное/гибридное) и требования к ревью." : "Include target workflow, deployment constraints (on-prem/hybrid), and review requirements."}
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <button type="submit" disabled={submitStatus === "submitting" || !RECAPTCHA_SITE_KEY} className="stack-cta cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-70 md:text-2xl">
          {submitStatus === "submitting" ? (isRu ? "Отправка..." : "Sending...") : t("send")}
        </button>
        <a href="mailto:v.bakhmat@stacklevel.group" className="stack-cta-ghost justify-center text-xl md:text-2xl">
          {t("emailUs")}
        </a>
      </div>
    </form>
  );
}
