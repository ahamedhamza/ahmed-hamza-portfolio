-- Enable Row Level Security (RLS) is recommended but for simplicity in this portfolio, we might start with public read access.
-- Ideally, we should enable RLS and allow only authenticated users (admin) to write.

-- Profile Table
CREATE TABLE public.profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    tagline TEXT,
    location TEXT,
    year TEXT,
    bio_intro TEXT,
    bio_body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default profile data
INSERT INTO public.profile (name, tagline, location, year, bio_intro, bio_body)
VALUES (
    'Ahmed Hamza',
    'Crafting digital interfaces',
    'India',
    '20 25',
    'I design digital interfaces',
    'From a young age, I''ve been fascinated by the world of computers and software. Features like copy, paste, and undo seemed magical and touch screens were a joy to use. Along the way, I''ve developed a keen interest in visual design, and found my calling to digital Product Design.'
);

-- Socials Table
CREATE TABLE public.socials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- e.g., 'Twitter', 'Linkedin'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Projects Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT,
    image_url TEXT, -- For now, we can store the URL. Later we can use Supabase Storage.
    gradient_start TEXT, -- e.g., 'from-purple-600/20'
    gradient_end TEXT, -- e.g., 'to-violet-600/20'
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Experience Table
CREATE TABLE public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Awards Table
CREATE TABLE public.awards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    org TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skills Table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT, -- Optional, for grouping
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- Allow public read access
CREATE POLICY "Allow public read access on profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access on socials" ON public.socials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access on awards" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Allow public read access on skills" ON public.skills FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert/update/delete
-- Assuming the user will sign in via Supabase Auth and be authenticated.
CREATE POLICY "Allow authenticated full access on profile" ON public.profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on socials" ON public.socials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on awards" ON public.awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');

-- Storage Bucket for Project Images
-- You'll need to create a bucket named 'project-images' in the Supabase Dashboard -> Storage.
-- And set policy to allow public read and authenticated upload.
