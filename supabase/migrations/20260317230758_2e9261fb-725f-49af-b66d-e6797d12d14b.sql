
-- ===== UTILITY: updated_at trigger function =====
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ===== ROLES =====
CREATE TYPE public.app_role AS ENUM ('customer', 'pundit', 'admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ===== PROFILES =====
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  bio TEXT DEFAULT '',
  phone TEXT,
  location TEXT DEFAULT 'Dar es Salaam, Tanzania',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + customer role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NULL)
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===== PUNDIT APPLICATIONS =====
CREATE TYPE public.pundit_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.pundit_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  sport TEXT NOT NULL,
  experience TEXT NOT NULL,
  status pundit_status NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pundit_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own application" ON public.pundit_applications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit application" ON public.pundit_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage applications" ON public.pundit_applications
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_pundit_applications_updated_at BEFORE UPDATE ON public.pundit_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== PUNDIT PROFILES =====
CREATE TABLE public.pundit_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  sport TEXT NOT NULL DEFAULT 'Football',
  verified BOOLEAN NOT NULL DEFAULT false,
  win_rate NUMERIC(5,2) DEFAULT 0,
  roi NUMERIC(5,2) DEFAULT 0,
  total_slips INT DEFAULT 0,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  voids INT DEFAULT 0,
  avg_odds NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pundit_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pundit profiles viewable by all" ON public.pundit_profiles FOR SELECT USING (true);
CREATE POLICY "Pundits update own profile" ON public.pundit_profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert pundit profiles" ON public.pundit_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_pundit_profiles_updated_at BEFORE UPDATE ON public.pundit_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== SLIPS =====
CREATE TYPE public.slip_confidence AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.slip_risk AS ENUM ('low', 'medium', 'high');
CREATE TYPE public.slip_status AS ENUM ('pending', 'won', 'lost', 'void', 'expired');

CREATE TABLE public.slips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pundit_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  sport TEXT NOT NULL,
  league TEXT NOT NULL,
  match_name TEXT NOT NULL,
  market TEXT NOT NULL,
  bookmaker TEXT NOT NULL DEFAULT 'M-Bet',
  odds NUMERIC(6,2) NOT NULL,
  price INT NOT NULL DEFAULT 1000,
  confidence slip_confidence NOT NULL DEFAULT 'medium',
  risk slip_risk NOT NULL DEFAULT 'medium',
  status slip_status NOT NULL DEFAULT 'pending',
  prediction TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.slips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Slips viewable by all" ON public.slips FOR SELECT USING (true);
CREATE POLICY "Pundits create own slips" ON public.slips
  FOR INSERT WITH CHECK (auth.uid() = pundit_id AND public.has_role(auth.uid(), 'pundit'));
CREATE POLICY "Pundits update own slips" ON public.slips
  FOR UPDATE USING (auth.uid() = pundit_id);
CREATE POLICY "Admins manage all slips" ON public.slips
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_slips_updated_at BEFORE UPDATE ON public.slips
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== PURCHASES =====
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  slip_id UUID REFERENCES public.slips(id) ON DELETE CASCADE NOT NULL,
  amount INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, slip_id)
);
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own purchases" ON public.purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can purchase" ON public.purchases FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all purchases" ON public.purchases
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ===== WALLETS =====
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System manages wallets" ON public.wallets
  FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create wallet on signup
CREATE OR REPLACE FUNCTION public.handle_new_wallet()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wallets (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_wallet AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_wallet();

-- ===== TRANSACTIONS =====
CREATE TYPE public.tx_type AS ENUM ('deposit', 'withdrawal', 'purchase', 'earning', 'refund');
CREATE TYPE public.tx_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE public.payment_method AS ENUM ('mpesa', 'tigo_pesa', 'airtel_money', 'bank_transfer', 'wallet');

CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type tx_type NOT NULL,
  amount INT NOT NULL,
  status tx_status NOT NULL DEFAULT 'pending',
  payment_method payment_method,
  reference TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all transactions" ON public.transactions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ===== FOLLOWERS =====
CREATE TABLE public.followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pundit_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(follower_id, pundit_id)
);
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view followers" ON public.followers FOR SELECT USING (true);
CREATE POLICY "Users follow/unfollow" ON public.followers
  FOR ALL TO authenticated USING (auth.uid() = follower_id);

-- ===== REVIEWS =====
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pundit_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, pundit_id)
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews viewable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users create own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

-- ===== STORAGE BUCKETS =====
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete their own avatar" ON storage.objects
  FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
