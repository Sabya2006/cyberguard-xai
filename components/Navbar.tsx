"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CyberLogo from "@/components/CyberLogo";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "SOC Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#00C2FF]/20 bg-[#040D1A]/85 backdrop-blur-2xl shadow-xl shadow-[#040D1A]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        
        {/* New Futuristic Cyber Shield Logo */}
        <CyberLogo size="md" href="/" />

        {/* Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex rounded-full bg-[#0D253F]/70 p-1.5 border border-[#00C2FF]/30 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold font-orbitron transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-black shadow-lg shadow-[#00C2FF]/30 font-bold scale-105"
                    : "text-gray-300 hover:text-white hover:bg-[#00C2FF]/15"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth / Launch App Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="hidden text-xs font-semibold text-gray-300 hover:text-[#00C2FF] md:block font-orbitron transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00C2FF] via-[#7B61FF] to-[#00E676] p-[1px] shadow-lg shadow-[#00C2FF]/25 hover:shadow-[#00C2FF]/50 transition group"
          >
            <div className="flex items-center gap-2 rounded-[11px] bg-[#040D1A] group-hover:bg-transparent px-4 py-2 text-xs font-bold text-white group-hover:text-black font-orbitron transition-colors">
              <span>Launch Platform</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}
