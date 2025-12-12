import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-900 py-12 text-sm text-neutral-400">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 sm:flex-row">
                <p>© {new Date().getFullYear()} Feedinbox. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
