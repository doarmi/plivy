# PLIVY 퍼블리싱 작업 계획

음악 공유 앱 **PLIVY**의 초기 3개 화면과 이후 확장 화면·기능을 포함한 HTML·CSS·JavaScript 퍼블리싱 최신 계획서

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

- [x] **1단계**: `common.css` — 컬러/타이포/spacing/radius 변수, reset, 공통 버튼·인풋·카드·네비 스타일 정의
- [x] **2단계**: 홈 피드 (`home.html` + `home.css` + `home.js` + `data.js` 초안) — 섹션별 순차 퍼블리싱
- [x] **3단계**: 스플래시 (`splash.html` + `splash.css` + `splash.js`)
- [x] **4단계**: 로그인 (`index.html` + `index.css` + `index.js`, 로그인/회원가입/비번찾기 상태 전환 포함)
- [x] **5단계**: 화면 간 연결(스플래시 → 로그인 → 홈피드) 및 전체 통합 확인

---

---

## 7. 5단계 이후 추가 작업

### 6단계: 핵심 확장 화면 제작

기존 스플래시·로그인·홈 피드 이후 실제 서비스 시연 범위를 넓히기 위해 다음 화면을 추가했습니다.

| 파일명 | 화면 | 주요 기능 |
|---|---|---|
| `record.html` | 음악 기록 작성 | 음악 선택, 사진 첨부, 감정·활동 선택, 위치·메모 입력, 기록 저장 |
| `profile.html` | 프로필 및 목록 | 사용자 정보, 팔로워 통계, 저장공간 통계, 아카이브 메뉴, 미니 플레이어 |
| `profile-detail.html` | 프로필 상세 | 공개 프로필, 통계, 최근 기록, 전체 레코드 이동 |
| `detail.html` | 기록 상세 | 기록 사진, 음악 플레이어, 태그, 메모, 좋아요·저장·공유·플레이리스트 추가 |
| `profile-edit.html` | 프로필 수정 | 프로필 사진, 이름, 소개 수정 및 저장 |
| `records.html` | 전체 레코드 | 기록 그리드, 감정·활동 필터, 기록 상세 이동 |

#### 6단계 데이터 연결

- 음악 기록 저장 시 `localStorage`의 `plivy_records`에 기록합니다.
- 새 기록은 홈 피드와 전체 레코드 화면에 반영됩니다.
- 기록 카드 선택 시 선택한 기록 ID를 `sessionStorage`에 보관하고 기록 상세로 이동합니다.
- 프로필 수정 내용은 `localStorage`의 `plivy_profile`에 저장하고 프로필 화면에 반영합니다.

### 7단계: 검색·플레이리스트·설정 및 기능 보완

| 파일명 | 화면 | 주요 기능 |
|---|---|---|
| `search.html` | 통합 검색 | 음악, 감정, 활동, 장소, 메모 검색 및 빈 결과 상태 |
| `playlists.html` | 플레이리스트 | 기본 목록 표시, 새 플레이리스트 생성, 기록 연결 |
| `settings.html` | 설정 | 다크모드, 공개 범위, 알림, 데이터 내보내기, 로그아웃 |

#### 기록 관리 기능

- 사용자가 저장한 기록을 다시 불러와 수정할 수 있습니다.
- 기록 상세에서 저장한 기록을 삭제할 수 있습니다.
- 기록을 기본 플레이리스트에 추가할 수 있습니다.
- 데이터 구조에 `updateRecord`, `deleteRecord`, `getPlaylists`, `addPlaylist`, `addRecordToPlaylist`를 추가했습니다.

#### 하단 내비게이션 연결

- 홈 → `home.html`
- 검색 → `search.html`
- 중앙 기록 버튼 → `record.html`
- 플레이리스트 → `playlists.html`
- 프로필 → `profile.html`
- 전체 기록 보기 → `records.html`

### 8단계: 설정 화면 오류 수정

#### 프로필에서 설정 진입

- 프로필의 기존 `Privacy & Safety` 항목을 `Settings`로 변경했습니다.
- `profile.html`을 실행한 상태에서 `Settings`를 누르면 `settings.html`로 이동합니다.
- 설정 화면을 별도로 Live Server로 실행하지 않아도 전체 흐름 안에서 진입할 수 있습니다.

#### 다크모드 개선

- 화면 전체에 밝기 필터를 적용하던 방식을 제거했습니다.
- 배경, 카드, 입력창, LCD 패널, 상단 바, 본문 글자에 실제 다크 컬러를 각각 적용합니다.
- 선택한 테마는 `localStorage`의 `plivy_theme`에 저장되어 새로고침 후에도 유지됩니다.

