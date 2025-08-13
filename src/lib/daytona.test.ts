// Simple test file to verify Daytona service functionality
// This is not a formal test suite, just for development verification

import { DaytonaService } from "./daytona";

// Mock environment variable for testing
process.env.NEXT_PUBLIC_DAYTONA_API_KEY = "test-api-key";

async function testDaytonaService() {
  console.log("Testing Daytona Service...");

  try {
    const service = new DaytonaService("test-api-key");

    // Test app name generation
    const calorieName = service["generateAppName"]("Build a calorie tracker");
    console.log("Calorie tracker name:", calorieName);

    const meditationName = service["generateAppName"](
      "Make a meditation timer"
    );
    console.log("Meditation timer name:", meditationName);

    const genericName = service["generateAppName"]("Create something cool");
    console.log("Generic app name:", genericName);

    console.log("✅ Daytona service tests passed!");
  } catch (error) {
    console.error("❌ Daytona service tests failed:", error);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDaytonaService();
}

export { testDaytonaService };
