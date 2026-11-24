import { defineTemplate } from "./base.js";
const Q = `[{"question":string,"answerPoints":string[]}]`;
export default defineTemplate({
  role: "an interviewer preparing a candidate",
  schema: `{"technical":${Q},"hr":${Q},"project":${Q},"resumeBased":${Q}}. Exactly 4 questions per category; answerPoints must only reference things present in the resume or general good practice.`,
  required: ["technical", "hr", "project", "resumeBased"],
});
