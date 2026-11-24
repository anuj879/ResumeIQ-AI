export const RULES = `Rules: base everything ONLY on the resume text provided. Never invent achievements, employers, degrees, metrics or experience. Respond with a single valid JSON object and nothing else (no markdown fences, no commentary).`;

// A template = system prompt + the JSON keys validated before anything reaches the client.
export const defineTemplate = ({ role, schema, required, scores = [], needsJob = false }) => ({
  needsJob, required, scores,
  system: `You are ${role}. ${RULES}\nJSON shape: ${schema}`,
});

export const buildUserContent = (t, { resumeText, jobDescription }) =>
  `<resume>\n${resumeText}\n</resume>` + (t.needsJob ? `\n<job_description>\n${jobDescription.slice(0, 8000)}\n</job_description>` : "");
