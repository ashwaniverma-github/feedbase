import Link from "next/link";
import { ArrowRight, MessageSquare, BarChart3, Code, Zap, Shield, Sparkles } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-white to-neutral-400">
                            <MessageSquare className="h-4 w-4 text-neutral-900" />
                        </div>
                        Feedbase
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                        >
                            Login
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-200 hover:scale-105"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden pt-32 pb-20">
                {/* Background gradient */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/3 blur-3xl" />
                </div>

                <div className="mx-auto max-w-6xl px-6 text-center">
                    {/* Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        <span className="text-neutral-300">Built for founders who ship fast</span>
                    </div>

                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                        <span className="bg-gradient-to-r from-white via-white to-neutral-500 bg-clip-text text-transparent">
                            Feedback that actually
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
                            reaches you.
                        </span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-lg text-neutral-400 leading-relaxed">
                        A simple, embeddable widget to collect user feedback directly into your
                        dashboard. No friction. No complexity. Just pure, actionable insights.
                    </p>

                    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/login"
                            className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-200 hover:scale-105 hover:shadow-xl hover:shadow-white/10"
                        >
                            Get Started Free
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#features"
                            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:border-white/30"
                        >
                            See how it works
                        </Link>
                    </div>

                    {/* Social proof */}
                    <div className="mt-16 flex items-center justify-center gap-8 text-sm text-neutral-500">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>Privacy first</span>
                        </div>
                        <div className="h-4 w-px bg-neutral-700" />
                        <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            <span>Setup in 60 seconds</span>
                        </div>
                        <div className="h-4 w-px bg-neutral-700" />
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>Anonymous feedback</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="relative py-24">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold sm:text-4xl">Everything you need. Nothing you don&apos;t.</h2>
                        <p className="mt-4 text-lg text-neutral-400">Simple tools that actually help you understand your users.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/10">
                                <Code className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">One-Line Setup</h3>
                            <p className="mt-3 text-neutral-400 leading-relaxed">
                                Copy, paste, done. Add our widget to any website or app with a single line of code.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/10">
                                <MessageSquare className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">Clean Dashboard</h3>
                            <p className="mt-3 text-neutral-400 leading-relaxed">
                                No noise. Filter by category, mark as read, and focus on what actually matters.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/10">
                                <BarChart3 className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold">Instant Insights</h3>
                            <p className="mt-3 text-neutral-400 leading-relaxed">
                                See feedback in real-time. Analytics to understand trends. Email alerts coming soon.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-24">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                </div>

                <div className="mx-auto max-w-3xl px-6 text-center">
                    <h2 className="text-4xl font-bold sm:text-5xl">
                        Ready to hear from your users?
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg text-lg text-neutral-400">
                        Join founders who build better products by actually listening. Free to start. No credit card required.
                    </p>
                    <Link
                        href="/login"
                        className="group mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-200 hover:scale-105 hover:shadow-xl hover:shadow-white/10"
                    >
                        Start Collecting Feedback
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-white to-neutral-400">
                                <MessageSquare className="h-3.5 w-3.5 text-neutral-900" />
                            </div>
                            Feedbase
                        </div>
                        <p className="text-sm text-neutral-500">
                            © {new Date().getFullYear()} Feedbase. Built for founders.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}