"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function AnimatedHeadline() {
  const words = ["PHISHING", "DEEPFAKES", "MALWARE", "IDENTITY ATTACKS", "AI THREATS"];
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, words.length]);

  return (
    <span className="relative inline-block text-[#00C2FF] transition-all duration-500 underline decoration-[#7B61FF]/60 underline-offset-8">
      {words[index]}
    </span>
  );
}
