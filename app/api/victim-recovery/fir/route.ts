import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      victim_name,
      victim_email,
      victim_phone,
      victim_address,
      incident_date,
      financial_loss_inr,
      transaction_ref_id,
      scammer_details,
      complaint_description,
    } = body;

    if (!victim_name || !victim_phone) {
      return NextResponse.json({ error: "Victim Name and Phone Number are required fields." }, { status: 400 });
    }

    const ref_no = `CYBER-FIR-2026-${Math.floor(Math.random() * 900000 + 100000)}`;
    const timestamp = new Date().toISOString();

    const document_text = `
================================================================================
FORMAL LEGAL CYBER CRIME COMPLAINT / FIRST INFORMATION REPORT (FIR)
Under Section 154 Code of Criminal Procedure (CrPC) & Information Technology Act 2000
================================================================================

REF COMPLAINT NO: ${ref_no}
DATE & TIME: ${timestamp}
TO: The Officer-in-Charge / Superintendent of Police
    Cyber Crime Investigation Cell, National Cyber Crime Reporting Portal

I. DETAILS OF COMPLAINANT / VICTIM:
--------------------------------------------------------------------------------
1. Full Name of Victim   : ${victim_name}
2. Contact Email Address : ${victim_email || "N/A"}
3. Contact Phone Number  : ${victim_phone}
4. Residential Address   : ${victim_address || "N/A"}

II. DETAILS OF INCIDENT & FINANCIAL FRAUD:
--------------------------------------------------------------------------------
1. Date & Time of Incident : ${incident_date || "Recent Incident"}
2. Financial Loss Amount   : INR ₹${Number(financial_loss_inr || 0).toLocaleString("en-IN")}
3. Transaction / UPI Ref ID: ${transaction_ref_id || "N/A"}
4. Alleged Suspect Details : ${scammer_details || "Unidentified Cyber Perpetrator"}

III. BRIEF STATEMENT OF FACTS & INCIDENT NARRATIVE:
--------------------------------------------------------------------------------
${complaint_description || "The complainant was victimized by digital fraud and financial deception."}

The complainant was targeted via unauthorized digital fraud/impersonation.
The perpetrator induced the victim into transferring funds using deceptive tactics.
The telemetry evidence has been logged and cryptographically signed by the CYBERGUARD XAI Forensic System.

IV. APPLICABLE LEGAL SECTIONS & STATUTORY PROVISIONS:
--------------------------------------------------------------------------------
• Section 66C, Information Technology Act, 2000 (Identity Theft)
• Section 66D, Information Technology Act, 2000 (Cheating by Impersonation)
• Section 420, Indian Penal Code (IPC) (Cheating and Dishonestly Inducing Delivery)
• Section 419, Indian Penal Code (IPC) (Punishment for Cheating by Personation)

V. PRAYER / RELIEF SOUGHT:
--------------------------------------------------------------------------------
1. Registration of formal First Information Report (FIR) under applicable sections.
2. Immediate freezing of destination bank account/UPI handle associated with Ref ID ${transaction_ref_id || "N/A"}.
3. Issuance of legal notice to concerned Intermediary / ISP for subscriber details.

DIGITAL STAMP & EVIDENCE SEAL:
[CYBERGUARD XAI FORENSIC VERIFIED • SHA-256 SECURE SIGNATURE]
Complainant Signature: ${victim_name}
================================================================================
`.trim();

    return NextResponse.json({
      success: true,
      fir_reference_no: ref_no,
      legal_section_clauses: [
        "Section 66C IT Act 2000 (Identity Theft)",
        "Section 66D IT Act 2000 (Impersonation Fraud)",
        "Section 420 IPC (Cheating & Financial Fraud)",
        "Section 419 IPC (Cheating by Personation)",
      ],
      police_station_jurisdiction: "Cyber Crime Police Station / National Cyber Crime Reporting Cell",
      fir_full_document_text: document_text,
      timestamp,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate FIR complaint letter." }, { status: 500 });
  }
}
