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

        // Get range from query params (default to 30d)
        const { searchParams } = new URL(request.url);
        const range = searchParams.get("range") || "30d";

        // Verify project ownership
        const project = await prisma.project.findFirst({
            where: { id, userId: session.user.id },
        });

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // Calculate date range
        let startDate: Date;
        let groupByFormat: "hour" | "day" = "day";

        switch (range) {
            case "today":
                startDate = new Date(new Date().setHours(0, 0, 0, 0));
                groupByFormat = "hour";
                break;
            case "7d":
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                break;
            case "30d":
            default:
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                break;
        }

        // Get various counts
        const [total, unread, byCategory, today, thisWeek, feedbacksInRange] = await Promise.all([
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
            prisma.feedback.findMany({
                where: {
                    projectId: id,
                    createdAt: { gte: startDate },
                },
                select: { createdAt: true, category: true },
                orderBy: { createdAt: "asc" },
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

        // Generate chart data with category breakdown
        const chartData = generateChartData(feedbacksInRange, range, startDate);

        return NextResponse.json({
            total,
            unread,
            today,
            thisWeek,
            categories,
            chartData,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json(
            { error: "Failed to fetch analytics" },
            { status: 500 }
        );
    }
}

interface ChartDataPoint {
    date: number;
    label: string;
    count: number;
    general: number;
    bug: number;
    feature: number;
    question: number;
}

function generateChartData(
    feedbacks: { createdAt: Date; category: string }[],
    range: string,
    startDate: Date
): ChartDataPoint[] {
    const dataMap = new Map<string, { count: number; general: number; bug: number; feature: number; question: number }>();

    const defaultCounts = () => ({ count: 0, general: 0, bug: 0, feature: 0, question: 0 });

    // Initialize all time slots with 0
    if (range === "today") {
        // 24 hours
        for (let i = 0; i < 24; i++) {
            const hour = new Date(startDate);
            hour.setHours(i);
            const key = `${hour.getHours()}:00`;
            dataMap.set(key, defaultCounts());
        }
    } else {
        // Days
        const days = range === "7d" ? 7 : 30;
        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const key = date.toISOString().split("T")[0];
            dataMap.set(key, defaultCounts());
        }
    }

    // Count feedbacks by category
    feedbacks.forEach((feedback) => {
        const date = new Date(feedback.createdAt);
        let key: string;

        if (range === "today") {
            key = `${date.getHours()}:00`;
        } else {
            key = date.toISOString().split("T")[0];
        }

        const current = dataMap.get(key) || defaultCounts();
        current.count += 1;

        // Increment category count
        const category = feedback.category as keyof Omit<typeof current, "count">;
        if (category in current) {
            current[category] += 1;
        }

        dataMap.set(key, current);
    });

    // Convert to array format
    return Array.from(dataMap.entries()).map(([key, counts]) => {
        let label: string;
        let timestamp: number;

        if (range === "today") {
            const hour = parseInt(key.split(":")[0]);
            const date = new Date(startDate);
            date.setHours(hour);
            timestamp = date.getTime();
            label = key;
        } else {
            const date = new Date(key);
            timestamp = date.getTime();
            label = new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
            }).format(date);
        }

        return {
            date: timestamp,
            label,
            ...counts,
        };
    });
}

