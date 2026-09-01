"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

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
        <AccordionItemComponent key={item.title} item={item} />
      ))}
    </div>
  );
}

function AccordionItemComponent({ item }: { item: AccordionItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  // Set initial height to 0
  useEffect(() => {
    setHeight(0);
  }, []);

  // Update height based on open state
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // First set to actual scrollHeight for animation
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(contentRef.current.scrollHeight);
        // Then animate to 0 after a small delay
        setTimeout(() => setHeight(0), 10);
      }
    }
  }, [isOpen]);

  return (
    <div className={`stack-panel bg-white p-4 transition-colors duration-600 ${isOpen ? "open:bg-[var(--pale-gray)]" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-bold uppercase tracking-wide text-[var(--black)]"
        aria-expanded={isOpen}
      >
        <span>{item.title}</span>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="overflow-hidden transition-all duration-600 ease-in-out"
        style={{ height: height !== null ? `${height}px` : 0 }}
      >
        <div ref={contentRef} className="mt-3 border-t border-[rgba(0,0,0,.18)] pt-3 text-sm leading-relaxed text-[var(--black)]">
          {item.content}
        </div>
      </div>
    </div>
  );
}
