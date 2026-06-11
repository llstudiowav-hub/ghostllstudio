import { supabase } from "@/integrations/supabase/client";
import type { Track } from "./tracks";

export async function fetchTracks(): Promise<Track[]> {
  const { data, error } = await supabase
    .from("tracks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Track[];
}

export async function fetchTrack(id: string): Promise<Track | null> {
  const { data, error } = await supabase
    .from("tracks")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Track) ?? null;
}

export interface SiteSettings {
  id: number;
  contact_email: string;
  whatsapp_number: string;
  instagram_url: string | null;
  youtube_url: string | null;
  soundcloud_url: string | null;
  linktree_url: string | null;
  footer_text: string | null;
}

export async function fetchSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return (data as SiteSettings) ?? null;
}
