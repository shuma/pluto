export interface Conversation {
  id: string;
  ownerUserId: string;
  title: string;
  provider: 'anthropic' | 'openai' | 'other';
  metadata: {
    model?: string;
    params?: Record<string, any>;
    appVersion?: string;
    projectId?: string;
    [key: string]: any;
  };
  archivedAt?: Date;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  model?: string;
  content: {
    text?: string;
    toolResults?: any[];
    reasoning?: string;
    [key: string]: any;
  };
  tokenUsage?: {
    input: number;
    output: number;
  };
  createdAt: Date;
}

export interface CreateConversationData {
  title: string;
  provider?: 'anthropic' | 'openai' | 'other';
  metadata?: Record<string, any>;
}

export interface CreateMessageData {
  conversationId: string;
  role: 'system' | 'user' | 'assistant' | 'tool';
  model?: string;
  content: Record<string, any>;
  tokenUsage?: {
    input: number;
    output: number;
  };
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[];
}
