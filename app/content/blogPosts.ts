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
        heading: "What committees need first",
        paragraphs: [
          "Enterprise approvals move faster when governance is presented as operational controls, not abstract policy language.",
          "A baseline should connect ownership, evidence format, and decision gates in one short review package.",
        ],
      },
      {
        heading: "Baseline controls",
        bullets: [
          "Named owners for model, data, and release decisions",
          "IAM-aligned access boundaries for retrieval and responses",
          "Audit logs and traceability retained for review cycles",
          "Evaluation gates with pass/fail criteria before each release",
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
        heading: "Why pilots stall",
        paragraphs: [
          "Most pilot assistants fail in production because governance requirements are added too late.",
          "If controls are treated as post-launch work, security and compliance reviews become blockers.",
        ],
      },
      {
        heading: "Production checklist",
        bullets: [
          "Define ownership and acceptance criteria before implementation.",
          "Enable citations-first responses for verifiability.",
          "Map IAM boundaries to retrieval and response behavior.",
          "Store request/response audit logs with traceability metadata.",
        ],
      },
      {
        heading: "What to review every month",
        paragraphs: [
          "Run evaluation gates on top workflows and risk scenarios.",
          "Track control drift and update prompts, policies, and review artifacts as one release package.",
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
        heading: "Start with evidence shape",
        paragraphs: [
          "An audit brief should define how evidence is produced, not just what controls are expected.",
          "Teams move faster when every requirement maps to a technical behavior and a review artifact.",
        ],
      },
      {
        heading: "Core blocks",
        bullets: [
          "Risk framing and control scope",
          "Traceability model for outputs and sources",
          "Evaluation methodology and pass/fail gates",
          "Remediation workflow with owners and timeline",
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
        paragraphs: [
          "The latest Century update improves source citation consistency for high-volume policy and support workflows.",
          "IAM-aware retrieval now includes stricter boundary checks for cross-team data access patterns.",
        ],
      },
      {
        heading: "Operational impact",
        bullets: [
          "Fewer review loops caused by missing references",
          "Cleaner separation of role-based response context",
          "More predictable audit packaging for monthly reviews",
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
