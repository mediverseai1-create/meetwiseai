"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Square } from "lucide-react";

type SR = { start(): void; stop(): void; continuous: boolean; interimResults: boolean; lang: string; onresult: ((e: any) => void) | null; onend: (() => void) | null };

export default function NewMeeting() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [rec, setRec] = useState(false);
  const recog = useRef<SR | null>(null);

  function toggleRecord() {
    if (rec) {
      recog.current?.stop();
      return;
    }
    const W = window as any;
    const Ctor = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!Ctor) return setErr("Live recording isn't supported in this browser. Paste a transcript instead.");
    const r: SR = new Ctor();
    r.continuous = true;
    r.interimResults = false;
    r.lang = "en-US";
    r.onresult = (e: any) => {
      let t = "";
      for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript + " ";
      setTranscript((p) => p + t);
    };
    r.onend = () => setRec(false);
    r.start();
    recog.current = r;
    setRec(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, transcript }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "Something went wrong.");
      setBusy(false);
      return;
    }
    router.push(`/dashboard/meetings/${data.id}`);
  }

  return (
    <form onSubmit={submit}>
      <h1 className="font-display text-3xl">New meeting</h1>
      <p className="mt-1 text-slate-500">Paste a transcript or record audio. Our agents do the rest.</p>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Meeting title (e.g. Q4 Strategy Review)" className="mt-6 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-deep" />
      <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={16} placeholder="Paste transcript from Zoom, Teams, Google Meet — or type notes…" className="mt-3 w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-deep" />
      {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={toggleRecord} className="flex items-center gap-2 rounded-full bg-hero-soft px-6 py-3 font-bold">
          {rec ? <><Square className="h-4 w-4" /> Stop recording</> : <><Mic className="h-4 w-4" /> Record audio</>}
        </button>
        <button disabled={busy} className="rounded-full bg-ink px-8 py-3 font-bold text-hero disabled:opacity-60">
          {busy ? "Analyzing…" : "Analyze meeting"}
        </button>
      </div>
    </form>
  );
}
