import { GoogleGenAI } from "@google/genai";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { templates, buildUserContent } from "../prompts/index.js";

let client;
const getClient = () => (client ??= new GoogleGenAI({ apiKey: config.apiKey }));

function parseJson(raw) {
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s < 0 || e < s) throw new Error("no json");
  return JSON.parse(raw.slice(s, e + 1));
}
function validate(t, data) {
  for (const k of t.required) if (!(k in data)) throw new Error("missing " + k);
  for (const k of t.scores) {
    const n = Number(data[k]);
    if (!Number.isFinite(n)) throw new Error("bad score " + k);
    data[k] = Math.max(0, Math.min(100, Math.round(n)));
  }
  if (data.breakdown && typeof data.breakdown === "object")
    for (const [k, v] of Object.entries(data.breakdown)) data.breakdown[k] = Math.max(0, Math.min(100, Math.round(Number(v) || 0)));
  return data;
}

// The SDK throws ApiError with a numeric `status`; timeouts surface as AbortError/TimeoutError.
const isApiFailure = (e) => Number.isFinite(e?.status) || /^(AbortError|TimeoutError)$/.test(e?.name || "");

export function mapApiError(e) {
  const status = Number(e?.status) || 0, msg = String(e?.message || "");
  if (/^(AbortError|TimeoutError)$/.test(e?.name || "")) return new AppError(504, "Gemini took too long to respond. Try again.", "AI_TIMEOUT");
  if (status === 401 || /API[_ ]KEY[_ ](INVALID|EXPIRED)|API key (not valid|expired)/i.test(msg))
    return new AppError(502, "The Gemini API key is invalid or expired. Create a key at aistudio.google.com/apikey and set GEMINI_API_KEY in backend/.env.", "AI_AUTH");
  if (status === 403) return new AppError(502, "Gemini denied the request (permission denied). Check that the key is active and the Gemini API is enabled for it.", "AI_PERMISSION");
  if (status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(msg))
    return new AppError(429, "Gemini free-tier quota or rate limit reached. Wait a minute and retry. If it keeps failing, the daily quota is used up; it resets later, or set GEMINI_MODEL=gemini-3.5-flash-lite.", "AI_QUOTA");
  if (status === 404) return new AppError(502, "Gemini model not found. Check GEMINI_MODEL in backend/.env.", "AI_MODEL");
  if (status === 400 && /location is not supported|FAILED_PRECONDITION/i.test(msg))
    return new AppError(502, "The Gemini API free tier is not available in your region.", "AI_REGION");
  if (status === 500 || status === 503) return new AppError(503, "Gemini is overloaded right now. Try again in a moment.", "AI_OVERLOADED");
  return new AppError(502, "The Gemini service returned an error. Try again.", "AI_ERROR");
}

export async function runAnalysis(task, input) {
  if (!config.apiKey) throw new AppError(503, "GEMINI_API_KEY is missing. Add it to backend/.env and restart the server.", "NO_API_KEY");
  const t = templates[task];
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await getClient().models.generateContent({
        model: config.model,
        contents: buildUserContent(t, input),
        config: {
          systemInstruction: t.system,
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 8192, // thinking tokens count toward this limit
          abortSignal: AbortSignal.timeout(config.aiTimeoutMs),
        },
      });
      const raw = res.text;
      if (!raw) {
        if (res.promptFeedback?.blockReason) throw new AppError(422, "Gemini declined to process this content. Try a different resume or job description.", "AI_BLOCKED");
        throw new Error("empty response");
      }
      return validate(t, parseJson(raw));
    } catch (e) {
      if (e instanceof AppError) throw e;
      if (isApiFailure(e)) { console.error("AI error", task, e.status || e.name); throw mapApiError(e); } // never log content
      if (attempt === 1) throw new AppError(502, "The AI returned an unexpected response. Try again.", "BAD_AI_OUTPUT");
    }
  }
}
