import { Zap, Send, Mail } from "lucide-react";

export default function HowItWorksSection() {
    return (
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
    );
}
