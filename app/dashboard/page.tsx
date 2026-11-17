import Link from "next/link";
import { CheckCircle2, Target, AlertTriangle, Brain, Video } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Panel, Empty, ghostBtn } from "@/components/ui";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("full_name,company").eq("id", user!.id).maybeSingle();

  const week = new Date(Date.now() - 7 * 864e5).toISOString();
  const [{ data: meetings }, { data: actions }] = await Promise.all([
    supabase.from("meetings").select("id,title,created_at,analysis").order("created_at", { ascending: false }),
    supabase.from("actions").select("id,text,owner,due,status,created_at").order("created_at", { ascending: false }),
  ]);
  const ms = meetings ?? [];
  const as = actions ?? [];
  const open = as.filter((a) => a.status !== "completed");
  const recentM = ms.filter((m) => m.created_at > week);
  const sum = (list: typeof ms, k: "risks" | "decisions") => list.reduce((n, m) => n + (m.analysis?.[k]?.length ?? 0), 0);

  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const first = (profile?.full_name || user!.email!.split("@")[0]).split(" ")[0];

  const stats = [
    ["Open Actions", open.length, "pending completion", CheckCircle2, "text-deep"],
    ["Commitments (7d)", as.filter((a) => a.created_at > week).length, "tracked this week", Target, "text-emerald-500"],
    ["Risks Flagged (7d)", sum(recentM, "risks"), "across all meetings", AlertTriangle, "text-orange-500"],
    ["Decisions (7d)", sum(recentM, "decisions"), "logged this week", Brain, "text-green-500"],
  ] as const;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{greet}, {first}</h1>
          <p className="mt-1 text-sm text-slate-500">{profile?.company ? `${profile.company} · ` : ""}Intelligence overview</p>
        </div>
        <Link href="/dashboard/meetings/new" className="rounded-xl bg-deep px-5 py-2.5 text-sm font-semibold text-white">+ New Meeting</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([l, n, s, Icon, c]) => (
          <Panel key={l} className="p-5">
            <div className="flex items-center justify-between text-sm text-slate-500">{l}<Icon className={`h-4 w-4 ${c}`} /></div>
            <p className="mt-3 text-3xl font-bold">{n}</p>
            <p className="mt-1 text-xs text-slate-400">{s}</p>
          </Panel>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel>
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="font-semibold">Recent Meetings</h2>
            <Link href="/dashboard/meetings" className="text-sm font-medium text-deep">View all</Link>
          </div>
          {ms.length === 0 ? (
            <Empty icon={Video} title="No meetings yet" action={<Link href="/dashboard/meetings/new" className={ghostBtn}>Start your first meeting</Link>} />
          ) : (
            ms.slice(0, 6).map((m) => (
              <Link key={m.id} href={`/dashboard/meetings/${m.id}`} className="flex items-center justify-between border-b border-slate-50 px-6 py-4 last:border-0 hover:bg-slate-50">
                <span className="font-medium">{m.title}</span>
                <span className="text-xs text-slate-400">{new Date(m.created_at).toLocaleDateString()}</span>
              </Link>
            ))
          )}
        </Panel>
        <div className="space-y-6">
          <Panel>
            <h2 className="flex items-center gap-2 border-b border-slate-100 px-6 py-4 font-semibold"><Target className="h-4 w-4 text-deep" /> Recent Commitments</h2>
            {as.length === 0 ? <Empty icon={Target} title="No commitments yet" sub="Run AI analysis on a meeting" /> :
              as.slice(0, 4).map((a) => <p key={a.id} className="border-b border-slate-50 px-6 py-3 text-sm last:border-0">{a.text}<span className="block text-xs text-slate-400">{a.owner}{a.due ? ` · ${a.due}` : ""}</span></p>)}
          </Panel>
          <Panel>
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="font-semibold">Open Actions</h2>
              <Link href="/dashboard/actions" className="text-sm font-medium text-deep">View all</Link>
            </div>
            {open.length === 0 ? <Empty icon={CheckCircle2} title="All clear" /> :
              open.slice(0, 4).map((a) => <p key={a.id} className="border-b border-slate-50 px-6 py-3 text-sm last:border-0">{a.text}</p>)}
          </Panel>
        </div>
      </div>
    </div>
  );
}