#### 공개 범위 및 알림 설정

- 공개 범위 클릭 시 하단 선택 패널을 표시합니다.
- 전체 공개, 친구 공개, 비공개 중 하나를 선택할 수 있습니다.
- 알림 설정 클릭 시 기록 리마인드, 친구 활동, 음악 회상 알림을 각각 설정할 수 있습니다.
- 설정값은 `localStorage`의 `plivy_preferences`에 저장합니다.

### 9단계: 프로필 사진 저장 오류 수정

- 기본 이미지 로드 실패 후 `display:none`이 유지되던 문제를 수정했습니다.
- 저장된 프로필 사진을 불러올 때 이미지 요소를 다시 표시합니다.
- 업로드한 사진을 중앙 기준 정사각형으로 자른 뒤 512×512 JPEG로 축소합니다.
- 큰 이미지로 인한 `localStorage` 용량 초과 가능성을 줄였습니다.
- 프로필 저장 후 `profile.html`로 자동 이동합니다.
- 저장 실패 시 사용자에게 사진 용량 안내 메시지를 표시합니다.

---

## 8. 최종 파일 구조

```text
project001/
├── publising/
│   ├── splash.html
│   ├── index.html
│   ├── home.html
│   ├── search.html
│   ├── record.html
│   ├── records.html
│   ├── detail.html
│   ├── playlists.html
│   ├── profile.html
│   ├── profile-detail.html
│   ├── profile-edit.html
│   ├── settings.html
│   ├── css/
│   │   ├── common.css
│   │   ├── splash.css
│   │   ├── index.css
│   │   ├── home.css
│   │   ├── search.css
│   │   ├── record.css
│   │   ├── records.css
│   │   ├── detail.css
│   │   ├── playlists.css
│   │   ├── profile.css
│   │   ├── profile-detail.css
│   │   ├── profile-edit.css
│   │   └── settings.css
│   └── js/
│       ├── data.js
│       ├── splash.js
│       ├── index.js
│       ├── home.js
│       ├── search.js
│       ├── record.js
│       ├── records.js
│       ├── detail.js
│       ├── playlists.js
│       ├── profile.js
│       ├── profile-detail.js
│       ├── profile-edit.js
│       └── settings.js
└── img/
    ├── profile-sarah.png
    ├── record-hangang.png
    └── 앨범 및 기록 이미지 파일
```

---

## 9. 현재 전체 화면 흐름

```text
스플래시
  ↓
로그인·회원가입·비밀번호 찾기
  ↓
홈 피드
  ├─ 검색
  ├─ 음악 기록 작성 → 저장 → 홈 피드
  ├─ 전체 레코드 → 기록 상세 → 수정·삭제·플레이리스트 추가
  ├─ 플레이리스트
  └─ 프로필
       ├─ 프로필 상세
       ├─ 프로필 수정
       └─ Settings
            ├─ 다크모드
            ├─ 공개 범위
            ├─ 알림 설정
            ├─ 데이터 내보내기
            └─ 로그아웃
```

---

## 10. 최종 확인 체크리스트

- [x] 모바일 우선 `max-width: 480px` 적용
- [x] 스플래시 → 로그인 → 홈 피드 연결
- [x] 로그인·회원가입·비밀번호 찾기 상태 전환
- [x] 음악 기록 생성 및 로컬 저장
- [x] 기록 수정·삭제 및 상세 조회
- [x] 검색 및 빈 결과 상태
- [x] 플레이리스트 생성과 기록 추가
- [x] 프로필 수정 내용 반영
- [x] 프로필 사진 축소·저장·재표시
- [x] 설정 화면 진입 및 설정값 저장
- [x] 다크모드 컬러 개선
- [x] 공개 범위·알림 설정 패널 연결
- [x] 전체 하단 내비게이션 연결
- [x] HTML 참조 경로 및 JavaScript 문법 검사

## 11. 다음 최종 QA 권장 항목

- Chrome, Edge, Safari에서 주요 화면 비교
- 360px, 390px, 430px, 480px 너비에서 스크롤과 간격 확인
- 업로드 이미지 형식별 JPEG, PNG, WebP 테스트
- 기록이 없을 때와 여러 개 저장했을 때 목록 확인
- 다크모드에서 모든 카드의 대비 및 가독성 확인
- 포트폴리오 시연 전 `localStorage` 데모 데이터 초기화 여부 결정
