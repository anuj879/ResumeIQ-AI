
import {
  ArrowRight,
  Sparkles,
  FileSearch,
  WandSparkles,
  BriefcaseBusiness,
  ShieldCheck,
  Zap,
  Target,
  Menu,
  X,
  Gauge,
  History,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Career Dashboard",
    description:
      "Access your resume workspace and keep your career analysis organized in one place.",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    description:
      "Analyze your resume with AI and understand its strengths, weaknesses and improvement areas.",
  },
  {
    icon: Gauge,
    title: "Analysis Dashboard",
    description:
      "Review your resume analysis results and understand your ATS compatibility.",
  },
  {
    icon: WandSparkles,
    title: "Resume Improvement",
    description:
      "Improve your professional summary, experience and skills with intelligent suggestions.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Matching",
    description:
      "Compare your resume with job descriptions and discover how well your experience aligns.",
  },
  {
    icon: History,
    title: "History & Reports",
    description:
      "Access your resume analysis reports and review your saved results.",
  },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#080A17] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-700/15 blur-[130px]" />
        <div className="absolute -right-40 top-60 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute left-1/3 top-[650px] h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:65px_65px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-30 border-b border-white/[0.07] bg-[#080A17]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/30 bg-gradient-to-br from-violet-500/30 to-blue-500/20 text-violet-200 shadow-lg shadow-violet-900/30">
              <Sparkles size={21} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              ResumeIQ <span className="text-violet-400">AI</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#features" className="transition hover:text-white">Product</a>
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#how-it-works" className="transition hover:text-white">How it works</a>
            <a href="#footer" className="transition hover:text-white">Resources</a>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="#/app/overview"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Login
            </a>
            <a
              href="#/app/overview"
              className="crystal-button rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            >
              Get Started <ArrowRight className="ml-1 inline" size={15} />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="space-y-4 border-t border-white/10 bg-[#0D1021] p-5 md:hidden">
            <a onClick={() => setMenuOpen(false)} href="#features" className="block text-sm text-white/70">Features</a>
            <a onClick={() => setMenuOpen(false)} href="#how-it-works" className="block text-sm text-white/70">How it works</a>
            <a onClick={() => setMenuOpen(false)} href="#footer" className="block text-sm text-white/70">Resources</a>
            <a onClick={() => setMenuOpen(false)} href="#/app/overview" className="crystal-button block rounded-xl p-3 text-center text-sm font-semibold text-white">Get Started</a>
          </div>
        )}
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="relative mx-auto grid min-h-[690px] max-w-7xl items-center gap-14 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.08] px-4 py-2 text-xs font-medium text-violet-200">
              <Sparkles size={14} />
              YOUR AI-POWERED CAREER WORKSPACE
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight md:text-6xl lg:text-[68px]">
              Your AI workspace for{" "}
              <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                faster decisions.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/55 md:text-lg">
              A smarter way to understand your resume, improve your career
              profile and discover better job opportunities — all in one
              intelligent workspace.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#/app/overview"
                className="crystal-button group inline-flex items-center rounded-xl px-7 py-4 text-sm font-semibold text-white"
              >
                Start Exploring
                <ArrowRight className="ml-2 inline transition group-hover:translate-x-1" size={17} />
              </a>

              <a
                href="#features"
                className="rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white/85 backdrop-blur-xl transition duration-300 hover:border-violet-300/40 hover:bg-violet-400/[0.07] hover:-translate-y-0.5"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 text-xs text-white/50">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-violet-300" />
                AI-powered insights
              </span>
              <span className="flex items-center gap-2">
                <Zap size={16} className="text-blue-300" />
                Intelligent workflow
              </span>
              <span className="flex items-center gap-2">
                <Target size={16} className="text-purple-300" />
                Career-focused tools
              </span>
            </div>
          </div>

          {/* Holographic Workspace Visual */}
          <div className="relative mx-auto flex min-h-[450px] w-full max-w-xl items-center justify-center">
            <div className="absolute h-[350px] w-[350px] rounded-full bg-violet-600/20 blur-[100px]" />
            <div className="absolute h-[300px] w-[300px] rounded-full border border-violet-300/10 shadow-[0_0_90px_rgba(120,90,255,0.14)]" />
            <div className="absolute h-[235px] w-[235px] rounded-full border border-blue-300/15" />

            <div className="absolute bottom-16 h-20 w-[90%] rounded-[100%] bg-gradient-to-r from-blue-500/10 via-violet-500/35 to-pink-500/10 blur-2xl" />

            <div className="glass-panel relative z-10 w-[85%] rounded-3xl border border-violet-200/20 bg-gradient-to-br from-white/[0.10] via-[#17152F]/90 to-[#10182D]/90 p-5 shadow-[0_25px_100px_rgba(75,45,160,0.35)] backdrop-blur-2xl md:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={17} className="text-violet-300" />
                  <span className="text-sm font-semibold">AI Workspace</span>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300">
                  Ready
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/15 text-violet-200">
                      <FileSearch size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Resume Analyzer</p>
                      <p className="mt-1 text-[11px] text-white/40">Understand your profile</p>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-blue-300/15 bg-blue-400/[0.07] p-4">
                    <BriefcaseBusiness className="mb-3 text-blue-300" size={19} />
                    <p className="text-xs font-semibold">Job Matching</p>
                    <p className="mt-1 text-[10px] text-white/40">Find alignment</p>
                  </div>
                  <div className="rounded-xl border border-pink-300/15 bg-pink-400/[0.06] p-4">
                    <WandSparkles className="mb-3 text-pink-300" size={19} />
                    <p className="text-xs font-semibold">Resume Improvement</p>
                    <p className="mt-1 text-[10px] text-white/40">Refine your profile</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[10px] text-white/40">Your career workspace</span>
                <span className="text-[10px] text-violet-300">Powered by AI ✦</span>
              </div>
            </div>

            <div className="absolute -left-1 top-16 z-20 hidden animate-[float_5s_ease-in-out_infinite] rounded-xl border border-violet-200/20 bg-[#17152E]/90 p-3 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-violet-300" />
                <span className="text-xs font-medium">AI Insights</span>
              </div>
            </div>

            <div className="absolute -right-1 bottom-20 z-20 hidden animate-[float_6s_ease-in-out_infinite] rounded-xl border border-blue-200/20 bg-[#111B32]/90 p-3 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2">
                <Target size={15} className="text-blue-300" />
                <span className="text-xs font-medium">Career Growth</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20 border-t border-white/[0.07] bg-white/[0.015] px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                Everything in one place
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Your career. <span className="text-violet-300">Your intelligence.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/50">
                Explore the tools available in your workspace to analyze,
                improve and manage your resume and job applications.
              </p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass-panel group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-violet-500/[0.07] hover:shadow-[0_15px_45px_rgba(100,70,200,0.12)]"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/20">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/45">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                Simple workflow
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                From resume to <span className="text-violet-300">ready.</span>
              </h2>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                ["01", "Upload your resume", "Start by adding your existing resume to your personal workspace."],
                ["02", "Explore AI insights", "Understand your resume, discover improvements and match job descriptions."],
                ["03", "Improve your profile", "Use your analysis and reports to make informed career decisions."],
              ].map(([number, title, description]) => (
                <div key={number} className="glass-panel rounded-2xl p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25">
                  <span className="text-3xl font-bold text-violet-400/60">{number}</span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/45">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-24 md:px-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-600/20 via-[#17152D] to-blue-600/15 px-6 py-16 text-center md:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />
            <div className="relative">
              <Sparkles className="mx-auto text-violet-300" size={30} />
              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Your next opportunity starts here.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/55">
                Bring your resume, explore your possibilities and make your
                next career move with greater clarity.
              </p>
              <a
                href="#/app/overview"
                className="crystal-button mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white"
              >
                Get Started <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="relative z-10 border-t border-white/[0.08] px-5 py-9 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <a href="#/" className="text-lg font-bold">
            ResumeIQ <span className="text-violet-400">AI</span>
          </a>
          <p className="text-xs text-white/35">
            © 2026 ResumeIQ AI. Your intelligent career workspace.
          </p>
          <a href="#/app/overview" className="text-xs text-white/50 transition hover:text-violet-300">
            Open Workspace <ArrowRight className="ml-1 inline" size={13} />
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
