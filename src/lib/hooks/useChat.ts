import { useChat } from "@ai-sdk/react";
import { useState, useCallback } from "react";
import { useSupabase } from "@/lib/contexts/SupabaseContext";
import {
  createConversation,
  createMessage,
  linkProjectToConversation,
} from "@/lib/utils/conversation-utils";
import type { Message as ConversationMessage } from "@/lib/types/conversation";
import type { UIMessage } from "ai";

export function useAIChat(projectId?: string) {
  const { user } = useSupabase();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { messages, status, error, sendMessage, stop, clearError } = useChat({
    onFinish: async ({ message, messages }) => {
      if (user && conversationId && projectId) {
        try {
          // Save the assistant message to the database
          const textContent =
            message.parts.find((part) => part.type === "text")?.text || "";
          await createMessage({
            conversationId,
            role: "assistant",
            content: { text: textContent },
            model: "claude-sonnet-4-20250514",
          });
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
      }
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onToolCall: async ({ toolCall }) => {
      try {
        // Handle tool calls here
        console.log("Tool call:", toolCall);

        // You can implement custom tool handling logic here
        // For now, we'll just log the tool call
      } catch (error) {
        console.error("Tool call error:", error);
      }
    },
  });

  const initializeConversation = useCallback(
    async (title: string) => {
      if (!user) return;

      try {
        setIsLoading(true);
        const conversation = await createConversation(
          {
            title,
            provider: "anthropic",
            metadata: {
              model: "claude-sonnet-4-20250514",
              projectId,
            },
          },
          user.id
        );

        setConversationId(conversation.id);

        // Link conversation to project if projectId is provided and valid
        if (projectId && projectId !== "minimal-price-tracker") {
          try {
            await linkProjectToConversation(projectId, conversation.id);
          } catch (linkError) {
            console.warn("Failed to link conversation to project:", linkError);
            // Don't fail the conversation creation if linking fails
          }
        }

        return conversation;
      } catch (error) {
        console.error("Failed to create conversation:", error);

        // Provide more helpful error messages
        if (error instanceof Error) {
          if (
            error.message.includes('relation "conversations" does not exist')
          ) {
            throw new Error(
              "Database tables not set up. Please run the database setup script or create tables manually."
            );
          } else if (error.message.includes("permission denied")) {
            throw new Error(
              "Database permission error. Check your Supabase configuration."
            );
          } else if (error.message.includes("duplicate key")) {
            throw new Error("Conversation already exists with this title.");
          } else if (error.message.includes("invalid input syntax")) {
            throw new Error("Invalid data format. Please check your input.");
          } else {
            throw new Error(`Database error: ${error.message}`);
          }
        } else {
          throw new Error("Unknown database error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user, projectId]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!user || !inputValue.trim()) return;

      if (!conversationId) {
        // Create a new conversation if none exists
        await initializeConversation(inputValue.slice(0, 100) + "...");
      }

      if (conversationId && user) {
        try {
          // Save the user message to the database
          await createMessage({
            conversationId,
            role: "user",
            content: { text: inputValue },
          });
        } catch (error) {
          console.error("Failed to save user message:", error);
        }
      }

      // Send the message using the AI SDK
      sendMessage({
        role: "user",
        parts: [{ type: "text", text: inputValue }],
      });
      setInputValue("");
    },
    [user, conversationId, inputValue, sendMessage, initializeConversation]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const isStreaming = status === "submitted" || status === "streaming";

  return {
    messages,
    input: inputValue,
    handleInputChange,
    handleSubmit,
    isLoading: isLoading || isStreaming,
    error,
    conversationId,
    initializeConversation,
    stop,
    clearError,
  };
}
