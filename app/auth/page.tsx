"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CyberLogo from "@/components/CyberLogo";
import { Lock, Mail, User, ShieldCheck, ArrowRight, Github, Chrome } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Supabase Auth Triggered: ${isLogin ? 'Login' : 'Registration'} submitted for ${email}. Access Granted!`);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#040D1A] text-white flex flex-col justify-between cyber-grid">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="glass-card p-8 rounded-3xl border border-[#00C2FF]/40 max-w-md w-full shadow-2xl space-y-6">
          
          <div className="text-center space-y-3 flex flex-col items-center">
            <CyberLogo size="lg" showText={false} href="" />
            <div>
              <h1 className="font-orbitron font-extrabold text-2xl text-white">
                {isLogin ? "Client Portal Login" : "Create SOC Account"}
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Access real-time XAI threat intelligence & security analytics.
              </p>
            </div>
          </div>


          {/* Toggle Tab */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#040D1A] border border-[#7B61FF]/40 text-xs font-orbitron">
            <button
              onClick={() => setIsLogin(true)}
              className={`py-2 rounded-lg font-bold transition ${
                isLogin ? "bg-[#00C2FF] text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`py-2 rounded-lg font-bold transition ${
                !isLogin ? "bg-[#7B61FF] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-orbitron text-gray-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-orbitron text-gray-300 mb-1">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@enterprise.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-orbitron text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-white focus:outline-none focus:border-[#00C2FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-black font-orbitron font-bold text-xs shadow-lg shadow-[#00C2FF]/30 hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <span>{isLogin ? "Authenticate to Portal" : "Create Account & Launch"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Social OAuth */}
          <div className="space-y-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-800 w-full" />
              <span className="bg-[#0D253F] px-2 text-[10px] font-mono text-gray-500 uppercase absolute">OR OAUTH 2.0</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => alert("Supabase GitHub Auth triggered.")}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-gray-300 hover:border-[#00C2FF]"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Supabase Google Auth triggered.")}
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[#040D1A] border border-gray-700 text-xs text-gray-300 hover:border-[#00C2FF]"
              >
                <Chrome className="h-4 w-4" />
                <span>Google</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
