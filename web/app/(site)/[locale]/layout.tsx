import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/app/lib/site";
import JsonLd from "@/app/components/JsonLd";
import SiteLayout from "@/app/components/SiteLayout";
import { getOrganizationSchema, getWebsiteSchema } from "@/app/lib/schema";
import { readFileSync } from "fs";
import { join } from "path";
import "../../globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Stacklevel Group | AI Governance & Compliance Engineering",
  description:
    "Stacklevel Group designs, audits, and governs AI for regulated production with product assets including Century.",
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/favicon.ico`,
  },
  keywords: ["AI", "audit", "compliance", "governance", "Stacklevel Group"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: "Stacklevel Group",
    type: "website",
    images: [{ url: "/images/hero-bg.png", alt: "Stacklevel Group" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/hero-bg.png"] },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messages = JSON.parse(readFileSync(messagesPath, "utf-8"));

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd data={[getOrganizationSchema(), getWebsiteSchema()]} />
        <link
          rel="preload"
          as="image"
          href={`${basePath}/images/hero-bg.png`}
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="fetch"
          href={`${basePath}/images/companies/tdberlin.svg`}
          type="image/svg+xml"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteLayout>{children}</SiteLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
