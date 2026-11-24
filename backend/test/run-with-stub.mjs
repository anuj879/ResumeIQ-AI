// Cross-platform runner: copies src + tests to a temp dir with a stub of @google/genai, then runs the tests.
import { mkdtempSync, mkdirSync, cpSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const d = mkdtempSync(join(tmpdir(), "riq-"));
cpSync(join(root, "src"), join(d, "src"), { recursive: true });
cpSync(join(root, "test"), join(d, "test"), { recursive: true });
const pkg = (name, extra = {}) => { const p = join(d, "node_modules", ...name.split("/")); mkdirSync(p, { recursive: true }); writeFileSync(join(p, "package.json"), JSON.stringify({ name, type: "module", main: "index.js", exports: { ".": "./index.js", "./config": "./index.js" }, ...extra })); return p; };
writeFileSync(join(pkg("@google/genai"), "index.js"),
  `let impl; export const __set = (f) => { impl = f; };
export class GoogleGenAI { constructor(o) { if (!o.apiKey) throw new Error("no key"); this.models = { generateContent: (r) => impl(r) }; } }`);
writeFileSync(join(pkg("dotenv"), "index.js"), "");
writeFileSync(join(d, "package.json"), '{"type":"module"}');
const r = spawnSync(process.execPath, ["test/ai.test.mjs"], { cwd: d, stdio: "inherit" });
process.exit(r.status ?? 1);
