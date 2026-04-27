-- PROP MASTER: DATABASE SCHEMA --
-- Secure unit-level management for landlords.

-- 1. Property / Building Entity
CREATE TABLE IF NOT EXISTS public.properties (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Units (Apartments)
CREATE TABLE IF NOT EXISTS public.units (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT REFERENCES public.properties(id),
  unit_number TEXT NOT NULL,
  sq_ft INT,
  rent_amount NUMERIC(10,2),
  status TEXT DEFAULT 'available', -- available, occupied, maintenance
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(property_id, unit_number)
);

-- 3. Profiles (Tenants, Manager, Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'tenant' CHECK (role IN ('tenant', 'manager', 'admin')),
  unit_id BIGINT REFERENCES public.units(id), -- Null if Manager
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Maintenance Requests (Ticketing)
CREATE TABLE IF NOT EXISTS public.maintenance_requests (
  id BIGSERIAL PRIMARY KEY,
  unit_id BIGINT REFERENCES public.units(id),
  tenant_id UUID REFERENCES public.profiles(id),
  issue_category TEXT, -- plumbing, electrical, etc.
  description TEXT NOT NULL,
  urgency TEXT DEFAULT 'normal', -- low, normal, emergency
  status TEXT DEFAULT 'pending', -- pending, scheduled, in-progress, resolved
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Rent Payments (Tracking)
CREATE TABLE IF NOT EXISTS public.rent_payments (
  id BIGSERIAL PRIMARY KEY,
  unit_id BIGINT REFERENCES public.units(id),
  tenant_id UUID REFERENCES public.profiles(id),
  amount_paid NUMERIC(10,2),
  payment_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'processed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rent_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants see their profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Tenants see their own issues" ON public.maintenance_requests FOR SELECT USING (auth.uid() = tenant_id);
CREATE POLICY "Tenants can report issues" ON public.maintenance_requests FOR INSERT WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Managers see all building data" ON public.maintenance_requests FOR ALL USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('manager', 'admin')
);

CREATE POLICY "Tenants see their payments" ON public.rent_payments FOR SELECT USING (auth.uid() = tenant_id);

