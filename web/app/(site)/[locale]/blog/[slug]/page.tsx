import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { isRuLocale } from "@/i18n/localeUtils";
import { readFileSync } from "fs";
import { join } from "path";
import { blogPostSlugs, getBlogPostBySlug } from "@/app/content/blogPosts";
import { localizedAlternates } from "@/app/lib/site";

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
  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messagesContent = readFileSync(messagesPath, "utf-8");
  const messages = JSON.parse(messagesContent);
  const blogPostsData = (messages?.blogPosts || {}) as Record<string, {
    title: string;
    excerpt: string;
    category: string;
    readingMinutes: number;
    sections: Array<{ heading?: string; paragraphs?: string[]; bullets?: string[] }>;
  }>;
  const post = getBlogPostBySlug(slug, blogPostsData);

  if (!post) {
    return {};
  }

  const pathname = `/blog/${slug}`;
  const localizedUrl = `/${locale}${pathname}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: localizedAlternates(locale, pathname),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale,
      url: localizedUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;

  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messagesContent = readFileSync(messagesPath, "utf-8");
  const messages = JSON.parse(messagesContent);

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

          <article className="stack-panel mt-8 bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[var(--black)]/5">

            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-[var(--black)]/10">
              <span className="inline-flex items-center px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold rounded-lg text-xs uppercase tracking-wider">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[var(--black)]/60 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedAt, locale)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[var(--black)]/60 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingMinutes} {t("minRead")}
              </span>
            </div>

            <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.2] tracking-tight mb-6 max-w-4xl">
              <span className="bg-gradient-to-r from-[var(--black)] via-[var(--black)] to-[var(--accent)] bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-[var(--black)]/75 max-w-3xl font-medium border-l-4 border-[var(--accent)] pl-6 py-2">
              {post.excerpt}
            </p>

            <div className="mt-14 space-y-12">
              {post.sections.map((section, sectionIndex) => (
                <section key={`${post.slug}-section-${sectionIndex}`} className="scroll-mt-20">

                  {section.heading ? (
                    <div className="mt-12 pb-8 border-b border-[var(--black)]/10">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--black)] leading-tight flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-1.5 h-12 bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/70 to-transparent rounded-full mt-1 group-hover:from-[var(--accent)]/80 transition-colors duration-300" />
                        {section.heading}
                      </h2>
                    </div>
                  ) : null}

                  {section.paragraphs ? (
                    <div className="mt-8 space-y-6 text-[17px] md:text-[18px] leading-[1.8] text-[var(--black)]/82">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={`p-${sectionIndex}-${pIndex}`} className="hover:text-[var(--black)]/95 transition-colors duration-300">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {section.bullets ? (
                    <ul className="mt-8 space-y-3.5 text-[17px] md:text-[18px] leading-[1.8] text-[var(--black)]/82">
                      {section.bullets.map((bullet, bIndex) => (
                        <li key={`b-${sectionIndex}-${bIndex}`} className="flex gap-4 items-center group">
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/70 group-hover:shadow-[0_0_12px_rgba(var(--accent-rgb),0.4)] transition-all duration-300" />
                          <span className="flex-grow group-hover:text-[var(--black)]/95 transition-colors duration-300">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                </section>
              ))}
            </div>

          </article>

          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-2xl border border-[var(--accent)]/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-wider font-bold text-[var(--accent)] mb-2">
                  {locale === 'ru' ? 'Понравилась статья?' : 'Found this helpful?'}
                </p>
                <p className="text-lg text-[var(--black)]/75 font-medium">
                  {locale === 'ru' ? 'Свяжитесь с нами для обсуждения вашего проекта' : 'Get in touch to discuss your project with us'}
                </p>
              </div>
              <Link href="/contact" className="px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-white hover:text-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/30 transition-all duration-300 whitespace-nowrap text-center border-2 border-[var(--accent)] hover:border-[var(--accent)]">
                {locale === 'ru' ? 'Связаться' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
