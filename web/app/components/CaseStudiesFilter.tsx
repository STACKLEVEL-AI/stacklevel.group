"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export type CaseStudyItem = {
  title: string;
  industry: string;
  category: string;
  problem: string;
  solution: string;
  controls: string[];
  outcome: string;
};

type CaseStudiesFilterProps = {
  items: CaseStudyItem[];
  labels?: {
    all: string;
    problem: string;
    solution: string;
    controls: string;
    outcome: string;
  };
};

export default function CaseStudiesFilter({ items, labels }: CaseStudiesFilterProps) {
  const t = useTranslations("caseStudies.labels");
  const defaultLabels = {
    all: t("all"),
    problem: t("problem"),
    solution: t("solution"),
    controls: t("controls"),
    outcome: t("outcome"),
  };
  const finalLabels = labels || defaultLabels;
  
  const categories = useMemo(() => [finalLabels.all, ...new Set(items.map((item) => item.category))], [items, finalLabels.all]);
  const [activeCategory, setActiveCategory] = useState<string>(finalLabels.all);

  useEffect(() => {
    setActiveCategory(finalLabels.all);
  }, [finalLabels.all]);

  const filteredItems = activeCategory === finalLabels.all ? items : items.filter((item) => item.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-2 text-xs font-bold uppercase tracking-wide transition cursor-pointer ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[rgba(0,0,0,.3)] bg-white text-[var(--black)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4">
        {filteredItems.map((item, index) => (
          <article key={item.title} className={`${index % 2 === 0 ? "stack-panel" : "stack-panel-pale"} p-5 md:p-6`}>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">{item.industry}</p>
            <h3 className="stack-title mt-3 text-2xl text-[var(--black)]">{item.title}</h3>
            <div className="mt-4 grid gap-2 text-sm text-[var(--black)]">
              <p>
                <span className="font-bold uppercase">{finalLabels.problem}:</span> {item.problem}
              </p>
              <p>
                <span className="font-bold uppercase">{finalLabels.solution}:</span> {item.solution}
              </p>
              <div>
                <p className="font-bold uppercase">{finalLabels.controls}:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {item.controls.slice(0, 4).map((control) => (
                    <li key={control}>{control}</li>
                  ))}
                </ul>
              </div>
              <p>
                <span className="font-bold uppercase">{finalLabels.outcome}:</span> {item.outcome}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
