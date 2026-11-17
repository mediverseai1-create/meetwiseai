import Link from "next/link";
import { ArrowRight, FileText, Brain, Target, Mail, Database, Plus } from "lucide-react";
import { Nav, Footer, PricingCards } from "@/components/marketing";

const steps = [
  { icon: FileText, t: "Paste transcript or record audio", d: "From Zoom, Teams, Google Meet, or type notes directly" },
  { icon: Brain, t: "AI reads every signal", d: "Decisions, commitments, risks, buying signals, objections" },
  { icon: Target, t: "Intelligence is structured", d: "Named owners, deadlines, severities — nothing abstract" },
  { icon: Mail, t: "Follow-up is executed", d: "Email drafted, actions created, risks flagged automatically" },
  { icon: Database, t: "Memory grows smarter", d: "Ask questions across all meetings in plain English" },
];

const agents = [
  ["Meeting Intelligence Agent", "Extracts decisions, commitments, risks, buying signals, objections and open issues from every conversation."],
  ["Commitment Agent", "Tracks who promised what and by when, and flags anything overdue."],
  ["Follow-Up Agent", "Drafts follow-up emails and meeting recaps the moment analysis finishes."],
  ["Sales Intelligence Agent", "Detects buying signals, concerns, deal risks and customer requirements."],
  ["Risk Intelligence Agent", "Surfaces timeline, budget and relationship risks, ranked by severity."],
  ["Executive Memory Agent", "Builds persistent organizational memory and answers “why” questions about past decisions."],
];

const useCases = [
  ["Sales Calls", "Buying signals, objections and deal requirements — without manual CRM updates."],
  ["Executive Reviews", "Strategic decisions and commitments, searchable across quarters."],
  ["Project Standups", "Blockers, commitments and risks with automated status summaries."],
  ["Client Meetings", "A full history of every client request and commitment."],
  ["Product Reviews", "Feature requests, edge cases and decisions turned into a backlog."],
  ["Board Meetings", "Investor questions, board decisions and strategic commitments."],
];

