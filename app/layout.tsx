import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import InitialLoader from "@/components/InitialLoader";

export const metadata: Metadata = {
  title: "CYBERGUARD XAI — AI Threat, Phishing & Deepfake Detection SaaS",
  description: "Next-generation Autonomous Cybersecurity SaaS featuring Explainable AI (XAI) multi-vector threat intelligence.",
  openGraph: {
    title: "CYBERGUARD XAI — Autonomous Cybersecurity SaaS",
    description: "Next-generation Explainable AI threat mitigation against phishing, deepfakes, and identity anomalies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#040D1A] text-white selection:bg-[#00C2FF] selection:text-black antialiased">
        <InitialLoader />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}

