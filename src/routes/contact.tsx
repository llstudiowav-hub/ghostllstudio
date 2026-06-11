import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Headphones, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchTracks } from "../lib/db";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | LL Studio Music" },
      { name: "description", content: "Get in touch with LL Studio Music for ghost production inquiries, custom projects, and exclusive tracks." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: tracks = [] } = useQuery({ queryKey: ["tracks"], queryFn: fetchTracks });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", track_id: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setError(null);
    const t = tracks.find((x) => x.id === form.track_id);
    const { error: err } = await supabase.from("leads").insert({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp || null,
      track_id: form.track_id || null,
      track_title: t?.title ?? null,
      genre: t?.genre ?? null,
      price: t?.price ?? null,
      message: form.message,
    });
    setSending(false);
    if (err) { setError(err.message); return; }
    setSent(true);
    setForm({ name: "", email: "", whatsapp: "", track_id: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Get in Touch</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Ready to acquire a track or have questions? Reach out directly — we respond within hours.</p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10"><Headphones className="h-5 w-5 text-gold" /></div>
            <div>
              <h3 className="font-semibold text-foreground">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">Fastest response</p>
              <a href="https://wa.me/5575981109129" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-gold hover:underline">+55 75 98110-9129</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10"><Mail className="h-5 w-5 text-gold" /></div>
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-sm text-muted-foreground">For detailed inquiries</p>
              <a href="mailto:llstudio.wav@gmail.com" className="mt-1 inline-block text-gold hover:underline">llstudio.wav@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10"><Clock className="h-5 w-5 text-gold" /></div>
            <div>
              <h3 className="font-semibold text-foreground">Response Time</h3>
              <p className="text-sm text-muted-foreground">We typically respond within a few hours during business hours.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10"><MapPin className="h-5 w-5 text-gold" /></div>
            <div>
              <h3 className="font-semibold text-foreground">Online Worldwide</h3>
              <p className="text-sm text-muted-foreground">Serving DJs, labels, and artists globally.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-8">
          <h3 className="text-lg font-semibold text-foreground">Send a Quick Inquiry</h3>
          <p className="mt-1 text-sm text-muted-foreground">Tell us what you're looking for and we'll get back to you.</p>

          {sent ? (
            <div className="mt-8 rounded-xl border border-gold/30 bg-gold/10 p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-3 font-semibold text-foreground">Inquiry sent!</p>
              <p className="mt-1 text-sm text-muted-foreground">We'll get back to you shortly.</p>
              <button onClick={() => setSent(false)} className="mt-4 text-sm text-gold hover:underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" placeholder="Your name or artist alias" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">WhatsApp</label>
                  <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Track of Interest (optional)</label>
                <select value={form.track_id} onChange={(e) => setForm({ ...form, track_id: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold">
                  <option value="">— None —</option>
                  {tracks.filter(t => !t.is_sold).map((t) => (
                    <option key={t.id} value={t.id}>{t.title} — €{t.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground">Message</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" placeholder="Tell us about the track(s) you're interested in..." />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={sending} className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-gold-muted disabled:opacity-50">
                {sending ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted-foreground">Prefer WhatsApp?</p>
            <a href="https://wa.me/5575981109129" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-surface-elevated">
              <Headphones className="h-4 w-4 text-gold" />Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
