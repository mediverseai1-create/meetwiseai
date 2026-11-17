"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/marketing";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setInfo("");
    const sb = createClient();
    if (mode === "signup") {
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) setErr(error.message);
      else if (!data.session) setInfo("Check your email to confirm your account.");
      else router.push("/dashboard");
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
      else router.push("/dashboard");
    }
    setBusy(false);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-hero px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <Logo />
        <h1 className="font-display mt-6 text-3xl">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {mode === "login" ? "Log in to your workspace." : "Free plan. No credit card required."}
        </p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-6 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-deep"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-3 w-full rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-deep"
        />
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        {info && <p className="mt-3 text-sm text-deep">{info}</p>}
        <button
          disabled={busy}
          className="mt-5 w-full rounded-full bg-ink py-3 font-bold text-white disabled:opacity-60"
        >
          {busy ? "…" : mode === "login" ? "Log in" : "Sign up free"}
        </button>
        <p className="mt-5 text-center text-sm text-slate-500">
          {mode === "login" ? (
            <>No account? <Link href="/signup" className="font-semibold text-deep">Sign up</Link></>
          ) : (
            <>Have an account? <Link href="/login" className="font-semibold text-deep">Log in</Link></>
          )}
        </p>
      </form>
    </main>
  );
}
