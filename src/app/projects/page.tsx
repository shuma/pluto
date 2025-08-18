"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Download,
  Share2,
  RefreshCw,
  Globe,
  Smartphone,
  Code,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  Camera,
  Play,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { PhoneEmulator } from "@/components/PhoneEmulator";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("preview");

  return (
    <div className="bg-neutral-900 relative h-screen w-full">
      {/* Left Sidebar - Responsive width */}
      <div className="absolute left-0 top-0 w-full max-w-[518px] min-w-[320px] h-full border-r border-[#424242]">
        <div className="flex flex-col h-full">
          {/* Project Title Section */}
          <div className="flex items-center justify-center h-16 border-b border-[#424242]">
            <div className="flex items-center gap-1">
              <span className="text-white text-base font-medium">
                Minimal Price Tracker
              </span>
              <ChevronDown className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Project Description */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">
                  Project Description
                </h3>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="bg-[#232323] border border-[#424242] rounded-lg p-3 mb-4">
                <p className="text-sm text-white leading-5">
                  Create a simple, Apple-styled minimal app for price tracking.
                  The UI should be styled to be super clean and minimal,
                  reflecting the Apple aesthetic and system UI tone.
                </p>
              </div>
            </div>

            {/* AI Thinking Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#232323] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#424242] rounded-full"></div>
                </div>
                <span className="text-sm font-medium bg-gradient-to-r from-white via-white to-[#99999973] bg-clip-text text-transparent">
                  Thinking
                </span>
              </div>
              <div className="text-sm text-[#878787] leading-6 mb-4">
                <p>
                  For an Apple-styled price tracking app, I&apos;ll need to
                  create:
                </p>
                <br />
                <p>1. A clean home screen with a list of tracked items</p>
                <p>2. A detail view for each item showing price history</p>
                <p>3. A way to add new items to track</p>
                <p>4. A settings screen</p>
                <br />
                <p>
                  The color scheme should be very minimal - whites, light grays,
                  with accent colors used sparingly. Typography should follow
                  Apple&apos;s SF Pro style with appropriate weights.
                </p>
                <br />
                <p>Key components:</p>
                <p>- Item list with price trends (up/down indicators)</p>
                <p>- Price history chart (line chart)</p>
                <p>- Add item form</p>
                <p>- Settings page</p>
                <br />
                <p>I&apos;ll use a tab-based navigation with:</p>
                <p>- Home/Tracking tab</p>
                <p>- Add Item tab</p>
                <p>- Settings tab</p>
                <br />
                <p>
                  For data management, I&apos;ll create a context provider to
                  manage the tracked items state.
                </p>
              </div>
            </div>

            {/* File Activity Log */}
            <div className="mb-8">
              <div className="bg-[#232323] border border-[#424242] rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Apple-styled Price Tracker App
                  </h3>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-sm">
                      Created app/(tabs)/_layout.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-sm">
                      Created app/(tabs)/_layout.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-sm">
                      Created app/(tabs)/_layout.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-sm">
                      Created app/(tabs)/_layout.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">
                      Edited app/(tabs)/_layout.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">
                      Edited app/(tabs)/_layout.tsx
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">
                      Edited app/(tabs)/_layout.tsx
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <div className="bg-[#232323] border border-[#424242] rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="h-10 justify-start text-[#878787] hover:bg-[#2c2c2c]"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Open in Mobile
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 justify-start text-[#878787] hover:bg-[#2c2c2c]"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    &lt;/&gt; Code
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 justify-start text-[#878787] hover:bg-[#2c2c2c]"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 hover:bg-[#2c2c2c]"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 hover:bg-[#2c2c2c]"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="p-5 border-t border-[#424242]">
            <div className="bg-[#232323] border border-[#424242] rounded-lg p-3 shadow-lg">
              <div className="mb-3">
                <Input
                  placeholder="Describe the mobile app you want to build"
                  className="bg-transparent border-none text-white placeholder:text-[#878787] text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[rgba(66,66,66,0.5)] rounded flex items-center justify-center">
                    <Camera className="h-4 w-4 text-[#878787]" />
                  </div>
                  <span className="text-xs text-[#878787]">
                    5 messages left for today.{" "}
                    <span className="text-white">Upgrade</span>
                  </span>
                </div>
                <Button className="w-7 h-7 p-0 bg-white hover:bg-gray-100">
                  <ArrowUp className="h-4 w-4 text-black" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Top Bar and Phone Emulator */}
      <div className="absolute left-[518px] right-0 top-0 h-full">
        {/* Top Bar */}
        <div className="h-16 border-b border-[#424242] bg-neutral-900 flex items-center justify-between px-5">
          {/* Left: Project Selection */}

          {/* Center: Tabs */}
          <div className="flex items-center space-x-1 bg-[#2c2c2c] rounded-lg p-1">
            <Button
              variant={activeTab === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("preview")}
              className={`text-sm ${
                activeTab === "preview"
                  ? "bg-neutral-900 text-white"
                  : "text-[#878787]"
              }`}
            >
              Preview
            </Button>
            <Button
              variant={activeTab === "code" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("code")}
              className={`text-sm ${
                activeTab === "code"
                  ? "bg-neutral-900 text-white"
                  : "text-[#878787]"
              }`}
            >
              Code
            </Button>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button className="bg-[#2c2c2c] text-white border-none hover:bg-[#424242]">
              <div className="w-2 h-2 bg-[#34C759] rounded-full mr-1"></div>
              Live
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2c2c2c] border-none text-white"
            >
              <Settings className="h-4 w-4 mr-1" />
              Upgrade
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2c2c2c] border-none text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2c2c2c] border-none text-white"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              size="sm"
              className="bg-[#007aff] hover:bg-[#0056cc] text-white"
            >
              <Play className="h-4 w-4 mr-1" />
              Publish
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-[calc(100%-4rem)] flex flex-col overflow-hidden">
          {/* Top Controls Row */}
          <div className="flex items-center justify-between p-5 pb-0">
            {/* Test on your Phone Button - Left */}
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2c2c2c] border-none text-white h-10"
            >
              <Smartphone className="h-4 w-4 " />
              Test on your Phone
            </Button>

            {/* Platform Icons - Right Side */}
            <div className="flex items-center space-x-2">
              {/* Platform Tabs Container */}
              <div className="bg-[#2c2c2c] rounded-lg p-[3px] h-10 w-[132px]">
                <div className="flex h-full">
                  {/* Apple Platform Tab */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-full p-0 bg-neutral-900 hover:bg-neutral-800 rounded-md"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Logo variant="apple" size={16} color="white" />
                    </div>
                  </Button>

                  {/* Android Platform Tab */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-full p-0 hover:bg-[#424242]"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Logo variant="android" size={16} color="white" />
                    </div>
                  </Button>

                  {/* Globe Platform Tab */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 h-full p-0 hover:bg-[#424242]"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <Globe className="w-[13px] h-[13px] text-white" />
                    </div>
                  </Button>
                </div>
              </div>

              {/* Reload Button */}
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 bg-[#2c2c2c] hover:bg-[#424242] text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Phone Emulator - Centered in remaining space */}
          <div className="flex-1 flex items-center justify-center p-3 md:p-5">
            <PhoneEmulator className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-full max-h-[500px] md:max-h-[580px] lg:max-h-[640px]">
              {/* Screen Content */}
              <div className="h-full w-full bg-black flex items-center justify-center relative">
                {/* Dynamic Island */}
                {/* <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div> */}

                {/* Content */}
                <div className="text-center px-8 max-w-64">
                  {/* <div className="space-y-6">
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-[18px] h-[18px] bg-[#424242] rounded"></div>
                      <span className="text-sm text-[#878787]">
                        Chat with AI in the sidebar
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-[18px] h-[18px] bg-[#424242] rounded"></div>
                      <span className="text-sm text-[#878787]">
                        Instantly preview your changes
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-[18px] h-[18px] bg-[#424242] rounded"></div>
                      <span className="text-sm text-[#878787]">
                        Select and edit any element
                      </span>
                    </div>
                  </div> */}
                </div>

                {/* Getting Ready Text */}
                <div className="absolute bottom-0 left-0 right-0 h-[138px] flex items-center justify-center">
                  <h2 className="text-xl font-semibold text-white">
                    Getting everything ready…
                  </h2>
                </div>
              </div>
            </PhoneEmulator>
          </div>
        </div>
      </div>
    </div>
  );
}
