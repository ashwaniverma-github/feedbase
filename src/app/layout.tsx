import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://feedinbox.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Feedinbox - Collect User Feedback to Your Inbox",
    template: "%s | Feedinbox",
  },
  description: "Collect feedback, bug reports, and feature requests from your users. Embed one snippet of code, receive everything straight to your inbox. No complex setup required.",
  keywords: ["feedback", "user feedback", "feedback widget", "bug reports", "feature requests", "customer feedback", "feedback tool", "saas feedback"],
  authors: [{ name: "Feedinbox" }],
  creator: "Feedinbox",
  publisher: "Feedinbox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Feedinbox",
    title: "Feedinbox - Collect User Feedback to Your Inbox",
    description: "Collect feedback, bug reports, and feature requests from your users. Embed one snippet of code, receive everything straight to your inbox.",
    images: [
      {
        url: "/OG.png?v=2",
        width: 1200,
        height: 630,
        alt: "Feedinbox - Feedback for Founders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedinbox - Collect User Feedback to Your Inbox",
    description: "Collect feedback, bug reports, and feature requests from your users. Embed one snippet of code, receive everything straight to your inbox.",
    images: ["/OG.png?v=2"],
    creator: "@feedinbox",
  },

  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Analytics />
          <Script id="feedinbox-config" strategy="afterInteractive">
            {`
            window.feedinboxConfig = {
              projectKey: "cmjb5cwds000312f8j91p28yl"
            };
          `}
          </Script>

          {/* 2. Widget Script */}
          <Script
            src="https://www.feedinbox.com/widget.js"
            strategy="lazyOnload"
          />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-81LYZN8CPG"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-81LYZN8CPG');
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}

