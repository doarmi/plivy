import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HomeContainer, DevicePlayer, FeedSection, 
  RecordCard, PlaylistCard, SharedCard, ToastPopup 
} from './Home.styles';

// Mock Data
const MOCK_RECENT_RECORDS = [
  { id: 1, title: "도시의 저녁", date: "2024.05.20", gradient: "linear-gradient(155deg,#82769d,#352f46 55%,#c79586)", tilt: "-2deg" },
  { id: 2, title: "늦은 밤의 헤드폰", date: "2024.04.11", gradient: "linear-gradient(145deg,#171719,#5d5045 60%,#b18d6b)", tilt: "3deg" },
  { id: 3, title: "비 오는 창가", date: "2024.03.28", gradient: "linear-gradient(140deg,#93a3ae,#495d68 56%,#d7c0a8)", tilt: "-1deg" }
];

const MOCK_PLAYLISTS = [
  { id: 1, title: "SUMMER MIX", background: "#e4e8f4" },
  { id: 2, title: "NIGHT WALK", background: "#e9e1ff" },
  { id: 3, title: "RAINY CAFE", background: "#f9dbe6" }
];

const MOCK_SHARED_TRACKS = [
  { id: 1, name: "Rainy_Day_Vibe.mp3", by: "Melody9", liked: false },
  { id: 2, name: "Memory_001.mp3", by: "User123", liked: false },
  { id: 3, name: "City_Night.mp3", by: "Sarah", liked: true }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [moodPlaying, setMoodPlaying] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(1);
  const [sharedTracks, setSharedTracks] = useState(MOCK_SHARED_TRACKS);
  
  // Toast State
  const [toastMessage, setToastMessage] = useState("");
  const [toastShow, setToastShow] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastShow(true);
  };

  useEffect(() => {
    if (toastShow) {
      const timer = setTimeout(() => setToastShow(false), 1600);
      return () => clearTimeout(timer);
    }
  }, [toastShow]);

  const handleLike = (id: number) => {
    setSharedTracks(tracks => tracks.map(track => 
      track.id === id ? { ...track, liked: !track.liked } : track
    ));
  };

  return (
    <HomeContainer className="app-container">
      <DevicePlayer aria-label="현재 재생 중">
        <div className="player-display">
          <div className="album-placeholder" aria-hidden="true"><span>PLIVY</span></div>
          <div className="track-info">
            <p className="eyebrow">NOW PLAYING</p>
            <h1>HYPE BOY</h1>
            <p>NEW JEANS</p>
            <div className="tag-row"><span>#SUMMER</span><span>#CITYPOP</span></div>
          </div>
          <div className="progress"><span></span></div>
        </div>
        <div className="mini-control">
          <span className="control-label">MENU</span>
          <button type="button" onClick={() => showToast("다른 음악으로 이동했어요.")} aria-label="이전 곡">◀◀</button>
          <button 
            type="button" 
            className="control-main" 
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "일시정지" : "재생"}
          >
            {playing ? "Ⅱ" : "▶"}
          </button>
          <button type="button" onClick={() => showToast("다른 음악으로 이동했어요.")} aria-label="다음 곡">▶▶</button>
          <span className="control-play">PLAY</span>
        </div>
      </DevicePlayer>

      <FeedSection>
        <h2>나의 최근 기록</h2>
        <div className="horizontal-list recent-list">
          {MOCK_RECENT_RECORDS.map(item => (
            <RecordCard key={item.id} $tilt={item.tilt}>
              <button 
                type="button" 
                className="record-image" 
                style={{ backgroundImage: item.gradient }}
                onClick={() => navigate(`/detail/${item.id}`)}
              >
                <span>{item.title}</span>
              </button>
              <time dateTime={item.date}>{item.date.replaceAll("-", ".")}</time>
            </RecordCard>
          ))}
        </div>
      </FeedSection>

      <FeedSection>
        <h2>다시 마주친 음악</h2>
        <div className="horizontal-list playlist-list">
          {MOCK_PLAYLISTS.map(item => (
            <PlaylistCard 
              key={item.id} 
              $bg={item.background} 
              $selected={selectedPlaylist === item.id}
              onClick={() => setSelectedPlaylist(item.id)}
            >
              <span className="disc" aria-hidden="true"></span>
              <strong>{item.title}</strong>
            </PlaylistCard>
          ))}
        </div>
      </FeedSection>

      <FeedSection>
        <h2>오늘의 감정과 닮은 기록</h2>
        <article className="mood-card">
          <span className="mood-icon" aria-hidden="true">☺</span>
          <div>
            <strong>기분 좋은 오후의 재즈</strong>
            <p>어제 오후 3시에 남긴 기록</p>
          </div>
          <button 
            type="button" 
            className="round-action" 
            onClick={() => setMoodPlaying(!moodPlaying)}
            aria-label="기록 재생"
          >
            {moodPlaying ? "Ⅱ" : "▶"}
          </button>
        </article>
      </FeedSection>

      <FeedSection className="shared-section">
        <div className="section-heading">
          <h2>취향이 비슷한 사람들의 순간</h2>
          <button type="button" onClick={() => navigate('/records')}>더보기</button>
        </div>
        <div className="shared-list">
          {sharedTracks.map(item => (
            <SharedCard key={item.id}>
              <span className="avatar" aria-hidden="true">♙</span>
              <div>
                <strong>{item.name}</strong>
                <p>Shared by {item.by}</p>
              </div>
              <button 
                type="button" 
                className={`like-button ${item.liked ? 'liked' : ''}`}
                onClick={() => handleLike(item.id)}
                aria-label="좋아요"
              >
                {item.liked ? "♥" : "♡"}
              </button>
            </SharedCard>
          ))}
        </div>
      </FeedSection>

      <ToastPopup $show={toastShow}>{toastMessage}</ToastPopup>
    </HomeContainer>
  );
};

export default Home;
