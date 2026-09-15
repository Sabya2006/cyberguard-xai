import { NextResponse } from "next/server";
import { validateURLInput } from "@/lib/validations";
import { analyzeURL } from "@/lib/aiEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateURLInput(body);

    if (!validation.valid || !validation.url) {
      return NextResponse.json(
        { error: validation.error || "Validation failed." },
        { status: 400 }
      );
    }

    const result = analyzeURL(validation.url);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      mode: "DEMO_HEURISTIC_SIMULATION",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error performing URL threat audit." },
      { status: 500 }
    );
  }
}
