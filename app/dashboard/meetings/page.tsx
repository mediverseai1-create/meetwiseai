"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Video } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { PageHead, Empty, Panel, ghostBtn } from "@/components/ui";
import { meetingTypes } from "@/lib/templates";

type M = { id: string; title: string; type: string | null; status: string | null; created_at: string };
const sel = "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm";

export default function Meetings() {
  const [list, setList] = useState<M[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    createClient().from("meetings").select("id,title,type,status,created_at").order("created_at", { ascending: false })
      .then(({ data }) => setList(data ?? []));
  }, []);

  const shown = list.filter((m) =>
    m.title.toLowerCase().includes(q.toLowerCase()) && (!status || m.status === status) && (!type || m.type === type));

  return (
    <div>
      <PageHead title="Meetings" />
      <div className="mb-6 flex gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search meetings..." className="w-full py-2.5 text-sm outline-none" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={sel}>
          <option value="">All statuses</option><option value="analyzed">Analyzed</option>
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className={sel}>
          <option value="">All types</option>
          {meetingTypes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      {shown.length === 0 ? (
        <Empty icon={Video} title="No meetings found" sub="Create your first meeting to get started" action={<Link href="/dashboard/meetings/new" className={ghostBtn}>New Meeting</Link>} />
      ) : (
        <Panel>
          {shown.map((m) => (
            <Link key={m.id} href={`/dashboard/meetings/${m.id}`} className="flex items-center justify-between border-b border-slate-100 px-6 py-4 last:border-0 hover:bg-slate-50">
              <div>
                <p className="font-medium">{m.title}</p>
                <p className="text-xs text-slate-400">{meetingTypes.find((t) => t.id === m.type)?.name ?? "General"} · {new Date(m.created_at).toLocaleDateString()}</p>
              </div>
              <span className="rounded-full bg-hero-soft px-3 py-1 text-xs font-semibold text-deep">Analyzed</span>
            </Link>
          ))}
        </Panel>
      )}
    </div>
  );
}
