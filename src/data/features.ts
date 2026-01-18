import {
    Mail,
    Zap,
    Bell,
    Eye,
    Inbox
} from "lucide-react";

export interface Feature {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    description: string;
    icon: string;
    heroHeadline: string;
    heroSubheadline: string;
    benefits: {
        title: string;
        description: string;
    }[];
    keywords: string[];
}

export const features: Feature[] = [
    {
        slug: "feedback-to-email",
        title: "Feedback Direct to Your Inbox",
        metaTitle: "Get User Feedback Directly to Your Email Inbox",
        metaDescription: "Stop logging into dashboards. Receive user feedback, bug reports, and feature requests directly in your email inbox. Set up in 2 minutes.",
        description: "Every piece of feedback lands straight in your inbox. No dashboard hopping, no context switching. Just open your email and respond.",
        icon: "Mail",
        heroHeadline: "User feedback, directly in your inbox",
        heroSubheadline: "Stop logging into yet another dashboard. Feedinbox sends every submission straight to your email the moment it arrives.",
        benefits: [
            {
                title: "Zero Dashboard Fatigue",
                description: "No need to check another app. Feedback comes to you, where you already work—your inbox."
            },
            {
                title: "Instant Notifications",
                description: "Get notified the second a user submits feedback. Never miss critical bug reports again."
            },
            {
                title: "Reply Ready Context",
                description: "Each email includes all the details: feedback type, user info, and timestamp. Ready for action."
            },
            {
                title: "Works with Any Email Client",
                description: "Gmail, Outlook, Apple Mail, Superhuman—if it reads email, it works with Feedinbox."
            }
        ],
        keywords: ["feedback to email", "feedback email notification", "user feedback inbox", "feedback direct to email"]
    },
    {
        slug: "email-feedback-widget",
        title: "Email-First Feedback Widget",
        metaTitle: "Email-First Feedback Widget for Websites & Apps",
        metaDescription: "An embeddable feedback widget that sends submissions directly to your email. No complex dashboards. Just feedback in your inbox.",
        description: "A lightweight widget that prioritizes what matters: getting feedback to you fast, via email.",
        icon: "Inbox",
        heroHeadline: "The feedback widget that emails you",
        heroSubheadline: "Most feedback tools make you log in to see submissions. Feedinbox sends them to your inbox instead.",
        benefits: [
            {
                title: "Email-First Architecture",
                description: "Built from the ground up to deliver feedback via email, not hide it behind a login."
            },
            {
                title: "Lightweight Embed",
                description: "Just one script tag. No heavy SDKs, no performance impact on your site."
            },
            {
                title: "Customizable Widget",
                description: "Match your brand colors and position the widget anywhere on your site."
            },
            {
                title: "Rich Email Formatting",
                description: "Emails are beautifully formatted with all submission details, ready for action."
            }
        ],
        keywords: ["email feedback widget", "feedback inbox widget", "email-first feedback", "inbox feedback tool"]
    },
    {
        slug: "instant-email-alerts",
        title: "Instant Email Alerts",
        metaTitle: "Instant Email Alerts for User Feedback & Bug Reports",
        metaDescription: "Get real-time email notifications when users submit feedback. Bug reports, feature requests, and thoughts—instantly in your inbox.",
        description: "Real-time email alerts mean you never miss urgent feedback. Critical bugs? You'll know in seconds.",
        icon: "Bell",
        heroHeadline: "Feedback alerts in real-time",
        heroSubheadline: "When a user reports a critical bug, every second counts. Get instant email alerts the moment feedback is submitted.",
        benefits: [
            {
                title: "Sub-Second Delivery",
                description: "Emails are sent within milliseconds of submission. No batching, no delays."
            },
            {
                title: "Priority Indicators",
                description: "Bug reports, feature requests, and general feedback are clearly labeled in the subject line."
            },
            {
                title: "Mobile Ready",
                description: "Get push notifications on your phone via your email app. Respond from anywhere."
            },
            {
                title: "Team Distribution",
                description: "Send alerts to multiple team members. Everyone stays in the loop."
            }
        ],
        keywords: ["instant feedback notification", "real-time feedback email", "feedback alerts", "bug report notifications"]
    },
    {
        slug: "no-dashboard-feedback",
        title: "Feedback Without Dashboard Fatigue",
        metaTitle: "Simple Feedback Tool - No Dashboard Required",
        metaDescription: "Tired of logging into another dashboard? Feedinbox sends user feedback directly to your email. Simple, fast, effective.",
        description: "You already have too many dashboards. Feedinbox eliminates another one by sending feedback straight to email.",
        icon: "Eye",
        heroHeadline: "One less dashboard to check",
        heroSubheadline: "Dashboard fatigue is real. You already check Slack, email, analytics, CRM... Feedinbox doesn't add another tab. It uses the one you already have open.",
        benefits: [
            {
                title: "Reduce Tool Overload",
                description: "Stop adding more logins to your workflow. Feedback belongs in your inbox."
            },
            {
                title: "Single Source of Truth",
                description: "Your email is already your command center. Keep feedback there too."
            },
            {
                title: "Optional Dashboard",
                description: "We have a dashboard if you need it. But you probably won't."
            },
            {
                title: "Focus on What Matters",
                description: "Less time checking dashboards. More time building your product."
            }
        ],
        keywords: ["simple feedback tool", "no login feedback", "no dashboard feedback", "minimal feedback tool"]
    },
    {
        slug: "inbox-feedback-tool",
        title: "Inbox-First Feedback Collection",
        metaTitle: "Inbox-First Feedback Tool for Developers & Founders",
        metaDescription: "Collect user feedback and receive it in your email inbox. Built for developers and founders who value simplicity.",
        description: "A feedback tool designed for people who live in their inbox. Simple setup, instant email delivery.",
        icon: "Zap",
        heroHeadline: "Feedback collection, inbox-first",
        heroSubheadline: "Built for developers and founders who value simplicity. Embed the widget, get feedback in your email. That's it.",
        benefits: [
            {
                title: "Developer Friendly",
                description: "npm install or script tag. Your choice. Both take under 2 minutes."
            },
            {
                title: "Founder Focused",
                description: "Perfect for indie hackers and early-stage startups who need to move fast."
            },
            {
                title: "No Vendor Lock-in",
                description: "Feedback arrives in standard email format. Export anytime, no data hostage."
            },
            {
                title: "Generous Free Tier",
                description: "Start collecting feedback for free. Upgrade only when you're ready."
            }
        ],
        keywords: ["inbox feedback tool", "feedback to mailbox", "email feedback collection", "simple feedback widget"]
    }
];

export function getFeatureBySlug(slug: string): Feature | undefined {
    return features.find((f) => f.slug === slug);
}

export function getAllFeatureSlugs(): string[] {
    return features.map((f) => f.slug);
}
