"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSupabase } from "@/lib/contexts/SupabaseContext";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const { user, signOut } = useSupabase();

  const isInputEmpty = inputText.trim() === "";

  const handleSubmit = async () => {
    if (isInputEmpty) return;

    // Check if user is authenticated
    if (!user) {
      setShowSignInModal(true);
      return;
    }

    // TODO: Implement app building logic here
    console.log("Building app:", inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleSigningIn(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google sign in error:", error);
        setIsGoogleSigningIn(false);
        // You can add error handling here (show toast, etc.)
      }
      // Note: On success, the user will be redirected to Google OAuth
      // and then back to the callback route, so we don't need to handle success here
    } catch (error) {
      console.error("Google sign in error:", error);
      setIsGoogleSigningIn(false);
    }
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#0F0F17" }}
    >
      {/* Background SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <Image
          src="/radient-bg.svg"
          alt="Gradient background"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2 text-white">
          <span className="text-xl font-semibold">Pluto</span>
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <a
              href="/projects"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Projects
            </a>
          )}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">{user.email}</span>
              <Button
                onClick={signOut}
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2"
              >
                Sign out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowSignInModal(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2"
            >
              Sign in
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Build mobile apps. Fast.
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Create mobile apps by chatting with AI
        </p>

        {/* Input Field */}
        <div className="relative w-full max-w-2xl mb-8">
          <textarea
            placeholder="Describe the app you want to create..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-[133px] rounded-[30px] border border-[rgba(255,255,255,0.10)] bg-[rgba(23,21,28,0.90)] text-white placeholder:text-gray-400 pl-6 pr-6 pt-6 pb-20 text-lg shadow-[0_4px_33.5px_0_rgba(0,0,0,0.25),0_4px_100px_0_rgba(0,0,0,0.10),0_0_67.6px_-20px_rgba(149,161,255,0.10)_inset] backdrop-blur-[35px] resize-none outline-none"
          />
          <div className="absolute right-6 bottom-6 flex space-x-2">
            <Button
              size="sm"
              disabled={isInputEmpty}
              onClick={handleSubmit}
              className={`w-10 h-10 rounded-[39px] p-0 transition-colors cursor-pointer ${
                isInputEmpty
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-transparent hover:bg-white/10"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9.375 2.25H5.85C4.58988 2.25 3.95982 2.25 3.47852 2.49524C3.05516 2.71095 2.71095 3.05516 2.49524 3.47852C2.25 3.95982 2.25 4.58988 2.25 5.85V12.15C2.25 13.4102 2.25 14.0401 2.49524 14.5215C2.71095 14.9449 3.05516 15.2891 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75H12.75C13.4475 15.75 13.7963 15.75 14.0824 15.6734C14.8588 15.4653 15.4653 14.8588 15.6734 14.0824C15.75 13.7963 15.75 13.4475 15.75 12.75M14.25 6V1.5M12 3.75H16.5M7.875 6.375C7.875 7.20343 7.20343 7.875 6.375 7.875C5.54657 7.875 4.875 7.20343 4.875 6.375C4.875 5.54657 5.54657 4.875 6.375 4.875C7.20343 4.875 7.875 5.54657 7.875 6.375ZM11.2425 8.93858L4.89836 14.706C4.54152 15.0304 4.3631 15.1926 4.34732 15.3332C4.33364 15.455 4.38034 15.5757 4.47239 15.6566C4.57859 15.75 4.81971 15.75 5.30197 15.75H12.342C13.4213 15.75 13.961 15.75 14.3849 15.5686C14.917 15.341 15.341 14.917 15.5686 14.3849C15.75 13.961 15.75 13.4213 15.75 12.342C15.75 11.9788 15.75 11.7972 15.7103 11.6281C15.6604 11.4156 15.5647 11.2166 15.43 11.0448C15.3227 10.9082 15.1809 10.7947 14.8973 10.5679L12.7993 8.88953C12.5155 8.66243 12.3737 8.54888 12.2174 8.50883C12.0796 8.4735 11.9347 8.47808 11.7994 8.52203C11.6459 8.57183 11.5114 8.69408 11.2425 8.93858Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  disabled={isInputEmpty}
                  onClick={handleSubmit}
                  className={`w-10 h-10 rounded-[39px] p-0 transition-colors cursor-pointer shadow-[1px_1px_9.9px_0_rgba(0,0,0,0.08)] ${
                    isInputEmpty
                      ? "bg-gray-600 cursor-not-allowed opacity-50"
                      : "bg-white hover:bg-gray-300"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>enter ⏎</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Suggestion Buttons */}
        <div className="relative z-10 flex flex-col items-center gap-3 max-w-4xl">
          {/* Row 1 - 3 buttons */}
          <div className="flex flex-row gap-3 items-center justify-center">
            <Button
              variant="outline"
              onClick={() => setInputText("Make a meditation timer")}
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer hover:bg-black/20 transition-colors"
            >
              Make a meditation timer
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputText("Build a calorie tracker")}
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer hover:bg-black/20 transition-colors"
            >
              Build a calorie tracker
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputText("Design a weather dashboard")}
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer hover:bg-black/20 transition-colors"
            >
              Design a weather dashboard
            </Button>
          </div>
          {/* Row 2 - 2 buttons */}
          <div className="flex flex-row gap-3 items-center justify-center">
            <Button
              variant="outline"
              onClick={() => setInputText("Design a visual novel")}
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer hover:bg-black/20 transition-colors"
            >
              Design a visual novel
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputText("Create an Instagram-style feed")}
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer hover:bg-black/20 transition-colors"
            >
              Create an Instagram-style feed
            </Button>
          </div>
        </div>
      </main>

      {/* Sign In Modal */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isGoogleSigningIn}
              className="w-full"
            >
              {isGoogleSigningIn ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
