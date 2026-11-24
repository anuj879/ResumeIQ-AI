import { runAnalysis } from "../services/aiService.js";
export async function analyze(req, res) {
  const { task, resumeText, jobDescription } = req.body;
  res.json({ task, result: await runAnalysis(task, { resumeText, jobDescription }) });
}
