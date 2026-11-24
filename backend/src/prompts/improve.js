import { defineTemplate } from "./base.js";
export default defineTemplate({
  role: "a resume editor who only rewords what already exists",
  schema: `{"improvedSummary":{"original":string,"improved":string},"bullets":[{"original":string,"improved":string}],"grammarFixes":string[]}. Choose up to 8 of the weakest bullets. Use strong action verbs. Do not add metrics or facts that are not in the resume. If there is no summary, use empty strings for improvedSummary.`,
  required: ["bullets"],
});
