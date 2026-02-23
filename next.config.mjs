import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n-config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to use hybrid rendering (ISR + SSG)
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
