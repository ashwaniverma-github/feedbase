import LandingPage from "@/components/landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedinbox — User Feedback Widget That Emails You | Free to Start",
  description: "The simplest feedback widget for your website. Collect bug reports, feature requests, and user feedback — delivered straight to your email inbox. One script tag, 2-minute setup, free tier available.",
  alternates: {
    canonical: "https://feedinbox.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Feedinbox",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "User feedback widget that sends feedback, bug reports, and feature requests directly to your email inbox.",
  url: "https://feedinbox.com",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free",
      description: "20 submissions/month",
    },
    {
      "@type": "Offer",
      price: "5",
      priceCurrency: "USD",
      name: "Pro",
      description: "Unlimited submissions",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}
