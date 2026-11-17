import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const starter = process.env.NEXT_PUBLIC_PAYMENT_LINK_STARTER || "/pricing";
const pro = process.env.NEXT_PUBLIC_PAYMENT_LINK_PRO || "/pricing";

export default async function Settings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user!.id).maybeSingle();

  async function signOut() {
    "use server";
    const sb = await createClient();
    await sb.auth.signOut();
    redirect("/");
  }

  const withEmail = (url: string) =>
    url.startsWith("http") ? `${url}${url.includes("?") ? "&" : "?"}prefilled_email=${encodeURIComponent(user!.email ?? "")}` : url;

  return (
    <div>
      <h1 className="font-display text-3xl">Settings</h1>
      <div className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Email</p>
        <p className="font-semibold">{user!.email}</p>
        <p className="pt-2 text-sm text-slate-500">Current plan</p>
        <p className="font-display text-2xl capitalize text-deep">{profile?.plan ?? "free"}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href={withEmail(starter)} className="rounded-full bg-hero-soft px-5 py-2.5 text-sm font-bold">Upgrade to Starter — $47</a>
          <a href={withEmail(pro)} className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-hero">Upgrade to Pro — $97</a>
        </div>
      </div>
      <form action={signOut} className="mt-6">
        <button className="rounded-full border border-black/20 px-6 py-2.5 text-sm font-semibold">Sign out</button>
      </form>
    </div>
  );
}
