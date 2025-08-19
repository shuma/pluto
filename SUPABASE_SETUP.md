# Supabase Setup Guide

This project has been configured with Supabase for authentication, database, and storage functionality.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and API keys

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - **Project URL**: Use this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public**: Use this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role**: Use this for `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Database Setup

### 1. Create Tables

You can create tables using the Supabase dashboard or SQL editor. Here's an example for a basic user profile table:

```sql
-- Create a profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 2. Storage Buckets

Create storage buckets for file uploads:

```sql
-- Create a storage bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Create a storage bucket for project files
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true);
```

## Usage Examples

### Authentication

```tsx
import { useSupabase } from "@/lib/contexts/SupabaseContext";

function LoginForm() {
  const { signIn, loading } = useSupabase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // ... rest of component
}
```

### Database Operations

```tsx
import { fetchData, insertData } from "@/lib/utils/supabase-utils";

// Fetch data
const projects = await fetchData("projects", "*", { user_id: userId });

// Insert data
const newProject = await insertData("projects", {
  name: "My Project",
  description: "Project description",
  user_id: userId,
});
```

### File Upload

```tsx
import { uploadFile } from "@/lib/utils/supabase-utils";

const handleFileUpload = async (file: File) => {
  try {
    const path = `avatars/${userId}/${file.name}`;
    const publicUrl = await uploadFile("avatars", path, file);
    console.log("File uploaded:", publicUrl);
  } catch (error) {
    console.error("Upload error:", error);
  }
};
```

## Real-time Subscriptions

```tsx
import { subscribeToChanges } from "@/lib/utils/supabase-utils";

useEffect(() => {
  const unsubscribe = subscribeToChanges(
    "projects",
    (payload) => {
      console.log("Project changed:", payload);
      // Handle real-time updates
    },
    { user_id: userId }
  );

  return unsubscribe;
}, [userId]);
```

## Security Best Practices

1. **Row Level Security (RLS)**: Always enable RLS on your tables
2. **Policies**: Create specific policies for each table operation
3. **Service Role Key**: Never expose the service role key in client-side code
4. **Input Validation**: Validate all user inputs before sending to Supabase
5. **Rate Limiting**: Implement rate limiting for authentication endpoints

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**: Make sure your `.env.local` file is in the project root
2. **CORS Errors**: Check your Supabase project settings for allowed origins
3. **Authentication Errors**: Verify your API keys are correct
4. **Database Connection Issues**: Check your Supabase project status

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [Supabase Discord](https://discord.supabase.com)

## Next Steps

1. Set up your environment variables
2. Create your database tables
3. Configure storage buckets
4. Test authentication flow
5. Implement your specific features
