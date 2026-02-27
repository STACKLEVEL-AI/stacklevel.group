import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import { getTranslations } from "next-intl/server";
import { readFileSync } from "fs";
import { join } from "path";
import { blogPostSlugs, getBlogPostBySlug } from "@/app/content/blogPosts";

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
  const locales = ['en', 'ru'];
  
  return locales.flatMap((locale) => 
    blogPostSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRu = isRuLocale(locale);

  return {
    title: isRu ? "Stacklevel Блог" : "Stacklevel Blog",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  
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
  
  const blogPostsData = (messages?.blogPosts || {}) as Record<string, { 
    title: string; 
    excerpt: string; 
    category: string; 
    readingMinutes: number; 
    sections: Array<{ heading?: string; paragraphs?: string[]; bullets?: string[] }> 
  }>;
  
  const post = getBlogPostBySlug(slug, blogPostsData);

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
              {post.category} • {formatDate(post.publishedAt, locale)} • {post.readingMinutes} {t("minRead")}
            </p>
            <h1 className="stack-grid-title mt-3 text-[var(--black)]">{post.title}</h1>
            <p className="mt-4 max-w-4xl text-[var(--black)]/86">{post.excerpt}</p>

            <div className="mt-8 grid gap-6">
              {post.sections.map((section, sectionIndex) => (
                <section key={`${post.slug}-section-${sectionIndex}`} className="border-t border-[rgba(0,0,0,.14)] pt-5">
                  {section.heading ? <h2 className="stack-title text-2xl text-[var(--black)]">{section.heading}</h2> : null}

                  {section.paragraphs ? (
                    <div className="mt-3 grid gap-3 text-[var(--black)]/88">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={`p-${sectionIndex}-${pIndex}`}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--black)]/88">
                      {section.bullets.map((bullet, bIndex) => (
                        <li key={`b-${sectionIndex}-${bIndex}`}>{bullet}</li>
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
