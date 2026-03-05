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
  description: "The simplest user feedback widget for your website. Collect bug reports, feature requests, and feedback—delivered straight to your email inbox. One script tag, 2-minute setup, free to start.",
  keywords: ["feedback widget", "user feedback tool", "website feedback widget", "feedback to email", "bug report widget", "feature request tool", "customer feedback widget", "feedback collection", "in-app feedback", "saas feedback tool", "feedback widget for website free", "simple feedback tool", "embedded feedback widget"],
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
          <Script
            src="https://www.feedinbox.com/widget.js"
            data-project-key="cmjb5cwds000312f8j91p28yl"
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

