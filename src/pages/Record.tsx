import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePlivyStore } from '../store/PlivyStore';
import silverSable from '../assets/silversable.jpg';

const RecordPage = styled.div`
  min-height: 100vh;
  padding-bottom: 80px;
  background: #efeee9;

  .record-topbar {
    height: 50px;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    align-items: center;
    background: #c8dba5;
    border-bottom: 1px solid #97aa7e;

    h1 {
      text-align: center;
      font: 700 15px/1 var(--font-mono);
      letter-spacing: 0.16em;
      margin: 0;
    }

    .topbar-button {
      height: 50px;
      font-size: 28px;
    }

    .battery-icon {
      text-align: center;
      font-size: 16px;
    }
  }

  .record-body { padding: 22px; }

  .rec-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font: 10px/1 var(--font-mono);
    letter-spacing: 0.1em;

    span { color: #c72f63; }
    strong { letter-spacing: 0.12em; }
    i { flex: 1; height: 1px; background: #ccc; font-style: normal; }
  }

  .track-search {
    height: 49px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 15px;
    border: 1px solid #cfd0d5;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 16px;

    input {
      flex: 1;
      border: 0;
      background: transparent;
      outline: 0;
    }
  }

  .selected-track {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    align-items: center;
    gap: 13px;
    padding: 12px;
    border: 1px solid #e0dde0;
    border-radius: 10px;
    background: #fff;
    margin-bottom: 20px;

    img { width: 64px; height: 64px; object-fit: cover; border-radius: 6px; }
    strong { display: block; font-size: 13px; }
    span { display: block; margin-top: 4px; color: #888; font-size: 10px; }
    em { display: block; margin-top: 5px; color: #c72f63; font: 9px/1 monospace; font-style: normal; }
    button { font-size: 20px; color: #999; }
  }

  .photo-upload { margin-bottom: 20px; }

  .photo-polaroid {
    display: block;
    width: 100%;
    aspect-ratio: 4/3;
    border: 2px dashed #ccc;
    border-radius: 8px;
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    overflow: hidden;

    input { display: none; }

    b { font-size: 28px; color: #bbb; font-weight: normal; }
    span { color: #999; font-size: 12px; }
    img { width: 100%; height: 100%; object-fit: cover; display: none; }
    img.visible { display: block; }
  }

  .choice-group {
    border: 0;
    padding: 0;
    margin: 0 0 16px;

    legend {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 10px;
      font: 10px/1 var(--font-mono);
      letter-spacing: 0.1em;
      i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #c72f63; font-style: normal; }
    }
  }

  .choice-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    button {
      padding: 8px 12px;
      border: 1px solid #dfd6e7;
      border-radius: 20px;
      background: #f3eef5;
      color: #6b6070;
      font: 11px/1 var(--font-mono);
      transition: 0.15s;

      &.is-selected {
        border-color: #c72f63;
        background: rgba(199, 47, 99, 0.1);
        color: #c72f63;
      }
    }
  }

  .record-field {
    display: block;
    margin-bottom: 16px;

    span {
      display: block;
      margin-bottom: 6px;
      font: 10px/1 var(--font-mono);
      letter-spacing: 0.1em;
    }

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
      b { color: #999; font-weight: normal; }
      input {
        flex: 1;
        height: 44px;
        border: 0;
        outline: 0;
        background: transparent;
      }
    }

    textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
      resize: none;
      outline: 0;
      font-size: 12px;
      line-height: 1.6;
    }
  }

  .step-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 14px;

    button {
      flex: 1;
      height: 44px;
      border: 1px solid #d0cdd5;
      border-radius: 8px;
      background: #fff;
      font: 11px/1 var(--font-mono);
      letter-spacing: 0.08em;
    }
  }

  .save-record-btn {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 12px;
    background: #c72f63;
    color: #fff;
    font: 700 13px/1 var(--font-mono);
    letter-spacing: 0.12em;

    span { font-size: 18px; }
  }
`;

const Toast = styled.div<{ $show: boolean }>`
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
  transition: 0.22s;
  pointer-events: none;
`;

