import { NextResponse } from "next/server";
import { analyzeDeepfake } from "@/lib/aiEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filename = body?.filename || "uploaded_frame.png";
    const fileType = body?.fileType || "image/png";

    const result = analyzeDeepfake(filename, fileType);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      mode: "DEMO_COMPUTER_VISION_SIMULATION",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error performing deepfake computer vision inspection." },
      { status: 500 }
    );
  }
}
