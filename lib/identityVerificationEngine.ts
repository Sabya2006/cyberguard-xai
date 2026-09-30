// ============================================================================
// CYBERGUARD XAI — MULTI-LAYER IDENTITY & LINK VERIFICATION ENGINE
// Analyzes sender, email, organization, domain, website, URL, and destination
// ============================================================================

export type VerificationState = "PASS" | "WARNING" | "FAIL" | "UNKNOWN";
export type RelationshipStatus = "MATCH" | "PARTIAL_MATCH" | "MISMATCH" | "UNKNOWN";

export interface IdentityChainNode {
  from: string;
  to: string;
  label: string;
  status: RelationshipStatus;
  details: string;
}

export interface LayerAnalysis {
  state: VerificationState;
  title: string;
  findings: string[];
  evidence: Record<string, string>;
}

export interface IdentityVerificationResult {
  riskScore: number;
  riskLevel: "LOW RISK" | "MEDIUM RISK" | "HIGH RISK" | "CRITICAL RISK";
  identityConsistencyScore: number; // 0 - 100
  identityChain: IdentityChainNode[];
  layers: {
    sender: LayerAnalysis;
    email: LayerAnalysis;
    organization: LayerAnalysis;
    domain: LayerAnalysis;
    website: LayerAnalysis;
    url: LayerAnalysis;
    destination: LayerAnalysis;
  };
  whySuspicious: string[];
  evidenceBreakdown: Array<{ field: string; finding: string; state: VerificationState }>;
  recommendedSafeAction: string[];
}

export interface VerificationInput {
  senderDisplayName?: string;
  senderEmail?: string;
  claimedOrganization?: string;
  displayedLinkText?: string;
  actualUrl?: string;
  messageBody?: string;
  spfResult?: string;
  dkimResult?: string;
  dmarcResult?: string;
}

