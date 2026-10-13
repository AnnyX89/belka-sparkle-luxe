/**
 * SEO после сборки: для каждого адреса сохраняет готовый HTML (поисковик видит текст, заголовок и описание
 * страницы без выполнения JS), пишет sitemap.xml и robots.txt. Запуск: npm run build (вызывается сам).
 */
import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";

const SITE = "https://belkaclean74.ru";
const DIST = new URL("../dist/", import.meta.url).pathname;
const src = await readFile(new URL("../src/data/services.ts", import.meta.url), "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
const routes = ["/", ...slugs.map(s => `/uslugi/${s}`)];

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };
const shell = await readFile(join(DIST, "index.html"));
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const file = join(DIST, path);
  if (path !== "/" && existsSync(file) && extname(file)) {
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    return res.end(await readFile(file));
  }
  res.writeHead(200, { "Content-Type": "text/html" }); res.end(shell);
}).listen(4199);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/mc\.yandex\.ru|api\/site-lead/, r => r.abort());
for (const route of routes) {
  await page.goto(`http://localhost:4199${route}`, { waitUntil: "networkidle" });
  await page.evaluate((url) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = url;
    const d = document.querySelector('meta[name="description"]')?.content || "";
    for (const [k, v] of [["og:title", document.title], ["og:description", d], ["og:url", url]]) {
      let m = document.querySelector(`meta[property="${k}"]`);
      if (!m) { m = document.createElement("meta"); m.setAttribute("property", k); document.head.appendChild(m); }
      m.content = v;
    }
  }, SITE + route);
  const html = "<!doctype html>\n" + (await page.content()).replace(/^<!DOCTYPE html>/i, "");
  const dir = route === "/" ? DIST : join(DIST, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
  console.log("prerender", route, "—", await page.title());
}
await browser.close();
server.close();

const today = new Date().toISOString().slice(0, 10);
await writeFile(join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${SITE}${r}</loc><lastmod>${today}</lastmod><priority>${r === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`);
await writeFile(join(DIST, "robots.txt"), `User-agent: *
Allow: /
Disallow: /m

Sitemap: ${SITE}/sitemap.xml
`);
console.log("sitemap.xml:", routes.length, "адресов");
