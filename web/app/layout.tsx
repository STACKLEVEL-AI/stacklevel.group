import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
        {children}
      </body>
    </html>
  );
}
