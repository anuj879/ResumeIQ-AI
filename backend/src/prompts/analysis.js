import { defineTemplate } from "./base.js";
export default defineTemplate({
  role: "an expert resume reviewer",
  schema: `{"overallEvaluation":string,"atsScoreEstimate":number 0-100,"summaryFeedback":string,"skillsAnalysis":string,"educationFeedback":string,"experienceFeedback":string,"formattingFeedback":string,"strengths":string[],"weaknesses":string[],"missingInformation":string[],"suggestions":string[]}`,
  required: ["overallEvaluation", "atsScoreEstimate", "strengths", "weaknesses", "missingInformation", "suggestions"],
  scores: ["atsScoreEstimate"],
});
