import { Project, Feedback, User } from "@prisma/client";

// Extended types with relations
export type ProjectWithCount = Project & {
    _count: {
        feedbacks: number;
    };
};

export type FeedbackWithProject = Feedback & {
    project: Project;
};

// API response types
export interface PaginatedResponse<T> {
    feedbacks: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface AnalyticsData {
    total: number;
    unread: number;
    today: number;
    thisWeek: number;
    categories: {
        general: number;
        bug: number;
        feature: number;
        question: number;
    };
}

// Form types
export interface CreateProjectForm {
    name: string;
    domain?: string;
}

export interface FeedbackFilters {
    category: "all" | "general" | "bug" | "feature" | "question";
    isRead: "all" | "read" | "unread";
    search: string;
}

// Widget types
export interface FeedbaseWidgetConfig {
    projectKey: string;
    position?: "bottom-right" | "bottom-left";
    primaryColor?: string;
}

// Session extension for NextAuth
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export type { Project, Feedback, User };
