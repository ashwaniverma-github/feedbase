"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, HelpCircle, Lightbulb, Star, X } from "lucide-react";

interface WidgetPreviewProps {
    primaryColor: string;
    position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    triggerIcon: "chat" | "feedback" | "question" | "lightbulb" | "star";
    borderRadius: number;
    headerText: string;
    showEmail: boolean;
    hideBranding: boolean;
}

const ICONS = {
    chat: MessageSquare,
    feedback: ThumbsUp,
    question: HelpCircle,
    lightbulb: Lightbulb,
    star: Star,
};

export function WidgetPreview({
    primaryColor,
    position,
    triggerIcon,
    borderRadius,
    headerText,
    showEmail,
    hideBranding,
}: WidgetPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = ICONS[triggerIcon];

    const posRight = position.includes("right");
    const posBottom = position.includes("bottom");

    return (
        <div className="relative w-full h-[500px] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl overflow-hidden border border-border">
            {/* Simulated page content */}
            <div className="absolute inset-4 bg-card rounded-xl border border-border shadow-sm p-6">
                <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-20 bg-muted rounded mt-4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                </div>
            </div>

            {/* Widget Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute flex items-center justify-center w-12 h-12 rounded-full shadow-lg cursor-pointer"
                style={{
                    backgroundColor: primaryColor,
                    right: posRight ? 16 : "auto",
                    left: posRight ? "auto" : 16,
                    bottom: posBottom ? 16 : "auto",
                    top: posBottom ? "auto" : 16,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Icon className="w-5 h-5 text-white" />
            </motion.button>

            {/* Widget Modal */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0.95,
                    y: isOpen ? 0 : 10,
                }}
                className="absolute bg-card border border-border shadow-2xl"
                style={{
                    width: 320,
                    borderRadius: `${borderRadius}px`,
                    right: posRight ? 16 : "auto",
                    left: posRight ? "auto" : 16,
                    bottom: posBottom ? 80 : "auto",
                    top: posBottom ? "auto" : 80,
                    pointerEvents: isOpen ? "auto" : "none",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">{headerText}</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded hover:bg-muted text-muted-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Message</label>
                        <div
                            className="w-full h-20 bg-muted rounded-lg border border-border"
                            style={{ borderRadius: `${Math.min(borderRadius, 12)}px` }}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Category</label>
                        <div
                            className="w-full h-10 bg-muted rounded-lg border border-border"
                            style={{ borderRadius: `${Math.min(borderRadius, 12)}px` }}
                        />
                    </div>

                    {showEmail && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <div
                                className="w-full h-10 bg-muted rounded-lg border border-border"
                                style={{ borderRadius: `${Math.min(borderRadius, 12)}px` }}
                            />
                        </div>
                    )}

                    <button
                        className="w-full py-2.5 text-sm font-medium text-white rounded-lg"
                        style={{
                            backgroundColor: primaryColor,
                            borderRadius: `${Math.min(borderRadius, 12)}px`,
                        }}
                    >
                        Send Feedback
                    </button>
                </div>

                {/* Footer */}
                {!hideBranding && (
                    <div className="px-4 py-3 border-t border-border text-center">
                        <span className="text-xs text-muted-foreground">Powered by Feedinbox</span>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
