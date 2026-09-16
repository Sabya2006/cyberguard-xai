-- ========================================================
-- CYBERGUARD XAI — IDEMPOTENT DATABASE MIGRATION & RLS POLICIES
-- Safe for repeated execution without 42710 policy errors
-- ========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    organization TEXT,
    role TEXT DEFAULT 'analyst' CHECK (role IN ('analyst', 'ciso', 'admin')),
    plan TEXT DEFAULT 'Business' CHECK (plan IN ('Starter', 'Business', 'Enterprise')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. SCAN TELEMETRIES TABLE
CREATE TABLE IF NOT EXISTS public.scans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    scan_type TEXT NOT NULL CHECK (scan_type IN ('phishing', 'url', 'deepfake', 'behaviour')),
    target TEXT NOT NULL,
    risk_score INT NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    verdict TEXT NOT NULL,
    xai_explanation TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Scans
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own scans" ON public.scans;
CREATE POLICY "Users can view their own scans"
    ON public.scans FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert scans" ON public.scans;
CREATE POLICY "Users can insert scans"
    ON public.scans FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 3. INCIDENTS OPERATIONS TABLE
CREATE TABLE IF NOT EXISTS public.incidents (
    id TEXT PRIMARY KEY DEFAULT ('INC-' || floor(random() * 9000 + 1000)::text),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    module_type TEXT NOT NULL CHECK (module_type IN ('phishing', 'url', 'deepfake', 'behaviour')),
    risk_score INT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'INVESTIGATING', 'CONTAINED', 'RESOLVED')),
    target TEXT NOT NULL,
    assigned_analyst TEXT DEFAULT 'Unassigned',
    xai_reasoning TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Incidents
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view incidents" ON public.incidents;
CREATE POLICY "Authenticated users can view incidents"
    ON public.incidents FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Analysts can update incident status" ON public.incidents;
CREATE POLICY "Analysts can update incident status"
    ON public.incidents FOR UPDATE
    TO authenticated
    USING (true);

-- 4. SAAS LICENSES TABLE (ADMIN ONLY)
CREATE TABLE IF NOT EXISTS public.licenses (
    id TEXT PRIMARY KEY DEFAULT ('CUST-' || floor(random() * 900 + 100)::text),
    organization_name TEXT NOT NULL,
    contact_email TEXT UNIQUE NOT NULL,
    plan_tier TEXT DEFAULT 'Business' CHECK (plan_tier IN ('Starter', 'Business', 'Enterprise')),
    mrr_amount NUMERIC(10, 2) NOT NULL,
    api_quota_limit INT NOT NULL DEFAULT 25000,
    api_quota_used INT NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Licenses
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage all licenses" ON public.licenses;
CREATE POLICY "Admins can manage all licenses"
    ON public.licenses FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- INDEXES FOR HIGH-SPEED QUERYING
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON public.scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_type ON public.scans(scan_type);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON public.incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON public.incidents(severity);
