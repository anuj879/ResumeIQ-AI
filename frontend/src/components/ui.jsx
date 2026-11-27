
import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";

export const Card = ({ children, className = "" }) => (
  <div
    className={`glass-panel rounded-2xl p-5 shadow-card ${className}`}
  >
    {children}
  </div>
);

export const Btn = ({ variant = "dark", className = "", ...p }) => (
  <button
    {...p}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-heading text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
      variant === "lime"
        ? "crystal-button text-white hover:-translate-y-0.5"
        : variant === "ghost"
          ? "border border-white/10 bg-white/[0.035] text-white/75 hover:border-violet-300/30 hover:bg-violet-400/[0.08] hover:text-white"
          : "crystal-button text-white hover:-translate-y-0.5"
    } ${className}`}
  />
);

export const Spinner = ({ className = "" }) => (
  <span
    className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-violet-300/20 border-t-violet-300 ${className}`}
  />
);

export const ErrorBox = ({ children }) => (
  <div
    role="alert"
    className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/[0.07] p-4 text-sm leading-6 text-red-200"
  >
    <AlertCircle
      size={17}
      className="mt-0.5 shrink-0 text-red-300"
    />
    <span>{children}</span>
  </div>
);

export function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);

  const go = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <button
      onClick={go}
      aria-label="Copy to clipboard"
      className="no-print inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-xs text-white/50 transition-all hover:border-violet-300/25 hover:bg-violet-400/[0.08] hover:text-violet-200"
    >
      {ok ? <Check size={14} /> : <Copy size={14} />}
      {ok ? "Copied" : "Copy"}
    </button>
  );
}
