-- CONSULT FLOW: DATABASE SCHEMA --
-- High-end project delivery and document vault.

-- 1. Consulting Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES auth.users(id),
  consultant_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  total_value NUMERIC(12,2),
  status TEXT DEFAULT 'active', -- active, on-hold, completed
  current_phase TEXT DEFAULT 'discovery',
  start_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Project Milestones (The "Journey")
CREATE TABLE IF NOT EXISTS public.milestones (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  status TEXT DEFAULT 'locked', -- locked, active, completed
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Secure Document Vault
CREATE TABLE IF NOT EXISTS public.documents (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT REFERENCES public.projects(id),
  title TEXT NOT NULL,
  file_url TEXT NOT NULL, -- Supabase Storage URL
  category TEXT DEFAULT 'report', -- report, agreement, invoice, research
  access_level TEXT DEFAULT 'client', -- consultant_only, client_shared
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Profiles (Client, Consultant, Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'consultant', 'admin')),
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Consultants see everything they are assigned to
CREATE POLICY "Consultants manage assigned projects" ON public.projects FOR ALL USING (auth.uid() = consultant_id);
CREATE POLICY "Consultants see milestones" ON public.milestones FOR ALL USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = public.milestones.project_id AND consultant_id = auth.uid())
);

-- Clients see only their project and shared docs
CREATE POLICY "Clients see their project" ON public.projects FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Clients see shared milestones" ON public.milestones FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = public.milestones.project_id AND client_id = auth.uid())
);
CREATE POLICY "Clients see shared docs" ON public.documents FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.projects WHERE id = public.documents.project_id AND client_id = auth.uid())
  AND access_level = 'client_shared'
);

