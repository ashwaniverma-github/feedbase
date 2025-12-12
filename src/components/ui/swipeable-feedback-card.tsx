"use client";

import { useState, ReactNode, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence, useAnimate } from "framer-motion";
import { Trash2, Check } from "lucide-react";

const TUTORIAL_STORAGE_KEY = "feedinbox-swipe-tutorial-seen";

interface SwipeableFeedbackCardProps {
    children: ReactNode;
    onDelete: () => void;
    onMarkAsRead: () => void;
    isRead: boolean;
    isFirstCard?: boolean;
}

export function SwipeableFeedbackCard({
    children,
    onDelete,
    onMarkAsRead,
    isRead,
    isFirstCard = false,
}: SwipeableFeedbackCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hasPlayedDemo, setHasPlayedDemo] = useState(false);
    const [scope, animate] = useAnimate();
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Use IntersectionObserver to detect when card is visible
    useEffect(() => {
        if (!isFirstCard || hasPlayedDemo) return;

        const hasSeen = localStorage.getItem(TUTORIAL_STORAGE_KEY);
        if (hasSeen) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasPlayedDemo) {
                        setHasPlayedDemo(true);
                        setShowHint(true);

                        // Start demo animation after a short delay
                        setTimeout(async () => {
                            try {
                                // Demo swipe right (mark as read)
                                await animate(scope.current, { x: 80 }, { duration: 0.5, ease: "easeOut" });
                                await new Promise(r => setTimeout(r, 400));
                                await animate(scope.current, { x: 0 }, { duration: 0.3, ease: "easeIn" });

                                await new Promise(r => setTimeout(r, 300));

                                // Demo swipe left (delete)
                                await animate(scope.current, { x: -80 }, { duration: 0.5, ease: "easeOut" });
                                await new Promise(r => setTimeout(r, 400));
                                await animate(scope.current, { x: 0 }, { duration: 0.3, ease: "easeIn" });

                                // Mark as seen and hide hint after demo
                                localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
                                setTimeout(() => setShowHint(false), 1000);
                            } catch (e) {
                                // Animation might fail if component unmounts
                            }
                        }, 500);

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of card is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isFirstCard, hasPlayedDemo, animate, scope]);

    // Transform for background colors
    const backgroundColor = useTransform(
        x,
        [-150, -50, 0, 50, 150],
        [
            "rgb(239, 68, 68)", // red-500 for delete
            "rgb(254, 202, 202)", // red-200
            "rgb(255, 255, 255)", // white
            "rgb(187, 247, 208)", // green-200
            "rgb(34, 197, 94)", // green-500 for mark as read
        ]
    );

    // Opacity for action icons
    const deleteOpacity = useTransform(x, [-100, -50], [1, 0]);
    const readOpacity = useTransform(x, [50, 100], [0, 1]);

    const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100;

        if (info.offset.x < -threshold) {
            // Swipe left - Delete
            setIsDeleting(true);
            await onDelete();
        } else if (info.offset.x > threshold && !isRead) {
            // Swipe right - Mark as read (only if not already read)
            await onMarkAsRead();
        }
    };

    return (
        <AnimatePresence>
            {!isDeleting && (
                <motion.div
                    ref={containerRef}
                    className="relative overflow-hidden rounded-xl"
                    initial={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Tutorial hint badge */}
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg"
                            >
                                ← Swipe to manage →
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Background with action indicators */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-between px-6"
                        style={{ backgroundColor }}
                    >
                        {/* Mark as Read indicator (right side, shows when swiping right) */}
                        <motion.div
                            className="flex items-center gap-2 text-green-700"
                            style={{ opacity: readOpacity }}
                        >
                            <Check className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                {isRead ? "Already read" : "Mark as read"}
                            </span>
                        </motion.div>

                        {/* Delete indicator (left side, shows when swiping left) */}
                        <motion.div
                            className="flex items-center gap-2 text-white ml-auto"
                            style={{ opacity: deleteOpacity }}
                        >
                            <span className="text-sm font-medium">Delete</span>
                            <Trash2 className="h-5 w-5" />
                        </motion.div>
                    </motion.div>

                    {/* Draggable card content */}
                    <motion.div
                        ref={scope}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        onDragEnd={handleDragEnd}
                        style={{ x }}
                        className="relative bg-card cursor-grab active:cursor-grabbing"
                        whileTap={{ cursor: "grabbing" }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

