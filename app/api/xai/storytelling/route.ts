import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const incident_id = body?.incident_id || "INC-9042";
    const threat_type = body?.threat_type || "Phishing Credential Harvest";

    const isPhishing = threat_type.toLowerCase().includes("phishing");
    const isDeepfake = threat_type.toLowerCase().includes("deepfake");

    const responseData = {
      success: true,
      incident_id,
      headline: isPhishing
        ? "Urgent Social Engineering Infiltration via Spoofed Credential Gateway"
        : isDeepfake
        ? "Synthetic Media Infiltration & Computer Vision Mesh Distortions"
        : "Multi-Vector Behavioral Anomaly & Geolocation Velocity Discrepancy",
      nlp_story_narrative: isPhishing
        ? `At 10:14 AM, an adversary initiated a targeted credential harvesting campaign targeting executive email nodes. The attack utilized urgency-manipulation syntax ('ACCOUNT SUSPENDED IN 2 HOURS') paired with a high-entropy shortened link (bit.ly/secure-login-v2). The XAI NLP Engine analyzed the message semantic vector and calculated a 98% threat probability based on suspicious domain age (2 days) and missing SPF/DKIM verification headers. Autonomous containment was triggered within 120 milliseconds, isolating the incoming vector and alerting SOC analysts.`
        : isDeepfake
        ? `A synthetic video frame artifact was submitted to the security boundary. The Computer Vision (CV) model mapped 68 facial landmark mesh nodes and detected a 4.82mm spatial alignment error along the lip-sync perimeter. Fourier spectral noise analysis yielded an index of 0.89, confirming GAN/Diffusion neural synthesis. The XAI system assigned a 94.8% manipulation probability and generated spatial heatmap overlays for executive triage.`
        : `User session telemetry recorded concurrent logins originating from New York (10:00 AM) and Tokyo (10:10 AM). Physical travel velocity was calculated at 40,560 MPH, spanning 6,760 miles within a 10-minute window. Because this exceeds physics capabilities for human transit, the UEBA anomaly engine classified the event as a critical session hijacking attempt.`,
      timeline_phases: isPhishing
        ? [
            { phase: "Phase 1: Initial Reconnaissance", timestamp: "10:12:00 AM", details: "Attacker probed MX mail servers using spoofed headers." },
            { phase: "Phase 2: Infiltration Payload", timestamp: "10:14:15 AM", details: "Phishing message delivered with urgent call-to-action payload." },
            { phase: "Phase 3: XAI Anomaly Trigger", timestamp: "10:14:16 AM", details: "Semantic NLP Engine flagged urgency manipulation & unverified TLD." },
            { phase: "Phase 4: Autonomous Containment", timestamp: "10:14:17 AM", details: "Domain reverse-proxy blocked & analyst ticket INC-9042 created." },
          ]
        : isDeepfake
        ? [
            { phase: "Phase 1: Video Frame Ingestion", timestamp: "11:00:00 AM", details: "Media file ingested via API endpoint." },
            { phase: "Phase 2: 68-Landmark Mesh Mapping", timestamp: "11:00:02 AM", details: "OpenCV CNN model extracted facial geometry vectors." },
            { phase: "Phase 3: Fourier Spectral Analysis", timestamp: "11:00:04 AM", details: "Isolated high-frequency noise spikes characteristic of diffusion models." },
            { phase: "Phase 4: Threat Flagging", timestamp: "11:00:05 AM", details: "Quarantined synthetic media frame and generated incident triage ticket." },
          ]
        : [
            { phase: "Phase 1: Node Login NY", timestamp: "10:00:00 AM", details: "Authorized login from New York node (198.51.100.42)." },
            { phase: "Phase 2: Node Login Tokyo", timestamp: "10:10:00 AM", details: "Secondary session initiated from Tokyo node (203.0.113.88)." },
            { phase: "Phase 3: Velocity Calculation", timestamp: "10:10:01 AM", details: "UEBA engine flagged impossible speed of 40,560 MPH." },
            { phase: "Phase 4: Session Isolation", timestamp: "10:10:02 AM", details: "Session tokens revoked and mandatory 2FA challenge triggered." },
          ],
      confidence_score: 98.4,
      xai_key_rationale: isPhishing
        ? ["Urgency manipulation score: 0.94", "Domain registration age < 72 hours", "Missing DMARC & SSL certificate alignment"]
        : isDeepfake
        ? ["Facial landmark boundary error > 4.5mm", "Fourier spectral noise index: 0.89", "Gaze vector alignment variance: 14.2 deg"]
        : ["Physical travel velocity exceeds 600 MPH threshold", "Unregistered Linux device user-agent", "IP ASN discrepancy"],
      suggested_mitigations: isPhishing
        ? ["Block sender domain across email gateway", "Revoke active OAuth tokens for targeted user", "Enforce mandatory hardware 2FA challenge"]
        : isDeepfake
        ? ["Quarantine media asset in immutable vault", "Flag executive identity for bio-verifiable check", "Log synthetic signature in global threat database"]
        : ["Terminate active session tokens globally", "Force immediate password reset with OTP", "Place Tokyo IP on active firewall blocklist"],
    };

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate XAI threat story." }, { status: 500 });
  }
}
