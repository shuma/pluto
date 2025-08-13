import { useState } from "react";

export interface AppBuildRequest {
  description: string;
  appName: string;
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

export const useAppBuilder = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildResult, setBuildResult] = useState<AppBuildResponse | null>(null);

  const buildApp = async (description: string) => {
    if (!description.trim()) return;

    setIsBuilding(true);
    setBuildResult(null);

    try {
      const request: AppBuildRequest = {
        description: description.trim(),
        appName: generateAppName(description),
      };

      // Call the API route instead of importing Daytona service directly
      const response = await fetch("/api/build-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AppBuildResponse = await response.json();
      setBuildResult(result);

      // Log the result for debugging
      if (result.success) {
        console.log("App built successfully:", {
          sandboxId: result.sandboxId,
          expoUrl: result.expoUrl,
          qrCodeUrl: result.qrCodeUrl,
        });
      }
    } catch (error) {
      console.error("Error building app:", error);
      setBuildResult({
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsBuilding(false);
    }
  };

  const generateAppName = (description: string): string => {
    if (description.toLowerCase().includes("calorie tracker")) {
      return "Calorie Tracker";
    } else if (description.toLowerCase().includes("meditation timer")) {
      return "Meditation Timer";
    } else if (description.toLowerCase().includes("weather dashboard")) {
      return "Weather Dashboard";
    } else {
      return "My App";
    }
  };

  return {
    buildApp,
    isBuilding,
    buildResult,
    generateAppName,
  };
};
