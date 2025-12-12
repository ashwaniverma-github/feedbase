"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Mail, LayoutDashboard, Copy, Check, Zap, Code2, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const animatedTexts = ["feedback", "bug reports", "feature requests"];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
            {/* Navbar */}
            <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
                <nav
                    className={cn(
                        "pointer-events-auto flex h-14 items-center justify-between rounded-full border border-neutral-200/60 bg-white/70 px-4 shadow-xl shadow-neutral-200/20 backdrop-blur-xl transition-all duration-500 ease-in-out hover:bg-white/90 sm:px-6",
                        isScrolled ? "w-full max-w-2xl py-2" : "w-full max-w-5xl"
                    )}
                >
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg shadow-neutral-900/20">
                            <Image
                                src="/feedinbox.png"
                                alt="Feedinbox"
                                width={120}
                                height={32}
                                className="rounded-full "
                            />
                        </div>
                        <span className={cn(
                            "hidden transition-all duration-500 sm:inline-block",
                            isScrolled && "sm:hidden md:hidden lg:inline-block"
                        )}>
                            Feedinbox
                        </span>
                    </Link>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <a
                            href="#how-it-works"
                            className={cn(
                                "hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100/50 hover:text-neutral-900 sm:inline-flex",
                                isScrolled && "opacity-0 w-0 px-0 pointer-events-none hidden"
                            )}
                        >
                            How it works
                        </a>
                        <Link
                            href="/login"
                            className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100/50 hover:text-neutral-900"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex h-9 items-center justify-center rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 active:scale-95"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Hero Section */}
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
                                    href="/login"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:-translate-y-0.5"
                                >
                                    Start for free
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-8 text-base font-medium text-neutral-900 transition-all hover:border-neutral-300 hover:bg-neutral-50"
                                >
                                    How it works
                                </a>
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

                        {/* Code Showcase - The "Show" part */}
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

            {/* Email Direct Feature */}
            <section className="py-24 bg-neutral-50 border-y border-neutral-100" id="how-it-works">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-6 border border-blue-100">
                            <Zap className="h-3 w-3" />
                            Real-time Notifications
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">
                            Straight to your Inbox.
                        </h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Don't log into another dashboard just to check if you have updates.
                            We send feedback directly to your email the moment it's submitted.
                        </p>
                    </div>

                    <div className="relative max-w-3xl mx-auto">
                        {/* Connection Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-200 via-blue-200 to-neutral-200 -z-10 hidden sm:block" />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            {/* Step 1 */}
                            <div className="relative">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-200 shadow-sm mb-4 z-10">
                                    <Zap className="h-8 w-8 text-neutral-400" />
                                </div>
                                <h3 className="font-semibold text-neutral-900">User Submits</h3>
                                <p className="text-sm text-neutral-500 mt-1">Widget on your site</p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/20 mb-4 z-10 animate-pulse">
                                    <Send className="h-8 w-8 text-white ml-1" />
                                </div>
                                <h3 className="font-semibold text-neutral-900">Instant Relay</h3>
                                <p className="text-sm text-neutral-500 mt-1">Processed in ms</p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-neutral-200 shadow-sm mb-4 z-10">
                                    <Mail className="h-8 w-8 text-neutral-900" />
                                </div>
                                <h3 className="font-semibold text-neutral-900">Your Inbox</h3>
                                <p className="text-sm text-neutral-500 mt-1">Read & React immediately</p>
                            </div>
                        </div>

                        {/* Email Mockup */}
                        <div className="mt-16 mx-auto w-full max-w-lg bg-white rounded-xl border border-neutral-200 shadow-2xl p-6 rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6 border-b border-neutral-100 pb-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">F</div>
                                <div>
                                    <div className="font-semibold text-neutral-900">New Feedback</div>
                                    <div className="text-xs text-neutral-500">From: Feedinbox Notifier</div>
                                </div>
                                <div className="ml-auto text-xs text-neutral-400">Just now</div>
                            </div>
                            <div className="space-y-4">
                                <div className="inline-flex rounded-full bg-red-50 text-red-700 px-2.5 py-0.5 text-xs font-semibold border border-red-100">
                                    🐛 Bug Report
                                </div>
                                <p className="text-sm text-neutral-600 leading-relaxed">
                                    "Hey! I found a small issue on the checkout page. The button seems to be misaligned on mobile screens."
                                </p>
                                <div className="pt-2">
                                    <button className="text-sm font-medium text-neutral-900 hover:underline">
                                        View details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Feature */}
            <section className="py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-2 shadow-2xl shadow-neutral-200/50">
                                <div className="rounded-lg bg-white border border-neutral-200 overflow-hidden">
                                    {/* Mock Dashboard Header */}
                                    <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold text-sm text-neutral-900">Dashboard</div>
                                            <div className="h-4 w-px bg-neutral-200" />
                                            <div className="text-xs text-neutral-500">Overview</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-6 w-20 bg-white border border-neutral-200 rounded text-[10px] flex items-center justify-center text-neutral-500">Last 7 days</div>
                                        </div>
                                    </div>
                                    {/* Mock Dashboard Content */}
                                    <div className="p-6 space-y-6">
                                        {/* Stats Row */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-lg border border-neutral-100 p-4">
                                                <div className="text-xs text-neutral-500 mb-1">Total Feedback</div>
                                                <div className="text-2xl font-bold text-neutral-900">128</div>
                                                <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                                    <span className="font-medium">↑ 12%</span> from last week
                                                </div>
                                            </div>
                                            <div className="rounded-lg border border-neutral-100 p-4">
                                                <div className="text-xs text-neutral-500 mb-1">Bug Reports</div>
                                                <div className="text-2xl font-bold text-neutral-900">14</div>
                                                <div className="h-1.5 w-full bg-neutral-100 rounded-full mt-3 overflow-hidden">
                                                    <div className="h-full bg-red-500 w-[60%] rounded-full" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chart Area */}
                                        <div className="rounded-lg border border-neutral-100 p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-xs font-medium text-neutral-700">Feedback Activity</div>
                                            </div>
                                            <div className="flex items-end justify-between gap-2 h-24">
                                                {[35, 55, 40, 70, 45, 90, 60].map((h, i) => (
                                                    <div key={i} className="w-full h-full bg-neutral-100 rounded-t-sm relative group">
                                                        <div
                                                            className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-sm transition-all duration-500 group-hover:bg-neutral-800"
                                                            style={{ height: `${h}%` }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between mt-2 text-[10px] text-neutral-400">
                                                <span>Mon</span>
                                                <span>Tue</span>
                                                <span>Wed</span>
                                                <span>Thu</span>
                                                <span>Fri</span>
                                                <span>Sat</span>
                                                <span>Sun</span>
                                            </div>
                                        </div>

                                        {/* Recent Feedback List */}
                                        <div className="space-y-3">
                                            <div className="text-xs font-medium text-neutral-700">Recent Reports</div>
                                            {[
                                                { title: "Login button not working", tag: "Bug", color: "text-red-600 bg-red-50 border-red-100" },
                                                { title: "Add dark mode support", tag: "Feature", color: "text-amber-600 bg-amber-50 border-amber-100" },
                                                { title: "Typo on pricing page", tag: "Fix", color: "text-blue-600 bg-blue-50 border-blue-100" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 bg-white hover:border-neutral-200 transition-colors cursor-default">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-2 w-2 rounded-full ${item.tag === 'Bug' ? 'bg-red-500' : item.tag === 'Feature' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                                        <span className="text-sm text-neutral-700 font-medium">{item.title}</span>
                                                    </div>
                                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${item.color}`}>
                                                        {item.tag}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 mb-6 border border-purple-100">
                                <LayoutDashboard className="h-3 w-3" />
                                Rich Analytics
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6">
                                A powerful home for your insights.
                            </h2>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Emails are great for alerts, but the dashboard is where you find patterns. Organize, filter, and analyze all feedback in one managed view.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Filter by category (Bug, Feature, etc.)",
                                    "Track feedback trends over time",
                                    "Mark items as resolved",
                                    "Export data for your team"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden py-24 text-center">
                <div className="absolute inset-0 -z-10 bg-neutral-900" />
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />
                </div>

                <div className="mx-auto max-w-3xl px-4 sm:px-6 relative">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                        Ready to start listening?
                    </h2>
                    <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
                        Join founders who are building better products by gathering insights directly from their users.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-100 hover:scale-105 shadow-xl shadow-white/10"
                    >
                        Get Started for Free
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <p className="mt-6 text-sm text-neutral-500">
                        No credit card required. Free tier available.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-800 bg-neutral-900 py-12 text-sm text-neutral-400">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 sm:flex-row">
                    <p>© {new Date().getFullYear()} Feedinbox. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}