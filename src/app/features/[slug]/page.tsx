import { Metadata } from "next";
import { notFound } from "next/navigation";
import { features, getFeatureBySlug, getAllFeatureSlugs } from "@/data/features";
import FeaturePage from "@/components/seo-pages/feature-page";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const feature = getFeatureBySlug(slug);

    if (!feature) {
        return { title: "Not Found" };
    }

    return {
        title: feature.metaTitle,
        description: feature.metaDescription,
        keywords: feature.keywords,
        openGraph: {
            title: feature.metaTitle,
            description: feature.metaDescription,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: feature.metaTitle,
            description: feature.metaDescription,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const feature = getFeatureBySlug(slug);

    if (!feature) {
        notFound();
    }

    return <FeaturePage feature={feature} />;
}
