import { NextResponse } from "next/server";
import { validatePhishingInput } from "@/lib/validations";
import { analyzePhishingNLP } from "@/lib/aiEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validatePhishingInput(body);

    if (!validation.valid || !validation.text) {
      return NextResponse.json(
        { error: validation.error || "Validation failed." },
        { status: 400 }
      );
    }

    const result = analyzePhishingNLP(validation.text);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      mode: "DEMO_NLP_SIMULATION",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error analyzing phishing telemetry." },
      { status: 500 }
    );
  }
}
