import { Card, CopyBtn } from "./ui";
const lbl = (k) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
const isPair = (o) => o && typeof o === "object" && "original" in o && "improved" in o;
function Pair({ p }) {
  if (!p.original && !p.improved) return null;
  return <div className="my-2 grid gap-3 md:grid-cols-2">
    <div className="rounded-lg bg-off p-3"><div className="mb-1 text-xs text-muted">Original</div><p className="text-sm">{p.original}</p></div>
    <div className="rounded-lg bg-softblue p-3"><div className="mb-1 flex items-center justify-between text-xs text-muted">Improved <CopyBtn text={p.improved} /></div><p className="text-sm">{p.improved}</p></div>
  </div>;
}
export function Render({ v }) {
  if (v == null || v === "") return null;
  if (typeof v === "number") return <span className="font-heading text-2xl font-extrabold">{v}</span>;
  if (typeof v === "string") return <p className="text-sm leading-relaxed">{v}</p>;
  if (Array.isArray(v)) {
    if (v.length && isPair(v[0])) return v.map((p, i) => <Pair key={i} p={p} />);
    if (!v.length) return <p className="text-sm text-muted">None found.</p>;
    return <ul className="list-disc space-y-1 pl-5 text-sm">{v.map((x, i) => <li key={i}>{typeof x === "object" ? <Render v={x} /> : x}</li>)}</ul>;
  }
  if (isPair(v)) return <Pair p={v} />;
  return <div className="grid gap-3 md:grid-cols-2">{Object.entries(v).map(([k, x]) => (
    <Card key={k} className={Array.isArray(x) && x.length && isPair(x[0]) || isPair(x) ? "md:col-span-2" : ""}><h4 className="mb-2 font-semibold">{lbl(k)}</h4><Render v={x} /></Card>))}</div>;
}