export function evaluateMultiLayerIdentity(input: VerificationInput): IdentityVerificationResult {
  const senderName = (input.senderDisplayName || "Unknown Sender").trim();
  const senderEmail = (input.senderEmail || "").trim().toLowerCase();
  const claimedOrg = (input.claimedOrganization || "").trim();
  const displayedLink = (input.displayedLinkText || "").trim();
  const rawUrl = (input.actualUrl || "").trim();
  const messageBody = (input.messageBody || "").toLowerCase();

  // Extract email domain
  const emailDomainMatch = senderEmail.match(/@([^@]+)$/);
  const emailDomain = emailDomainMatch ? emailDomainMatch[1] : "";

  // Parse URL details
  let parsedUrl: URL | null = null;
  let urlProtocol = "UNKNOWN";
  let urlDomain = "";
  let urlSubdomain = "";

  if (rawUrl) {
    let normalized = rawUrl;
    if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
      normalized = "https://" + normalized;
    }
    try {
      parsedUrl = new URL(normalized);
      urlProtocol = parsedUrl.protocol.replace(":", "").toUpperCase();
      urlDomain = parsedUrl.hostname;
      const parts = urlDomain.split(".");
      if (parts.length > 2) {
        urlSubdomain = parts.slice(0, -2).join(".");
      }
    } catch {
      urlDomain = rawUrl;
    }
  }

  // --- LAYER 1: SENDER VERIFICATION ---
  const senderFindings: string[] = [];
  const senderEvidence: Record<string, string> = {
    "Display Name": senderName,
    "Sender Email": senderEmail || "Not provided",
  };

  let senderState: VerificationState = "PASS";
  if (!senderEmail) {
    senderState = "UNKNOWN";
    senderFindings.push("Sender email address not provided. Unable to verify sender identity.");
  } else {
    // Check display name mismatch
    const orgInName = claimedOrg ? senderName.toLowerCase().includes(claimedOrg.toLowerCase()) : false;
    const orgInEmail = claimedOrg ? senderEmail.includes(claimedOrg.toLowerCase().replace(/\s+/g, "")) : false;

    if (orgInName && !orgInEmail) {
      senderState = "FAIL";
      senderFindings.push(`Display name claims '${claimedOrg}', but sender email '${senderEmail}' has a different domain.`);
    }

    if (input.spfResult || input.dkimResult) {
      senderEvidence["SPF Result"] = input.spfResult || "UNKNOWN";
      senderEvidence["DKIM Result"] = input.dkimResult || "UNKNOWN";
      senderEvidence["DMARC Result"] = input.dmarcResult || "UNKNOWN";

      if (input.spfResult === "FAIL" || input.dmarcResult === "FAIL") {
        senderState = "FAIL";
        senderFindings.push("Email authentication failed SPF/DMARC verification check.");
      }
    } else {
      senderFindings.push("Email authentication headers (SPF/DKIM/DMARC) unavailable. Display name alone is not proof of identity.");
    }
  }

  // --- LAYER 2: EMAIL VERIFICATION ---
  const emailFindings: string[] = [];
  const emailEvidence: Record<string, string> = {
    "Email Address": senderEmail || "None",
    "Extracted Domain": emailDomain || "None",
  };
  let emailState: VerificationState = "PASS";

  const freeMailProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"];
  const isFreeMail = freeMailProviders.includes(emailDomain);

  if (isFreeMail && claimedOrg) {
    emailState = "WARNING";
    emailFindings.push(`Sender is using a free-mail provider (${emailDomain}) while claiming to represent official organization '${claimedOrg}'.`);
    emailEvidence["Mail Provider Type"] = "Public Free-Mail (Risk Indicator)";
  } else if (!emailDomain) {
    emailState = "UNKNOWN";
    emailFindings.push("Unable to verify email domain structure.");
  } else {
    emailEvidence["Mail Provider Type"] = "Custom Corporate Domain";
  }

  // --- LAYER 3: ORGANIZATION VERIFICATION ---
  const orgFindings: string[] = [];
  const orgEvidence: Record<string, string> = {
    "Claimed Organization": claimedOrg || "Not specified",
    "Email Domain": emailDomain || "None",
    "URL Domain": urlDomain || "None",
  };
  let orgState: VerificationState = "PASS";

  if (claimedOrg) {
    const cleanOrg = claimedOrg.toLowerCase().replace(/[^a-z0-9]/g, "");
    const emailMatches = emailDomain.includes(cleanOrg);
    const urlMatches = urlDomain.includes(cleanOrg);

    if (!emailMatches && !urlMatches) {
      orgState = "FAIL";
      orgFindings.push(`Claimed organization '${claimedOrg}' does not match email domain (${emailDomain}) or web domain (${urlDomain}).`);
      orgFindings.push("Possible brand impersonation attempt detected.");
    } else if (!emailMatches || !urlMatches) {
      orgState = "WARNING";
      orgFindings.push(`Partial inconsistency: Organization '${claimedOrg}' matches only one of the destination domains.`);
    } else {
      orgFindings.push(`Organization '${claimedOrg}' aligns with domain signatures.`);
    }
  } else {
    orgState = "UNKNOWN";
    orgFindings.push("No claimed organization specified in input message payload.");
  }

  // --- LAYER 4: DOMAIN ANALYSIS ---
  const domainFindings: string[] = [];
  const domainEvidence: Record<string, string> = {
    "Target Domain": urlDomain || "None",
    "Subdomain": urlSubdomain || "None",
  };
  let domainState: VerificationState = "PASS";

  if (urlDomain) {
    const isShortener = ["bit.ly", "tinyurl.com", "t.co", "is.gd", "rb.gy"].includes(urlDomain.toLowerCase());
    const isSuspiciousTLD = urlDomain.endsWith(".xyz") || urlDomain.endsWith(".top") || urlDomain.endsWith(".click") || urlDomain.endsWith(".site");

    if (isShortener) {
      domainState = "WARNING";
      domainFindings.push(`Domain '${urlDomain}' is a known URL shortener masking the final destination.`);
      domainEvidence["Domain Type"] = "URL Shortener / Masked Link";
    }

    if (isSuspiciousTLD) {
      domainState = "WARNING";
      domainFindings.push(`Domain uses high-risk top-level domain extension (.${urlDomain.split(".").pop()}).`);
      domainEvidence["TLD Risk Profile"] = "High Risk Extension";
    }

    if (urlSubdomain.includes("login") || urlSubdomain.includes("verify") || urlSubdomain.includes("secure")) {
      domainState = "FAIL";
      domainFindings.push(`Suspicious subdomain pattern '${urlSubdomain}' detected impersonating security keywords.`);
    }

    domainFindings.push("Note: HTTPS alone is NOT proof of authenticity; new domains are evaluated with multi-signal evidence.");
  } else {
    domainState = "UNKNOWN";
    domainFindings.push("No domain available for structural analysis.");
  }

  // --- LAYER 5: WEBSITE ANALYSIS ---
  const websiteFindings: string[] = [];
  const websiteEvidence: Record<string, string> = {};
  let websiteState: VerificationState = "PASS";

  const asksCredentials = messageBody.includes("password") || messageBody.includes("otp") || messageBody.includes("verify account") || messageBody.includes("update payment");
  if (asksCredentials) {
    websiteState = "WARNING";
    websiteFindings.push("Message/Page requests sensitive credentials or account verification.");
    websiteEvidence["Credential Request"] = "Sensitive Data Requested";
  }

  if (claimedOrg && urlDomain && !urlDomain.includes(claimedOrg.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
    websiteState = "FAIL";
    websiteFindings.push(`Website identity on '${urlDomain}' conflicts with claimed organization '${claimedOrg}'.`);
  }

  // --- LAYER 6: URL ANALYSIS ---
  const urlFindings: string[] = [];
  const urlEvidence: Record<string, string> = {
    "Protocol": urlProtocol,
    "Full Host": urlDomain || "None",
  };
  let urlState: VerificationState = "PASS";

  if (rawUrl) {
    if (urlProtocol === "HTTP") {
      urlState = "WARNING";
      urlFindings.push("URL uses unencrypted HTTP protocol.");
    }

    if (displayedLink && displayedLink.startsWith("http") && !displayedLink.includes(urlDomain)) {
      urlState = "FAIL";
      urlFindings.push(`Mismatched Link: Displayed link text shows '${displayedLink}' but target URL points to '${urlDomain}'.`);
      urlEvidence["Link Text Mismatch"] = "Displayed vs Actual URL Mismatch";
    }
  } else {
    urlState = "UNKNOWN";
    urlFindings.push("No URL provided for structural path analysis.");
  }

  // --- LAYER 7: LINK DESTINATION ANALYSIS ---
  const destFindings: string[] = [];
  const destEvidence: Record<string, string> = {
    "Original Target": rawUrl || "None",
    "Redirect Chain": rawUrl ? `${rawUrl} → ${urlDomain}` : "None",
  };
  let destState: VerificationState = "PASS";

  if (rawUrl) {
    if (claimedOrg && !urlDomain.includes(claimedOrg.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
      destState = "FAIL";
      destFindings.push(`Final destination domain '${urlDomain}' does not match expected organization '${claimedOrg}'.`);
    } else {
      destFindings.push(`Final destination aligns with target domain signature '${urlDomain}'.`);
    }
  } else {
    destState = "UNKNOWN";
    destFindings.push("Destination analysis unable to resolve without target URL.");
  }

  // --- RELATIONSHIP GRAPH & IDENTITY CONSISTENCY ENGINE ---
  const senderVsEmail: RelationshipStatus = !senderEmail ? "UNKNOWN" : (claimedOrg && senderName.toLowerCase().includes(claimedOrg.toLowerCase()) && !senderEmail.includes(claimedOrg.toLowerCase().replace(/\s+/g, ""))) ? "MISMATCH" : "MATCH";
  const emailVsOrg: RelationshipStatus = !claimedOrg || !emailDomain ? "UNKNOWN" : (isFreeMail || !emailDomain.includes(claimedOrg.toLowerCase().replace(/[^a-z0-9]/g, ""))) ? "MISMATCH" : "MATCH";
  const orgVsDomain: RelationshipStatus = !claimedOrg || !urlDomain ? "UNKNOWN" : urlDomain.includes(claimedOrg.toLowerCase().replace(/[^a-z0-9]/g, "")) ? "MATCH" : "MISMATCH";
  const domainVsWebsite: RelationshipStatus = !urlDomain ? "UNKNOWN" : websiteState === "FAIL" ? "MISMATCH" : websiteState === "WARNING" ? "PARTIAL_MATCH" : "MATCH";
  const urlVsDest: RelationshipStatus = !rawUrl ? "UNKNOWN" : destState === "FAIL" ? "MISMATCH" : "MATCH";

  const chain: IdentityChainNode[] = [
    { from: "Sender", to: "Email", label: "Sender ↔ Email", status: senderVsEmail, details: senderVsEmail === "MATCH" ? "Display name matches email domain" : "Display name claims organization not in email" },
    { from: "Email", to: "Organization", label: "Email ↔ Organization", status: emailVsOrg, details: emailVsOrg === "MATCH" ? "Corporate email domain verified" : "Email domain does not match claimed organization" },
    { from: "Organization", to: "Domain", label: "Organization ↔ Domain", status: orgVsDomain, details: orgVsDomain === "MATCH" ? "Website domain matches organization" : "Domain does not belong to claimed organization" },
    { from: "Domain", to: "Website", label: "Domain ↔ Website", status: domainVsWebsite, details: domainVsWebsite === "MATCH" ? "Website identity consistent" : "Website behavior/content conflicts with domain" },
    { from: "URL", to: "Destination", label: "URL ↔ Destination", status: urlVsDest, details: urlVsDest === "MATCH" ? "Target URL matches destination" : "Link destination differs from expected domain" },
  ];

  // Calculate Identity Consistency Score (0 - 100)
  let matchCount = 0;
  let totalEvaluated = 0;

  chain.forEach((c) => {
    if (c.status !== "UNKNOWN") {
      totalEvaluated += 1;
      if (c.status === "MATCH") matchCount += 1;
      else if (c.status === "PARTIAL_MATCH") matchCount += 0.5;
    }
  });

  const identityConsistencyScore = totalEvaluated > 0 ? Math.round((matchCount / totalEvaluated) * 100) : 50;

  // --- MULTI-SIGNAL RISK ENGINE ---
  let riskScore = 15;
  const whySuspicious: string[] = [];
  const evidenceBreakdown: Array<{ field: string; finding: string; state: VerificationState }> = [];

  if (senderVsEmail === "MISMATCH") {
    riskScore += 25;
    whySuspicious.push("1. Sender display name does not match the sender email domain.");
    evidenceBreakdown.push({ field: "Sender Display Name", finding: `Claims '${senderName}' but email is '${senderEmail}'`, state: "FAIL" });
  }

  if (emailVsOrg === "MISMATCH") {
    riskScore += 25;
    whySuspicious.push("2. Email domain is not verified as the organization's official corporate domain.");
    evidenceBreakdown.push({ field: "Sender Email Domain", finding: `Domain '${emailDomain}' does not match organization '${claimedOrg}'`, state: "FAIL" });
  }

  if (orgVsDomain === "MISMATCH") {
    riskScore += 25;
    whySuspicious.push("3. Target website domain shows possible brand impersonation.");
    evidenceBreakdown.push({ field: "Website Domain", finding: `Domain '${urlDomain}' does not belong to '${claimedOrg}'`, state: "FAIL" });
  }

  if (urlVsDest === "MISMATCH") {
    riskScore += 20;
    whySuspicious.push("4. Actual destination differs from the displayed link or expected organization.");
    evidenceBreakdown.push({ field: "Link Destination", finding: `Points to '${urlDomain}' instead of '${claimedOrg}'`, state: "FAIL" });
  }

  if (asksCredentials) {
    riskScore += 15;
    whySuspicious.push("5. Sensitive account information or credentials are being requested.");
    evidenceBreakdown.push({ field: "Message Content", finding: "Requests passwords, OTPs, or financial updates", state: "WARNING" });
  }

  riskScore = Math.min(riskScore, 98);

  const riskLevel: "LOW RISK" | "MEDIUM RISK" | "HIGH RISK" | "CRITICAL RISK" =
    riskScore < 30 ? "LOW RISK" : riskScore < 60 ? "MEDIUM RISK" : riskScore < 85 ? "HIGH RISK" : "CRITICAL RISK";

  const recommendedSafeAction = [
    riskScore > 60 ? "DO NOT click the provided link or enter any login credentials." : "Exercise standard caution when opening external links.",
    riskScore > 60 ? `Verify the communication directly through ${claimedOrg || "the official corporate website"} using an independently bookmarked URL.` : "Verify sender email headers if unexpected.",
    "Report suspicious impersonation emails to your IT Security Helpdesk.",
  ];

  return {
    riskScore,
    riskLevel,
    identityConsistencyScore,
    identityChain: chain,
    layers: {
      sender: { state: senderState, title: "Layer 1: Sender Verification", findings: senderFindings, evidence: senderEvidence },
      email: { state: emailState, title: "Layer 2: Email Verification", findings: emailFindings, evidence: emailEvidence },
      organization: { state: orgState, title: "Layer 3: Organization Verification", findings: orgFindings, evidence: orgEvidence },
      domain: { state: domainState, title: "Layer 4: Domain Analysis", findings: domainFindings, evidence: domainEvidence },
      website: { state: websiteState, title: "Layer 5: Website Analysis", findings: websiteFindings, evidence: websiteEvidence },
      url: { state: urlState, title: "Layer 6: URL Analysis", findings: urlFindings, evidence: urlEvidence },
      destination: { state: destState, title: "Layer 7: Link Destination Analysis", findings: destFindings, evidence: destEvidence },
    },
    whySuspicious: whySuspicious.length > 0 ? whySuspicious : ["No suspicious identity mismatches detected in telemetry analysis."],
    evidenceBreakdown,
    recommendedSafeAction,
  };
}
