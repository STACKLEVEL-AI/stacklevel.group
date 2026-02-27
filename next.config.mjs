import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // Required for GitHub Pages to handle clean URLs without .html extension
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // Headers are configured in vercel.json for Vercel deployment
  // For other static hosts, configure cache headers at the web server level
};

export default withNextIntl(nextConfig);
