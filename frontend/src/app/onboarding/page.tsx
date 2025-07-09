"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CVUploadModal from "../components/CVUploadModal";
import { isLoggedIn } from "../utils/auth";

export default function OnboardingPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    }
  }, [router]);

  const handleCVUpload = () => {
    setShowModal(true);
  };

  const handleManualSetup = () => {
    router.push("/profile/edit?mode=setup");
  };

  const handleModalSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CVUploadModal open={showModal} onClose={() => setShowModal(false)} onSuccess={handleModalSuccess} />
      <div className="backdrop-blur-lg bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-500/80 border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-2xl flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <Image src="/favicon.ico" alt="JobLens AI Logo" width={64} height={64} className="mb-4" />
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Welcome to JobLens AI!</h1>
          <p className="text-xl text-white/90 text-center max-w-lg">
            Let's get your profile set up so we can start finding your perfect job matches.
          </p>
        </div>

        <div className="w-full max-w-md space-y-6">
          {/* CV Upload Option */}
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all cursor-pointer" onClick={handleCVUpload}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Upload Your CV</h3>
                <p className="text-white/80 text-sm">Quick setup - we'll extract your info automatically</p>
              </div>
            </div>
          </div>

          {/* Manual Setup Option */}
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all cursor-pointer" onClick={handleManualSetup}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Manual Setup</h3>
                <p className="text-white/80 text-sm">Fill out your profile step by step</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-white/60 text-sm text-center">
          <p>Don't worry, you can always update your profile later!</p>
        </div>
      </div>
    </div>
  );
} 