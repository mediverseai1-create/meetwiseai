"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Action = { id: string; text: string; owner: string | null; due: string | null; done: boolean };

export default function Actions() {
  const [items, setItems] = useState<Action[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    createClient()
      .from("actions")
      .select("id,text,owner,due,done")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems(data ?? []);
        setLoaded(true);
      });
  }, []);

  async function toggle(a: Action) {
    setItems((p) => p.map((x) => (x.id === a.id ? { ...x, done: !x.done } : x)));
    await createClient().from("actions").update({ done: !a.done }).eq("id", a.id);
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Commitments</h1>
      <p className="mt-1 text-slate-500">Everything your team promised, across all meetings.</p>
      <div className="mt-6 space-y-3">
        {loaded && items.length === 0 && <p className="rounded-2xl bg-white p-6 text-slate-500">No commitments yet.</p>}
        {items.map((a) => (
          <label key={a.id} className="flex cursor-pointer items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <input type="checkbox" checked={a.done} onChange={() => toggle(a)} className="h-5 w-5 accent-[#0b7a4b]" />
            <span className={`flex-1 ${a.done ? "text-slate-400 line-through" : ""}`}>{a.text}</span>
            <span className="text-xs text-slate-500">{a.owner}{a.due ? ` · ${a.due}` : ""}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
