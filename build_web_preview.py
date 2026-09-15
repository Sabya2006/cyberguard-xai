import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CYBERGUARD XAI – Interactive Presentation Deck</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Orbitron:wght@500;700;900&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #040D1A;
      color: #FFFFFF;
      overflow-x: hidden;
    }

    .font-orbitron {
      font-family: 'Orbitron', sans-serif;
    }

    .cyber-card {
      background: #0D253F;
      border: 1px solid rgba(0, 194, 255, 0.3);
      box-shadow: 0 4px 20px rgba(0, 194, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .cyber-card:hover {
      border-color: rgba(0, 194, 255, 0.8);
      box-shadow: 0 6px 25px rgba(0, 194, 255, 0.25);
    }

    .cyber-glow-blue {
      box-shadow: 0 0 15px rgba(0, 194, 255, 0.4);
    }

    .cyber-glow-purple {
      box-shadow: 0 0 15px rgba(123, 97, 255, 0.4);
    }

    .slide-canvas {
      aspect-ratio: 16 / 9;
      width: 100%;
      max-width: 1100px;
      background: #071A2F;
      position: relative;
    }

    /* Radial grid background */
    .cyber-bg-grid {
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(0, 194, 255, 0.08) 0%, transparent 60%),
        linear-gradient(to right, rgba(0, 194, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 194, 255, 0.05) 1px, transparent 1px);
      background-size: 100% 100%, 30px 30px, 30px 30px;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-between p-4 md:p-6 bg-[#040D1A]">

  <!-- Top Navigation Header -->
  <header class="w-full max-w-[1100px] flex flex-wrap items-center justify-between gap-4 mb-4 bg-[#071A2F]/80 p-4 rounded-2xl border border-[#00C2FF]/30 backdrop-blur-md">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C2FF] to-[#7B61FF] flex items-center justify-center font-orbitron font-bold text-black text-lg">
        X
      </div>
      <div>
        <h1 class="font-orbitron font-bold text-base md:text-lg text-white tracking-wider">CYBERGUARD XAI</h1>
        <p class="text-xs text-[#00C2FF]">BPUT Hackathon 2026 Presentation Viewer</p>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-3">
      <button onclick="prevSlide()" class="px-3 py-1.5 rounded-lg bg-[#0D253F] border border-[#00C2FF]/40 text-sm font-semibold hover:bg-[#00C2FF] hover:text-black transition">
        ◀ Prev
      </button>

      <span id="slide-indicator" class="font-orbitron text-sm font-bold px-3 py-1 bg-[#040D1A] rounded-lg border border-[#7B61FF]/40 text-[#00C2FF]">
        Slide 01 / 18
      </span>

      <button onclick="nextSlide()" class="px-3 py-1.5 rounded-lg bg-[#0D253F] border border-[#00C2FF]/40 text-sm font-semibold hover:bg-[#00C2FF] hover:text-black transition">
        Next ▶
      </button>

      <select id="slide-jump" onchange="goToSlide(parseInt(this.value))" class="bg-[#0D253F] border border-[#7B61FF]/40 text-xs py-1.5 px-2 rounded-lg text-white focus:outline-none focus:border-[#00C2FF]">
        <!-- Options populated dynamically -->
      </select>

      <button onclick="toggleNotes()" class="px-3 py-1.5 rounded-lg bg-[#7B61FF]/20 border border-[#7B61FF] text-xs font-semibold text-[#7B61FF] hover:bg-[#7B61FF] hover:text-white transition">
        📝 Speaker Notes
      </button>
    </div>
  </header>

  <!-- Slide Canvas Container -->
  <main class="w-full max-w-[1100px] flex flex-col items-center">
    <div id="slide-viewport" class="slide-canvas cyber-bg-grid rounded-2xl border-2 border-[#00C2FF]/40 overflow-hidden p-6 md:p-10 flex flex-col justify-between shadow-2xl">
      <!-- Dynamic Slide Content Inserted Here -->
    </div>

    <!-- Speaker Notes Box (Collapsible) -->
    <div id="notes-container" class="w-full max-w-[1100px] mt-4 p-4 rounded-xl bg-[#0D253F]/90 border border-[#7B61FF]/50 hidden transition-all">
      <div class="flex items-center gap-2 text-[#7B61FF] font-orbitron font-semibold text-xs tracking-wider mb-1">
        <span>📝 SPEAKER NOTES</span>
      </div>
      <p id="speaker-notes-text" class="text-sm text-gray-200 leading-relaxed">
        Loading notes...
      </p>
    </div>
  </main>

  <!-- Footer Info -->
  <footer class="w-full max-w-[1100px] mt-6 flex justify-between items-center text-xs text-gray-400">
    <span>Team: Cybershield Innovators | BPUT Hackathon 2026</span>
    <span>Use ⬅️ ➡️ arrow keys to navigate slides</span>
  </footer>

  <script>
    const slidesData = [
      {
        id: 1,
        title: "CYBERGUARD XAI",
        category: "BPUT HACKATHON 2026 PRESENTATION",
        notes: "Welcome judges and team members to our presentation on CYBERGUARD XAI. Today we present our multi-modal AI threat intelligence system built for BPUT Hackathon 2026, designed to tackle modern cyber threats with explainable AI precision.",
        html: `
          <div class="h-full flex flex-col justify-between">
            <div class="flex-1 flex flex-col justify-center">
              <span class="text-[#00C2FF] font-orbitron text-xs md:text-sm tracking-widest font-semibold uppercase mb-2">BPUT HACKATHON 2026 PRESENTATION</span>
              <h1 class="font-orbitron font-extrabold text-4xl md:text-6xl text-white tracking-tight leading-tight mb-4">
                CYBERGUARD <span class="text-[#00C2FF]">XAI</span>
              </h1>
              <p class="text-base md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed mb-6">
                AI Powered Cyber Threat, Phishing & Digital Impersonation Detection & Response System
              </p>
            </div>
            
            <div class="cyber-card p-4 rounded-xl border border-[#7B61FF]/60 max-w-xl">
              <div class="text-[#00C2FF] font-orbitron font-bold text-xs uppercase mb-1">TEAM: CYBERSHIELD INNOVATORS</div>
              <div class="text-white text-sm">Members: Lead Developer | AI Specialist | Backend Engineer</div>
              <div class="text-gray-400 text-xs">Institution: Biju Patnaik University of Technology (BPUT)</div>
            </div>
          </div>
        `
      },
      {
        id: 2,
        title: "Problem Statement: The Evolving Cyber Threat Landscape",
        category: "02. THREAT MATRIX",
        notes: "Organizations face 5 critical threat vectors: phishing, spoofed domains, impersonation, synthetic media deepfakes, and ATO attacks. Legacy perimeter security fails against AI-driven cyber attacks.",
        html: `
          <div class="h-full flex flex-col justify-between">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3 h-full">
              <div class="cyber-card p-4 rounded-xl flex flex-col justify-between border-t-4 border-t-[#00C2FF]">
                <div class="font-orbitron text-2xl font-bold text-[#00C2FF]">01</div>
                <div>
                  <h3 class="font-semibold text-white text-sm mb-2">Phishing Attacks</h3>
                  <p class="text-xs text-gray-400 leading-snug">Social engineering emails luring users to disclose credentials.</p>
                </div>
              </div>
              <div class="cyber-card p-4 rounded-xl flex flex-col justify-between border-t-4 border-t-[#7B61FF]">
                <div class="font-orbitron text-2xl font-bold text-[#7B61FF]">02</div>
                <div>
                  <h3 class="font-semibold text-white text-sm mb-2">Fake Websites</h3>
                  <p class="text-xs text-gray-400 leading-snug">Spoofed domains cloning bank & portal login pages.</p>
                </div>
              </div>
              <div class="cyber-card p-4 rounded-xl flex flex-col justify-between border-t-4 border-t-[#00C2FF]">
                <div class="font-orbitron text-2xl font-bold text-[#00C2FF]">03</div>
                <div>
                  <h3 class="font-semibold text-white text-sm mb-2">Digital Impersonation</h3>
                  <p class="text-xs text-gray-400 leading-snug">Fraudsters posing as executives or trusted institutions.</p>
                </div>
              </div>
              <div class="cyber-card p-4 rounded-xl flex flex-col justify-between border-t-4 border-t-[#7B61FF]">
                <div class="font-orbitron text-2xl font-bold text-[#7B61FF]">04</div>
                <div>
                  <h3 class="font-semibold text-white text-sm mb-2">Deepfake Media</h3>
                  <p class="text-xs text-gray-400 leading-snug">AI-generated synthetic voice & video bypassing checks.</p>
                </div>
              </div>
              <div class="cyber-card p-4 rounded-xl flex flex-col justify-between border-t-4 border-t-[#FF4D4D]">
                <div class="font-orbitron text-2xl font-bold text-[#FF4D4D]">05</div>
                <div>
                  <h3 class="font-semibold text-white text-sm mb-2">Account Takeover</h3>
                  <p class="text-xs text-gray-400 leading-snug">Automated credential stuffing targeting user databases.</p>
                </div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 3,
        title: "Why This Project? Urgent Need for AI-Powered Cyber Defense",
        category: "03. THREAT METRICS",
        notes: "The scale of cybercrime is staggering: 3.4 billion phishing emails daily and $10.5T in projected damages by 2025 underline why real-time AI security is an imperative requirement.",
        html: `
          <div class="grid grid-cols-2 gap-4 h-full">
            <div class="cyber-card p-5 rounded-xl border-l-4 border-l-[#00C2FF] flex flex-col justify-center">
              <div class="font-orbitron text-4xl font-extrabold text-[#00C2FF] mb-1">3.4 Billion</div>
              <div class="text-white text-base font-semibold">Daily Phishing Emails Sent Worldwide</div>
              <div class="text-xs text-gray-400 mt-1">Mass social engineering attacks target organizations every second.</div>
            </div>
            <div class="cyber-card p-5 rounded-xl border-l-4 border-l-[#7B61FF] flex flex-col justify-center">
              <div class="font-orbitron text-4xl font-extrabold text-[#7B61FF] mb-1">90%</div>
              <div class="text-white text-base font-semibold">Breaches Initiated via Phishing</div>
              <div class="text-xs text-gray-400 mt-1">Credential disclosure forms the initial attack vector in 9/10 incidents.</div>
            </div>
            <div class="cyber-card p-5 rounded-xl border-l-4 border-l-[#FFB800] flex flex-col justify-center">
              <div class="font-orbitron text-4xl font-extrabold text-[#FFB800] mb-1">+43% YoY</div>
              <div class="text-white text-base font-semibold">Increase in Identity Fraud</div>
              <div class="text-xs text-gray-400 mt-1">Exponential surge in AI-generated voice & face spoofing attacks.</div>
            </div>
            <div class="cyber-card p-5 rounded-xl border-l-4 border-l-[#FF4D4D] flex flex-col justify-center">
              <div class="font-orbitron text-4xl font-extrabold text-[#FF4D4D] mb-1">$10.5 Trillion</div>
              <div class="text-white text-base font-semibold">Global Cybercrime Cost by 2025</div>
              <div class="text-xs text-gray-400 mt-1">Catastrophic economic impact demanding proactive AI defense.</div>
            </div>
          </div>
        `
      },
      {
        id: 4,
        title: "System Comparison: Legacy Security vs CyberGuard XAI",
        category: "04. PARADIGM SHIFT",
        notes: "Comparing legacy reactive security with CyberGuard XAI highlights our advantage: automated multi-modal detection, explainable risk scoring, sub-second mitigation, and cloud integration.",
        html: `
          <div class="grid grid-cols-2 gap-6 h-full">
            <div class="cyber-card p-5 rounded-2xl border border-[#FF4D4D]/50 flex flex-col justify-between">
              <div>
                <h3 class="font-orbitron font-bold text-lg text-[#FF4D4D] mb-4">EXISTING SYSTEM (LEGACY)</h3>
                <ul class="space-y-3 text-xs md:text-sm text-gray-300">
                  <li class="flex items-center gap-2"><span class="text-[#FF4D4D]">❌</span> Manual Detection & Static Rule Filters</li>
                  <li class="flex items-center gap-2"><span class="text-[#FF4D4D]">❌</span> Slow Response Times (Hours / Days)</li>
                  <li class="flex items-center gap-2"><span class="text-[#FF4D4D]">❌</span> Black-Box Alerts with Zero Explanation</li>
                  <li class="flex items-center gap-2"><span class="text-[#FF4D4D]">❌</span> Fragmented Tools for Email, Web & Media</li>
                  <li class="flex items-center gap-2"><span class="text-[#FF4D4D]">❌</span> Vulnerable to AI Deepfakes & Zero-Days</li>
                </ul>
              </div>
            </div>
            <div class="cyber-card p-5 rounded-2xl border border-[#00E676]/50 flex flex-col justify-between">
              <div>
                <h3 class="font-orbitron font-bold text-lg text-[#00E676] mb-4">PROPOSED SYSTEM (CYBERGUARD XAI)</h3>
                <ul class="space-y-3 text-xs md:text-sm text-gray-200">
                  <li class="flex items-center gap-2"><span class="text-[#00E676]">✅</span> Multi-Modal AI Detection (NLP + Computer Vision)</li>
                  <li class="flex items-center gap-2"><span class="text-[#00E676]">✅</span> Real-Time Automated Response (< 1 Second)</li>
                  <li class="flex items-center gap-2"><span class="text-[#00E676]">✅</span> Explainable Risk Engine (0-100 Gauge)</li>
                  <li class="flex items-center gap-2"><span class="text-[#00E676]">✅</span> Unified Operations & Supabase Cloud Sync</li>
                  <li class="flex items-center gap-2"><span class="text-[#00E676]">✅</span> Self-Learning Engine Adapting to New Threats</li>
                </ul>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 5,
        title: "Core Objectives: Five Pillars of Defense",
        category: "05. CORE PILLARS",
        notes: "Our system is anchored on five strategic pillars: phishing detection, URL inspection, deepfake computer vision, behavioral analytics, and automated identity protection.",
        html: `
          <div class="space-y-2.5 h-full flex flex-col justify-center">
            <div class="cyber-card p-3 rounded-xl flex items-center gap-4 border-l-4 border-l-[#00C2FF]">
              <div class="w-9 h-9 rounded-full bg-[#00C2FF] text-black font-orbitron font-bold text-base flex items-center justify-center shrink-0">1</div>
              <div>
                <h4 class="font-bold text-white text-sm">DETECT PHISHING CONTENT</h4>
                <p class="text-xs text-gray-300">Identify malicious email text, intent anomalies, and header spoofing using NLP Transformers.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl flex items-center gap-4 border-l-4 border-l-[#7B61FF]">
              <div class="w-9 h-9 rounded-full bg-[#7B61FF] text-white font-orbitron font-bold text-base flex items-center justify-center shrink-0">2</div>
              <div>
                <h4 class="font-bold text-white text-sm">AUDIT MALICIOUS URLS</h4>
                <p class="text-xs text-gray-300">Scan web domains for SSL integrity, WHOIS age, character entropy, and phishing keywords.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl flex items-center gap-4 border-l-4 border-l-[#00C2FF]">
              <div class="w-9 h-9 rounded-full bg-[#00C2FF] text-black font-orbitron font-bold text-base flex items-center justify-center shrink-0">3</div>
              <div>
                <h4 class="font-bold text-white text-sm">IDENTIFY DEEPFAKE MEDIA</h4>
                <p class="text-xs text-gray-300">Analyze images & video frames for facial landmark distortions, spatial artifacts, and generative noise.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl flex items-center gap-4 border-l-4 border-l-[#7B61FF]">
              <div class="w-9 h-9 rounded-full bg-[#7B61FF] text-white font-orbitron font-bold text-base flex items-center justify-center shrink-0">4</div>
              <div>
                <h4 class="font-bold text-white text-sm">BEHAVIORAL ANOMALY TRACKING</h4>
                <p class="text-xs text-gray-300">Detect abnormal logins, impossible travel velocity, unregistered device agents, and proxy shifts.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl flex items-center gap-4 border-l-4 border-l-[#00E676]">
              <div class="w-9 h-9 rounded-full bg-[#00E676] text-black font-orbitron font-bold text-base flex items-center justify-center shrink-0">5</div>
              <div>
                <h4 class="font-bold text-white text-sm">PROTECT DIGITAL IDENTITY</h4>
                <p class="text-xs text-gray-300">Trigger automated mitigations, session revocations, IP blacklisting, and real-time alert dispatch.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 6,
        title: "End-to-End System Architecture Pipeline",
        category: "06. PIPELINE ARCHITECTURE",
        notes: "Data flows from input telemetry through our multi-modal AI engine, into the weighted XAI Risk Score Engine, triggering sub-second response automation and real-time dashboard updates.",
        html: `
          <div class="grid grid-cols-5 gap-2.5 h-full items-center">
            <div class="cyber-card p-3 rounded-xl text-center border-t-4 border-t-[#00C2FF] flex flex-col justify-between h-[85%]">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">1. INPUT</div>
              <ul class="text-[11px] text-gray-300 space-y-2 text-left">
                <li>• Emails & Headers</li>
                <li>• URLs & Domains</li>
                <li>• Face / Video Media</li>
                <li>• Login Logs</li>
              </ul>
              <div class="text-[10px] text-gray-400 bg-black/40 py-1 rounded">Telemetry Ingestion</div>
            </div>
            <div class="cyber-card p-3 rounded-xl text-center border-t-4 border-t-[#7B61FF] flex flex-col justify-between h-[85%]">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">2. AI ENGINE</div>
              <ul class="text-[11px] text-gray-300 space-y-2 text-left">
                <li>• NLP Transformer</li>
                <li>• URL Heuristics</li>
                <li>• Deepfake CV</li>
                <li>• Anomaly Isolation</li>
              </ul>
              <div class="text-[10px] text-gray-400 bg-black/40 py-1 rounded">Multi-Modal AI</div>
            </div>
            <div class="cyber-card p-3 rounded-xl text-center border-t-4 border-t-[#00C2FF] flex flex-col justify-between h-[85%]">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">3. RISK SCORE</div>
              <ul class="text-[11px] text-gray-300 space-y-2 text-left">
                <li>• Weighted Engine</li>
                <li>• XAI Explainer</li>
                <li>• 0-100 Gauge</li>
                <li>• Tier Matrix</li>
              </ul>
              <div class="text-[10px] text-gray-400 bg-black/40 py-1 rounded">Explainable XAI</div>
            </div>
            <div class="cyber-card p-3 rounded-xl text-center border-t-4 border-t-[#7B61FF] flex flex-col justify-between h-[85%]">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">4. AUTOMATION</div>
              <ul class="text-[11px] text-gray-300 space-y-2 text-left">
                <li>• IP Blacklist</li>
                <li>• Revoke Session</li>
                <li>• Alert Dispatch</li>
                <li>• Quarantine Link</li>
              </ul>
              <div class="text-[10px] text-gray-400 bg-black/40 py-1 rounded">Sub-Sec Defense</div>
            </div>
            <div class="cyber-card p-3 rounded-xl text-center border-t-4 border-t-[#00E676] flex flex-col justify-between h-[85%]">
              <div class="font-orbitron font-bold text-xs text-[#00E676]">5. DASHBOARD</div>
              <ul class="text-[11px] text-gray-300 space-y-2 text-left">
                <li>• Live SOC Map</li>
                <li>• Incident Log</li>
                <li>• CSV Export</li>
                <li>• Supabase Sync</li>
              </ul>
              <div class="text-[10px] text-gray-400 bg-black/40 py-1 rounded">Unified Ops</div>
            </div>
          </div>
        `
      },
      {
        id: 7,
        title: "Technology Stack & Engineering Ecosystem",
        category: "07. TECH STACK",
        notes: "Our stack leverages cutting-edge tools: React and Tailwind for UI, FastAPI for sub-millisecond asynchronous backend APIs, Supabase PostgreSQL, and TensorFlow/OpenCV for multi-modal AI.",
        html: `
          <div class="space-y-3 h-full flex flex-col justify-center">
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF] flex justify-between items-center">
              <div>
                <span class="font-orbitron font-bold text-xs text-[#00C2FF]">FRONTEND: </span>
                <span class="font-bold text-white text-sm">React.js + Tailwind CSS</span>
                <p class="text-xs text-gray-300">Responsive SPA dashboard with Recharts visualization & real-time WebSocket subscriptions.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF] flex justify-between items-center">
              <div>
                <span class="font-orbitron font-bold text-xs text-[#7B61FF]">BACKEND API: </span>
                <span class="font-bold text-white text-sm">FastAPI (Python 3.11)</span>
                <p class="text-xs text-gray-300">Asynchronous RESTful microservice API with Pydantic data validation & sub-millisecond routing.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF] flex justify-between items-center">
              <div>
                <span class="font-orbitron font-bold text-xs text-[#00C2FF]">CLOUD DATABASE: </span>
                <span class="font-bold text-white text-sm">Supabase (PostgreSQL)</span>
                <p class="text-xs text-gray-300">Managed relational cloud database featuring Row Level Security (RLS) & built-in Auth engine.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF] flex justify-between items-center">
              <div>
                <span class="font-orbitron font-bold text-xs text-[#7B61FF]">AI / ML STACK: </span>
                <span class="font-bold text-white text-sm">TensorFlow + OpenCV + Scikit-learn</span>
                <p class="text-xs text-gray-300">Multi-modal framework powering NLP transformers, facial computer vision, and anomaly isolation.</p>
              </div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00E676] flex justify-between items-center">
              <div>
                <span class="font-orbitron font-bold text-xs text-[#00E676]">CLOUD HOSTING: </span>
                <span class="font-bold text-white text-sm">Vercel (Frontend) + Render Cloud (Backend)</span>
                <p class="text-xs text-gray-300">Continuous deployment serverless SPA hosting paired with scalable GPU backend worker nodes.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 8,
        title: "Database Architecture: Supabase Cloud Integration",
        category: "08. DATABASE ENGINE",
        notes: "Supabase provides our production-ready cloud backend. We utilize PostgreSQL with Row Level Security, Realtime subscriptions for security alerts, and secure S3-compatible storage for incident evidence.",
        html: `
          <div class="grid grid-cols-2 gap-6 h-full items-center">
            <div class="cyber-card p-5 rounded-2xl border border-[#00C2FF]/50 h-full flex flex-col justify-between">
              <div>
                <h3 class="font-orbitron font-bold text-base text-[#00C2FF] mb-3">SUPABASE ENGINE & SECURITY</h3>
                <ul class="space-y-3 text-xs text-gray-200">
                  <li class="flex items-center gap-2">🔐 <span>Built-in JWT Authentication & OAuth 2.0</span></li>
                  <li class="flex items-center gap-2">🛡️ <span>Row Level Security (RLS) policies enforcing tenant data isolation</span></li>
                  <li class="flex items-center gap-2">⚡ <span>Realtime PostgreSQL changes syncing for live security alerts</span></li>
                  <li class="flex items-center gap-2">📦 <span>Encrypted S3 Storage Buckets for deepfake media evidence</span></li>
                </ul>
              </div>
            </div>
            <div class="space-y-2">
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">TABLE: public.users</div>
                <div class="text-xs text-gray-300">User credentials, MFA state, role-based access permissions</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">TABLE: public.incidents</div>
                <div class="text-xs text-gray-300">Captured threat events, calculated risk scores, XAI explanations</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">TABLE: public.evidence</div>
                <div class="text-xs text-gray-300">Phishing raw email headers & media evidence storage links</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">TABLE: public.alerts</div>
                <div class="text-xs text-gray-300">Real-time security notifications & automated dispatch statuses</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">TABLE: public.login_logs</div>
                <div class="text-xs text-gray-300">IP addresses, geo-location, device agents, travel velocity tracking</div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 9,
        title: "AI Module 1: Phishing Email NLP Inspection",
        category: "09. AI MODULE 1",
        notes: "AI Module 1 uses NLP Transformers to dissect incoming emails. It isolates urgent call-to-action language, mismatched sender headers, and suspicious URLs, yielding a 98.4% phishing confidence score.",
        html: `
          <div class="grid grid-cols-2 gap-6 h-full items-center">
            <div class="cyber-card p-4 rounded-xl border border-[#FF4D4D]/60 bg-[#071A2F]">
              <div class="font-orbitron font-bold text-xs text-[#FF4D4D] mb-2">INSPECTED EMAIL HEADER & BODY</div>
              <div class="text-[11px] font-mono space-y-1 text-gray-300">
                <div class="text-[#FF4D4D]">From: security-alert@bput-update-portal.net</div>
                <div class="text-[#FF4D4D]">Subject: URGENT: Account Suspension Notice</div>
                <br/>
                <div>Dear User,</div>
                <div>Your portal access will be <span class="text-[#FF4D4D] font-bold">TERMINATED</span> in 2 hours.</div>
                <br/>
                <div>Click below immediately to verify:</div>
                <div class="text-[#00C2FF] underline">http://bit.ly/bput-auth-login-verify</div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF]">
                <div class="font-orbitron font-bold text-xs text-[#00C2FF]">NLP Transformer Pipeline</div>
                <p class="text-xs text-gray-300">Fine-tuned BERT classifier analyzing semantic intent & urgency flags.</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">Threat Triggers Isolated</div>
                <p class="text-xs text-gray-300">Extracted high-risk terms: 'URGENT', 'TERMINATED', shortened URL link.</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#FF4D4D]">
                <div class="font-orbitron font-bold text-xs text-[#FF4D4D]">Confidence Score: 98.4%</div>
                <p class="text-xs text-white font-semibold">VERDICT: HIGH PROBABILITY PHISHING -> QUARANTINED</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 10,
        title: "AI Module 2: Malicious URL Heuristics & Audit",
        category: "10. AI MODULE 2",
        notes: "Module 2 evaluates domain age, SSL status, character entropy, and trademark spoofing patterns to categorize URLs into Safe, Medium, or Critical threat tiers.",
        html: `
          <div class="flex flex-col justify-between h-full space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="cyber-card p-4 rounded-xl border-l-4 border-l-[#FF4D4D]">
                <h4 class="font-orbitron font-bold text-xs text-[#FF4D4D] mb-1">HTTPS & SSL Audit</h4>
                <p class="text-xs text-gray-300">Missing valid SSL certificate; domain uses self-signed untrusted CA authority.</p>
              </div>
              <div class="cyber-card p-4 rounded-xl border-l-4 border-l-[#FFB800]">
                <h4 class="font-orbitron font-bold text-xs text-[#FFB800] mb-1">Domain Age & WHOIS</h4>
                <p class="text-xs text-gray-300">Domain registered 2 days ago via high-risk anonymous privacy registrar.</p>
              </div>
              <div class="cyber-card p-4 rounded-xl border-l-4 border-l-[#00C2FF]">
                <h4 class="font-orbitron font-bold text-xs text-[#00C2FF] mb-1">URL Structural Entropy</h4>
                <p class="text-xs text-gray-300">Excessive subdomain depth & high character randomness entropy score.</p>
              </div>
              <div class="cyber-card p-4 rounded-xl border-l-4 border-l-[#7B61FF]">
                <h4 class="font-orbitron font-bold text-xs text-[#7B61FF] mb-1">Keyword Spoofing Match</h4>
                <p class="text-xs text-gray-300">Contains target brand keywords ('bput', 'login', 'verify') in fake subdomains.</p>
              </div>
            </div>
            <div class="cyber-card p-4 rounded-xl border-2 border-[#FF4D4D] text-center bg-[#FF4D4D]/10">
              <div class="font-mono text-xs text-gray-300">TARGET: http://secure-bput-login-update.xyz</div>
              <div class="font-orbitron font-bold text-sm text-[#FF4D4D] mt-1">VERDICT: CRITICAL RISK PHISHING DOMAIN -> AUTOMATICALLY BLOCKED</div>
            </div>
          </div>
        `
      },
      {
        id: 11,
        title: "AI Module 3: Deepfake Media & Computer Vision Pipeline",
        category: "11. AI MODULE 3",
        notes: "Module 3 targets synthetic media. Using OpenCV and CNN facial mesh models, it detects spatial blending artifacts, unnatural eye blinking, and generative frequency noise.",
        html: `
          <div class="grid grid-cols-2 gap-6 h-full items-center">
            <div class="cyber-card p-4 rounded-xl border border-[#00C2FF]/40 flex flex-col items-center justify-center h-full">
              <div class="w-full flex justify-between text-xs font-orbitron font-bold mb-3">
                <span class="text-[#00E676]">REAL FACE (LEGIT)</span>
                <span class="text-[#FF4D4D]">SYNTHETIC (DEEPFAKE)</span>
              </div>
              <div class="w-full h-40 rounded-lg bg-black/60 border border-gray-700 flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-y-0 left-0 w-1/2 border-r border-[#00C2FF] flex items-center justify-center text-xs text-gray-400">Natural Geometry</div>
                <div class="absolute inset-y-0 right-0 w-1/2 bg-[#FF4D4D]/20 flex items-center justify-center text-xs text-[#FF4D4D] font-bold">Artifact Heatmap</div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF]">
                <div class="font-orbitron font-bold text-xs text-[#00C2FF]">Facial Mesh & Landmark Align</div>
                <p class="text-xs text-gray-300">Isolates 68 facial keypoints to analyze gaze geometry and micro-expressions.</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">Spatial Artifact Heatmap</div>
                <p class="text-xs text-gray-300">Identifies boundary blending anomalies and color mismatches around lips.</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#FF4D4D]">
                <div class="font-orbitron font-bold text-xs text-[#FF4D4D]">Frequency Domain Fourier Analysis</div>
                <p class="text-xs text-gray-300">Fourier transform reveals GAN/Diffusion generator noise invisible to human eye.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 12,
        title: "AI Module 4: Behavioral Anomaly & Location Tracking",
        category: "12. AI MODULE 4",
        notes: "Module 4 monitors behavioral telemetry. Impossible travel calculations, unknown device fingerprints, and off-hours logins trigger instant isolation of compromised sessions.",
        html: `
          <div class="grid grid-cols-2 gap-6 h-full items-center">
            <div class="cyber-card p-4 rounded-xl border border-[#00C2FF]/40 h-full flex flex-col justify-center text-center">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF] mb-2">GEOGRAPHIC LOGIN ANOMALY MAP</div>
              <div class="w-full h-36 rounded-lg bg-black/50 border border-gray-800 flex items-center justify-between px-6 text-xs relative">
                <div class="text-[#00E676]">📍 New York (10:00 AM)</div>
                <div class="text-[#FF4D4D] font-bold">📍 Tokyo (10:10 AM)</div>
                <div class="absolute inset-x-12 top-1/2 border-t border-dashed border-[#FF4D4D]"></div>
              </div>
              <div class="text-[11px] text-[#FF4D4D] mt-2 font-bold">IMPOSSIBLE TRAVEL VELOCITY DETECTED (>6,000 MPH)</div>
            </div>
            <div class="space-y-2.5">
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#FFB800]">
                <div class="font-orbitron font-bold text-xs text-[#FFB800]">Unknown Device Fingerprint</div>
                <p class="text-xs text-gray-300">First-time access attempt from unregistered Linux OS browser agent.</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#FF4D4D]">
                <div class="font-orbitron font-bold text-xs text-[#FF4D4D]">Impossible Travel Velocity</div>
                <p class="text-xs text-gray-300">Logins from NY then Tokyo in 10 minutes exceeding physical travel limit.</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF]">
                <div class="font-orbitron font-bold text-xs text-[#7B61FF]">Midnight Access Anomaly</div>
                <p class="text-xs text-gray-300">Access initiated outside user's historical operational hours (03:14 AM).</p>
              </div>
              <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF]">
                <div class="font-orbitron font-bold text-xs text-[#00C2FF]">IP Anomaly & Proxy Shift</div>
                <p class="text-xs text-gray-300">IP address traces back to known commercial VPN exit node.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 13,
        title: "Explainable AI (XAI) Risk Engine Architecture",
        category: "13. XAI RISK ENGINE",
        notes: "CyberGuard XAI eliminates black-box mystery. Our XAI engine combines weighted signals across URLs, emails, behavior, and deepfakes into an intuitive 0–100 gauge score with detailed breakdown reports.",
        html: `
          <div class="grid grid-cols-2 gap-6 h-full items-center">
            <div class="cyber-card p-5 rounded-2xl border border-[#00C2FF]/50 text-center flex flex-col justify-between h-full">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">WEIGHTED RISK SCORE FORMULA</div>
              <div class="my-auto">
                <div class="font-orbitron font-extrabold text-5xl text-[#FF4D4D]">78 <span class="text-sm font-normal text-gray-400">/ 100</span></div>
                <div class="text-xs text-[#FF4D4D] font-bold tracking-wider mt-1">HIGH RISK THREAT DETECTED</div>
              </div>
              <div class="text-[11px] text-gray-300 bg-black/40 p-2 rounded-lg border border-[#00C2FF]/30">
                Risk = 30%(URL) + 30%(Email) + 20%(Behaviour) + 20%(Deepfake)
              </div>
            </div>
            <div class="space-y-2">
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#00E676]">
                <div class="font-orbitron font-bold text-xs text-[#00E676]">0 – 20: SAFE</div>
                <div class="text-xs text-gray-300">Low risk baseline; normal user activity.</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#FFB800]">
                <div class="font-orbitron font-bold text-xs text-[#FFB800]">21 – 40: LOW RISK</div>
                <div class="text-xs text-gray-300">Mild anomaly; monitor telemetry.</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[orange]">
                <div class="font-orbitron font-bold text-xs text-[orange]">41 – 60: MEDIUM RISK</div>
                <div class="text-xs text-gray-300">Suspicious indicators; enforce 2FA verification.</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#FF4D4D]">
                <div class="font-orbitron font-bold text-xs text-[#FF4D4D]">61 – 85: HIGH THREAT</div>
                <div class="text-xs text-gray-300">Strong phishing match; quarantine request.</div>
              </div>
              <div class="cyber-card p-2.5 rounded-xl border-l-4 border-l-[#B40000]">
                <div class="font-orbitron font-bold text-xs text-[#B40000]">86 – 100: CRITICAL THREAT</div>
                <div class="text-xs text-gray-300">Multi-vector attack; immediate IP lock.</div>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 14,
        title: "UI Prototype: CyberGuard XAI Dashboard Modules",
        category: "14. UI PROTOTYPE",
        notes: "Our user interface is designed for SOC analysts and administrative security teams. Six core screens provide seamless threat navigation from login to incident response.",
        html: `
          <div class="grid grid-cols-3 gap-4 h-full items-center">
            <div class="cyber-card p-3 rounded-xl border-t-4 border-t-[#00C2FF] flex flex-col justify-between h-36">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">1. AUTH PORTAL</div>
              <div class="text-xs text-gray-300">Supabase MFA login portal with biometric options.</div>
              <div class="text-[10px] text-gray-400 font-mono">[ ACTIVE SCREEN ]</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-t-4 border-t-[#7B61FF] flex flex-col justify-between h-36">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">2. MAIN DASHBOARD</div>
              <div class="text-xs text-gray-300">Global threat map, incident counters & live stream.</div>
              <div class="text-[10px] text-gray-400 font-mono">[ ACTIVE SCREEN ]</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-t-4 border-t-[#00C2FF] flex flex-col justify-between h-36">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">3. EMAIL SCANNER</div>
              <div class="text-xs text-gray-300">Interactive email text analyzer highlighting risks.</div>
              <div class="text-[10px] text-gray-400 font-mono">[ ACTIVE SCREEN ]</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-t-4 border-t-[#7B61FF] flex flex-col justify-between h-36">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">4. URL SCANNER</div>
              <div class="text-xs text-gray-300">URL search bar with domain age & WHOIS score.</div>
              <div class="text-[10px] text-gray-400 font-mono">[ ACTIVE SCREEN ]</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-t-4 border-t-[#FF4D4D] flex flex-col justify-between h-36">
              <div class="font-orbitron font-bold text-xs text-[#FF4D4D]">5. DEEPFAKE DETECTOR</div>
              <div class="text-xs text-gray-300">Video dropzone with facial mesh heatmap.</div>
              <div class="text-[10px] text-gray-400 font-mono">[ ACTIVE SCREEN ]</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-t-4 border-t-[#00E676] flex flex-col justify-between h-36">
              <div class="font-orbitron font-bold text-xs text-[#00E676]">6. INCIDENT CENTER</div>
              <div class="text-xs text-gray-300">Real-time alert dispatch, IP block & CSV export.</div>
              <div class="text-[10px] text-gray-400 font-mono">[ ACTIVE SCREEN ]</div>
            </div>
          </div>
        `
      },
      {
        id: 15,
        title: "Platform Features & Capabilities Overview",
        category: "15. PLATFORM FEATURES",
        notes: "CyberGuard XAI brings 8 powerhouse features into a unified platform: live monitoring, explainable scoring, deepfake analysis, URL intelligence, email filtering, compliance reporting, cloud persistence, and instant alerts.",
        html: `
          <div class="grid grid-cols-4 gap-3 h-full items-center">
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">Live Threat Monitor</div>
              <div class="text-xs text-gray-300">24/7 continuous stream monitoring across channels.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">AI Risk Score (XAI)</div>
              <div class="text-xs text-gray-300">Transparent score breakdown with explicit reasoning.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">Deepfake Scanner</div>
              <div class="text-xs text-gray-300">Computer vision facial mesh & heatmap detection.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">URL Intelligence</div>
              <div class="text-xs text-gray-300">Instant domain age, SSL, and entropy auditing.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#FF4D4D] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#FF4D4D]">Automated Email</div>
              <div class="text-xs text-gray-300">Inbound email header, NLP intent & link parsing.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00E676] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#00E676]">Admin Audit Reports</div>
              <div class="text-xs text-gray-300">Exportable CSV & PDF security logs for compliance.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">Supabase Cloud</div>
              <div class="text-xs text-gray-300">Encrypted evidence vault & RLS row security.</div>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#FFB800] h-32 flex flex-col justify-between">
              <div class="font-orbitron font-bold text-xs text-[#FFB800]">Real-Time Alerts</div>
              <div class="text-xs text-gray-300">Multi-channel notifications via Slack & Webhooks.</div>
            </div>
          </div>
        `
      },
      {
        id: 16,
        title: "Development Roadmap: 4-Week Execution Plan",
        category: "16. ROADMAP",
        notes: "Our 4-week agile roadmap moves systematically from core UI wireframing and database setup, through AI model training, microservice integration, to cloud deployment and security testing.",
        html: `
          <div class="grid grid-cols-4 gap-4 h-full items-center">
            <div class="cyber-card p-4 rounded-xl border-t-4 border-t-[#00C2FF] h-full flex flex-col justify-between">
              <div>
                <div class="font-orbitron font-extrabold text-sm text-[#00C2FF]">WEEK 1</div>
                <div class="font-bold text-white text-xs mb-3">UI & Supabase Core</div>
                <ul class="text-[11px] text-gray-300 space-y-2">
                  <li>✔ React Wireframes</li>
                  <li>✔ Tailwind CSS Layout</li>
                  <li>✔ Supabase Schema</li>
                  <li>✔ Auth & RLS Policies</li>
                </ul>
              </div>
            </div>
            <div class="cyber-card p-4 rounded-xl border-t-4 border-t-[#7B61FF] h-full flex flex-col justify-between">
              <div>
                <div class="font-orbitron font-extrabold text-sm text-[#7B61FF]">WEEK 2</div>
                <div class="font-bold text-white text-xs mb-3">AI Model Training</div>
                <ul class="text-[11px] text-gray-300 space-y-2">
                  <li>✔ BERT NLP Classifier</li>
                  <li>✔ URL Heuristic Engine</li>
                  <li>✔ Deepfake CV Training</li>
                  <li>✔ Anomaly Model Tuning</li>
                </ul>
              </div>
            </div>
            <div class="cyber-card p-4 rounded-xl border-t-4 border-t-[#00C2FF] h-full flex flex-col justify-between">
              <div>
                <div class="font-orbitron font-extrabold text-sm text-[#00C2FF]">WEEK 3</div>
                <div class="font-bold text-white text-xs mb-3">API & XAI Engine</div>
                <ul class="text-[11px] text-gray-300 space-y-2">
                  <li>✔ FastAPI Microservice</li>
                  <li>✔ XAI Scoring Logic</li>
                  <li>✔ Supabase Realtime</li>
                  <li>✔ Webhook Alerts</li>
                </ul>
              </div>
            </div>
            <div class="cyber-card p-4 rounded-xl border-t-4 border-t-[#00E676] h-full flex flex-col justify-between">
              <div>
                <div class="font-orbitron font-extrabold text-sm text-[#00E676]">WEEK 4</div>
                <div class="font-bold text-white text-xs mb-3">Testing & Cloud</div>
                <ul class="text-[11px] text-gray-300 space-y-2">
                  <li>✔ Penetration Audit</li>
                  <li>✔ Stress Testing</li>
                  <li>✔ Vercel & Render</li>
                  <li>✔ Hackathon Demo</li>
                </ul>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 17,
        title: "Future Scope: Expanding Cyber Protection Horizon",
        category: "17. FUTURE HORIZON",
        notes: "Our future horizon includes real-time vishing voice analysis, browser extension modules, native mobile apps, multilingual LLM assistants, and CERT-In national cyber grid sync.",
        html: `
          <div class="space-y-3 h-full flex flex-col justify-center">
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF]">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">🚀 VOICE PHISHING (VISHING) DETECTION</div>
              <p class="text-xs text-gray-300">Real-time AI voice stream analysis detecting audio deepfakes & imposter phone calls.</p>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF]">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">🚀 BROWSER EXTENSION INTEGRATION</div>
              <p class="text-xs text-gray-300">Zero-day browser extension scanning web page DOM elements in real-time.</p>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00C2FF]">
              <div class="font-orbitron font-bold text-xs text-[#00C2FF]">🚀 NATIVE MOBILE COMPANION APP</div>
              <p class="text-xs text-gray-300">iOS & Android app for instant push notifications and remote admin approvals.</p>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#7B61FF]">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF]">🚀 MULTILINGUAL AI ASSISTANT</div>
              <p class="text-xs text-gray-300">LLM-driven security assistant offering multi-language threat remediation steps.</p>
            </div>
            <div class="cyber-card p-3 rounded-xl border-l-4 border-l-[#00E676]">
              <div class="font-orbitron font-bold text-xs text-[#00E676]">🚀 GOVERNMENT & DEFENSE GRID SYNC</div>
              <p class="text-xs text-gray-300">API integration with CERT-In and enterprise SIEM platforms for national cyber defense.</p>
            </div>
          </div>
        `
      },
      {
        id: 18,
        title: "THANK YOU!",
        category: "18. CLOSING",
        notes: "Thank you judges and organizers of BPUT Hackathon 2026. We are ready to answer your questions and demonstrate the live CyberGuard XAI prototype.",
        html: `
          <div class="h-full flex flex-col justify-between items-center text-center py-6">
            <div>
              <h1 class="font-orbitron font-extrabold text-5xl text-[#00C2FF] mb-3">THANK YOU!</h1>
              <p class="text-xl text-white font-medium italic max-w-xl">
                “Protecting Digital India with Explainable AI Precision.”
              </p>
            </div>
            
            <div class="cyber-card p-5 rounded-2xl border border-[#7B61FF] max-w-lg w-full">
              <div class="font-orbitron font-bold text-xs text-[#7B61FF] mb-2">CONTACT & REPOSITORY</div>
              <div class="text-xs space-y-1.5 text-gray-200">
                <div>📧 Email: team@cyberguard-xai.io</div>
                <div>💻 GitHub: github.com/bput-hackathon/cyberguard-xai</div>
                <div>🌐 Web Portal: cyberguard-xai.vercel.app</div>
              </div>
            </div>
          </div>
        `
      }
    ];

    let currentSlide = 0;

    function renderSlide(index) {
      currentSlide = index;
      const slide = slidesData[currentSlide];
      const viewport = document.getElementById("slide-viewport");
      
      viewport.innerHTML = `
        <div class="flex justify-between items-center border-b border-[#00C2FF]/20 pb-2 mb-4">
          <span class="font-orbitron font-bold text-xs text-[#00C2FF] tracking-wider">${slide.category}</span>
          <span class="font-orbitron font-bold text-xs text-gray-400">${String(slide.id).padStart(2, '0')} / 18</span>
        </div>
        <h2 class="font-orbitron font-bold text-lg md:text-xl text-white mb-4">${slide.title}</h2>
        <div class="flex-1 overflow-hidden">
          ${slide.html}
        </div>
      `;

      document.getElementById("slide-indicator").innerText = `Slide ${String(slide.id).padStart(2, '0')} / 18`;
      document.getElementById("speaker-notes-text").innerText = slide.notes;
      document.getElementById("slide-jump").value = currentSlide;
    }

    function prevSlide() {
      if (currentSlide > 0) renderSlide(currentSlide - 1);
    }

    function nextSlide() {
      if (currentSlide < slidesData.length - 1) renderSlide(currentSlide + 1);
    }

    function goToSlide(index) {
      renderSlide(index);
    }

    function toggleNotes() {
      const container = document.getElementById("notes-container");
      container.classList.toggle("hidden");
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });

    // Populate dropdown
    const select = document.getElementById("slide-jump");
    slidesData.forEach((s, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.innerText = `Slide ${s.id}: ${s.title.substring(0, 25)}...`;
      select.appendChild(opt);
    });

    // Initial render
    renderSlide(0);
  </script>
</body>
</html>
"""

target_file = r"C:\Users\sabya\.gemini\antigravity\brain\e24bb0b2-7214-46b1-b2df-48ae64a71dcd\preview.html"
with open(target_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Web preview artifact created successfully.")
