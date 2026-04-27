-- FITNESS PRO: DATABASE SCHEMA --
-- This script sets up a multi-tenant Personal Training system.

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  membership_number TEXT UNIQUE,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'trainer', 'admin')),
  trainer_id UUID REFERENCES public.profiles(id), -- Assigned PT
  goal_weight NUMERIC,
  starting_weight NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Training Programs
CREATE TABLE IF NOT EXISTS public.programs (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL, -- e.g. "12-Week Lean Build"
  current_week INT DEFAULT 1,
  total_weeks INT DEFAULT 12,
  status TEXT DEFAULT 'active', -- active, completed, paused
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Daily Workout Logs
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  program_id BIGINT REFERENCES public.programs(id),
  workout_date DATE DEFAULT CURRENT_DATE,
  exercises JSONB, -- List of exercises, sets, reps
  notes TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PT Sessions (Appointments)
CREATE TABLE IF NOT EXISTS public.pt_sessions (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  trainer_id UUID REFERENCES public.profiles(id),
  session_date DATE NOT NULL,
  session_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled', -- scheduled, completed, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trainer_id, session_date, session_time) -- Anti-Double-Booking
);

-- 5. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pt_sessions ENABLE ROW LEVEL SECURITY;

-- POLICIES: PROFILES
CREATE POLICY "Clients see their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Trainers see their assigned clients" ON public.profiles FOR SELECT USING (
  auth.uid() = trainer_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- POLICIES: LOGS & PROGRAMS
CREATE POLICY "Clients manage their own logs" ON public.workout_logs FOR ALL USING (auth.uid() = client_id);
CREATE POLICY "Trainers manage client logs" ON public.workout_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = public.workout_logs.client_id AND trainer_id = auth.uid())
);

-- POLICIES: SESSIONS
CREATE POLICY "Clients see their sessions" ON public.pt_sessions FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Trainers see their schedule" ON public.pt_sessions FOR ALL USING (auth.uid() = trainer_id);

-- 6. Indices for Performance
CREATE INDEX idx_logs_client ON public.workout_logs(client_id);
CREATE INDEX idx_sessions_date ON public.pt_sessions(session_date, trainer_id);

