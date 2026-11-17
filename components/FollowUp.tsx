"use client";
import { useState } from "react";

export default function FollowUp({ meetingId, initial }: { meetingId: string; initial: string | null }) {
  const [email, setEmail] = useState(initial ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function gen() {
    setBusy(true);
    setErr("");
    const res = await fetch("/api/followup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetingId }),
    });
    const d = await res.json();
    if (res.ok) setEmail(d.email);
    else setErr(d.error);
    setBusy(false);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">Follow-up email</h3>
        <button onClick={gen} disabled={busy} className="rounded-full bg-ink px-5 py-2 text-sm font-bold text-hero disabled:opacity-60">
          {busy ? "Drafting…" : email ? "Regenerate" : "Draft with AI"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      {email && <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{email}</pre>}
    </div>
  );
}
