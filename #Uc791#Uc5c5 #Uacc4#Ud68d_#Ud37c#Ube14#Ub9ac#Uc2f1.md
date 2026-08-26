# PLIVY 퍼블리싱 작업 계획

음악 공유 앱 **PLIVY** (스플래시 / 로그인 / 홈 피드) HTML·CSS·JS 퍼블리싱 계획서

---

## 0. 화면-파일명 매핑 (확정)

논의를 거쳐 아래와 같이 확정합니다.

| 파일명 | 화면 | 첨부 이미지 |
|---|---|---|
| `splash.html` | 스플래시 (로고 노출 후 자동 전환) | 스플래시_화면_v1.jpg |
| `index.html` | 로그인 / 회원가입 / 아이디·비밀번호 찾기 | 로그인_화면_v1.jpg |
| `home.html` | 홈 피드 | 홈_피드_v1.jpg |

- 화면 성격에 맞게 의미가 명확한 영문 파일명 **`home.html`**로 지정했습니다.
- 작업 순서는 요청하신 대로 **공통 스타일 → 홈 피드 → 스플래시 → 로그인** 순서로 진행합니다.

---

## 1. 전체 파일 구조

```
plivy/
├── splash.html
├── index.html          # 로그인 / 회원가입 / 비밀번호 찾기
├── home.html             # 홈 피드
├── css/
│   ├── common.css       # CSS 변수, reset, 공통 타이포/버튼/인풋
│   ├── splash.css
│   ├── index.css
│   └── home.css
├── js/
│   ├── data.js           # 공통 데이터 관리 (localStorage 기반 mock API)
│   ├── router.js         # 화면 전환 없이 페이지 이동을 흉내내는 헬퍼(필요 시)
│   ├── splash.js
│   ├── index.js
│   └── home.js
└── assets/
    └── images/            # 커버 이미지 등 (더미 이미지 별도 협의)
```

> ※ SPA 방식 요청에 대한 안내: 3개 파일이 `splash.html / index.html / home.html`로 **분리된 실제 파일**이기 때문에, 엄밀한 SPA(단일 HTML)와는 다릅니다. 각 html은 `location.href` 이동 없이 **자기 화면 내부의 상태 전환**(로그인 화면 안에서 로그인⇄회원가입⇄비번찾기 전환, 스플래시 자동 전환 등)은 JS로 DOM show/hide 처리하고, 화면 간(스플래시→로그인→홈피드) 이동만 페이지 이동을 사용하는 구조로 진행하겠습니다. 추후 React 전환 시 이 구조가 라우트 단위로 자연스럽게 매핑됩니다.

---

## 2. 공통 디자인 시스템 (`common.css`)

### 컬러 (이미지에서 추출)
```css
--color-primary: #C72F63;        /* 포인트 핑크/크림슨 */
--color-primary-dark: #A62651;
--color-primary-light: #F4D9E2;
--color-text: #2B2B2B;
--color-text-sub: #8C8C8C;
--color-bg: #FBF7F5;              /* 로그인 배경 톤 */
--color-bg-alt: #EDEAF7;          /* 스플래시 라벤더 톤 */
--color-surface: #FFFFFF;
--color-border: #ECECEC;
--color-player-bg: #16161A;       /* 미디어 플레이어 다크 배경 */
```

### 타이포그래피
- 로고 타이틀(PLIVY): 넓은 자간(letter-spacing), 세리프 or 고딕 굵게
- 서브 태그라인(DIGITAL/POCKET MEMORY PLAYER): 모노스페이스, 작은 크기, 자간 넓게 (레트로 느낌)
- 본문: 시스템 폰트 스택 or Pretendard

### 공통 요소
- Reset (box-sizing, margin/padding 초기화)
- `max-width: 480px` 컨테이너, 중앙 정렬 (`.app-container`)
- 버튼 컴포넌트: `.btn-primary`(그라데이션/솔리드 핑크), `.btn-social`
- 인풋 컴포넌트: `.input-field` (아이콘 포함 스타일)
- 카드 컴포넌트: `.card`, radius 값 변수화 (`--radius-sm/md/lg`)
- 그림자 변수 (`--shadow-card`, `--shadow-float`)
- 하단 네비게이션 바 공통 스타일

---

## 3. 데이터 구조 설계 (React 전환 대비)

`js/data.js`에서 아래 스키마로 mock 데이터 + localStorage 기반 CRUD 함수를 만들어 화면 3개가 공유합니다.

```js
// User
User = {
  id: string,
  email: string,
  nickname: string,
  profileImage: string | null,
}

// Record (사용자가 남긴 "기록" = 음악 + 순간)
Record = {
  id: string,
  userId: string,
  trackTitle: string,        // 예: HYPE BOY
  artist: string,            // 예: NEW JEANS
  coverImage: string,
  tags: string[],            // 예: ["SUMMER", "CITYPOP"]
  photoImages: string[],     // 폴라로이드 형태로 첨부된 사진들
  duration: number,          // 초 단위, 예: 252 (04:12)
  currentTime: number,       // 재생 위치, 예: 165 (02:45)
  emotion: { emoji: string, label: string } | null, // "기분 좋은 오후의 재즈"
  createdAt: string,         // ISO date, 예: 2024-05-20
  isPublic: boolean,
}

// Playlist ("다시 마주친 음악" 섹션)
Playlist = {
  id: string,
  title: string,             // 예: SUMMER MIX
  coverImage: string,
  recordIds: string[],
}

// SharedTrack ("취향이 비슷한 사람들의 순간" 섹션)
SharedTrack = {
  id: string,
  fileName: string,          // 예: Rainy_Day_Vibe.mp3
  sharedByUserId: string,
  sharedByNickname: string,  // 예: Melody9
  liked: boolean,
}
```

