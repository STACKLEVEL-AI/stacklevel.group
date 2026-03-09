import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import { getTranslations } from "next-intl/server";
import { readFileSync } from "fs";
import { join } from "path";
import InnerHero from "../../components/InnerHero";
import { getAllBlogPosts } from "@/app/content/blogPosts";

type Props = { params: Promise<{ locale: string }> };

// Static dates for each blog post
const publishedAtData: Record<string, string> = {
  "ai-governance-baseline-for-enterprise-committees": "2026-02-21",
  "governed-rag-rollout-checklist": "2026-02-20",
  "audit-brief-what-security-teams-need": "2026-02-12",
  "century-release-citations-iam-updates": "2026-02-05",
};

// Static reading minutes data (not translated)
const readingMinutesData: Record<string, number> = {
  "ai-governance-baseline-for-enterprise-committees": 4,
  "governed-rag-rollout-checklist": 5,
  "audit-brief-what-security-teams-need": 4,
  "century-release-citations-iam-updates": 3,
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "Блог | Stacklevel Group" : "Blog | Stacklevel Group",
    description: isRu
      ? "Новости и практические заметки по инженерии управляемого ИИ, подготовке к аудиту и соответствию по дизайну."
      : "News and field notes on governed AI engineering, audit readiness, and enterprise compliance-by-design.",
  };
}

function formatDate(dateString: string, locale: string) {
  const localeCode = isRuLocale(locale) ? "ru-RU" : "en-US";
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString(localeCode, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  // Read messages file directly based on locale
  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messagesContent = readFileSync(messagesPath, "utf-8");
  const messages = JSON.parse(messagesContent);

  // Get blog UI translations
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = messages.blog;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return String(value);
  };

  // Get blog posts from translation data using helper function
  const blogPostsData = (messages?.blogPosts || {}) as Record<string, {
    title: string;
    excerpt: string;
    category: string;
    readingMinutes: number;
    sections: Array<{
      heading?: string;
      paragraphs?: string[];
      bullets?: string[];
    }>;
  }>;

  const posts = getAllBlogPosts(blogPostsData);

  const feedPosts = posts.slice(0, 4);
  const marqueePosts = [...feedPosts, ...feedPosts];

  if (feedPosts.length === 0) {
    return (
      <div className="relative">
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="width-wrapper">
            <h1 className="stack-grid-title text-[var(--black)]">
              Blog <span className="stack-accent">{t("isReady")}</span>
            </h1>
            <p className="mt-4 max-w-3xl text-[var(--black)]/85">
              {t("addFirstPost")} <code>app/content/blogPosts.ts</code> {t("lastPostMessage")}
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
          { text: t("hero.line1") },
          { text: t("hero.line2"), accent: true },
          { text: t("hero.line3") },
        ]}
        subtitle={t("hero.subtitle")}
        primaryCta={{ label: t("hero.primaryCta"), href: "/contact?topic=Partnership" }}
        secondaryCta={{ label: t("hero.secondaryCta"), href: "/case-studies", ghost: true }}
        chips={[t("chips.engineering"), t("chips.audit"), t("chips.product")]}
      />

      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper">
          <h2 className="stack-grid-title text-[var(--black)]">
            {t("latest")} <span className="stack-accent">{t("news")}</span>
          </h2>
          <p className="mt-3 max-w-3xl text-[var(--black)] text-bold">
            {t("feedDescription")}
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
                    className={`${cardStyle} mr-4 flex h-[340px] w-[320px] shrink-0 flex-col p-5 sm:mr-5 sm:w-[360px] lg:w-[400px] cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                      {post.category} • {formatDate(post.publishedAt, locale)} • {post.readingMinutes} {t("minRead")}
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
                      {t("openPost")}
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
