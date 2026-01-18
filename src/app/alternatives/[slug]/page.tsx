import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAlternativeBySlug, getAllAlternativeSlugs } from "@/data/alternatives";
import AlternativePage from "@/components/seo-pages/alternative-page";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllAlternativeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const alternative = getAlternativeBySlug(slug);

    if (!alternative) {
        return { title: "Not Found" };
    }

    return {
        title: alternative.metaTitle,
        description: alternative.metaDescription,
        keywords: alternative.keywords,
        openGraph: {
            title: alternative.metaTitle,
            description: alternative.metaDescription,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: alternative.metaTitle,
            description: alternative.metaDescription,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const alternative = getAlternativeBySlug(slug);

    if (!alternative) {
        notFound();
    }

    return <AlternativePage alternative={alternative} />;
}
