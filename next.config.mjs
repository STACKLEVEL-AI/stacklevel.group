import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withNextIntl = createNextIntlPlugin(
  path.join(__dirname, "i18n", "request.ts")
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async redirects() {
    return [
      {
        source: "/:locale(en|ru)/hire-web-developers",
        destination: "/:locale/services",
        permanent: true,
      },
      {
        source: "/:locale(en|ru)/hire-dedicated-team",
        destination: "/:locale/services",
        permanent: true,
      },
      {
        source: "/:locale(en|ru)/hire-react-developers",
        destination: "/:locale/services",
        permanent: true,
      },
      {
        source: "/:locale(en|ru)/hire-php-developers",
        destination: "/:locale/services",
        permanent: true,
      },
      {
        source: "/:locale(en|ru)/about-us",
        destination: "/:locale/company",
        permanent: true,
      },
      {
        source: "/:locale(en|ru)/careers",
        destination: "/:locale/company",
        permanent: true,
      },
      {
        source: "/:locale(en|ru)/program-pack",
        destination: "/:locale/company",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
