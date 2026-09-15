import { NextResponse } from "next/server";
import { analyzeBehaviour } from "@/lib/aiEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const distanceMiles = Number(body?.distanceMiles || 6760);
    const timeMinutes = Number(body?.timeMinutes || 10);

    const result = analyzeBehaviour(distanceMiles, timeMinutes);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      mode: "DEMO_UEBA_TELEMETRY",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error analyzing behavior velocity telemetry." },
      { status: 500 }
    );
  }
}
