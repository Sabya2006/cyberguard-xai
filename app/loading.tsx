"use client";

import { Cpu } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#00C2FF] border-t-transparent animate-spin" />
        <Cpu className="absolute h-6 w-6 text-[#00C2FF]" />
      </div>
      <div className="text-xs font-orbitron font-bold text-gray-300 tracking-wider">
        STREAMING TELEMETRY...
      </div>
    </div>
  );
}
