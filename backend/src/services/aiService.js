
import { GoogleGenAI } from "@google/genai";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { templates, buildUserContent } from "../prompts/index.js";

let client;

const getClient = () =>
  (client ??= new GoogleGenAI({ apiKey: config.apiKey }));
async function runGroq(t, input) {
  if (!config.groqApiKey) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.groqApiKey}`,
      },
      body: JSON.stringify({
        model: config.groqModel,
        messages: [
          { role: "system", content: t.system },
          {
            role: "user",
            content: buildUserContent(t, input),
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
        max_tokens: 8192,
      }),
      signal: AbortSignal.timeout(config.aiTimeoutMs),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error ${response.status}: ${error}`);
  }

  const result = await response.json();
  const raw = result.choices?.[0]?.message?.content;

  if (!raw) throw new Error("Groq returned an empty response");

  return parseJson(raw);
}

function parseJson(raw) {
  const s = raw.indexOf("{");
  const e = raw.lastIndexOf("}");

  if (s < 0 || e < s) throw new Error("no json");

  return JSON.parse(raw.slice(s, e + 1));
}

function validate(t, data) {
  for (const k of t.required) {
    if (!(k in data)) throw new Error("missing " + k);
  }

  for (const k of t.scores) {
    const n = Number(data[k]);

    if (!Number.isFinite(n)) {
      throw new Error("bad score " + k);
    }

    data[k] = Math.max(0, Math.min(100, Math.round(n)));
  }

  if (data.breakdown && typeof data.breakdown === "object") {
    for (const [k, v] of Object.entries(data.breakdown)) {
      data.breakdown[k] = Math.max(
        0,
        Math.min(100, Math.round(Number(v) || 0))
      );
    }
  }

  return data;
}

const isApiFailure = (e) =>
  Number.isFinite(e?.status) ||
  /^(AbortError|TimeoutError)$/.test(e?.name || "");

export function mapApiError(e) {
  const status = Number(e?.status) || 0;
  const msg = String(e?.message || "");

  if (/^(AbortError|TimeoutError)$/.test(e?.name || "")) {
    return new AppError(
      504,
      "Gemini took too long to respond. Try again.",
      "AI_TIMEOUT"
    );
  }

  if (
    status === 401 ||
    /API[_ ]KEY[_ ](INVALID|EXPIRED)|API key (not valid|expired)/i.test(msg)
  ) {
    return new AppError(
      502,
      "The Gemini API key is invalid or expired. Check GEMINI_API_KEY.",
      "AI_AUTH"
    );
  }

  if (status === 403) {
    return new AppError(
      502,
      "Gemini denied the request. Check API key permissions and API access.",
      "AI_PERMISSION"
    );
  }

  if (status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(msg)) {
    return new AppError(
      429,
      "Gemini free-tier quota or rate limit reached. Wait and retry.",
      "AI_QUOTA"
    );
  }

  if (status === 404) {
    return new AppError(
      502,
      "Gemini model not found. Check GEMINI_MODEL.",
      "AI_MODEL"
    );
  }

  if (
    status === 400 &&
    /location is not supported|FAILED_PRECONDITION/i.test(msg)
  ) {
    return new AppError(
      502,
      "The Gemini API free tier may not be available in your region.",
      "AI_REGION"
    );
  }

  if (status === 500 || status === 503) {
    return new AppError(
      503,
      "Gemini is temporarily unavailable. Try again later.",
      "AI_OVERLOADED"
    );
  }

  return new AppError(
    502,
    "The Gemini service returned an error. Try again.",
    "AI_ERROR"
  );
}

export async function runAnalysis(task, input) {
  const t = templates[task];

  if (!t) {
    throw new AppError(400, "Invalid analysis task.", "INVALID_TASK");
  }

  let geminiError = null;

  // 1. Try Gemini first
  if (config.apiKey) {
    try {
      const res = await getClient().models.generateContent({
        model: config.model,
        contents: buildUserContent(t, input),
        config: {
          systemInstruction: t.system,
          responseMimeType: "application/json",
          temperature: 0.3,
          maxOutputTokens: 8192,
          abortSignal: AbortSignal.timeout(config.aiTimeoutMs),
        },
      });

      const raw = res.text;

      if (!raw) {
        if (res.promptFeedback?.blockReason) {
          throw new AppError(
            422,
            "Gemini declined to process this content. Try a different resume or job description.",
            "AI_BLOCKED"
          );
        }

        throw new Error("Gemini returned an empty response");
      }

      return validate(t, parseJson(raw));

    } catch (e) {
      if (e instanceof AppError) throw e;

      geminiError = e;

      console.error("GEMINI FAILED - TRYING GROQ:", {
        status: e?.status,
        message: e?.message,
        name: e?.name,
      });
    }
  }

  // 2. Try Groq as fallback
  if (config.groqApiKey) {
    try {
      console.log("Using Groq fallback...");

      const result = await runGroq(t, input);

      return validate(t, result);

    } catch (e) {
      console.error("GROQ ERROR:", e?.message);

      throw new AppError(
        503,
        "AI services are temporarily unavailable. Please try again.",
        "AI_PROVIDERS_UNAVAILABLE"
      );
    }
  }

  // 3. No fallback available
  if (geminiError) {
    throw mapApiError(geminiError);
  }

  throw new AppError(
    503,
    "No AI provider is configured. Check GEMINI_API_KEY and GROQ_API_KEY.",
    "NO_AI_PROVIDER"
  );
}
