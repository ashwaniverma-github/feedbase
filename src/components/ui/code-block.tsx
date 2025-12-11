"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    className?: string;
}

export function CodeBlock({ code, language = "typescript", filename, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Basic syntax highlighting
    const highlightCode = (code: string) => {
        // Keywords
        const keywords = [
            "import", "export", "default", "function", "return", "const", "var", "let",
            "if", "else", "true", "false", "undefined", "null", "typeof", "window",
            "async", "await"
        ];

        // Split by non-word characters but keep delimiters
        const parts = code.split(/([a-zA-Z0-9_$]+|"[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`|\/\/.*|\/\*[\s\S]*?\*\/)/);

        return parts.map((part, i) => {
            // String literals (simple)
            if (part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) {
                return <span key={i} className="text-green-400">{part}</span>;
            }
            // Comments
            if (part.startsWith("//") || part.startsWith("/*")) {
                return <span key={i} className="text-neutral-500 italic">{part}</span>;
            }
            // Keywords
            if (keywords.includes(part)) {
                return <span key={i} className="text-purple-400 font-medium">{part}</span>;
            }
            // JSX/HTML Tags (rudimentary)
            if (part.match(/^[A-Z][a-zA-Z0-9]*$/) && i > 0 && parts[i - 1] === "<") { // Opening tag
                return <span key={i} className="text-red-400">{part}</span>;
            }
            // Functions (rudimentary) - often followed by (
            if (i < parts.length - 1 && parts[i + 1].startsWith("(")) {
                if (!keywords.includes(part)) {
                    return <span key={i} className="text-blue-400">{part}</span>;
                }
            }
            // Numbers
            if (part.match(/^[0-9]+$/)) {
                return <span key={i} className="text-orange-400">{part}</span>;
            }

            // Default
            return <span key={i} className="text-neutral-200">{part}</span>;
        });
    };

    return (
        <div className={cn("overflow-hidden rounded-xl border border-neutral-800 bg-[#1e1e1e] shadow-2xl", className)}>
            {/* IDE Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-[#2d2d2d] px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/50" />
                        <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/50" />
                        <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#27c93f]/50" />
                    </div>
                    {filename && (
                        <div className="text-xs font-medium text-neutral-400 font-mono">
                            {filename}
                        </div>
                    )}
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 rounded bg-neutral-700/50 px-2 py-1 text-xs font-medium text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-neutral-200"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Area */}
            <div className="overflow-x-auto p-4 md:p-6">
                <pre className="font-mono text-sm leading-relaxed">
                    <code>{highlightCode(code)}</code>
                </pre>
            </div>
        </div>
    );
}
