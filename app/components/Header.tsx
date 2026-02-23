"use client";

import Image from "@/app/components/BaseImage";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";

const navLinks = [
  { href: "/services", key: "services" },
  { href: "/audit-compliance", key: "audit" },
  { href: "/products", key: "products" },
  { href: "/case-studies", key: "caseStudies" },
  { href: "/resources", key: "resources" },
  { href: "/blog", key: "blog" },
  { href: "/company", key: "company" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("header");
  const ruHref = pathname || "/";
  const enHref = pathname === "/" ? "/en" : `/en${pathname}`;

  const localeLinkClass = (loc: string) =>
    `text-xs font-bold uppercase tracking-wide ${locale === loc ? "text-[var(--accent)]" : "text-[var(--black)] hover:text-[var(--accent)]"}`;
  const openNavLabel = t("openNav");
  const closeNavLabel = t("closeNav");

  return (
    <header className="relative border-b border-[rgba(0,0,0,.12)] bg-white">
      <div className="width-wrapper relative flex min-h-[84px] items-center justify-between py-3">
        <Link href="/" aria-label="Stacklevel Group" className="shrink-0">
          <Image src="/logo.svg" alt="STACKLEVEL GROUP" width={318} height={60} className="h-auto w-[190px] sm:w-[230px] xl:w-[260px]" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold uppercase tracking-wide text-[var(--black)] transition hover:text-[var(--accent)]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center gap-2">
            <NextLink href={enHref} className={localeLinkClass("en")}>
              EN
            </NextLink>
            <NextLink href={ruHref} className={localeLinkClass("ru")} hrefLang="ru">
              RU
            </NextLink>
          </div>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <div className="flex items-center gap-2">
            <NextLink href={enHref} className={localeLinkClass("en")}>
              EN
            </NextLink>
            <NextLink href={ruHref} className={localeLinkClass("ru")} hrefLang="ru">
              RU
            </NextLink>
          </div>
          <button type="button" onClick={() => setMobileOpen(true)} aria-label={openNavLabel}>
            <Image src="/images/burger.svg" alt="" width={24} height={18} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[220] bg-white xl:hidden">
          <div className="width-wrapper relative flex min-h-[88px] items-center justify-between py-3">
            <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Stacklevel Group">
              <Image src="/logo.svg" alt="STACKLEVEL GROUP" width={260} height={50} className="h-auto w-[185px]" />
            </Link>
            <button type="button" onClick={() => setMobileOpen(false)} aria-label={closeNavLabel}>
              <Image src="/images/modal-close.svg" alt="" width={36} height={36} />
            </button>
          </div>

          <div className="width-wrapper relative mt-4 flex flex-col gap-2 pb-10">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b-2 border-[var(--black)] py-3 text-2xl font-bold uppercase tracking-wide text-[var(--black)]"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
