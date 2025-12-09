import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Loading({ size = "md", className }: LoadingProps) {
    return (
        <Loader2
            className={cn(
                "animate-spin text-neutral-400",
                {
                    "h-4 w-4": size === "sm",
                    "h-6 w-6": size === "md",
                    "h-8 w-8": size === "lg",
                },
                className
            )}
        />
    );
}

export function LoadingPage() {
    return (
        <div className="flex min-h-[400px] items-center justify-center">
            <Loading size="lg" />
        </div>
    );
}
