import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/projects/[id]/analytics - Get analytics for a project
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        const { id } = await params;

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

        // Get various counts
        const [total, unread, byCategory, today, thisWeek] = await Promise.all([
            prisma.feedback.count({ where: { projectId: id } }),
            prisma.feedback.count({ where: { projectId: id, isRead: false } }),
            prisma.feedback.groupBy({
                by: ["category"],
                where: { projectId: id },
                _count: { category: true },
            }),
            prisma.feedback.count({
                where: {
                    projectId: id,
                    createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
                },
            }),
            prisma.feedback.count({
                where: {
                    projectId: id,
                    createdAt: {
                        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            }),
        ]);

        // Format category counts
        const categories = {
            general: 0,
            bug: 0,
            feature: 0,
            question: 0,
        };
        byCategory.forEach((item) => {
            if (item.category in categories) {
                categories[item.category as keyof typeof categories] = item._count.category;
            }
        });

        return NextResponse.json({
            total,
            unread,
            today,
            thisWeek,
            categories,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        );
    }
}
