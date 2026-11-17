"use client";
import { useState } from "react";
import Link from "next/link";

const examples = [
  "Why did we decide not to launch the enterprise tier?",
  "Who committed to delivering the revised proposal?",
  "What risks have we identified so far?",
];

export default function Memory() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<{ id: string; title: string }[]>([]);
  const [busy, setBusy] = useState(false);

  async function ask(question: string) {
    setQ(question);
    setBusy(true);
    setAnswer("");
    const res = await fetch("/api/memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const d = await res.json();
    setAnswer(res.ok ? d.answer : d.error);
    setSources(d.sources ?? []);
    setBusy(false);
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Company Memory</h1>
      <p className="mt-1 text-slate-500">Ask anything across all your meetings.</p>
      <form onSubmit={(e) => { e.preventDefault(); ask(q); }} className="mt-6 flex gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask in plain English…" className="flex-1 rounded-full border border-black/15 bg-white px-5 py-3 outline-none focus:border-deep" />
        <button disabled={busy || !q} className="rounded-full bg-ink px-7 py-3 font-bold text-hero disabled:opacity-60">{busy ? "Thinking…" : "Ask"}</button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((e) => (
          <button key={e} onClick={() => ask(e)} className="rounded-full bg-hero-soft px-4 py-2 text-xs font-medium">{e}</button>
        ))}
      </div>
      {answer && (
        <div className="mt-8 rounded-2xl bg-ink p-6 text-white">
          <p className="whitespace-pre-wrap leading-7 text-white/90">{answer}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {sources.map((s) => (
              <Link key={s.id} href={`/dashboard/meetings/${s.id}`} className="rounded-full bg-hero/20 px-3 py-1 text-xs text-hero">{s.title}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
