"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/lib/contexts/SupabaseContext";
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
  ImagePlus,
  Play,
  Settings,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { PhoneEmulator } from "@/components/PhoneEmulator";
import { ChatInterface } from "@/components/ai-elements/chat-interface";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  category: string;
  created_at: string;
  tags: string[];
}

export default function ProjectPage() {
  const [activeTab, setActiveTab] = useState("preview");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, signOut, loading: authLoading } = useSupabase();
  const router = useRouter();
  const params = useParams();
  const projectId = params.uuid as string;

  useEffect(() => {
    if (user && projectId) {
      loadProject();
    }
  }, [user, projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      // For now, create a mock project - in a real app, fetch from database
      setProject({
        id: projectId,
        name: "New Project",
        description: "Describe your mobile app idea and I'll help you build it",
        status: "draft",
        category: "other",
        created_at: new Date().toISOString(),
        tags: [],
      });
    } catch (error) {
      console.error("Failed to load project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleBackToProjects = () => {
    router.push("/projects");
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 relative h-screen w-full">
      {/* Left Sidebar - Responsive width */}
      <div className="absolute left-0 top-0 w-full max-w-[518px] min-w-[320px] h-full border-r border-[#424242]">
        <div className="flex flex-col h-full">
          {/* Project Title Section */}
          <div className="flex items-center justify-between h-16 border-b border-[#424242] px-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleBackToProjects}
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-400 hover:text-white hover:bg-[#2c2c2c]"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                <span className="text-white text-base font-medium">
                  {project?.name || "New Project"}
                </span>
                <ChevronDown className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            {/* User Info and Sign Out */}
            <div className="flex items-center gap-3">
              <span className="text-white text-sm">{user?.email}</span>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-400 hover:text-white hover:bg-[#2c2c2c]"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Content Area - AI Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface
              projectId={projectId}
              className="h-full bg-[#232323] text-white"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Top Bar and Phone Emulator */}
      <div className="absolute left-[518px] right-0 top-0 h-full">
        {/* Top Bar */}
        <div className="h-16 border-b border-[#424242] bg-neutral-900 flex items-center justify-between px-5">
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
                {/* Content */}
                <div className="text-center px-8 max-w-64">
                  {/* Dynamic content will be generated based on AI chat */}
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
