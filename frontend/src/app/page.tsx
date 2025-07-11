"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Brain, 
  Zap, 
  Target, 
  ArrowRight, 
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Smart algorithms analyze your profile and find perfect job matches",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Applications",
      description: "Apply to multiple jobs with one-click optimized applications",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Personalized Strategy",
      description: "Get tailored advice from specialized AI agents for each application",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "10k+", label: "Jobs Matched", icon: Briefcase },
    { number: "24/7", label: "AI Support", icon: Shield }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-28 h-28 bg-indigo-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -12, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          className="flex justify-between items-center p-6 md:p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur opacity-30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JobLens AI
            </span>
          </motion.div>
          
          <motion.button
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/login"}
          >
            Get Started
          </motion.button>
        </motion.header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-8">
          <div className="max-w-6xl w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-black/20 text-black/90 text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    AI-Powered Job Search Assistant
                  </motion.div>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  >
                    <span className="bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">
                      Land Your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-900 via-cyan-900 to-blue-800 bg-clip-text text-transparent">
                      Dream Job
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-xl text-slate-800 leading-relaxed max-w-lg"
                  >
                    Upload your CV, get personalized job recommendations, and let our AI agents help you craft the perfect application strategy.
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = "/login"}
                  >
                    Start Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Demo
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex gap-8 pt-8"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-3xl font-bold text-slate-900 mb-1">{stat.number}</div>
                      <div className="text-slate-700 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Column - Interactive Features */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                  >
                    <motion.div
                      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer"
                      whileHover={{ scale: 1.02, y: -5 }}
                      animate={{
                        boxShadow: hoveredFeature === index 
                          ? "0 20px 40px rgba(0,0,0,0.3)" 
                          : "0 10px 30px rgba(0,0,0,0.2)"
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <feature.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-700 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </div>
    </div>
  );
}
