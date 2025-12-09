"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { Copy, Check, Trash2 } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectSettingsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [project, setProject] = useState<Project | null>(null);
    const [name, setName] = useState("");
    const [domain, setDomain] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/projects/${id}`);
            const data = await res.json();
            setProject(data);
            setName(data.name);
            setDomain(data.domain || "");
        } catch (error) {
            console.error("Failed to fetch project:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await fetch(`/api/projects/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, domain: domain || null }),
            });
            setProject((p) => (p ? { ...p, name, domain } : null));
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            return;
        }
        setDeleting(true);
        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" });
            router.push("/projects");
        } catch (error) {
            console.error("Failed to delete:", error);
            setDeleting(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const embedCode = `<!-- Feedbase Widget -->
<script>
  window.feedbaseConfig = {
    projectKey: '${project?.widgetKey || "pk_xxx"}'
  };
</script>
<script src="${typeof window !== "undefined" ? window.location.origin : ""}/widget.js" async></script>`;

    if (loading) {
        return (
            <>
                <Header title="Settings" />
                <div className="flex items-center justify-center p-8">
                    <Loading size="lg" />
                </div>
            </>
        );
    }

    return (
        <>
            <Header title="Project Settings" description={project?.name} />

            <div className="mx-auto max-w-2xl space-y-6 p-8">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>Update your project settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-4">
                            <Input
                                label="Project Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Input
                                label="Domain (optional)"
                                placeholder="https://myapp.com"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                            />
                            <Button type="submit" disabled={saving}>
                                {saving ? <Loading size="sm" /> : "Save Changes"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Widget Code */}
                <Card>
                    <CardHeader>
                        <CardTitle>Widget Installation</CardTitle>
                        <CardDescription>
                            Copy this code and paste it before the closing &lt;/body&gt; tag
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-4 text-sm dark:bg-neutral-900">
                                <code>{embedCode}</code>
                            </pre>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="absolute right-2 top-2"
                                onClick={() => copyToClipboard(embedCode)}
                            >
                                {copied ? (
                                    <>
                                        <Check className="mr-1 h-4 w-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="mr-1 h-4 w-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-neutral-500">
                                <strong>Project Key:</strong>{" "}
                                <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
                                    {project?.widgetKey}
                                </code>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200 dark:border-red-900">
                    <CardHeader>
                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                        <CardDescription>
                            Permanently delete this project and all its feedback
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting ? (
                                <Loading size="sm" />
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Project
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
