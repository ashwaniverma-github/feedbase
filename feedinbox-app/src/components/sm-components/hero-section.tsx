"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
    isLoggedIn?: boolean;
}

export default function HeroSection({ isLoggedIn = false }: HeroSectionProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

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
                        <div className="flex flex-col sm:flex-row gap-4">
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
                            <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50/50 px-4 py-3">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                                    <div className="h-3 w-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="ml-2 text-xs font-mono text-neutral-400">index.html</div>
                            </div>
                            <div className="p-6 overflow-x-auto bg-white">
                                <pre className="text-sm font-mono leading-relaxed">
                                    <code className="language-html">
                                        <span className="text-neutral-400">&lt;!-- Add to &lt;body&gt; --&gt;</span>
                                        <br />
                                        <span className="text-purple-600">&lt;script</span> <span className="text-neutral-600">src</span>=<span className="text-green-600">"{process.env.NEXT_PUBLIC_WIDGET_URL || "http://localhost:3000/widget.js"}"</span><span className="text-purple-600">&gt;&lt;/script&gt;</span>
                                        <br />
                                        <span className="text-purple-600">&lt;script&gt;</span>
                                        <br />
                                        <span className="text-neutral-900">  feedinbox.</span><span className="text-blue-600">init</span><span className="text-neutral-600">({`{`}</span>
                                        <br />
                                        <span className="text-neutral-600">    key:</span> <span className="text-green-600">"proj_123abc"</span><span className="text-neutral-600">,</span>
                                        <br />
                                        <span className="text-neutral-600">    email:</span> <span className="text-green-600">"true"</span> <span className="text-neutral-400">// Direct to your inbox ⚡</span>
                                        <br />
                                        <span className="text-neutral-600">  {`}`});</span>
                                        <br />
                                        <span className="text-purple-600">&lt;/script&gt;</span>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
