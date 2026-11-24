import { useState } from "react";
import { Btn, Card, Spinner, ErrorBox } from "../components/ui";
import { ToolCharts } from "../components/Charts";
import { Render } from "../components/Render";
import { runTask } from "../api";

export default function Tool({ tab, resume, job, setJob, results, setResults }) {
  const [busy, setBusy] = useState(false), [err, setErr] = useState("");
  const res = results[tab.id];
  const jobOk = !tab.job || job.trim().length >= 30;
  const run = async () => {
    setErr(""); setBusy(true);
    try { const r = await runTask(tab.id, { resumeText: resume.text, jobDescription: job }); setResults((p) => ({ ...p, [tab.id]: r })); }
    catch (e) { setErr(e.message); }
    setBusy(false);
  };
  if (!resume) return <div><h2 className="text-2xl font-extrabold">{tab.label}</h2>
    <Card className="mt-4 text-center"><p className="mb-3">Upload a resume to use this tool.</p><a href="#/app/overview" className="font-semibold underline">Go to Overview</a></Card></div>;
  return <div>
    <h2 className="text-2xl font-extrabold">{tab.label}</h2><p className="mb-4 text-sm text-muted">{tab.blurb}</p>
    {tab.job && <div className="mb-3"><textarea rows={7} value={job} onChange={(e) => setJob(e.target.value)} placeholder="Paste the full job description"
      className="w-full rounded-xl border border-muted/40 bg-white p-3 text-sm" />
      <div className="text-xs text-muted">{job.trim().length} characters{!jobOk && " (at least 30 needed)"}</div></div>}
    <Btn onClick={run} disabled={busy || !jobOk}>{busy ? <><Spinner /> Analyzing…</> : res ? "Run again" : `Run ${tab.label.toLowerCase()}`}</Btn>
    {busy && <p className="mt-3 text-sm text-muted">Gemini is reading your resume. This usually takes 10 to 30 seconds.</p>}
    {err && <div className="mt-3"><ErrorBox>{err} <button className="underline" onClick={run}>Retry</button></ErrorBox></div>}
    {res && !busy && <div className="mt-6"><ToolCharts id={tab.id} res={res} /><div className="mt-4"><Render v={res} /></div></div>}
  </div>;
}
