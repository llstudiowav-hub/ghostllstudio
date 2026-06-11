
CREATE POLICY "Public read track-demos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'track-demos');
CREATE POLICY "Admin write track-demos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'track-demos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update track-demos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'track-demos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete track-demos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'track-demos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read track-covers" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'track-covers');
CREATE POLICY "Admin write track-covers" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'track-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update track-covers" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'track-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete track-covers" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'track-covers' AND public.has_role(auth.uid(), 'admin'));
