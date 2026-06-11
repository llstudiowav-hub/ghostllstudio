import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/dashboard")({
  component: () => <AdminShell><Dashboard /></AdminShell>,
});

function Dashboard() {
  const { data: tracks = [] } = useQuery({
    queryKey: ["admin", "tracks"],
    queryFn: async () => {
      const { data } = await supabase.from("tracks").select("*");
      return data ?? [];
    },
  });
  const { data: leads = [] } = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: async () => {
      const { data } = await supabase.from("leads").select("*");
      return data ?? [];
    },
  });

  const total = tracks.length;
  const sold = tracks.filter((t: any) => t.is_sold).length;
  const available = total - sold;
  const totalLeads = leads.length;
  const newLeads = leads.filter((l: any) => l.status === "new").length;
  const soldLeads = leads.filter((l: any) => l.status === "sold").length;
  const conversion = totalLeads > 0 ? Math.round((soldLeads / totalLeads) * 100) : 0;

  const cards = [
    { label: "Total Tracks", value: total },
    { label: "Available", value: available },
    { label: "Sold", value: sold },
    { label: "Total Leads", value: totalLeads },
    { label: "New Leads", value: newLeads },
    { label: "Conversion Rate", value: `${conversion}%` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of your catalog and leads</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border/50 bg-card p-6">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-gold">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
