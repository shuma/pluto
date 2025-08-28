import { streamText } from "ai";
import { NextRequest } from "next/server";
import { defaultModel, aiSettings } from "@/lib/ai-config";
import { tools } from "@/lib/ai-tools";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    // Convert UIMessages to the format expected by streamText
    const modelMessages = messages.map((msg) => {
      if (!msg.role || !msg.parts) {
        throw new Error(`Invalid message format: missing role or parts`);
      }

      return {
        role: msg.role,
        content:
          msg.parts
            .map((part: any) => {
              if (part.type === "text") return part.text;
              return "";
            })
            .join("") || "",
      };
    });

    const result = await streamText({
      model: defaultModel,
      messages: modelMessages,
      temperature: aiSettings.temperature,
      tools: {
        createApp: {
          type: "function" as const,
          description: tools.createApp.description,
          inputSchema: tools.createApp.parameters,
        },
        generateCode: {
          type: "function" as const,
          description: tools.generateCode.description,
          inputSchema: tools.generateCode.parameters,
        },
        analyzeCode: {
          type: "function" as const,
          description: tools.analyzeCode.description,
          inputSchema: tools.analyzeCode.parameters,
        },
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
