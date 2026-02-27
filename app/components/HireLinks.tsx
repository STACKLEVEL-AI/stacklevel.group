import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HireLinks() {
  const t = useTranslations("hireLinks");

  return (
    <div className="mx-auto mt-16 flex w-full max-w-[900px] flex-col gap-4 px-4 sm:flex-row sm:gap-6">

      <Link
        href="/hire-web-developers"
        className="w-full border-[4px] sm:border-[6px] border-blue-600 bg-blue-600 px-6 py-6 sm:px-8 sm:py-8 text-left text-lg sm:text-xl md:text-[24px] font-semibold uppercase leading-tight text-white transition-all duration-500 hover:bg-white hover:text-blue-600"
      >
        {t("hireDeveloper")}
      </Link>

      <Link
        href="/hire-dedicated-team"
        className="w-full border-[4px] sm:border-[6px] border-blue-600 bg-blue-600 px-6 py-6 sm:px-8 sm:py-8 text-left text-lg sm:text-xl md:text-[24px] font-semibold uppercase leading-tight text-white transition-all duration-500 hover:bg-white hover:text-blue-600"
      >
        {t("hireDedicated")}
      </Link>

    </div>
  );
}

