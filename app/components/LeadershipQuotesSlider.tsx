"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isRuLocale } from "@/i18n/localeUtils";

type QuoteSlide = {
  id: string;
  name: string;
  position: string;
  quote: string;
  image?: string;
  initials: string;
};

function SlideVisual({ image, initials, alt }: { image?: string; initials: string; alt: string }) {
  if (image) {
    return (
      <>
        <div className="relative min-h-[260px] overflow-hidden bg-white sm:min-h-[320px] md:min-h-[390px]">
          <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover object-top" />
        </div>
        <div className="h-[6px] bg-[var(--accent)]" />
      </>
    );
  }

  return (
    <>
      <div className="relative flex min-h-[260px] items-center justify-center border border-[rgba(0,0,0,.14)] bg-white sm:min-h-[320px] md:min-h-[390px]">
        <span className="stack-title text-[clamp(76px,8vw,140px)] leading-none text-[var(--accent)]/26">{initials}</span>
      </div>
      <div className="h-[6px] bg-[var(--accent)]" />
    </>
  );
}

export default function LeadershipQuotesSlider() {
  const locale = useLocale();
  const isRu = isRuLocale(locale);
  const t = useTranslations("leadership");

  const slides = useMemo<QuoteSlide[]>(
    () => [
      {
        id: "maxim-garbar",
        name: "MAXIM GARBAR",
        position: isRu ? "CEO STACKLEVEL GROUP" : "CEO STACKLEVEL GROUP",
        quote: isRu
          ? "Мы предоставляем инновационные услуги разработки и консалтинга, чтобы бизнес наших клиентов рос и становился лидером рынка. Успех клиента — это наш успех."
          : "We provide innovative developing and consulting services to make businesses of our clients grow and become market leaders. The client's success is our success.",
        image: "/images/persons/max.jpg",
        initials: "MG",
      },
      {
        id: "head-ai-engineering",
        name: "TBD",
        position: isRu ? "HEAD OF AI ENGINEERING" : "HEAD OF AI ENGINEERING",
        quote: isRu
          ? "Мы превращаем AI-инициативы в производственные процессы: интеграции, ограничения деплоя и оптимизацию производительности/стоимости."
          : "We turn AI initiatives into production workflows: integrations, deployment constraints, and performance/cost optimization.",
        initials: "AE",
      },
      {
        id: "head-ai-audit",
        name: "TBD",
        position: isRu ? "HEAD OF AI AUDIT & COMPLIANCE" : "HEAD OF AI AUDIT & COMPLIANCE",
        quote: isRu
          ? "Мы переводим требования безопасности и регуляторов в исполнимые контролы, аудит и governance-практики."
          : "We translate regulatory and security requirements into enforceable controls, audits, and governance playbooks.",
        initials: "AC",
      },
    ],
    [isRu]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [isRu]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative">
      <div className="mb-3 flex justify-end gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label={t("previous")}
          className="inline-flex h-12 w-12 items-center justify-center border border-[var(--accent)] bg-white text-2xl leading-none text-[var(--accent)] shadow-[0_4px_0_0_var(--accent)] transition hover:bg-[var(--accent)] hover:text-white sm:h-14 sm:w-14 sm:text-3xl"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label={t("next")}
          className="inline-flex h-12 w-12 items-center justify-center border border-[var(--accent)] bg-white text-2xl leading-none text-[var(--accent)] shadow-[0_4px_0_0_var(--accent)] transition hover:bg-[var(--accent)] hover:text-white sm:h-14 sm:w-14 sm:text-3xl"
        >
          &gt;
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className="stack-panel w-full shrink-0 border-[rgba(0,0,0,.14)] bg-[#f1f0f3] p-4 sm:p-5 md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-[300px_1fr] lg:gap-8 xl:grid-cols-[380px_1fr]">
                <div>
                  <SlideVisual image={slide.image} initials={slide.initials} alt={slide.name} />
                </div>

                <div className="relative flex min-h-[260px] flex-col justify-between sm:min-h-[320px] md:min-h-[390px]">
                  <div className="pointer-events-none absolute right-0 top-0 w-[52px] opacity-95 sm:w-[64px] md:w-[86px]">
                    <Image src="/images/_quotes.svg" alt="" width={146} height={111} className="h-auto w-full" />
                  </div>

                  <div className="relative pr-10 sm:pr-14 md:pr-24">
                    <h2 className="stack-title text-[clamp(30px,2.8vw,56px)] text-[var(--accent)]">{slide.name}</h2>
                    <p className="mt-5 max-w-5xl text-[clamp(19px,1.5vw,36px)] leading-[1.09] text-[var(--black)]">{slide.quote}</p>
                  </div>

                  <div className="relative mt-6">
                    <p className="stack-title text-[clamp(20px,1.3vw,34px)] text-[var(--accent)]">{slide.position}</p>
                    <div className="mt-6 h-[4px] w-full bg-[var(--accent)]" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${t("show")} ${slide.position}`}
              className={`h-2.5 transition-all ${active ? "w-10 bg-[var(--accent)]" : "w-6 bg-[var(--brand-gray)]"}`}
            />
          );
        })}
      </div>
    </section>
  );
}
