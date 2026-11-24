import { Card, ErrorBox } from "../components/ui";
import { Gauge, Donut } from "../components/Charts";
import Uploader from "../components/Uploader";
import { TOOL_TABS, TABS } from "../lib/tabs";

export default function Overview({ resume, setResume, results, cfg }) {
  const score = results.ats?.atsScore ?? results.analysis?.atsScoreEstimate;
  const done = Object.keys(results);
  const sk = results.skills;
  return <div>
    <h2 className="text-2xl font-extrabold">Overview</h2>
    <div className="mt-4 space-y-3">
      {cfg === false && <ErrorBox>The backend is unreachable or GEMINI_API_KEY is not set. Add it to backend/.env and restart the server.</ErrorBox>}
      <Uploader resume={resume} setResume={setResume} />
      <p className="text-xs text-muted">Analysis sends your resume text to Google Gemini. On the free tier, Google may use submitted content to improve its products. Avoid uploading anything you would not want shared.</p>
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      <Card><h4 className="font-semibold">Status</h4><p className="mt-2 text-sm">{!resume ? "No resume uploaded" : done.length ? `${done.length} of 6 analyses done` : "Resume ready to analyze"}</p></Card>
      {score != null ? <Gauge value={score} title="Latest ATS estimate" /> : <Card><h4 className="font-semibold">Latest ATS estimate</h4><p className="mt-2 text-sm text-muted">Run the ATS checker or analyzer.</p></Card>}
      {sk ? <Donut title="Skills overview" data={[{ name: "On resume", value: sk.resumeSkills?.length || 0 }, { name: "Missing", value: sk.missingSkills?.length || 0 }]} /> : <Card><h4 className="font-semibold">Skills overview</h4><p className="mt-2 text-sm text-muted">Run the skill gap analysis.</p></Card>}
    </div>
    <Card className="mt-4"><h4 className="font-semibold">Key improvement areas</h4>
      {results.analysis?.suggestions ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{results.analysis.suggestions.slice(0, 4).map((s, i) => <li key={i}>{s}</li>)}</ul> : <p className="mt-2 text-sm text-muted">Run the resume analyzer to see these.</p>}</Card>
    <h3 className="mb-2 mt-6 font-bold">Quick access</h3>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{TOOL_TABS.map((t) => (
      <a key={t.id} href={`#/app/${t.id}`} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card transition hover:bg-softblue"><t.icon size={18} /><span className="text-sm font-medium">{t.label}</span></a>))}</div>
    <h3 className="mb-2 mt-6 font-bold">Recent activity</h3>
    {done.length ? <ul className="space-y-1 text-sm">{done.map((k) => <li key={k}>{TABS.find((t) => t.id === k)?.label} completed</li>)}</ul> : <p className="text-sm text-muted">Nothing yet. Results appear here while this tab stays open.</p>}
  </div>;
}
