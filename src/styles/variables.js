import { css } from 'styled-components';

/**
 * Midnight Black / Electric Blue / Cantaloupe Orange.
 * Blue = everyday accent (links, role, nav). Orange = rare (primary CTA + one proof).
 * Legacy aliases (--navy, --green, …) keep existing components working.
 */
const variables = css`
  :root {
    --bg-primary: #02070a;
    --bg-elevated: #0b1116;
    --bg-border: #1a2229;
    /* Electric blue — secondary accent (role, links, nav numbers, tags) */
    --accent: #0297de;
    --accent-bright: #3db4f0;
    --accent-subtle: rgba(2, 151, 222, 0.12);
    --accent-border: rgba(2, 151, 222, 0.32);
    /* Cantaloupe orange — primary accent (CTA + one proof point only) */
    --accent-secondary: #fc734d;
    --accent-secondary-subtle: rgba(252, 115, 77, 0.14);
    --on-accent-secondary: #02070a;
    --text-primary: #f0f0f0;
    --text-secondary: #888888;
    --text-tertiary: #6e6e6e;

    /* Legacy aliases */
    --dark-navy: #010508;
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
