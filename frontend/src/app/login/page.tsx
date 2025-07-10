"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setToken, setUser } from "../utils/auth";
import api from "../utils/api";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isSignup ? "/api/register" : "/api/login";
      const body = isSignup
        ? { username: form.username, email: form.email, password: form.password }
        : { username: form.username, password: form.password };
      const { data }: { data: any } = await api.post(endpoint, body);
      setToken(data.token);
      setUser(data.user);
      // Fetch profile to determine if onboarding is needed
      try {
        const profileRes = await api.get("/api/profile");
        const profile: any = profileRes.data;
        const needsOnboarding =
          !profile.cvFilePath &&
          (!profile.userProfile?.name || !profile.userProfile?.skills || profile.userProfile.skills.length === 0);
        if (needsOnboarding) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      } catch {
        // fallback: go to onboarding if profile fetch fails
        router.push("/onboarding");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="backdrop-blur-lg bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-500 bg-opacity-80 border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <Image src="/favicon.ico" alt="JobLens AI Logo" width={48} height={48} className="mb-2" />
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">JobLens AI</h1>
          <p className="text-indigo-100 text-sm mb-2">{isSignup ? "Create your account" : "Welcome back!"}</p>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/90 hover:bg-white text-indigo-700 font-semibold shadow transition mb-4 border border-indigo-100"
          onClick={() => window.location.href = "/api/auth/google"}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)"><path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.1C36.5 32.1 34.6 34.6 31.9 36.2V42H39.5C44 38.1 47.5 32.1 47.5 24.5Z" fill="#4285F4"/><path d="M24 48C30.6 48 36.1 45.9 39.5 42L31.9 36.2C30.1 37.3 27.9 38 24 38C18.7 38 14.1 34.3 12.5 29.7H4.7V35.7C8.1 42.1 15.4 48 24 48Z" fill="#34A853"/><path d="M12.5 29.7C12.1 28.6 11.9 27.4 11.9 26.2C11.9 25 12.1 23.8 12.5 22.7V16.7H4.7C3.2 19.6 2.5 22.7 2.5 26.2C2.5 29.7 3.2 32.8 4.7 35.7L12.5 29.7Z" fill="#FBBC05"/><path d="M24 14.1C27.2 14.1 29.7 15.2 31.3 16.7L39.6 9.1C36.1 5.8 30.6 3.5 24 3.5C15.4 3.5 8.1 9.4 4.7 16.7L12.5 22.7C14.1 18.1 18.7 14.1 24 14.1Z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>
          Continue with Google
        </button>
        <div className="flex items-center w-full my-4">
          <div className="flex-grow h-px bg-white/20" />
          <span className="mx-3 text-white/60 text-xs">or</span>
          <div className="flex-grow h-px bg-white/20" />
        </div>
        <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.username}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.email}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-xl px-4 py-2 bg-white/80 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="mt-2 rounded-xl py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition"
            disabled={loading}
          >
            {loading ? (isSignup ? "Signing Up..." : "Logging In...") : isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-white/80 text-sm">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <button className="underline hover:text-indigo-200" onClick={() => setIsSignup(false)}>
                Log In
              </button>
            </>
          ) : (
            <>
              New to JobLens AI?{' '}
              <button className="underline hover:text-indigo-200" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 