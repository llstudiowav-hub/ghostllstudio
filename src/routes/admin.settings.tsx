import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { fetchSettings, type SiteSettings } from "@/lib/db";

export const Route = createFileRoute("/admin/settings")({
  component: () => <AdminShell><SettingsAdmin /></AdminShell>,
});

function SettingsAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["settings"], queryFn: fetchSettings });
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (!form) return <p className="text-muted-foreground">Loading…</p>;

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({
      contact_email: form.contact_email,
      whatsapp_number: form.whatsapp_number,
      instagram_url: form.instagram_url,
      youtube_url: form.youtube_url,
      soundcloud_url: form.soundcloud_url,
      linktree_url: form.linktree_url,
      footer_text: form.footer_text,
    }).eq("id", 1);
    setSaving(false);
    if (error) { alert(error.message); return; }
    setSavedMsg("Saved!");
    qc.invalidateQueries({ queryKey: ["settings"] });
    setTimeout(() => setSavedMsg(null), 2000);
  };

  const F = ({ label, k }: { label: string; k: keyof SiteSettings }) => (
    <label className="block">
      <span className="block text-sm font-medium">{label}</span>
      <input className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        value={(form[k] as string) ?? ""}
        onChange={(e) => setForm({ ...form, [k]: e.target.value } as SiteSettings)} />
    </label>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update site-wide contact info and footer.</p>
      <div className="mt-6 max-w-2xl space-y-4 rounded-xl border border-border/50 bg-card p-6">
        <F label="Contact Email" k="contact_email" />
        <F label="WhatsApp Number" k="whatsapp_number" />
        <F label="Instagram URL" k="instagram_url" />
        <F label="YouTube URL" k="youtube_url" />
        <F label="SoundCloud URL" k="soundcloud_url" />
        <F label="Linktree URL" k="linktree_url" />
        <F label="Footer Text" k="footer_text" />
        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving} className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {saving ? "Saving…" : "Save Settings"}
          </button>
          {savedMsg && <span className="text-sm text-gold">{savedMsg}</span>}
        </div>
      </div>
    </div>
  );
}
