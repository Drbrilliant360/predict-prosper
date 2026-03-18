
CREATE OR REPLACE FUNCTION public.submit_kyc(
  _user_id uuid,
  _full_name text,
  _phone text,
  _date_of_birth date,
  _id_type text,
  _id_number text,
  _id_front_url text DEFAULT NULL,
  _id_back_url text DEFAULT NULL,
  _selfie_url text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = _user_id) THEN
    RAISE EXCEPTION 'Invalid user';
  END IF;

  INSERT INTO public.kyc_submissions (user_id, full_name, phone, date_of_birth, id_type, id_number, id_front_url, id_back_url, selfie_url)
  VALUES (_user_id, _full_name, _phone, _date_of_birth, _id_type, _id_number, _id_front_url, _id_back_url, _selfie_url)
  ON CONFLICT (user_id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    date_of_birth = EXCLUDED.date_of_birth,
    id_type = EXCLUDED.id_type,
    id_number = EXCLUDED.id_number,
    id_front_url = EXCLUDED.id_front_url,
    id_back_url = EXCLUDED.id_back_url,
    selfie_url = EXCLUDED.selfie_url,
    status = 'pending',
    updated_at = now();

  -- Update profile
  UPDATE public.profiles SET display_name = _full_name, phone = _phone WHERE user_id = _user_id;
END;
$$;