const EMOTIONS = ['설렘', '차분함', '쓸쓸함', '행복함'];
const ACTIVITIES = ['공부', '휴식', '드라이브', '운동'];

const Record: React.FC = () => {
  const navigate = useNavigate();
  const { addRecord } = usePlivyStore();
  const [emotion, setEmotion] = useState('차분함');
  const [activity, setActivity] = useState('휴식');
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState({ message: '', show: false });
  const [photoSrc, setPhotoSrc] = useState('');

  const showToast = (msg: string) => {
    setToast({ message: msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 1600);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoSrc(String(reader.result || ''));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecord({
      title: 'New Emotions',
      artist: 'Artistic Soul',
      emotion,
      activity,
      location: location.trim() || '장소 미지정',
      memo: memo.trim() || '이 순간을 음악과 함께 기록했어요.',
      tags: [emotion, activity, ...(location.trim() ? [location.trim()] : [])],
      image: photoSrc || silverSable,
    });
    showToast('기록이 저장되었어요!');
    setTimeout(() => navigate('/records'), 900);
  };

  return (
    <RecordPage className="record-page">
      <header className="record-topbar">
        <button className="topbar-button" onClick={() => navigate(-1)} aria-label="뒤로 가기">‹</button>
        <h1>PLIVY POCKET</h1>
        <span className="battery-icon" aria-hidden="true">▯</span>
      </header>

      <main className="record-body">
        <section className="rec-status" aria-label="기록 진행 상태">
          <span>REC MODE</span>
          <strong>MEMORY <span>{String(step).padStart(2, '0')}/04</span></strong>
          <i aria-hidden="true" />
        </section>

        <label className="track-search">
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="음악 검색" autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const q = e.currentTarget.value.trim(); navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search'); } }} />
        </label>

        <section className="selected-track" aria-label="선택한 음악">
          <img src={silverSable} alt="New Emotions 앨범 아트" />
          <div>
            <strong>New Emotions</strong>
            <span>Artistic Soul</span>
            <em></em>
          </div>
          <button type="button" aria-label="다른 음악 선택" onClick={() => navigate('/search')}>↔</button>
        </section>

        <section className="photo-upload">
          <label className="photo-polaroid" htmlFor="photoInput">
            <input type="file" id="photoInput" accept="image/*" onChange={handlePhotoChange} />
            {photoSrc ? (
              <img src={photoSrc} alt="선택한 기록 사진" className="visible" />
            ) : (
              <>
                <b aria-hidden="true">▣</b>
                <span>이날의 사진 추가</span>
              </>
            )}
          </label>
        </section>

        <form onSubmit={handleSubmit}>
          <fieldset className="choice-group">
            <legend><i />어떤 기분인가요?</legend>
            <div className="choice-list">
              {EMOTIONS.map(e => (
                <button key={e} type="button" className={emotion === e ? 'is-selected' : ''} onClick={() => setEmotion(e)}>
                  ● {e}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="choice-group">
            <legend><i />무엇을 하고 있나요?</legend>
            <div className="choice-list">
              {ACTIVITIES.map(a => (
                <button key={a} type="button" className={activity === a ? 'is-selected' : ''} onClick={() => setActivity(a)}>
                  ● {a}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="record-field">
            <span>위치</span>
            <div>
              <b aria-hidden="true">♧</b>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="어디서 듣고 있나요?" />
            </div>
          </label>

          <label className="record-field">
            <span>메모</span>
            <textarea value={memo} onChange={e => setMemo(e.target.value)} rows={4} placeholder="지금의 생각이나 가사를 적어보세요..." />
          </label>

          <div className="step-buttons">
            <button type="button" onClick={() => setStep(s => Math.max(1, s - 1))}>‹ PREVIOUS</button>
            <button type="button" onClick={() => setStep(s => Math.min(4, s + 1))}>NEXT ›</button>
          </div>

          <button type="submit" className="save-record-btn">
            <span aria-hidden="true">●</span>
            <b>▮▮▮▮ (REC)</b>
          </button>
        </form>
      </main>

      <Toast $show={toast.show}>{toast.message}</Toast>
    </RecordPage>
  );
};

export default Record;
