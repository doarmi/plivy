import styled from 'styled-components';

export const HomeContainer = styled.main`
  min-height: 100vh;
  padding: 0 0 108px;
  overflow: hidden;
  background: linear-gradient(180deg, #eeeafe 0, #f7f6fb 37%, #f8f8fa 100%);
`;

export const DevicePlayer = styled.section`
  padding: 14px 28px 28px;
  background: linear-gradient(145deg, #d7d2eb, #eeeafe);
  border-radius: 38px 38px 0 0;
  box-shadow: inset 0 2px rgba(255, 255, 255, 0.8);

  .player-display {
    position: relative;
    display: grid;
    grid-template-columns: 96px 1fr;
    gap: 20px;
    min-height: 194px;
    padding: 28px 24px 45px;
    border-radius: 24px;
    color: #fff;
    background: linear-gradient(145deg, #24232b, #111116);
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.12), 0 12px 26px rgba(26, 19, 37, 0.2);
  }

  .album-placeholder {
    aspect-ratio: 1;
    align-self: start;
    display: grid;
    place-items: center;
    transform: rotate(-4deg);
    border: 8px solid #fff;
    color: #77708c;
    font: 700 10px/1 monospace;
    background: linear-gradient(150deg, #f8f2ec, #cfc5db 48%, #9d91b3);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
  }

  .track-info {
    align-self: center;
    min-width: 0;

    .eyebrow {
      margin-bottom: 10px;
      font: 9px/1.2 monospace;
      letter-spacing: 0.18em;
      color: #aaa6b3;
    }

    h1 {
      font: 500 20px/1.2 monospace;
      letter-spacing: 0.08em;
      margin: 0;
    }

    > p:not(.eyebrow) {
      margin-top: 5px;
      font: 11px/1.2 monospace;
      color: #bbb7c3;
    }
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 18px;

    span {
      padding: 5px 7px;
      border: 1px solid rgba(199, 47, 99, 0.55);
      color: #f094b4;
      background: rgba(199, 47, 99, 0.16);
      font: 8px/1 monospace;
    }
  }

  .progress {
    position: absolute;
    right: 24px;
    bottom: 25px;
    left: 24px;
    height: 5px;
    overflow: hidden;
    background: #37363d;

    span {
      display: block;
      width: 62%;
      height: 100%;
      background: var(--home-primary, #c72f63);
      transition: width 0.25s;
    }
  }

  .mini-control {
    position: relative;
    width: 118px;
    height: 118px;
    margin: 18px auto 0;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 22px;
    background: linear-gradient(145deg, #fff, #e5e3ea);
    box-shadow: 0 12px 24px rgba(69, 57, 89, 0.18);

    button {
      position: absolute;
      top: 45px;
      font-size: 9px;
      color: #777481;
    }
    button:first-of-type { left: 11px; }
    button:nth-of-type(2) { left: 43px; }
    button:nth-of-type(3) { right: 11px; }

    .control-main {
      width: 34px;
      height: 34px;
      top: 39px !important;
      border-radius: 50%;
      color: #fff;
      background: var(--home-primary, #c72f63);
      box-shadow: 0 5px 12px rgba(199, 47, 99, 0.25);
    }

    .control-label, .control-play {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font: 8px/1 monospace;
      color: #92909a;
    }
    .control-label { top: 13px; }
    .control-play { bottom: 12px; }
  }
`;

export const FeedSection = styled.section`
  padding: 27px 30px 0;

  h2 {
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.03em;
  }

  .horizontal-list {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 4px 4px 18px;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    &::-webkit-scrollbar { display: none; }
  }

  .mood-card {
    display: grid;
    grid-template-columns: 52px 1fr 38px;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid #c7bfd4;
    border-radius: 20px;
    background: #f1eff8;

    .mood-icon {
      width: 45px;
      height: 45px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: #bfd3a6;
      color: #3f523a;
      font-size: 22px;
    }
    strong { font-size: 15px; }
    p { margin-top: 5px; color: #89838f; font-size: 12px; margin-bottom: 0; }
    .round-action {
      width: 34px;
      height: 34px;
      border: 2px solid var(--home-primary, #c72f63);
      border-radius: 50%;
      color: var(--home-primary, #c72f63);
      font-size: 12px;
    }
  }

  &.shared-section {
    .section-heading {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 10px;
      h2 { max-width: 80%; }
      button { color: var(--home-primary, #c72f63); font-size: 12px; }
    }
  }

  .shared-list {
    display: grid;
    gap: 12px;
  }
`;

export const RecordCard = styled.article<{ $tilt: string }>`
  flex: 0 0 214px;
  padding: 12px 12px 26px;
  transform: rotate(${props => props.$tilt});
  background: #fff;
  box-shadow: 0 12px 22px rgba(37, 30, 48, 0.13);
  scroll-snap-align: start;

  .record-image {
    width: 100%;
    aspect-ratio: 4/3;
    display: grid;
    place-items: center;
    padding: 0;
    color: #fff;
    font: 10px monospace;
    background-color: #817691;
    overflow: hidden;
    
    span {
      padding: 5px 8px;
      background: rgba(20, 18, 25, 0.46);
      backdrop-filter: blur(3px);
    }
  }

  time {
    display: block;
    margin-top: 14px;
    text-align: right;
    color: #9994a0;
    font: 10px monospace;
  }
`;

export const PlaylistCard = styled.button<{ $bg: string; $selected?: boolean }>`
  flex: 0 0 126px;
  aspect-ratio: 0.83;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px solid #bbb5c8;
  background: ${props => props.$bg};
  scroll-snap-align: start;
  transition: 0.2s;

  ${props => props.$selected && `
    border: 2px solid var(--home-primary, #c72f63);
    box-shadow: 0 7px 18px rgba(199,47,99,.15);
  `}

  .disc {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    background: radial-gradient(circle, #eceaf0 0 11%, #c9c3db 12% 26%, #9a90b3 27% 44%, #dedbe7 45%);
    box-shadow: inset 0 1px #fff, 0 8px 14px rgba(43, 35, 57, 0.14);
  }

  strong {
    font: 700 10px/1 monospace;
  }
`;

export const SharedCard = styled.article`
  display: grid;
  grid-template-columns: 45px 1fr 34px;
  gap: 12px;
  align-items: center;
  padding: 13px;
  border: 1px solid #dedbe4;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 3px 9px rgba(30, 26, 37, 0.03);

  .avatar {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: #e7e9f0;
    color: #777a86;
  }

  strong { font-size: 13px; }
  
  p {
    margin-top: 3px;
    color: #8e8994;
    font-size: 10px;
    margin-bottom: 0;
  }

  .like-button {
    font-size: 24px;
    color: #bdb8c6;
    
    &.liked {
      color: var(--home-primary, #c72f63);
    }
  }
`;

export const ToastPopup = styled.div<{ $show: boolean }>`
  position: fixed;
  z-index: 30;
  left: 50%;
  bottom: 88px;
  transform: translate(-50%, ${props => props.$show ? '0' : '16px'});
  padding: 10px 15px;
  border-radius: 20px;
  color: #fff;
  background: rgba(32, 32, 39, 0.92);
  font-size: 12px;
  opacity: ${props => props.$show ? '1' : '0'};
  pointer-events: none;
  transition: 0.22s;
`;
