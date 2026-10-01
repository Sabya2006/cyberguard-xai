import { NextResponse } from "next/server";

export interface FeedbackPayload {
  overallRating: number;
  usagePurposes: string[];
  experiencedFraud: boolean;
  fraudDetails?: {
    incidentDescription: string;
    fraudType: string;
    scamChannel: string;
    aftermath: string;
    cyberguardDetection: string;
  };
  utilityRating: number;
  improvementFeedback: string;
  recommendToOthers: string;
}

const mockFeedbackDatabase: Array<FeedbackPayload & { id: string; timestamp: string }> = [
  {
    id: "FB-901",
    timestamp: new Date().toISOString(),
    overallRating: 5,
    usagePurposes: ["🔗 Suspicious URL check", "📧 Phishing / suspicious email"],
    experiencedFraud: false,
    utilityRating: 5,
    improvementFeedback: "The 7-Layer Identity Verification Engine saved me from a spoofed bank link.",
    recommendToOthers: "Yes",
  },
  {
    id: "FB-902",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    overallRating: 4,
    usagePurposes: ["🚨 Fraud / scam incident"],
    experiencedFraud: true,
    fraudDetails: {
      incidentDescription: "Received a fake electricity bill disconnection warning on WhatsApp with a payment QR code.",
      fraudType: "UPI / Payment Fraud",
      scamChannel: "WhatsApp",
      aftermath: "No loss",
      cyberguardDetection: "Yes",
    },
    utilityRating: 5,
    improvementFeedback: "Add automatic SMS scanning integration.",
    recommendToOthers: "Yes",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: mockFeedbackDatabase.length,
    data: mockFeedbackDatabase,
  });
}

export async function POST(request: Request) {
  try {
    const body: FeedbackPayload = await request.json();

    const newRecord = {
      id: `FB-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString(),
      ...body,
    };

    mockFeedbackDatabase.unshift(newRecord);

    return NextResponse.json({
      success: true,
      message: "Customer feedback & fraud report submitted successfully.",
      data: newRecord,
      totalFeedbackCount: mockFeedbackDatabase.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to submit customer feedback report." },
      { status: 500 }
    );
  }
}
