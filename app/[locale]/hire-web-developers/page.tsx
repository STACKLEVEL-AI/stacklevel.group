import HireDevelopersHero from "../../components/HireDevelopersHero";
import DevelopersFilter from "../../components/DevelopersFilter";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Hire Web Developers | STACKLEVEL",
  description: "We provide you with developers and dedicated teams.",
};

export default function HireWebDevelopersPage() {
  const t = useTranslations("pageWebDevelopers");

  return (
    <section className="w-full mb-10">
      <HireDevelopersHero />
      <div className="w-full bg-white py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1476px] px-4 sm:px-6 md:px-8 lg:px-10">
          <h2
            className="
        font-bold
        uppercase
        tracking-wide
        text-black
        
        text-lg
        sm:text-xl
        md:text-2xl
        lg:text-3xl
        xl:text-[32px]
      "
          >
            {t("title")}
          </h2>
        </div>
      </div>
      <div className="relative w-full pb-24">
        <div className="absolute left-0 top-0 h-full w-[280px] dots-pattern" />
        <div className="absolute bottom-0 left-[282px] right-0 h-[245px] w-[20%] dots-pattern" />
        <DevelopersFilter />
      </div>
    </section>
  );
}
