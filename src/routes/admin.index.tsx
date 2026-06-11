import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdminSession } from "@/hooks/useAdminSession";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const session = useAdminSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session.loading) return;
    navigate({ to: session.isAdmin ? "/admin/dashboard" : "/admin/login" });
  }, [session, navigate]);
  return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Redirecting…</div>;
}
