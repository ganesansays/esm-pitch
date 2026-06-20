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

### GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that deploys on push to `main`.

**First-time setup:**

```bash
gh auth login
gh repo create esm-pitch --public --source=. --remote=origin --push
gh api repos/$(gh repo view --json nameWithOwner -q .nameWithOwner)/pages -X POST -f build_type=workflow
```

Your site will be live at `https://<username>.github.io/esm-pitch/` within a minute or two.

**Updates:** push to `main` and the workflow redeploys automatically.

```bash
git push origin main
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
