import Link from "next/link";
import { FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHead, Empty, Panel } from "@/components/ui";

export default async function Notes() {
  const supabase = await createClient();
  const { data } = await supabase.from("meetings").select("id,title,transcript,created_at").order("created_at", { ascending: false });
  const rows = data ?? [];

  return (
    <div>
      <PageHead title="Notes" />
      {rows.length === 0 ? (
        <Empty icon={FileText} title="No notes yet" sub="Notes appear here after you write them in a meeting" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((m) => (
            <Link key={m.id} href={`/dashboard/meetings/${m.id}`}>
              <Panel className="h-full p-5 hover:ring-2 hover:ring-hero">
                <p className="font-semibold">{m.title}</p>
                <p className="mt-1 text-xs text-slate-400">{new Date(m.created_at).toLocaleDateString()}</p>
                <p className="mt-3 line-clamp-4 text-sm text-slate-600">{m.transcript}</p>
              </Panel>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
