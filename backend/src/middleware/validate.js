import { templates } from "../prompts/index.js";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
export function validateAnalyze(req, _res, next) {
  const { task, resumeText, jobDescription } = req.body || {};
  const t = Object.hasOwn(templates, task) ? templates[task] : null;
  if (!t) throw new AppError(400, "Unknown analysis type.", "BAD_TASK");
  if (typeof resumeText !== "string" || resumeText.trim().length < 100) throw new AppError(400, "Upload a resume first.", "NO_RESUME");
  if (resumeText.length > config.maxResumeChars) throw new AppError(400, "Resume text is too long.", "RESUME_TOO_LONG");
  if (t.needsJob && (typeof jobDescription !== "string" || jobDescription.trim().length < 30))
    throw new AppError(400, "Paste a job description of at least 30 characters.", "NO_JOB");
  next();
}
