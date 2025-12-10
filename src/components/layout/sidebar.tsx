"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, Settings, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside className="flex h-screen w-72 flex-col border-r border-border bg-card/80 backdrop-blur-xl">
            {/* Logo */}
            <div className="flex h-16 items-center px-6 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-3 text-lg font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-md">
                        <div className="h-4 w-4 rounded-sm bg-primary-foreground" />
                    </div>
                    Feedinbox
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Menu
                </div>
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "h-5 w-5 transition-colors duration-200",
                                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                            )} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Theme Toggle */}
            <div className="px-4 py-3 border-t border-border">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Theme</span>
                    <ThemeToggle />
                </div>
            </div>

            {/* User section */}
            <div className="border-t border-border p-4 bg-muted/30">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:bg-accent/50 transition-all duration-200">
                    <Avatar src={session?.user?.image} name={session?.user?.name} size="sm" />
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-foreground">{session?.user?.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{session?.user?.email}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                        title="Sign out"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}

