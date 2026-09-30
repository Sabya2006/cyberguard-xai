import { NextResponse } from "next/server";

export async function GET() {
  const analyticsData = {
    total_reports_submitted: 1482,
    categories_breakdown: [
      { category: "Phishing Links & Spoofed Websites", count: 624, percent: 42, color: "#00C2FF" },
      { category: "OTP & Credential Theft Scams", count: 415, percent: 28, color: "#FF4D4D" },
      { category: "UPI / Banking Transaction Fraud", count: 267, percent: 18, color: "#FF9100" },
      { category: "Telecom / Impersonation Calls", count: 118, percent: 8, color: "#7B61FF" },
      { category: "Deepfake & Media Extortion", count: 58, percent: 4, color: "#00E676" },
    ],
    recurring_hotspots: [
      { pattern: "Fake Electricity Bill Disconnection SMS", vector: "OTP / SMS", reports: 248, risk: "CRITICAL" },
      { pattern: "Bit.ly Shortened Link Targeting Bank Credentials", vector: "Phishing URL", reports: 192, risk: "CRITICAL" },
      { pattern: "WhatsApp Part-Time Job Income Fraud", vector: "UPI Transfer", reports: 114, risk: "HIGH" },
      { pattern: "AI Voice Mimicry Emergency Ransom Call", vector: "Deepfake Voice", reports: 42, risk: "HIGH" },
    ],
    recent_threat_alerts: [
      { alert_id: "ALT-9041", title: "Emerging Phishing Campaign: Spoofed Bank KYC Portal", status: "ACTIVE ALERT", time: "10 mins ago" },
      { alert_id: "ALT-8912", title: "Automated OTP Interception Bot via Malicious APK", status: "CONTAINED", time: "1 hour ago" },
    ],
  };

  return NextResponse.json({ success: true, data: analyticsData });
}
