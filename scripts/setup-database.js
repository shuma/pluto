#!/usr/bin/env node

/**
 * Database Setup Script
 * 
 * This script tests the Supabase connection and creates the necessary tables.
 * Run this after setting up your environment variables.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
  console.error('\nPlease create a .env.local file with these variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log('🔌 Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase.from('projects').select('count').limit(1);
    
    if (error) {
      console.log('⚠️  Connection test result:', error.message);
      console.log('   This might be expected if tables don\'t exist yet.');
    } else {
      console.log('✅ Successfully connected to Supabase');
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

async function createTables() {
  console.log('\n🏗️  Creating database tables...');
  
  try {
    // Read the SQL migration file
    const migrationPath = join(__dirname, '..', 'database', 'migrations', '001_create_conversations_tables.sql');
    const sql = readFileSync(migrationPath, 'utf8');
    
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`   Found ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`   Executing statement ${i + 1}/${statements.length}...`);
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            console.log(`   ⚠️  Statement ${i + 1} result:`, error.message);
          } else {
            console.log(`   ✅ Statement ${i + 1} executed successfully`);
          }
        } catch (error) {
          console.log(`   ⚠️  Statement ${i + 1} error:`, error.message);
        }
      }
    }
    
    console.log('\n✅ Database setup completed!');
    
  } catch (error) {
    console.error('❌ Failed to create tables:', error.message);
    console.error('\nYou may need to run the SQL manually in the Supabase dashboard.');
    console.error('Copy the contents of database/migrations/001_create_conversations_tables.sql');
  }
}

async function verifyTables() {
  console.log('\n🔍 Verifying table creation...');
  
  try {
    // Check if conversations table exists
    const { data: conversations, error: convError } = await supabase
      .from('conversations')
      .select('count')
      .limit(1);
    
    if (convError) {
      console.log('❌ Conversations table not accessible:', convError.message);
    } else {
      console.log('✅ Conversations table is accessible');
    }
    
    // Check if messages table exists
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('count')
      .limit(1);
    
    if (msgError) {
      console.log('❌ Messages table not accessible:', msgError.message);
    } else {
      console.log('✅ Messages table is accessible');
    }
    
    // Check if projects table has conversation_id column
    const { data: projects, error: projError } = await supabase
      .from('projects')
      .select('conversation_id')
      .limit(1);
    
    if (projError) {
      console.log('❌ Projects table conversation_id column not accessible:', projError.message);
    } else {
      console.log('✅ Projects table conversation_id column is accessible');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting database setup...\n');
  
  await testConnection();
  await createTables();
  await verifyTables();
  
  console.log('\n🎉 Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Check the Supabase dashboard to verify tables were created');
  console.log('2. Test the conversation utilities in your app');
  console.log('3. Create the chat API route');
}

main().catch(console.error);
