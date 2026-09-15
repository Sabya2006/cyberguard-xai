"use client";

interface RiskGaugeProps {
  score: number;
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  // Color classification
  const color =
    score < 25
      ? "#00E676"
      : score < 50
      ? "#FFB800"
      : score < 75
      ? "#FF9100"
      : "#FF4D4D";

  const label =
    score < 25
      ? "SAFE / BASELINE"
      : score < 50
      ? "LOW RISK ANOMALY"
      : score < 75
      ? "MEDIUM THREAT"
      : "CRITICAL THREAT";

  // Arc calculation for 180 deg semi circle
  const circumference = Math.PI * 80;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center w-48 h-28 overflow-hidden">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background Track Arc */}
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#0D253F"
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke={color}
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute bottom-2 text-center">
          <span className="font-orbitron text-4xl font-extrabold" style={{ color }}>
            {score}
          </span>
          <span className="block text-[10px] text-gray-400 font-mono">/ 100 XAI SCORE</span>
        </div>
      </div>

      <div className="mt-2 px-3 py-1 rounded-full text-xs font-orbitron font-bold border" style={{ color, borderColor: color, backgroundColor: `${color}15` }}>
        {label}
      </div>
    </div>
  );
}
