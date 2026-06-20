# Phoenix Digital Assistant — Presentation

Hostable slide deck built from the **exact Stitch exports** in `extract-from-stitch/`. No redesign — each slide is the raw `code.html` from Google Stitch.

## Slides (7 exported)

1. Title Slide
2. Executive Summary
3. Strategic Vision
4. High-Frequency AI Opportunities
5. Target Architecture
6. Next Steps & Pilot Phase
7. Sprint to Pilot: 4-Week Framework

## Quick Start

```bash
npm run build
npm run serve
```

Open [http://localhost:8080](http://localhost:8080)

## Export PDF

```bash
npm install
npm run export:pdf
```

Output: `phoenix-digital-assistant-presentation.pdf` — one page per slide, full content (variable height per slide)

## Presenter Controls

| Key | Action |
|-----|--------|
| `→` `Space` | Next slide |
| `←` | Previous slide |
| `Home` / `End` | First / last slide |
| `F` | Fullscreen |

## Rebuild after adding Stitch exports

1. Add new `code.html` files under `extract-from-stitch/stitch_consulting_presentation_deck/`
2. Update `extract-from-stitch/manifest.json` with the slide order
3. Run `npm run build`

## Host

Upload to Netlify, GitHub Pages, Vercel, or any static host:

```
index.html
slides/
```

## Source

```
extract-from-stitch/          ← Stitch exports (source of truth)
  manifest.json               ← slide order
  stitch_consulting_presentation_deck/
    title_slide/code.html
    executive_summary/code.html
    ...
slides/                       ← exact copies (generated)
index.html                    ← navigation shell (generated)
```
