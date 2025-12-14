"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenuButton } from "@/components/layout/sidebar";
import { useMobileMenu } from "@/components/layout/mobile-menu-context";

interface HeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function Header({ title, description, action }: HeaderProps) {
    const { onToggle } = useMobileMenu();

    return (
        <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 md:px-8 py-4 md:py-6 backdrop-blur-xl sticky top-0 z-10 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <MobileMenuButton onClick={onToggle} />
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
                <ThemeToggle />
                {action && <div>{action}</div>}
            </div>
        </div>
    );
}
