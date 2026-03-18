-- Add betslip_code and betslip_image_url columns to slips
ALTER TABLE public.slips
ADD COLUMN betslip_code text,
ADD COLUMN betslip_image_url text;

-- Create storage bucket for betslip images
INSERT INTO storage.buckets (id, name, public) VALUES ('betslip-images', 'betslip-images', true);

-- Allow authenticated users to upload betslip images
CREATE POLICY "Authenticated users can upload betslip images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'betslip-images');

-- Allow public read access
CREATE POLICY "Anyone can view betslip images"
ON storage.objects FOR SELECT
USING (bucket_id = 'betslip-images');

-- Allow owners to delete their betslip images
CREATE POLICY "Users can delete own betslip images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'betslip-images' AND auth.uid()::text = (storage.foldername(name))[1]);