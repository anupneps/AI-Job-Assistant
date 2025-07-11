"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { setToken, setUser } from "../utils/auth";
import api from "../utils/api";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
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

  const benefits = [
    "AI-powered job matching",
    "Personalized application strategy",
    "24/7 intelligent support",
    "Track application progress"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-5xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur opacity-30"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    JobLens AI
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                  Welcome to the Future of
                  <span className="block bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent">
                    Job Hunting
                  </span>
                </h1>
                
                <p className="text-xl text-slate-700 leading-relaxed">
                  Join thousands of professionals who've transformed their careers with AI-powered job search and application assistance.
                </p>
              </motion.div>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Why Choose JobLens AI?</h3>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-800">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-2 gap-6 pt-8"
              >
                <div className="text-center p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-slate-900 mb-1">10k+</div>
                  <div className="text-slate-700 text-sm">Active Users</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-slate-900 mb-1">95%</div>
                  <div className="text-slate-700 text-sm">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {isSignup ? "Create Account" : "Welcome Back"}
                  </h2>
                  <p className="text-slate-700">
                    {isSignup ? "Start your journey with JobLens AI" : "Sign in to continue your job search"}
                  </p>
                </motion.div>

                {/* Google OAuth Button */}
                <motion.button
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/90 hover:bg-white text-slate-700 font-semibold shadow-lg transition-all mb-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = "/api/auth/google"}
                >
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_17_40)"><path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.1C36.5 32.1 34.6 34.6 31.9 36.2V42H39.5C44 38.1 47.5 32.1 47.5 24.5Z" fill="#4285F4"/><path d="M24 48C30.6 48 36.1 45.9 39.5 42L31.9 36.2C30.1 37.3 27.9 38 24 38C18.7 38 14.1 34.3 12.5 29.7H4.7V35.7C8.1 42.1 15.4 48 24 48Z" fill="#34A853"/><path d="M12.5 29.7C12.1 28.6 11.9 27.4 11.9 26.2C11.9 25 12.1 23.8 12.5 22.7V16.7H4.7C3.2 19.6 2.5 22.7 2.5 26.2C2.5 29.7 3.2 32.8 4.7 35.7L12.5 29.7Z" fill="#FBBC05"/><path d="M24 14.1C27.2 14.1 29.7 15.2 31.3 16.7L39.6 9.1C36.1 5.8 30.6 3.5 24 3.5C15.4 3.5 8.1 9.4 4.7 16.7L12.5 22.7C14.1 18.1 18.7 14.1 24 14.1Z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>
                  Continue with Google
                </motion.button>

                <div className="flex items-center w-full my-6">
                  <div className="flex-grow h-px bg-white/20" />
                  <span className="mx-4 text-white/60 text-sm">or</span>
                  <div className="flex-grow h-px bg-white/20" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  {isSignup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        {isSignup ? "Create Account" : "Sign In"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <motion.div
                  className="text-center mt-6 text-slate-700 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {isSignup ? (
                    <>
                      Already have an account?{' '}
                      <button 
                        className="text-blue-700 hover:text-blue-500 underline transition-colors" 
                        onClick={() => setIsSignup(false)}
                      >
                        Sign In
                      </button>
                    </>
                  ) : (
                    <>
                      New to JobLens AI?{' '}
                      <button 
                        className="text-blue-700 hover:text-blue-500 underline transition-colors" 
                        onClick={() => setIsSignup(true)}
                      >
                        Create Account
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 