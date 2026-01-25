import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { ThemeScript } from "@/app/_components/theme-script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "SugaStack.",
    template: "%s | SugaStack.",
  },
  description: "学びをアウトプットするITエンジニアのブログ",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "SugaStack.",
    images: [
      {
        url: "/favicon/egg-fried.svg",
        width: 1200,
        height: 630,
        alt: "SugaStack.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SugaStack.",
    description: "学びをアウトプットするITエンジニアのブログ",
    images: ["/favicon/egg-fried.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/egg-fried.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/egg-fried.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/egg-fried.svg"
        />
        {/* manifest は JSON が必要なため、無効な SVG 参照を削除 */}
        <link
          rel="mask-icon"
          href="/favicon/egg-fried.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/egg-fried.svg" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100")}
      >
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
