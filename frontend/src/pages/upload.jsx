
import { useState } from "react";
import {
  UploadCloud,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BriefcaseBusiness,
  ChevronLeft,
  LockKeyhole,
  CheckCircle2,
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

export default function Upload({ resume, setResume, onContinue }) {
  const [role, setRole] = useState("Software Engineer");

  return (
    <div className="upload-page relative min-h-screen overflow-hidden bg-[#080A17] px-5 py-7 text-white md:px-10 md:py-10">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:65px_65px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-12 flex items-center justify-between">
          <a href="#/" className="flex items-center gap-3">
            <span className="brand-mark">
              <Sparkles size={19} />
            </span>
            <span className="text-lg font-bold">
              ResumeIQ <span className="text-violet-300">AI</span>
            </span>
          </a>

          <a
            href="#/app/overview"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ChevronLeft size={16} />
            Back to workspace
          </a>
        </header>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.08] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-violet-200">
            <Sparkles size={14} />
            YOUR NEXT STEP STARTS HERE
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Let's get to know your{" "}
            <span className="gradient-text">resume.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
            Upload your existing resume and let ResumeIQ help you understand
            your professional profile with AI-powered insights.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_300px]">
          <section className="glass-panel rounded-3xl p-5 md:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
                <UploadCloud size={21} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Upload your resume</h2>
                <p className="mt-1 text-xs text-white/40">
                  Add your latest resume to continue
                </p>
              </div>
            </div>

            <div className="upload-dropzone rounded-2xl border border-dashed border-violet-300/25 bg-violet-400/[0.035] p-3 md:p-5">
              <Uploader resume={resume} setResume={setResume} />
            </div>

            <div className="mt-7">
              <label
                htmlFor="target-role"
                className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80"
              >
                <BriefcaseBusiness size={16} className="text-violet-300" />
                Target role
              </label>

              <select
                id="target-role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#111426] px-4 py-3.5 text-sm text-white outline-none transition focus:border-violet-300/50 focus:ring-2 focus:ring-violet-400/10"
              >
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-white/35">
                Choose the role you are currently targeting.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onContinue?.(role)}
              disabled={!resume}
              className="crystal-button mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-35"
            >
              Analyze Resume
              <ArrowRight size={17} />
            </button>

            {resume && (
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 size={14} />
                Resume uploaded successfully
              </p>
            )}
          </section>

          <aside className="space-y-4">
            <div className="glass-panel rounded-3xl p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-200">
                <FileText size={19} />
              </div>
              <h3 className="font-semibold">File requirements</h3>
              <ul className="mt-4 space-y-3 text-xs text-white/50">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-violet-300" />
                  PDF format only
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-violet-300" />
                  Maximum file size: 5 MB
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-violet-300" />
                  Text-based PDF preferred
                </li>
              </ul>
            </div>

            <div className="glass-panel rounded-3xl p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-200">
                <ShieldCheck size={19} />
              </div>
              <h3 className="font-semibold">Your information</h3>
              <p className="mt-2 text-xs leading-6 text-white/45">
                Your resume text is processed by the configured AI service to
                generate analysis. Avoid uploading information you do not want
                processed by that service.
              </p>
              <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-[11px] text-white/35">
                <LockKeyhole size={13} />
                Review your document before uploading
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-10 text-center text-[11px] text-white/25">
          ResumeIQ AI · Intelligent career workspace
        </p>
      </div>
    </div>
  );
}
