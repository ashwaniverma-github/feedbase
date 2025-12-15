import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-900 py-12 text-sm text-neutral-400">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 sm:flex-row">
                <p>© {new Date().getFullYear()} Feedinbox. All rights reserved.</p>
                <div className="flex gap-6 items-center">
                    <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    <a
                        href="https://x.com/ashwanivermax"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Contact Founder
                    </a>
                </div>
            </div>
        </footer>
    );
}
