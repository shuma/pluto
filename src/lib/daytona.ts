import { Daytona, Sandbox } from "@daytonaio/sdk";

export interface AppBuildRequest {
  description: string;
}

export interface AppBuildResponse {
  success: boolean;
  sandboxId?: string;
  previewUrl?: string;
  qrCodeUrl?: string;
  expoUrl?: string;
  error?: string;
  logs?: string[];
}

export class DaytonaService {
  private daytona: Daytona;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.daytona = new Daytona({ apiKey });
  }

  async createExpoProject(request: AppBuildRequest): Promise<AppBuildResponse> {
    try {
      const { description } = request;

      console.log(`Creating Expo project...`);

      // Create a new sandbox
      const sandbox = await this.daytona.create({
        language: "typescript",
      });

      console.log(`Created sandbox: ${sandbox.id}`);

      // Generate app name
      const appName = description.toLowerCase().includes("calorie tracker")
        ? "calorie-tracker"
        : "my-app";

      // Set up the Expo project
      await this.setupExpoProject(sandbox, appName);

      // Get preview URL
      const previewUrl = await this.getPreviewUrl(sandbox);

      // Generate Expo URL using sandbox ID
      const expoUrl = `exp://${sandbox.id}.ngrok.io`;

      return {
        success: true,
        sandboxId: sandbox.id,
        previewUrl,
        qrCodeUrl: this.generateQRCodeUrl(`exp://${sandbox.id}.ngrok.io`),
        expoUrl: `exp://${sandbox.id}.ngrok.io`,
        logs: [
          `Created sandbox: ${sandbox.id}`,
          `Created Expo project`,
          `Expo tunnel: ${expoUrl}`,
          `Preview: ${previewUrl}`,
        ],
      };
    } catch (error) {
      console.error("Error creating Expo project:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  private async setupExpoProject(
    sandbox: Sandbox,
    appName: string
  ): Promise<void> {
    try {
      console.log("Setting up Expo project...");

      // Install global packages
      await sandbox.process.executeCommand(
        `npm install -g @expo/cli @expo/ngrok create-expo-app`
      );

      // Create Expo project
      await sandbox.process.executeCommand(
        `npx create-expo-app@latest ${appName} --template blank-typescript --yes`
      );

      // Install dependencies
      await sandbox.process.executeCommand(`cd ${appName} && npm install`);

      // Start Expo tunnel using custom subdomain
      console.log("Starting Expo tunnel with custom subdomain...");

      // Create session for log streaming
      await sandbox.process.createSession("expo-tunnel");

      // Start the Expo command with custom tunnel subdomain
      const cmd = await sandbox.process.executeSessionCommand("expo-tunnel", {
        command: `cd ${appName} && EXPO_TUNNEL_SUBDOMAIN=${sandbox.id} npx expo start --tunnel`,
        async: true,
      });

      console.log("Expo tunnel started, cmdId:", cmd.cmdId);

      // Wait a bit for the tunnel to establish
      console.log("Waiting for tunnel to establish...");
      await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait 15 seconds

      console.log("Expo project setup completed");
    } catch (error) {
      console.error("Error setting up Expo project:", error);
      throw error;
    }
  }

  private generateQRCodeUrl(expoUrl: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      expoUrl
    )}`;
  }

  private async getPreviewUrl(sandbox: Sandbox): Promise<string> {
    try {
      return `https://${sandbox.id}.daytona.io`;
    } catch (error) {
      console.error("Error getting preview URL:", error);
      return "";
    }
  }

  async deleteSandbox(sandboxId: string): Promise<void> {
    try {
      const sandbox = await this.daytona.get(sandboxId);

      // Clean up session
      try {
        await sandbox.process.deleteSession("expo-tunnel");
        console.log("Cleaned up expo-tunnel session");
      } catch (sessionError) {
        console.log("No session to clean up:", sessionError);
      }

      await sandbox.delete();
    } catch (error) {
      console.error("Error deleting sandbox:", error);
    }
  }

  generateAppName(description: string): string {
    if (description.toLowerCase().includes("calorie tracker")) {
      return "calorie-tracker";
    }
    return "my-app";
  }
}
