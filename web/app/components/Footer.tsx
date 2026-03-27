"use client";

import Image from "@/app/components/BaseImage";
import { CONTACTS } from "@/app/lib/entities";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

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
                <a href={`mailto:${CONTACTS.salesEmail}`} className="hover:text-[var(--accent)]">
                  {CONTACTS.salesEmail}
                </a>
              </p>
              <p>
                <a href={`tel:${CONTACTS.phoneE164}`} className="hover:text-[var(--accent)]">
                  {CONTACTS.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{t("navigate")}</p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold uppercase text-[var(--black)]">
              <Link href="/services" className="hover:text-[var(--accent)] transition-colors">{t("services")}</Link>
              <Link href="/audit-compliance" className="hover:text-[var(--accent)] transition-colors">{t("audit")}</Link>
              <Link href="/bank" className="hover:text-[var(--accent)] transition-colors">{t("bank")}</Link>
              <Link href="/products" className="hover:text-[var(--accent)] transition-colors">{t("products")}</Link>
              <Link href="/case-studies" className="hover:text-[var(--accent)] transition-colors">{t("cases")}</Link>
              <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">{t("blog")}</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{t("actions")}</p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold uppercase text-[var(--black)]">
              <Link href="/resources" className="hover:text-[var(--accent)] transition-colors">{t("resources")}</Link>
              <Link href="/company" className="hover:text-[var(--accent)] transition-colors">{t("company")}</Link>
              <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">{t("contact")}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="stack-bank-dot-dark">
        <div className="width-wrapper py-5">
          <p className="text-xs leading-relaxed text-white/78">{t("complianceLine")}</p>
        </div>
      </div>
    </footer>
  );
}
