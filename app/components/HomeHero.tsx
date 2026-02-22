"use client";

import Image from "@/app/components/BaseImage";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isRuLocale } from "@/i18n/localeUtils";
import { assetPath } from "@/app/lib/assets";

export default function HomeHero() {
  const locale = useLocale();
  const isRu = isRuLocale(locale);
  const t = useTranslations("pages.home");

  return (
    <section
      id="hero"
      className="
    relative
    mb-[65px]
    grid
    max-w-full
    grid-cols-[40%_60%]
    overflow-hidden
    min-h-[560px]
    xl:min-h-[640px]
    2xl:min-h-[720px]

    max-[1025px]:grid-cols-1
    max-[1025px]:min-h-0
  "
    >
      <div className="relative z-10 flex min-h-[280px] items-center justify-center md:min-h-0 md:justify-center md:pr-4 lg:pr-8">
        <h1 className="stack-title max-w-[90%] bg-transparent p-6 text-center text-black text-2xl sm:text-3xl md:max-w-none md:p-8 md:text-left md:text-4xl xl:min-w-[220px]">
          <span className="block">AI</span>
          <span className="block">GOVERNANCE</span>
          <span className="stack-accent block">COMPLIANCE</span>
          <span className="block">ENGINEERING</span>
        </h1>
      </div>

      <div className="relative col-start-2 min-h-[320px] overflow-hidden max-[1025px]:col-auto max-[1025px]:min-h-[420px]">
        <div
          className="stack-hero-bg absolute inset-0 z-0"
          style={{ backgroundImage: `url(${assetPath("/images/hero-bg.png")})` }}
        />
        <div className="absolute inset-0 z-0 bg-black/30" />

        <Image
          src="/images/logo_icon_white.svg"
          alt=""
          width={200}
          height={160}
          className="pointer-events-none absolute bottom-5 right-4 h-auto w-[96px] opacity-90 sm:w-[120px] md:right-6 md:w-[140px]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[320px] flex-col justify-between px-6 py-8 
        sm:px-[5vw] md:px-[50px] md:py-[7vw] md:pl-[60px]">

          <h2 className="m-0 max-w-[560px] text-white 
          text-2xl sm:text-3xl md:max-w-[520px] md:text-4xl">
            {t("subtitle")}
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-0 md:gap-4">
            <Link
              href="/contact?topic=Scoping%20call"
              className="stack-cta h-[72px] w-full text-lg sm:h-[92px] sm:text-xl md:h-[108px] md:px-6 md:pb-7 xl:h-[132px]"
            >
              <span>{t("ctaFind")}</span>
            </Link>

            <Link
              href="/products"
              className="stack-cta-ghost flex h-[72px] w-full items-end px-5 py-4 text-lg font-bold uppercase sm:h-[92px] sm:text-xl md:h-[108px] md:px-6 md:pb-7 xl:h-[132px]"
            >
              <span>{t("ctaHire")}</span>
            </Link>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              {"On-prem / air-gapped / hybrid"}
            </span>
            <span className="border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              {"RAG + citations + audit"}
            </span>
            <span className="border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              {"IAM-aware responses"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
