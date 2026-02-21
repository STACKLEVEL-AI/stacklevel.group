import { ReactNode } from "react";

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export default function Accordion({ items, className = "" }: AccordionProps) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {items.map((item) => (
        <details key={item.title} className="stack-panel bg-white p-4 open:bg-[var(--pale-gray)]">
          <summary className="cursor-pointer list-none text-sm font-bold uppercase tracking-wide text-[var(--black)]">
            {item.title}
          </summary>
          <div className="mt-3 border-t border-[rgba(0,0,0,.18)] pt-3 text-sm leading-relaxed text-[var(--black)]">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
