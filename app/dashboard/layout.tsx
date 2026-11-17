import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, PlusCircle, Brain, ListChecks, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/marketing";

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/dashboard/meetings/new", "New meeting", PlusCircle],
  ["/dashboard/memory", "Company Memory", Brain],
  ["/dashboard/actions", "Actions", ListChecks],
  ["/dashboard/settings", "Settings", Settings],
] as const;

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-hero-soft/40">
      <aside className="hidden w-64 shrink-0 flex-col bg-ink p-5 text-white md:flex">
        <Logo dark />
        <nav className="mt-10 space-y-1">
          {items.map(([href, label, Icon]) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-hero">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto truncate text-xs text-white/40">{user.email}</p>
      </aside>
      <div className="flex-1">
        <div className="flex gap-4 overflow-x-auto bg-ink px-4 py-3 text-sm text-white md:hidden">
          {items.map(([href, label]) => (
            <Link key={href} href={href} className="whitespace-nowrap">{label}</Link>
          ))}
        </div>
        <div className="mx-auto max-w-5xl p-6 md:p-10">{children}</div>
      </div>
    </div>
  );
}
