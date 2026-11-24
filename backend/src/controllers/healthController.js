import { config } from "../config/env.js";
export const health = (_req, res) => res.json({ ok: true, aiConfigured: Boolean(config.apiKey), model: config.model });
