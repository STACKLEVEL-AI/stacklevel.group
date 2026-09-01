"use client";

import Image from "@/app/components/BaseImage";

const ROW1 = [
  { slug: "hvmn", alt: "HVMN" },
  { slug: "unicredit_en", alt: "UniCredit Bank" },
  { slug: "jammtravel", alt: "jamm.travel" },
  { slug: "viasports", alt: "VIASPORTS" },
  { slug: "atol", alt: "ATON" },
  { slug: "tdberlin", alt: "trommsdorff + druer" },
] as const;

const ROW2 = [] as const;

const LOGOS = [...ROW1, ...ROW2] as const;
const TOP_ROW = LOGOS.slice(0, 6);
const BOTTOM_ROW = LOGOS.slice(6);


type ClientsProps = {
  title?: string;
  disclaimer?: string;
  className?: string;
};

function LogoCell({ slug, alt }: { slug: string; alt: string }) {
  return (
    <div className="flex min-h-[72px] w-[130px] shrink-0 items-center justify-center sm:min-h-[82px] sm:w-[145px] md:min-h-[94px] md:w-[160px]">
      <Image
        src={`/images/companies/${slug}.svg`}
        alt={alt}
        width={170}
        height={90}
        className="stack-logo-muted max-h-[70px] w-auto max-w-[120px] object-contain sm:max-h-[82px] sm:max-w-[140px] md:max-h-[90px] md:max-w-[170px]"
      />
    </div>
  );
}

export default function Clients({
  title,
  disclaimer,
  className = "",
}: ClientsProps) {
  return (
    <section className={`relative overflow-hidden ${className}`} aria-label="Clients">
      <div className="width-wrapper relative py-12 md:py-14">
        <div className="stack-panel bg-white p-6 md:p-8">
          <h2 className="stack-grid-title max-w-4xl text-[var(--black)]">
            {title || "Trusted since 2018"}
          </h2>

          <div className="mt-8 border-y border-[rgba(0,0,0,.12)] py-5">
            {/* Top row - infinite scroll */}
            <div className="relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:z-10 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:z-10 after:bg-gradient-to-l after:from-white after:to-transparent">
              <div className="flex animate-infinite-scroll gap-x-4 md:gap-x-8">
                {[...TOP_ROW, ...TOP_ROW, ...TOP_ROW].map(({ slug, alt }, index) => (
                  <LogoCell key={`${slug}-${index}`} slug={slug} alt={alt} />
                ))}
              </div>
            </div>
            
            {/* Bottom row - infinite scroll (reverse direction) */}
            {BOTTOM_ROW.length > 0 && (
              <div className="mt-1 relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:z-10 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:z-10 after:bg-gradient-to-l after:from-white after:to-transparent">
                <div className="flex animate-infinite-scroll-reverse gap-x-4 md:gap-x-8">
                  {[...BOTTOM_ROW, ...BOTTOM_ROW, ...BOTTOM_ROW].map(({ slug, alt }, index) => (
                    <LogoCell key={`${slug}-${index}`} slug={slug} alt={alt} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[var(--black)]/75">
            {disclaimer || "Selected clients since 2018. Logos are trademarks of their respective owners and do not imply endorsement."}
          </p>
        </div>
      </div>
    </section>
  );
}
