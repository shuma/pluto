# Setup Guide

## Environment Configuration

To use Pluto with Daytona, you need to set up your environment variables:

### 1. Get Your Daytona API Key

1. Visit [Daytona Dashboard](https://www.daytona.io/docs/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (it won't be shown again)

### 2. Create Environment File

Create a `.env.local` file in the root directory of your project:

```bash
# .env.local
DAYTONA_API_KEY=your-actual-api-key-here
```

**Important Notes:**

- The `DAYTONA_API_KEY` is server-side only and won't be exposed to the browser
- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`

### 3. Restart Development Server

After creating the environment file, restart your development server:

```bash
npm run dev
```

## Testing the Setup

1. Open your browser to `http://localhost:3000`
2. Type "Build a calorie tracker" in the input field
3. Click submit or press Enter
4. The app should create a Daytona sandbox and generate a QR code

## Troubleshooting

### "Daytona API key not configured" Error

- Make sure you created the `.env.local` file
- Verify the environment variable name is exactly `DAYTONA_API_KEY`
- Restart your development server after adding the environment variable

### Build Errors

- Ensure you're using Node.js 18+
- Run `npm install` to install all dependencies
- Check that the `.env.local` file is in the project root

### API Route Errors

- Check the browser console for detailed error messages
- Verify your Daytona API key is valid
- Ensure you have an active Daytona account

## Next Steps

Once setup is complete:

1. Your apps will be built in Daytona sandboxes
2. Expo tunnel will make apps accessible online
3. Users can scan QR codes with Expo Go to run apps
4. Apps are fully functional React Native applications

For more information, see the [main README.md](README.md).
