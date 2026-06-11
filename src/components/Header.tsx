import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Tracks" },
  { to: "/contact", label: "Custom Production" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="LL Studio Music"
            className="h-11 w-11 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-foreground">LL STUDIO</span>
            <span className="text-[10px] font-medium tracking-[0.4em] text-muted-foreground">MUSIC</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm border border-gold/60 bg-transparent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            Request Custom Production
          </Link>
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
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm border border-gold bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold"
            >
              Request Custom Production
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
