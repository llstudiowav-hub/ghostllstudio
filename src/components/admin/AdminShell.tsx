import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Music2, Inbox, Sparkles, Settings, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";
import { useEffect, type ReactNode } from "react";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/tracks", label: "Tracks", icon: Music2 },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/requests", label: "Custom Requests", icon: Sparkles },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const session = useAdminSession();
  const navigate = useNavigate();
  const { location } = useRouterState();

  useEffect(() => {
    if (!session.loading && (!session.userId || !session.isAdmin)) {
      navigate({ to: "/admin/login" });
    }
  }, [session, navigate]);

  if (session.loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading…</div>;
  }
  if (!session.userId || !session.isAdmin) return null;

  const onSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-6">
            <div className="mb-6 flex items-center gap-2">
              <img src="/assets/logo.png" alt="LL Studio" className="h-8 w-8" />
              <span className="text-sm font-semibold">LL Studio Admin</span>
            </div>
            <nav className="space-y-1">
              {nav.map((n) => {
                const active = location.pathname === n.to;
                const Icon = n.icon;
                return (
                  <Link key={n.to} to={n.to} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"}`}>
                    <Icon className="h-4 w-4" />{n.label}
                  </Link>
                );
              })}
            </nav>
            <button onClick={onSignOut} className="mt-6 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface-elevated hover:text-foreground">
              <LogOut className="h-4 w-4" />Sign out
            </button>
            <p className="mt-4 px-3 text-xs text-muted-foreground">{session.email}</p>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <span className="text-sm font-semibold">LL Studio Admin</span>
            <button onClick={onSignOut} className="text-xs text-muted-foreground hover:text-foreground">Sign out</button>
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
            {nav.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link key={n.to} to={n.to} className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${active ? "bg-gold text-primary-foreground" : "bg-card text-muted-foreground"}`}>
                  {n.label}
                </Link>
              );
            })}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
