"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Package, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
    isLoggedIn?: boolean;
}

type IntegrationMethod = "sdk" | "script";

export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [integrationMethod, setIntegrationMethod] = useState<IntegrationMethod>("script");

    const animatedTexts = ["feedback", "bug reports", "feature requests"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
                setIsAnimating(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Hide arrow on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHasScrolled(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-48 sm:pb-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl mb-6">
                            <span className="block">The fastest way to collect</span>
                            <span className="block relative h-[1.2em] overflow-hidden">
                                <span
                                    className={cn(
                                        "absolute left-0 transition-all duration-500 ease-out",
                                        isAnimating
                                            ? "opacity-0 -translate-y-full"
                                            : "opacity-100 translate-y-0",
                                        currentTextIndex === 0 && "text-neutral-900",
                                        currentTextIndex === 1 && "text-red-500",
                                        currentTextIndex === 2 && "text-amber-500"
                                    )}
                                >
                                    {animatedTexts[currentTextIndex]}
                                </span>
                            </span>
                            <span className="block">in your app.</span>
                        </h1>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            Simply embed a snippet of code and start receiving bug reports, feature requests, and user thoughts directly to your mailbox and dashboard.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Link
                                href={isLoggedIn ? "/dashboard" : "/login"}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:-translate-y-0.5"
                            >
                                {isLoggedIn ? "Go to App" : "Start for free"}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            {!isLoggedIn && (
                                <a
                                    href="#how-it-works"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-8 text-base font-medium text-neutral-900 transition-all hover:border-neutral-300 hover:bg-neutral-50"
                                >
                                    How it works
                                </a>
                            )}
                            <code className="hidden sm:inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-100 border border-neutral-200 px-4 text-sm font-mono text-neutral-600">
                                <span className="text-neutral-400">$</span> npm install feedinbox
                            </code>
                        </div>
                        <div className="mt-10 flex items-center gap-4 text-sm text-neutral-500">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-600" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-600" />
                                <span>Free tier available</span>
                            </div>
                        </div>
                    </div>

                    {/* Code Showcase */}
                    <div className="relative group w-full max-w-full min-w-0">
                        <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-neutral-100 to-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        <div className="relative rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/50 overflow-hidden">
                            {/* Integration Method Toggle */}
                            <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-400/80" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                                        <div className="h-3 w-3 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="ml-2 text-xs font-mono text-neutral-400">
                                        {integrationMethod === "sdk" ? "layout.tsx" : "index.html"}
                                    </div>
                                </div>
                                {/* Toggle Buttons */}
                                <div className="flex p-0.5 bg-neutral-200/80 rounded-md">
                                    <button
                                        onClick={() => setIntegrationMethod("sdk")}
                                        className={cn(
                                            "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-all",
                                            integrationMethod === "sdk"
                                                ? "bg-white text-neutral-900 shadow-sm"
                                                : "text-neutral-500 hover:text-neutral-700"
                                        )}
                                    >
                                        <Package className="h-3 w-3" />
                                        SDK
                                    </button>
                                    <button
                                        onClick={() => setIntegrationMethod("script")}
                                        className={cn(
                                            "flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-all",
                                            integrationMethod === "script"
                                                ? "bg-white text-neutral-900 shadow-sm"
                                                : "text-neutral-500 hover:text-neutral-700"
                                        )}
                                    >
                                        <FileCode className="h-3 w-3" />
                                        Script
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 overflow-x-auto bg-white">
                                <pre className="text-sm font-mono leading-relaxed">
                                    {integrationMethod === "sdk" ? (
                                        <code className="language-tsx">
                                            <span className="text-neutral-400">// npm install feedinbox</span>
                                            <br />
                                            <span className="text-purple-600">import</span> <span className="text-neutral-600">{`{`} Feedinbox {`}`}</span> <span className="text-purple-600">from</span> <span className="text-green-600">&apos;feedinbox&apos;</span><span className="text-neutral-600">;</span>
                                            <br />
                                            <br />
                                            <span className="text-purple-600">export default function</span> <span className="text-blue-600">Layout</span><span className="text-neutral-600">() {`{`}</span>
                                            <br />
                                            <span className="text-neutral-600">  </span><span className="text-purple-600">return</span> <span className="text-neutral-600">(</span>
                                            <br />
                                            <span className="text-neutral-600">    </span><span className="text-purple-600">&lt;&gt;</span>
                                            <br />
                                            <span className="text-neutral-600">      {`{`}children{`}`}</span>
                                            <br />
                                            <span className="text-neutral-600">      </span><span className="text-purple-600">&lt;Feedinbox</span> <span className="text-neutral-600">projectKey=</span><span className="text-green-600">&quot;proj_xxx&quot;</span> <span className="text-purple-600">/&gt;</span>
                                            <br />
                                            <span className="text-neutral-600">    </span><span className="text-purple-600">&lt;/&gt;</span>
                                            <br />
                                            <span className="text-neutral-600">  );</span>
                                            <br />
                                            <span className="text-neutral-600">{`}`}</span>
                                        </code>
                                    ) : (
                                        <code className="language-html">
                                            <span className="text-neutral-400">&lt;!-- Add to &lt;body&gt; --&gt;</span>
                                            <br />
                                            <span className="text-purple-600">&lt;script&gt;</span>
                                            <br />
                                            <span className="text-neutral-600">  window.</span><span className="text-blue-600">feedinboxConfig</span> <span className="text-neutral-600">= {`{`}</span>
                                            <br />
                                            <span className="text-neutral-600">    projectKey:</span> <span className="text-green-600">&quot;proj_xxx&quot;</span>
                                            <br />
                                            <span className="text-neutral-600">  {`}`};</span>
                                            <br />
                                            <span className="text-purple-600">&lt;/script&gt;</span>
                                            <br />
                                            <span className="text-purple-600">&lt;script</span> <span className="text-neutral-600">async src=</span><span className="text-green-600">&quot;https://feedinbox.co/widget.js&quot;</span><span className="text-purple-600">&gt;&lt;/script&gt;</span>
                                        </code>
                                    )}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Arrow pointing to widget - glow animation, hidden on scroll */}
            <div
                className={cn(
                    "hidden lg:block fixed bottom-16 right-20 z-40 pointer-events-none transition-opacity duration-500 delay-1000",
                    hasScrolled ? "opacity-0" : "opacity-100"
                )}
            >
                <div className="relative">
                    {/* Label */}
                    <span className="absolute -top-4 -left-12 text-sm font-medium text-red-500 whitespace-nowrap bg-white/90 px-2 py-1 rounded-full shadow-sm">
                        Like this
                    </span>
                    {/* Arrow SVG with glow animation and loop */}
                    <svg
                        width="240"
                        height="160"
                        viewBox="0 0 240 160"
                        fill="none"
                        className="text-red-500"
                    >
                        <defs>
                            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1">
                                    <animate
                                        attributeName="offset"
                                        values="-0.5;1"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="30%" stopColor="currentColor" stopOpacity="1">
                                    <animate
                                        attributeName="offset"
                                        values="-0.2;1.3"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="60%" stopColor="currentColor" stopOpacity="0.1">
                                    <animate
                                        attributeName="offset"
                                        values="0.1;1.6"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Looped Path Definition */}
                        {/* Starts top-left, loops, then goes to bottom-right */}
                        <path
                            id="arrowPath"
                            d="M20 20 C 80 20, 80 80, 50 80 C 20 80, 20 40, 60 30 C 130 10, 180 100, 220 140"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.2"
                        />

                        {/* Animated Glow Path */}
                        <path
                            d="M20 20 C 80 20, 80 80, 50 80 C 20 80, 20 40, 60 30 C 130 10, 180 100, 220 140"
                            stroke="url(#glowGradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            filter="url(#glow)"
                        />

                        {/* Open Arrow Head (Not Triangle) */}
                        <path
                            d="M200 135 L 220 140 L 215 120"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            filter="url(#glow)"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
