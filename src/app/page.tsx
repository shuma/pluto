"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const [inputText, setInputText] = useState("");

  const isInputEmpty = inputText.trim() === "";

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#0F0F17" }}
    >
      {/* Background SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <img
          src="/radient-bg.svg"
          alt="Gradient background"
          className="w-full h-full object-cover"
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
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Login
          </a>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2">
            Sign up
          </Button>
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
            className="w-full h-[133px] rounded-[30px] border border-[rgba(255,255,255,0.10)] bg-[rgba(23,21,28,0.90)] text-white placeholder:text-gray-400 pl-6 pr-6 pt-6 pb-20 text-lg shadow-[0_4px_33.5px_0_rgba(0,0,0,0.25),0_4px_100px_0_rgba(0,0,0,0.10),0_0_67.6px_-20px_rgba(149,161,255,0.10)_inset] backdrop-blur-[35px] resize-none outline-none"
          />
          <div className="absolute right-6 bottom-6 flex space-x-2">
            <Button
              size="sm"
              disabled={isInputEmpty}
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
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer"
            >
              Make a meditation timer
            </Button>
            <Button
              variant="outline"
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer"
            >
              Build a calorie tracker
            </Button>
            <Button
              variant="outline"
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer"
            >
              Design a weather dashboard
            </Button>
          </div>
          {/* Row 2 - 2 buttons */}
          <div className="flex flex-row gap-3 items-center justify-center">
            <Button
              variant="outline"
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer"
            >
              Design a visual novel
            </Button>
            <Button
              variant="outline"
              className="text-white px-6 py-3 rounded-[87px] border border-black/10 bg-black/10 cursor-pointer"
            >
              Create an Instagram-style feed
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
