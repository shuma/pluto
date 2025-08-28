-- Migration: Create projects, conversations and messages tables
-- Run this in your Supabase SQL editor

-- Enable pgvector if you'll do semantic search (optional)
-- create extension if not exists vector;

-- 1) Projects table (if it doesn't exist)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text check (status in ('draft','in-progress','review','live','archived')) default 'draft',
  platforms text[] default '{}',
  thumbnail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_modified timestamptz not null default now(),
  tags text[] default '{}',
  category text check (category in ('productivity','entertainment','business','education','health','social','utility','other')) default 'other',
  is_live boolean default false,
  version text default '1.0.0',
  user_id uuid references auth.users(id) on delete cascade
);

-- 2) Conversations table
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  provider text check (provider in ('anthropic','openai','other')) default 'anthropic',
  metadata jsonb not null default '{}'::jsonb, -- store model, params, app version, etc.
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

-- 3) Messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text check (role in ('system','user','assistant','tool')) not null,
  model text,                           -- e.g., "claude-3.7-sonnet-2025-XX-XX"
  content jsonb not null,               -- store rich content: text + tool results
  token_usage jsonb,                    -- {"input":123,"output":456} if you have it
  created_at timestamptz not null default now()
);

-- 4) Create indexes for performance
create index on messages (conversation_id, created_at desc);
create index on conversations (owner_user_id, created_at desc);
create index on projects (user_id, created_at desc);

-- 5) Link projects to conversations (add column to existing projects table)
alter table projects add column if not exists conversation_id uuid references conversations(id);
create index on projects (conversation_id);

-- 6) Enable Row Level Security (RLS)
alter table projects enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- 7) Create RLS policies for projects
create policy "Users can view their own projects" on projects
  for select using (auth.uid() = user_id);

create policy "Users can insert their own projects" on projects
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own projects" on projects
  for update using (auth.uid() = user_id);

create policy "Users can delete their own projects" on projects
  for delete using (auth.uid() = user_id);

-- 8) Create RLS policies for conversations
create policy "Users can view their own conversations" on conversations
  for select using (auth.uid() = owner_user_id);

create policy "Users can insert their own conversations" on conversations
  for insert with check (auth.uid() = owner_user_id);

create policy "Users can update their own conversations" on conversations
  for update using (auth.uid() = owner_user_id);

create policy "Users can delete their own conversations" on conversations
  for delete using (auth.uid() = owner_user_id);

-- 9) Create RLS policies for messages
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

-- 10) (Optional) Embeddings for RAG / semantic search
-- create table if not exists message_embeddings (
--   message_id uuid primary key references messages(id) on delete cascade,
--   embedding vector(1536) not null
-- );

-- 11) Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on projects to anon, authenticated;
grant all on conversations to anon, authenticated;
grant all on messages to anon, authenticated;
