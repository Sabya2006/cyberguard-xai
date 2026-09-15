"use client";

import { Info } from "lucide-react";

interface DemoBadgeProps {
  label?: string;
}

export default function DemoBadge({ label = "DEMO DATA / SIMULATED" }: DemoBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7B61FF]/15 border border-[#7B61FF]/40 text-[#7B61FF] font-mono font-bold text-[10px] uppercase tracking-wider">
      <Info className="h-3 w-3 shrink-0" />
      <span>{label}</span>
    </div>
  );
}
