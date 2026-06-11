import { Mail, Headphones, Instagram, Youtube, Music } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="LL Studio Music"
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold tracking-tight">LL Studio Music</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Premium ghost production for international DJs, labels, and artists.
              Exclusive tracks. Full ownership. Professional quality.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://linktr.ee/llstudio.wav"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Linktree"
              >
                <Music className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/5575981109129"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-surface-elevated p-2.5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="WhatsApp"
              >
                <Headphones className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Catalog", href: "/catalog" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Licensing", href: "/licensing" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:llstudio.wav@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  llstudio.wav@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5575981109129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Headphones className="h-4 w-4" />
                  +55 75 98110-9129
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LL Studio Music. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
