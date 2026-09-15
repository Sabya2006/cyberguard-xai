"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("CYBERGUARD XAI Handled Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-3xl border border-[#FF4D4D]/50 max-w-md w-full text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#FF4D4D]/20 border border-[#FF4D4D]/50 mx-auto flex items-center justify-center text-[#FF4D4D]">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-orbitron font-extrabold text-xl text-white">
            Telemetry Exception Intercepted
          </h1>
          <p className="text-xs text-gray-300 font-mono">
            An unforeseen runtime exception occurred. The system remains secure and isolated.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 py-2.5 rounded-xl bg-[#00C2FF] text-black font-orbitron font-bold text-xs hover:opacity-90 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="flex-1 py-2.5 rounded-xl border border-gray-700 bg-[#0D253F] text-white font-orbitron font-bold text-xs hover:border-[#00C2FF] flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
