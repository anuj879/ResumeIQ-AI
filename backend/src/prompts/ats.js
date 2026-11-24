import { defineTemplate } from "./base.js";
export default defineTemplate({
  role: "an ATS compatibility evaluator. Scores are estimates, not guarantees",
  schema: `{"atsScore":number 0-100,"breakdown":{"keywords":number 0-100,"sectionOrganization":number 0-100,"skillsRelevance":number 0-100,"readability":number 0-100},"keywordEvaluation":string,"foundKeywords":string[],"missingKeywordSuggestions":string[],"issues":string[],"disclaimer":string}`,
  required: ["atsScore", "breakdown", "missingKeywordSuggestions"],
  scores: ["atsScore"],
});
