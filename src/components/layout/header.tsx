interface HeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function Header({ title, description, action }: HeaderProps) {
    return (
        <div className="flex items-center justify-between border-b border-border bg-card/80 px-8 py-6 backdrop-blur-xl sticky top-0 z-10 transition-colors duration-300">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

