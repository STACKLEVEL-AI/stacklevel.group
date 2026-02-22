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
  basePath: '/stacklevel.group',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/stacklevel.group',
  },
};

export default withNextIntl(nextConfig);
