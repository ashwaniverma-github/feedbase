import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Hr,
    Button,
    Img,
} from "@react-email/components";

interface NewFeedbackEmailProps {
    projectName: string;
    ownerName: string;
    category: string;
    message: string;
    userEmail?: string | null;
    pageUrl?: string | null;
    submittedAt: string;
    dashboardUrl: string;
}

const getCategoryEmoji = (category: string) => {
    switch (category) {
        case "bug":
            return "🐛";
        case "feature":
            return "💡";
        case "question":
            return "❓";
        default:
            return "💬";
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case "bug":
            return "#dc2626";
        case "feature":
            return "#ca8a04";
        case "question":
            return "#2563eb";
        default:
            return "#16a34a";
    }
};

export default function NewFeedbackEmail({
    projectName,
    ownerName,
    category,
    message,
    userEmail,
    pageUrl,
    submittedAt,
    dashboardUrl,
}: NewFeedbackEmailProps) {
    const previewText = `New ${category} feedback on ${projectName}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Img
                            src="https://feedinbox.com/feedinbox.png"
                            alt="Feedinbox"
                            width="120"
                            height="32"
                            style={logo}
                        />
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading style={heading}>New Feedback Received</Heading>

                        <Text style={greeting}>
                            Hi {ownerName?.split(" ")[0] || "there"},
                        </Text>

                        <Text style={paragraph}>
                            You received new feedback on <strong>{projectName}</strong>.
                        </Text>

                        {/* Category Badge */}
                        <Section style={categorySection}>
                            <Text
                                style={{
                                    ...categoryBadge,
                                    backgroundColor: getCategoryColor(category) + "15",
                                    color: getCategoryColor(category),
                                }}
                            >
                                {getCategoryEmoji(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Text>
                        </Section>

                        {/* Feedback Message */}
                        <Section style={messageBox}>
                            <Text style={messageText}>{message}</Text>
                        </Section>

                        {/* Meta Info */}
                        <Section style={metaSection}>
                            {userEmail && (
                                <Text style={metaText}>
                                    <strong>From:</strong> {userEmail}
                                </Text>
                            )}
                            {pageUrl && (
                                <Text style={metaText}>
                                    <strong>Page:</strong>{" "}
                                    <Link href={pageUrl} style={link}>
                                        {pageUrl}
                                    </Link>
                                </Text>
                            )}
                            <Text style={metaText}>
                                <strong>Submitted:</strong> {submittedAt}
                            </Text>
                        </Section>

                        <Hr style={hr} />

                        {/* CTA Button */}
                        <Section style={buttonSection}>
                            <Button style={button} href={dashboardUrl}>
                                View in Dashboard →
                            </Button>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            This email was sent by{" "}
                            <Link href={dashboardUrl} style={footerLink}>
                                Feedinbox
                            </Link>
                        </Text>
                        <Text style={footerText}>
                            You're receiving this because you own {projectName}.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    maxWidth: "600px",
};

const header = {
    padding: "20px 40px",
    backgroundColor: "#171717",
};

const logo = {
    margin: "0",
};

const content = {
    padding: "32px 40px",
};

const heading = {
    color: "#171717",
    fontSize: "24px",
    fontWeight: "bold" as const,
    margin: "0 0 20px",
};

const greeting = {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 8px",
};

const paragraph = {
    color: "#374151",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 24px",
};

const categorySection = {
    marginBottom: "16px",
};

const categoryBadge = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600" as const,
    margin: "0",
};

const messageBox = {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px",
    border: "1px solid #e5e7eb",
};

const messageText = {
    color: "#374151",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
};

const metaSection = {
    marginBottom: "24px",
};

const metaText = {
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0 0 8px",
};

const link = {
    color: "#2563eb",
    textDecoration: "none",
};

const hr = {
    borderColor: "#e5e7eb",
    margin: "24px 0",
};

const buttonSection = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#171717",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "600" as const,
    padding: "12px 24px",
    textDecoration: "none",
};

const footer = {
    padding: "0 40px",
};

const footerText = {
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "20px",
    margin: "0",
    textAlign: "center" as const,
};

const footerLink = {
    color: "#6b7280",
    textDecoration: "underline",
};
