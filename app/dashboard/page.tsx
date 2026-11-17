import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: meetings } = await supabase
    .from("meetings")
    .select("id,title,created_at,analysis")
    .order("created_at", { ascending: false });
  const { count: open } = await supabase
    .from("actions")
    .select("id", { count: "exact", head: true })
    .eq("done", false);

  const list = meetings ?? [];
  const risks = list.reduce((n, m) => n + (m.analysis?.risks?.length ?? 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Dashboard</h1>
        <Link href="/dashboard/meetings/new" className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-hero">
          + New meeting
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[["Meetings", list.length], ["Open commitments", open ?? 0], ["Risks flagged", risks]].map(([l, n]) => (
          <div key={l as string} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="font-display text-4xl text-deep">{n}</p>
            <p className="text-sm text-slate-500">{l}</p>
          </div>
        ))}
      </div>
      <h2 className="font-display mb-4 mt-10 text-xl">Recent meetings</h2>
      <div className="space-y-3">
        {list.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-slate-500">No meetings yet. Paste your first transcript to get started.</p>
        )}
        {list.map((m) => (
          <Link key={m.id} href={`/dashboard/meetings/${m.id}`} className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm hover:ring-2 hover:ring-hero">
            <div>
              <p className="font-semibold">{m.title}</p>
              <p className="text-xs text-slate-500">{new Date(m.created_at).toLocaleDateString()}</p>
            </div>
            <span className="rounded-full bg-hero px-3 py-1 text-xs font-bold">✓ Analyzed</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