const faqs = [
  ["Is MeetWiseAI just another AI transcription tool?", "No. It extracts structured intelligence — commitments, risks, buying signals, decisions — and executes follow-through, instead of only recording and summarizing."],
  ["What meeting types does MeetWiseAI support?", "All of them: sales calls, executive reviews, standups, client meetings, board sessions, product reviews and investor updates."],
  ["How does Company Memory work?", "Every analyzed meeting is indexed into a searchable memory. Ask in plain English and get AI-reasoned answers that cite specific meetings."],
  ["Do I need to record my meetings?", "No. Paste a transcript from Zoom, Teams, Google Meet, Otter or Fireflies, or type notes. In-browser audio recording is also available."],
  ["How is this different from Otter, Fireflies, or Notion AI?", "Those give you text. MeetWiseAI gives you execution: owners, risk severity, sales signals and help acting on them."],
  ["Is my meeting data private and secure?", "Yes. Row-level security means only you can access your data, and your meetings are never used to train AI models."],
  ["Can I cancel anytime?", "Yes, from settings. Your data stays accessible until the end of the billing period, with no penalties."],
  ["What languages are supported?", "English for meeting content and AI analysis today. Multi-language support is on the roadmap."],
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-hero pb-28 pt-4">
        <Nav />
        <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="font-display text-6xl leading-[0.95] md:text-8xl">
              AI that turns meetings into results.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-ink/70">
              MeetWiseAI&apos;s AI agents understand every business conversation — extracting
              decisions, tracking commitments, identifying risks, and executing follow-through
              automatically.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="rounded-full bg-ink px-8 py-4 font-bold text-hero">
                Get started free
              </Link>
              <Link href="/pricing" className="rounded-full bg-hero-soft px-8 py-4 font-bold text-ink">
                View pricing
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink/60">Free plan available · No credit card required</p>
          </div>

          <div className="rounded-[28px] bg-ink p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">AI Intelligence</p>
                <h3 className="font-display mt-1 text-xl">Q4 Strategy Review</h3>
              </div>
              <span className="rounded-full bg-hero px-3 py-1 text-xs font-bold text-ink">✓ Analyzed</span>
            </div>
            {[
              ["Commitments", "7 found", "#a78bfa", "#1d1240", ["Revised pricing model — Sarah · Oct 15", "Technical demo — Marcus · Oct 10"]],
              ["Risks", "3 found", "#fb923c", "#3a1814", ["Timeline compressed — 3 weeks to launch", "Budget approval pending sign-off"]],
              ["Decisions Made", "4 found", "#34d399", "#062b1d", ["Proceed with enterprise launch Q4", "Hire 2 engineers before November"]],
            ].map(([t, n, c, bg, items]) => (
              <div key={t as string} className="mt-3 rounded-2xl border border-white/10 p-4" style={{ background: bg as string }}>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <i className="h-2 w-2 rounded-full" style={{ background: c as string }} />
                    {t as string}
                  </span>
                  <span className="font-normal normal-case text-white/50">{n as string}</span>
                </div>
                {(items as string[]).map((i) => (
                  <p key={i} className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-xs text-white/70">{i}</p>
                ))}
              </div>
            ))}
            <div className="mt-4 flex justify-between text-xs text-white/50">
              <span>Analyzed 4 minutes ago</span>
              <span className="text-hero">View full report →</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-deep px-6 py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
            {steps.map((s, i) => (
              <div key={s.t} className="mb-3 flex items-center gap-4 rounded-2xl bg-white/10 p-4 last:mb-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-sm">{s.t}</p>
                  <p className="text-xs text-white/70">{s.d}</p>
                </div>
                <span className="text-xs font-bold text-white/40">0{i + 1}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hero-soft">How MeetWiseAI works</p>
            <h2 className="font-display mt-4 text-5xl leading-none md:text-6xl">
              From conversation to execution. Automatically.
            </h2>
            <p className="mt-6 text-lg leading-8 text-hero-soft/90">
              Five steps. Zero manual work. Every meeting becomes structured intelligence that your
              team can act on immediately.
            </p>
            <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full bg-hero px-7 py-4 font-bold text-ink">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-4xl md:text-6xl">Meetings cost more than you think.</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["71%", "of meetings end without clear next steps that actually get followed up."],
              ["$37B", "lost annually to unproductive meetings in the US alone."],
              ["3.2×", "longer to complete projects when follow-through is manual and untracked."],
            ].map(([n, d]) => (
              <div key={n} className="rounded-3xl bg-hero-soft p-8">
                <p className="font-display text-6xl text-deep">{n}</p>
                <p className="mt-4 text-ink/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="bg-ink px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-hero">AI Agent Layer</p>
          <h2 className="font-display mt-4 max-w-3xl text-5xl md:text-6xl">Six AI agents. One unified intelligence.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {agents.map(([t, d], i) => (
              <div key={t} className="rounded-3xl border border-white/10 bg-ink-2 p-7">
                <span className="font-display text-hero">0{i + 1}</span>
                <h3 className="font-display mt-3 text-lg">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="bg-hero px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-5xl md:text-6xl">Not another transcription tool.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white/50 p-8">
              <h3 className="font-display text-xl">Other tools</h3>
              <ul className="mt-5 space-y-3 text-ink/70">
                {["Record audio", "Transcribe", "Generate a summary", "List action items", "Manual follow-up", "No memory"].map((x) => (
                  <li key={x}>✕ {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-ink p-8 text-white">
              <h3 className="font-display text-xl text-hero">MeetWiseAI (Execution)</h3>
              <ul className="mt-5 space-y-3 text-white/80">
                {["Understands business meaning", "Extracts commitments & owners", "Identifies risks by severity", "Detects buying signals", "AI drafts follow-up emails", "Persistent organizational memory"].map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link href="/signup" className="rounded-full bg-ink px-8 py-4 font-bold text-hero">Try it free</Link>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-4xl md:text-6xl">Every team. Every meeting type.</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-black/10 p-7 transition hover:-translate-y-1 hover:border-hero hover:shadow-lg">
                <h3 className="font-display text-xl">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMORY */}
      <section id="memory" className="bg-deep px-6 py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hero-soft">Company Memory</p>
            <h2 className="font-display mt-4 text-5xl leading-none md:text-6xl">Your organization never forgets again.</h2>
            <p className="mt-6 text-lg leading-8 text-hero-soft/90">
              A searchable memory of every decision and commitment, with cited answers to plain-English questions.
            </p>
            <ul className="mt-6 space-y-3 text-white/85">
              {[
                "Why did we decide not to launch the enterprise tier?",
                "What did Acme Corp request in the last three meetings?",
                "Who committed to delivering the revised proposal?",
                "What risks have we identified in the infrastructure project?",
              ].map((q) => (
                <li key={q} className="rounded-xl bg-white/10 px-4 py-3 text-sm">“{q}”</li>
              ))}
            </ul>
            <Link href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full bg-hero px-7 py-4 font-bold text-ink">
              Access Company Memory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-3xl bg-ink p-6 shadow-2xl">
            <div className="flex justify-between text-sm">
              <span className="font-display">Company Memory</span>
              <span className="text-white/50">47 meetings indexed</span>
            </div>
            <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm leading-6 text-white/85">
              The enterprise tier was postponed in the Oct Board Review due to insufficient engineering
              capacity. Marcus committed to revisit after the Q1 hire (see Nov 12 Planning).
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {["Oct Board Review", "Nov 12 Planning", "+2 more"].map((c) => (
                  <span key={c} className="rounded-full bg-hero/20 px-3 py-1 text-hero">{c}</span>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[["47", "Meetings"], ["312", "Insights"], ["89", "Commitments"]].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-ink-2 p-4">
                  <p className="font-display text-2xl text-hero">{n}</p>
                  <p className="text-xs text-white/50">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-hero-soft px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-5xl md:text-6xl">Simple pricing. Real results.</h2>
          <p className="mb-14 mt-4 text-ink/70">Start free. Upgrade when you need more.</p>
          <PricingCards />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-4xl md:text-6xl">Teams that take execution seriously.</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["It eliminated the ~40% of action items we used to lose between the meeting and the follow-up email.", "Head of Operations", "SaaS company, 80 people"],
              ["Commitment tracking shows exactly who promised what across meetings — and whether it happened.", "VP of Sales", "B2B software firm"],
              ["Board meetings are archived and searchable. Decisions from the last 18 months surface in seconds.", "Chief of Staff", "Series B startup"],
            ].map(([q, r, c]) => (
              <figure key={r} className="rounded-3xl bg-hero-soft p-8">
                <blockquote className="leading-7">“{q}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <b>{r}</b>
                  <br />
                  <span className="text-ink/60">{c}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-4xl md:text-6xl">Questions? Answered.</h2>
          <div className="mt-12 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="rounded-2xl bg-ink-2 px-6 py-5">
                <summary className="flex items-center justify-between gap-4 font-semibold">
                  {q}
                  <Plus className="faq-plus h-5 w-5 shrink-0 text-hero transition" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-white/65">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero px-6 py-24 text-center">
        <h2 className="font-display mx-auto max-w-3xl text-5xl md:text-7xl">Stop losing what matters in meetings.</h2>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/signup" className="rounded-full bg-ink px-8 py-4 font-bold text-hero">Get started free</Link>
          <Link href="/pricing" className="rounded-full bg-hero-soft px-8 py-4 font-bold">View pricing</Link>
        </div>
        <p className="mt-5 text-sm text-ink/60">Free plan · No credit card · Set up in 2 minutes</p>
      </section>

      <Footer />
    </main>
  );
}
