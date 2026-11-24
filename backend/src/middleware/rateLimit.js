import rateLimit from "express-rate-limit";
import { config } from "../config/env.js";
export const apiLimiter = rateLimit({ windowMs: 60_000, limit: config.rateLimitPerMin, standardHeaders: true, legacyHeaders: false,
  message: { error: "Too many requests. Wait a minute and try again.", code: "RATE_LIMIT" } });
