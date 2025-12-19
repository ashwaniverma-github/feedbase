import { z } from "zod/v4";

// Helper to normalize domain - adds https:// if no protocol
const normalizeDomain = (val: string | undefined) => {
    if (!val || val.trim() === "") return undefined;
    const trimmed = val.trim();
    // If it already has a protocol, validate as-is
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }
    // Otherwise, add https:// prefix
    return `https://${trimmed}`;
};

export const createProjectSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    domain: z.string().optional().transform(normalizeDomain).pipe(z.string().url("Please enter a valid domain").optional()),
});

export const updateProjectSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    domain: z.string().optional().transform(normalizeDomain).pipe(z.string().url("Please enter a valid domain").optional()),
});

export const createFeedbackSchema = z.object({
    projectKey: z.string().min(1, "Project key is required"),
    message: z.string().min(1, "Message is required").max(5000),
    category: z.enum(["general", "bug", "feature", "question"]).default("general"),
    userEmail: z.string().optional().transform((val) => {
        if (!val || val.trim() === "") return undefined;
        return val;
    }).pipe(z.string().email().optional()),
    pageUrl: z.string().url().optional(),
});

export const feedbackFilterSchema = z.object({
    category: z.enum(["all", "general", "bug", "feature", "question"]).default("all"),
    isRead: z.enum(["all", "read", "unread"]).default("all"),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type FeedbackFilterInput = z.infer<typeof feedbackFilterSchema>;
