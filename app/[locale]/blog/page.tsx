import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import InnerHero from "../../components/InnerHero";
import { getAllBlogPosts } from "@/app/content/blogPosts";

export const metadata: Metadata = {
  title: "Blog | Stacklevel Group",
  description:
    "News and field notes on governed AI engineering, audit readiness, and enterprise compliance-by-design.",
};

function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const feedPosts = posts.slice(0, 4);
  const marqueePosts = [...feedPosts, ...feedPosts];

  if (feedPosts.length === 0) {
    return (
      <div className="relative">
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="width-wrapper">
            <h1 className="stack-grid-title text-[var(--black)]">
              Blog <span className="stack-accent">is ready</span>
            </h1>
            <p className="mt-4 max-w-3xl text-[var(--black)]/85">
              Add the first post in <code>app/content/blogPosts.ts</code> and it will appear here automatically.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative">
      <InnerHero
        lines={[
          { text: "Stacklevel" },
          { text: "News", accent: true },
          { text: "And Briefs" },
        ]}
        subtitle="Code-first blog with practical updates on enterprise AI engineering, audit, and compliance execution."
        primaryCta={{ label: "Request briefing", href: "/contact?topic=Partnership" }}
        secondaryCta={{ label: "View case studies", href: "/case-studies", ghost: true }}
        chips={["Engineering updates", "Audit notes", "Product news"]}
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper">
          <h2 className="stack-grid-title text-[var(--black)]">
            Latest <span className="stack-accent">news</span>
          </h2>
          <p className="mt-3 max-w-3xl text-[var(--black)]/78">
            Auto-scrolling feed. Newest posts start on the left.
          </p>

          <div className="news-marquee mt-7">
            <div className="news-marquee-track py-2">
              {marqueePosts.map((post, index) => {
                const isClone = index >= feedPosts.length;
                const cardStyle = index % 2 === 0 ? "stack-panel bg-white" : "stack-panel-pale";

                return (
                  <article
                    key={`${post.slug}-${index}`}
                    aria-hidden={isClone}
                    className={`${cardStyle} mr-4 flex h-[340px] w-[320px] shrink-0 flex-col p-5 sm:mr-5 sm:w-[360px] lg:w-[400px]`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                      {post.category} • {formatDate(post.publishedAt)} • {post.readingMinutes} min read
                    </p>
                    <h3 className="stack-title stack-clamp-3 mt-3 min-h-[74px] text-xl leading-tight text-[var(--black)] md:min-h-[84px]">
                      {post.title}
                    </h3>
                    <p className="stack-clamp-4 mt-3 min-h-[72px] flex-1 text-sm leading-relaxed text-[var(--black)]/86">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      tabIndex={isClone ? -1 : undefined}
                      className="stack-cta-ghost mt-5 w-full text-base"
                    >
                      Open post
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
