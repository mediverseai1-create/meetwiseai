import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FollowUp from "@/components/FollowUp";
import type { Analysis } from "@/lib/gemini";

const sev = { high: "bg-red-100 text-red-700", medium: "bg-orange-100 text-orange-700", low: "bg-yellow-100 text-yellow-700" };

export default async function Meeting({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: m } = await supabase.from("meetings").select("*").eq("id", id).single();
  if (!m) notFound();
  const a = (m.analysis ?? {}) as Analysis;

  const Card = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="font-display flex items-center gap-2 text-sm uppercase tracking-wider">
        <i className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /> {title}
      </h3>
      <div className="mt-4 space-y-2 text-sm">{children}</div>
    </div>
  );
  const Row = ({ children }: { children: React.ReactNode }) => (
    <p className="rounded-lg bg-slate-50 px-3 py-2">{children}</p>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl">{m.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{new Date(m.created_at).toLocaleString()}</p>
      </div>
      <div className="rounded-2xl bg-ink p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-hero">Summary</p>
        <p className="mt-2 leading-7 text-white/85">{a.summary}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Card title={`Commitments (${a.commitments?.length ?? 0})`} color="#a78bfa">
          {a.commitments?.map((c, i) => <Row key={i}>{c.text} — <b>{c.owner}</b>{c.due ? ` · ${c.due}` : ""}</Row>)}
        </Card>
        <Card title={`Risks (${a.risks?.length ?? 0})`} color="#fb923c">
          {a.risks?.map((r, i) => (
            <Row key={i}>
              <span className={`mr-2 rounded px-2 py-0.5 text-xs font-bold ${sev[r.severity] ?? sev.low}`}>{r.severity}</span>
              {r.text}
            </Row>
          ))}
        </Card>
        <Card title={`Decisions (${a.decisions?.length ?? 0})`} color="#34d399">
          {a.decisions?.map((d, i) => <Row key={i}>{d.text}{d.owner ? ` — ${d.owner}` : ""}</Row>)}
        </Card>
        <Card title="Sales signals" color="#38bdf8">
          {a.buying_signals?.map((s, i) => <Row key={`b${i}`}>👍 {s}</Row>)}
          {a.objections?.map((s, i) => <Row key={`o${i}`}>⚠️ {s}</Row>)}
        </Card>
      </div>
      {!!a.open_issues?.length && (
        <Card title="Open issues" color="#94a3b8">
          {a.open_issues.map((s, i) => <Row key={i}>{s}</Row>)}
        </Card>
      )}
      <FollowUp meetingId={m.id} initial={m.followup_email} />
    </div>
  );
}
