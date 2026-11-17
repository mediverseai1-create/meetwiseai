import Link from "next/link";
import { Check } from "lucide-react";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink">
        <span className="flex gap-[3px]">
          <i className="block h-3 w-[3px] rounded bg-hero" />
          <i className="block h-3 w-[3px] rounded bg-hero" />
        </span>
      </span>
      <span className={`font-display text-xl ${dark ? "text-white" : "text-ink"}`}>
        MeetWiseAI
      </span>
    </Link>
  );
}

export function Nav() {
  const links = [
    ["Agents", "/#agents"],
    ["How it works", "/#how"],
    ["Memory", "/#memory"],
    ["Pricing", "/pricing"],
  ];
  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1030px,calc(100%-2rem))]">
      <nav className="flex items-center justify-between rounded-full bg-white px-5 py-3 shadow-xl shadow-black/10">
        <Logo />
        <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          {links.map(([l, h]) => (
            <Link key={l} href={h} className="hover:text-ink">
              {l}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="text-slate-600 hover:text-ink">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-ink px-5 py-2.5 font-bold text-white hover:bg-ink-2"
          >
            Sign up free
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const col = (title: string, items: [string, string][]) => (
    <div>
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-hero">{title}</h4>
      <ul className="space-y-3 text-sm text-white/70">
        {items.map(([l, h]) => (
          <li key={l}>
            <Link href={h} className="hover:text-white">
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="bg-ink px-6 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            AI Meeting Execution Platform. Turning business conversations into business results.
          </p>
        </div>
        {col("Platform", [
          ["AI Agents", "/#agents"],
          ["Company Memory", "/#memory"],
          ["How it works", "/#how"],
        ])}
        {col("Product", [
          ["Pricing", "/pricing"],
          ["Sign up", "/signup"],
          ["Log in", "/login"],
        ])}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-hero">Company</h4>
          <p className="text-sm text-white/70">meetwiseai.com</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
        © 2026 MeetWiseAI. All rights reserved.
      </p>
    </footer>
  );
}

const starterLink = process.env.NEXT_PUBLIC_PAYMENT_LINK_STARTER || "/signup";
const proLink = process.env.NEXT_PUBLIC_PAYMENT_LINK_PRO || "/signup";

const plans = [
  {
    name: "Free",
    price: "$0",
    href: "/signup",
    cta: "Get started free",
    features: [
      "5 meetings / month",
      "30 min transcription",
      "10 AI requests",
      "1 GB storage",
      "Basic intelligence",
      "Company Memory (limited)",
    ],
  },
  {
    name: "Starter",
    price: "$47",
    href: starterLink,
    cta: "Get Starter",
    features: [
      "50 meetings / month",
      "600 min transcription",
      "200 AI requests",
      "10 GB storage",
      "Full intelligence suite",
      "Commitment tracking & risk detection",
      "Follow-up agent",
      "All templates",
    ],
  },
  {
    name: "Pro",
    price: "$97",
    href: proLink,
    cta: "Get Pro",
    popular: true,
    features: [
      "Unlimited meetings",
      "Unlimited transcription",
      "Unlimited AI requests",
      "100 GB storage",
      "Everything in Starter",
      "Sales intelligence agent",
      "Full Company Memory",
      "Cross-meeting AI search",
      "Priority support",
    ],
  },
];

export function PricingCards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.name}
          className={`relative flex flex-col rounded-3xl p-8 ${
            p.popular ? "bg-ink text-white ring-4 ring-hero" : "bg-white text-ink ring-1 ring-black/10"
          }`}
        >
          {p.popular && (
            <span className="absolute -top-3 left-8 rounded-full bg-hero px-3 py-1 text-xs font-bold text-ink">
              Most popular
            </span>
          )}
          <h3 className="font-display text-2xl">{p.name}</h3>
          <p className="mt-4 flex items-end gap-1">
            <span className="font-display text-5xl">{p.price}</span>
            {p.price !== "$0" && <span className="pb-2 text-sm opacity-60">/mo</span>}
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-deep" style={p.popular ? { color: "var(--hero)" } : {}} />
                <span className="opacity-85">{f}</span>
              </li>
            ))}
          </ul>
          <a
            href={p.href}
            className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-bold ${
              p.popular ? "bg-hero text-ink" : "bg-ink text-white"
            }`}
          >
            {p.cta}
          </a>
        </div>
      ))}
    </div>
  );
}
