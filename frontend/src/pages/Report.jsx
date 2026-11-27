
import { Printer, FileText, Sparkles, ShieldCheck } from "lucide-react";
import { Btn } from "../components/ui";
import { ToolCharts } from "../components/Charts";
import { Render } from "../components/Render";
import { TABS } from "../lib/tabs";

export default function Report({ results, resume }) {
  const ids = TABS.filter((t) => results[t.id]).map((t) => t.id);

  if (!ids.length) {
    return (
      <div className="mx-auto max-w-4xl py-8">
        <div className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

          <div className="relative">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
              <FileText size={26} />
            </div>

            <p className="eyebrow">ResumeIQ Intelligence</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Your Reports
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-white/50">
              Your generated analysis reports will appear here. Run an
              analysis to create your first report.
            </p>

            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
              <Sparkles size={19} className="shrink-0 text-violet-300" />
              <p className="text-xs leading-6 text-white/45">
                Your results will be collected here in one convenient place.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-10">
      {/* Report Header */}
      <section className="no-print relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.08] p-6 md:p-9">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.08] px-3 py-1.5 text-xs font-medium text-violet-200">
            <Sparkles size={14} />
            ResumeIQ Intelligence
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                History & Reports
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                Your generated resume insights and analysis results, organized
                in one workspace.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="crystal-button inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            >
              <Printer size={17} />
              Save as PDF
            </button>
          </div>
        </div>
      </section>

      {/* Report Information */}
      <section className="glass-panel rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-violet-200">
            <FileText size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-white/35">
              Report generated for
            </p>
            <h2 className="mt-1 truncate text-base font-semibold">
              {resume?.name || "Uploaded Resume"}
            </h2>
            <p className="mt-1 text-xs text-white/40">
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
            <ShieldCheck size={14} />
            {ids.length} completed {ids.length === 1 ? "analysis" : "analyses"}
          </div>
        </div>
      </section>

      {/* Printable Report */}
      <div className="print-report space-y-7">
        <div className="hidden print:block">
          <h1 className="text-2xl font-bold">ResumeIQ AI Report</h1>
          <p className="mt-2 text-sm">
            {resume?.name || "Uploaded Resume"} ·{" "}
            {new Date().toLocaleDateString()}
          </p>
          <p className="mt-2 text-xs">
            ATS scores are estimates, not guarantees.
          </p>
        </div>

        <div className="no-print flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Generated Insights</h2>
            <p className="mt-1 text-xs text-white/40">
              Results from your completed analyses
            </p>
          </div>

          <span className="text-xs text-violet-300">
            {ids.length} {ids.length === 1 ? "Report" : "Reports"}
          </span>
        </div>

        {ids.map((id, index) => {
          const tab = TABS.find((t) => t.id === id);

          return (
            <section
              key={id}
              className="glass-panel break-inside-avoid-page overflow-hidden rounded-3xl p-5 md:p-7"
            >
              <div className="mb-6 flex items-center gap-4 border-b border-white/[0.08] pb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10 text-sm font-bold text-violet-200">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                    Analysis Report
                  </p>
                  <h3 className="mt-1 text-lg font-bold">
                    {tab?.label || id}
                  </h3>
                </div>
              </div>

              <ToolCharts id={id} res={results[id]} />

              <div className="mt-6 border-t border-white/[0.08] pt-6">
                <Render v={results[id]} />
              </div>
            </section>
          );
        })}

        <p className="no-print text-center text-xs text-white/30">
          ResumeIQ AI · Your intelligent career workspace
        </p>
      </div>

      <p className="no-print text-xs leading-6 text-white/35">
        To export your report, select “Save as PDF” in the browser print dialog.
        ATS scores are estimates, not guarantees.
      </p>
    </div>
  );
}
