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
      <body>
        {children}
      </body>
    </html>
  );
}
