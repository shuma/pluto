"use client";

import React from "react";
import { useAIChat } from "@/lib/hooks/useChat";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "./conversation";
import { Message, MessageContent, MessageAvatar } from "./message";
import { Response } from "./response";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
} from "./prompt-input";
import { ImagePlus } from "lucide-react";

interface ChatInterfaceProps {
  projectId?: string;
  className?: string;
}

export function ChatInterface({ projectId, className }: ChatInterfaceProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
    clearError,
  } = useAIChat(projectId);

  const renderMessageContent = (message: any) => {
    // For the Response component, we need to extract just the text content
    const textParts = message.parts
      .map((part: any) => {
        switch (part.type) {
          case "text":
            return part.text;
          case "image":
            return `[Image: ${part.image}]`;
          case "tool-call":
            return `[Tool: ${part.toolName}]`;
          default:
            return "";
        }
      })
      .filter(Boolean)
      .join("\n");

    return textParts;
  };

  const renderMessageDisplay = (message: any) => {
    return message.parts.map((part: any, index: number) => {
      switch (part.type) {
        case "text":
          return (
            <div key={index} className="text-sm text-white">
              {part.text}
            </div>
          );
        case "image":
          return (
            <div key={index} className="mt-2">
              <img
                src={part.image}
                alt="Generated content"
                className="max-w-full rounded-lg"
              />
            </div>
          );
        case "tool-call":
          return (
            <div key={index} className="mt-2 p-2 bg-gray-800 rounded text-xs">
              <div className="font-mono">Tool: {part.toolName}</div>
              <div className="text-gray-400">{JSON.stringify(part.args)}</div>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Chat Messages */}
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                  <ImagePlus className="w-8 h-8 text-gray-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">
                Start Building Your App
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Describe the mobile app you want to build and I'll help you
                create it step by step.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageAvatar
                name={message.role === "user" ? "You" : "Claude"}
              />
              <MessageContent>
                {message.role === "user" ? (
                  renderMessageDisplay(message)
                ) : (
                  <Response>{renderMessageContent(message)}</Response>
                )}
              </MessageContent>
            </Message>
          ))}

          {isLoading && (
            <Message from="assistant">
              <MessageAvatar name="Claude" />
              <MessageContent>
                <div className="text-sm text-gray-400">Thinking...</div>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input Area */}
      <div className="p-4 border-t border-[#424242]">
        <PromptInput
          onSubmit={handleSubmit}
          className="bg-[#232323] border-[#424242] shadow-lg"
        >
          <PromptInputTextarea
            placeholder="Describe the mobile app you want to build..."
            className="bg-transparent text-white placeholder:text-gray-500 text-sm border-none focus:border-none focus:outline-none focus:ring-0"
            value={input}
            onChange={handleInputChange}
          />
          <PromptInputToolbar className="px-3 pb-3">
            <PromptInputTools>
              <PromptInputButton variant="ghost" size="icon">
                <ImagePlus className="h-4 w-4 text-gray-500" />
              </PromptInputButton>
              <span className="text-xs text-gray-500 px-2">
                5 messages left for today.{" "}
                <span className="text-white">Upgrade</span>
              </span>
            </PromptInputTools>
            <div className="flex items-center gap-2">
              {isLoading && (
                <PromptInputButton
                  variant="ghost"
                  size="icon"
                  onClick={stop}
                  className="w-7 h-7 p-0 text-gray-400 hover:text-white"
                >
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </PromptInputButton>
              )}
              <PromptInputSubmit
                className="w-7 h-7 p-0 bg-white hover:bg-gray-100 text-black"
                size="icon"
                disabled={!input.trim()}
              />
            </div>
          </PromptInputToolbar>
        </PromptInput>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-400 bg-red-900/20 border-t border-[#424242]">
          <div className="flex items-center justify-between">
            <span>Error: {error.message}</span>
            <button
              onClick={clearError}
              className="text-xs underline hover:no-underline text-red-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
