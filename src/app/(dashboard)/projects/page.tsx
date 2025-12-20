"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";
import { formatDate } from "@/lib/utils";
import { Plus, FolderKanban, MessageSquare, ArrowRight } from "lucide-react";
import type { ProjectWithCount } from "@/types";

export default function ProjectsPage() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<ProjectWithCount[]>([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <>
            <Header
                title="Projects"
                description="Manage your feedback projects"
                action={
                    <Link href="/projects/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </Link>
                }
            />

            <div className="p-8">
                {projects.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="rounded-full bg-muted p-4">
                                <FolderKanban className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h2 className="mt-6 text-xl font-semibold text-foreground">No projects yet</h2>
                            <p className="mt-2 text-muted-foreground max-w-sm">
                                Create your first project to start collecting feedback.
                            </p>
                            <Link href="/projects/new" className="mt-8">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Project
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project, index) => (
                            <Link
                                key={project.id}
                                href={`/projects/${project.id}`}
                                className="group block animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted ring-1 ring-border group-hover:bg-primary/10 group-hover:ring-primary/30 transition-all">
                                                <FolderKanban className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
                                                <MessageSquare className="h-3.5 w-3.5" />
                                                {project._count.feedbacks}
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Created {formatDate(project.createdAt)}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                                            View Details
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

