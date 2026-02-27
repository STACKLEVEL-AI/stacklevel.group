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
  category: string;
  readingMinutes: number;
  sections: BlogSection[];
};

// Blog post slugs for static generation
export const blogPostSlugs = [
  "ai-governance-baseline-for-enterprise-committees",
  "governed-rag-rollout-checklist",
  "audit-brief-what-security-teams-need",
  "century-release-citations-iam-updates",
] as const;

export type BlogPostSlug = (typeof blogPostSlugs)[number];

// Type for the blog posts data structure from translations
type BlogPostsData = {
  [key: string]: {
    title: string;
    excerpt: string;
    category: string;
    readingMinutes: number;
    sections: Array<{
      heading?: string;
      paragraphs?: string[];
      bullets?: string[];
    }>;
  };
};

function getPublishedAt(slug: BlogPostSlug): string {
  const dates: Record<BlogPostSlug, string> = {
    "ai-governance-baseline-for-enterprise-committees": "2026-02-21",
    "governed-rag-rollout-checklist": "2026-02-20",
    "audit-brief-what-security-teams-need": "2026-02-12",
    "century-release-citations-iam-updates": "2026-02-05",
  };
  return dates[slug];
}

// Helper to get blog posts from translation data
export function getBlogPostsFromData(blogPostsData: BlogPostsData): BlogPost[] {
  return blogPostSlugs.map((slug) => {
    const data = blogPostsData[slug];
    if (!data) {
      throw new Error(`Blog post data not found for slug: ${slug}`);
    }
    
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt: getPublishedAt(slug),
      category: data.category,
      readingMinutes: data.readingMinutes,
      sections: data.sections || [],
    };
  });
}

export function getAllBlogPosts(blogPostsData?: BlogPostsData): BlogPost[] {
  if (!blogPostsData) {
    return [];
  }
  return getBlogPostsFromData(blogPostsData).sort((a, b) => 
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getBlogPostBySlug(
  slug: string, 
  blogPostsData?: BlogPostsData
): BlogPost | undefined {
  if (!blogPostsData) return undefined;
  return getBlogPostsFromData(blogPostsData).find((post) => post.slug === slug);
}
