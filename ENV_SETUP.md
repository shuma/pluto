# Environment Variables Setup

To fix the Supabase error, you need to create a `.env.local` file in your project root.

## Steps:

1. **Create a `.env.local` file** in your project root (same level as package.json)

2. **Add these variables to the file:**

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Get your Supabase credentials:**

   - Go to [supabase.com](https://supabase.com)
   - Create a new project or use existing one
   - Go to Settings > API
   - Copy the "Project URL" and "anon public" key

4. **Example `.env.local` file:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. **Restart your development server** after creating the file

## Note:

- The `.env.local` file is already in `.gitignore` for security
- Never commit your actual API keys to version control
- The app will work with placeholder values but authentication won't function properly
