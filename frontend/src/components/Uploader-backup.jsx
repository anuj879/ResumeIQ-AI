
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BriefcaseBusiness,
} from "lucide-react";
import Uploader from "../components/Uploader";

const roles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "AI / ML Engineer",
  "UI / UX Designer",
  "Other",
];

export default function Upload({
  resume,
  setResume,
  onContinue,
}) {
  const [role, setRole] = useState("Software Engineer");

  return (
    <div className="min-h-screen overflow-hidden bg-[#080A17] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-700/15 blur-[130px]" />
        <div className="absolute -right-40 top-60 h-96 w-96 rounded-full bg-blue-600/15 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
        {/* Header */}
        <div className="flex items-center justify-between">
          <a href="#/" className="flex items-center gap-2 text-lg font-bold">
            <Sparkles className="text-violet-300" size={22} />
            ResumeIQ <span className="text-violet-400">AI</span>
          </a>

          <a
            href="#/app/overview"
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 transition hover:border-violet-300/30 hover:text-white"
          >
            Dashboard
          </a>
        </div>

        {/* Page heading */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-900/20">
            <UploadCloud size={27} />
          </div>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
            Let's get started
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Upload Your <span className="text-violet-300">Resume</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/50 md:text-base">
            Upload your resume and let AI help you understand your
            professional profile, discover improvements and prepare
            for your next career opportunity.
          </p>
        </div>

        {/* Upload card */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-violet-300/15 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-5 shadow-[0_20px_90px_rgba(65,45,150,0.16)] backdrop-blur-2xl md:p-9">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Your Resume</h2>
              <p className="mt-1 text-xs text-white/40">
                Add your latest resume to continue
              </p>
            </div>

            <div className="rounded-lg border border-violet-300/15 bg-violet-400/10 p-2.5 text-violet-300">
              <FileText size={20} />
            </div>
          </div>

          {/* Existing functional uploader */}
          <div className="rounded-2xl border border-dashed border-violet-300/30 bg-[#101226]/80 p-3 transition hover:border-violet-300/60 md:p-5">
            <Uploader resume={resume} setResume={setResume} />
          </div>

          {/* File information */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-300" />
              Secure upload
            </span>
            <span>PDF and DOCX supported</span>
            <span>Maximum file size depends on server limits</span>
          </div>

          {/* Target role */}
          <div className="mt-9">
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <BriefcaseBusiness size={17} className="text-violet-300" />
              Target Job Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111329] px-4 py-4 text-sm text-white outline-none transition focus:border-violet-400/60"
            >
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-white/35">
              Choose the role you are targeting for your career.
            </p>
          </div>

          {/* Continue */}
          <button
            type="button"
            disabled={!resume}
            onClick={() => onContinue?.(role)}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200/30 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 px-6 py-4 text-sm font-semibold shadow-[0_8px_30px_rgba(124,80,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_40px_rgba(124,80,255,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Continue to Analysis
            <ArrowRight size={17} />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          Your career journey starts with one step.
        </p>
      </div>
    </div>
  );
}
