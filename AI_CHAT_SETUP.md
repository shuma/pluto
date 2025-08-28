# AI Chat Setup with Vercel AI SDK

This project now uses the [Vercel AI SDK](https://github.com/vercel/ai) for building AI-powered chat interfaces and tool integrations.

## Features

- **Streaming Chat**: Real-time streaming responses using Vercel AI SDK
- **Tool Integration**: AI can call custom tools for app creation, code generation, and analysis
- **Multi-Model Support**: Support for Anthropic Claude models and OpenAI models
- **Type Safety**: Full TypeScript support with Zod validation schemas
- **Database Integration**: Automatic conversation and message storage

## Architecture

### Core Components

1. **AI Configuration** (`src/lib/ai-config.ts`)

   - Centralized model configurations
   - Model metadata and settings
   - Provider-specific configurations

2. **AI Tools** (`src/lib/ai-tools.ts`)

   - Tool definitions with Zod schemas
   - Tool execution handlers
   - Type-safe tool parameters

3. **Chat Hook** (`src/lib/hooks/useChat.ts`)

   - React hook for chat functionality
   - Database integration
   - Tool call handling

4. **API Routes**
   - `/api/chat` - Main chat endpoint with tool support
   - `/api/tools` - Tool execution endpoint
   - `/api/build-app` - App building endpoint

### Available Tools

#### 1. createApp

Creates a new mobile app project using Daytona service.

**Parameters:**

- `appName`: Name of the app
- `description`: Detailed app description
- `platform`: Target platform (ios/android/cross-platform)
- `features`: Array of key features

#### 2. generateCode

Generates code for specific components or features.

**Parameters:**

- `component`: Component/feature to generate
- `language`: Programming language
- `framework`: Framework to use

#### 3. analyzeCode

Analyzes code for improvements and best practices.

**Parameters:**

- `code`: Code to analyze
- `language`: Programming language
- `focus`: Analysis focus area

## Setup

### Environment Variables

```bash
# Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_key_here

# OpenAI API Key (optional)
OPENAI_API_KEY=your_openai_key_here

# Daytona API Key
DAYTONA_API_KEY=your_daytona_key_here
```

### Dependencies

The project already includes the necessary dependencies:

```json
{
  "ai": "^5.0.26",
  "@ai-sdk/react": "^2.0.27",
  "@ai-sdk/anthropic": "^2.0.9"
}
```

## Usage

### Basic Chat

```tsx
import { useAIChat } from "@/lib/hooks/useChat";

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useAIChat();

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.role}: </strong>
          {message.parts.map((part) => {
            if (part.type === "text") return part.text;
            if (part.type === "tool-call") return `Tool: ${part.toolName}`;
            return null;
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Send a message..."
        />
      </form>
    </div>
  );
}
```

### Tool Integration

The AI can automatically use tools when appropriate:

```tsx
// The AI will automatically call tools when needed
// For example, asking "Create a calorie tracker app for iOS" will trigger the createApp tool
```

## Customization

### Adding New Tools

1. Define the tool schema in `src/lib/ai-tools.ts`:

```typescript
export const newToolSchema = z.object({
  param1: z.string().describe("Description of parameter"),
  param2: z.number().describe("Another parameter"),
});

export const tools = {
  // ... existing tools
  newTool: {
    description: "Description of what this tool does",
    parameters: newToolSchema,
    execute: async (params: z.infer<typeof newToolSchema>) => {
      // Tool implementation
      return { success: true, result: "Tool executed" };
    },
  },
};
```

2. Add the tool to the chat route in `src/app/api/chat/route.ts`

3. Update the tool execution handler in `src/app/api/tools/route.ts`

### Model Configuration

To use different models, update `src/lib/ai-config.ts`:

```typescript
export const aiModels = {
  "claude-3-opus": anthropic("claude-3-opus-20240229"),
  "gpt-4o": openai("gpt-4o"),
  // Add your preferred models
};
```

## Best Practices

1. **Error Handling**: Always wrap tool executions in try-catch blocks
2. **Validation**: Use Zod schemas for parameter validation
3. **Type Safety**: Leverage TypeScript for better development experience
4. **Streaming**: Use streaming responses for better user experience
5. **Tool Design**: Design tools to be atomic and focused on single responsibilities

## Troubleshooting

### Common Issues

1. **Tool Call Errors**: Check that tool schemas match the expected format
2. **Model Errors**: Verify API keys and model names are correct
3. **Streaming Issues**: Ensure proper error handling in chat routes

### Debug Mode

Enable debug logging by adding console.log statements in tool handlers and chat callbacks.

## Resources

- [Vercel AI SDK Documentation](https://ai-sdk.vercel.app/)
- [Vercel AI SDK GitHub](https://github.com/vercel/ai)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
