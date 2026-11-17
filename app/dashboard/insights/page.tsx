import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHead, Empty, Panel } from "@/components/ui";
import type { Analysis } from "@/lib/gemini";

export default async function Insights() {
  const supabase = await createClient();
  const { data } = await supabase.from("meetings").select("id,title,created_at,analysis").order("created_at", { ascending: false });
  const rows = (data ?? []).filter((m) => m.analysis);

  return (
    <div>
      <PageHead title="Insights" sub="AI-generated analysis from your meetings" cta={false} />
      {rows.length === 0 ? (
        <Empty icon={Lightbulb} title="No insights yet" sub="Write meeting notes and click Analyze to generate insights" />
      ) : (
        <div className="space-y-4">
          {rows.map((m) => {
            const a = m.analysis as Analysis;
            return (
              <Panel key={m.id} className="p-6">
                <Link href={`/dashboard/meetings/${m.id}`} className="font-semibold text-deep">{m.title}</Link>
                <p className="mt-2 text-sm text-slate-600">{a.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {a.risks?.map((r, i) => <span key={`r${i}`} className="rounded-full bg-orange-50 px-3 py-1 text-orange-700">⚠ {r.text}</span>)}
                  {a.decisions?.map((d, i) => <span key={`d${i}`} className="rounded-full bg-hero-soft px-3 py-1 text-deep">✓ {d.text}</span>)}
                  {a.buying_signals?.map((s, i) => <span key={`b${i}`} className="rounded-full bg-sky-50 px-3 py-1 text-sky-700">★ {s}</span>)}
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
