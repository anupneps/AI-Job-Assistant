import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobLens AI - Your Smart Career Partner",
  description: "AI-powered job search and application assistant",
};

// Background Options - Change this value to switch themes
const BACKGROUND_OPTION = 4; // Options: 1, 2, 3, 4, 5, 6 

const getBackgroundClasses = (option: number) => {
  switch (option) {
    case 1: // Blue-Indigo (Current)
      return {
        gradient: "bg-gradient-to-br from-blue-100/40 via-blue-200/30 to-indigo-200/40",
        darkGradient: "dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]",
        shapes: ["bg-blue-400/15", "bg-indigo-400/15", "bg-blue-500/15"]
      };
    case 2: // Blue-Purple (Professional)
      return {
        gradient: "bg-gradient-to-br from-blue-100/40 via-indigo-100/30 to-purple-200/40",
        darkGradient: "dark:from-[#0f172a] dark:via-[#1e1b4b] dark:to-[#312e81]",
        shapes: ["bg-blue-400/15", "bg-purple-400/15", "bg-indigo-500/15"]
      };
    case 3: // Deep Blue (Corporate)
      return {
        gradient: "bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-indigo-900/20",
        darkGradient: "dark:from-[#0c0f1a] dark:via-[#1e1b4b] dark:to-[#312e81]",
        shapes: ["bg-blue-600/20", "bg-indigo-600/20", "bg-blue-700/20"]
      };
    case 4: // Cool Blue-Green (Fresh)
      return {
        gradient: "bg-gradient-to-br from-blue-100/40 via-cyan-100/30 to-blue-200/40",
        darkGradient: "dark:from-[#0f172a] dark:via-[#164e63] dark:to-[#0e7490]",
        shapes: ["bg-blue-400/15", "bg-cyan-400/15", "bg-blue-500/15"]
      };
    case 5: // Purple-Blue (Modern)
      return {
        gradient: "bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-indigo-200/40",
        darkGradient: "dark:from-[#1e1b4b] dark:via-[#1e293b] dark:to-[#312e81]",
        shapes: ["bg-purple-400/15", "bg-blue-400/15", "bg-indigo-500/15"]
      };
    case 6: // Warm Blue (Friendly)
      return {
        gradient: "bg-gradient-to-br from-blue-50/50 via-blue-100/30 to-indigo-100/40",
        darkGradient: "dark:from-[#f8fafc] dark:via-[#e2e8f0] dark:to-[#cbd5e1]",
        shapes: ["bg-blue-300/20", "bg-indigo-300/20", "bg-blue-400/20"]
      };
    default:
      return {
        gradient: "bg-gradient-to-br from-blue-100/40 via-blue-200/30 to-indigo-200/40",
        darkGradient: "dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]",
        shapes: ["bg-blue-400/15", "bg-indigo-400/15", "bg-blue-500/15"]
      };
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgClasses = getBackgroundClasses(BACKGROUND_OPTION);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        {/* Global background gradient and blurred shapes */}
        <div className={`fixed inset-0 -z-10 ${bgClasses.gradient} ${bgClasses.darkGradient} w-full h-full overflow-hidden`}>
          <div className={`absolute -top-32 -left-32 w-96 h-96 ${bgClasses.shapes[0]} rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 right-0 w-80 h-80 ${bgClasses.shapes[1]} rounded-full blur-2xl`} />
          <div className={`absolute top-1/2 left-1/2 w-72 h-72 ${bgClasses.shapes[2]} rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2`} />
        </div>
        {children}
      </body>
    </html>
  );
}
