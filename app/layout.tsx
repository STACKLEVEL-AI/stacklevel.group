import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Stacklevel Group | AI Governance & Compliance Engineering",
  description:
    "Stacklevel Group designs, audits, and governs AI for regulated production with product assets including Century.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
