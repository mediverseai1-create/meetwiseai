import Link from "next/link";
import { PageHead, Panel } from "@/components/ui";
import { templates } from "@/lib/templates";

export default function Templates() {
  return (
    <div>
      <PageHead title="Templates" sub="Meeting templates to guide your notes structure" cta={false} />
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Standard templates</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <Link key={t.id} href={`/dashboard/meetings/new?template=${t.id}`}>
            <Panel className="h-full p-6 hover:ring-2 hover:ring-hero">
              <span className="text-3xl">{t.icon}</span>
              <h3 className="mt-3 font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.sections.slice(0, 4).map((s) => <span key={s} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{s}</span>)}
                {t.sections.length > 4 && <span className="py-1 text-xs text-slate-400">+{t.sections.length - 4} more</span>}
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
