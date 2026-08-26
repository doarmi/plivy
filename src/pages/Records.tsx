import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RecordsPage = styled.div`
  min-height: 100vh;
  padding-bottom: 82px;
  background: var(--paper, #f5f2ea);

  > header {
    height: 52px;
    display: grid;
    grid-template-columns: 52px 1fr 52px;
    align-items: center;
    border-bottom: 1px solid #dedbd4;
    background: rgba(248, 246, 240, 0.96);

    h1 { text-align: center; font-size: 17px; margin: 0; }
    button { height: 52px; font-size: 23px; }
  }

  main { padding: 16px 20px 30px; }
`;

const FilterBar = styled.section`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 11px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  button {
    flex: 0 0 auto;
    padding: 8px 13px;
    border: 1px solid #d9d4db;
    border-radius: 18px;
    background: #fff;
    color: #777;
    font-size: 11px;
    transition: 0.15s;

    &.active {
      border-color: var(--color-primary, #c72f63);
      background: var(--color-primary, #c72f63);
      color: #fff;
    }
  }
`;

const Count = styled.p`
  margin: 8px 2px 14px;
  color: #8a878b;
  font: 8px/1 var(--font-mono);
  letter-spacing: 0.13em;
`;

const RecordsGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 12px;

  .empty {
    grid-column: 1 / -1;
    padding: 70px 20px;
    text-align: center;
    color: #888;
  }
`;

const MemoryCard = styled.button<{ $rotation?: string }>`
  position: relative;
  padding: 9px 9px 14px;
  background: #fff;
  box-shadow: 0 8px 16px rgba(43, 39, 48, 0.12);
  text-align: left;
  transform: rotate(${props => props.$rotation || '0deg'});

  .memory-image {
    width: 100%;
    aspect-ratio: 1/1;
    background: ${props => props.color || 'linear-gradient(145deg, #85939f, #45505d)'};
  }

  h2 { margin-top: 10px; font: 700 10px/1.2 var(--font-mono); }
  p { margin-top: 5px; color: #888; font: 7px/1.3 var(--font-mono); margin-bottom: 0; }
  time { display: block; margin-top: 9px; text-align: right; color: #aaa; font: 7px/1 var(--font-mono); }

  .tag {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 4px 6px;
    background: rgba(22, 23, 27, 0.72);
    color: #fff;
    font: 6px/1 var(--font-mono);
  }
`;

const DEMO_RECORDS = [
  { id: '1', title: '도시의 저녁', meta: 'Blueming · 한강', tags: '#차분함', date: '2024.05.20', gradient: 'linear-gradient(155deg,#82769d,#352f46 55%,#c79586)', filter: 'calm' },
  { id: '2', title: '늦은 밤의 헤드폰', meta: 'Hype Boy · 서울', tags: '#드라이브', date: '2024.04.11', gradient: 'linear-gradient(145deg,#171719,#5d5045 60%,#b18d6b)', filter: 'drive' },
  { id: '3', title: '비 오는 창가', meta: 'New Emotions · 집', tags: '#차분함', date: '2024.03.28', gradient: 'linear-gradient(140deg,#93a3ae,#495d68 56%,#d7c0a8)', filter: 'calm' },
  { id: '4', title: '여름 산책', meta: 'SUMMER NOTE · 한강', tags: '#여름', date: '2024.07.05', gradient: 'linear-gradient(145deg,#c9d8b3,#8fa278 55%,#efe7dc)', filter: 'summer' },
  { id: '5', title: '드라이브 믹스', meta: 'City Light · 서울', tags: '#드라이브', date: '2024.06.18', gradient: 'linear-gradient(145deg,#7b8fad,#3d4e62 55%,#b0c0d0)', filter: 'drive' },
  { id: '6', title: '여름 오후', meta: 'Blueming · 카페', tags: '#여름', date: '2024.07.22', gradient: 'linear-gradient(145deg,#f0e0b0,#c8a060 55%,#ffe0a0)', filter: 'summer' },
];

const ROTATIONS = ['0deg', '1deg', '-1deg', '0deg', '1deg', '-1deg'];

const Records: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? DEMO_RECORDS : DEMO_RECORDS.filter(r => r.filter === filter);

  return (
    <RecordsPage className="records-page">
      <header>
        <button onClick={() => navigate(-1)}>‹</button>
        <h1>전체 레코드</h1>
        <button onClick={() => navigate('/search')}>⌕</button>
      </header>
      <main>
        <FilterBar>
          {[['all', '전체'], ['calm', '차분함'], ['drive', '드라이브'], ['summer', '여름']].map(([val, label]) => (
            <button key={val} className={filter === val ? 'active' : ''} onClick={() => setFilter(val)}>
              {label}
            </button>
          ))}
        </FilterBar>

        <Count><b>{filtered.length}</b> MEMORIES ARCHIVED</Count>

        <RecordsGrid>
          {filtered.length > 0 ? filtered.map((r, i) => (
            <MemoryCard key={r.id} $rotation={ROTATIONS[i % ROTATIONS.length]} onClick={() => navigate(`/detail/${r.id}`)}>
              <div className="memory-image" style={{ background: r.gradient }} />
              <span className="tag">{r.tags}</span>
              <h2>{r.title}</h2>
              <p>{r.meta}</p>
              <time>{r.date}</time>
            </MemoryCard>
          )) : (
            <p className="empty">기록이 없어요.</p>
          )}
        </RecordsGrid>
      </main>
    </RecordsPage>
  );
};

export default Records;
