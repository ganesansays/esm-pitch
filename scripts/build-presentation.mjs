/**
 * Build a navigable presentation from extract-from-stitch HTML (unchanged).
 */
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const EXTRACT_DIR = join(ROOT, "extract-from-stitch");
const SLIDES_DIR = join(ROOT, "slides");
const OUT_INDEX = join(ROOT, "index.html");
const MANIFEST = join(EXTRACT_DIR, "manifest.json");

async function collectSlides() {
  if (!existsSync(MANIFEST)) {
    throw new Error("extract-from-stitch/manifest.json not found");
  }

  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  const slides = manifest.slides.map((s, i) => {
    const src = join(EXTRACT_DIR, s.file);
    if (!existsSync(src)) {
      throw new Error(`Missing Stitch export: ${s.file}`);
    }
    const destName = `${String(i + 1).padStart(2, "0")}.html`;
    return { src, destName, title: s.title };
  });

  return slides;
}

function buildIndex(slides) {
  const total = slides.length;
  const slideList = slides
    .map(
      (s, i) =>
        `    { file: "slides/${s.destName}", title: ${JSON.stringify(s.title)} }`
    )
    .join(",\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Phoenix Digital Assistant — Presentation</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; overflow: hidden; background: #101415; font-family: system-ui, sans-serif; }
    #frame { width: 100%; height: 100%; border: none; display: block; }
    .bar {
      position: fixed; bottom: 0; left: 0; right: 0;
      display: flex; align-items: center; justify-content: center; gap: 12px;
      padding: 10px 16px;
      background: rgba(16, 20, 21, 0.85); backdrop-filter: blur(8px);
      border-top: 1px solid #44474d;
      z-index: 10; opacity: 0; transition: opacity 0.3s;
    }
    body:hover .bar, .bar:focus-within { opacity: 1; }
    .bar button {
      background: rgba(255,255,255,0.08); border: 1px solid #44474d; color: #e0e3e5;
      width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 18px;
    }
    .bar button:hover { background: rgba(0, 219, 231, 0.15); border-color: #00dbe7; color: #00dbe7; }
    .bar button:disabled { opacity: 0.3; cursor: default; }
    .counter { color: #c5c6cd; font-size: 13px; min-width: 80px; text-align: center; font-variant-numeric: tabular-nums; }
    .progress { position: fixed; top: 0; left: 0; height: 2px; background: #00dbe7; z-index: 10; transition: width 0.3s; }
  </style>
</head>
<body>
  <div class="progress" id="progress"></div>
  <iframe id="frame" title="Presentation slide"></iframe>
  <nav class="bar" aria-label="Slide navigation">
    <button id="prev" aria-label="Previous slide">&#8592;</button>
    <span class="counter" id="counter">1 / ${total}</span>
    <button id="next" aria-label="Next slide">&#8594;</button>
    <button id="fs" aria-label="Fullscreen" title="Fullscreen (F)">&#9974;</button>
  </nav>
  <script>
    const SLIDES = [
${slideList}
    ];
    let current = 0;
    const frame = document.getElementById("frame");
    const counter = document.getElementById("counter");
    const progress = document.getElementById("progress");
    const btnPrev = document.getElementById("prev");
    const btnNext = document.getElementById("next");

    function show(i) {
      if (i < 0 || i >= SLIDES.length) return;
      current = i;
      frame.src = SLIDES[i].file;
      counter.textContent = (i + 1) + " / " + SLIDES.length;
      progress.style.width = ((i + 1) / SLIDES.length * 100) + "%";
      btnPrev.disabled = i === 0;
      btnNext.disabled = i === SLIDES.length - 1;
      history.replaceState(null, "", "#" + (i + 1));
      document.title = SLIDES[i].title + " — Phoenix Digital Assistant";
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    btnPrev.addEventListener("click", prev);
    btnNext.addEventListener("click", next);
    document.getElementById("fs").addEventListener("click", () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); show(0); }
      else if (e.key === "End") { e.preventDefault(); show(SLIDES.length - 1); }
      else if (e.key === "f" || e.key === "F") document.getElementById("fs").click();
    });

    let tx = 0;
    document.addEventListener("touchstart", (e) => { tx = e.changedTouches[0].screenX; }, { passive: true });
    document.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].screenX - tx;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    }, { passive: true });

    window.addEventListener('message', (e) => {
      if (e.data?.type === 'presentation-nav' && typeof e.data.slide === 'number') {
        show(e.data.slide - 1);
      }
    });

    const hash = location.hash.match(/^#(\\d+)$/);
    show(hash ? Math.min(parseInt(hash[1], 10) - 1, SLIDES.length - 1) : 0);
  </script>
</body>
</html>`;
}

async function main() {
  const slides = await collectSlides();

  await mkdir(SLIDES_DIR, { recursive: true });

  for (const slide of slides) {
    const dest = join(SLIDES_DIR, slide.destName);
    await copyFile(slide.src, dest);
  }

  await writeFile(OUT_INDEX, buildIndex(slides), "utf8");

  console.log(`Built presentation with ${slides.length} Stitch slide(s) (exact copies)`);
  for (const s of slides) {
    console.log(`  slides/${s.destName} ← ${s.title}`);
  }
  console.log("\nRun: npm run serve → http://localhost:8080");
}

main().catch((err) => {
  console.error("Build failed:", err.message || err);
  process.exit(1);
});
