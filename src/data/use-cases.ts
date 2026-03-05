export interface UseCase {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    description: string;
    icon: string;
    heroHeadline: string;
    heroSubheadline: string;
    problemStatement: string;
    benefits: {
        title: string;
        description: string;
    }[];
    keywords: string[];
}

export const useCases: UseCase[] = [
    {
        slug: "saas-feedback",
        title: "Feedback for SaaS Applications",
        metaTitle: "Feedback Widget for SaaS Applications | Feedinbox",
        metaDescription: "Collect user feedback, bug reports, and feature requests from your SaaS application. Embed in 2 minutes, receive feedback in your email inbox.",
        description: "The easiest way to collect feedback from your SaaS users. Embed the widget, receive submissions in your inbox.",
        icon: "Cloud",
        heroHeadline: "SaaS feedback, simplified",
        heroSubheadline: "Your SaaS users have opinions. Make it easy for them to share—and easy for you to receive them in your inbox.",
        problemStatement: "SaaS founders spend too much time checking multiple dashboards for user feedback. You need a solution that brings feedback to you, not the other way around.",
        benefits: [
            { title: "In-App Widget", description: "Embed directly in your SaaS app. Users never leave your product." },
            { title: "Categorized Feedback", description: "Bug reports, feature requests, and general thoughts—all labeled clearly." },
            { title: "Email Delivery", description: "Every submission lands in your inbox. No dashboard required." },
            { title: "User Context", description: "Capture user info automatically for better context." }
        ],
        keywords: ["saas feedback widget", "saas user feedback", "feedback tool for saas", "saas bug reports"]
    },
    {
        slug: "mobile-app-feedback",
        title: "Feedback for Mobile Apps",
        metaTitle: "Mobile App Feedback Collection | Feedinbox",
        metaDescription: "Collect bug reports and feature requests from your mobile app users. Get feedback delivered directly to your email inbox.",
        description: "Mobile app users are on the go. Give them a quick way to share feedback without leaving your app.",
        icon: "Smartphone",
        heroHeadline: "Mobile app feedback, delivered",
        heroSubheadline: "Your app users encounter bugs in the wild. Make it easy for them to tell you—and get it in your inbox instantly.",
        problemStatement: "Mobile app bugs are hard to reproduce. You need user feedback with context: what they were doing, what went wrong, and when it happened.",
        benefits: [
            { title: "Mobile-Optimized Widget", description: "Touch-friendly interface that works on any screen size." },
            { title: "Screenshot Ready", description: "Users can describe issues visually with clear submissions." },
            { title: "Instant Notifications", description: "Know about critical bugs before they hit your reviews." },
            { title: "Web Integration", description: "Use our script tag in your WebView or mobile web app." }
        ],
        keywords: ["mobile app feedback", "app feedback collection", "mobile bug reports", "app feature requests"]
    },
    {
        slug: "e-commerce-feedback",
        title: "Feedback for E-Commerce",
        metaTitle: "E-Commerce Customer Feedback Widget | Feedinbox",
        metaDescription: "Collect customer feedback from your online store. Understand what buyers want and fix checkout issues fast.",
        description: "E-commerce customers have strong opinions. Capture them before they leave a bad review somewhere else.",
        icon: "ShoppingCart",
        heroHeadline: "E-commerce feedback, captured",
        heroSubheadline: "Every abandoned cart has a story. Every completed purchase has feedback. Capture both with a simple widget.",
        problemStatement: "E-commerce sites lose customers due to friction they never hear about. By the time you see a bad review, it's too late.",
        benefits: [
            { title: "Checkout Insights", description: "Understand why customers abandon carts or complete purchases." },
            { title: "Product Feedback", description: "Learn which products need better descriptions or photos." },
            { title: "Support Reduction", description: "Catch issues before they become support tickets." },
            { title: "Conversion Optimization", description: "Use feedback to improve your conversion rate." }
        ],
        keywords: ["ecommerce feedback", "customer feedback widget", "store feedback", "checkout feedback"]
    },
    {
        slug: "startup-feedback",
        title: "Feedback for Startups",
        metaTitle: "Feedback Tool for Startups & Indie Hackers | Feedinbox",
        metaDescription: "Perfect for MVP validation and early-stage products. Collect user feedback without complex setup. Free tier available.",
        description: "Startups need fast feedback loops. Get user insights without adding another tool to your stack.",
        icon: "Rocket",
        heroHeadline: "Startup-speed feedback",
        heroSubheadline: "You're moving fast. Your feedback tool should too. 2-minute setup, instant email delivery, free to start.",
        problemStatement: "Early-stage startups can't afford complex feedback tools. You need something simple, fast, and cheap—preferably free.",
        benefits: [
            { title: "Free Tier", description: "Start collecting feedback without spending a dime." },
            { title: "2-Minute Setup", description: "Copy-paste one snippet. That's the entire onboarding." },
            { title: "MVP Validation", description: "Get real user feedback to validate your ideas quickly." },
            { title: "Founder-Friendly", description: "Built by indie hackers, for indie hackers." }
        ],
        keywords: ["startup feedback tool", "mvp feedback", "indie hacker feedback", "early stage feedback"]
    },
    {
        slug: "landing-page-feedback",
        title: "Feedback for Landing Pages",
        metaTitle: "Landing Page Feedback Widget | Feedinbox",
        metaDescription: "Understand what visitors think before you launch. Collect landing page feedback and improve conversion rates.",
        description: "Your landing page is your first impression. Get feedback on what's working and what's not.",
        icon: "Layout",
        heroHeadline: "Landing page insights",
        heroSubheadline: "Before you spend money on ads, find out if your landing page actually resonates with visitors.",
        problemStatement: "You can track clicks and bounces, but you can't read minds. Sometimes you just need to ask visitors what they think.",
        benefits: [
            { title: "Pre-Launch Validation", description: "Test your messaging before going live." },
            { title: "Conversion Insights", description: "Learn why visitors convert—or don't." },
            { title: "Copy Optimization", description: "Get feedback on headlines, CTAs, and value props." },
            { title: "Quick Iterations", description: "Make changes fast based on real user input." }
        ],
        keywords: ["landing page feedback", "website feedback widget", "conversion feedback", "visitor feedback"]
    },
    {
        slug: "beta-testing-feedback",
        title: "Feedback for Beta Testing",
        metaTitle: "Beta Testing Feedback Collection | Feedinbox",
        metaDescription: "Manage beta tester feedback efficiently. Collect bug reports and suggestions from your beta users in one place.",
        description: "Beta testers are your most valuable users. Make it easy for them to share detailed feedback.",
        icon: "TestTube",
        heroHeadline: "Beta feedback, organized",
        heroSubheadline: "Your beta testers want to help. Give them an easy way to report bugs and suggest improvements.",
        problemStatement: "Beta feedback often gets scattered across Slack, email, and DMs. You need a centralized, easy way to collect it all.",
        benefits: [
            { title: "Structured Feedback", description: "Bug reports and feature requests are clearly categorized." },
            { title: "Email Aggregation", description: "All feedback lands in your inbox, organized and ready." },
            { title: "Tester-Friendly", description: "Simple widget that doesn't interrupt the testing flow." },
            { title: "Iteration Ready", description: "Turn feedback into action faster." }
        ],
        keywords: ["beta testing feedback", "beta user feedback", "beta bug reports", "beta feature requests"]
    },
    {
        slug: "website-feedback",
        title: "Feedback for Websites",
        metaTitle: "Website Feedback Tool | Feedinbox",
        metaDescription: "Collect visitor feedback on your website with a simple embedded widget. Understand user needs and improve your site.",
        description: "Every website has visitors with opinions. Give them a voice and improve your site based on real feedback.",
        icon: "Globe",
        heroHeadline: "Website feedback made simple",
        heroSubheadline: "Your visitors know what's working and what's not. Give them an easy way to tell you.",
        problemStatement: "Analytics tell you what users do, but not why. The only way to understand user intent is to ask them directly.",
        benefits: [
            { title: "Non-Intrusive Widget", description: "Sits quietly until users need it. No annoying popups." },
            { title: "All Site Types", description: "Works on blogs, portfolios, business sites, and more." },
            { title: "Easy Installation", description: "One script tag, works on any website." },
            { title: "Improvement Insights", description: "Get actionable feedback to improve your site." }
        ],
        keywords: ["website feedback", "website feedback tool", "site feedback widget", "visitor feedback"]
    },
    {
        slug: "product-feedback",
        title: "Product Feedback Management",
        metaTitle: "Product Feedback Tool | Feedinbox",
        metaDescription: "Centralize all product feedback in one place. Collect feature requests, bug reports, and user suggestions efficiently.",
        description: "Product feedback shouldn't be scattered. Collect it all in one place—your inbox.",
        icon: "Package",
        heroHeadline: "Product feedback, centralized",
        heroSubheadline: "Feature requests in Slack, bugs in email, suggestions in DMs? Bring it all together with one simple widget.",
        problemStatement: "Product feedback gets lost across multiple channels. Important insights slip through the cracks.",
        benefits: [
            { title: "Single Collection Point", description: "One widget, all feedback types, one inbox destination." },
            { title: "Feedback Types", description: "Bug reports, feature requests, and general feedback—sorted." },
            { title: "Prioritization Ready", description: "See what users want most to prioritize your roadmap." },
            { title: "Team Visibility", description: "Share feedback access with your entire team." }
        ],
        keywords: ["product feedback", "product feedback tool", "feature request collection", "user feedback management"]
    },
    {
        slug: "wordpress-feedback",
        title: "Feedback for WordPress Sites",
        metaTitle: "WordPress Feedback Widget | Feedinbox",
        metaDescription: "Add a feedback widget to your WordPress site in 2 minutes. Collect visitor feedback and receive it in your email inbox. No plugin required.",
        description: "Add a feedback widget to your WordPress site without installing a plugin. One script tag—that's it.",
        icon: "Globe",
        heroHeadline: "WordPress feedback, no plugin needed",
        heroSubheadline: "Most WordPress feedback plugins are bloated. Feedinbox is just one script tag—paste it in your theme and start collecting feedback.",
        problemStatement: "WordPress plugins add bloat, slow down your site, and create security risks. For simple feedback collection, you don't need another plugin.",
        benefits: [
            { title: "No Plugin Needed", description: "Just one script tag in your theme's footer. No plugin updates to worry about." },
            { title: "Works with Any Theme", description: "Compatible with Elementor, Divi, GeneratePress, Astra—any WordPress theme." },
            { title: "Lightweight", description: "No database queries or PHP processing. Just a client-side widget." },
            { title: "Email Delivery", description: "Feedback goes straight to your inbox, not another WordPress admin page." }
        ],
        keywords: ["wordpress feedback widget", "wordpress feedback plugin", "wordpress feedback form", "wordpress user feedback", "wordpress feedback tool free"]
    },
    {
        slug: "shopify-feedback",
        title: "Feedback for Shopify Stores",
        metaTitle: "Shopify Feedback Widget | Feedinbox",
        metaDescription: "Collect customer feedback from your Shopify store. Understand shopper needs and fix checkout issues fast. Easy script tag setup.",
        description: "Your Shopify customers want to tell you something. Give them a way to speak up—before they leave a bad review elsewhere.",
        icon: "ShoppingCart",
        heroHeadline: "Shopify customer feedback, simplified",
        heroSubheadline: "Add a feedback widget to your Shopify store in 2 minutes. Understand what customers want—and what's stopping them from buying.",
        problemStatement: "Shopify analytics tell you what customers do, but not why. Every abandoned cart has a story. Every return has a reason. You need to hear directly from your customers.",
        benefits: [
            { title: "Easy Shopify Setup", description: "Paste one script tag in your theme.liquid file. Done." },
            { title: "Checkout Insights", description: "Understand why customers abandon carts or hesitate at checkout." },
            { title: "Product Feedback", description: "Learn which products need better descriptions, sizing guides, or photos." },
            { title: "Reduce Returns", description: "Fix confusion before it becomes a return or negative review." }
        ],
        keywords: ["shopify feedback widget", "shopify customer feedback", "shopify feedback app", "shopify store feedback", "shopify feedback form"]
    },
    {
        slug: "agency-feedback",
        title: "Feedback for Digital Agencies",
        metaTitle: "Client Feedback Tool for Agencies | Feedinbox",
        metaDescription: "Collect client feedback on websites during development. Simple script tag, no client training. Feedback goes straight to your inbox.",
        description: "Agencies need client feedback without the back-and-forth. Give clients a simple way to share thoughts directly on the site.",
        icon: "Users",
        heroHeadline: "Client feedback without the chaos",
        heroSubheadline: "Stop collecting feedback in email threads, Slack messages, and PDFs. Give clients one simple button on the site.",
        problemStatement: "Client feedback gets scattered across email, Slack, WhatsApp, and Google Docs. You spend more time organizing feedback than acting on it.",
        benefits: [
            { title: "No Client Training", description: "Clients see a simple button. Click, type, submit. That's it." },
            { title: "Email Delivery", description: "You receive feedback in your inbox. No new tools for your team." },
            { title: "Multi-Project", description: "Each client project gets its own widget and feedback stream." },
            { title: "Quick Setup", description: "Add to staging sites during development. Remove when done." }
        ],
        keywords: ["client feedback tool agency", "agency feedback collection", "client website feedback", "agency client communication tool"]
    },
    {
        slug: "portfolio-feedback",
        title: "Feedback for Portfolio Sites",
        metaTitle: "Portfolio Website Feedback Widget | Feedinbox",
        metaDescription: "Collect visitor feedback on your portfolio website. Understand what potential clients think of your work. Free to start.",
        description: "Your portfolio speaks for you. Find out what visitors actually think—and what's stopping them from reaching out.",
        icon: "Palette",
        heroHeadline: "Portfolio feedback from real visitors",
        heroSubheadline: "Your portfolio gets traffic but not enough inquiries? Understand why with a simple feedback widget.",
        problemStatement: "Designers, developers, and freelancers spend hours perfecting their portfolio but never get direct feedback from visitors about what works and what doesn't.",
        benefits: [
            { title: "Visitor Insights", description: "Understand what potential clients think of your work." },
            { title: "Improve Conversions", description: "Learn why visitors don't contact you—and fix it." },
            { title: "Free to Start", description: "20 submissions/mo free. Perfect for personal sites." },
            { title: "Non-Intrusive", description: "Small button that doesn't distract from your work." }
        ],
        keywords: ["portfolio feedback widget", "freelancer feedback tool", "portfolio website feedback", "designer portfolio feedback"]
    }
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
    return useCases.find((uc) => uc.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
    return useCases.map((uc) => uc.slug);
}
