"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = async (newTheme: string, event: React.MouseEvent<HTMLButtonElement>) => {
        if (newTheme === theme) return;

        // Get click position for the animation origin
        const x = event.clientX;
        const y = event.clientY;

        // Check if View Transitions API is supported
        if (
            typeof document !== "undefined" &&
            "startViewTransition" in document &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            // Set CSS custom properties for animation origin
            document.documentElement.style.setProperty("--theme-transition-x", `${x}px`);
            document.documentElement.style.setProperty("--theme-transition-y", `${y}px`);

            // Start the view transition
            await (document as any).startViewTransition(() => {
                setTheme(newTheme);
            }).ready;
        } else {
            // Fallback for browsers without View Transitions
            setTheme(newTheme);
        }
    };

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
                <div className="h-7 w-7 animate-pulse rounded-full bg-white/10" />
                <div className="h-7 w-7 animate-pulse rounded-full bg-white/10" />
                <div className="h-7 w-7 animate-pulse rounded-full bg-white/10" />
            </div>
        );
    }

    const modes = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
        { value: "system", icon: Monitor, label: "System" },
    ];

    return (
        <div ref={containerRef} className="flex items-center gap-1 rounded-full bg-muted p-1 ring-1 ring-border">
            {modes.map((mode) => (
                <button
                    key={mode.value}
                    onClick={(e) => handleThemeChange(mode.value, e)}
                    className={cn(
                        "relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300",
                        theme === mode.value
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                    )}
                    title={mode.label}
                >
                    <mode.icon className="h-4 w-4" />
                    {theme === mode.value && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-primary/20 animate-in zoom-in-50 duration-200" />
                    )}
                </button>
            ))}
        </div>
    );
}

