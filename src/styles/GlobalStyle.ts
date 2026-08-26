import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* --- Color: Brand --- */
    --color-primary: #c72f63;
    --color-primary-dark: #a3234f;
    --color-primary-darker: #7d1c3d;
    --color-primary-light: #f4d9e2;
    --color-primary-tint: #fbeef2;

    /* --- Color: Neutral / Text --- */
    --color-text: #2a2229;
    --color-text-sub: #8c8290;
    --color-text-faint: #b7aeb8;
    --color-white: #ffffff;

    /* --- Color: Surface / Background --- */
    --color-bg-top: #ece1e7;
    --color-bg-bottom: #faf3ef;
    --color-surface: #ffffff;
    --color-surface-alt: #f6f1f0;
    --color-border: #ece5e6;
    --color-player-bg: #17151a;
    --color-player-bg-alt: #221e26;

    /* --- Radius --- */
    --radius-xs: 8px;
    --radius-sm: 12px;
    --radius-md: 18px;
    --radius-lg: 26px;
    --radius-pill: 999px;

    /* --- Shadow --- */
    --shadow-card: 0 18px 40px -18px rgba(60, 20, 40, 0.28);
    --shadow-float: 0 10px 24px -10px rgba(199, 47, 99, 0.45);
    --shadow-soft: 0 2px 10px rgba(40, 20, 30, 0.06);

    /* --- Spacing scale --- */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-8: 32px;
    --space-10: 40px;

    /* --- Typography --- */
    --font-base: "Pretendard", "Apple SD Gothic Neo", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-display: "Cormorant Garamond", "Noto Serif KR", Georgia, serif;
    --font-mono: "IBM Plex Mono", "Roboto Mono", ui-monospace, SFMono-Regular, monospace;

    /* --- Layout --- */
    --app-max-width: 480px;
  }

  /* --- Reset --- */
  * ,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-base);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  h1, h2, h3, h4, p, ul, li, figure {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    color: inherit;
  }

  input {
    font-family: inherit;
    color: inherit;
  }

  input:focus {
    outline: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  svg {
    display: block;
  }

  html[data-theme="dark"] { color-scheme: dark; }
  html[data-theme="dark"] body { background:#17181d; color:#ececf0; }
  html[data-theme="dark"] .app-container { filter:none; background:#181a20 !important; color:#f1f1f4; }
  html[data-theme="dark"] input,
  html[data-theme="dark"] textarea { color:#f4f4f6; background:#292b32; border-color:#444751; }
  html[data-theme="dark"] :is(.profile-topbar,.detail-topbar,.record-topbar,.pocket-bar,.settings-page>header,.explore-page>header,.playlists-page>header){background:#2e3a2e !important;border-color:#465746 !important;color:#eef3e8}
  html[data-theme="dark"] :is(.storage-card,.mood-panel,.rec-status,.player-lcd,.player-lcd-progress){background:#34432f !important;color:#edf3e8 !important;border-color:#60735a !important}
  html[data-theme="dark"] :is(.archive-item,.setting-row,.result-card,.playlist-card,.memory-card,.quote-card,.photo-card,.selected-track){background:#262930 !important;color:#f0f0f3 !important;border-color:#41444d !important}
  html[data-theme="dark"] :is(.archive-sublabel,.setting-row small,.result-card p,.playlist-card p,.memory-card p,.auth-subtitle){color:#aaaeb8 !important}
  html[data-theme="dark"] :is(.profile-page,.detail-page,.record-page,.records-page,.public-profile,.explore-page,.playlists-page,.settings-page){background:#181a20 !important}

  /* --- App shell --- */
  .app-container {
    max-width: var(--app-max-width);
    margin: 0 auto;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* --- Focus visibility (accessibility) --- */
  a:focus-visible,
  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--radius-xs);
  }

  /* --- Reduced motion --- */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* --- Buttons --- */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
    white-space: nowrap;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn-primary {
    width: 100%;
    height: 54px;
    border-radius: var(--radius-pill);
    color: var(--color-white);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    box-shadow: var(--shadow-float);
    letter-spacing: 0.02em;
  }

  .btn-primary[disabled] {
    opacity: 0.55;
    box-shadow: none;
    cursor: not-allowed;
  }

  .btn-social {
    flex: 1;
    height: 50px;
    border-radius: var(--radius-pill);
    font-size: 14px;
    font-weight: 600;
    border: 1px solid var(--color-border);
    background: var(--color-white);
    color: var(--color-text);
  }

  .btn-social.btn-social--dark {
    background: #141316;
    border-color: #141316;
    color: var(--color-white);
  }

  .btn-text {
    font-size: 13px;
    color: var(--color-primary);
    font-weight: 600;
  }

  .btn-icon-circle {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--color-surface-alt);
    color: var(--color-text-sub);
    transition: transform 0.15s ease, background 0.15s ease;
  }

  .btn-icon-circle:active {
    transform: scale(0.94);
  }

  .btn-icon-circle--primary {
    width: 58px;
    height: 58px;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    color: var(--color-white);
    box-shadow: var(--shadow-float);
  }

  /* --- Inputs --- */
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .field-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text);
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-wrap .input-icon {
    position: absolute;
    left: var(--space-4);
    color: var(--color-text-faint);
    display: inline-flex;
  }

  .input-field {
    width: 100%;
    height: 52px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-border);
    background: var(--color-surface-alt);
    padding: 0 var(--space-4) 0 44px;
    font-size: 14px;
    color: var(--color-text);
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .input-field::placeholder {
    color: var(--color-text-faint);
  }

  .input-field:focus {
    border-color: var(--color-primary);
    background: var(--color-white);
  }

  .input-field.has-error {
    border-color: #d84f4f;
  }

  .field-error {
    font-size: 12px;
    color: #d84f4f;
    min-height: 14px;
  }

  /* --- Card --- */
  .card {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
  }

  /* --- Divider with label --- */
  .divider-label {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--color-text-faint);
    font-size: 12px;
  }

  .divider-label::before,
  .divider-label::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .hidden {
    display: none !important;
  }
`;
