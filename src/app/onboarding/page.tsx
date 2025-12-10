"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import {
    ArrowRight,
    ArrowLeft,
    Check,
    Sparkles,
    Building2,
    Users,
    MessageSquare,
    Bug,
    Lightbulb,
    HelpCircle,
    Copy,
    FolderKanban,
    Rocket
} from "lucide-react";

interface OnboardingData {
    useCase: string;
    teamSize: string;
    feedbackTypes: string[];
    projectName: string;
    projectDomain: string;
}

const USE_CASES = [
    { id: "saas", label: "SaaS Product", icon: Building2 },
    { id: "ecommerce", label: "E-commerce", icon: Sparkles },
    { id: "blog", label: "Blog / Content", icon: MessageSquare },
    { id: "other", label: "Other", icon: FolderKanban },
];

const TEAM_SIZES = [
    { id: "solo", label: "Just me" },
    { id: "small", label: "2-5 people" },
    { id: "medium", label: "6-20 people" },
    { id: "large", label: "20+ people" },
];

const FEEDBACK_TYPES = [
    { id: "bug", label: "Bug Reports", icon: Bug, color: "text-red-500" },
    { id: "feature", label: "Feature Requests", icon: Lightbulb, color: "text-yellow-500" },
    { id: "question", label: "Questions", icon: HelpCircle, color: "text-blue-500" },
    { id: "general", label: "General Feedback", icon: MessageSquare, color: "text-green-500" },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [projectKey, setProjectKey] = useState("");
    const [error, setError] = useState("");

    const [data, setData] = useState<OnboardingData>({
        useCase: "",
        teamSize: "",
        feedbackTypes: [],
        projectName: "",
        projectDomain: "",
    });

    // Check if user already has projects
    useEffect(() => {
        const checkProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const projects = await res.json();
                if (projects.length > 0) {
                    router.replace("/dashboard");
                }
            } catch (error) {
                console.error("Failed to check projects:", error);
            }
        };
        if (status === "authenticated") {
            checkProjects();
        }
    }, [status, router]);

    const toggleFeedbackType = (id: string) => {
        setData(prev => ({
            ...prev,
            feedbackTypes: prev.feedbackTypes.includes(id)
                ? prev.feedbackTypes.filter(t => t !== id)
                : [...prev.feedbackTypes, id]
        }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return data.useCase && data.teamSize && data.feedbackTypes.length > 0;
            case 2:
                return data.projectName.trim().length > 0;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const createProject = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.projectName,
                    domain: data.projectDomain || undefined,
                }),
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error || "Failed to create project");
            }

            const project = await res.json();
            setProjectKey(project.widgetKey);
            setCurrentStep(3);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentStep === 2) {
            createProject();
        } else if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        router.push("/dashboard");
    };

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const embedCode = `<!-- Feedinbox Widget -->
<script>
  window.feedinboxConfig = {
    projectKey: "${projectKey}",
    position: "bottom-right",
    primaryColor: "#171717"
  };
</script>
<script async src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget.js"></script>`;

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loading size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card/50 backdrop-blur-xl">
                <div className="mx-auto max-w-3xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <Sparkles className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-foreground">Feedinbox</span>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-2">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all",
                                        currentStep === step
                                            ? "bg-primary text-primary-foreground"
                                            : currentStep > step
                                                ? "bg-primary/20 text-primary"
                                                : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {currentStep > step ? <Check className="h-4 w-4" /> : step}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-3xl px-4 py-12">
                {/* Step 1: Questions */}
                {currentStep === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-foreground">
                                Welcome{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}! 👋
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Let's personalize your experience in just a few steps.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Use Case */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    What are you building?
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {USE_CASES.map((useCase) => (
                                        <button
                                            key={useCase.id}
                                            onClick={() => setData(prev => ({ ...prev, useCase: useCase.id }))}
                                            className={cn(
                                                "flex items-center gap-3 rounded-xl border p-4 transition-all",
                                                data.useCase === useCase.id
                                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                                            )}
                                        >
                                            <useCase.icon className={cn(
                                                "h-5 w-5",
                                                data.useCase === useCase.id ? "text-primary" : "text-muted-foreground"
                                            )} />
                                            <span className={cn(
                                                "font-medium",
                                                data.useCase === useCase.id ? "text-primary" : "text-foreground"
                                            )}>
                                                {useCase.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Team Size */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    How big is your team?
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {TEAM_SIZES.map((size) => (
                                        <button
                                            key={size.id}
                                            onClick={() => setData(prev => ({ ...prev, teamSize: size.id }))}
                                            className={cn(
                                                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                                                data.teamSize === size.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Feedback Types */}
                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    What feedback do you want to collect?
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {FEEDBACK_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => toggleFeedbackType(type.id)}
                                            className={cn(
                                                "flex items-center gap-3 rounded-xl border p-4 transition-all",
                                                data.feedbackTypes.includes(type.id)
                                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                                            )}
                                        >
                                            <type.icon className={cn("h-5 w-5", type.color)} />
                                            <span className="font-medium text-foreground">{type.label}</span>
                                            {data.feedbackTypes.includes(type.id) && (
                                                <Check className="ml-auto h-4 w-4 text-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Create Project */}
                {currentStep === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-foreground">
                                Create your first project
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                A project represents your app or website where you'll collect feedback.
                            </p>
                        </div>

                        <Card className="mx-auto max-w-md">
                            <CardContent className="p-6 space-y-6">
                                <Input
                                    label="Project Name"
                                    placeholder="My Awesome App"
                                    value={data.projectName}
                                    onChange={(e) => setData(prev => ({ ...prev, projectName: e.target.value }))}
                                />

                                <Input
                                    label="Domain (optional)"
                                    placeholder="myapp.com"
                                    value={data.projectDomain}
                                    onChange={(e) => setData(prev => ({ ...prev, projectDomain: e.target.value }))}
                                />

                                {error && (
                                    <p className="text-sm text-destructive">{error}</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Step 3: Embed Code */}
                {currentStep === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center mb-10">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                <Rocket className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">
                                You're all set! 🎉
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Add this code to your website to start collecting feedback.
                            </p>
                        </div>

                        <Card className="mx-auto max-w-2xl">
                            <CardContent className="p-6 space-y-6">
                                {/* Instructions */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
                                        Copy the code below
                                    </h3>

                                    <div className="relative">
                                        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm font-mono text-foreground">
                                            <code>{embedCode}</code>
                                        </pre>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="absolute right-2 top-2"
                                            onClick={copyCode}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="mr-1 h-3 w-3" />
                                                    Copy
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
                                        Paste before the closing &lt;/body&gt; tag
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Add this snippet to every page where you want the feedback widget to appear.
                                        The widget will show up as a small button in the bottom-right corner.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
                                        Start collecting feedback
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your users can now submit feedback directly from your website.
                                        All submissions will appear in your dashboard.
                                    </p>
                                </div>

                                {/* Customization hint */}
                                <div className="rounded-lg border border-border bg-muted/50 p-4">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-foreground">💡 Tip:</strong> You can customize the widget's position and color
                                        in your project settings after setup.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between">
                    {currentStep > 1 && currentStep < 3 ? (
                        <Button variant="ghost" onClick={handleBack}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    ) : (
                        <div />
                    )}

                    {currentStep < 3 ? (
                        <Button onClick={handleNext} disabled={!canProceed() || loading}>
                            {loading ? (
                                <Loading size="sm" />
                            ) : (
                                <>
                                    {currentStep === 2 ? "Create Project" : "Continue"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button onClick={handleFinish} className="mx-auto">
                            Go to Dashboard
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
