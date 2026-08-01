import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectDirectory = dirname(dirname(fileURLToPath(import.meta.url)));
const distDirectory = join(projectDirectory, "dist");
const serverEntry = join(projectDirectory, "dist-ssr", "entry-server.js");
const template = await readFile(join(distDirectory, "index.html"), "utf8");
const { getPageSeo, prerenderRoutes, render } = await import(
  pathToFileURL(serverEntry).href
);
const analyticsLoader = createAnalyticsLoader();

if (analyticsLoader) {
  await writeFile(join(distDirectory, "analytics.js"), analyticsLoader, "utf8");
}

for (const route of prerenderRoutes) {
  const seo = getPageSeo(route);
  const html = buildHtml(template, sanitizeAppHtml(render(route)), seo);
  const outputPath =
    route === "/"
      ? join(distDirectory, "index.html")
      : join(distDirectory, `${route.slice(1)}.html`);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

const notFoundPath = "/404";
await writeFile(
  join(distDirectory, "404.html"),
  buildHtml(
    template,
    sanitizeAppHtml(render(notFoundPath)),
    getPageSeo(notFoundPath),
  ),
  "utf8",
);

await writeFile(
  join(distDirectory, "sitemap.xml"),
  createSitemap(prerenderRoutes),
  "utf8",
);

function buildHtml(source, appHtml, seo) {
  const canonical = absoluteUrl(seo.path);
  const socialImage = absoluteUrl("/og-image.png");
  let html = source.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "name", "robots", seo.robots ?? indexableRobots());
  html = setMeta(html, "name", "googlebot", seo.robots ?? indexableRobots());
  html = setMeta(html, "property", "og:title", seo.title);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "property", "og:type", seo.type ?? "website");
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", socialImage);
  html = setMeta(html, "property", "og:image:secure_url", socialImage);
  html = setMeta(html, "name", "twitter:title", seo.title);
  html = setMeta(html, "name", "twitter:description", seo.description);
  html = setMeta(html, "name", "twitter:url", canonical);
  html = setMeta(html, "name", "twitter:image", socialImage);
  html = setLink(html, "canonical", canonical);
  html = setAlternate(html, "en", canonical);
  html = setAlternate(html, "x-default", canonical);
  html = html.replace(
    /\s*<script[^>]*data-seo-json-ld="true"[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );

  const structuredData = seo.jsonLd
    .map(
      (schema, index) =>
        `<script type="application/ld+json" data-seo-json-ld="true" id="seo-json-ld-${index + 1}">${safeJson(schema)}</script>`,
    )
    .join("\n    ");

  const verification = [
    verificationMeta("google-site-verification", process.env.GOOGLE_SITE_VERIFICATION),
    verificationMeta("msvalidate.01", process.env.BING_SITE_VERIFICATION),
  ]
    .filter(Boolean)
    .join("\n    ");

  const analytics = analyticsMarkup();
  const additions = [structuredData, verification, analytics]
    .filter(Boolean)
    .join("\n    ");

  return html.replace("</head>", `    ${additions}\n  </head>`);
}

function sanitizeAppHtml(appHtml) {
  // React 19 emits resource-hint links before fragment markup. The document
  // template already provides the LCP preload, so keeping these inside #root
  // would let the browser hoist them and cause a hydration mismatch.
  return appHtml.replace(/^(?:<link rel="preload"[^>]*>)+/i, "");
}

function setMeta(html, attribute, key, value) {
  const expression = new RegExp(
    `<meta\\s+([^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*)>`,
    "i",
  );
  const match = html.match(expression);
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return match ? html.replace(expression, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setLink(html, rel, href) {
  const expression = new RegExp(`<link\\s+[^>]*rel=["']${rel}["'][^>]*>`, "i");
  const tag = `<link rel="${rel}" href="${escapeHtml(href)}" />`;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setAlternate(html, language, href) {
  const expression = new RegExp(
    `<link\\s+[^>]*rel=["']alternate["'][^>]*hreflang=["']${escapeRegExp(language)}["'][^>]*>`,
    "i",
  );
  const tag = `<link rel="alternate" hreflang="${language}" href="${escapeHtml(href)}" />`;
  return expression.test(html)
    ? html.replace(expression, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function verificationMeta(name, value) {
  return value
    ? `<meta name="${name}" content="${escapeHtml(value)}" />`
    : "";
}

function analyticsMarkup() {
  return analyticsLoader ? '<script src="/analytics.js" defer></script>' : "";
}

function createAnalyticsLoader() {
  const output = [];
  const gaId = process.env.GA_MEASUREMENT_ID;
  const clarityId = process.env.CLARITY_PROJECT_ID;

  if (gaId) {
    const safeGaId = JSON.stringify(gaId).replace(/</g, "\\u003c");
    output.push(
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config",${safeGaId});`,
      `const gaScript=document.createElement("script");gaScript.async=true;gaScript.src="https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}";document.head.appendChild(gaScript);`,
    );
  }

  if (clarityId) {
    const safeClarityId = JSON.stringify(clarityId).replace(/</g, "\\u003c");
    output.push(
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",${safeClarityId});`,
    );
  }

  return output.join("\n");
}

function createSitemap(routes) {
  const urls = routes
    .map((route) => `  <url>\n    <loc>${escapeXml(absoluteUrl(route))}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function absoluteUrl(path) {
  return new URL(path, "https://www.basitaminbhatti.me").toString();
}

function indexableRobots() {
  return "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
