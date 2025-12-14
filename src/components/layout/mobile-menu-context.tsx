"use client";

import { createContext, useContext, ReactNode } from "react";

interface MobileMenuContextType {
    isOpen: boolean;
    onToggle: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export function MobileMenuProvider({
    children,
    isOpen,
    onToggle
}: {
    children: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <MobileMenuContext.Provider value={{ isOpen, onToggle }}>
            {children}
        </MobileMenuContext.Provider>
    );
}

export function useMobileMenu() {
    const context = useContext(MobileMenuContext);
    if (!context) {
        throw new Error("useMobileMenu must be used within MobileMenuProvider");
    }
    return context;
}
