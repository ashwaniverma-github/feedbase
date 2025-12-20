export type Framework = "nextjs" | "react" | "html";
export type IntegrationMethod = "script" | "sdk";
export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

// ============================================
// SCRIPT-BASED INTEGRATION (existing)
// ============================================

export function getEmbedCode(framework: Framework, projectKey: string, origin: string) {
  if (framework === "nextjs") {
    return `import Script from 'next/script'

// Add to your app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* 1. Configuration */}
        <Script id="feedinbox-config" strategy="afterInteractive">
          {\`
            window.feedinboxConfig = {
              projectKey: "${projectKey}"
            };
          \`}
        </Script>

        {/* 2. Widget Script */}
        <Script
          src="${origin}/widget.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}`;
  }

  if (framework === "react") {
    return `import { useEffect } from 'react';

// In your root component (e.g., App.tsx)
useEffect(() => {
  // Check if already loaded
  if (window.feedinbox) {
    window.feedinbox.init({
      projectKey: "${projectKey}"
    });
    return;
  }

  // Load script
  const script = document.createElement("script");
  script.src = "${origin}/widget.js";
  script.async = true;
  
  script.onload = () => {
    // Initialize after load
    if (window.feedinbox) {
      window.feedinbox.init({
        projectKey: "${projectKey}"
      });
    }
  };

  document.body.appendChild(script);

  return () => {
    // Optional: cleanup if needed
  };
}, []);`;
  }

  // HTML
  return `<!-- Feedinbox Widget -->
<script>
  window.feedinboxConfig = {
    projectKey: "${projectKey}",
    position: "bottom-right",
    primaryColor: "#171717"
  };
</script>
<script async src="${origin}/widget.js"></script>`;
}

// ============================================
// SDK-BASED INTEGRATION (new)
// ============================================

export function getSDKInstallCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case "npm":
      return "npm install feedinbox";
    case "yarn":
      return "yarn add feedinbox";
    case "pnpm":
      return "pnpm add feedinbox";
    case "bun":
      return "bun add feedinbox";
    default:
      return "npm install feedinbox";
  }
}

export function getSDKCode(framework: "nextjs" | "react", projectKey: string): string {
  if (framework === "nextjs") {
    return `// app/layout.tsx (or any client component)
'use client';

import { Feedinbox } from 'feedinbox';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Feedinbox projectKey="${projectKey}" />
      </body>
    </html>
  );
}`;
  }

  // React
  return `// App.tsx (or any component)
import { Feedinbox } from 'feedinbox';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Feedinbox projectKey="${projectKey}" />
    </div>
  );
}

export default App;`;
}
