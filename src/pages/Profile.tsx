import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePlivyStore } from '../store/PlivyStore';

const ProfilePage = styled.div`
  min-height: 100vh;
  padding-bottom: 150px;
  background: var(--paper, #f5f2ea);
  color: var(--ink, #252a25);
`;

const ProfileTopbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 48px;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  background: #c4d9a7;
  border-bottom: 1px solid #92a77d;

  .topbar-icon-btn {
    height: 48px;
    display: grid;
    place-items: center;
  }

  .topbar-title {
    text-align: center;
    font: 500 20px/1 var(--font-mono);
    letter-spacing: 0.21em;
    margin: 0;
  }
`;

const ProfileBody = styled.main`
  padding: 18px 30px;

  @media (max-width: 360px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const ProfileHeader = styled.section`
  text-align: center;

  .profile-avatar-wrap {
    position: relative;
    width: 110px;
    margin: 0 auto 16px;
  }

  .profile-avatar {
    width: 110px;
    height: 110px;
    overflow: hidden;
    border: 3px solid #fff;
    border-radius: 7px;
    box-shadow: 0 4px 9px rgba(37, 36, 41, 0.18);
    background: #e0dce8;
    display: grid;
    place-items: center;
    font-size: 40px;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .profile-avatar-edit {
    position: absolute;
    right: -3px;
    bottom: -2px;
    width: 29px;
    height: 29px;
    display: grid;
    place-items: center;
    border: 2px solid #fff;
    border-radius: 50%;
    background: #ff3a82;
    color: #fff;
  }

  .profile-name {
    font: 700 20px/1 var(--font-mono);
    letter-spacing: 0.17em;
    margin: 0 0 6px;
  }

  .profile-tagline {
    margin-top: 6px;
    color: #8b858a;
    font: 11px/1.25 var(--font-mono);
  }

  .profile-stats {
    display: flex;
    justify-content: center;
    gap: 55px;
    margin-top: 19px;

    @media (max-width: 360px) { gap: 42px; }
  }

  .profile-stat-value {
    font: 700 20px/1 var(--font-mono);
    letter-spacing: 0.08em;
    margin: 0;
  }

  .profile-stat-label {
    margin-top: 4px;
    color: #85817f;
    font: 7px/1 var(--font-mono);
    letter-spacing: 0.14em;
  }
`;

const StorageCard = styled.section`
  margin-top: 25px;
  padding: 18px;
  border: 1px solid #a4b98e;
  border-radius: 4px;
  background: var(--lcd, #c6dca9);
  box-shadow: inset 0 0 12px rgba(89, 111, 68, 0.15), 0 5px 11px rgba(54, 64, 45, 0.12);

  .storage-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(71, 89, 58, 0.19);
    font: 14px/1 var(--font-mono);
    letter-spacing: 0.06em;
  }

  .storage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 19px 24px;
    margin-top: 18px;
  }

  .storage-grid-label {
    color: #6f7e66;
    font: 8px/1 var(--font-mono);
    letter-spacing: 0.13em;
  }

  .storage-grid-value {
    margin-top: 7px;
    font: 700 17px/1 var(--font-mono);
    letter-spacing: 0.08em;
  }

  .storage-progress-track {
    height: 8px;
    margin-top: 19px;
    overflow: hidden;
    border-radius: 3px;
    background: #afc899;
  }

  .storage-progress-fill {
    height: 100%;
    background: #283528;
    width: 88%;
  }
`;

const ArchiveSection = styled.section`
  margin-top: 28px;

  .archive-title {
    margin-bottom: 12px;
    font: 14px/1 var(--font-mono);
    letter-spacing: 0.15em;
  }

  .archive-list {
    display: grid;
    gap: 9px;
  }

  .archive-item {
    min-height: 57px;
    display: grid;
    grid-template-columns: 31px 1fr 24px;
    align-items: center;
    padding: 10px 13px;
    border: 1px solid #dbe0ea;
    border-radius: 7px;
    background: #edf2fc;
    box-shadow: 0 2px 5px rgba(40, 42, 48, 0.05);
    text-align: left;
    width: 100%;
    cursor: pointer;
  }

  .archive-icon { color: var(--purple, #5d00ef); }

  .archive-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .archive-label { font: 14px/1 var(--font-mono); letter-spacing: 0.04em; }
  .archive-sublabel { color: #8c8990; font: 7px/1 var(--font-mono); }
  .archive-chevron { color: #555; }

  .toggle-switch {
    position: relative;
    width: 29px;
    height: 15px;
    border-radius: 10px;
    background: #bfc3cc;
    cursor: pointer;
    border: none;

    &::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #fff;
      transition: 0.2s;
    }

    &.is-on {
      background: var(--purple, #5d00ef);
      &::after { left: 17px; }
    }
  }
`;

const MiniPlayer = styled.section`
  position: fixed;
  z-index: 19;
  left: 50%;
  bottom: 66px;
  transform: translateX(-50%);
  width: min(450px, calc(100% - 20px));
  height: 57px;
  display: grid;
  grid-template-columns: 38px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 8px 13px;
  border-radius: 16px 16px 0 0;
  background: #d9c1ee;
  box-shadow: 0 -5px 13px rgba(55, 43, 67, 0.12);

  .mini-player-art {
    width: 38px;
    height: 38px;
    overflow: hidden;
    border-radius: 6px;
    background: #4b304c;
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 18px;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .mini-player-title { font: 700 10px/1 var(--font-mono); margin: 0; }
  .mini-player-artist { margin-top: 4px; font: 7px/1 var(--font-mono); margin-bottom: 0; }

  .mini-player-controls {
    display: flex;
    align-items: center;

    button {
      width: 27px;
      height: 30px;
      display: grid;
      place-items: center;
    }

    .mini-player-btn--play {
      width: 31px;
      height: 31px;
      border-radius: 50%;
      background: #252a31;
      color: #fff;
    }
  }
`;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, settings, updateSettings } = usePlivyStore();
  const [miniPlaying, setMiniPlaying] = useState(false);
  const tracks = [
    { title: 'After Hours', artist: 'The Weeknd' },
    { title: 'Silver Sable', artist: 'Cigarettes After Sex' },
    { title: 'The Scientist', artist: 'Coldplay' },
  ];
  const [trackIndex, setTrackIndex] = useState(0);
  const currentTrack = tracks[trackIndex];

  return (
    <ProfilePage className="profile-page">
      <ProfileTopbar>
        <button className="topbar-icon-btn" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="topbar-title">PLIVY POCKET</h1>
        <span className="topbar-icon-btn" aria-hidden="true">
          <svg width="16" height="18" viewBox="0 0 18 22" fill="none">
            <rect x="1.5" y="3.5" width="12" height="17" rx="2.4" stroke="currentColor" strokeWidth="1.4"/>
            <rect x="6" y="0.8" width="3" height="2.4" rx="0.6" fill="currentColor"/>
            <path d="m8.6 8-3 4.6h2.3l-1 3.4 3.2-4.7H7.7L8.6 8Z" fill="currentColor"/>
          </svg>
        </span>
      </ProfileTopbar>

      <ProfileBody>
        <ProfileHeader aria-label="프로필 정보">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{profile.photo ? <img src={profile.photo} alt="프로필" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} /> : '♙'}</div>
            <button className="profile-avatar-edit" aria-label="프로필 사진 수정" onClick={() => navigate('/profile/edit')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16.5 3.5 4 4L8 20l-4.5 1L4.5 16.5Z"/>
              </svg>
            </button>
          </div>
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-tagline">{profile.bio}</p>

          <div className="profile-stats">
            <div className="profile-stat">
              <p className="profile-stat-value">1.2k</p>
              <p className="profile-stat-label">FOLLOWERS</p>
            </div>
            <div className="profile-stat">
              <p className="profile-stat-value">482</p>
              <p className="profile-stat-label">FOLLOWING</p>
            </div>
          </div>
        </ProfileHeader>

        <StorageCard aria-label="저장 공간 및 기록 통계">
          <div className="storage-header">
            <span>SYSTEM: STORAGE</span>
            <span>88% FULL</span>
          </div>
          <div className="storage-grid">
            <div>
              <p className="storage-grid-label">TOTAL RECORDS</p>
              <p className="storage-grid-value">248 UNITS</p>
            </div>
            <div>
              <p className="storage-grid-label">PLAYLISTS</p>
              <p className="storage-grid-value">12 LISTS</p>
            </div>
            <div>
              <p className="storage-grid-label">TOP EMOTION</p>
              <p className="storage-grid-value">CHILL</p>
            </div>
            <div>
              <p className="storage-grid-label">FREQ. TIME</p>
              <p className="storage-grid-value">22:00 PM</p>
            </div>
          </div>
          <div className="storage-progress-track">
            <div className="storage-progress-fill" />
          </div>
        </StorageCard>

        <ArchiveSection aria-label="마이 아카이브">
          <p className="archive-title">MY ARCHIVE</p>
          <div className="archive-list">
            <button className="archive-item" onClick={() => navigate('/profile/edit')}>
              <span className="archive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="3.4"/>
                  <path d="M5 19.5c1.2-3.2 3.9-5 7-5s5.8 1.8 7 5"/>
                </svg>
              </span>
              <span className="archive-info">
                <span className="archive-label">Edit Profile</span>
              </span>
              <span className="archive-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 5 7 7-7 7"/>
                </svg>
              </span>
            </button>

            <button className="archive-item" onClick={() => navigate('/settings')}>
              <span className="archive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="10.5" width="14" height="9" rx="2"/>
                  <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5"/>
                </svg>
              </span>
              <span className="archive-info">
                <span className="archive-label">Settings</span>
              </span>
              <span className="archive-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 5 7 7-7 7"/>
                </svg>
              </span>
            </button>

            <div className="archive-item">
              <span className="archive-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6M10 21h4M8.5 9.5a3.5 3.5 0 1 1 6 2.4c-.6.6-1 1.1-1 2.1h-4c0-1-.4-1.5-1-2.1a3.5 3.5 0 0 1-1-2.4Z"/>
                  <path d="M9 4.5V3M15 4.5V3M5 8H3.5M5 11.5H3.5M20.5 8H19M20.5 11.5H19"/>
                </svg>
              </span>
              <span className="archive-info">
                <span className="archive-label">AI Insights</span>
                <span className="archive-sublabel">Personalized smart logging</span>
              </span>
              <button
                className={`toggle-switch ${settings.aiInsights ? 'is-on' : ''}`}
                role="switch"
                aria-checked={settings.aiInsights}
                aria-label="AI Insights 사용"
                onClick={() => updateSettings({ aiInsights: !settings.aiInsights })}
              />
            </div>
          </div>
        </ArchiveSection>
      </ProfileBody>

      <MiniPlayer aria-label="현재 재생 중인 곡">
        <div className="mini-player-art">♪</div>
        <div className="mini-player-info">
          <p className="mini-player-title">{currentTrack.title}</p>
          <p className="mini-player-artist">{currentTrack.artist}</p>
        </div>
        <div className="mini-player-controls">
          <button className="mini-player-btn" aria-label="이전 트랙" onClick={() => setTrackIndex(i => (i - 1 + tracks.length) % tracks.length)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 5v14M20 6.5v11a1 1 0 0 1-1.53.85L7 12l11.47-6.35A1 1 0 0 1 20 6.5Z" fill="currentColor"/>
            </svg>
          </button>
          <button
            className="mini-player-btn mini-player-btn--play"
            aria-label={miniPlaying ? '일시정지' : '재생'}
            onClick={() => setMiniPlaying(v => !v)}
          >
            {miniPlaying ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1"/>
                <rect x="14" y="5" width="4" height="14" rx="1"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M7 5.5v13a1 1 0 0 0 1.53.85l10.5-6.5a1 1 0 0 0 0-1.7l-10.5-6.5A1 1 0 0 0 7 5.5Z" fill="currentColor"/>
              </svg>
            )}
          </button>
          <button className="mini-player-btn" aria-label="다음 트랙" onClick={() => setTrackIndex(i => (i + 1) % tracks.length)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 5v14M4 6.5v11a1 1 0 0 0 1.53.85L17 12 5.53 5.65A1 1 0 0 0 4 6.5Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </MiniPlayer>
    </ProfilePage>
  );
};

export default Profile;
