import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Headphones } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/licensing", label: "Licensing" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="LL Studio Music"
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-foreground">
            LL Studio Music
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5575981109129"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-gold-muted hover:scale-105"
          >
            <Headphones className="h-4 w-4" />
            Inquire Now
          </a>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-semibold" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/5575981109129"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Headphones className="h-4 w-4" />
              Inquire via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
