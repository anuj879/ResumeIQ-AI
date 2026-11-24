export const notFound = (_req, res) => res.status(404).json({ error: "Route not found.", code: "NOT_FOUND" });
export function errorHandler(err, _req, res, _next) {
  if (err.type === "entity.too.large") return res.status(413).json({ error: "Request is too large.", code: "TOO_LARGE" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON body.", code: "BAD_JSON" });
  if (!err.status) console.error("Unhandled error:", err.message); // never log request bodies
  res.status(err.status || 500).json({ error: err.status ? err.message : "Unexpected server error.", code: err.code || "SERVER_ERROR" });
}
