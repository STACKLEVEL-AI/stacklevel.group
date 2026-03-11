"use client";

import Image from "@/app/components/BaseImage";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type QuoteSlide = {
  id: string;
  name: string;
  position: string;
  quote: string;
  image?: string;
  initials: string;
  frameClassName?: string;
  imageClassName?: string;
};

function SlideVisual({
  image,
  initials,
  alt,
  frameClassName,
  imageClassName,
}: {
  image?: string;
  initials: string;
  alt: string;
  frameClassName?: string;
  imageClassName?: string;
}) {
  if (image) {
    return (
      <>
        <div
          className={`relative min-h-[260px] overflow-hidden bg-white sm:min-h-[320px] md:min-h-[390px] ${
            frameClassName ?? ""
          }`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className={imageClassName ?? "object-cover object-top"}
          />
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
  const t = useTranslations("leadership");
  const tSlide = useTranslations("aboutUs.leadership");

  const slides = useMemo<QuoteSlide[]>(
    () => [
      {
        id: "maxim-garbar",
        name: tSlide("maxim.name"),
        position: tSlide("maxim.position"),
        quote: tSlide("maxim.quote"),
        image: "/images/persons/max.jpg",
        initials: "MG",
        frameClassName: "p-5 sm:p-6 md:p-8",
        imageClassName: "object-contain object-center",
      },
      {
        id: "vitaliy-bakhmat",
        name: tSlide("vitaliy.name"),
        position: tSlide("vitaliy.position"),
        quote: tSlide("vitaliy.quote"),
        image: "/images/persons/vitaliy-bakhmat.jpg",
        initials: "VB",
        imageClassName: "object-cover object-center",
      },
      {
        id: "vadim-vladymtsev",
        name: tSlide("vadim.name"),
        position: tSlide("vadim.position"),
        quote: tSlide("vadim.quote"),
        image: "/images/persons/vadim-vladymtsev.jpg",
        initials: "VV",
        imageClassName: "object-cover object-center",
      },
    ],
    [locale, tSlide]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [locale]);

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

      <div className="relative min-h-[400px] sm:min-h-[480px] md:min-h-[580px]">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={slide.id}
              className={`stack-panel absolute inset-0 border-[rgba(0,0,0,.14)] bg-[#f1f0f3] p-4 transition-all duration-700 ease-out sm:p-5 md:p-8 ${
                isActive ? "z-10 opacity-100 translate-x-0" : "z-0 opacity-0 translate-x-16 pointer-events-none"
              }`}
            >
              <div className="grid gap-5 md:grid-cols-[300px_1fr] lg:gap-8 xl:grid-cols-[380px_1fr]">
                <div>
                  <SlideVisual
                    image={slide.image}
                    initials={slide.initials}
                    alt={slide.name}
                    frameClassName={slide.frameClassName}
                    imageClassName={slide.imageClassName}
                  />
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
          );
        })}
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
