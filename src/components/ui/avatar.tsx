import { cn } from "@/lib/utils";

interface AvatarProps {
    src?: string | null;
    name?: string | null;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
    const initials = name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "?";

    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    };

    if (src) {
        return (
            <img
                src={src}
                alt={name || "Avatar"}
                className={cn(
                    "rounded-full object-cover",
                    sizeClasses[size],
                    className
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full bg-neutral-200 font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
                sizeClasses[size],
                className
            )}
        >
            {initials}
        </div>
    );
}
