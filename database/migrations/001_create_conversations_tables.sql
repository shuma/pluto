-- Migration: Create conversations and messages tables
-- Run this in your Supabase SQL editor

-- Enable pgvector if you'll do semantic search (optional)
-- create extension if not exists vector;

-- 1) Conversations table
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  provider text check (provider in ('anthropic','openai','other')) default 'anthropic',
  metadata jsonb not null default '{}'::jsonb, -- store model, params, app version, etc.
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

-- 2) Messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text check (role in ('system','user','assistant','tool')) not null,
  model text,                           -- e.g., "claude-3.7-sonnet-2025-XX-XX"
  content jsonb not null,               -- store rich content: text + tool results
  token_usage jsonb,                    -- {"input":123,"output":456} if you have it
  created_at timestamptz not null default now()
);

-- 3) Create indexes for performance
create index on messages (conversation_id, created_at desc);
create index on conversations (owner_user_id, created_at desc);

-- 4) Link projects to conversations (add column to existing projects table)
alter table projects add column if not exists conversation_id uuid references conversations(id);
create index on projects (conversation_id);

-- 5) Enable Row Level Security (RLS)
alter table conversations enable row level security;
alter table messages enable row level security;

-- 6) Create RLS policies for conversations
create policy "Users can view their own conversations" on conversations
  for select using (auth.uid() = owner_user_id);

create policy "Users can insert their own conversations" on conversations
  for insert with check (auth.uid() = owner_user_id);

create policy "Users can update their own conversations" on conversations
  for update using (auth.uid() = owner_user_id);

create policy "Users can delete their own conversations" on conversations
  for delete using (auth.uid() = owner_user_id);

-- 7) Create RLS policies for messages
create policy "Users can view messages from their conversations" on messages
  for select using (
    exists (
      select 1 from conversations 
      where conversations.id = messages.conversation_id 
      and conversations.owner_user_id = auth.uid()
    )
  );

create policy "Users can insert messages to their conversations" on messages
  for insert with check (
    exists (
      select 1 from conversations 
      where conversations.id = messages.conversation_id 
      and conversations.owner_user_id = auth.uid()
    )
  );

create policy "Users can update messages from their conversations" on messages
  for update using (
    exists (
      select 1 from conversations 
      where conversations.id = messages.conversation_id 
      and conversations.owner_user_id = auth.uid()
    )
  );

create policy "Users can delete messages from their conversations" on messages
  for delete using (
    exists (
      select 1 from conversations 
      where conversations.id = messages.conversation_id 
      and conversations.owner_user_id = auth.uid()
    )
  );

-- 8) (Optional) Embeddings for RAG / semantic search
-- create table if not exists message_embeddings (
--   message_id uuid primary key references messages(id) on delete cascade,
--   embedding vector(1536) not null
-- );

-- 9) Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on conversations to anon, authenticated;
grant all on messages to anon, authenticated;
grant all on projects to anon, authenticated;
