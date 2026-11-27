
import { useState } from "react";
import { ToolCharts } from "../components/Charts";
import { Render } from "../components/Render";
import { runTask } from "../api";
import {
  Sparkles,
  FileText,
  AlertCircle,
  LoaderCircle,
  ArrowRight,
  RotateCw,
  ShieldCheck,
  CheckCircle2,
  WandSparkles,
} from "lucide-react";

export default function Tool({
  tab,
  resume,
  job,
  setJob,
  results,
  setResults,
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const res = results[tab.id];
  const jobOk = !tab.job || job.trim().length >= 30;

  const run = async () => {
    if (!resume?.text) {
      setErr("Please upload your resume before starting.");
      return;
    }

    setErr("");
    setBusy(true);

    try {
      const result = await runTask(tab.id, {
        resumeText: resume.text,
        jobDescription: job,
      });

      setResults((previous) => ({
        ...previous,
        [tab.id]: result,
      }));
    } catch (error) {
      setErr(error.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!resume) {
    return (
      <div className="mx-auto max-w-4xl space-y-8 py-8">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-7 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/20 to-blue-400/10 text-violet-200 shadow-lg shadow-violet-950/30">
              <FileText size={29} />
            </div>

            <p className="eyebrow mb-3">ResumeIQ Intelligence</p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {tab.label}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
              {tab.blurb}
            </p>

            <div className="mt-8 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-300/15 bg-amber-400/10 text-amber-200">
                  <AlertCircle size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Resume required</h2>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    Upload your resume first to access this AI-powered tool.
                  </p>

                  <a
                    href="#/app/overview"
                    className="crystal-button mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  >
                    Upload Resume <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-10">
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.09] via-white/[0.025] to-blue-500/[0.07] p-6 md:p-9">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs font-medium text-violet-200">
            <Sparkles size={14} />
            ResumeIQ Intelligence
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {tab.label}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
                {tab.blurb}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              AI workspace ready
            </div>
          </div>
        </div>
      </section>

      {/* Selected Resume */}
      <section className="glass-panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-violet-200">
          <FileText size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-white/35">
            Selected resume
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {resume.name || resume.fileName || "Uploaded Resume"}
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-3 py-1.5 text-xs font-medium text-emerald-300">
          <CheckCircle2 size={14} />
          Ready to process
        </div>
      </section>

      {/* Job Description */}
      {tab.job && (
        <section className="glass-panel rounded-3xl p-5 md:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10 text-blue-200">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">Job Description</h2>
              <p className="mt-1 text-sm leading-6 text-white/45">
                Paste the job description you want to compare with your resume.
              </p>
            </div>
          </div>

          <textarea
            rows={9}
            value={job}
            onChange={(event) => setJob(event.target.value)}
            placeholder="Paste the complete job description here..."
            className="mt-6 w-full resize-y rounded-2xl border border-white/10 bg-[#090c1a]/80 p-5 text-sm leading-7 text-white outline-none transition duration-300 placeholder:text-white/25 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/10"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className={jobOk ? "text-emerald-300" : "text-amber-200/70"}>
              {jobOk
                ? "Description ready"
                : "At least 30 characters required"}
            </span>
            <span className="text-white/35">
              {job.trim().length} characters
            </span>
          </div>
        </section>
      )}

      {/* Analysis Action */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[0.12] via-[#111329] to-blue-500/[0.09] p-6 md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-violet-200">
              <WandSparkles size={18} />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                AI powered processing
              </span>
            </div>

            <h2 className="text-xl font-semibold">
              {res ? "Ready for another run?" : "Ready to get started?"}
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
              AI will process your uploaded resume and generate your results.
            </p>
          </div>

          <button
            onClick={run}
            disabled={busy || !jobOk}
            className="crystal-button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Analyzing...
              </>
            ) : (
              <>
                {res ? "Run Again" : "Start Analysis"}
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>

        {busy && (
          <div className="relative mt-7 border-t border-white/10 pt-5">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300" />
            </div>
            <p className="mt-3 text-xs text-violet-200/70">
              AI is analyzing your resume. Please wait...
            </p>
          </div>
        )}
      </section>

      {/* Error */}
      {err && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.08] p-5 text-sm text-red-200">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <div className="flex-1">
            <p>{err}</p>
            <button
              onClick={run}
              disabled={busy || !jobOk}
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-red-200 underline underline-offset-4 transition hover:text-white"
            >
              <RotateCw size={13} /> Retry
            </button>
          </div>
        </div>
      )}

      {/* Actual Results */}
      {res && !busy && (
        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
                <ShieldCheck size={14} />
                Analysis completed
              </div>

              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Your Results
              </h2>

              <p className="mt-2 text-sm text-white/45">
                Generated from your uploaded resume.
              </p>
            </div>

            <button
              onClick={run}
              disabled={busy || !jobOk}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-violet-300/25 hover:bg-violet-400/[0.08] hover:text-white disabled:opacity-40"
            >
              <RotateCw size={15} />
              Run Again
            </button>
          </div>

          <div className="glass-panel overflow-hidden rounded-3xl p-5 md:p-7">
            <ToolCharts id={tab.id} res={res} />

            <div className="mt-7 border-t border-white/[0.08] pt-6">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles size={17} className="text-violet-300" />
                <h3 className="text-base font-semibold">Detailed Insights</h3>
              </div>

              <Render v={res} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


