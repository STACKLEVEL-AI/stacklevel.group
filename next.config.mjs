import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use on-demand rendering (hybrid)
  // This allows dynamic components like ContactForm to work correctly
  // Note: Requires Node.js runtime - cannot use with static GitHub Pages
  // Consider using Vercel or another Node.js hosting for GitHub Pages
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
