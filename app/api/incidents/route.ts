import { NextResponse } from "next/server";

let initialIncidents = [
  {
    id: "INC-9042",
    type: "phishing",
    title: "Urgent Bank Credential Harvest",
    score: 98,
    severity: "CRITICAL",
    status: "CONTAINED",
    target: "security-alert@bput-portal.net",
    analyst: "Dr. Vikram Sethi",
    explanation: "Urgent call-to-action language ('TERMINATED in 2 hours') paired with bit.ly shortened domain link.",
    time: "10 mins ago",
  },
  {
    id: "INC-8911",
    type: "url",
    title: "Spoofed Portal Domain",
    score: 94,
    severity: "HIGH",
    status: "RESOLVED",
    target: "http://secure-bput-login.xyz",
    analyst: "Ananya Patnaik",
    explanation: "Domain registered 2 days ago via privacy registrar with missing valid SSL HTTPS encryption certificate.",
    time: "24 mins ago",
  },
  {
    id: "INC-8830",
    type: "deepfake",
    title: "Synthetic Video Frame Match",
    score: 88,
    severity: "HIGH",
    status: "INVESTIGATING",
    target: "executive_statement_raw.mp4",
    analyst: "Rohan Mukherjee",
    explanation: "Spatial lip-sync boundary anomaly detected along with Fourier spectral noise score of 0.89.",
    time: "1 hour ago",
  },
  {
    id: "INC-8712",
    type: "behaviour",
    title: "Impossible Velocity Travel",
    score: 91,
    severity: "CRITICAL",
    status: "OPEN",
    target: "New York -> Tokyo Login",
    analyst: "Unassigned",
    explanation: "Logins registered 10 minutes apart across NY and Tokyo nodes exceeding 6,000 MPH physical limit.",
    time: "2 hours ago",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialIncidents,
    count: initialIncidents.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing 'id' or 'status' parameter." }, { status: 400 });
    }

    initialIncidents = initialIncidents.map((inc) =>
      inc.id === id ? { ...inc, status } : inc
    );

    return NextResponse.json({
      success: true,
      message: `Incident ${id} status updated to ${status}.`,
      updatedIncidents: initialIncidents,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update incident." }, { status: 500 });
  }
}
