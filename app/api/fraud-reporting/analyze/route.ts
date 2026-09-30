import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, evidence_target, impact_loss_inr, victim_statement } = body;

    if (!category || !evidence_target) {
      return NextResponse.json(
        { error: "Category and evidence target details are required." },
        { status: 400 }
      );
    }

    const cat = String(category).toLowerCase();
    const target = String(evidence_target).trim();
    const loss = Number(impact_loss_inr || 0);

    const ticket_id = `RPT-${Math.floor(Math.random() * 90000 + 10000)}`;

    const isPhishing = cat.includes("phishing") || target.includes("http") || target.includes(".xyz");
    const isOTP = cat.includes("otp") || cat.includes("credential") || String(victim_statement || "").toLowerCase().includes("otp");
    const isDeepfake = cat.includes("deepfake") || cat.includes("media");

    const severity = isOTP || isDeepfake || loss > 25000 ? "CRITICAL" : "HIGH";
    const riskScore = severity === "CRITICAL" ? 96 : 84;

    const recurringPattern = isPhishing
      ? "Shortened URL Domain Spoofing Targeting Bank Users"
      : isOTP
      ? "Fake Telecom SIM Block / Electricity Bill OTP Scam"
      : isDeepfake
      ? "AI Synthesized Video Call Extortion Pattern"
      : "Fake UPI QR Code Money Transfer Fraud";

    const recurrenceFreq = Math.floor(Math.random() * 120 + 20);
    const isNewVector = recurrenceFreq > 75 || target.includes("bit.ly") || String(victim_statement || "").toLowerCase().includes("telegram");

    const alertDetails = isNewVector
      ? {
          alert_id: `ALT-${Math.floor(Math.random() * 9000 + 1000)}`,
          alert_level: "EMERGENCY_THREAT_VECTOR_DETECTED",
          vector_signature: `High-frequency scam pattern isolated for target: ${target}`,
          recommended_action: "Firewall domain block + Broadcast warning across SOC network",
        }
      : null;

    return NextResponse.json({
      success: true,
      report_ticket_id: ticket_id,
      classified_category: category.replace("_", " ").toUpperCase(),
      threat_severity: severity,
      risk_score: riskScore,
      recurring_scam_pattern_identified: recurringPattern,
      recurrence_frequency: recurrenceFreq,
      new_threat_vector_alert_triggered: isNewVector,
      alert_details: alertDetails,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze fraud report telemetry." }, { status: 500 });
  }
}
