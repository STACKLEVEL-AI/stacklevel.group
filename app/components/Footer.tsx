"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { isRuLocale } from "@/i18n/localeUtils";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const isRu = isRuLocale(locale);

  return (
    <footer className="mt-12 border-t border-[rgba(0,0,0,.06)] bg-white">
      <div className="width-wrapper py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" aria-label="Stacklevel Group" className="inline-block">
              <Image src="/logo.svg" alt="STACKLEVEL GROUP" width={220} height={44} />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-[var(--black)]">{t("tagline")}</p>
            <div className="mt-4 space-y-1 text-sm font-semibold text-[var(--black)]">
              <p>
                <a href="mailto:info@stacklevel.group" className="hover:text-[var(--accent)]">
                  info@stacklevel.group
                </a>
              </p>
              <p>
                <a href="tel:+375296682127" className="hover:text-[var(--accent)]">
                  +375 (29) 668-21-27
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{t("navigate")}</p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold uppercase text-[var(--black)]">
              <Link href="/services">{t("services")}</Link>
              <Link href="/audit-compliance">{t("audit")}</Link>
              <Link href="/products">{t("products")}</Link>
              <Link href="/case-studies">{t("cases")}</Link>
              <Link href="/blog">{t("blog")}</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{t("actions")}</p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold uppercase text-[var(--black)]">
              <Link href="/resources">{t("resources")}</Link>
              <Link href="/company">{t("company")}</Link>
              <Link href="/contact">{t("contact")}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--accent)]">
        <div className="width-wrapper py-5">
          <p className="text-xs leading-relaxed text-white">{t("complianceLine")}</p>
        </div>
      </div>
    </footer>
  );
}
