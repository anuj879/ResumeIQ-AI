import "dotenv/config";
const key = (process.env.GEMINI_API_KEY || "").trim();
const groqKey = (process.env.GROQ_API_KEY || "").trim();
export const config = {
  port: Number(process.env.PORT) || 3001,
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  apiKey: key === "your_key_here" ? "" : key,
  groqApiKey: groqKey,
groqModel: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
  // the .env.example placeholder counts as "not set"
  model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
  aiTimeoutMs: Number(process.env.AI_TIMEOUT_MS) || 60000,
  rateLimitPerMin: Number(process.env.RATE_LIMIT_PER_MIN) || 30,
  maxPdfBytes: 5 * 1024 * 1024,
  maxResumeChars: 30000,
};
