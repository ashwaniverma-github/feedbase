import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPro } from "@/lib/tiers";

// GET /api/widget/project - Get project info for widget (includes Pro status)
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

        return corsResponse(
            NextResponse.json({
                projectId: project.id,
                projectName: project.name,
                hideBranding: ownerIsPro, // Pro users get branding hidden by default
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
