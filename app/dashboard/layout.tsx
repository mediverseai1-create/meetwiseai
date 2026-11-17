import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/Sidebar";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // If the profile migration hasn't been run, `error` is set and onboarding is skipped.
  const { data: profile, error } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
  if (!error && !profile?.full_name) redirect("/onboarding");

  async function signOut() {
    "use server";
    const sb = await createClient();
    await sb.auth.signOut();
    redirect("/");
  }

  const name = profile?.full_name || user.email!.split("@")[0];
  const links: [string, string][] = [
    ["/dashboard", "Intelligence"], ["/dashboard/meetings", "Meetings"], ["/dashboard/memory", "Memory"],
    ["/dashboard/actions", "Actions"], ["/dashboard/insights", "Insights"], ["/dashboard/notes", "Notes"],
    ["/dashboard/search", "Search"], ["/dashboard/templates", "Templates"], ["/dashboard/settings", "Settings"],
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar name={name} email={user.email ?? ""} signOut={signOut} />
      <div className="min-w-0 flex-1">
        <div className="flex gap-4 overflow-x-auto bg-white px-4 py-3 text-sm font-medium md:hidden">
          {links.map(([h, l]) => <Link key={h} href={h} className="whitespace-nowrap">{l}</Link>)}
        </div>
        <div className="mx-auto max-w-6xl p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
