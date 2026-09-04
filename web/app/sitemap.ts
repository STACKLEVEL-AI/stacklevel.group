import type { MetadataRoute } from "next";
import { blogPostSlugs } from "./content/blogPosts";
import { getSiteUrl, localizedPath } from "./lib/site";

const staticPaths = [
  "/",
  "/audit-compliance",
  "/blog",
  "/bank",
  "/case-studies",
  "/company",
  "/contact",
  "/products",
  "/products/century",
  "/resources",
  "/services",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const locales = ["ru", "en"] as const;
  const localizedPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: new URL(localizedPath(locale, path), siteUrl).toString(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
  );

  const blogPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    blogPostSlugs.map((slug) => ({
      url: new URL(localizedPath(locale, `/blog/${slug}`), siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...localizedPages, ...blogPages];
}
