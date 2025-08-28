import { supabase } from '@/lib/supabase';
import type { 
  Conversation, 
  Message, 
  CreateConversationData, 
  CreateMessageData,
  ConversationWithMessages 
} from '@/lib/types/conversation';

export async function createConversation(data: CreateConversationData, userId: string): Promise<Conversation> {
  const { data: conversation, error } = await supabase
    .from('conversations')
    .insert({
      owner_user_id: userId,
      title: data.title,
      provider: data.provider || 'anthropic',
      metadata: data.metadata || {}
    })
    .select()
    .single();

  if (error) throw error;
  
  return {
    id: conversation.id,
    ownerUserId: conversation.owner_user_id,
    title: conversation.title,
    provider: conversation.provider,
    metadata: conversation.metadata,
    archivedAt: conversation.archived_at,
    createdAt: new Date(conversation.created_at)
  };
}

export async function getConversation(id: string): Promise<Conversation | null> {
  const { data: conversation, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !conversation) return null;

  return {
    id: conversation.id,
    ownerUserId: conversation.owner_user_id,
    title: conversation.title,
    provider: conversation.provider,
    metadata: conversation.metadata,
    archivedAt: conversation.archived_at,
    createdAt: new Date(conversation.created_at)
  };
}

export async function getUserConversations(userId: string): Promise<Conversation[]> {
  const { data: conversations, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('owner_user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return conversations.map(conv => ({
    id: conv.id,
    ownerUserId: conv.owner_user_id,
    title: conv.title,
    provider: conv.provider,
    metadata: conv.metadata,
    archivedAt: conv.archived_at,
    createdAt: new Date(conv.created_at)
  }));
}

export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return messages.map(msg => ({
    id: msg.id,
    conversationId: msg.conversation_id,
    role: msg.role,
    model: msg.model,
    content: msg.content,
    tokenUsage: msg.token_usage,
    createdAt: new Date(msg.created_at)
  }));
}

export async function getConversationWithMessages(conversationId: string): Promise<ConversationWithMessages | null> {
  const conversation = await getConversation(conversationId);
  if (!conversation) return null;

  const messages = await getConversationMessages(conversationId);
  
  return {
    ...conversation,
    messages
  };
}

export async function createMessage(data: CreateMessageData): Promise<Message> {
  const { data: message, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: data.conversationId,
      role: data.role,
      model: data.model,
      content: data.content,
      token_usage: data.tokenUsage
    })
    .select()
    .single();

  if (error) throw error;

  return {
    id: message.id,
    conversationId: message.conversation_id,
    role: message.role,
    model: message.model,
    content: message.content,
    tokenUsage: message.token_usage,
    createdAt: new Date(message.created_at)
  };
}

export async function linkProjectToConversation(projectId: string, conversationId: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .update({ conversation_id: conversationId })
    .eq('id', projectId);

  if (error) throw error;
}

export async function getProjectConversation(projectId: string): Promise<ConversationWithMessages | null> {
  const { data: project, error } = await supabase
    .from('projects')
    .select('conversation_id')
    .eq('id', projectId)
    .single();

  if (error || !project?.conversation_id) return null;

  return getConversationWithMessages(project.conversation_id);
}

export async function updateConversationTitle(conversationId: string, title: string): Promise<void> {
  const { error } = await supabase
    .from('conversations')
    .update({ title })
    .eq('id', conversationId);

  if (error) throw error;
}

export async function archiveConversation(conversationId: string): Promise<void> {
  const { error } = await supabase
    .from('conversations')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', conversationId);

  if (error) throw error;
}
