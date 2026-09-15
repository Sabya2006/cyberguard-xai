// Enhanced security input validation helper functions for input sanitization, XSS mitigation, and SSRF prevention

export interface PhishingScanInput {
  emailText: string;
}

export interface URLScanInput {
  targetUrl: string;
}

// XSS Sanitizer helper
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validatePhishingInput(data: any): { valid: boolean; error?: string; text?: string } {
  if (!data || typeof data.emailText !== "string") {
    return { valid: false, error: "Invalid payload: 'emailText' is required and must be a string." };
  }
  const trimmed = data.emailText.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Email content cannot be empty." };
  }
  if (trimmed.length > 50000) {
    return { valid: false, error: "Email payload exceeds maximum length limit of 50,000 characters." };
  }

  // Prevent script tag injection patterns
  if (/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(trimmed)) {
    return { valid: false, error: "Security alert: Malicious script tag detected in input payload." };
  }

  return { valid: true, text: trimmed };
}

export function validateURLInput(data: any): { valid: boolean; error?: string; url?: string } {
  if (!data || typeof data.targetUrl !== "string") {
    return { valid: false, error: "Invalid payload: 'targetUrl' is required and must be a string." };
  }
  const trimmed = data.targetUrl.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "URL payload cannot be empty." };
  }
  if (trimmed.length > 2048) {
    return { valid: false, error: "URL exceeds maximum length limit of 2,048 characters." };
  }

  let normalizedUrl = trimmed;
  if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
    normalizedUrl = "https://" + normalizedUrl;
  }

  try {
    const parsed = new URL(normalizedUrl);
    const hostname = parsed.hostname.toLowerCase();

    // SSRF Prevention: Block internal / private IP addresses and cloud metadata services
    const blockedHosts = [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
      "169.254.169.254", // AWS/GCP/Azure Metadata IP
      "::1",
    ];

    if (
      blockedHosts.includes(hostname) ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal") ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      (hostname.startsWith("172.") && Number(hostname.split(".")[1]) >= 16 && Number(hostname.split(".")[1]) <= 31)
    ) {
      return { valid: false, error: "Security alert: Access to local/internal IP addresses and cloud metadata end-points is strictly blocked." };
    }

    // Only allow http and https protocols
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { valid: false, error: "Security alert: Only HTTP and HTTPS protocols are permitted." };
    }

    return { valid: true, url: parsed.toString() };
  } catch {
    return { valid: false, error: "Provided string is not a valid web URL." };
  }
}
