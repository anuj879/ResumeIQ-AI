import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
export const Card = ({ children, className = "" }) => <div className={`rounded-2xl bg-white p-5 shadow-card ${className}`}>{children}</div>;
export const Btn = ({ variant = "dark", className = "", ...p }) => (
  <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-heading text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
    variant === "lime" ? "bg-lime text-navy hover:brightness-95" : variant === "ghost" ? "border border-navy/20 text-navy hover:bg-softblue" : "bg-navy text-white hover:bg-navy/90"} ${className}`} />
);
export const Spinner = ({ className = "" }) => <span className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-softblue border-t-navy ${className}`} />;
export const ErrorBox = ({ children }) => (
  <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"><AlertCircle size={16} className="mt-0.5 shrink-0" /><span>{children}</span></div>
);
export function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  const go = async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); } catch { /* clipboard blocked */ } };
  return <button onClick={go} aria-label="Copy to clipboard" className="no-print inline-flex items-center gap-1 text-xs text-muted hover:text-navy">{ok ? <Check size={14} /> : <Copy size={14} />}{ok ? "Copied" : "Copy"}</button>;
}
