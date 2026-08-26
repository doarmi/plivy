import { createGlobalStyle } from 'styled-components';

export const RuntimeGlobal = createGlobalStyle`
  body { margin:0; background:#eceae6; }
  #root { width:100%; max-width:480px; min-height:100vh; margin:0 auto; }
  html[data-theme="dark"] body { background:#101116; color:#ececf0; }
  html[data-theme="dark"] .app-container,
  html[data-theme="dark"] .profile-page,
  html[data-theme="dark"] .settings-page,
  html[data-theme="dark"] .detail-page,
  html[data-theme="dark"] .record-page,
  html[data-theme="dark"] .records-page { background:#181a20 !important; color:#f1f1f4 !important; }
  html[data-theme="dark"] input,
  html[data-theme="dark"] textarea { color:#f4f4f6 !important; background:#292b32 !important; border-color:#444751 !important; }
  html[data-theme="dark"] .settings-card,
  html[data-theme="dark"] .archive-item,
  html[data-theme="dark"] .detail-track,
  html[data-theme="dark"] .detail-meta,
  html[data-theme="dark"] .detail-memo,
  html[data-theme="dark"] .detail-actions button,
  html[data-theme="dark"] .playlist-picker { background:#24262d !important; color:#f0f0f3 !important; border-color:#41444d !important; }
  html[data-theme="dark"] .settings-item { color:#f0f0f3 !important; border-color:#393c44 !important; }
  html[data-theme="dark"] .option-panel { background:#1d1f25 !important; border-color:#393c44 !important; }
  html[data-theme="dark"] .option-panel button.selected { background:#302940 !important; color:#d7c5ff !important; }
  html[data-theme="dark"] .settings-page > header,
  html[data-theme="dark"] .profile-page > header { background:#2e3a2e !important; border-color:#465746 !important; color:#eef3e8 !important; }
  html[data-theme="dark"] .storage-card { background:#34432f !important; color:#edf3e8 !important; border-color:#60735a !important; }
  html[data-theme="dark"] .profile-name,
  html[data-theme="dark"] .profile-tagline,
  html[data-theme="dark"] .archive-title { color:#f0f0f3 !important; }
`;
