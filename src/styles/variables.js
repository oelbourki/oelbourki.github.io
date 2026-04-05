import { css } from 'styled-components';

/**
 * Design tokens — “refined navy” refresh (layered surfaces, softer text ramp, same accent family).
 * Legacy names (--navy, --green, etc.) preserved so components keep working.
 */
const variables = css`
  :root {
    /* Depth: darkest → page → raised → borders */
    --dark-navy: #020617;
    --navy: #0f172a;
    --light-navy: #1e293b;
    --lightest-navy: #334155;
    --navy-shadow: rgba(15, 23, 42, 0.72);

    /* Text ramp (avoid pure white on dark) */
    --dark-slate: #64748b;
    --slate: #94a3b8;
    --light-slate: #cbd5e1;
    --lightest-slate: #e2e8f0;
    --white: #f8fafc;

    /* Accents — primary mint + secondary sky (use sky sparingly) */
    --green: #5eead4;
    --green-tint: rgba(94, 234, 212, 0.1);
    --green-muted: rgba(94, 234, 212, 0.35);
    --pink: #e879f9;
    --blue: #38bdf8;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 6px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
