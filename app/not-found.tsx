"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#0D253F] border border-[#00C2FF]/40 flex items-center justify-center text-[#00C2FF] font-orbitron font-extrabold text-2xl shadow-xl">
        404
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="font-orbitron font-extrabold text-2xl text-white">
          Node Address Not Found
        </h1>
        <p className="text-xs text-gray-400 font-mono">
          The requested endpoint URI does not exist or has been quarantined by autonomous SOC proxy.
        </p>
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 rounded-xl bg-[#00C2FF] px-6 py-3 text-xs font-bold text-black font-orbitron hover:opacity-90 transition shadow-lg shadow-[#00C2FF]/30"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Security Portal</span>
      </Link>
    </div>
  );
}
