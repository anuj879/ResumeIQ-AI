import { defineTemplate } from "./base.js";
export default defineTemplate({
  role: "a career skills analyst",
  schema: `{"resumeSkills":string[],"requiredSkills":string[],"missingSkills":string[],"skillsToLearn":[{"skill":string,"priority":"High"|"Medium"|"Low","reason":string}]}`,
  required: ["resumeSkills", "missingSkills", "skillsToLearn"], needsJob: true,
});
