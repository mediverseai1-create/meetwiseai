"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Video, Brain, CheckSquare, Lightbulb, FileText, Search, LayoutTemplate, Settings, Plus, LogOut,
} from "lucide-react";
import { Logo } from "@/components/marketing";

const items = [
  ["/dashboard", "Intelligence", LayoutGrid],
  ["/dashboard/meetings", "Meetings", Video],
  ["/dashboard/memory", "Company Memory", Brain],
  ["/dashboard/actions", "Action Items", CheckSquare],
  ["/dashboard/insights", "Insights", Lightbulb],
  ["/dashboard/notes", "Notes", FileText],
  ["/dashboard/search", "Search", Search],
  ["/dashboard/templates", "Templates", LayoutTemplate],
] as const;

export default function Sidebar({ name, email, signOut }: { name: string; email: string; signOut: () => Promise<void> }) {
  const path = usePathname();
  const active = (h: string) => (h === "/dashboard" ? path === h : path.startsWith(h));
  return (
    <aside className="sticky top-0 hidden h-screen w-[232px] shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="border-b border-slate-100 px-5 py-5"><Logo /></div>
      <Link href="/dashboard/meetings/new" className="mx-3 mt-3 flex items-center gap-2 rounded-xl bg-deep px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90">
        <Plus className="h-4 w-4" /> New Meeting
      </Link>
      <nav className="mt-3 flex-1 space-y-1 px-3">
        {items.map(([h, l, Icon]) => (
          <Link key={h} href={h} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${active(h) ? "bg-hero-soft text-deep" : "text-slate-600 hover:bg-slate-50"}`}>
            <Icon className="h-4 w-4" /> {l}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-3">
        <Link href="/dashboard/settings" className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium ${active("/dashboard/settings") ? "bg-hero-soft text-deep" : "text-slate-600 hover:bg-slate-50"}`}>
          <Settings className="h-4 w-4" /> Settings
        </Link>
        <div className="mt-2 flex items-center gap-3 px-2 py-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-hero-soft text-sm font-semibold text-deep">{name[0]?.toUpperCase()}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
          <form action={signOut}><button title="Sign out"><LogOut className="h-4 w-4 text-slate-400" /></button></form>
        </div>
      </div>
    </aside>
  );
}
