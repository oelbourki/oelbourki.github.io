# Design & color refresh — exploration plan

**Branch:** `design/color-refresh-exploration`  
**Goal:** Move the site from “credible template” toward a more **distinct, polished** look while keeping readability and your existing Gatsby/styled-components structure.

---

## Current baseline (repo)

| Token | Value | Role |
|--------|--------|------|
| `--navy` | `#0a192f` | Page background |
| `--green` | `#64ffda` | Primary accent (buttons, links, focus) |
| `--pink` / `--blue` | `#f57dff` / `#57cbff` | Defined in `variables.js` but **barely used** → missed opportunity for depth |
| Body text | `--slate` `#8892b0` | Muted blue-gray |

Files to touch when implementing: `src/styles/variables.js`, `src/config.js` (`colors` export if still used), `src/styles/GlobalStyle.js`, `src/styles/mixins.js`, and optionally `fonts.js`.

---

## What we searched / learned

### 1. “Dark mode that doesn’t look generic” ([DEV — RAXXO Studios](https://dev.to/raxxostudios/dark-mode-design-that-doesnt-look-ai-2cn3))

- **Avoid pure black** (`#000`) and **pure white** text on dark: use **off-black** base (e.g. `#1f1f21`) and **off-white** for primary text (e.g. `#F5F5F7`) to reduce halation and eye strain.
- **Layer backgrounds**: base → raised (cards) → inset — creates depth without glass blur everywhere.
- **Contrast is currency**: one strong accent per viewport; secondary actions = outline or text link. Your hero already has primary + two resume buttons — reserve **full accent** for one primary CTA.
- **Spacing rhythm**: 4/8/16/32/64 scale reads more “designed” than arbitrary `15px / 24px / 40px` mixes.
- **Typography**: a clear scale + line-height (e.g. body ~1.6, headings ~1.1) often beats “more neon.”
- **Glass**: use sparingly (e.g. modals); heavy blur + neon on a **developer portfolio** can read as “demo UI.”

### 2. Broader palette directions (from UI color discussions)

- **Single accent family**: keep mint/cyan **or** shift to **blue–violet** (still “tech”) — avoid mixing three competing neons without a system.
- **Optional gradient**: one subtle **gradient** (hero headline, underline, or CTA border) — not on every component.
- **Warm vs cool**: your navy is **cool**; a slightly **warmer** off-black base can differentiate from the classic “Brittany fork” look without changing layout.

---

## Enhancement directions (prioritized)

### Phase A — Color tokens (high impact, low risk)

1. **Introduce 3 background levels** in `:root`:
   - `--bg-base` (page)
   - `--bg-raised` (cards, tabs, nav — map from `--light-navy`)
   - `--bg-inset` (optional: code blocks, inner panels)
2. **Text ramp**: `--text-primary`, `--text-secondary`, `--text-muted` (opacity or discrete hex), aligned with off-white primary for headings.
3. **Accent system**:
   - Keep `--green` as primary interactive OR rename to `--accent` and tune one hue (slightly more teal or more emerald) for a personal “signature.”
   - **Use `--blue` or `--pink`** as a **secondary accent** only for: hover on links, gradient on one hero element, or section dividers — not every button.

### Phase B — Distinctive but still “you”

4. **Hero / first fold**: one focal treatment — e.g. gradient text on job title **or** subtle mesh gradient background behind hero only (CSS `radial-gradient` + low opacity).
5. **Section separation**: replace or supplement horizontal rules with **spacing** + optional **thin gradient line** using `--green` at low opacity.
6. **Buttons**: primary filled or strong border; resume secondary stays **ghost** (already partially there).

### Phase C — Typography (optional follow-up)

7. **Font pairing**: keep Calibre/Inter if licensed; otherwise consider **Instrument Sans**, **DM Sans**, or **Source Sans 3** for body + keep **JetBrains Mono** / **Fira Code** for mono (already close in `variables.js`).
8. Tighten **heading line-height** and loosen **body** (see article above).

### Phase D — Polish (repo hygiene + UX)

9. Remove large commented template blocks in `hero.js` / `about.js` after design pass.
10. Verify focus rings still meet contrast if background shifts lighter.

---

## Palettes to try (in Figma or browser DevTools)

**Option 1 — “Refined navy” (minimal change)**  
- Base: `#0c1222` or `#0f172a` (slightly softer than current navy)  
- Accent: keep `#64ffda` or shift to `#5eead4` (tailwind teal-300)  
- Secondary accent: `#38bdf8` (`--blue` range) for links only  

**Option 2 — “Warm dark” (more distinctive)**  
- Base: `#1a1a1e` or `#1f1f21`  
- Surfaces: `#25252a`, `#2e2e35`  
- Accent: `#7dd3fc` (sky) or `#a78bfa` (violet) — pick **one**  
- Text primary: `#F5F5F7`  

**Option 3 — “AI engineer” (still professional)**  
- Deep blue-gray base `#0b1020`, raised `#121a2e`  
- Accent: electric blue `#3b82f6` with mint `#34d399` only for “success” or code highlights  

---

## What we will avoid

- Full **glassmorphism** on main content.
- **Multiple** gradient buttons in one viewport.
- **Purple + cyan + green** all at full saturation without hierarchy.

---

## Suggested next steps (implementation order)

1. Duplicate `variables.js` tokens into a **theme draft** (or CSS variables only) on this branch; adjust one page section in **Storybook** or hero only to validate.
2. Snapshot **Lighthouse** / contrast check (WCAG AA for text).
3. Roll tokens through **GlobalStyle**, **nav**, **mixins**, then sections.
4. Merge to `main` when happy; keep `og.png` / social preview updated if background changes a lot.

---

## References

- [Dark Mode Design That Doesn’t Look AI](https://dev.to/raxxostudios/dark-mode-design-that-doesnt-look-ai-2cn3) — spacing, contrast, typography, glass.
- [UI Colors Lab — Dark mode palettes](https://uicolors.org/dark-mode-ui-colors) — inspiration only; validate contrast.
