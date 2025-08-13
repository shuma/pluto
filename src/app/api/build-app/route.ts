import { NextRequest, NextResponse } from "next/server";
import { DaytonaService } from "@/lib/daytona";

export async function POST(request: NextRequest) {
  try {
    const { description, appName } = await request.json();

    if (!description || !appName) {
      return NextResponse.json(
        { error: "Description and app name are required" },
        { status: 400 }
      );
    }

    // Get API key from environment variables
    const apiKey = process.env.DAYTONA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Daytona API key not configured" },
        { status: 500 }
      );
    }

    const daytonaService = new DaytonaService(apiKey);

    const result = await daytonaService.createExpoProject({
      description,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in build-app API:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
