export interface Alternative {
    slug: string;
    competitorName: string;
    metaTitle: string;
    metaDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    comparison: {
        feature: string;
        feedinbox: string;
        competitor: string;
    }[];
    advantages: {
        title: string;
        description: string;
    }[];
    keywords: string[];
}

export const alternatives: Alternative[] = [
    {
        slug: "canny",
        competitorName: "Canny",
        metaTitle: "Feedinbox vs Canny - Simpler Feedback Alternative",
        metaDescription: "Looking for a Canny alternative? Feedinbox delivers feedback to your inbox, not another dashboard. Simpler, faster, more affordable.",
        heroHeadline: "Canny alternative that emails you",
        heroSubheadline: "Canny is powerful but complex. If you just want feedback in your inbox without the overhead, try Feedinbox.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard only" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "30+ minutes" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "✗ No free tier" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $79/mo" },
            { feature: "Public Roadmap", feedinbox: "✗", competitor: "✓" },
            { feature: "Voting System", feedinbox: "✗", competitor: "✓" }
        ],
        advantages: [
            { title: "Email-First Approach", description: "Feedback lands in your inbox, not hidden in a dashboard." },
            { title: "10x Cheaper", description: "Get started for $5/mo instead of $79/mo." },
            { title: "Zero Learning Curve", description: "If you can read email, you can use Feedinbox." },
            { title: "Perfect for Indie Hackers", description: "Built for small teams who need simplicity." }
        ],
        keywords: ["canny alternative", "canny vs feedinbox", "simpler than canny", "cheaper than canny"]
    },
    {
        slug: "uservoice",
        competitorName: "UserVoice",
        metaTitle: "Feedinbox vs UserVoice - Lightweight Alternative",
        metaDescription: "Need a simpler UserVoice alternative? Feedinbox sends feedback directly to your email. No complex setup, no enterprise pricing.",
        heroHeadline: "UserVoice alternative for the rest of us",
        heroSubheadline: "UserVoice is built for enterprises. Feedinbox is built for indie hackers and small teams.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Requires setup" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "Hours to days" },
            { feature: "Self-Serve Signup", feedinbox: "✓", competitor: "✗ Sales required" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $799/mo" },
            { feature: "Enterprise Features", feedinbox: "✗", competitor: "✓" }
        ],
        advantages: [
            { title: "No Sales Calls", description: "Sign up and start collecting feedback in 2 minutes." },
            { title: "100x Cheaper", description: "Enterprise pricing not required." },
            { title: "Simple by Design", description: "Collect feedback, get emails. That's it." },
            { title: "Indie-Friendly", description: "Built for makers, not corporations." }
        ],
        keywords: ["uservoice alternative", "uservoice vs feedinbox", "simple uservoice", "cheap uservoice alternative"]
    },
    {
        slug: "productboard",
        competitorName: "Productboard",
        metaTitle: "Feedinbox vs Productboard - Affordable Alternative",
        metaDescription: "Productboard too complex? Feedinbox offers simple feedback collection with email delivery. Perfect for early-stage products.",
        heroHeadline: "Productboard alternative for early-stage",
        heroSubheadline: "Productboard is great for scaling teams. But if you're just starting, you need something simpler.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard only" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "Weeks" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "✗ Free trial only" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $25/user/mo" },
            { feature: "Road Mapping", feedinbox: "✗", competitor: "✓" }
        ],
        advantages: [
            { title: "Start Simple", description: "Collect feedback now, upgrade tools later." },
            { title: "No Per-Seat Pricing", description: "One price, share with your whole team." },
            { title: "Email Workflow", description: "Use your existing email workflow, not a new tool." },
            { title: "MVP Perfect", description: "Ideal for validating early-stage products." }
        ],
        keywords: ["productboard alternative", "productboard vs feedinbox", "simple productboard", "affordable productboard"]
    },
    {
        slug: "typeform",
        competitorName: "Typeform",
        metaTitle: "Feedinbox vs Typeform - Embedded Feedback Alternative",
        metaDescription: "Typeform requires leaving your app. Feedinbox embeds directly in your site for frictionless feedback collection.",
        heroHeadline: "Feedback widget, not a survey form",
        heroSubheadline: "Typeform is great for surveys. But for in-app feedback, you need something embedded.",
        comparison: [
            { feature: "In-App Widget", feedinbox: "✓ Always visible", competitor: "✗ Separate page" },
            { feature: "Feedback Types", feedinbox: "Bugs, features, thoughts", competitor: "Survey responses" },
            { feature: "User Friction", feedinbox: "Low - one click", competitor: "High - leave app" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $25/mo" },
            { feature: "Real-time Alerts", feedinbox: "✓ Email instant", competitor: "✗ Delayed" }
        ],
        advantages: [
            { title: "Zero Context Switch", description: "Users don't leave your app to give feedback." },
            { title: "Purpose-Built", description: "Designed for feedback, not generic surveys." },
            { title: "Instant Notifications", description: "Get feedback the moment it's submitted." },
            { title: "Higher Response Rate", description: "Embedded widgets get more submissions." }
        ],
        keywords: ["typeform alternative", "typeform vs feedinbox", "embedded feedback", "in-app feedback"]
    },
    {
        slug: "hotjar",
        competitorName: "Hotjar",
        metaTitle: "Feedinbox vs Hotjar - Focused Feedback Alternative",
        metaDescription: "Need feedback without heatmaps? Feedinbox focuses on collecting user feedback and delivering it to your inbox.",
        heroHeadline: "Feedback without the analytics bloat",
        heroSubheadline: "Hotjar does a lot. If you just need feedback collection with email delivery, try Feedinbox.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard" },
            { feature: "Heatmaps", feedinbox: "✗", competitor: "✓" },
            { feature: "Session Recording", feedinbox: "✗", competitor: "✓" },
            { feature: "Focus", feedinbox: "Feedback only", competitor: "All-in-one" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $32/mo" }
        ],
        advantages: [
            { title: "Focused Tool", description: "Does one thing really well: feedback to inbox." },
            { title: "Lighter Weight", description: "Smaller script, faster load times." },
            { title: "Simpler Pricing", description: "No complex tiers based on sessions." },
            { title: "Email Workflow", description: "Fits into how you already work." }
        ],
        keywords: ["hotjar alternative", "hotjar vs feedinbox", "simple hotjar", "feedback only tool"]
    },
    {
        slug: "intercom",
        competitorName: "Intercom",
        metaTitle: "Feedinbox vs Intercom - Lightweight Feedback Alternative",
        metaDescription: "Intercom is powerful but expensive. For simple feedback collection to your inbox, try Feedinbox.",
        heroHeadline: "Feedback without the chat overhead",
        heroSubheadline: "Intercom is for customer support. If you just need feedback, there's a simpler way.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Requires inbox" },
            { feature: "Live Chat", feedinbox: "✗", competitor: "✓" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "Hours" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $74/mo" },
            { feature: "Learning Curve", feedinbox: "None", competitor: "Steep" }
        ],
        advantages: [
            { title: "Feedback Focus", description: "Collect feedback without managing conversations." },
            { title: "15x Cheaper", description: "Fraction of the cost for feedback needs." },
            { title: "No Training Required", description: "Your team already knows how to use email." },
            { title: "Lightweight", description: "Just the feedback feature, no bloat." }
        ],
        keywords: ["intercom alternative", "intercom vs feedinbox", "simple intercom", "cheap intercom alternative"]
    },
    {
        slug: "zendesk",
        competitorName: "Zendesk",
        metaTitle: "Feedinbox vs Zendesk - Simple Feedback Alternative",
        metaDescription: "Zendesk is for support teams. For simple user feedback to your inbox, Feedinbox is the lighter choice.",
        heroHeadline: "Simple alternative to Zendesk",
        heroSubheadline: "Zendesk is a full support suite. Feedinbox is just feedback, delivered to your inbox.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Ticket system" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "Days to weeks" },
            { feature: "Ticketing System", feedinbox: "✗", competitor: "✓" },
            { feature: "Knowledge Base", feedinbox: "✗", competitor: "✓" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $19/agent/mo" }
        ],
        advantages: [
            { title: "Zero Overhead", description: "No ticket management, just feedback in email." },
            { title: "Instant Setup", description: "Start collecting in 2 minutes." },
            { title: "No Per-Agent Pricing", description: "One price for your whole team." },
            { title: "Perfect for Small Teams", description: "Built for makers, not support departments." }
        ],
        keywords: ["zendesk alternative", "zendesk vs feedinbox", "simple zendesk", "feedback tool alternative"]
    }
];

export function getAlternativeBySlug(slug: string): Alternative | undefined {
    return alternatives.find((a) => a.slug === slug);
}

export function getAllAlternativeSlugs(): string[] {
    return alternatives.map((a) => a.slug);
}
