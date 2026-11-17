import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function PageHead({ title, sub, cta = true }: { title: string; sub?: string; cta?: boolean }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      {cta && (
        <Link href="/dashboard/meetings/new" className="shrink-0 rounded-xl bg-deep px-5 py-2.5 text-sm font-semibold text-white">
          + New Meeting
        </Link>
      )}
    </div>
  );
}

export function Empty({ icon: Icon, title, sub, action }: { icon: LucideIcon; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Icon className="h-10 w-10 text-slate-300" />
      <p className="mt-3 font-semibold text-slate-600">{title}</p>
      {sub && <p className="mt-1 text-sm text-slate-400">{sub}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
);

export const ghostBtn = "rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50";
