
import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle2, Sparkles } from "lucide-react";
import { extractResume } from "../api";
import { Spinner, ErrorBox } from "./ui";

export default function Uploader({ resume, setResume }) {
  const [phase, setPhase] = useState("idle"),
    [pct, setPct] = useState(0),
    [err, setErr] = useState(""),
    [drag, setDrag] = useState(false);

  const ref = useRef();

  const take = async (f) => {
    setErr("");
    if (!f) return;

    if (f.type !== "application/pdf" && !/\.pdf$/i.test(f.name))
      return setErr("Choose a PDF file.");

    if (f.size > 5 * 1024 * 1024)
      return setErr("File is over 5 MB. Compress it or remove images.");

    setPhase("up");
    setPct(0);

    try {
      const d = await extractResume(f, (p) => {
        setPct(p);
        if (p >= 100) setPhase("read");
      });

      setResume({ id: Date.now(), name: f.name, ...d });
    } catch (e) {
      setErr(e.message);
    }

    setPhase("idle");
    if (ref.current) ref.current.value = "";
  };

  const input = (
    <input
      ref={ref}
      hidden
      type="file"
      accept="application/pdf"
      onChange={(e) => take(e.target.files[0])}
    />
  );

  if (resume)
    return (
      <div className="glass-panel rounded-2xl p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/[0.09] text-violet-200">
            <FileText size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white/90">
              {resume.name}
            </div>

            <div className="mt-1 text-xs leading-5 text-white/40">
              {resume.pages} page{resume.pages > 1 ? "s" : ""},{" "}
              {resume.chars.toLocaleString()} characters read
              {resume.truncated
                ? " (trimmed to the first 30,000)"
                : ""}
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300">
              <CheckCircle2 size={13} />
              Resume uploaded successfully
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/70 transition hover:border-violet-300/30 hover:text-white disabled:opacity-40"
              onClick={() => ref.current.click()}
              disabled={phase !== "idle"}
            >
              {phase !== "idle" ? "Uploading…" : "Replace"}
            </button>

            <button
              aria-label="Remove resume"
              className="rounded-lg border border-white/[0.07] p-2 text-white/45 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
              onClick={() => setResume(null)}
            >
              <X size={17} />
            </button>
          </div>

          {input}

          {err && (
            <div className="w-full">
              <ErrorBox>{err}</ErrorBox>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          take(e.dataTransfer.files[0]);
        }}
        className={`relative overflow-hidden rounded-3xl border border-dashed p-8 text-center transition-all duration-300 md:p-10 ${
          drag
            ? "border-violet-300/70 bg-violet-400/[0.10] shadow-[0_0_35px_rgba(167,139,250,0.12)]"
            : "border-white/15 bg-white/[0.025] hover:border-violet-300/35 hover:bg-white/[0.045]"
        }`}
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/[0.13] to-blue-400/[0.07] text-violet-200 shadow-[0_0_30px_rgba(167,139,250,0.08)]">
            {phase === "idle" ? (
              <Upload size={27} />
            ) : (
              <Spinner className="h-6 w-6 border-[3px]" />
            )}
          </div>

          {phase === "idle" ? (
            <>
              <p className="text-base font-semibold text-white/90">
                Drop your resume PDF here
              </p>

              <p className="mt-2 text-sm text-white/40">
                or choose a file from your device
              </p>

              <button
                className="crystal-button mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                onClick={() => ref.current.click()}
              >
                <FileText size={16} />
                Choose PDF
              </button>
            </>
          ) : (
            <div className="mx-auto max-w-xs">
              <p className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-white/80">
                <Sparkles size={15} className="text-violet-300" />
                {phase === "up"
                  ? `Uploading ${pct}%`
                  : "Reading text from PDF…"}
              </p>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 transition-all duration-300"
                  style={{
                    width: `${phase === "up" ? pct : 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-300" />
              PDF only
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-300" />
              Up to 5 MB
            </span>
          </div>

          <p className="mt-3 text-xs text-white/30">
            Text-based PDF supported. Scanned images are not supported.
          </p>
        </div>

        {input}
      </div>

      {err && (
        <div className="mt-3">
          <ErrorBox>{err}</ErrorBox>
        </div>
      )}
    </div>
  );
}
