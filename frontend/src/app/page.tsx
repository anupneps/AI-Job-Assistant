"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Glassmorphic Hero Panel */}
      <div className="backdrop-blur-xl bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/20 rounded-3xl shadow-2xl px-8 py-12 max-w-lg w-full flex flex-col items-center gap-6">
        <header className="flex flex-col items-center mb-2">
          <span className="mb-2">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="url(#grad)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="176"
                strokeDashoffset="0"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 32 32"
                  to="360 32 32"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="32" cy="32" r="12" fill="url(#core)" opacity="0.7"/>
              <circle cx="32" cy="32" r="5" fill="#1e40af"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1e40af"/>
                  <stop offset="1" stopColor="#3730a3"/>
                </linearGradient>
                <radialGradient id="core" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2"/>
                </radialGradient>
              </defs>
            </svg>
          </span>
          <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            JobLens AI
          </span>
          <span className="mt-1 text-base sm:text-lg text-foreground/60 font-medium tracking-wide">
            Your Smart Career Partner
          </span>
        </header>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center drop-shadow-sm">
          Welcome to JobLens AI
        </h1>
        <p className="text-lg text-foreground/80 text-center max-w-md">
          Your personalized, AI-powered job search and application assistant. Upload your CV, get tailored job recommendations, and let smart agents help you land your next role.
        </p>
        <button
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform backdrop-blur-md bg-opacity-80"
          onClick={() => window.location.href = "/login"}
        >
          Login / Get Started
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white/80 dark:bg-[#181c2b]/90 border border-white/30 dark:border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center">
            <button
              className="absolute top-3 right-3 text-2xl text-foreground/60 hover:text-foreground/90 focus:outline-none"
              onClick={() => setShowAuthModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${authTab === 'login' ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow' : 'bg-white/60 text-foreground/70 border border-white/30'}`}
                onClick={() => setAuthTab('login')}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${authTab === 'signup' ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow' : 'bg-white/60 text-foreground/70 border border-white/30'}`}
                onClick={() => setAuthTab('signup')}
              >
                Sign Up
              </button>
            </div>
            <form className="w-full flex flex-col gap-4">
              {authTab === 'signup' && (
                <input
                  type="text"
                  placeholder="Username"
                  className="rounded-lg px-4 py-2 bg-white/70 dark:bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-foreground"
                  autoComplete="username"
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="rounded-lg px-4 py-2 bg-white/70 dark:bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-foreground"
                autoComplete="email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-lg px-4 py-2 bg-white/70 dark:bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 text-foreground"
                autoComplete={authTab === 'login' ? 'current-password' : 'new-password'}
                required
              />
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
              >
                {authTab === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
