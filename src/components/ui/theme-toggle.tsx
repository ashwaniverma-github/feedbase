"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const containerRef = useRef<HTMLButtonElement>(null);

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

    // Toggle between light and dark
    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newTheme = theme === "dark" ? "light" : "dark";
        handleThemeChange(newTheme, event);
    };

    if (!mounted) {
        return (
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-muted ring-1 ring-border">
                <div className="h-4 w-4 animate-pulse rounded-full bg-muted-foreground/20" />
            </button>
        );
    }

    return (
        <button
            ref={containerRef as React.RefObject<HTMLButtonElement>}
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-muted ring-1 ring-border text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 transition-all duration-300"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </button>
    );
}

