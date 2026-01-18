export interface Integration {
    slug: string;
    name: string;
    metaTitle: string;
    metaDescription: string;
    description: string;
    logo: string;
    heroHeadline: string;
    heroSubheadline: string;
    installMethod: "npm" | "script" | "both";
    codeExample: string;
    steps: {
        title: string;
        description: string;
        code?: string;
    }[];
    keywords: string[];
}

export const integrations: Integration[] = [
    {
        slug: "nextjs",
        name: "Next.js",
        metaTitle: "Feedback Widget for Next.js | Feedinbox",
        metaDescription: "Add a feedback widget to your Next.js app in 2 minutes. Collect user feedback, bug reports, and feature requests. npm install and go.",
        description: "The fastest way to add feedback collection to your Next.js application.",
        logo: "/integrations/nextjs.svg",
        heroHeadline: "Feedback for Next.js apps",
        heroSubheadline: "Add user feedback collection to your Next.js app with a single component. Works with App Router and Pages Router.",
        installMethod: "npm",
        codeExample: `import { Feedinbox } from 'feedinbox';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Feedinbox projectKey="your_project_key" />
    </>
  );
}`,
        steps: [
            { title: "Install the package", description: "Add Feedinbox to your project", code: "npm install feedinbox" },
            { title: "Import the component", description: "Add to your layout or page", code: "import { Feedinbox } from 'feedinbox';" },
            { title: "Add to your app", description: "Drop the component anywhere in your JSX", code: "<Feedinbox projectKey=\"your_key\" />" }
        ],
        keywords: ["nextjs feedback widget", "next.js feedback", "nextjs user feedback", "next.js bug reports"]
    },
    {
        slug: "react",
        name: "React",
        metaTitle: "React Feedback Widget Component | Feedinbox",
        metaDescription: "Add feedback collection to your React app. Simple component that works with any React setup. Vite, CRA, Remix, and more.",
        description: "A React component for collecting user feedback, designed to work with any React setup.",
        logo: "/integrations/react.svg",
        heroHeadline: "Feedback for React apps",
        heroSubheadline: "Drop in a component, start collecting feedback. Works with Vite, CRA, Remix, and any React setup.",
        installMethod: "npm",
        codeExample: `import { Feedinbox } from 'feedinbox';

function App() {
  return (
    <div>
      <YourApp />
      <Feedinbox projectKey="your_project_key" />
    </div>
  );
}`,
        steps: [
            { title: "Install via npm", description: "Add to your project", code: "npm install feedinbox" },
            { title: "Import the component", description: "Import in your app", code: "import { Feedinbox } from 'feedinbox';" },
            { title: "Render the widget", description: "Add anywhere in your component tree", code: "<Feedinbox projectKey=\"your_key\" />" }
        ],
        keywords: ["react feedback component", "react feedback widget", "react user feedback", "react bug report"]
    },
    {
        slug: "vue",
        name: "Vue.js",
        metaTitle: "Vue.js Feedback Widget | Feedinbox",
        metaDescription: "Add feedback collection to your Vue.js application. Works with Vue 2, Vue 3, and Nuxt. Simple script tag integration.",
        description: "Collect user feedback in your Vue.js app with a simple script tag integration.",
        logo: "/integrations/vue.svg",
        heroHeadline: "Feedback for Vue apps",
        heroSubheadline: "Add the Feedinbox widget to your Vue.js application in under 2 minutes.",
        installMethod: "script",
        codeExample: `<!-- In your index.html or main template -->
<script>
  window.feedinboxConfig = {
    projectKey: "your_project_key"
  };
</script>
<script async src="https://feedinbox.com/widget.js"></script>`,
        steps: [
            { title: "Add config script", description: "Add to your HTML head or body", code: "window.feedinboxConfig = { projectKey: 'your_key' };" },
            { title: "Load the widget", description: "Add the widget script", code: '<script async src="https://feedinbox.com/widget.js"></script>' },
            { title: "Done!", description: "The widget will appear on your site automatically", code: "" }
        ],
        keywords: ["vue feedback widget", "vue.js feedback", "vue user feedback", "vue bug reports"]
    },
    {
        slug: "angular",
        name: "Angular",
        metaTitle: "Angular Feedback Widget | Feedinbox",
        metaDescription: "Add a feedback widget to your Angular application. Simple script integration that works with any Angular version.",
        description: "Integrate Feedinbox into your Angular app with a simple script tag.",
        logo: "/integrations/angular.svg",
        heroHeadline: "Feedback for Angular apps",
        heroSubheadline: "Add user feedback collection to your Angular application without complex setup.",
        installMethod: "script",
        codeExample: `<!-- In your index.html -->
<script>
  window.feedinboxConfig = {
    projectKey: "your_project_key"
  };
</script>
<script async src="https://feedinbox.com/widget.js"></script>`,
        steps: [
            { title: "Open index.html", description: "Find your main index.html file", code: "" },
            { title: "Add the config", description: "Add before closing body tag", code: "window.feedinboxConfig = { projectKey: 'your_key' };" },
            { title: "Add the script", description: "Load the widget", code: '<script async src="https://feedinbox.com/widget.js"></script>' }
        ],
        keywords: ["angular feedback widget", "angular feedback", "angular user feedback", "angular bug reports"]
    },
    {
        slug: "wordpress",
        name: "WordPress",
        metaTitle: "WordPress Feedback Widget | Feedinbox",
        metaDescription: "Add a feedback widget to your WordPress site. No plugin required. Just paste the code snippet in your theme.",
        description: "Add Feedinbox to any WordPress site without installing a plugin.",
        logo: "/integrations/wordpress.svg",
        heroHeadline: "Feedback for WordPress",
        heroSubheadline: "Collect visitor feedback on your WordPress site. No plugin required—just a simple code snippet.",
        installMethod: "script",
        codeExample: `<!-- Add to your theme's footer.php or via 'Insert Headers and Footers' plugin -->
<script>
  window.feedinboxConfig = {
    projectKey: "your_project_key"
  };
</script>
<script async src="https://feedinbox.com/widget.js"></script>`,
        steps: [
            { title: "Access your theme", description: "Go to Appearance > Theme Editor, or use a header/footer plugin", code: "" },
            { title: "Paste the code", description: "Add before </body> in footer.php", code: "" },
            { title: "Save and test", description: "Visit your site to see the widget", code: "" }
        ],
        keywords: ["wordpress feedback widget", "wordpress feedback plugin", "wordpress user feedback", "wordpress bug reports"]
    },
    {
        slug: "shopify",
        name: "Shopify",
        metaTitle: "Shopify Feedback Widget | Feedinbox",
        metaDescription: "Collect customer feedback on your Shopify store. Understand buyer needs and improve your shopping experience.",
        description: "Add a feedback widget to your Shopify store to collect customer insights.",
        logo: "/integrations/shopify.svg",
        heroHeadline: "Feedback for Shopify stores",
        heroSubheadline: "Understand what your customers want. Add a feedback widget to your Shopify store in minutes.",
        installMethod: "script",
        codeExample: `<!-- Add to theme.liquid before </body> -->
<script>
  window.feedinboxConfig = {
    projectKey: "your_project_key"
  };
</script>
<script async src="https://feedinbox.com/widget.js"></script>`,
        steps: [
            { title: "Go to Online Store", description: "Navigate to Online Store > Themes > Edit Code", code: "" },
            { title: "Edit theme.liquid", description: "Find theme.liquid in your Layout folder", code: "" },
            { title: "Paste before </body>", description: "Add the code snippet and save", code: "" }
        ],
        keywords: ["shopify feedback widget", "shopify customer feedback", "shopify store feedback", "ecommerce feedback"]
    },
    {
        slug: "webflow",
        name: "Webflow",
        metaTitle: "Webflow Feedback Widget | Feedinbox",
        metaDescription: "Add a feedback widget to your Webflow site. Collect visitor feedback without code. Just paste and publish.",
        description: "Embed Feedinbox in your Webflow site with a simple custom code block.",
        logo: "/integrations/webflow.svg",
        heroHeadline: "Feedback for Webflow sites",
        heroSubheadline: "Collect feedback on your Webflow site. Add via Project Settings or custom code embed.",
        installMethod: "script",
        codeExample: `<!-- Add to Project Settings > Custom Code > Footer Code -->
<script>
  window.feedinboxConfig = {
    projectKey: "your_project_key"
  };
</script>
<script async src="https://feedinbox.com/widget.js"></script>`,
        steps: [
            { title: "Open Project Settings", description: "Go to your Webflow project settings", code: "" },
            { title: "Custom Code tab", description: "Find the Custom Code section", code: "" },
            { title: "Paste in Footer Code", description: "Add the snippet and publish your site", code: "" }
        ],
        keywords: ["webflow feedback widget", "webflow feedback", "webflow user feedback", "webflow contact form alternative"]
    },
    {
        slug: "html",
        name: "HTML / Static Sites",
        metaTitle: "HTML Feedback Widget | Feedinbox",
        metaDescription: "Add a feedback widget to any HTML website. Just two script tags. Works on any static site, landing page, or web app.",
        description: "The simplest way to add feedback collection—works on any HTML page.",
        logo: "/integrations/html.svg",
        heroHeadline: "Feedback for any website",
        heroSubheadline: "Just two script tags. Works on any HTML page, static site, or web application.",
        installMethod: "script",
        codeExample: `<!-- Add before </body> -->
<script>
  window.feedinboxConfig = {
    projectKey: "your_project_key"
  };
</script>
<script async src="https://feedinbox.com/widget.js"></script>`,
        steps: [
            { title: "Open your HTML file", description: "Find your index.html or main HTML file", code: "" },
            { title: "Add before </body>", description: "Paste the code snippet", code: "" },
            { title: "Upload and test", description: "Deploy your site and test the widget", code: "" }
        ],
        keywords: ["html feedback widget", "static site feedback", "website feedback widget", "simple feedback script"]
    },
    {
        slug: "nuxt",
        name: "Nuxt.js",
        metaTitle: "Nuxt.js Feedback Widget | Feedinbox",
        metaDescription: "Add feedback collection to your Nuxt.js app. Works with Nuxt 2 and Nuxt 3. Simple plugin or script integration.",
        description: "Seamless feedback collection for Nuxt.js applications.",
        logo: "/integrations/nuxt.svg",
        heroHeadline: "Feedback for Nuxt apps",
        heroSubheadline: "Add user feedback to your Nuxt.js application with minimal configuration.",
        installMethod: "script",
        codeExample: `// In nuxt.config.ts or nuxt.config.js
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { innerHTML: 'window.feedinboxConfig = { projectKey: "your_key" };' },
        { src: 'https://feedinbox.com/widget.js', async: true }
      ]
    }
  }
})`,
        steps: [
            { title: "Open nuxt.config", description: "Find your nuxt.config.ts or nuxt.config.js", code: "" },
            { title: "Add to head scripts", description: "Configure the widget scripts", code: "" },
            { title: "Restart and test", description: "Restart your dev server and check", code: "" }
        ],
        keywords: ["nuxt feedback widget", "nuxt.js feedback", "nuxt user feedback", "nuxt bug reports"]
    },
    {
        slug: "gatsby",
        name: "Gatsby",
        metaTitle: "Gatsby Feedback Widget | Feedinbox",
        metaDescription: "Add a feedback widget to your Gatsby site. Simple integration via gatsby-ssr.js or gatsby-browser.js.",
        description: "Collect user feedback on your Gatsby site with minimal setup.",
        logo: "/integrations/gatsby.svg",
        heroHeadline: "Feedback for Gatsby sites",
        heroSubheadline: "Add feedback collection to your Gatsby static site with a simple configuration.",
        installMethod: "both",
        codeExample: `// gatsby-ssr.js
import React from 'react';

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="feedinbox-config" dangerouslySetInnerHTML={{
      __html: \`window.feedinboxConfig = { projectKey: "your_key" };\`
    }} />,
    <script key="feedinbox-widget" async src="https://feedinbox.com/widget.js" />
  ]);
};`,
        steps: [
            { title: "Open gatsby-ssr.js", description: "Create or edit gatsby-ssr.js in your root", code: "" },
            { title: "Add onRenderBody", description: "Configure the widget scripts", code: "" },
            { title: "Build and deploy", description: "Run gatsby build and deploy your site", code: "" }
        ],
        keywords: ["gatsby feedback widget", "gatsby feedback", "gatsby user feedback", "static site feedback"]
    }
];

export function getIntegrationBySlug(slug: string): Integration | undefined {
    return integrations.find((i) => i.slug === slug);
}

export function getAllIntegrationSlugs(): string[] {
    return integrations.map((i) => i.slug);
}
