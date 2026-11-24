const NET = "Cannot reach the server. Start the backend (port 3001) and retry.";
async function handle(r) {
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || "Request failed.");
  return d;
}
export const extractResume = (file, onProgress) => new Promise((resolve, reject) => {
  const form = new FormData(); form.append("resume", file);
  const x = new XMLHttpRequest();
  x.open("POST", "/api/extract");
  x.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.round((e.loaded / e.total) * 100));
  x.onload = () => {
    let d = {}; try { d = JSON.parse(x.responseText); } catch { /* ignore */ }
    x.status >= 200 && x.status < 300 ? resolve(d) : reject(new Error(d.error || "Upload failed."));
  };
  x.onerror = () => reject(new Error(NET));
  x.send(form);
});
export const runTask = (task, body) =>
  fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task, ...body }) })
    .catch(() => { throw new Error(NET); }).then(handle).then((d) => d.result);
export const health = () => fetch("/api/health").then(handle);
