#!/usr/bin/env node

// Test script for Daytona service
// Usage: node test-daytona.js

import { DaytonaService } from "./src/lib/daytona.js";

async function testDaytona() {
  console.log("🧪 Testing Daytona Service...");

  try {
    const service = new DaytonaService("test-api-key");

    // Test app name generation
    const calorieName = service.generateAppName("Build a calorie tracker");
    console.log("✅ Calorie tracker name:", calorieName);

    const meditationName = service.generateAppName("Make a meditation timer");
    console.log("✅ Meditation timer name:", meditationName);

    const genericName = service.generateAppName("Create something cool");
    console.log("✅ Generic app name:", genericName);

    console.log("\n🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Tests failed:", error);
    process.exit(1);
  }
}

testDaytona().catch(console.error);
