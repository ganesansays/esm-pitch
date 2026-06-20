/**
 * Export all presentation slides to a single PDF (full content, no cropping).
 * Requires: npm install && npm run export:pdf
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, createReadStream } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MANIFEST = join(ROOT, "extract-from-stitch", "manifest.json");
const OUT_PDF = join(ROOT, "phoenix-digital-assistant-presentation.pdf");
const VIEWPORT_WIDTH = 1920;
const PDF_WIDTH = 960;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const EXPORT_STYLES = `
  html, body {
    overflow: visible !important;
    height: auto !important;
    min-height: auto !important;
  }
  header, footer {
    position: static !important;
  }
  main {
    overflow: visible !important;
  }
`;

function startStaticServer(root) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath = join(root, path === "/" ? "index.html" : path.replace(/^\//, ""));

      if (!filePath.startsWith(root) || !existsSync(filePath)) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const ext = extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      createReadStream(filePath).pipe(res);
    });

    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

async function getSlideFiles() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  return manifest.slides.map((_, i) => `${String(i + 1).padStart(2, "0")}.html`);
}

async function captureFullSlide(page, url) {
  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: 800,
    deviceScaleFactor: 2,
  });

  await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: EXPORT_STYLES });
  await new Promise((r) => setTimeout(r, 300));

  const height = await page.evaluate(() => {
    const el = document.documentElement;
    return Math.max(
      el.scrollHeight,
      el.offsetHeight,
      document.body.scrollHeight,
      document.body.offsetHeight
    );
  });

  await page.setViewport({
    width: VIEWPORT_WIDTH,
    height: Math.max(height, 600),
    deviceScaleFactor: 2,
  });
  await new Promise((r) => setTimeout(r, 200));

  return page.screenshot({ type: "png", fullPage: true });
}

async function main() {
  const slideFiles = await getSlideFiles();
  const { server, baseUrl } = await startStaticServer(ROOT);

  console.log(`Serving at ${baseUrl}`);
  console.log(`Exporting ${slideFiles.length} slides (full content)...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const merged = await PDFDocument.create();

  for (let i = 0; i < slideFiles.length; i++) {
    const file = slideFiles[i];
    const url = `${baseUrl}/slides/${file}`;
    console.log(`  [${i + 1}/${slideFiles.length}] ${file}`);

    const pngBytes = await captureFullSlide(page, url);
    const png = await merged.embedPng(pngBytes);
    const scale = PDF_WIDTH / png.width;
    const pdfHeight = png.height * scale;

    const pdfPage = merged.addPage([PDF_WIDTH, pdfHeight]);
    pdfPage.drawImage(png, { x: 0, y: 0, width: PDF_WIDTH, height: pdfHeight });

    console.log(`       → ${Math.round(pdfHeight)}pt tall`);
  }

  await browser.close();
  server.close();

  const outBytes = await merged.save();
  await mkdir(dirname(OUT_PDF), { recursive: true });
  await writeFile(OUT_PDF, outBytes);

  console.log(`\nSaved: ${OUT_PDF}`);
  console.log(`Pages: ${merged.getPageCount()}`);
}

main().catch((err) => {
  console.error("Export failed:", err.message || err);
  process.exit(1);
});
