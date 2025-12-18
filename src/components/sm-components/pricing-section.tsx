"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
    isLoggedIn?: boolean;
}

type BillingPeriod = "monthly" | "annual" | "lifetime";

export default function PricingSection({ isLoggedIn = false }: PricingSectionProps) {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
    const [isLoading, setIsLoading] = useState(false);
    const [ltdRemaining, setLtdRemaining] = useState<number | null>(null);
    const [ltdSoldOut, setLtdSoldOut] = useState(false);

    // Fetch LTD count on mount
    useEffect(() => {
        const fetchLtdCount = async () => {
            try {
                const res = await fetch("/api/ltd-count");
                if (res.ok) {
                    const data = await res.json();
                    setLtdRemaining(data.remaining);
                    setLtdSoldOut(data.soldOut);
                }
            } catch (e) {
                console.error("Failed to fetch LTD count", e);
            }
        };
        fetchLtdCount();
    }, []);

    // Check for pending upgrade intent on mount
    useEffect(() => {
        const checkPendingUpgrade = async () => {
            try {
                const pendingUpgrade = localStorage.getItem("pending_upgrade_intent");
                if (!pendingUpgrade || !isLoggedIn) return;

                const upgradeData = JSON.parse(pendingUpgrade);
                localStorage.removeItem("pending_upgrade_intent");

                // Set the billing toggle to match stored intent
                setBillingPeriod(upgradeData.billingPeriod || (upgradeData.isAnnual ? "annual" : "monthly"));

                // Trigger checkout automatically
                setIsLoading(true);
                const res = await fetch("/api/dodo/create-checkout-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        product_id: upgradeData.productId,
                        metadata: {
                            plan: "pro",
                            billing_type: upgradeData.billingPeriod === "lifetime" ? "one_time" : "subscription",
                            cadence: upgradeData.cadence,
                        },
                    }),
                });

                if (!res.ok) {
                    throw new Error("Failed to create checkout session");
                }

                const data = await res.json();
                if (data?.checkout_url) {
                    window.location.href = data.checkout_url;
                }
            } catch (e) {
                console.error("Pending upgrade error", e);
                setIsLoading(false);
            }
        };

        checkPendingUpgrade();
    }, [isLoggedIn]);

    const handleUpgrade = async () => {
        try {
            setIsLoading(true);
            const monthly = process.env.NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID;
            const annual = process.env.NEXT_PUBLIC_DODO_ANNUAL_PRODUCT_ID;
            const lifetime = process.env.NEXT_PUBLIC_DODO_LTD_PRODUCT_ID;

            let productId: string | undefined;
            let cadence: string;

            if (billingPeriod === "lifetime") {
                productId = lifetime;
                cadence = "lifetime";
            } else if (billingPeriod === "annual") {
                productId = annual;
                cadence = "annual";
            } else {
                productId = monthly;
                cadence = "monthly";
            }

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
                        billing_type: billingPeriod === "lifetime" ? "one_time" : "subscription",
                        cadence,
                    },
                }),
            });

            if (res.status === 401) {
                // Store upgrade intent before redirecting to login
                try {
                    localStorage.setItem("pending_upgrade_intent", JSON.stringify({
                        productId,
                        billingPeriod,
                        cadence,
                    }));
                } catch { }

                // Redirect to login with callback to pricing section
                const callback = encodeURIComponent("/#pricing");
                window.location.href = `/login?callbackUrl=${callback}`;
                return;
            }

            if (!res.ok) {
                const err = await res.json().catch(() => ({} as any));
                throw new Error(err?.error || "Failed to create checkout session");
            }

            const data = await res.json();
            if (data?.session_id) {
                try {
                    localStorage.setItem("pending_checkout_session_id", data.session_id);
                } catch { }
            }
            if (data?.checkout_url) {
                // Redirect to hosted Dodo checkout
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

    const getProPrice = () => {
        if (billingPeriod === "lifetime") return "29";
        if (billingPeriod === "annual") return "40";
        return "5";
    };

    const getPriceLabel = () => {
        if (billingPeriod === "lifetime") return "one-time";
        if (billingPeriod === "annual") return "/year";
        return "/month";
    };

    return (
        <section className="py-24 bg-neutral-50 border-y border-neutral-100" id="pricing">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 mb-6 border border-green-100">
                        <img src="/feedinbox.png" alt="Pro" className="h-3 w-3 rounded-full" />
                        Simple Pricing
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">
                        Start free, upgrade when ready.
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
                        No hidden fees. No surprises. Just simple pricing that scales with you.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-1 rounded-full bg-white border border-neutral-200 p-1 shadow-sm">
                        <button
                            onClick={() => setBillingPeriod("monthly")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                billingPeriod === "monthly"
                                    ? "bg-neutral-900 text-white shadow-sm"
                                    : "text-neutral-600 hover:text-neutral-900"
                            )}
                        >
                            Monthly
                        </button>
                        {/* Annual option - temporarily disabled
                        <button
                            onClick={() => setBillingPeriod("annual")}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                billingPeriod === "annual"
                                    ? "bg-neutral-900 text-white shadow-sm"
                                    : "text-neutral-600 hover:text-neutral-900"
                            )}
                        >
                            Annual
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                                Save $20
                            </span>
                        </button>
                        */}
                        <button
                            onClick={() => !ltdSoldOut && setBillingPeriod("lifetime")}
                            disabled={ltdSoldOut}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                billingPeriod === "lifetime"
                                    ? "bg-neutral-900 text-white shadow-sm"
                                    : ltdSoldOut
                                        ? "text-neutral-400 cursor-not-allowed"
                                        : "text-neutral-600 hover:text-neutral-900"
                            )}
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Lifetime
                            {ltdSoldOut ? (
                                <span className="text-xs bg-neutral-400 text-white px-2 py-0.5 rounded-full">
                                    Sold Out
                                </span>
                            ) : (
                                <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">
                                    Limited
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="relative rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Free</h3>
                            <p className="text-sm text-neutral-500">Perfect for trying things out</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-neutral-900">$0</span>
                                <span className="text-neutral-500">/{billingPeriod === "lifetime" ? "forever" : billingPeriod === "annual" ? "year" : "month"}</span>
                            </div>
                        </div>
                        <Link
                            href={isLoggedIn ? "/dashboard" : "/login"}
                            className="mb-8 flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 hover:border-neutral-300"
                        >
                            {isLoggedIn ? "Go to App" : "Get Started"}
                        </Link>
                        <div className="space-y-4">
                            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Includes:</div>
                            {[
                                "1 project",
                                "20 feedback submissions/month",
                                "Basic email notifications",
                                "Feedinbox branding on widget"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                                    <Check className="h-4 w-4 text-neutral-400 shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tier */}
                    <div className="relative rounded-2xl border-2 border-neutral-900 bg-white p-8 shadow-xl">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className={cn(
                                "rounded-full px-4 py-1 text-xs font-semibold text-white",
                                billingPeriod === "lifetime" ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-neutral-900"
                            )}>
                                {billingPeriod === "lifetime" ? (
                                    <span className="flex items-center gap-1.5">
                                        <Sparkles className="h-3 w-3" />
                                        Lifetime Deal
                                    </span>
                                ) : (
                                    "Most Popular"
                                )}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Pro</h3>
                            <p className="text-sm text-neutral-500">For serious builders</p>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-neutral-900">
                                    ${getProPrice()}
                                </span>
                                <span className="text-neutral-500">{getPriceLabel()}</span>
                            </div>
                            {billingPeriod === "lifetime" && ltdRemaining !== null && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                                        🔥 Only {ltdRemaining} of 50 remaining
                                    </span>
                                </div>
                            )}
                            {/* Annual messaging - temporarily disabled
                            {billingPeriod === "annual" && (
                                <div className="mt-1 text-xs text-green-600 font-medium">
                                    Save $20 compared to monthly
                                </div>
                            )}
                            {billingPeriod === "monthly" && (
                                <div className="mt-1 text-xs text-neutral-500">
                                    Or $40/year (save $20)
                                </div>
                            )}
                            */}
                        </div>
                        <button
                            onClick={handleUpgrade}
                            disabled={isLoading || (billingPeriod === "lifetime" && ltdSoldOut)}
                            className={cn(
                                "mb-8 flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition-all disabled:opacity-50",
                                billingPeriod === "lifetime"
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/20"
                                    : "bg-neutral-900 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20"
                            )}
                        >
                            {isLoading ? "Redirecting..." : billingPeriod === "lifetime" ? "Get Lifetime Access" : "Upgrade to Pro"}
                        </button>
                        <div className="space-y-4">
                            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Everything in Free, plus:</div>
                            {[
                                "Unlimited projects",
                                "1,000 feedback submissions/month",
                                "Unlimited data retention",
                                "Remove Feedinbox branding",
                                "Customize widgets",
                                "Priority email notifications",
                                "Export to CSV/PDF"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-neutral-700 font-medium">
                                    <Check className="h-4 w-4 text-green-600 shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-neutral-500 mt-10">
                    Questions? <a href="mailto:support@feedinbox.com" className="text-neutral-900 underline hover:no-underline">Contact us</a>
                </p>
            </div>
        </section>
    );
}
