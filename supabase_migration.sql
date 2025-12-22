-- =============================================
-- MIGRATION SCRIPT FOR EXISTING SCHEMA (V2)
-- Run this if you already ran the original schema
-- =============================================

-- Drop ALL existing policies to start fresh
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
    END LOOP;
END $$;

-- Re-enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ policies (anyone can read)
CREATE POLICY "public_read_profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "public_read_socials" ON public.socials FOR SELECT USING (true);
CREATE POLICY "public_read_projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "public_read_experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "public_read_awards" ON public.awards FOR SELECT USING (true);
CREATE POLICY "public_read_skills" ON public.skills FOR SELECT USING (true);

-- AUTHENTICATED WRITE policies (logged in users can write)
-- Using auth.uid() IS NOT NULL to check if user is authenticated

CREATE POLICY "auth_insert_profile" ON public.profile FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_profile" ON public.profile FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_profile" ON public.profile FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_insert_socials" ON public.socials FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_socials" ON public.socials FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_socials" ON public.socials FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_insert_projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_projects" ON public.projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_projects" ON public.projects FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_insert_experience" ON public.experience FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_experience" ON public.experience FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_experience" ON public.experience FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_insert_awards" ON public.awards FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_awards" ON public.awards FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_awards" ON public.awards FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "auth_insert_skills" ON public.skills FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_skills" ON public.skills FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_skills" ON public.skills FOR DELETE USING (auth.uid() IS NOT NULL);

-- Add image_url column to profile if it doesn't exist
ALTER TABLE public.profile ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update the profile name if it's still the old default
UPDATE public.profile SET name = 'Ahmed Hamza' WHERE name = 'Aamir Shaikh';
