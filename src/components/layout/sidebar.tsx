"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, Settings, LogOut, ChevronRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { PricingModal } from "@/components/ui/pricing-modal";
import Image from "next/image";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/settings", label: "Settings", icon: Settings },
];

// Animation variants - tuned for smooth, satisfying motion
const sidebarVariants = {
    expanded: {
        width: 288,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 25,
            mass: 1,
            staggerChildren: 0.03,
            delayChildren: 0.1
        }
    },
    collapsed: {
        width: 80,
        transition: {
            type: "spring" as const,
            stiffness: 200,
            damping: 25,
            mass: 1,
            staggerChildren: 0.02,
            staggerDirection: -1
        }
    },
};

const textVariants = {
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 250,
            damping: 20,
            mass: 0.5
        }
    },
    hidden: {
        opacity: 0,
        x: -8,
        scale: 0.95,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 30
        }
    },
};

const navItemVariants = {
    expanded: (index: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * 0.04,
            type: "spring" as const,
            stiffness: 250,
            damping: 22
        }
    }),
    collapsed: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 30
        }
    },
};

const iconVariants = {
    hover: {
        scale: 1.2,
        rotate: 5,
        transition: { type: "spring" as const, stiffness: 400, damping: 15 }
    },
    tap: {
        scale: 0.9,
        transition: { type: "spring" as const, stiffness: 500, damping: 20 }
    },
};

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);

    return (
        <>
            <motion.aside
                initial={false}
                animate={isCollapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
                className="flex h-screen flex-col border-r border-border bg-card/80 backdrop-blur-xl overflow-hidden"
            >
                {/* Logo */}
                <div className={cn(
                    "flex h-16 items-center border-b border-border",
                    isCollapsed ? "justify-center px-0" : "px-6"
                )}>
                    <Link href="/dashboard" className="flex items-center gap-3 text-lg font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
                        <motion.div
                            className="flex h-8 w-8 items-center justify-center rounded-lg shadow-md shrink-0 overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/feedinbox.png"
                                alt="Feedinbox"
                                width={120}
                                height={32}
                                className="rounded-full object-cover object-left"
                            />
                        </motion.div>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.span
                                    key="logo-text"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={textVariants}
                                    className="whitespace-nowrap"
                                >
                                    Feedinbox
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                    <AnimatePresence mode="wait">
                        {!isCollapsed && (
                            <motion.div
                                key="menu-label"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                            >
                                Menu
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {navItems.map((item, index) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <motion.div
                                key={item.href}
                                custom={index}
                                variants={navItemVariants}
                                initial={false}
                                animate={isCollapsed ? "collapsed" : "expanded"}
                            >
                                <Link
                                    href={item.href}
                                    title={isCollapsed ? item.label : undefined}
                                    className={cn(
                                        "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                        isCollapsed ? "justify-center" : "gap-3"
                                    )}
                                >
                                    <motion.div
                                        variants={iconVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <item.icon className={cn(
                                            "h-5 w-5 shrink-0",
                                            isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                                        )} />
                                    </motion.div>
                                    <AnimatePresence mode="wait">
                                        {!isCollapsed && (
                                            <motion.span
                                                key={`nav-${item.href}`}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                variants={textVariants}
                                                className="whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* Collapse Toggle */}
                <div className="px-4 py-2 flex justify-end">
                    <motion.button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <motion.div
                            animate={{ rotate: isCollapsed ? 0 : 180 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Pro Badge or Upgrade Button */}
                <div className="px-4 pb-2">
                    {session?.user?.subscriptionStatus === "active" ? (
                        /* Pro Badge */
                        <div
                            className={cn(
                                "w-full flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm font-medium text-green-600 dark:text-green-400",
                                isCollapsed ? "justify-center p-2" : ""
                            )}
                            title={isCollapsed ? "Pro Plan Active" : undefined}
                        >
                            <img src="/feedinbox.png" alt="Pro" className="h-5 w-5 shrink-0 rounded-full" />
                            <AnimatePresence mode="wait">
                                {!isCollapsed && (
                                    <motion.span
                                        key="pro-text"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={textVariants}
                                        className="whitespace-nowrap"
                                    >
                                        Pro Plan
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        /* Upgrade Button */
                        <motion.button
                            onClick={() => setIsPricingOpen(true)}
                            className={cn(
                                "w-full flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:border-primary/30",
                                isCollapsed ? "justify-center p-2" : ""
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            title={isCollapsed ? "Upgrade to Pro" : undefined}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <img src="/feedinbox.png" alt="Pro" className="h-5 w-5 shrink-0 rounded-full" />
                            </motion.div>
                            <AnimatePresence mode="wait">
                                {!isCollapsed && (
                                    <motion.span
                                        key="upgrade-text"
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        variants={textVariants}
                                        className="whitespace-nowrap"
                                    >
                                        Upgrade to Pro
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )}
                </div>

                {/* User section */}
                <div className="border-t border-border p-4 bg-muted/30">
                    <motion.div
                        className={cn(
                            "flex items-center gap-3 rounded-xl border border-border bg-card p-3",
                            isCollapsed ? "justify-center p-2" : ""
                        )}
                        whileHover={{
                            backgroundColor: "var(--accent)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Avatar src={session?.user?.image} name={session?.user?.name} size="sm" />
                        </motion.div>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.div
                                    key="user-info"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={textVariants}
                                    className="flex-1 overflow-hidden"
                                >
                                    <p className="truncate text-sm font-medium text-foreground">{session?.user?.name}</p>
                                    <p className="truncate text-xs text-muted-foreground">{session?.user?.email}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            {!isCollapsed && (
                                <motion.button
                                    key="logout-btn"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                    title="Sign out"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <LogOut className="h-4 w-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.aside>

            {/* Pricing Modal */}
            <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        </>
    );
}


