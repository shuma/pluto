import { NextRequest, NextResponse } from "next/server";
import { tools } from "@/lib/ai-tools";

export async function POST(req: NextRequest) {
  try {
    const { tool, arguments: args } = await req.json();

    if (!tool || !tools[tool.name as keyof typeof tools]) {
      return NextResponse.json(
        { error: `Unknown tool: ${tool?.name}` },
        { status: 400 }
      );
    }

    const toolHandler = tools[tool.name as keyof typeof tools];

    // Validate arguments against the schema
    const validatedArgs = toolHandler.parameters.parse(args);

    // Execute the tool
    const result = await toolHandler.execute(validatedArgs);

    return NextResponse.json({
      toolResults: [
        {
          toolName: tool.name,
          result,
        },
      ],
    });
  } catch (error) {
    console.error("Tool execution error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid tool arguments", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Tool execution failed" },
      { status: 500 }
    );
  }
}
