import { RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";
import { Card } from "./ui";
const COL = ["#101B2D", "#C6F36B", "#8A929E", "#DCE9F5"];
const n = (a) => (Array.isArray(a) ? a.length : 0);
const lbl = (k) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

export function Gauge({ value, title, note = "out of 100" }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return <Card><h4 className="font-semibold">{title}</h4>
    <div className="relative h-44" role="img" aria-label={`${title}: ${v} ${note}`}>
      <ResponsiveContainer><RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ v }]} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="v" background={{ fill: "#DCE9F5" }} fill="#101B2D" cornerRadius={10} isAnimationActive={false} />
      </RadialBarChart></ResponsiveContainer>
      <div className="absolute inset-0 grid place-items-center"><div className="text-center"><div className="font-heading text-4xl font-extrabold">{v}</div><div className="text-xs text-muted">{note}</div></div></div>
    </div></Card>;
}
export function Bars({ title, data, max }) {
  return <Card><h4 className="mb-2 font-semibold">{title}</h4>
    <div className="h-44"><ResponsiveContainer><BarChart data={data} margin={{ left: -20, right: 4 }}>
      <CartesianGrid vertical={false} stroke="#DCE9F5" /><XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} /><YAxis domain={max ? [0, max] : [0, "auto"]} allowDecimals={false} tick={{ fontSize: 11 }} />
      <Tooltip cursor={{ fill: "#F7F7F2" }} /><Bar dataKey="value" fill="#101B2D" radius={[6, 6, 0, 0]} isAnimationActive={false} />
    </BarChart></ResponsiveContainer></div></Card>;
}
export function Donut({ title, data }) {
  const d = data.filter((x) => x.value > 0);
  return <Card><h4 className="mb-2 font-semibold">{title}</h4>
    <div className="h-44">{d.length ? <ResponsiveContainer><PieChart>
      <Pie data={d} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2} isAnimationActive={false}>{d.map((_, i) => <Cell key={i} fill={COL[i % 4]} stroke="#fff" />)}</Pie>
      <Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} /></PieChart></ResponsiveContainer> : <p className="text-sm text-muted">No data to chart.</p>}</div></Card>;
}

export function ToolCharts({ id, res }) {
  if (!res) return null;
  let c = null;
  if (id === "analysis") c = <>
    <Gauge value={res.atsScoreEstimate} title="ATS score (estimate)" />
    <Bars title="Evaluation summary" data={[{ name: "Strengths", value: n(res.strengths) }, { name: "Weaknesses", value: n(res.weaknesses) }, { name: "Missing", value: n(res.missingInformation) }, { name: "Fixes", value: n(res.suggestions) }]} /></>;
  if (id === "ats") c = <>
    <Gauge value={res.atsScore} title="ATS score (estimate)" />
    <Bars title="Score breakdown" max={100} data={Object.entries(res.breakdown || {}).map(([k, v]) => ({ name: lbl(k).split(" ")[0], value: Number(v) || 0 }))} /></>;
  if (id === "match") c = <>
    <Gauge value={res.matchPercent} title="Job match" note="percent" />
    <Donut title="Skill coverage" data={[{ name: "Matching", value: n(res.matchingSkills) }, { name: "Missing", value: n(res.missingSkills) }]} /></>;
  if (id === "skills") c = <>
    <Donut title="Skill distribution" data={[{ name: "On your resume", value: n(res.resumeSkills) }, { name: "Missing for the job", value: n(res.missingSkills) }]} />
    <Bars title="Learning priorities" data={["High", "Medium", "Low"].map((p) => ({ name: p, value: (res.skillsToLearn || []).filter((s) => s.priority === p).length }))} /></>;
  if (id === "interview") c = <Bars title="Questions by category" data={[["Technical", "technical"], ["HR", "hr"], ["Project", "project"], ["Resume", "resumeBased"]].map(([name, k]) => ({ name, value: n(res[k]) }))} />;
  return c ? <div className="mt-4 grid gap-4 sm:grid-cols-2">{c}</div> : null;
}
