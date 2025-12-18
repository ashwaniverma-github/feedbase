import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const LTD_LIMIT = 50;

/**
 * GET /api/ltd-count
 * Returns count of lifetime deal users and remaining slots
 */
export async function GET() {
    try {
        const count = await prisma.user.count({
            where: {
                dodoPlanCadence: "lifetime",
            },
        });

        return NextResponse.json({
            count,
            limit: LTD_LIMIT,
            remaining: Math.max(0, LTD_LIMIT - count),
            soldOut: count >= LTD_LIMIT,
        });
    } catch (err: any) {
        console.error("LTD count error:", err?.message || err);
        return NextResponse.json(
            { error: "Failed to get LTD count" },
            { status: 500 }
        );
    }
}
