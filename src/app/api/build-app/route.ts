import { NextRequest, NextResponse } from "next/server";
import { DaytonaService } from "@/lib/daytona";
import { tools, createAppSchema } from "@/lib/ai-tools";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if this is a tool call from AI
    if (body.tool && body.tool.name === "createApp") {
      const params = createAppSchema.parse(body.tool.arguments);

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
        description: params.description,
      });

      return NextResponse.json({
        toolResults: [
          {
            toolName: "createApp",
            result: {
              success: true,
              projectId: result.sandboxId || `project_${Date.now()}`,
              message: `App '${params.appName}' created successfully for ${params.platform}`,
              daytonaResult: result,
            },
          },
        ],
      });
    }

    // Fallback to direct API call (existing functionality)
    const { description, appName } = body;

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
