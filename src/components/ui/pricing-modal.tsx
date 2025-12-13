"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
    const [isAnnual, setIsAnnual] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleUpgrade = async () => {
        try {
            setIsLoading(true);
            const monthly = process.env.NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID;
            const annual = process.env.NEXT_PUBLIC_DODO_ANNUAL_PRODUCT_ID;
            const productId = isAnnual ? annual : monthly;

            if (!productId) {
                console.error("Missing Dodo product id environment variables");
                setIsLoading(false);
                return;
            }

            const res = await fetch("/api/dodo/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: productId,
                    metadata: {
                        plan: "pro",
                        billing_type: "subscription",
                        cadence: isAnnual ? "annual" : "monthly",
                    },
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({} as any));
                throw new Error(err?.error || "Failed to create checkout session");
            }

            const data = await res.json();
            if (data?.checkout_url) {
                window.location.href = data.checkout_url as string;
                return;
            }

            throw new Error("checkout_url missing");
        } catch (e) {
            console.error("Upgrade checkout error", e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
                    >
                        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-border bg-muted/50 px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <img src="/feedinbox.png" alt="Pro" className="h-5 w-5 rounded-full" />
                                    <h2 className="text-lg font-semibold">Upgrade to Pro</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Billing Toggle */}
                                <div className="flex justify-center">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-muted border border-border p-1">
                                        <button
                                            onClick={() => setIsAnnual(false)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                                !isAnnual
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            onClick={() => setIsAnnual(true)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                                isAnnual
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            Annual
                                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                                Save $20
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="text-center">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold">
                                            ${isAnnual ? "40" : "5"}
                                        </span>
                                        <span className="text-muted-foreground">/{isAnnual ? "year" : "month"}</span>
                                    </div>
                                    {isAnnual && (
                                        <p className="mt-1 text-sm text-green-600 font-medium">
                                            Save $20 compared to monthly
                                        </p>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="space-y-3">
                                    {[
                                        "Unlimited projects",
                                        "1,000 feedback submissions/month",
                                        "Unlimited data retention",
                                        "Remove Feedinbox branding",
                                        "Customize widgets",
                                        "Priority email notifications",
                                        "Export to CSV/PDF"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-green-600 shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={handleUpgrade}
                                    disabled={isLoading}
                                    className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <img src="/feedinbox.png" alt="Pro" className="h-4 w-4 rounded-full" />
                                            Upgrade Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
