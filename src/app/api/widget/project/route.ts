import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPro } from "@/lib/tiers";

// Default widget settings
const DEFAULT_WIDGET_SETTINGS = {
    primaryColor: "#171717",
    position: "bottom-right",
    triggerIcon: "chat",
    borderRadius: 16,
    showEmail: true,
    headerText: "Send Feedback",
    hideBranding: false,
};

// GET /api/widget/project - Get project info for widget (includes Pro status and settings)
export async function GET(request: Request) {
    try {
        const origin = request.headers.get("origin");
        const url = new URL(request.url);
        const projectKey = url.searchParams.get("key");

        if (!projectKey) {
            return corsResponse(
                NextResponse.json({ error: "Missing project key" }, { status: 400 }),
                origin
            );
        }

        const project = await prisma.project.findUnique({
            where: { widgetKey: projectKey },
            select: {
                id: true,
                name: true,
                userId: true,
                settings: true,
            },
        });

        if (!project) {
            return corsResponse(
                NextResponse.json({ error: "Invalid project key" }, { status: 404 }),
                origin
            );
        }

        // Check if project owner is Pro
        const ownerIsPro = await isPro(project.userId);

        // Get widget settings (only apply custom settings for Pro users)
        const projectSettings = (project.settings as any)?.widget || {};
        const widgetSettings = ownerIsPro
            ? { ...DEFAULT_WIDGET_SETTINGS, ...projectSettings }
            : DEFAULT_WIDGET_SETTINGS;

        // hideBranding only works if user is Pro AND has enabled it
        const hideBranding = ownerIsPro && widgetSettings.hideBranding === true;

        return corsResponse(
            NextResponse.json({
                projectId: project.id,
                projectName: project.name,
                hideBranding: hideBranding,
                widget: widgetSettings,
            }),
            origin
        );
    } catch (error) {
        console.error("Error fetching project info:", error);
        return corsResponse(
            NextResponse.json({ error: "Failed to fetch project info" }, { status: 500 }),
            null
        );
    }
}

export async function OPTIONS(request: Request) {
    const origin = request.headers.get("origin");
    return corsResponse(new NextResponse(null, { status: 204 }), origin);
}

function corsResponse(response: NextResponse, origin: string | null): NextResponse {
    response.headers.set("Access-Control-Allow-Origin", origin || "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Max-Age", "86400");
    return response;
}
