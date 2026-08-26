import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  background: linear-gradient(180deg, var(--color-bg-top) 0%, var(--color-bg-bottom) 55%);
  min-height: 100vh;
  padding: 56px var(--space-6) 48px;

  /* Brand */
  .brand {
    text-align: center;
    margin-bottom: var(--space-8);
  }

  .brand-logo {
    font-family: var(--font-display);
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 0.42em;
    color: var(--color-primary-darker);
    margin-left: 0.42em;
  }

  .brand-tagline {
    margin-top: var(--space-2);
    font-family: var(--font-mono);
    font-size: 10.5px;
    letter-spacing: 0.24em;
    color: var(--color-text-faint);
    text-transform: uppercase;
  }

  /* Player preview card */
  .player-card {
    padding: var(--space-4);
    margin-bottom: var(--space-5);
  }

  .player-screen {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: linear-gradient(160deg, var(--color-player-bg-alt) 0%, var(--color-player-bg) 70%);
    aspect-ratio: 4 / 3.05;
  }

  .collage {
    position: absolute;
    inset: 0;
  }

  .collage-photo {
    position: absolute;
    border-radius: 6px;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
    border: 5px solid #f4efe9;
  }

  .collage-photo--1 {
    width: 58%;
    height: 62%;
    top: 6%;
    left: 4%;
    background: linear-gradient(150deg, #4a4670 0%, #262244 55%, #120f22 100%);
    transform: rotate(-9deg);
  }

  .collage-photo--1::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 30% 75%, rgba(224, 78, 138, 0.55), transparent 45%),
      radial-gradient(circle at 70% 30%, rgba(120, 96, 220, 0.5), transparent 50%);
  }

  .collage-photo--2 {
    width: 46%;
    height: 44%;
    top: 10%;
    right: 6%;
    background: linear-gradient(160deg, #7c6a52 0%, #3c3226 100%);
    transform: rotate(7deg);
  }

  .collage-photo--2::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.06) 0px,
      rgba(255, 255, 255, 0.06) 2px,
      transparent 2px,
      transparent 10px
    );
  }

  .collage-photo--3 {
    width: 40%;
    height: 30%;
    bottom: 8%;
    left: 22%;
    background: linear-gradient(120deg, #efe6d8 0%, #d9cdb9 100%);
    transform: rotate(-3deg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .collage-photo--3 span {
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.08em;
    color: #8a7f68;
    text-transform: uppercase;
  }

  .player-progress {
    position: absolute;
    left: var(--space-4);
    right: var(--space-4);
    bottom: var(--space-4);
    z-index: 2;
  }

  .player-progress-bar {
    height: 3px;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.28);
    overflow: hidden;
    margin-bottom: var(--space-2);
  }

  .player-progress-bar-fill {
    height: 100%;
    width: 62%;
    background: var(--color-primary);
    border-radius: var(--radius-pill);
  }

  .player-progress-time {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 0.03em;
  }

  /* Player controls */
  .player-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
    padding-top: var(--space-4);
  }

  /* Auth panel */
  .auth-panel {
    margin-top: var(--space-2);
  }

  .auth-heading {
    text-align: center;
    font-size: 21px;
    font-weight: 700;
    margin-bottom: var(--space-2);
  }

  .auth-subtitle {
    text-align: center;
    font-size: 13.5px;
    color: var(--color-text-sub);
    margin-bottom: var(--space-6);
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .field-aux-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -2px;
  }

  .auth-submit {
    margin-top: var(--space-2);
  }

  .auth-divider {
    margin: var(--space-6) 0 var(--space-5);
  }

  .social-row {
    display: flex;
    gap: var(--space-3);
  }

  .auth-switch {
    text-align: center;
    margin-top: var(--space-6);
    font-size: 13.5px;
    color: var(--color-text-sub);
  }

  /* Back button */
  .auth-back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: 13px;
    color: var(--color-text-sub);
    font-weight: 600;
    margin-bottom: var(--space-4);
  }

  /* Forgot password success state */
  .auth-notice {
    background: var(--color-primary-tint);
    border: 1px solid var(--color-primary-light);
    color: var(--color-primary-darker);
    border-radius: var(--radius-sm);
    padding: var(--space-4);
    font-size: 13px;
    line-height: 1.5;
    text-align: center;
  }

  /* View switching */
  .auth-view {
    animation: fade-in 0.22s ease;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
