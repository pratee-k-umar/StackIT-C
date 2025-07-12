"use client";

import { useState, useEffect } from "react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Purple Neon Border Animation */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div
          className="absolute inset-[-2px] rounded-2xl blur-md opacity-60"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>

      {/* Card Content */}
      <div
        className={`relative z-10 p-6 md:p-8 rounded-2xl border border-purple-500 backdrop-blur-md bg-white/5 shadow-xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ fontFamily: "var(--font-blinker)" }}
      >
        <h2 className="text-2xl font-semibold mb-3 text-white tracking-wide text-center">
          Welcome Back
        </h2>

        <p className="text-sm text-purple-300 mb-6 text-center">
          Login to your account
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-white/10 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-md bg-white/10 border border-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          placeholder="Password"
        />

        <button className="w-full p-3 rounded-md bg-purple-400 hover:bg-purple-300 transition font-medium text-black shadow-md text-sm">
          Log In
        </button>

        <p className="text-xs text-purple-300 text-center mt-6">
          Don’t have an account?{" "}
          <a href="#" className="underline hover:text-purple-400">
            Sign up
          </a>
        </p>

        <p className="text-[10px] text-purple-700 text-center mt-3 leading-relaxed">
          By logging in, you agree to our{" "}
          <a href="#" className="underline hover:text-purple-400">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-purple-400">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
