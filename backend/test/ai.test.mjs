// Offline tests for aiService error mapping, JSON validation and request validation.
// Uses a stub for @google/genai (see test/run-with-stub.sh); a real-key smoke test is described in the README.
import assert from "node:assert/strict";
process.env.GEMINI_API_KEY = "test-key";
const { config } = await import("../src/config/env.js");
const { runAnalysis, mapApiError } = await import("../src/services/aiService.js");
const { validateAnalyze } = await import("../src/middleware/validate.js");
const { errorHandler } = await import("../src/middleware/errorHandler.js");
const { templates } = await import("../src/prompts/index.js");
const genai = await import("@google/genai");

const input = { resumeText: "x".repeat(200), jobDescription: "y".repeat(60) };
const apiErr = (status, message) => Object.assign(new Error(message), { status, name: "ApiError" });
const code = async (p) => p.then(() => "ok", (e) => e.code);
let n = 0; const t = async (name, fn) => { await fn(); n++; console.log("ok -", name); };

await t("six templates present", () => assert.deepEqual(Object.keys(templates).sort(), ["analysis", "ats", "interview", "improve", "match", "skills"].sort()));
await t("request carries JSON mime type, system prompt, key-free content", async () => {
  genai.__set(async (req) => { globalThis.__last = req; return { text: '{"atsScore":"88.4","breakdown":{"keywords":120,"readability":-5},"missingKeywordSuggestions":[]}' }; });
  const r = await runAnalysis("ats", input);
  assert.equal(r.atsScore, 88); assert.equal(r.breakdown.keywords, 100); assert.equal(r.breakdown.readability, 0);
  assert.equal(globalThis.__last.config.responseMimeType, "application/json");
  assert.match(globalThis.__last.config.systemInstruction, /ATS/); assert.equal(globalThis.__last.model, config.model);
});
await t("fenced JSON is parsed", async () => {
  genai.__set(async () => ({ text: '```json\n{"bullets":[{"original":"a","improved":"b"}]}\n```' }));
  assert.equal((await runAnalysis("improve", input)).bullets[0].improved, "b");
});
await t("invalid JSON retries once then BAD_AI_OUTPUT", async () => {
  let calls = 0; genai.__set(async () => (calls++, { text: "not json" }));
  assert.equal(await code(runAnalysis("ats", input)), "BAD_AI_OUTPUT"); assert.equal(calls, 2);
});
await t("missing required field is rejected", async () => {
  genai.__set(async () => ({ text: '{"atsScore":50}' })); assert.equal(await code(runAnalysis("ats", input)), "BAD_AI_OUTPUT");
});
await t("429 -> AI_QUOTA and is NOT retried", async () => {
  let calls = 0; genai.__set(async () => { calls++; throw apiErr(429, '{"error":{"status":"RESOURCE_EXHAUSTED"}}'); });
  assert.equal(await code(runAnalysis("ats", input)), "AI_QUOTA"); assert.equal(calls, 1);
});
await t("invalid key (400 API_KEY_INVALID) -> AI_AUTH", async () => {
  genai.__set(async () => { throw apiErr(400, "API key not valid. Please pass a valid API key. API_KEY_INVALID"); });
  assert.equal(await code(runAnalysis("ats", input)), "AI_AUTH");
});
await t("status mapping", () => {
  assert.equal(mapApiError(apiErr(401, "x")).code, "AI_AUTH"); assert.equal(mapApiError(apiErr(403, "x")).code, "AI_PERMISSION");
  assert.equal(mapApiError(apiErr(404, "x")).code, "AI_MODEL"); assert.equal(mapApiError(apiErr(503, "x")).code, "AI_OVERLOADED");
  assert.equal(mapApiError(apiErr(400, "User location is not supported")).code, "AI_REGION");
  assert.equal(mapApiError(Object.assign(new Error("t"), { name: "TimeoutError" })).status, 504);
});
await t("timeout error -> AI_TIMEOUT", async () => {
  genai.__set(async () => { throw Object.assign(new Error("The operation timed out"), { name: "TimeoutError" }); });
  assert.equal(await code(runAnalysis("ats", input)), "AI_TIMEOUT");
});
await t("blocked prompt -> AI_BLOCKED", async () => {
  genai.__set(async () => ({ text: "", promptFeedback: { blockReason: "SAFETY" } })); assert.equal(await code(runAnalysis("ats", input)), "AI_BLOCKED");
});
await t("missing key -> NO_API_KEY (no SDK call)", async () => {
  let calls = 0; genai.__set(async () => calls++); const k = config.apiKey; config.apiKey = "";
  assert.equal(await code(runAnalysis("ats", input)), "NO_API_KEY"); assert.equal(calls, 0); config.apiKey = k;
});
await t("validateAnalyze rules", () => {
  const run = (body) => { try { validateAnalyze({ body }, {}, () => {}); return "ok"; } catch (e) { return e.code; } };
  assert.equal(run({ task: "nope", resumeText: input.resumeText }), "BAD_TASK"); assert.equal(run({ task: "ats", resumeText: "short" }), "NO_RESUME");
  assert.equal(run({ task: "match", resumeText: input.resumeText }), "NO_JOB"); assert.equal(run({ task: "match", ...input }), "ok");
  assert.equal(run({ task: "__proto__", resumeText: input.resumeText }), "BAD_TASK");
});
await t("errorHandler returns message + code", () => {
  let out; const res = { status(s) { out = { s }; return this; }, json(b) { out.b = b; } };
  errorHandler(mapApiError(apiErr(429, "x")), {}, res, () => {}); assert.equal(out.s, 429); assert.equal(out.b.code, "AI_QUOTA");
});
console.log(`\n${n} tests passed`);
