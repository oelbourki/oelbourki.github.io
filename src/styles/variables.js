import { css } from 'styled-components';

/**
 * Option B — near-black + electric blue.
 * Semantic tokens + legacy aliases (--navy, --green, …) for existing components.
 */
const variables = css`
  :root {
    --bg-primary: #0d0d0d;
    --bg-elevated: #161616;
    --bg-border: #222222;
    --accent: #3d9bff;
    --accent-subtle: rgba(61, 155, 255, 0.08);
    --accent-border: rgba(61, 155, 255, 0.2);
    --text-primary: #f0f0f0;
    --text-secondary: #888888;
    --text-tertiary: #444444;

    /* Legacy aliases */
    --dark-navy: #0a0a0a;
    --navy: var(--bg-primary);
    --light-navy: var(--bg-elevated);
    --lightest-navy: var(--bg-border);
    --navy-shadow: rgba(0, 0, 0, 0.45);

    --dark-slate: #666666;
    --slate: var(--text-secondary);
    --light-slate: #a3a3a3;
    --lightest-slate: var(--text-primary);
    --white: var(--text-primary);

    --green: var(--accent);
    --green-tint: var(--accent-subtle);
    --green-muted: var(--accent-border);
    --pink: #e879f9;
    --blue: var(--accent);

    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'SF Pro Text', system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 15px;
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
