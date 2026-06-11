import { useQuery } from "@tanstack/react-query";
import { Mail, Headphones, Instagram, Youtube, Music } from "lucide-react";
import { fetchSettings } from "@/lib/db";

export function Footer() {
  const { data: s } = useQuery({ queryKey: ["settings"], queryFn: fetchSettings });
  const email = s?.contact_email ?? "llstudio.wav@gmail.com";
  const wa = (s?.whatsapp_number ?? "+5575981109129").replace(/\D/g, "");
  const linktree = s?.linktree_url ?? "https://linktr.ee/llstudio.wav";

  return (
    <footer className="border-t border-border/50 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="LL Studio Music" className="h-10 w-10 object-contain" />
              <span className="text-lg font-bold tracking-tight">LL Studio Music</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Premium ghost production for international DJs, labels, and artists. Exclusive tracks. Full ownership. Professional quality.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={linktree} target="_blank" rel="noopener noreferrer" className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="Linktree"><Music className="h-4 w-4" /></a>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="WhatsApp"><Headphones className="h-4 w-4" /></a>
              {s?.instagram_url && <a href={s.instagram_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>}
              {s?.youtube_url && <a href={s.youtube_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>}
              {s?.soundcloud_url && <a href={s.soundcloud_url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground" aria-label="SoundCloud"><Music className="h-4 w-4" /></a>}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Navigation</h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Catalog", href: "/catalog" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Licensing", href: "/licensing" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}><a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li><a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><Mail className="h-4 w-4" />{email}</a></li>
              <li><a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><Headphones className="h-4 w-4" />{s?.whatsapp_number ?? "+55 75 98110-9129"}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          {s?.footer_text ?? "© LL Studio Music. All Rights Reserved."}
        </div>
      </div>
    </footer>
  );
}
