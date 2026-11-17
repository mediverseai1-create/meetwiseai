"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const roles = ["Founder / CEO", "Executive", "Sales", "Product", "Engineering", "Operations", "Marketing", "Consultant", "Other"];
const useCases = ["Sales calls", "Executive reviews", "Project standups", "Client meetings", "Product reviews", "Board meetings", "Other"];
const field = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-deep";

export default function Onboarding() {
  const router = useRouter();
  const [f, setF] = useState({ full_name: "", company: "", role: "", country: "", use_case: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const sb = createClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return router.push("/login");
    const { error } = await sb.from("profiles").upsert({ id: user.id, ...f });
    if (error) {
      setErr(error.message);
      setBusy(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-center">
      <h1 className="font-display text-3xl">Welcome to MeetWiseAI</h1>
      <p className="mt-1 text-sm text-slate-500">Tell us a bit about yourself to get started</p>
      <form onSubmit={submit} className="mx-auto mt-8 max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm">
        <label className="text-sm font-semibold">Full name
          <input required value={f.full_name} onChange={set("full_name")} className={field} />
        </label>
        <label className="mt-5 block text-sm font-semibold">Company or organization
          <input value={f.company} onChange={set("company")} placeholder="Acme Inc." className={field} />
        </label>
        <label className="mt-5 block text-sm font-semibold">Your role
          <select required value={f.role} onChange={set("role")} className={field}>
            <option value="">Select your role</option>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label className="mt-5 block text-sm font-semibold">Country
          <input value={f.country} onChange={set("country")} placeholder="United States" className={field} />
        </label>
        <label className="mt-5 block text-sm font-semibold">Primary use case
          <select required value={f.use_case} onChange={set("use_case")} className={field}>
            <option value="">Select your primary use case</option>
            {useCases.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="mt-6 w-full rounded-xl bg-deep py-3 font-semibold text-white disabled:opacity-60">
          {busy ? "Saving…" : "Go to MeetWiseAI"}
        </button>
      </form>
    </main>
  );
}
