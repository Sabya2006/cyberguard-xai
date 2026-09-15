"use client";

import React from "react";
import Link from "next/link";

interface CyberLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

export default function CyberLogo({ size = "md", showText = true, href = "/" }: CyberLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const logoContent = (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Glowing SVG Shield + Core Logo */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        {/* Ambient Glow Aura */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00C2FF] via-[#7B61FF] to-[#00E676] blur-md opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Shield Outer Container */}
        <div className="relative w-full h-full rounded-2xl bg-[#040D1A] border border-[#00C2FF]/60 flex items-center justify-center overflow-hidden shadow-lg shadow-[#00C2FF]/30">
          {/* Animated Background Laser Line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent animate-pulse" />

          {/* Futuristic SVG Shield Icon */}
          <svg className="w-3/4 h-3/4 text-[#00C2FF] drop-shadow-[0_0_8px_rgba(0,194,255,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
            <path d="M12 6v12" className="stroke-[#7B61FF] stroke-2" />
            <path d="M8 10l8 4" className="stroke-[#00E676] stroke-2" />
            <path d="M8 14l8-4" className="stroke-[#00C2FF] stroke-2" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-orbitron font-extrabold tracking-wider text-white ${textSizes[size]} leading-none`}>
            CYBERGUARD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#7B61FF]">XAI</span>
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#00C2FF] uppercase mt-0.5 opacity-90">
            AUTONOMOUS DEFENSE ENGINE
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
}
