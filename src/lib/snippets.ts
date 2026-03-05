export type Framework = "nextjs" | "react" | "html";

export function getEmbedCode(framework: Framework, projectKey: string, origin: string) {
  if (framework === "nextjs") {
    return `import Script from 'next/script'

// Add to your app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="${origin}/widget.js"
          data-project-key="${projectKey}"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}`;
  }

  if (framework === "react") {
    return `<!-- Add to your public/index.html before </body> -->
<script async src="${origin}/widget.js" data-project-key="${projectKey}"></script>`;
  }

  // HTML
  return `<script async src="${origin}/widget.js" data-project-key="${projectKey}"></script>`;
}

