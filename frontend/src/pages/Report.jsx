import { Printer } from "lucide-react";
import { Btn } from "../components/ui";
import { ToolCharts } from "../components/Charts";
import { Render } from "../components/Render";
import { TABS } from "../lib/tabs";

export default function Report({ results, resume }) {
  const ids = TABS.filter((t) => results[t.id]).map((t) => t.id);
  if (!ids.length) return <div><h2 className="text-2xl font-extrabold">Reports</h2><p className="mt-3 text-sm text-muted">Run at least one analysis to build a report.</p></div>;
  return <div>
    <div className="no-print flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-extrabold">Reports</h2><Btn onClick={() => window.print()}><Printer size={15} /> Save as PDF</Btn></div>
    <p className="no-print mb-4 text-sm text-muted">Choose “Save as PDF” in the print dialog.</p>
    <h1 className="mb-1 text-2xl font-extrabold">ResumeIQ AI report</h1>
    <p className="mb-6 text-sm text-muted">{resume?.name} · {new Date().toLocaleDateString()} · ATS scores are estimates, not guarantees.</p>
    {ids.map((id) => <section key={id} className="mb-8 break-inside-avoid-page"><h3 className="mb-2 text-lg font-bold">{TABS.find((t) => t.id === id).label}</h3><ToolCharts id={id} res={results[id]} /><div className="mt-3"><Render v={results[id]} /></div></section>)}
  </div>;
}
