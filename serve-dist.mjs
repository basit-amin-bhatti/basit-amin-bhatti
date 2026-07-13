import { createReadStream, existsSync, statSync, appendFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const root = join(projectRoot, "src", "frontend", "dist");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const logFile = join(projectRoot, "static-server.log");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function log(message) {
  appendFileSync(logFile, `${new Date().toISOString()} ${message}\n`);
}

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0] || "/");
  const normalized = normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  const candidate = join(root, normalized);

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  return join(root, "index.html");
}

createServer((req, res) => {
  try {
    const file = resolveFile(req.url || "/");
    res.setHeader("Content-Type", mimeTypes[extname(file)] || "application/octet-stream");
    createReadStream(file).pipe(res);
  } catch (error) {
    res.statusCode = 500;
    res.end("Server error");
    log(`ERROR ${error instanceof Error ? error.stack : String(error)}`);
  }
}).listen(port, host, () => {
  log(`Serving ${root} at http://${host}:${port}/`);
});
