"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <SessionProvider>
            <MobileMenuProvider
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
                    <Sidebar
                        isMobileOpen={isMobileMenuOpen}
                        onMobileClose={() => setIsMobileMenuOpen(false)}
                    />
                    <main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
                </div>
            </MobileMenuProvider>
        </SessionProvider>
    );
}
