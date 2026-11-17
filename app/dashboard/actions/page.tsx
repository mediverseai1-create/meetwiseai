"use client";
import { useEffect, useState } from "react";
import { CheckSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PageHead, Empty, Panel } from "@/components/ui";

type A = { id: string; text: string; owner: string | null; due: string | null; status: string };
const tabs = [["all", "All"], ["open", "Open"], ["in_progress", "In Progress"], ["completed", "Completed"]] as const;

export default function Actions() {
  const [items, setItems] = useState<A[]>([]);
  const [tab, setTab] = useState<string>("open");

  useEffect(() => {
    createClient().from("actions").select("id,text,owner,due,status").order("created_at", { ascending: false })
      .then(({ data }) => setItems(data ?? []));
  }, []);

  async function setStatus(id: string, status: string) {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    await createClient().from("actions").update({ status }).eq("id", id);
  }
  const count = (k: string) => (k === "all" ? items.length : items.filter((i) => i.status === k).length);
  const shown = tab === "all" ? items : items.filter((i) => i.status === tab);

  return (
    <div>
      <PageHead title="Action Items" cta={false} />
      <div className="mb-6 flex gap-2">
        {tabs.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-lg px-4 py-1.5 text-sm font-medium ${tab === k ? "bg-hero-soft text-deep" : "bg-white text-slate-600 ring-1 ring-slate-200"}`}>
            {l} <span className="text-slate-400">({count(k)})</span>
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <Empty icon={CheckSquare} title={`No ${tab === "all" ? "" : tab.replace("_", " ") + " "}action items`} />
      ) : (
        <Panel>
          {shown.map((a) => (
            <div key={a.id} className="flex items-center gap-4 border-b border-slate-100 px-6 py-4 last:border-0">
              <div className="flex-1">
                <p className={a.status === "completed" ? "text-slate-400 line-through" : "font-medium"}>{a.text}</p>
                <p className="text-xs text-slate-400">{a.owner}{a.due ? ` · ${a.due}` : ""}</p>
              </div>
              <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                <option value="open">Open</option><option value="in_progress">In progress</option><option value="completed">Completed</option>
              </select>
            </div>
          ))}
        </Panel>
      )}
    </div>
  );
}
