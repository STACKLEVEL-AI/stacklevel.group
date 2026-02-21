import { Link } from "@/i18n/navigation";
import { ReactNode } from "react";

type HeroLine = {
  text: string;
  accent?: boolean;
};

type HeroCta = {
  label: string;
  href: string;
  ghost?: boolean;
};

type InnerHeroProps = {
  lines: HeroLine[];
  subtitle: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  chips?: string[];
};

function HeroCtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const externalLink = href.startsWith("mailto:") || href.startsWith("http");
  if (externalLink) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function InnerHero({ lines, subtitle, primaryCta, secondaryCta, chips = [] }: InnerHeroProps) {
  const visibleChips = chips.slice(0, 4);

  return (
    <section className="relative mb-[65px] grid max-w-full grid-cols-[40%_60%] overflow-hidden max-[1025px]:grid-cols-1">
      <div className="relative z-10 flex min-h-[280px] items-center md:justify-center md:pr-4 lg:pr-8">
        <h1 className="stack-title max-w-[90%] bg-transparent p-6 text-left text-2xl sm:text-3xl md:max-w-none md:p-8 md:text-4xl xl:min-w-[220px]">
          {lines.map((line, index) => (
            <span key={`${line.text}-${index}`} className={`block ${line.accent ? "stack-accent" : "text-[var(--black)]"}`}>
              {line.text}
            </span>
          ))}
        </h1>
      </div>

      <div className="relative col-start-2 min-h-[320px] max-[1025px]:col-auto max-[1025px]:min-h-[420px]">
        <div className="stack-hero-bg absolute inset-0 z-0" />
        <div className="absolute inset-0 z-0 bg-black/40" />

        <div className="relative z-10 flex min-h-[320px] flex-col justify-between px-6 py-8 sm:px-[5vw] md:px-[50px] md:py-[7vw] md:pl-[60px]">
          <p className="m-0 max-w-[680px] text-lg leading-[1.26] text-white sm:text-xl md:text-2xl">{subtitle}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-0 md:gap-4">
            <HeroCtaLink
              href={primaryCta.href}
              className="stack-cta h-[72px] w-full text-lg sm:h-[92px] sm:text-xl md:h-[108px] md:px-6 md:pb-7 xl:h-[132px]"
            >
              <span>{primaryCta.label}</span>
            </HeroCtaLink>

            {secondaryCta ? (
              <HeroCtaLink
                href={secondaryCta.href}
                className={`${secondaryCta.ghost ? "stack-cta-ghost" : "stack-cta"} h-[72px] w-full text-lg sm:h-[92px] sm:text-xl md:h-[108px] md:px-6 md:pb-7 xl:h-[132px]`}
              >
                <span>{secondaryCta.label}</span>
              </HeroCtaLink>
            ) : null}
          </div>

          {visibleChips.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleChips.map((chip) => (
                <span
                  key={chip}
                  className="border border-white/55 bg-white/92 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--black)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
