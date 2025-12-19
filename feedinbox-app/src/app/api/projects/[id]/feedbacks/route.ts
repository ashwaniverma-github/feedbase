import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/projects/[id]/feedbacks - List feedbacks for a project
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        const { id } = await params;
        const { searchParams } = new URL(request.url);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify project ownership
        const project = await prisma.project.findFirst({
            where: { id, userId: session.user.id },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Parse filters
        const category = searchParams.get("category") || "all";
        const isRead = searchParams.get("isRead") || "all";
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");

        // Build where clause
        const where: Record<string, unknown> = { projectId: id };

        if (category !== "all") {
            where.category = category;
        }

        if (isRead !== "all") {
            where.isRead = isRead === "read";
        }

        if (search) {
            where.OR = [
                { message: { contains: search, mode: "insensitive" } },
                { userEmail: { contains: search, mode: "insensitive" } },
            ];
        }

        const [feedbacks, total] = await Promise.all([
            prisma.feedback.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.feedback.count({ where }),
        ]);

        return NextResponse.json({
            feedbacks,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return NextResponse.json(
            { error: "Failed to fetch feedbacks" },
            { status: 500 }
        );
    }
}
