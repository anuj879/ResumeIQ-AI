
import { TABS } from "../lib/tabs";
import { Gauge } from "../components/Charts";
import Uploader from "../components/Uploader";
import {
  AlertCircle,
  ArrowUpRight,
  FileText,
  Sparkles,
  CheckCircle2,
  Activity,
  UploadCloud,
} from "lucide-react";

export default function Overview({ resume, setResume, results, cfg }) {
  const score =
    results.ats?.atsScore ?? results.analysis?.atsScoreEstimate;

  const done = Object.keys(results);
  const suggestions = results.analysis?.suggestions || [];

  const quickLinks = TABS.filter(
    (tab) => !["overview", "history"].includes(tab.id)
  );

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.13] via-[#111329] to-blue-500/[0.08] p-6 md:p-9">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />

        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
            <Sparkles size={13} />
            Your AI Career Workspace
          </div>

          <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Welcome to your{" "}
            <span className="gradient-text">workspace.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
            Analyze your resume, discover opportunities to improve and take
            your next career step with confidence.
          </p>

          <a
            href="#/app/upload"
            className="crystal-button mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            <UploadCloud size={16} />
            Upload resume
            <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {cfg === false && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-4 text-sm text-red-200">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">AI service unavailable</p>
            <p className="mt-1 text-red-200/70">
              Check your backend connection and AI service configuration.
            </p>
          </div>
        </div>
      )}

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">GET STARTED</p>
            <h2 className="mt-2 text-xl font-bold">Your resume</h2>
            <p className="mt-1 text-sm text-white/45">
              Upload or update your resume to continue.
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-400/[0.08] text-violet-200">
            <FileText size={21} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#090b18]/60 p-3 md:p-5">
          <Uploader resume={resume} setResume={setResume} />
        </div>

        <p className="mt-4 text-xs leading-5 text-white/35">
          Your resume text is sent to the configured AI service for analysis.
          Avoid uploading information you do not want processed.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">AT A GLANCE</p>
            <h2 className="mt-2 text-xl font-bold">Your overview</h2>
          </div>
          <Activity size={19} className="text-violet-300/70" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/45">Resume status</span>
              <FileText size={19} className="text-violet-300" />
            </div>
            <p className="mt-5 text-2xl font-bold">
              {resume ? "Uploaded" : "Not uploaded"}
            </p>
            <p className="mt-2 text-xs text-white/35">
              {resume
                ? "Your resume is ready for analysis."
                : "Upload a resume to get started."}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/45">Completed tools</span>
              <CheckCircle2 size={19} className="text-emerald-300" />
            </div>
            <p className="mt-5 text-3xl font-bold tabular-nums">
              {done.length}
            </p>
            <p className="mt-2 text-xs text-white/35">
              Analyses completed in this session.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/45">ATS estimate</span>
              <Sparkles size={19} className="text-blue-300" />
            </div>
            {score != null ? (
              <div className="mt-3">
                <Gauge value={score} title="Latest ATS estimate" />
              </div>
            ) : (
              <>
                <p className="mt-5 text-xl font-bold">Not available</p>
                <p className="mt-2 text-xs text-white/35">
                  Run your resume analysis to see your estimate.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-400/[0.08] text-violet-200">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-bold">Improvement insights</h2>
            <p className="mt-1 text-xs text-white/40">
              Suggestions from your actual resume analysis.
            </p>
          </div>
        </div>

        {suggestions.length > 0 ? (
          <ul className="mt-5 space-y-3">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <li
                key={index}
                className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-sm leading-6 text-white/70"
              >
                <CheckCircle2
                  size={17}
                  className="mt-1 shrink-0 text-violet-300"
                />
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-white/10 p-5 text-sm leading-6 text-white/40">
            Your personalized improvement suggestions will appear here after
            running the resume analyzer.
          </p>
        )}
      </section>

      <section>
        <div className="mb-4">
          <p className="eyebrow">YOUR TOOLS</p>
          <h2 className="mt-2 text-xl font-bold">Explore your workspace</h2>
          <p className="mt-1 text-sm text-white/40">
            Open an existing workspace.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((tab) => {
            const Icon = tab.icon;

            return (
              <a
                key={tab.id}
                href={`#/app/${tab.id}`}
                className="glass-panel group flex items-center gap-3 rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-violet-400/[0.05]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-400/[0.08] text-violet-200">
                  <Icon size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className="mt-1 text-xs text-white/35">
                    Open workspace
                  </p>
                </div>
                <ArrowUpRight
                  size={17}
                  className="text-white/25 transition group-hover:text-violet-200"
                />
              </a>
            );
          })}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5 md:p-6">
        <h2 className="font-bold">Recent activity</h2>
        {done.length ? (
          <div className="mt-4 space-y-3">
            {done.map((id) => (
              <div
                key={id}
                className="flex items-center justify-between border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm text-white/70">
                  {TABS.find((tab) => tab.id === id)?.label || id}
                </span>
                <span className="text-xs text-emerald-300">Completed</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-white/40">
            No activity yet. Your completed analyses will appear here.
          </p>
        )}
      </section>
    </div>
  );
}

