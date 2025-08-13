#!/usr/bin/env node

// Simple test script for the new simplified Daytona approach
// Usage: node test-simple-expo.js

import { DaytonaService } from "./src/lib/daytona.js";

async function testSimpleExpo() {
  const apiKey = process.env.DAYTONA_API_KEY;
  if (!apiKey) {
    console.error("DAYTONA_API_KEY environment variable not set");
    process.exit(1);
  }

  try {
    console.log("🧪 Testing simplified Daytona approach...");

    const service = new DaytonaService(apiKey);

    // Test the new approach
    const result = await service.createExpoProject({
      description: "Test simplified Expo tunnel approach",
    });

    console.log("\n🎯 Result:", JSON.stringify(result, null, 2));

    if (result.success) {
      console.log("✅ Expo tunnel created successfully!");
      console.log("🔗 Expo URL:", result.expoUrl);
      console.log("📱 QR Code:", result.qrCodeUrl);
    } else {
      console.log("❌ Failed to create Expo tunnel:", result.error);
    }
  } catch (error) {
    console.error("❌ Error testing simplified Expo:", error);
    process.exit(1);
  }
}

testSimpleExpo().catch(console.error);
