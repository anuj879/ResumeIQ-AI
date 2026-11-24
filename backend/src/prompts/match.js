import { defineTemplate } from "./base.js";
export default defineTemplate({
  role: "a recruiter comparing a resume to a job description",
  schema: `{"matchPercent":number 0-100,"matchingSkills":string[],"missingSkills":string[],"missingKeywords":string[],"relevanceAnalysis":string,"recommendations":string[]}`,
  required: ["matchPercent", "matchingSkills", "missingSkills", "recommendations"],
  scores: ["matchPercent"], needsJob: true,
});
