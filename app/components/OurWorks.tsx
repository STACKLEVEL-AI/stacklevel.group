import { Link } from "@/i18n/navigation";

const ndaCases = [
  {
    title: "Financial Services Assistant",
    industry: "Financial services (NDA)",
    focus: "Permission-aware retrieval, citations, and audit logs.",
    tone: "stack-panel-accent",
  },
  {
    title: "Public Operations Knowledge Flow",
    industry: "Public sector operations (NDA)",
    focus: "Traceability and controlled document-grounded responses.",
    tone: "stack-panel-dark",
  },
  {
    title: "Industrial Troubleshooting Copilot",
    industry: "Industrial and energy operations (NDA)",
    focus: "Evidence-backed workflows with evaluation gates.",
    tone: "stack-panel-pale",
  },
] as const;

export default function OurWorks() {
  return (
    <section id="our-works" className="relative overflow-hidden bg-[#f4f4f6] py-12 md:py-16">
      <div className="width-wrapper relative">
        <h2 className="stack-grid-title max-w-4xl text-[var(--black)]">
          NDA <span className="stack-accent">Case</span> Studies
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--black)]/85">
          Industry outcome cases focused on engineering decisions, governance controls, and audit readiness.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ndaCases.map((item) => (
            <article key={item.title} className={`${item.tone} p-5`}>
              <p className="text-xs font-bold uppercase tracking-wide opacity-90">{item.industry}</p>
              <h3 className="stack-title mt-3 text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-90">{item.focus}</p>
            </article>
          ))}
        </div>

        <Link href="/case-studies" className="stack-cta mt-8 w-full max-w-[360px] text-xl md:text-2xl">
          View full case format
        </Link>
      </div>
    </section>
  );
}
