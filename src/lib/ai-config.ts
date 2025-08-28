import { anthropic } from "@ai-sdk/anthropic";

// AI Model configurations
export const aiModels = {
  // Anthropic models
  "claude-opus-4-1": anthropic("claude-opus-4-1-20250805"),
  "claude-opus-4": anthropic("claude-opus-4-20250514"),
  "claude-sonnet-4": anthropic("claude-sonnet-4-20250514"),
  "claude-3-7-sonnet": anthropic("claude-3-7-sonnet-20250219"),
  "claude-3-5-haiku": anthropic("claude-3-5-haiku-20241022"),
  "claude-3-haiku": anthropic("claude-3-haiku-20240307"),
};

// Default model for the application
export const defaultModel = anthropic("claude-sonnet-4-20250514");

// Model metadata for database storage
export const modelMetadata = {
  "claude-opus-4-1": {
    name: "Claude Opus 4.1",
    provider: "anthropic",
    version: "20250805",
    maxTokens: 200000,
  },
  "claude-opus-4": {
    name: "Claude Opus 4",
    provider: "anthropic",
    version: "20250514",
    maxTokens: 200000,
  },
  "claude-sonnet-4": {
    name: "Claude Sonnet 4",
    provider: "anthropic",
    version: "20250514",
    maxTokens: 200000,
  },
  "claude-3-7-sonnet": {
    name: "Claude Sonnet 3.7",
    provider: "anthropic",
    version: "20250219",
    maxTokens: 200000,
  },
  "claude-3-5-haiku": {
    name: "Claude Haiku 3.5",
    provider: "anthropic",
    version: "20241022",
    maxTokens: 200000,
  },
  "claude-3-haiku": {
    name: "Claude Haiku 3",
    provider: "anthropic",
    version: "20240307",
    maxTokens: 200000,
  },
};

// AI generation settings
export const aiSettings = {
  temperature: 0.7,
  maxTokens: 4000,
  topP: 0.9,
  frequencyPenalty: 0.1,
  presencePenalty: 0.1,
};
