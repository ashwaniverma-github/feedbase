import { cn } from "@/lib/utils";

interface BadgeProps {
    variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline";
    children: React.ReactNode;
    className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200",
                {
                    "bg-primary text-primary-foreground": variant === "default",
                    "bg-secondary text-secondary-foreground": variant === "secondary",
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": variant === "success",
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400": variant === "warning",
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": variant === "destructive",
                    "border border-border bg-transparent text-muted-foreground": variant === "outline",
                },
                className
            )}
        >
            {children}
        </span>
    );
}

