-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  mobile TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  prize TEXT,
  location TEXT,
  category TEXT NOT NULL CHECK (category IN ('arts', 'tech', 'sports')),
  max_participants INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'attended')),
  UNIQUE(user_id, event_id)
);

-- Create attendance sessions table (for teacher-generated codes)
CREATE TABLE public.attendance_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  session_date DATE NOT NULL,
  attendance_code TEXT NOT NULL,
  qr_code_data TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '2 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Create attendance records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  method TEXT NOT NULL CHECK (method IN ('code', 'qr')),
  UNIQUE(session_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for events (public read access)
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can create events" ON public.events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for event registrations
CREATE POLICY "Users can view their own registrations" ON public.event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own registrations" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registrations" ON public.event_registrations FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for attendance sessions
CREATE POLICY "Users can view all active attendance sessions" ON public.attendance_sessions FOR SELECT USING (is_active = true AND expires_at > now());
CREATE POLICY "Teachers can create attendance sessions" ON public.attendance_sessions FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Teachers can update their own sessions" ON public.attendance_sessions FOR UPDATE USING (auth.uid() = created_by);

-- Create RLS policies for attendance records
CREATE POLICY "Users can view their own attendance records" ON public.attendance_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own attendance records" ON public.attendance_records FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, mobile)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'mobile'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample events
INSERT INTO public.events (title, description, event_date, prize, location, category, max_participants, image_url) VALUES
('Creative Arts Festival', 'Showcase your creativity in painting, sculpture, music, and dance.', '2025-05-01', '₹40,000', 'Main Auditorium', 'arts', 150, 'https://img.icons8.com/color/96/paint-palette.png'),
('Photography Contest', 'Capture the beauty of campus life and nature.', '2025-05-15', '₹15,000', 'Campus Grounds', 'arts', 80, 'https://img.icons8.com/color/96/camera.png'),
('Internal Hackathon', 'Build innovative solutions in 12 hours.', '2025-09-20', '', 'MU Hall', 'tech', 200, 'https://img.icons8.com/color/96/laptop.png'),
('Inter-College Olympics', 'Compete in various sports across multiple categories.', '2025-02-20', '₹75,000', 'Sports Complex', 'sports', 300, 'https://img.icons8.com/color/96/trophy.png'),
('Cricket Tournament', 'Show your cricket skills in this exciting tournament.', '2025-03-10', '₹25,000', 'Cricket Ground', 'sports', 120, 'https://img.icons8.com/color/96/cricket.png');