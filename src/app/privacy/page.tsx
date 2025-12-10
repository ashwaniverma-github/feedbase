import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
                    Privacy Policy
                </h1>
                <p className="text-neutral-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-p:leading-relaxed prose-li:leading-relaxed space-y-8">
                    <div>
                        <p className="lead text-xl text-neutral-600">
                            At Feedinbox , we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">1. Information We Collect</h2>
                        <p>
                            We collect information that you strictly provide to us. This may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> Name, email address, and password when you register.</li>
                            <li><strong>Feedback Data:</strong> Content of feedback, bug reports, and metadata submitted through our widgets.</li>
                            <li><strong>Usage Data:</strong> Information on how you interact with our dashboard and services.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">2. How We Use Your Information</h2>
                        <p>
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and maintain our Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To allow you to participate in interactive features when you choose to do so.</li>
                            <li>To provide customer support.</li>
                            <li>To gather analysis or valuable information so that we can improve our Service.</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">3. Data Storage and Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your personal data against accidental or unlawful destruction, loss, change, or damage. All data is stored on secure servers.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">4. Third-Party Services</h2>
                        <p>
                            We may use third-party Service Providers to monitor and analyze the use of our Service, such as analytics providers. We also use email service providers (like Resend) to deliver notifications.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">5. Your Rights</h2>
                        <p>
                            You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update, or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mt-12 mb-6">6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@feedinbox.com" className="text-blue-600 hover:underline">support@feedinbox.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
