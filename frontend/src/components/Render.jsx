
import { Card, CopyBtn } from "./ui";

const lbl = (k) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

const isPair = (o) =>
  o && typeof o === "object" && "original" in o && "improved" in o;

function Pair({ p }) {
  if (!p.original && !p.improved) return null;

  return (
    <div className="my-3 grid gap-3 md:grid-cols-2">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white/35" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
            Original
          </span>
        </div>

        <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
          {p.original || "Not provided"}
        </p>
      </div>

      <div className="rounded-2xl border border-violet-300/15 bg-gradient-to-br from-violet-400/[0.09] to-blue-400/[0.04] p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-300" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-200">
              Improved
            </span>
          </div>

          <CopyBtn text={p.improved} />
        </div>

        <p className="whitespace-pre-wrap text-sm leading-7 text-white/85">
          {p.improved || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export function Render({ v }) {
  if (v == null || v === "") return null;

  if (typeof v === "number") {
    return (
      <span className="bg-gradient-to-r from-violet-200 to-cyan-200 bg-clip-text font-heading text-2xl font-extrabold text-transparent">
        {v}
      </span>
    );
  }

  if (typeof v === "string") {
    return (
      <p className="whitespace-pre-wrap text-sm leading-7 text-white/70">
        {v}
      </p>
    );
  }

  if (Array.isArray(v)) {
    if (v.length && isPair(v[0])) {
      return (
        <div className="space-y-3">
          {v.map((p, i) => (
            <Pair key={i} p={p} />
          ))}
        </div>
      );
    }

    if (!v.length) {
      return (
        <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/40">
          None found.
        </p>
      );
    }

    return (
      <ul className="space-y-3">
        {v.map((x, i) => (
          <li key={i} className="flex gap-3 text-sm leading-7">
            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300/80" />

            <div className="min-w-0 flex-1 text-white/70">
              {typeof x === "object" ? <Render v={x} /> : x}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (isPair(v)) return <Pair p={v} />;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(v).map(([k, x]) => (
        <Card
          key={k}
          className={
            (Array.isArray(x) && x.length && isPair(x[0])) || isPair(x)
              ? "md:col-span-2"
              : ""
          }
        >
          <div className="mb-3 flex items-center gap-2 border-b border-white/[0.07] pb-3">
            <span className="h-2 w-2 rounded-full bg-violet-300/80" />
            <h4 className="font-semibold text-white/90">{lbl(k)}</h4>
          </div>

          <Render v={x} />
        </Card>
      ))}
    </div>
  );
}
