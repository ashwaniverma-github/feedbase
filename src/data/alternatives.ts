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
    },
    {
        slug: "usersnap",
        competitorName: "Usersnap",
        metaTitle: "Feedinbox vs Usersnap - Affordable Feedback Alternative",
        metaDescription: "Usersnap starts at $69/mo. Feedinbox delivers user feedback to your inbox for $5/mo. No screenshots needed—just simple, fast feedback.",
        heroHeadline: "Usersnap alternative without the price tag",
        heroSubheadline: "Usersnap is great for visual bug tracking. But if you just need user feedback delivered to your inbox, there's a 14x cheaper way.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard only" },
            { feature: "Screenshot Annotations", feedinbox: "✗", competitor: "✓" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "15+ minutes" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "Limited free trial" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $69/mo" },
            { feature: "Session Recording", feedinbox: "✗", competitor: "✓" }
        ],
        advantages: [
            { title: "14x Cheaper", description: "Get user feedback for $5/mo instead of $69/mo." },
            { title: "Email-First", description: "Feedback lands in your inbox, not another dashboard." },
            { title: "Zero Learning Curve", description: "If you can read email, you can use Feedinbox." },
            { title: "Lighter Script", description: "Smaller widget for faster page loads." }
        ],
        keywords: ["usersnap alternative", "usersnap vs feedinbox", "cheaper than usersnap", "usersnap free alternative", "simple usersnap"]
    },
    {
        slug: "userback",
        competitorName: "Userback",
        metaTitle: "Feedinbox vs Userback - Simpler Feedback Widget",
        metaDescription: "Need a simpler Userback alternative? Feedinbox sends feedback straight to your email. No per-seat pricing, no complex setup.",
        heroHeadline: "Userback alternative without per-seat pricing",
        heroSubheadline: "Userback charges per seat. Feedinbox is one flat price for your whole team—starting at $5/mo.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard only" },
            { feature: "Visual Annotations", feedinbox: "✗", competitor: "✓" },
            { feature: "Per-Seat Pricing", feedinbox: "✗ Flat pricing", competitor: "✓ From $7/seat/mo" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "✓ Limited (7-day access)" },
            { feature: "Session Replay", feedinbox: "✗", competitor: "✓ On Business plan" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "10+ minutes" }
        ],
        advantages: [
            { title: "No Per-Seat Costs", description: "One flat price, share with your full team." },
            { title: "Email Workflow", description: "No new dashboard to check—feedback hits your inbox." },
            { title: "Truly Free Tier", description: "20 submissions/mo forever, not 7-day locked access." },
            { title: "Simpler Setup", description: "One script tag vs complex SDK setup." }
        ],
        keywords: ["userback alternative", "userback vs feedinbox", "free userback alternative", "simpler than userback"]
    },
    {
        slug: "sleekplan",
        competitorName: "Sleekplan",
        metaTitle: "Feedinbox vs Sleekplan - Email-First Feedback Alternative",
        metaDescription: "Sleekplan has public roadmaps and voting. If you just need feedback in your inbox, Feedinbox is simpler and more affordable.",
        heroHeadline: "Sleekplan alternative: feedback to inbox",
        heroSubheadline: "Sleekplan is built for public roadmaps. If you just want feedback emailed to you, try something simpler.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard/portal" },
            { feature: "Public Roadmap", feedinbox: "✗", competitor: "✓" },
            { feature: "Voting System", feedinbox: "✗", competitor: "✓" },
            { feature: "Changelog", feedinbox: "✗", competitor: "✓" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $13/mo" },
            { feature: "Setup Complexity", feedinbox: "1 script tag", competitor: "Widget + portal setup" }
        ],
        advantages: [
            { title: "Email-First", description: "Feedback in your inbox, not a portal you forget to check." },
            { title: "Simpler Tool", description: "No roadmaps or changelogs to maintain—just feedback." },
            { title: "Faster Setup", description: "One script tag. Done in 2 minutes." },
            { title: "Lower Price", description: "Start at $5/mo vs $13/mo with fewer features to pay for." }
        ],
        keywords: ["sleekplan alternative", "sleekplan vs feedinbox", "simpler than sleekplan", "sleekplan email alternative"]
    },
    {
        slug: "bugherd",
        competitorName: "BugHerd",
        metaTitle: "Feedinbox vs BugHerd - Lightweight Bug Feedback Alternative",
        metaDescription: "BugHerd starts at $50/mo for visual bug tracking. Feedinbox collects bug reports and feedback to your inbox for $5/mo.",
        heroHeadline: "BugHerd alternative for feedback collection",
        heroSubheadline: "BugHerd is built for agencies and dev teams. If you need simple feedback collection, there's a 10x cheaper option.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard" },
            { feature: "Visual Bug Pinning", feedinbox: "✗", competitor: "✓" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "15+ minutes" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "✗ 7-day trial only" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $50/mo" },
            { feature: "Per-Seat Pricing", feedinbox: "✗ Flat pricing", competitor: "✓ Extra per member" }
        ],
        advantages: [
            { title: "10x Cheaper", description: "$5/mo vs $50/mo for basic feedback needs." },
            { title: "Not Just Bugs", description: "Collect bugs, feature requests, and general feedback." },
            { title: "No Team Size Limits", description: "Flat pricing—no extra cost per team member." },
            { title: "Works Everywhere", description: "Any website, not just sites in development." }
        ],
        keywords: ["bugherd alternative", "bugherd vs feedinbox", "cheaper than bugherd", "bugherd free alternative"]
    },
    {
        slug: "marker-io",
        competitorName: "Marker.io",
        metaTitle: "Feedinbox vs Marker.io - Simple Feedback Alternative",
        metaDescription: "Marker.io starts at $39/mo for visual feedback. Feedinbox collects all types of user feedback to your inbox for just $5/mo.",
        heroHeadline: "Marker.io alternative for user feedback",
        heroSubheadline: "Marker.io is built for QA teams. If you need simple user feedback, there's an 8x cheaper way.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard + integrations" },
            { feature: "Screenshot Annotations", feedinbox: "✗", competitor: "✓" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "10+ minutes" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "Limited free plan" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $39/mo" },
            { feature: "Target Users", feedinbox: "End users & visitors", competitor: "Internal QA teams" }
        ],
        advantages: [
            { title: "8x Cheaper", description: "Collect feedback for $5/mo instead of $39/mo." },
            { title: "User-Facing Widget", description: "Built for real users, not internal QA teams." },
            { title: "Email Workflow", description: "Feedback in your inbox, no integrations needed." },
            { title: "Simpler Scope", description: "Feedback collection without the QA toolchain." }
        ],
        keywords: ["marker.io alternative", "marker io alternative", "marker.io vs feedinbox", "cheaper than marker.io", "marker io free alternative"]
    },
    {
        slug: "qualaroo",
        competitorName: "Qualaroo",
        metaTitle: "Feedinbox vs Qualaroo - Lightweight Feedback Alternative",
        metaDescription: "Qualaroo is an AI-driven survey tool. If you just need user feedback sent to your email, Feedinbox is simpler and cheaper.",
        heroHeadline: "Qualaroo alternative for quick feedback",
        heroSubheadline: "Qualaroo is great for enterprise surveys. If you want simple feedback in your inbox, try Feedinbox.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard analytics" },
            { feature: "AI Analysis", feedinbox: "✗", competitor: "✓ IBM Watson" },
            { feature: "Survey Branching", feedinbox: "✗", competitor: "✓" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "30+ minutes" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $39.99/mo" },
            { feature: "Learning Curve", feedinbox: "None", competitor: "Moderate" }
        ],
        advantages: [
            { title: "8x Cheaper", description: "$5/mo vs $39.99/mo for basic feedback." },
            { title: "Zero Complexity", description: "No survey branching to design—just a feedback widget." },
            { title: "Instant Setup", description: "One script tag vs configuring survey nudges." },
            { title: "Email Delivery", description: "Read feedback in your inbox, not a dashboard." }
        ],
        keywords: ["qualaroo alternative", "qualaroo vs feedinbox", "simple qualaroo alternative", "cheaper than qualaroo"]
    },
    {
        slug: "survicate",
        competitorName: "Survicate",
        metaTitle: "Feedinbox vs Survicate - Affordable Feedback Alternative",
        metaDescription: "Survicate starts at $99/mo for surveys. Feedinbox collects user feedback to your inbox for $5/mo. Simpler, faster, 20x cheaper.",
        heroHeadline: "Survicate alternative for simple feedback",
        heroSubheadline: "Survicate is a full survey platform. If you just need user feedback, Feedinbox does it for 20x less.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard" },
            { feature: "NPS/CSAT Surveys", feedinbox: "✗", competitor: "✓" },
            { feature: "Survey Templates", feedinbox: "✗", competitor: "✓ 125+ templates" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "20+ minutes" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $99/mo" },
            { feature: "Free Tier", feedinbox: "✓ 20 submissions/mo", competitor: "✓ 25 responses/mo" }
        ],
        advantages: [
            { title: "20x Cheaper", description: "$5/mo vs $99/mo for collecting feedback." },
            { title: "Purpose-Built", description: "A feedback widget, not a survey platform." },
            { title: "No Template Paralysis", description: "One widget, ready to go. No templates to choose from." },
            { title: "Email-First", description: "Feedback in your inbox, not buried in analytics." }
        ],
        keywords: ["survicate alternative", "survicate vs feedinbox", "cheaper than survicate", "survicate free alternative"]
    },
    {
        slug: "mopinion",
        competitorName: "Mopinion",
        metaTitle: "Feedinbox vs Mopinion - Budget-Friendly Feedback Alternative",
        metaDescription: "Mopinion starts at $229/mo. Feedinbox delivers feedback to your inbox for $5/mo. Perfect for startups and small teams.",
        heroHeadline: "Mopinion alternative for startups",
        heroSubheadline: "Mopinion is built for enterprises with big budgets. Feedinbox is built for makers who want feedback in their inbox.",
        comparison: [
            { feature: "Feedback to Email", feedinbox: "✓ Instant delivery", competitor: "✗ Dashboard analytics" },
            { feature: "Sentiment Analysis", feedinbox: "✗", competitor: "✓" },
            { feature: "Multi-Channel", feedinbox: "Web widget", competitor: "Web, email, mobile" },
            { feature: "Setup Time", feedinbox: "2 minutes", competitor: "Days to weeks" },
            { feature: "Pricing", feedinbox: "From $5/mo", competitor: "From $229/mo" },
            { feature: "Target Audience", feedinbox: "Startups & small teams", competitor: "Enterprise" }
        ],
        advantages: [
            { title: "46x Cheaper", description: "$5/mo vs $229/mo. That's not a typo." },
            { title: "Instant Setup", description: "One script tag, not an enterprise onboarding." },
            { title: "Made for Makers", description: "Built for indie hackers and small teams." },
            { title: "Email Simplicity", description: "No analytics dashboards—just feedback in your inbox." }
        ],
        keywords: ["mopinion alternative", "mopinion vs feedinbox", "affordable mopinion alternative", "cheaper than mopinion"]
    }
];

export function getAlternativeBySlug(slug: string): Alternative | undefined {
    return alternatives.find((a) => a.slug === slug);
}

export function getAllAlternativeSlugs(): string[] {
    return alternatives.map((a) => a.slug);
}
