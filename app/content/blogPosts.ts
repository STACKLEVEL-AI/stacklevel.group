export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO-like date: YYYY-MM-DD
  category: "Engineering" | "Audit" | "Compliance" | "Product";
  readingMinutes: number;
  sections: BlogSection[];
};

// Code-first news feed:
// 1) add a new object here
// 2) use unique "slug"
// 3) keep "publishedAt" in YYYY-MM-DD
export const blogPosts: BlogPost[] = [
  {
    slug: "ai-governance-baseline-for-enterprise-committees",
    title: "AI Governance Baseline for Enterprise Committees",
    excerpt:
      "A practical baseline for steering committees that need clear controls before approving AI rollout at scale.",
    publishedAt: "2026-02-21",
    category: "Compliance",
    readingMinutes: 4,
    sections: [
      {
        heading: "AI Governance Baseline for Enterprise Committees",
        paragraphs: [
          "Enterprise AI governance stalls when it’s framed as abstract policy. Committees move faster when governance is packaged as operational controls: named owners, observable evidence, and decision gates that map directly to how the system behaves in production.",
          "In regulated environments—especially when you deploy LLM services in-perimeter (air-gapped/on-prem) and run RAG over internal knowledge—governance has to look like engineering: access boundaries, auditability, traceability, evaluation, and release control.",
        ],
      },
      {
        heading: "The “baseline” is a one-page review pack",
        paragraphs: [
          "A practical baseline connects three things in one short artifact:",
        ],
        bullets: [
          "Ownership — who is accountable for the model, the data, and the release decision.",
          "Evidence format — what proof exists and where it lives (logs, test reports, model cards, tickets).",
          "Decision gates — pass/fail criteria before each release.",
        ],
      },
      {
        paragraphs: [
          "If a committee can’t answer “who owns it?”, “how do we prove it?”, and “what blocks release?” in under 15 minutes, you don’t have a baseline—you have a slide deck.",
        ],
      },
      {
        heading: "Baseline controls committees should ask for first",
      },
      {
        heading: "1) Named owners (model, data, release)",
        paragraphs: [
          "Assign explicit owners for:",
        ],
        bullets: [
          "Model owner: model selection, safety posture, evaluation strategy, rollback readiness.",
          "Data owner: corpus eligibility, retention, PII handling, permissions alignment.",
          "Release owner: go/no-go authority, change control, incident ownership.",
        ],
      },
      {
        paragraphs: [
          "This aligns with how production AI platforms are run: accountability must be explicit and auditable.",
        ],
      },
      {
        heading: "2) Access boundaries aligned with IAM (search + answer)",
        paragraphs: [
          "RAG failures in enterprise are often permission failures disguised as “LLM mistakes.”",
          "Baseline requirement:",
        ],
        bullets: [
          "Retrieval must enforce IAM/RBAC boundaries consistently across indexing, search, and answer generation.",
          "The assistant should never synthesize an answer from content the user cannot access.",
          "Evidence should include permission tests and boundary checks (role matrix → expected retrieval behavior).",
        ],
      },
      {
        paragraphs: [
          "Designing secure LLM perimeters with RBAC and audit is foundational for controlled deployment.",
        ],
      },
      {
        heading: "3) Audit logs + traceability preserved for review cycles",
        paragraphs: [
          "Committees don’t need “more dashboards.” They need reviewable evidence:",
        ],
        bullets: [
          "Request/response logs with metadata (user role, retrieval scope, sources used, policy decisions).",
          "Trace IDs that link: prompt → retrieval → citations → output → evaluation snapshot.",
          "Retention aligned to compliance cycles (monthly/quarterly reviews).",
        ],
      },
      {
        paragraphs: [
          "Operationally, this is the difference between “trust us” and “here is the chain of custody.”",
        ],
      },
      {
        heading: "4) Evaluation gates with pass/fail criteria before every release",
        paragraphs: [
          "Every release needs a gate with measurable criteria:",
        ],
        bullets: [
          "Safety: prompt-injection resilience, data leakage checks, policy refusal correctness.",
          "Quality: answer accuracy on core workflows, citation coverage, hallucination rate.",
          "Operations: latency/SLA budgets, failure modes, rollback playbook, drift monitors.",
        ],
      },
      {
        paragraphs: [
          "Production-grade RAG is about measurable outcomes (quality, SLA, ROI/TCO) and resilient operations (observability, drift control, rollbacks).",
        ],
      },
      {
        heading: "A minimal baseline template (what the committee reviews)",
        bullets: [
          "System scope: intended use, excluded use, data classes handled.",
          "Owners: model/data/release names + escalation path.",
          "IAM map: roles → allowed data domains → enforced retrieval boundaries.",
          "Evidence list: where logs, eval reports, and incident playbooks live.",
          "Gate criteria: pass/fail for security, quality, operations.",
          "Release record: what changed, why, and how to roll back.",
        ],
      },
      {
        paragraphs: [
          "If you implement only one governance artifact this quarter, make it this baseline. It reduces meeting time, clarifies accountability, and turns governance into a repeatable release process.",
        ],
      },
    ],
  },
  {
    slug: "governed-rag-rollout-checklist",
    title: "Governed RAG Rollout Checklist for Enterprise Teams",
    excerpt:
      "A practical checklist to move from pilot to production with citations, IAM boundaries, and review-ready logs.",
    publishedAt: "2026-02-20",
    category: "Engineering",
    readingMinutes: 5,
    sections: [
      {
        heading: "Governed RAG Rollout Checklist for Enterprise Teams",
        paragraphs: [
          "Most pilot assistants don’t reach production for one predictable reason: governance is added too late. Once security and compliance reviews start blocking, the team discovers they built a demo—not a system.",
          "In enterprise RAG, production readiness is inseparable from governance: citations, IAM boundaries, audit logs, evaluation gates, and operational controls are part of the architecture—not a post-launch ticket.",
        ],
      },
      {
        heading: "Why pilots get stuck",
        bullets: [
          "Controls are treated as “Phase 2.”",
          "Access boundaries aren’t enforced end-to-end.",
          "Answers ship without verifiable citations.",
          "Logging is insufficient for audits and incident response.",
          "No acceptance criteria exist, so reviews become subjective.",
        ],
      },
      {
        heading: "Production checklist (build it in this order)",
      },
      {
        heading: "1) Define ownership + acceptance criteria before implementation",
        paragraphs: [
          "Before a line of code:",
        ],
        bullets: [
          "Name owners: model, data/corpus, release.",
          "Define “Definition of Done” for: citation coverage, permission correctness, auditability, quality metrics on top workflows, rollback readiness.",
        ],
      },
      {
        paragraphs: [
          "This is the fastest way to keep governance from becoming a late-stage blocker.",
        ],
      },
      {
        heading: "2) Implement citations first (verifiability by default)",
        paragraphs: [
          "A production assistant must be able to prove where the answer came from:",
        ],
        bullets: [
          "Retrieval returns source chunks with stable IDs.",
          "Response includes citations/excerpts (document/table fragments).",
          "Add a “no source → no claim” rule for knowledge answers.",
        ],
      },
      {
        paragraphs: [
          "This is a core pattern of enterprise knowledge systems: hybrid retrieval + answers strictly based on sources.",
        ],
      },
      {
        heading: "3) Map IAM boundaries to retrieval and answer behavior",
        paragraphs: [
          "Do not “bolt on” permissions:",
        ],
        bullets: [
          "Align corpora, indices, and query routing to IAM groups/roles.",
          "Test role-based retrieval explicitly (positive + negative tests).",
          "Ensure citations never reference inaccessible sources.",
        ],
      },
      {
        paragraphs: [
          "Secure perimeters for LLM services are designed around RBAC and audit.",
        ],
      },
      {
        heading: "4) Persist audit logs with trace metadata",
        paragraphs: [
          "Log enough to reconstruct every critical interaction:",
        ],
        bullets: [
          "user identity/role,",
          "request + system prompt version,",
          "retrieval queries + results (source IDs),",
          "policy decisions (allow/deny/transform),",
          "final answer + citations,",
          "latency + errors.",
        ],
      },
      {
        paragraphs: [
          "Request/response logging and audit are not optional in regulated deployments.",
        ],
      },
      {
        heading: "What to review monthly (so you don’t drift into non-compliance)",
      },
      {
        heading: "1) Re-evaluate on core workflows + risk scenarios",
        paragraphs: [
          "Every month, run evaluation suites:",
        ],
        bullets: [
          "top workflows (support, policy lookup, internal procedures),",
          "risk scenarios (prompt injection, data leakage attempts, cross-team access),",
          "regression vs last release.",
        ],
      },
      {
        heading: "2) Track governance drift as one release unit",
        paragraphs: [
          "When governance drifts, it’s rarely one component—it’s the combination:",
        ],
        bullets: [
          "prompts,",
          "policies,",
          "corpora,",
          "evaluation sets,",
          "review artifacts.",
        ],
      },
      {
        paragraphs: [
          "Update them together as a single release package. Production AI operations depend on observability and drift control, not ad-hoc fixes.",
        ],
      },
      {
        heading: "Practical takeaway",
        paragraphs: [
          "If you want a pilot to ship, treat governance as engineering scope from Day 1. The “governed” rollout is not slower—it’s the only path that doesn’t get stopped at the gate.",
        ],
      },
    ],
  },
  {
    slug: "audit-brief-what-security-teams-need",
    title: "Audit Brief: What Security and Compliance Teams Actually Need",
    excerpt:
      "How to structure an audit brief so stakeholders can approve AI rollout without repeated review cycles.",
    publishedAt: "2026-02-12",
    category: "Audit",
    readingMinutes: 4,
    sections: [
      {
        heading: "Audit Brief: What Security and Compliance Teams Actually Need",
        paragraphs: [
          "Start with the evidence format. Most audit friction comes from a mismatch between what security/compliance needs to see and what engineering actually produces.",
          "An effective audit brief doesn’t just list controls. It defines:",
        ],
        bullets: [
          "how evidence is generated,",
          "how it maps to system behavior,",
          "how decisions are made (pass/fail),",
          "how remediation is owned and tracked.",
        ],
      },
      {
        paragraphs: [
          "This aligns with production-grade LLM operations: auditability is built through logs, traceability, and release gates—not narratives.",
        ],
      },
      {
        heading: "Principle: every requirement must map to behavior + artifact",
        paragraphs: [
          "Audits move faster when each control requirement has:",
        ],
        bullets: [
          "a technical behavior (what the system enforces),",
          "an artifact (log/report/config snapshot),",
          "an owner (who attests and remediates).",
        ],
      },
      {
        heading: "Core blocks of an audit brief",
      },
      {
        heading: "1) Risk framework + control scope",
        paragraphs: [
          "Define:",
        ],
        bullets: [
          "system purpose and excluded use,",
          "data classes involved (PII, confidential, regulated),",
          "threat model highlights (prompt injection, exfiltration, misuse),",
          "in-scope controls and out-of-scope rationale.",
        ],
      },
      {
        paragraphs: [
          "Work on personal data protection and compliance contexts makes this framing essential for reviewability.",
        ],
      },
      {
        heading: "2) Traceability model for outputs and sources",
        paragraphs: [
          "Your traceability model should answer:",
        ],
        bullets: [
          "Which sources influenced this answer?",
          "Were those sources permitted for this user?",
          "What prompt/policy versions were active?",
          "Can we reproduce the decision path?",
        ],
      },
      {
        paragraphs: [
          "Enterprise RAG built around citations/excerpts and audit logging naturally supports this model.",
        ],
      },
      {
        heading: "3) Evaluation methodology + pass/fail gates",
        paragraphs: [
          "Define the evaluation stack:",
        ],
        bullets: [
          "datasets (workflow suites + adversarial suites),",
          "metrics (accuracy, citation coverage, refusal correctness),",
          "thresholds (pass/fail),",
          "regression policy (what blocks release).",
        ],
      },
      {
        paragraphs: [
          "Evaluation and A/B testing are explicitly part of controlled platform operations.",
        ],
      },
      {
        heading: "4) Remediation workflow with owners and dates",
        paragraphs: [
          "Auditors don’t want “we’ll fix it.” They want:",
        ],
        bullets: [
          "owner for each finding,",
          "SLA for remediation,",
          "mitigation/compensating controls,",
          "verification step and closure evidence.",
        ],
      },
      {
        paragraphs: [
          "This mirrors how secure-by-design teams operationalize incident playbooks and release gating.",
        ],
      },
      {
        heading: "Minimal audit-brief deliverables (what to hand security teams)",
        bullets: [
          "Scope statement (one page)",
          "IAM boundary matrix (roles → allowed corpora/actions)",
          "Trace schema (fields captured, retention, access to logs)",
          "Evaluation report (latest release + regression deltas)",
          "Release gate record (pass/fail + sign-offs)",
          "Remediation register (findings, owners, dates, status)",
        ],
      },
      {
        paragraphs: [
          "If you standardize this brief, security reviews stop being “special events” and become a repeatable monthly process.",
        ],
      },
    ],
  },
  {
    slug: "century-release-citations-iam-updates",
    title: "Century Update: Citations and IAM Controls in Daily Operations",
    excerpt:
      "A product update on how Century handles citation quality and IAM-aware behavior across operational workflows.",
    publishedAt: "2026-02-05",
    category: "Product",
    readingMinutes: 3,
    sections: [
      {
        heading: "Century Update: Citations and IAM Controls in Daily Operations",
        paragraphs: [
          "In high-volume policy and support workflows, two things determine whether an AI assistant is operationally usable:",
        ],
        bullets: [
          "Citations that are consistent and reviewable",
          "IAM controls that match how teams actually work",
        ],
      },
      {
        paragraphs: [
          "Century is positioned as a controlled, secure enterprise platform for LLM adoption in regulated contexts, with source verification, logging/audit, and perimeter deployment as core design points.",
          "This update focuses on making citations and IAM boundaries behave predictably in daily operations—so teams spend less time in review loops and more time shipping improvements.",
        ],
      },
      {
        heading: "What’s improved",
      },
      {
        heading: "1) Stronger citation consistency for high-throughput workflows",
        paragraphs: [
          "When citations are inconsistent, reviews fail for avoidable reasons:",
        ],
        bullets: [
          "missing links,",
          "unstable source references,",
          "citations that don’t match the claim scope.",
        ],
      },
      {
        paragraphs: [
          "The update tightens citation behavior so that operational teams can rely on a stable evidence format:",
        ],
        bullets: [
          "each answer carries a consistent “source package” (doc/table excerpt + ID),",
          "citation coverage is treated as a first-class quality signal,",
          "responses default to “no source → no claim” for knowledge assertions.",
        ],
      },
      {
        paragraphs: [
          "This aligns with Century’s core “answers strictly based on sources” approach.",
        ],
      },
      {
        heading: "2) IAM-aware retrieval with stricter boundary checks across teams",
        paragraphs: [
          "Cross-team data access is where enterprise assistants typically fail: the system retrieves “technically relevant” content that is organizationally off-limits.",
          "This update strengthens IAM-aware retrieval so that:",
        ],
        bullets: [
          "retrieval scope is explicitly tied to role boundaries,",
          "context assembly is segmented by permissions,",
          "citations never expose references to inaccessible materials.",
        ],
      },
      {
        paragraphs: [
          "Secure LLM perimeter design is explicitly built around RBAC and auditability, not informal conventions.",
        ],
      },
      {
        heading: "Operational impact",
      },
      {
        heading: "Fewer review cycles caused by missing references",
        paragraphs: [
          "Teams reviewing policy/support outputs spend less time asking “where did this come from?” and more time validating substance—because the evidence format is consistent.",
        ],
      },
      {
        heading: "Cleaner role-based separation of answer context",
        paragraphs: [
          "When IAM boundaries are enforced end-to-end, the assistant’s behavior becomes predictable:",
        ],
        bullets: [
          "users see only what they’re allowed to use,",
          "reviewers can validate access correctness with logs/traces,",
          "compliance teams get a clearer story for sign-off.",
        ],
      },
      {
        heading: "More predictable “audit packaging” for monthly reviews",
        paragraphs: [
          "With stable citation packages + trace metadata, monthly audits become packaging work, not forensic work:",
        ],
        bullets: [
          "request/response logs,",
          "trace IDs,",
          "evaluation snapshots,",
          "release gate records.",
        ],
      },
      {
        paragraphs: [
          "Century’s emphasis on logging/audit and observability is specifically aimed at making AI manageable and reviewable.",
        ],
      },
      {
        heading: "Suggested rollout pattern (so operations feel it immediately)",
        bullets: [
          "Enable citation consistency rules on the highest-volume workflows first (policy Q&A, support macros).",
          "Run role-based retrieval tests with real team boundaries (positive/negative).",
          "Add a monthly “governance drift” review: prompts + policies + corpora + eval sets as one release unit.",
        ],
      },
    ],
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
