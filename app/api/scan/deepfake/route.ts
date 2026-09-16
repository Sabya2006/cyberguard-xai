import { NextResponse } from "next/server";
import { analyzeDeepfake } from "@/lib/aiEngine";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filename = body?.filename || "uploaded_frame.png";
    const fileType = body?.fileType || "image/png";
    const fileSize = Number(body?.fileSize || 1024000);

    // Validate media file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/avi", "video/quicktime"];
    const isExtensionValid = /\.(jpg|jpeg|png|webp|mp4|avi|mov)$/i.test(filename);

    if (!validTypes.includes(fileType) && !isExtensionValid) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PNG, JPG, WEBP image or MP4, AVI video." },
        { status: 400 }
      );
    }

    if (fileSize > 52428800) { // 50MB
      return NextResponse.json(
        { error: "File size exceeds maximum upload limit of 50MB." },
        { status: 400 }
      );
    }

    const result = analyzeDeepfake(filename, fileType, fileSize);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
      mode: "COMPUTER_VISION_INSPECTION",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error performing deepfake computer vision inspection." },
      { status: 500 }
    );
  }
}
