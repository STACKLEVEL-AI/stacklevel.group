import type { Metadata } from "next";
import InnerHero from "../../components/InnerHero";
import ContactForm from "../../components/ContactForm";
import { isRuLocale } from "@/i18n/localeUtils";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const isRu = isRuLocale(params.locale);

  return {
    title: isRu ? "Контакты Stacklevel Group | Уточнение объёма, аудит или демо" : "Contact Stacklevel Group | Scoping, Audit, or Demo",
    description: isRu
      ? "Опишите сценарий использования, ограничения развёртывания и требования к ревью. Мы направим запрос нужной команде."
      : "Share your workflow, deployment constraints, and review requirements. We route your request to the right team.",
  };
}

export default function ContactPage({ params }: Props) {
  const isRu = isRuLocale(params.locale);

  return (
    <div className="relative">
      <InnerHero
        lines={
          isRu
            ? [
                { text: "Контакт" },
                { text: "Уточнение объёма и аудит", accent: true },
                { text: "или демо" },
              ]
            : [
                { text: "Contact" },
                { text: "Scoping Audit", accent: true },
                { text: "Or Demo" },
              ]
        }
        subtitle={
          isRu
            ? "Опишите сценарий использования, ограничения и требования к ревью. Мы направим запрос в нужную команду."
            : "Share your workflow, constraints, and review requirements. We route your request to the right team."
        }
        primaryCta={{ label: isRu ? "Отправить запрос" : "Send request", href: "/contact#contact-form" }}
        secondaryCta={{ label: isRu ? "Написать на email" : "Email us", href: "mailto:v.bakhmat@stacklevel.group", ghost: true }}
        chips={
          isRu
            ? ["Вводная программа", "Звонок уточнения объёма", "Аудитный бриф", "Демонстрация продукта"]
            : ["Program intro", "Scoping call", "Audit brief", "Product demo"]
        }
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper relative grid gap-4 md:grid-cols-2">
          <article className="stack-panel-accent p-5">
            <h2 className="stack-title text-2xl text-white">{isRu ? "Вводная программа" : "Program intro"}</h2>
            <p className="mt-3 text-sm text-white/90">
              {isRu
                ? "Для комитетов и партнерских программ, оценивающих взаимодействие и due diligence материалы."
                : "For committees and partner programs evaluating collaboration and due diligence materials."}
            </p>
          </article>
          <article className="stack-panel-pale p-5">
            <h2 className="stack-title text-2xl text-[var(--black)]">{isRu ? "Уточнение объёма / аудит / демонстрация" : "Scoping / audit / demo"}</h2>
            <p className="mt-3 text-sm text-[var(--black)]">
              {isRu
                ? "Для корпоративных команд, планирующих инженерную работу с ИИ, базовые элементы управления и оценку продукта Century."
                : "For enterprise teams planning AI engineering, governance baseline work, or Century product evaluation."}
            </p>
            <div className="mt-4 space-y-1 text-sm font-semibold text-[var(--black)]">
              <p>
                <a href="mailto:v.bakhmat@stacklevel.group" className="hover:text-[var(--accent)]">
                  v.bakhmat@stacklevel.group
                </a>
              </p>
              <p>
                <a href="tel:+375296682127" className="hover:text-[var(--accent)]">
                  +375 (29) 668-21-27
                </a>
              </p>
              <p>
                <a href="tg://resolve?domain=vitalibakhmat" className="hover:text-[var(--accent)]">
                  Telegram: @vitalibakhmat
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="contact-form" className="relative overflow-hidden stack-section-pale py-12 md:py-16">
        <div className="width-wrapper relative">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