`data.js` 제공 함수 (예시):
- `getCurrentUser()`
- `login(email, password)` / `signup(...)` / `findPassword(email)`
- `getRecentRecords(userId)`
- `getRecordsByDate(date)`
- `addRecord(record)` → 저장 후 홈피드 리스트에 즉시 반영
- `getPlaylists(userId)`
- `getSharedTracksBySimilarTaste()`
- `toggleLikeSharedTrack(id)`

> 실제 첨부 이미지 3장 범위에서는 "기록 저장 폼 UI"까지는 없어서(홈 피드까지만 디자인됨), `addRecord` 등 데이터 함수는 미리 설계해두고 UI 연동은 추후 저장 화면 디자인이 나오면 연결하는 방향으로 진행하겠습니다.

---

## 4. 화면별 상세 계획

### 4.1 홈 피드 (`home.html`) — 최우선 작업
1. 상단 미디어 플레이어 카드 (다크 배경, 커버 폴라로이드 이미지, 곡 정보 HYPE BOY / NEW JEANS, 태그 pill 2개, 하단 진행바)
2. 원형 리모컨형 컨트롤러 (MENU 라벨, ◀◀ ⏺ ▶▶, PLAY 라벨)
3. "나의 최근 기록" — 가로 스크롤 카드 리스트(폴라로이드 형태, 날짜 캡션)
4. "다시 마주친 음악" — 정사각 플레이리스트 카드 그리드(가로 스크롤), 컬러 그라데이션 배경
5. "오늘의 감정과 닮은 기록" — 이모지 + 텍스트 + 재생 버튼 카드
6. "취향이 비슷한 사람들의 순간" — 리스트형 카드(아바타, 파일명, 공유자, 하트 좋아요), "더보기" 링크
7. 하단 고정 네비게이션 바 (홈 / 검색 / 기록추가(중앙 강조 버튼) / 플레이리스트 / 프로필), 홈 active 상태 표시
8. 인터랙션: 좋아요 하트 토글, 가로 스크롤 리스트, (필요 시) 재생 버튼 클릭 시 진행바 애니메이션 mock

### 4.2 스플래시 (`splash.html`)
1. 상단 로고(PLIVY) + 태그라인(POCKET MEMORY PLAYER)
2. 레트로 디바이스 목업 (라벤더 바디)
3. 디바이스 화면: 상태바(≡ OK / 배터리 아이콘), 부팅 아이콘, "SYSTEM BOOTING" / "LOADING MEMORIES...", VER 2.0.4 / INITIALIZING, 로딩 바
4. 디바이스 하단: 원형 컨트롤(MENU, ◀◀ / 재생버튼(원형) / ▶▶, ▶Ⅱ), REC 인디케이터(점멸 애니메이션)
5. 푸터 카피라이트
6. JS: 로딩 바 애니메이션 진행 → 일정 시간(예 2~2.5초) 또는 로딩 바 완료 후 `index.html`(로그인)으로 자동 이동 (요구사항상 로그인 화면이 스플래시 다음 진입점)

### 4.3 로그인 (`index.html`)
1. 로고(PLIVY) + 태그라인(DIGITAL MEMORY PLAYER)
2. 상단 미디어 플레이어 프리뷰 카드(홈피드와 동일 톤의 다크 플레이어 카드, 폴라로이드 콜라주 이미지, 진행바 02:45/04:12)
3. 재생 컨트롤 버튼 3개(이전/재생(강조 핑크 원형)/다음)
4. "로그인" 타이틀 + 서브카피
5. 이메일 인풋(아이콘), 비밀번호 인풋(아이콘, 마스킹)
6. "비밀번호를 잊으셨나요?" 링크 → **비밀번호 찾기 화면으로 전환**(같은 파일 내 상태 전환)
7. 로그인 버튼(그라데이션 핑크, 풀 width)
8. 구분선 "또는"
9. 소셜 로그인 버튼(Google / Apple)
10. 하단 "계정이 없으신가요? 회원가입" 링크 → **회원가입 폼으로 전환**(같은 파일 내 상태 전환)
11. JS: 로그인/회원가입/비번찾기 3개 상태를 하나의 페이지 안에서 전환(폼 유효성 간단 체크, mock 로그인 성공 시 `home.html`로 이동)

---

## 5. JS 모듈 구조 요약

- `data.js`: localStorage 기반 mock DB + CRUD 함수 (화면 3개 공통 import)
- `splash.js`: 로딩 애니메이션 타이머, 자동 리다이렉트
- `index.js`: 폼 전환 상태관리(로그인/회원가입/비번찾기), 유효성 검사, mock 로그인 처리
- `home.js`: 피드 데이터 렌더링(각 섹션별 렌더 함수), 좋아요 토글, 가로 스크롤 UX 보조

---

## 6. 작업 순서 체크리스트

- [ ] **1단계**: `common.css` — 컬러/타이포/spacing/radius 변수, reset, 공통 버튼·인풋·카드·네비 스타일 정의
- [ ] **2단계**: 홈 피드 (`home.html` + `home.css` + `home.js` + `data.js` 초안) — 섹션별 순차 퍼블리싱
- [ ] **3단계**: 스플래시 (`splash.html` + `splash.css` + `splash.js`)
- [ ] **4단계**: 로그인 (`index.html` + `index.css` + `index.js`, 로그인/회원가입/비번찾기 상태 전환 포함)
- [ ] **5단계**: 화면 간 연결(스플래시 → 로그인 → 홈피드) 및 전체 통합 확인

---

계획에 이견 없으시면, 말씀하신 순서대로 **1단계 공통 스타일부터** 요청 주시면 시작하겠습니다.
