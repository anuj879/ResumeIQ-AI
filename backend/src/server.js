import app from "./app.js";
import { config } from "./config/env.js";
app.listen(config.port, () => console.log(`ResumeIQ API on :${config.port} (AI ${config.apiKey ? "configured" : "NOT configured"})`));
