"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Subtle Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="text-center max-w-md space-y-6 relative z-10">
        
        {/* Decorative Animated Icon */}
        <div className="inline-flex bg-[#141414] border border-zinc-800/80 p-4 rounded-2xl text-blue-500 shadow-xl shadow-blue-500/5 mb-2 animate-bounce">
          <BookOpen size={40} />
        </div>

        {/* Big 404 Text */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-200">Page Not Found</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Oops! The page you are looking for doesnt exist or has been moved to another window.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-600/10 active:scale-95"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Subtle Footer-like Note */}
      <div className="absolute bottom-6 text-xs text-zinc-700">
        E-Janala • Lost in Space
      </div>
    </div>
  );
};

export default NotFound;