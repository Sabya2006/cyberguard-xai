"use client";

import { useEffect, useState } from "react";
import CyberLogo from "@/components/CyberLogo";
import { ShieldCheck, Cpu } from "lucide-react";

export default function InitialLoader() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    "Initializing AI Defense Engine...",
    "Securing Encrypted Tunnel Connection...",
    "Loading Threat Intelligence Telemetry...",
    "System Shield Active — Ready",
  ];

  useEffect(() => {
    // Only show loader on initial page mount session
    const hasLoaded = sessionStorage.getItem("cyberguard_loaded");
    if (hasLoaded) {
      setIsVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("cyberguard_loaded", "true");
          }, 600);
          return prev;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [steps.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#040D1A] text-white space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-[#00C2FF] border-t-transparent animate-spin" />
        <div className="absolute">
          <CyberLogo size="md" showText={false} href="" />
        </div>
      </div>

      <div className="text-center space-y-2 max-w-sm px-4">
        <h2 className="font-orbitron font-extrabold text-xl text-white tracking-widest">
          CYBERGUARD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#7B61FF]">XAI</span>
        </h2>
        <div className="text-xs font-mono text-gray-300 h-6 transition-all duration-300 flex items-center justify-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-[#00C2FF] animate-pulse" />
          <span>{steps[step]}</span>
        </div>
      </div>


      {/* Progress Bar */}
      <div className="w-48 h-1.5 rounded-full bg-[#0D253F] overflow-hidden border border-[#00C2FF]/30">
        <div
          className="h-full bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
