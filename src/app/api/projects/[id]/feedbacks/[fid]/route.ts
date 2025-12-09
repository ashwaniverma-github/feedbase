import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/projects/[id]/feedbacks/[fid] - Get single feedback
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string; fid: string }> }
) {
    try {
        const session = await auth();
        const { id, fid } = await params;

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

        const feedback = await prisma.feedback.findFirst({
            where: { id: fid, projectId: id },
        });

        if (!feedback) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        return NextResponse.json(feedback);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return NextResponse.json(
            { error: "Failed to fetch feedback" },
            { status: 500 }
        );
    }
}

// PATCH /api/projects/[id]/feedbacks/[fid] - Update feedback (mark read, change category)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string; fid: string }> }
) {
    try {
        const session = await auth();
        const { id, fid } = await params;

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

        const body = await request.json();
        const { isRead, category } = body;

        const feedback = await prisma.feedback.updateMany({
            where: { id: fid, projectId: id },
            data: {
                ...(typeof isRead === "boolean" && { isRead }),
                ...(category && { category }),
            },
        });

        if (feedback.count === 0) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        const updated = await prisma.feedback.findUnique({ where: { id: fid } });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating feedback:", error);
        return NextResponse.json(
            { error: "Failed to update feedback" },
            { status: 500 }
        );
    }
}

// DELETE /api/projects/[id]/feedbacks/[fid] - Delete feedback
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string; fid: string }> }
) {
    try {
        const session = await auth();
        const { id, fid } = await params;

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

        const feedback = await prisma.feedback.deleteMany({
            where: { id: fid, projectId: id },
        });

        if (feedback.count === 0) {
            return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return NextResponse.json(
            { error: "Failed to delete feedback" },
            { status: 500 }
        );
    }
}
