import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createFeedbackSchema } from "@/lib/validations";
import { resend, FROM_EMAIL } from "@/lib/email";
import NewFeedbackEmail from "@/emails/new-feedback";
import { canReceiveFeedback } from "@/lib/tiers";

// POST /api/widget/feedback - Public endpoint for widget to submit feedback
export async function POST(request: Request) {
    try {
        const origin = request.headers.get("origin");
        const body = await request.json();
        const validated = createFeedbackSchema.safeParse(body);

        if (!validated.success) {
            return corsResponse(
                NextResponse.json(
                    { error: "Validation failed", details: validated.error.flatten() },
                    { status: 400 }
                ),
                origin
            );
        }

        // Find project with owner info
        const project = await prisma.project.findUnique({
            where: { widgetKey: validated.data.projectKey },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        if (!project) {
            return corsResponse(
                NextResponse.json({ error: "Invalid project key" }, { status: 404 }),
                origin
            );
        }

        // Check if project owner can receive more feedback this month
        const canReceive = await canReceiveFeedback(project.userId);
        if (!canReceive.allowed) {
            return corsResponse(
                NextResponse.json(
                    {
                        error: "This project has reached its monthly feedback limit",
                        code: "FEEDBACK_LIMIT_REACHED",
                    },
                    { status: 429 }
                ),
                origin
            );
        }

        const feedback = await prisma.feedback.create({
            data: {
                projectId: project.id,
                message: validated.data.message,
                category: validated.data.category,
                userEmail: validated.data.userEmail || null,
                pageUrl: validated.data.pageUrl || null,
                userAgent: request.headers.get("user-agent") || null,
            },
        });

        // Send email notification to project owner (non-blocking)
        if (project.user?.email) {
            const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
            const dashboardUrl = `${baseUrl}/projects/${project.id}`;

            resend.emails.send({
                from: FROM_EMAIL,
                to: project.user.email,
                subject: `New ${validated.data.category} feedback on ${project.name}`,
                react: NewFeedbackEmail({
                    projectName: project.name,
                    ownerName: project.user.name || "there",
                    category: validated.data.category,
                    message: validated.data.message,
                    userEmail: validated.data.userEmail,
                    pageUrl: validated.data.pageUrl,
                    submittedAt: new Date().toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }),
                    dashboardUrl,
                }),
            }).catch((error) => {
                console.error("Failed to send email notification:", error);
            });
        }

        return corsResponse(
            NextResponse.json({ success: true, id: feedback.id }, { status: 201 }),
            origin
        );
    } catch (error) {
        console.error("Error creating feedback:", error);
        return corsResponse(
            NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 }),
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
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    response.headers.set("Access-Control-Max-Age", "86400");
    return response;
}

