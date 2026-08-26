import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import profileSarah from '../assets/profile-sarah.png';
import recordHangang from '../assets/record-hangang.png';
import hypeboy from '../assets/hypeboy.jpg';
import hikeySummer from '../assets/hikey_summer.jpg';
import wooaSummer from '../assets/wooa_summer.jpg';

export type MemoryRecord = {
  id: string;
  title: string;
  artist: string;
  date: string;
  emotion: string;
  activity: string;
  location: string;
  memo: string;
  tags: string[];
  image?: string;
};

export type Playlist = { id: string; title: string; recordIds: string[] };
export type ProfileData = { name: string; bio: string; photo?: string };
export type PrivacyLevel = 'public' | 'friends' | 'private';
export type SettingsData = {
  notifications: boolean;
  notificationLikes: boolean;
  notificationFollows: boolean;
  notificationReminders: boolean;
  darkMode: boolean;
  aiInsights: boolean;
  publicProfile: boolean;
  privacyLevel: PrivacyLevel;
};

type StoreValue = {
  records: MemoryRecord[];
  playlists: Playlist[];
  profile: ProfileData;
  settings: SettingsData;
  likedRecordIds: string[];
  likedSharedIds: string[];
  followedUserIds: string[];
  addRecord: (record: Omit<MemoryRecord, 'id' | 'date'>) => string;
  deleteRecord: (id: string) => void;
  addPlaylist: (title: string) => void;
  addToPlaylist: (playlistId: string, recordId: string) => void;
  updateProfile: (profile: ProfileData) => void;
  updateSettings: (patch: Partial<SettingsData>) => void;
  toggleRecordLike: (id: string) => void;
  toggleSharedLike: (id: string) => void;
  toggleFollow: (id: string) => void;
};
type AppState = Pick<StoreValue, 'records' | 'playlists' | 'profile' | 'settings' | 'likedRecordIds' | 'likedSharedIds' | 'followedUserIds'>;

const STORAGE_KEY = 'plivy_react_state_v1';

const seedRecords: MemoryRecord[] = [
  { id:'1', title:'도시의 저녁', artist:'Blueming', date:'2024.05.20', emotion:'차분함', activity:'휴식', location:'한강공원', memo:'노을 지는 한강가에서 들었던 노래. 이 순간을 기억하고 싶어서 기록해둔다.', tags:['차분함','한강','휴식'], image:recordHangang },
  { id:'2', title:'늦은 밤의 헤드폰', artist:'Hype Boy', date:'2024.04.11', emotion:'설렘', activity:'드라이브', location:'서울', memo:'늦은 밤 혼자 달리며 다시 만난 음악.', tags:['설렘','서울','드라이브'], image:hypeboy },
  { id:'3', title:'비 오는 창가', artist:'New Emotions', date:'2024.03.28', emotion:'차분함', activity:'휴식', location:'집', memo:'창문에 떨어지는 빗소리와 잘 어울렸다.', tags:['차분함','비','휴식'], image:wooaSummer },
  { id:'4', title:'여름 산책', artist:'SUMMER NOTE', date:'2024.07.05', emotion:'행복함', activity:'운동', location:'한강', memo:'여름 바람을 맞으며 걸었다.', tags:['행복함','여름','한강'], image:hikeySummer },
];

const initialState = {
  records: seedRecords,
  playlists: [
    { id:'pl1', title:'SUMMER NIGHTS', recordIds:['4'] },
    { id:'pl2', title:'CITY DRIVE', recordIds:['2'] },
    { id:'pl3', title:'RAINY DAYS', recordIds:['3'] },
  ],
  profile: { name:'SARAH JENKINS', bio:'Curating the soundtrack of my life.', photo:profileSarah },
  settings: {
    notifications:true,
    notificationLikes:true,
    notificationFollows:true,
    notificationReminders:true,
    darkMode:false,
    aiInsights:true,
    publicProfile:true,
    privacyLevel:'public' as PrivacyLevel,
  },
  likedRecordIds: [],
  likedSharedIds: ['shared-3'],
  followedUserIds: [],
};

const StoreContext = createContext<StoreValue | null>(null);

export const PlivyStoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialState;
      const parsed = JSON.parse(saved) as AppState;
      const seedImageById = new Map(seedRecords.map(record => [record.id, record.image]));
      return {
        ...initialState,
        ...parsed,
        records: (parsed.records || seedRecords).map(record => ({
          ...record,
          image: record.image || seedImageById.get(record.id),
        })),
        profile: {
          ...initialState.profile,
          ...parsed.profile,
          photo: parsed.profile?.photo || profileSarah,
        },
        settings: {
          ...initialState.settings,
          ...(parsed.settings || {}),
        },
        likedRecordIds: parsed.likedRecordIds || [],
        likedSharedIds: parsed.likedSharedIds || [],
        followedUserIds: parsed.followedUserIds || [],
      };
    } catch { return initialState; }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Plivy 상태를 브라우저에 저장하지 못했습니다.', error);
    }
    document.documentElement.dataset.theme = state.settings.darkMode ? 'dark' : 'light';
  }, [state]);

  const value = useMemo<StoreValue>(() => ({
    ...state,
    addRecord: (record) => {
      const id = String(Date.now());
      const date = new Date().toISOString().slice(0, 10).replaceAll('-', '.');
      setState((prev: AppState) => ({ ...prev, records:[{ ...record, id, date }, ...prev.records] }));
      return id;
    },
    deleteRecord: (id) => setState((prev: AppState) => ({
      ...prev,
      records: prev.records.filter((record: MemoryRecord) => record.id !== id),
      playlists: prev.playlists.map((playlist: Playlist) => ({ ...playlist, recordIds:playlist.recordIds.filter(recordId => recordId !== id) })),
    })),
    addPlaylist: (title) => setState((prev: AppState) => ({ ...prev, playlists:[...prev.playlists, { id:`pl${Date.now()}`, title:title.toUpperCase(), recordIds:[] }] })),
    addToPlaylist: (playlistId, recordId) => setState((prev: AppState) => ({ ...prev, playlists:prev.playlists.map((playlist: Playlist) => playlist.id === playlistId && !playlist.recordIds.includes(recordId) ? { ...playlist, recordIds:[...playlist.recordIds, recordId] } : playlist) })),
    updateProfile: (profile) => setState((prev: AppState) => ({ ...prev, profile })),
    updateSettings: (patch) => setState((prev: AppState) => ({ ...prev, settings:{ ...prev.settings, ...patch } })),
    toggleRecordLike: (id) => setState((prev: AppState) => ({
      ...prev,
      likedRecordIds: prev.likedRecordIds.includes(id) ? prev.likedRecordIds.filter(item => item !== id) : [...prev.likedRecordIds, id],
    })),
    toggleSharedLike: (id) => setState((prev: AppState) => ({
      ...prev,
      likedSharedIds: prev.likedSharedIds.includes(id) ? prev.likedSharedIds.filter(item => item !== id) : [...prev.likedSharedIds, id],
    })),
    toggleFollow: (id) => setState((prev: AppState) => ({
      ...prev,
      followedUserIds: prev.followedUserIds.includes(id) ? prev.followedUserIds.filter(item => item !== id) : [...prev.followedUserIds, id],
    })),
  }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const usePlivyStore = () => {
  const value = useContext(StoreContext);
  if (!value) throw new Error('usePlivyStore must be used inside PlivyStoreProvider');
  return value;
};
