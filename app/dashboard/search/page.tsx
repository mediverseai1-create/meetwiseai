"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Search as SearchIcon, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PageHead, Empty, Panel } from "@/components/ui";

type Hit = { href: string; title: string; kind: string; snippet: string };

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    const sb = createClient();
    const t = `%${q.trim()}%`;
    const [m, a] = await Promise.all([
      sb.from("meetings").select("id,title,transcript").or(`title.ilike.${t},transcript.ilike.${t}`).limit(20),
      sb.from("actions").select("id,text,meeting_id").ilike("text", t).limit(20),
    ]);
    setHits([
      ...(m.data ?? []).map((x) => ({ href: `/dashboard/meetings/${x.id}`, title: x.title, kind: "Meeting", snippet: x.transcript.slice(0, 140) })),
      ...(a.data ?? []).map((x) => ({ href: `/dashboard/meetings/${x.meeting_id}`, title: x.text, kind: "Action item", snippet: "" })),
    ]);
  }

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setBusy(true);
    setAnswer("");
    const res = await fetch("/api/memory", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
    const d = await res.json();
    setAnswer(res.ok ? d.answer : d.error);
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHead title="Search" sub="Search across all your meetings, notes, and action items" cta={false} />
      <form onSubmit={search} className="flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4">
          <SearchIcon className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search meetings, notes, action items..." className="w-full py-3 text-sm outline-none" />
        </div>
        <button className="rounded-xl bg-deep px-6 text-sm font-semibold text-white">Search</button>
      </form>

      <div className="mt-5 rounded-2xl border border-hero/40 bg-hero-soft/60 p-5">
        <p className="flex items-center gap-2 font-semibold text-deep"><MessageSquare className="h-4 w-4" /> Ask about your meetings</p>
        <p className="mt-1 text-xs text-deep/80">Ask a question across all your meeting history</p>
        <form onSubmit={ask} className="mt-3 flex gap-2">
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What have we discussed about project X? What were our recurring issues?" className="flex-1 rounded-xl border border-hero/40 bg-white px-4 py-2.5 text-sm outline-none" />
          <button disabled={busy} className="grid w-11 place-items-center rounded-xl bg-deep text-white disabled:opacity-50"><Send className="h-4 w-4" /></button>
        </form>
        {busy && <p className="mt-3 text-sm text-deep">Thinking…</p>}
        {answer && <p className="mt-4 whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-6">{answer}</p>}
      </div>

      {hits === null ? (
        <Empty icon={SearchIcon} title="Type to search your meetings" />
      ) : hits.length === 0 ? (
        <Empty icon={SearchIcon} title="No results" />
      ) : (
        <Panel className="mt-6">
          {hits.map((h, i) => (
            <Link key={i} href={h.href} className="block border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50">
              <span className="text-xs font-semibold uppercase text-deep">{h.kind}</span>
              <p className="font-medium">{h.title}</p>
              {h.snippet && <p className="text-sm text-slate-500">{h.snippet}…</p>}
            </Link>
          ))}
        </Panel>
      )}
    </div>
  );
}
