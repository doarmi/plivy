# PLIVY — Music Diary Community

> 음악을 들었던 순간의 감정과 기억을 기록하고, 다시 발견할 수 있도록 만든 음악 다이어리 웹앱 프로토타입입니다.

## 프로젝트 소개

PLIVY는 단순히 음악 제목이나 플레이리스트만 저장하는 것이 아니라, **음악을 들었던 순간의 감정 · 활동 · 장소 · 사진 · 메모를 함께 기록하는 경험**을 중심으로 기획한 음악 다이어리 서비스입니다.

음악을 다시 들었을 때 곡 자체뿐 아니라 **“그때 어디에 있었는지, 무엇을 하고 있었는지, 어떤 감정을 느꼈는지”**까지 함께 떠올릴 수 있도록 음악과 개인의 기억을 연결하는 것을 목표로 했습니다.

기록, 검색, 플레이리스트, 프로필, 공유 등의 기능을 하나의 모바일 중심 웹앱으로 구성하고, React 기반 화면 구현과 상태 관리, 브라우저 저장, Serverless API와 외부 메일 API 연결까지 구현했습니다.

## Project Links

- 🌐 **Vercel** — [배포 사이트](https://plivy-jzov.vercel.app/)
- 🎨 **Figma** — [디자인 페이지](https://www.figma.com/design/VU5NcxQFkR3RgY0yRYK2La/Untitled?node-id=0-1&t=lY2imtRaDfA3VJZ8-1)
- 🖼️ **Notefolio** — [포트폴리오 보기](https://notefolio.net/hyogu_U2)
- 📄 **Notion** — [포트폴리오 노션](https://app.notion.com/p/375cedfd0bc08356a2ae817409b561ea?source=copy_link)

---

## 주요 화면

| Route | 화면 |
| --- | --- |
| `#/splash` | Splash |
| `#/login` | 로그인 / 회원가입 / 비밀번호 재설정 요청 |
| `#/` | Home |
| `#/search` | Search |
| `#/record` | Record |
| `#/detail/:id` | Record Detail |
| `#/playlists` | Playlists |
| `#/profile` | Profile |
| `#/profile/edit` | Profile Edit |
| `#/records` | Records |
| `#/settings` | Settings |

현재 배포 앱은 `src/plivy-feature-entry.tsx` → `PlivyFeatureApp.tsx`를 중심으로 구성되어 있습니다.

---

## 주요 기능

### 1. 로그인 / 회원가입

PLIVY를 처음 이용하는 사용자를 위한 로그인 및 회원가입 화면을 구성했습니다.

- 이메일 형식 검증
- 비밀번호 검증
- 닉네임 기반 회원가입
- 중복 이메일 확인
- 로그인 세션 저장
- 데모 계정 제공

현재 사용자와 세션 데이터는 브라우저 `localStorage`를 이용해 관리합니다.

> 별도의 인증 서버나 Firebase Authentication을 사용하는 구조는 아닙니다.

---

### 2. 비밀번호 재설정 안내 메일

로그인 화면에서 가입된 이메일을 확인한 뒤 `/api/password-reset`으로 요청하도록 구현했습니다.

Vercel Serverless Function에서 **Resend API**를 호출해 비밀번호 재설정 안내 메일을 발송합니다.

이를 통해 프론트엔드 화면에 그치지 않고 외부 API와 Serverless Function을 연결하는 흐름을 구현했습니다.

> 현재는 포트폴리오 프로토타입을 위한 메일 발송 기능이며, 인증 토큰 검증 → 새 비밀번호 입력 → 서버 계정 비밀번호 변경까지 이어지는 완전한 비밀번호 재설정 시스템은 포함하지 않습니다.

---

### 3. 음악 기록 작성

PLIVY의 핵심 경험은 **음악과 그 순간의 기억을 함께 기록하는 것**입니다.

Record 화면에서는 다음 정보를 입력하거나 선택할 수 있습니다.

- 음악 검색 UI
- 선택된 음악 카드
- 사진 선택 및 미리보기
- 감정 선택
  - 설렘
  - 차분함
  - 쓸쓸함
  - 행복함
- 활동 선택
  - 공부
  - 휴식
  - 드라이브
  - 운동
- 위치 입력
- 메모 작성
- 4단계 Record 진행 UI

음악 정보만 저장하는 것이 아니라 **감정 · 활동 · 장소 · 사진 · 메모를 함께 구성해 하나의 음악 기억으로 표현**하도록 설계했습니다.

> 현재 Record 화면의 저장 버튼은 저장 완료 Toast와 Home 이동까지 구현되어 있으며, 입력한 값을 `PlivyStore`의 신규 Record로 추가하는 연결은 현재 프로토타입 범위에 포함되지 않습니다.

---

### 4. 음악 기록 / 상태 관리

`PlivyStore`를 통해 앱에서 필요한 주요 상태를 관리합니다.

- Records
- Playlists
- Profile
- Settings
- 좋아요 상태
- 공유 콘텐츠 좋아요 상태
- 팔로우 상태

상태는 `localStorage`에 저장되어 브라우저를 새로고침한 이후에도 일부 사용자 상태가 유지됩니다.

포트폴리오 시연을 위해 초기 Seed / Demo 데이터가 포함되어 있습니다.

---

### 5. Playlist

Playlist 화면에서는 음악과 기록을 기반으로 한 플레이리스트 경험을 제공합니다.

- 플레이리스트 표시
- Playlist 관련 상태 처리
- Web Share API 지원 환경에서 공유
- Web Share API 미지원 환경에서 Clipboard로 링크 복사

기록된 음악을 개별적인 순간으로만 남기는 것이 아니라 다시 탐색할 수 있도록 구성했습니다.

---

### 6. Record Detail

상세 화면에서는 하나의 음악 기록과 관련된 정보 및 사용자 인터랙션을 확인할 수 있습니다.

- 기록 상세 정보
- 좋아요 상태 변경
- Playlist 연결 관련 인터랙션
- Web Share API 기반 공유
- 미지원 환경에서 링크 복사

---

### 7. Search

음악과 기록을 탐색할 수 있는 Search 화면을 구현했습니다.

현재 검색은 실제 외부 음악 API나 서버 검색 엔진이 아닌 **프로젝트 내부 데모 데이터를 기반으로 동작하는 프로토타입**입니다.

---

### 8. Profile

사용자가 자신의 음악 기록 활동을 확인할 수 있도록 Profile 영역을 구성했습니다.

- 프로필 정보 표시
- 기록 수
- Playlist 수
- Profile Edit
- 프로필 데이터 상태 관리

프로필 관련 상태 역시 `PlivyStore`를 통해 관리합니다.

---

### 9. Settings

사용자가 서비스 이용 환경을 설정할 수 있는 Settings 화면을 구성했습니다.

설정 데이터에는 다음 항목이 포함되어 있습니다.

- 알림
- 좋아요 알림
- 팔로우 알림
- 리마인더
- Dark Mode
- AI Insights
- 공개 프로필
- Privacy Level

Dark Mode는 `document.documentElement.dataset.theme`과 연결해 실제 테마 UI에 반영됩니다.

> 일부 설정은 실제 Push Notification이나 AI 서비스와 연결된 기능이 아닌 UI / 상태 프로토타입입니다.

---

## User Flow

```text
Splash
   ↓
Login / Sign Up
   ↓
Home
   ↓
Search / Record / Playlists
   ↓
Record Detail
   ↓
Profile / Records
   ↓
Settings
```

핵심 사용자 경험은 **음악 발견 → 순간 기록 → 다시 탐색 → 공유**의 흐름을 만드는 것입니다.

---

## 데이터 저장 방식

PLIVY는 현재 별도의 데이터베이스 서버 대신 브라우저의 `localStorage`를 사용합니다.

주요 저장 Key:

```text
plivy_users
plivy_session
plivy_react_state_v1
```

따라서 현재 버전은 **프론트엔드 중심의 인터랙티브 서비스 프로토타입**이며, 브라우저나 기기가 달라지면 동일한 데이터가 자동으로 동기화되는 구조는 아닙니다.

---

## Tech Stack

| 구분 | 기술 |
| --- | --- |
| Frontend | React 19 |
| Language | TypeScript |
| Routing | React Router DOM |
| Styling | styled-components / CSS |
| Build | Vite |
| State | React Context / Hooks |
| Local Persistence | localStorage |
| Share | Web Share API / Clipboard API |
| Serverless API | Vercel Serverless Function |
| Email | Resend API |
| Deployment | Vercel |

---

## 프로젝트 구조

```text
PLIVY/
├── api/
│   └── password-reset.js
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── Toast.tsx
│   ├── pages/
│   │   ├── Splash.tsx
│   │   ├── Login.tsx
│   │   ├── FeatureHome.tsx
│   │   ├── Search.tsx
│   │   ├── Record.tsx
│   │   ├── Records.tsx
│   │   ├── FeatureDetail.tsx
│   │   ├── FeaturePlaylists.tsx
│   │   ├── ProfileConnected.tsx
│   │   ├── ProfileEditConnected.tsx
│   │   └── FeatureSettings.tsx
│   ├── store/
│   │   └── PlivyStore.tsx
│   ├── styles/
│   ├── PlivyFeatureApp.tsx
│   └── plivy-feature-entry.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

> `publising/org`에 남아 있는 이전 정적 퍼블리싱 버전은 위 구조에서 제외하고 현재 React Feature App을 중심으로 정리했습니다.

---

## 구현 범위

### 실제 구현된 주요 기능

- React + TypeScript 기반 다중 화면 웹앱
- Hash Router 기반 화면 전환
- 로그인 / 회원가입 프로토타입
- `localStorage` 기반 사용자 및 앱 상태 유지
- 음악 기록 작성 UI
- 사진 선택 및 미리보기
- Record / Playlist / Profile / Settings UI
- 좋아요 / 팔로우 상태 인터랙션
- Dark Mode
- Web Share API / Clipboard API 기반 공유
- Vercel Serverless Function
- Resend API 기반 비밀번호 재설정 안내 메일
- Vercel 배포

### 프로토타입 구현 범위에 포함되지 않는 기능

- Firebase Authentication
- 서버 데이터베이스
- 사용자 간 실시간 데이터 동기화
- 실제 음악 스트리밍 API
- 실제 Push Notification
- 실제 AI 분석 / 큐레이션 API
- 토큰 기반의 완전한 비밀번호 변경 시스템
- Record 작성 폼과 Store의 신규 Record 저장 연결

기획된 기능과 현재 프로토타입에서 실제 동작하는 기능을 구분해 프로젝트의 구현 범위를 명확하게 정리했습니다.

---

## 실행 방법

```bash
npm install
npm run dev
```

Production Build:

```bash
npm run build
```

Build Preview:

```bash
npm run preview
```

---

## Resend 환경 변수

비밀번호 재설정 안내 메일 기능을 사용하려면 배포 환경에 Resend API Key가 필요합니다.

```text
RESEND_API_KEY
```

API Key는 소스코드에 직접 작성하지 않고 Vercel 환경 변수로 관리합니다.

---

## 제작 의도

기존 음악 서비스의 재생 기록만으로는 **“그 음악을 왜 들었고, 그 순간이 어땠는지”**까지 남기기 어렵다고 생각했습니다.

그래서 PLIVY에서는 음악을 하나의 재생 기록으로만 남기는 것이 아니라 **감정, 활동, 장소, 사진, 메모와 함께 하나의 기억으로 기록하는 경험**을 설계했습니다.

사용자가 나중에 음악을 다시 발견했을 때 곡 제목뿐 아니라 **그 음악을 듣던 당시의 순간과 감정까지 함께 떠올릴 수 있는 서비스**를 만드는 것이 PLIVY의 핵심 목표입니다.

기획과 UI/UX 디자인에서 끝내지 않고 React 기반 화면 구현, 상태 관리, 브라우저 저장, 공유 기능, Serverless Function과 외부 메일 API 연결까지 구현하며 **아이디어를 실제로 탐색할 수 있는 서비스 프로토타입으로 만드는 과정**에 초점을 맞췄습니다.
