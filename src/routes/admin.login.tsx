import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const session = useAdminSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session.loading && session.isAdmin) navigate({ to: "/admin/dashboard" });
  }, [session, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err || !data.user) { setError(err?.message ?? "Login failed"); setLoading(false); return; }
    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin");

    if (rolesError) {
      setError(rolesError.message);
      setLoading(false);
      return;
    }

    if (!roles || roles.length === 0) {
      setError("This account does not have administrator access.");
      setLoading(false);
      return;
    }
    navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border/50 bg-card p-8">
        <div className="text-center">
          <img src="/assets/logo.png" alt="LL Studio" className="mx-auto h-12 w-12" />
          <h1 className="mt-4 text-xl font-bold text-foreground">Administrator Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">LL Studio Music</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-gold-muted disabled:opacity-50">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
