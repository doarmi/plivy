import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { SearchContainer, SearchBox, QuickTags, ResultCount, ResultList, ResultCard } from './Search.styles';
import { usePlivyStore } from '../store/PlivyStore';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { records } = usePlivyStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') || '');
  }, [location.search]);

  const filteredRecords = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(record =>
      `${record.title} ${record.artist} ${record.location} ${record.memo} ${record.tags.join(' ')}`.toLowerCase().includes(q)
    );
  }, [query, records]);

  const handleTagClick = (tag: string) => setQuery(tag.replace('#', ''));

  return (
    <SearchContainer className="explore-page">
      <Header title="MEMORY SEARCH" rightIcon={<span>⌕</span>} bgColor="var(--lcd, #c5dca8)" borderColor="#96aa82" />
      <main>
        <SearchBox>
          <span>⌕</span>
          <input
            type="search"
            placeholder="음악, 감정, 장소, 메모 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </SearchBox>
        <QuickTags>
          <button onClick={() => handleTagClick('#차분함')}>#차분함</button>
          <button onClick={() => handleTagClick('#드라이브')}>#드라이브</button>
          <button onClick={() => handleTagClick('#여름')}>#여름</button>
          <button onClick={() => handleTagClick('#한강')}>#한강</button>
        </QuickTags>
        <ResultCount>{query.trim() ? `${filteredRecords.length}개의 검색 결과` : '추천 기록'}</ResultCount>
        <ResultList>
          {filteredRecords.length > 0 ? filteredRecords.map(record => (
            <ResultCard key={record.id} onClick={() => navigate(`/detail/${record.id}`)}>
              {record.image ? <img src={record.image} alt="" /> : <div aria-hidden="true">♪</div>}
              <div>
                <h2>{record.title}</h2>
                <p>{record.artist} · {record.location}</p>
                <small>{record.tags.map(tag => `#${tag}`).join(' ')}</small>
              </div>
              <b>›</b>
            </ResultCard>
          )) : (
            <p className="empty">검색 결과가 없어요.<br />다른 단어로 찾아보세요.</p>
          )}
        </ResultList>
      </main>
    </SearchContainer>
  );
};

export default Search;
