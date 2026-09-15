# CYBERGUARD XAI — Premium Cybersecurity SaaS Platform

CYBERGUARD XAI is a production-ready, full-stack cybersecurity SaaS web application featuring multi-vector autonomous threat detection, Explainable AI (XAI) transparent risk scoring, 3D interactive Cyber Globe visualizations, and complete business subscription management.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling & UI**: Tailwind CSS + Glassmorphism + Lucide React Icons
- **3D Graphics & Animations**: Three.js (`three`) 3D Cyber Globe + Framer Motion
- **Backend & Database**: Supabase PostgreSQL + Auth + Storage + Row Level Security (RLS)
- **Charts & Reporting**: Chart.js / Recharts + jsPDF Client PDF Executive Report Exporter
- **Monetization**: Stripe-ready SaaS Subscription Tiers (Starter ₹999, Business ₹4,999, Enterprise Custom)

---

## 📁 Key Pages (12 Total)

1. **Home (`/`)**: Hero Section with Three.js 3D Cyber Globe, Stat Counters, Feature Cards, Live Threat Ticker, CTA
2. **About (`/about`)**: XAI Architecture Breakdown, Research Paper References, Security Compliance Badges
3. **Pricing (`/pricing`)**: 3 Tier Plans with Monthly/Annual Billing Toggle and Stripe Checkout Modal
4. **Auth Portal (`/auth`)**: Login & Registration forms with OAuth (GitHub, Google) & MFA
5. **SOC Dashboard (`/dashboard`)**: Executive Security Dashboard, Live Threat Map, XAI Risk Gauge
6. **Email Phishing Scanner (`/dashboard/phishing`)**: Live NLP Transformer Text Classifier & Keyword Highlight
7. **Malicious URL Scanner (`/dashboard/url-scanner`)**: Domain Registration Age, SSL Validation, Entropy Audit
8. **Deepfake Detector (`/dashboard/deepfake`)**: Media Upload Dropzone, Facial Landmark Mesh & Spatial Heatmap
9. **Behaviour Analytics (`/dashboard/behaviour`)**: Impossible Travel Velocity Tracking & Geo Anomaly Map
10. **Incident Center (`/dashboard/incidents`)**: Filterable Threat Incident Log, XAI Reasoning Modal & Resolution Actions
11. **Executive Reports (`/dashboard/reports`)**: Weekly Telemetry Visualizer & PDF Executive Report Generator
12. **Admin Business Suite (`/dashboard/admin`)**: MRR Revenue Analytics, Customer Subscriptions & API Quota Meter

---

## 🗄️ Database Setup (Supabase)

Execute `supabase/schema.sql` in your Supabase SQL Editor to create all 8 tables and Row Level Security policies:

```bash
# 8 Tables Created:
- users
- subscriptions
- incidents
- evidence
- alerts
- login_logs
- api_usage
- payments
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local` and add your keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📦 Installation & Local Development

```bash
# 1. Install Dependencies
npm install

# 2. Run Development Server
npm run dev

# 3. Open in Browser
http://localhost:3000
```

---

## 🌐 Production Deployment Guide

1. Push code repository to GitHub.
2. Import project into **Vercel**.
3. Set environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Click **Deploy**!
