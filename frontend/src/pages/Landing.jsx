import { useState } from "react";
import { FileSearch, Gauge as GaugeIcon, Briefcase, Target, Wand2, MessageSquare, Menu, X, ShieldCheck, Lock, Check } from "lucide-react";
import { Gauge, Bars } from "../components/Charts";

const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
const FEATS = [
  [FileSearch, "Resume analysis", "A clear verdict on your summary, skills, education and experience, with the gaps spelled out."],
  [GaugeIcon, "ATS estimate", "Keyword, structure and readability scores, plus the keywords worth adding."],
  [Briefcase, "Job matcher", "Paste a job description and see your match percentage, shared skills and missing terms."],
  [Target, "Skill gap analysis", "Know which missing skills to learn first, ranked by priority."],
  [Wand2, "Resume improver", "Weak bullets reworded side by side. Nothing is invented."],
  [MessageSquare, "Interview prep", "Technical, HR and project questions drawn from your own resume."],
];
const STEPS = [["Upload", "Add a text-based PDF. Text is read in memory and not stored."], ["Choose a tool", "Run the analyzer, ATS check, or paste a job description."], ["Act on it", "Copy rewrites and save a PDF report."]];
const BENEFITS = ["Scores are labelled as estimates, never promises", "Rewrites reuse your own facts, no invented experience", "No account and no resume database in this app", "Works on desktop and phone"];

export default function Landing() {
  const [open, setOpen] = useState(false);
  const links = [["features", "Features"], ["how", "How it works"], ["privacy", "Privacy"]];
  return <div>
    <nav className="sticky top-0 z-20 border-b border-navy/10 bg-off/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#/" className="font-heading text-lg font-extrabold">ResumeIQ AI</a>
        <div className="hidden items-center gap-6 text-sm md:flex">{links.map(([id, t]) => <a key={id} href={`#${id}`} onClick={go(id)} className="hover:underline">{t}</a>)}
          <a href="#/app/overview" className="rounded-lg bg-navy px-4 py-2 font-heading font-semibold text-white">Open dashboard</a></div>
        <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="space-y-3 border-t border-navy/10 px-5 py-4 md:hidden">{links.map(([id, t]) => <a key={id} href={`#${id}`} className="block text-sm" onClick={(e) => { go(id)(e); setOpen(false); }}>{t}</a>)}
        <a href="#/app/overview" className="block rounded-lg bg-navy px-4 py-2 text-center font-heading text-sm font-semibold text-white">Open dashboard</a></div>}
    </nav>

    <header className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-6xl">Your Resume.<br />Smarter. Stronger.</h1>
          <p className="mt-5 max-w-md text-lg text-softblue">Upload a PDF and get an honest review, an ATS estimate, a job match and interview questions in minutes.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#/app/overview" className="rounded-lg bg-lime px-6 py-3 font-heading font-semibold text-navy hover:brightness-95">Upload your resume</a>
            <a href="#features" onClick={go("features")} className="rounded-lg border border-white/30 px-6 py-3 font-heading font-semibold hover:bg-white/10">See what you get</a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted"><Lock size={14} /> No account. Your PDF is read in memory and not stored by this app.</p>
        </div>
        <div className="rounded-3xl bg-softblue/10 p-4 ring-1 ring-white/10">
          <div className="mb-3 flex items-center justify-between text-xs text-softblue"><span>Preview</span><span className="rounded-full bg-lime px-2 py-0.5 font-semibold text-navy">Sample data</span></div>
          <div className="grid gap-3 text-navy sm:grid-cols-2">
            <Gauge value={78} title="ATS score (estimate)" />
            <Bars title="Score breakdown" max={100} data={[{ name: "Keywords", value: 70 }, { name: "Sections", value: 88 }, { name: "Skills", value: 74 }, { name: "Readable", value: 82 }]} />
          </div>
        </div>
      </div>
    </header>

    <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-5 py-20">
      <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl">Six tools, one resume</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{FEATS.map(([I, t, d]) => (
        <div key={t} className="rounded-2xl bg-white p-6 shadow-card"><span className="grid h-10 w-10 place-items-center rounded-lg bg-lime"><I size={20} /></span><h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-navy/70">{d}</p></div>))}</div>
    </section>

    <section id="how" className="scroll-mt-16 bg-softblue/60">
      <div className="mx-auto max-w-6xl px-5 py-20"><h2 className="text-3xl font-extrabold sm:text-4xl">How it works</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">{STEPS.map(([t, d], i) => <li key={t} className="rounded-2xl bg-white p-6 shadow-card"><span className="font-heading text-3xl font-extrabold text-muted">{i + 1}</span><h3 className="mt-2 font-bold">{t}</h3><p className="mt-1 text-sm text-navy/70">{d}</p></li>)}</ol></div>
    </section>

    <section id="privacy" className="mx-auto grid max-w-6xl scroll-mt-16 gap-10 px-5 py-20 md:grid-cols-2">
      <div><ShieldCheck className="mb-3" /><h2 className="text-3xl font-extrabold">Built to be honest and private</h2>
        <p className="mt-3 text-navy/70">Your PDF is parsed in memory and discarded by this app, and the AI key lives on the server. Analysis text is sent to Google Gemini; on its free tier Google may use it to improve its products.</p></div>
      <ul className="space-y-3">{BENEFITS.map((b) => <li key={b} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card text-sm"><Check size={18} className="mt-0.5 shrink-0" />{b}</li>)}</ul>
    </section>

    <section className="px-5 pb-20"><div className="mx-auto max-w-6xl rounded-3xl bg-lime p-10 text-center">
      <h2 className="text-3xl font-extrabold">Find out what your resume is missing</h2><p className="mx-auto mt-2 max-w-md text-navy/80">It takes one PDF and a minute.</p>
      <a href="#/app/overview" className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 font-heading font-semibold text-white">Analyze my resume</a></div></section>

    <footer className="border-t border-navy/10 px-5 py-8 text-center text-sm text-muted">ResumeIQ AI. Scores are estimates and do not guarantee any hiring outcome.</footer>
  </div>;
}
