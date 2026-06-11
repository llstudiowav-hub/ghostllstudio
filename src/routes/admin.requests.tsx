import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/requests")({
  component: () => <AdminShell><RequestsAdmin /></AdminShell>,
});

function RequestsAdmin() {
  const qc = useQueryClient();
  const { data: rows = [] } = useQuery({
    queryKey: ["admin", "requests"],
    queryFn: async () => {
      const { data, error } = await supabase.from("custom_requests").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const remove = async (id: string) => {
    if (!confirm("Delete request?")) return;
    await supabase.from("custom_requests").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin", "requests"] });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Custom Production Requests</h1>
      <p className="mt-1 text-sm text-muted-foreground">{rows.length} requests</p>

      <div className="mt-6 grid gap-4">
        {rows.map((r: any) => (
          <div key={r.id} className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => remove(r.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div><span className="text-muted-foreground">Email:</span> {r.email}</div>
              <div><span className="text-muted-foreground">WhatsApp:</span> {r.whatsapp ?? "—"}</div>
              <div><span className="text-muted-foreground">Genre:</span> {r.genre ?? "—"}</div>
              <div><span className="text-muted-foreground">Budget:</span> {r.budget ?? "—"}</div>
              <div className="sm:col-span-2"><span className="text-muted-foreground">Reference:</span> {r.reference_track ?? "—"}</div>
            </div>
            {r.project_description && (
              <div className="mt-3 rounded-lg bg-surface-elevated p-3 text-sm">{r.project_description}</div>
            )}
          </div>
        ))}
        {rows.length === 0 && <p className="rounded-xl border border-border/50 bg-card p-10 text-center text-muted-foreground">No custom requests yet.</p>}
      </div>
    </div>
  );
}
