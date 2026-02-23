import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import { getTranslations } from "next-intl/server";
import { getAllBlogPosts, getBlogPostBySlug } from "@/app/content/blogPosts";

type BlogPostPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function formatDate(dateString: string, locale: string) {
  const localeCode = isRuLocale(locale) ? "ru-RU" : "en-US";
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString(localeCode, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);
  const isRu = isRuLocale(locale);

  if (!post) {
    return {
      title: isRu ? "Пост не найден | Stacklevel Блог" : "Post not found | Stacklevel Blog",
    };
  }

  return {
    title: `${post.title} | ${isRu ? "Stacklevel Блог" : "Stacklevel Blog"}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const t = await getTranslations("blog");
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative">
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="width-wrapper">
          <Link href="/blog" className="stack-cta-ghost text-base">
            {t("backToBlog")}
          </Link>

          <article className="stack-panel mt-6 bg-white p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
              {post.category} • {formatDate(post.publishedAt, locale)} • {post.readingMinutes} {isRuLocale(locale) ? "мин. чтения" : "min read"}
            </p>
            <h1 className="stack-grid-title mt-3 text-[var(--black)]">{post.title}</h1>
            <p className="mt-4 max-w-4xl text-[var(--black)]/86">{post.excerpt}</p>

            <div className="mt-8 grid gap-6">
              {post.sections.map((section, sectionIndex) => (
                <section key={`${post.slug}-section-${sectionIndex}`} className="border-t border-[rgba(0,0,0,.14)] pt-5">
                  {section.heading ? <h2 className="stack-title text-2xl text-[var(--black)]">{section.heading}</h2> : null}

                  {section.paragraphs ? (
                    <div className="mt-3 grid gap-3 text-[var(--black)]/88">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--black)]/88">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
