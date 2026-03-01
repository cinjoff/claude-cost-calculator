# Claude Cost Calculator — Design Doc
_Date: 2026-03-01_

## Purpose

A one-pager that reframes the Claude Pro/Max subscription cost in terms of everyday Amsterdam spending. Deadpan, playful, shareable. Built to convince friends the subscription is cheap.

---

## Tech Stack

- **Next.js** (App Router) — Vercel-native, standard for open-source projects
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — item assembly animations
- **TypeScript** — clean codebase for forkability
- **No backend, no database** — all data hardcoded as constants

Deployed via Vercel, open-sourced on GitHub.

---

## Page Layout

Single scrollable page, three zones:

### Hero Zone
- Bold headline: _"Is Claude expensive? Let's put it in Amsterdam terms."_
- Pro / Max pill toggle (centered)
- Subline showing raw price: _"€19/month"_ or _"€95/month"_

### Stage Zone
- Isometric "tabletop" surface (flat SVG plane) where illustrated items animate in
- Items appear one by one with staggered bounce-in via Framer Motion
- Right/below: combo card listing item names, quantities, individual prices, running total
- Remainder line: _"and you still have €X left"_
- "Show me another combo" shuffle button

### Footer Zone
- "Get Claude Code" CTA button (links to claude.ai/code)
- GitHub repo link
- Tagline: _"Built to convince my friends. It worked on me first."_

---

## Interaction Design

### Randomized Combo Algorithm
A knapsack-style function picks a random combination of items whose prices sum to approximately the plan cost (€0–2 overage allowed). Each run produces a plausible Amsterdam month. Items are weighted so the cheeky items appear occasionally but don't dominate.

### Animation Flow
1. Page loads → first combo assembles on the table automatically
2. Items bounce in one by one (staggered, ~150ms apart) with a scale "thud" on landing
3. Toggle plan → table clears, new combo assembles
4. Shuffle button → same clear-and-reassemble sequence

---

## Visual Design System

### Colors
| Token | Value |
|-------|-------|
| Background | `#FAF7F2` (warm off-white) |
| Table top | `#C8D9C0` (soft sage) |
| Table sides | `#B0C4A8` (darker sage) |
| Accent | `#E07A5F` (terracotta) |
| Text | `#1A1A2E` (near-black) |
| Card background | `#FFFFFF` with subtle shadow |

### Typography
- **Font:** Plus Jakarta Sans (Google Fonts)
- **Headings:** Bold, generous size
- **Prices:** `font-variant-numeric: tabular-nums` for clean alignment

### Isometric Illustrations
Simple 3-face SVG objects (top, left side, right side) with flat fills — no gradients. All consistently sized to sit naturally on the tabletop. Built in code, no external image assets.

---

## Content

### Amsterdam Price List

| UI Label | Price |
|----------|-------|
| Beer | €5.00 |
| Coffee | €4.50 |
| Wine | €6.00 |
| Cinema | €14.00 |
| Stroopwafel | €0.50 |
| Kroket | €2.50 |
| Broodje | €5.50 |
| Tram | €3.20 |
| Burger | €17.00 |
| Pizza | €20.00 |
| Weed | €12.00 |
| Cocaine | €60.00 |
| BJ | €30.00 |

### Plan Prices
- **Pro:** €19/month
- **Max:** €95/month

### Copy Tone
Deadpan. No disclaimers. No winking labels. The humor is in the juxtaposition.

---

## Project Setup

- GitHub repo: `claude-cost-calculator`
- Vercel: connected to GitHub, auto-deploy on push to `main`
- License: MIT
