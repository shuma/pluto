# Pluto - Mobile App Builder

Build mobile apps by chatting with AI using Daytona sandboxes and React Native Expo.

## Features

- **AI-Powered App Generation**: Describe your app idea and watch it come to life
- **React Native Expo**: Built with modern mobile development tools
- **Daytona Integration**: Secure, isolated development environments
- **TypeScript Support**: Full type safety throughout the development process
- **Expo Tunnel**: Apps are accessible online via QR code scanning

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Daytona API key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd pluto
```

2. Install dependencies:

```bash
npm install
```

3. Set up your Daytona API key:
   - Get your API key from [Daytona Dashboard](https://www.daytona.io/docs/)
   - Create a `.env.local` file in the root directory:

```bash
# Server-side environment variable (not exposed to browser)
DAYTONA_API_KEY=your-daytona-api-key-here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Describe Your App**: Type a description like "Build a calorie tracker" in the input field
2. **AI Processing**: Pluto analyzes your description and generates an appropriate app structure
3. **Daytona Sandbox**: Creates an isolated development environment
4. **Expo Project**: Generates a React Native Expo app with TypeScript
5. **Expo Tunnel**: Starts the app with tunnel access for online availability
6. **QR Code**: Scan with Expo Go to run the app on your phone

## Supported App Types

- **Calorie Tracker**: Food logging with daily goals
- **Meditation Timer**: Mindfulness and relaxation apps
- **Weather Dashboard**: Weather information display
- **Custom Apps**: Any app you can describe!

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Mobile**: React Native Expo with tunnel support
- **Styling**: Tailwind CSS
- **Backend**: Next.js API routes
- **Infrastructure**: Daytona SDK for sandbox management
- **Deployment**: Daytona hosting and Expo tunnel

## Development

### Project Structure

```
pluto/
├── src/
│   ├── app/           # Next.js app router
│   │   ├── api/       # API routes
│   │   │   └── build-app/ # Daytona integration endpoint
│   │   └── page.tsx   # Main UI
│   ├── components/    # Reusable UI components
│   │   └── QRCodeDisplay.tsx # QR code display component
│   ├── lib/          # Utilities and services
│   │   ├── daytona.ts # Daytona integration service (server-side)
│   │   └── hooks/    # Custom React hooks
│   └── styles/       # Global styles
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

### Key Components

- **API Route**: `/api/build-app` handles Daytona service calls
- **DaytonaService**: Server-side service for sandbox creation and app building
- **useAppBuilder**: React hook for app building workflow
- **QRCodeDisplay**: Component for displaying QR codes and Expo tunnel info

### Environment Variables

- `DAYTONA_API_KEY`: Your Daytona API key (server-side only)

## Mobile App Access

Once your app is built:

1. **Download Expo Go**: Available on [iOS App Store](https://apps.apple.com/app/expo-go/id982107779) and [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. **Scan QR Code**: The app will display a QR code after building
3. **Run App**: Point Expo Go at the QR code to load your app
4. **Online Access**: Your app runs via Expo tunnel and is accessible from anywhere

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

- **Documentation**: [Daytona Docs](https://www.daytona.io/docs/)
- **Expo**: [Expo Documentation](https://docs.expo.dev/)
- **Issues**: Create an issue in this repository
- **Community**: Join the Daytona community for support
