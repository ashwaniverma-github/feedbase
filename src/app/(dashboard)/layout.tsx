"use client";

import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
                <Sidebar />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </SessionProvider>
    );
}

