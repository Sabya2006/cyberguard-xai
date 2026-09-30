import { NextResponse } from "next/server";
import { evaluateMultiLayerIdentity } from "@/lib/identityVerificationEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = evaluateMultiLayerIdentity(body || {});

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      mode: "MULTI_LAYER_IDENTITY_VERIFICATION",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error performing multi-layer identity verification scan." },
      { status: 500 }
    );
  }
}
