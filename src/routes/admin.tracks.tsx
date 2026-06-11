import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Trash2, Plus, X, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import type { Track } from "@/lib/tracks";
import { genres } from "@/lib/tracks";

export const Route = createFileRoute("/admin/tracks")({
  component: () => <AdminShell><TracksAdmin /></AdminShell>,
});

type Form = Partial<Track> & { _demoFile?: File | null; _coverFile?: File | null };

const empty: Form = {
  title: "", genre: "Techno", bpm: 128, key: "Amin", duration: "", price: 0, exclusive_price: 0,
  description: "", tags: [], is_new: false, is_best_seller: false, is_sold: false, is_featured: false,
};

function TracksAdmin() {
  const qc = useQueryClient();
  const { data: tracks = [] } = useQuery({
    queryKey: ["admin", "tracks"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tracks").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Track[];
    },
  });
  const [editing, setEditing] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "tracks"] });

  const uploadFile = async (bucket: string, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const payload: any = { ...editing };
      delete payload._demoFile; delete payload._coverFile;
      if (editing._demoFile) payload.demo_url = await uploadFile("track-demos", editing._demoFile);
      if (editing._coverFile) payload.cover_url = await uploadFile("track-covers", editing._coverFile);
      payload.price = Number(payload.price) || 0;
      payload.exclusive_price = payload.exclusive_price ? Number(payload.exclusive_price) : null;
      payload.bpm = Number(payload.bpm) || 0;
      if (typeof payload.tags === "string") payload.tags = (payload.tags as string).split(",").map((s: string) => s.trim()).filter(Boolean);
      if (payload.id) {
        const { id, created_at, updated_at, ...rest } = payload;
        const { error } = await supabase.from("tracks").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { id, created_at, updated_at, ...rest } = payload;
        const { error } = await supabase.from("tracks").insert(rest);
        if (error) throw error;
      }
      setEditing(null);
      refresh();
    } catch (e: any) {
      alert(e.message);
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this track?")) return;
    await supabase.from("tracks").delete().eq("id", id);
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Track Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">{tracks.length} tracks</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" />New Track
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border/50 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-surface-elevated text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Genre</th>
              <th className="px-4 py-3 text-left">BPM</th>
              <th className="px-4 py-3 text-left">Key</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Flags</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((t) => (
              <tr key={t.id} className="border-t border-border/50">
                <td className="px-4 py-3 font-medium">{t.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.genre}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.bpm}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.key}</td>
                <td className="px-4 py-3 text-gold">€{t.price}</td>
                <td className="px-4 py-3 text-xs">
                  {t.is_new && <span className="mr-1 rounded bg-gold/20 px-1.5 py-0.5 text-gold">NEW</span>}
                  {t.is_best_seller && <span className="mr-1 rounded bg-foreground/10 px-1.5 py-0.5">BEST</span>}
                  {t.is_sold && <span className="mr-1 rounded bg-destructive/20 px-1.5 py-0.5 text-destructive">SOLD</span>}
                  {t.is_featured && <span className="mr-1 rounded bg-gold/10 px-1.5 py-0.5 text-gold">FEAT</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing({ ...t, tags: t.tags ?? [] })} className="mr-2 text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(t.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/50 bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing.id ? "Edit Track" : "New Track"}</h2>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 space-y-4">
              <Field label="Title"><input className="input" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Genre">
                  <select className="input" value={editing.genre ?? ""} onChange={(e) => setEditing({ ...editing, genre: e.target.value })}>
                    {genres.filter(g => g !== "All").map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </Field>
                <Field label="Key"><input className="input" value={editing.key ?? ""} onChange={(e) => setEditing({ ...editing, key: e.target.value })} /></Field>
                <Field label="BPM"><input type="number" className="input" value={editing.bpm ?? 0} onChange={(e) => setEditing({ ...editing, bpm: Number(e.target.value) })} /></Field>
                <Field label="Duration"><input className="input" placeholder="6:24" value={editing.duration ?? ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} /></Field>
                <Field label="Price (€)"><input type="number" className="input" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} /></Field>
                <Field label="Exclusive Price (€)"><input type="number" className="input" value={editing.exclusive_price ?? 0} onChange={(e) => setEditing({ ...editing, exclusive_price: Number(e.target.value) })} /></Field>
              </div>
              <Field label="Description"><textarea rows={3} className="input" value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
              <Field label="Tags (comma separated)">
                <input className="input" value={Array.isArray(editing.tags) ? editing.tags.join(", ") : (editing.tags as any ?? "")} onChange={(e) => setEditing({ ...editing, tags: e.target.value as any })} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={<>Demo MP3 <Upload className="inline h-3 w-3" /></>}>
                  <input type="file" accept="audio/*" onChange={(e) => setEditing({ ...editing, _demoFile: e.target.files?.[0] ?? null })} className="text-xs" />
                  {editing.demo_url && <p className="mt-1 text-xs text-muted-foreground truncate">Current: {editing.demo_url.split("/").pop()}</p>}
                </Field>
                <Field label={<>Cover Image <Upload className="inline h-3 w-3" /></>}>
                  <input type="file" accept="image/*" onChange={(e) => setEditing({ ...editing, _coverFile: e.target.files?.[0] ?? null })} className="text-xs" />
                  {editing.cover_url && <p className="mt-1 text-xs text-muted-foreground truncate">Current: {editing.cover_url.split("/").pop()}</p>}
                </Field>
              </div>
              <div className="flex flex-wrap gap-4">
                <Toggle label="New" value={!!editing.is_new} onChange={(v) => setEditing({ ...editing, is_new: v })} />
                <Toggle label="Best Seller" value={!!editing.is_best_seller} onChange={(v) => setEditing({ ...editing, is_best_seller: v })} />
                <Toggle label="Sold" value={!!editing.is_sold} onChange={(v) => setEditing({ ...editing, is_sold: v })} />
                <Toggle label="Featured" value={!!editing.is_featured} onChange={(v) => setEditing({ ...editing, is_featured: v })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-4 py-2 text-sm">Cancel</button>
              <button onClick={save} disabled={saving} className="rounded-full bg-gold px-6 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`.input{width:100%;border:1px solid hsl(var(--border));background:hsl(var(--background));padding:0.5rem 0.75rem;border-radius:0.5rem;font-size:0.875rem;color:inherit}.input:focus{outline:none;border-color:var(--color-gold,#caa14a)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return <label className="block"><span className="block text-sm font-medium">{label}</span><div className="mt-1.5">{children}</div></label>;
}
function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
