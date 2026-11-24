import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { extractResume } from "../api";
import { Spinner, ErrorBox } from "./ui";

export default function Uploader({ resume, setResume }) {
  const [phase, setPhase] = useState("idle"), [pct, setPct] = useState(0), [err, setErr] = useState(""), [drag, setDrag] = useState(false);
  const ref = useRef();
  const take = async (f) => {
    setErr("");
    if (!f) return;
    if (f.type !== "application/pdf" && !/\.pdf$/i.test(f.name)) return setErr("Choose a PDF file.");
    if (f.size > 5 * 1024 * 1024) return setErr("File is over 5 MB. Compress it or remove images.");
    setPhase("up"); setPct(0);
    try { const d = await extractResume(f, (p) => { setPct(p); if (p >= 100) setPhase("read"); }); setResume({ id: Date.now(), name: f.name, ...d }); }
    catch (e) { setErr(e.message); }
    setPhase("idle"); if (ref.current) ref.current.value = "";
  };
  const input = <input ref={ref} hidden type="file" accept="application/pdf" onChange={(e) => take(e.target.files[0])} />;
  if (resume) return <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 shadow-card">
    <FileText size={20} /><div className="min-w-0 flex-1"><div className="truncate font-medium">{resume.name}</div>
      <div className="text-xs text-muted">{resume.pages} page{resume.pages > 1 ? "s" : ""}, {resume.chars.toLocaleString()} characters read{resume.truncated ? " (trimmed to the first 30,000)" : ""}</div></div>
    <button className="text-sm underline" onClick={() => ref.current.click()} disabled={phase !== "idle"}>{phase !== "idle" ? "Uploading…" : "Replace"}</button>
    <button aria-label="Remove resume" className="rounded p-1 hover:bg-off" onClick={() => setResume(null)}><X size={18} /></button>{input}
    {err && <div className="w-full"><ErrorBox>{err}</ErrorBox></div>}
  </div>;
  return <div>
    <div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files[0]); }}
      className={`rounded-2xl border-2 border-dashed p-8 text-center transition ${drag ? "border-navy bg-softblue" : "border-muted/50 bg-white"}`}>
      <Upload className="mx-auto mb-2" />
      {phase === "idle" ? <p className="text-sm">Drop your resume PDF here or <button className="font-semibold underline" onClick={() => ref.current.click()}>choose a file</button></p>
        : <div className="mx-auto max-w-xs"><p className="mb-2 flex items-center justify-center gap-2 text-sm"><Spinner />{phase === "up" ? `Uploading ${pct}%` : "Reading text from PDF…"}</p>
          <div className="h-1.5 rounded bg-softblue"><div className="h-1.5 rounded bg-navy transition-all" style={{ width: `${phase === "up" ? pct : 100}%` }} /></div></div>}
      <p className="mt-2 text-xs text-muted">Text-based PDF, up to 5 MB. Scanned images are not supported.</p>{input}
    </div>
    {err && <div className="mt-3"><ErrorBox>{err}</ErrorBox></div>}
  </div>;
}
