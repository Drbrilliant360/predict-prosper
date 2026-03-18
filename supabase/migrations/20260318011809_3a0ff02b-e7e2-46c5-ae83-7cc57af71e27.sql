
ALTER TABLE public.slips DROP CONSTRAINT slips_pundit_id_fkey;
ALTER TABLE public.slips ADD CONSTRAINT slips_pundit_id_profiles_fkey FOREIGN KEY (pundit_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.pundit_profiles DROP CONSTRAINT pundit_profiles_user_id_fkey;
ALTER TABLE public.pundit_profiles ADD CONSTRAINT pundit_profiles_user_id_profiles_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.followers DROP CONSTRAINT followers_pundit_id_fkey;
ALTER TABLE public.followers ADD CONSTRAINT followers_pundit_id_profiles_fkey FOREIGN KEY (pundit_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.followers DROP CONSTRAINT followers_follower_id_fkey;
ALTER TABLE public.followers ADD CONSTRAINT followers_follower_id_profiles_fkey FOREIGN KEY (follower_id) REFERENCES public.profiles(user_id);
