import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUseCaseBySlug, getAllUseCaseSlugs } from "@/data/use-cases";
import UseCasePage from "@/components/seo-pages/use-case-page";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const useCase = getUseCaseBySlug(slug);

    if (!useCase) {
        return { title: "Not Found" };
    }

    return {
        title: useCase.metaTitle,
        description: useCase.metaDescription,
        keywords: useCase.keywords,
        openGraph: {
            title: useCase.metaTitle,
            description: useCase.metaDescription,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: useCase.metaTitle,
            description: useCase.metaDescription,
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const useCase = getUseCaseBySlug(slug);

    if (!useCase) {
        notFound();
    }

    return <UseCasePage useCase={useCase} />;
}
