import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
                    {
                        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow":
                            variant === "primary",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
                            variant === "secondary",
                        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                        "bg-destructive text-white hover:bg-destructive/90": variant === "destructive",
                    },
                    {
                        "h-8 px-3 text-sm rounded-md": size === "sm",
                        "h-10 px-4 text-sm rounded-lg": size === "md",
                        "h-12 px-6 text-base rounded-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };

