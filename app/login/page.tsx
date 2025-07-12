"use client";

import { useState } from "react";
import InviteCard from "@/components/InviteCard";
import RegisterCard from "@/components/RegisterCard";

export default function InvitePage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* 🔮 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/vidi.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔳 Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Glowing Title */}
        <style>
          {`
            @keyframes flicker {
              0% { opacity: 1; text-shadow: 0 0 2px #fff, 0 0 4px #fff; }
              5% { opacity: 0.8; text-shadow: none; }
              10% { opacity: 1; text-shadow: 0 0 4px #fff, 0 0 10px #fff; }
              15% { opacity: 0.6; text-shadow: none; }
              20% { opacity: 1; text-shadow: 0 0 8px #fff; }
              25% { opacity: 0.5; text-shadow: none; }
              30%, 100% {
                opacity: 1;
                text-shadow: 0 0 6px #fff, 0 0 12px #fff;
              }
            }
          `}
        </style>

        <h1
          className="text-5xl mb-10 text-center uppercase tracking-widest"
          style={{
            animation: "flicker 2s infinite",
            fontFamily: "var(--font-blinker)",
          }}
        >
          StackIt – A Q&A Forum Platform
        </h1>

        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side Text */}
          <div
            className="w-full lg:w-1/2 text-center lg:text-left"
            style={{ fontFamily: "var(--font-blinker)" }}
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-purple-50 mb-4">
              Collaborate, design, and iterate in real time.
            </h2>
            <p className="text-base md:text-lg text-purple-200 leading-relaxed">
              Join the session below and watch your ideas take shape with
              others.
            </p>
          </div>

          <div className="w-full lg:w-1/2 relative overflow-hidden">
            {/* Sliding Forms */}
            <div
              className={`transition-transform duration-700 ease-in-out flex w-[200%]`}
              style={{
                transform: isRegister ? "translateX(-50%)" : "translateX(0)",
              }}
            >
              {/* Login Card with → Arrow */}
              <div className="w-1/2 relative">
                <InviteCard />
                {!isRegister && (
                  <button
                    onClick={() => setIsRegister(true)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 w-10 h-10 rounded-full flex items-center justify-center
                     bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 transition z-30"
                    title="Go to Register"
                  >
                    →
                  </button>
                )}
              </div>

              {/* Register Card with ← Arrow */}
              <div className="w-1/2 relative">
                <RegisterCard />
                {isRegister && (
                  <button
                    onClick={() => setIsRegister(false)}
                    className="absolute top-1/2 -translate-y-1/2 left-2 w-10 h-10 rounded-full flex items-center justify-center
                     bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 transition z-30"
                    title="Back to Login"
                  >
                    ←
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
