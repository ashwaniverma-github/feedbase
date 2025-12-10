import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-2">
                    Terms of Service
                </h1>
                <p className="text-neutral-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-p:leading-relaxed space-y-8">
                    <div>
                        <p className="lead text-xl text-neutral-600">
                            Please read these Terms of Service carefully before using the Feedinbox website operated by Feedinbox.
                        </p>
                        <br />
                        <p>
                            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">1. Accounts</h2>
                        <p>
                            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">2. Intellectual Property</h2>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Feedinbox and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">3. Links To Other Web Sites</h2>
                        <p>
                            Our Service may contain links to third-party web sites or services that are not owned or controlled by Feedinbox. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">4. Termination</h2>
                        <p>
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">5. Limitation of Liability</h2>
                        <p>
                            In no event shall Feedinbox, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">6. Changes</h2>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at <a href="mailto:support@feedinbox.com" className="text-blue-600 hover:underline">support@feedinbox.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
