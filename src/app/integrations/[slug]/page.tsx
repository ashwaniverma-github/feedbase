import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntegrationBySlug, getAllIntegrationSlugs } from "@/data/integrations";
import IntegrationPage from "@/components/seo-pages/integration-page";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllIntegrationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const integration = getIntegrationBySlug(slug);

    if (!integration) {
        return { title: "Not Found" };
    }

    return {
        title: integration.metaTitle,
        description: integration.metaDescription,
        keywords: integration.keywords,
        openGraph: {
            title: integration.metaTitle,
            description: integration.metaDescription,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: integration.metaTitle,
            description: integration.metaDescription,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const integration = getIntegrationBySlug(slug);

    if (!integration) {
        notFound();
    }

    return <IntegrationPage integration={integration} />;
}
