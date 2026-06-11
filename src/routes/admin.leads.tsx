import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/leads")({
  component: () => <AdminShell><LeadsAdmin /></AdminShell>,
});

const statuses = ["new", "contacted", "negotiating", "sold"] as const;
const labels: Record<string, string> = { new: "New Lead", contacted: "Contacted", negotiating: "Negotiating", sold: "Sold" };

function LeadsAdmin() {
  const qc = useQueryClient();
  const { data: leads = [] } = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = leads.filter((l: any) => {
    const m = !search || [l.name, l.email, l.track_title, l.whatsapp].some((v) => v?.toLowerCase().includes(search.toLowerCase()));
    const s = statusFilter === "all" || l.status === statusFilter;
    return m && s;
  });

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin", "leads"] });
  };
  const remove = async (id: string) => {
    if (!confirm("Delete lead?")) return;
    await supabase.from("leads").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin", "leads"] });
  };

  const exportCsv = () => {
    const headers = ["Date", "Name", "Email", "WhatsApp", "Track", "Genre", "Price", "Status", "Message"];
    const rows = filtered.map((l: any) => [
      new Date(l.created_at).toISOString(), l.name, l.email, l.whatsapp ?? "", l.track_title ?? "",
      l.genre ?? "", l.price ?? "", l.status, (l.message ?? "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows].map(r => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Lead Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">{leads.length} total leads</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-surface-elevated">
          <Download className="h-4 w-4" />Export CSV
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, track…" className="rounded-lg border border-border bg-card px-4 py-2 text-sm" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-border bg-card px-4 py-2 text-sm">
          <option value="all">All statuses</option>
          {statuses.map(s => <option key={s} value={s}>{labels[s]}</option>)}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border/50 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-surface-elevated text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Contact</th>
              <th className="px-4 py-3 text-left">Track</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l: any) => (
              <tr key={l.id} className="border-t border-border/50 align-top">
                <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-medium">{l.name}</td>
                <td className="px-4 py-3 text-xs">
                  <div>{l.email}</div>
                  {l.whatsapp && <div className="text-muted-foreground">{l.whatsapp}</div>}
                </td>
                <td className="px-4 py-3 text-xs">
                  {l.track_title ?? <span className="text-muted-foreground">—</span>}
                  {l.genre && <div className="text-muted-foreground">{l.genre}</div>}
                </td>
                <td className="px-4 py-3 text-gold">{l.price ? `€${l.price}` : "—"}</td>
                <td className="px-4 py-3">
                  <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className="rounded border border-border bg-background px-2 py-1 text-xs">
                    {statuses.map(s => <option key={s} value={s}>{labels[s]}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => remove(l.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
