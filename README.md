# PLIVY

> **Digital Memory Player**\
> 음악을 들었던 순간의 감정과 기억을 기록하고, 다시 발견할 수 있도록
> 만든 음악 다이어리 웹앱 프로토타입입니다.

## 프로젝트 소개

PLIVY는 단순히 음악 제목이나 플레이리스트만 저장하는 것이 아니라,\
**음악을 들었던 순간의 감정 · 활동 · 장소 · 사진 · 메모를 함께 남기는
경험**을 중심으로 제작한 웹앱입니다.

이번 README는 실제 배포 진입점인 `PlivyFeatureApp`과 현재 소스코드를
기준으로 작성했습니다.\
기획 단계의 기능과 실제 구현된 기능을 구분해 표기했습니다.

------------------------------------------------------------------------
## Project Links

- 🌐 **Vercel** — [배포 사이트](https://plivy-jzov.vercel.app/)
- 🎨 **Figma** — [디자인 페이지](https://www.figma.com/design/VU5NcxQFkR3RgY0yRYK2La/Untitled?node-id=0-1&t=lY2imtRaDfA3VJZ8-1)
- 🖼️ **Notefolio** — [포트폴리오 보기](https://notefolio.net/hyogu_U2)
- 📄 **Notion** — [포트폴리오 노션](https://app.notion.com/p/375cedfd0bc08356a2ae817409b561ea?source=copy_link)


## 실제 구현 화면

현재 배포 진입점은 `src/plivy-feature-entry.tsx` →
`PlivyFeatureApp.tsx`입니다.

  Route              화면
  ------------------ ------------------------------------------
  `#/splash`         Splash
  `#/login`          로그인 / 회원가입 / 비밀번호 재설정 요청
  `#/`               Home
  `#/search`         Search
  `#/record`         Record
  `#/detail/:id`     Record Detail
  `#/playlists`      Playlists
  `#/profile`        Profile
  `#/profile/edit`   Profile Edit
  `#/records`        Records
  `#/settings`       Settings

------------------------------------------------------------------------

## 주요 기능

### 1. 로그인 / 회원가입

-   이메일 형식 검증
-   비밀번호 검증
-   닉네임 기반 회원가입
-   중복 이메일 확인
-   로그인 세션 저장
-   데모 계정 제공
-   사용자/세션 데이터는 브라우저 `localStorage`에 저장

> 별도의 인증 서버나 Firebase Authentication을 사용하는 구조는 아닙니다.

------------------------------------------------------------------------

### 2. 비밀번호 재설정 안내 메일

로그인 화면에서 가입된 이메일을 확인한 뒤 `/api/password-reset`으로
요청합니다.

Vercel Serverless Function에서 **Resend API**를 호출해 비밀번호 재설정
안내 메일을 발송하도록 구현했습니다.

> 현재 구현은 포트폴리오용 **메일 발송 데모**입니다.\
> 인증 토큰 검증 → 새 비밀번호 입력 → 서버 계정 비밀번호 변경까지
> 이어지는 완전한 비밀번호 재설정 시스템은 포함하지 않습니다.

------------------------------------------------------------------------

### 3. 음악 기록 작성 UI

`Record` 화면에서 다음 정보를 입력하거나 선택할 수 있습니다.

-   음악 검색 UI
-   선택된 음악 카드
-   사진 1장 선택 및 미리보기
-   감정 선택
    -   설렘
    -   차분함
    -   쓸쓸함
    -   행복함
-   활동 선택
    -   공부
    -   휴식
    -   드라이브
    -   운동
-   위치 입력
-   메모 작성
-   4단계 Record 진행 UI

현재 Record 화면의 저장 버튼은 **저장 완료 Toast와 Home 이동까지 구현된
UI 흐름**이며, 이 화면에서 입력한 값을 `PlivyStore`에 실제 신규 Record로
추가하는 연결은 되어 있지 않습니다.

------------------------------------------------------------------------

### 4. 음악 기록 / 상태 관리

`PlivyStore`에서 다음 데이터 구조를 관리합니다.

-   Records
-   Playlists
-   Profile
-   Settings
-   좋아요 상태
-   공유 콘텐츠 좋아요 상태
-   팔로우 상태

상태는 `localStorage`에 저장되어 브라우저 새로고침 후에도 일부 사용자
상태가 유지됩니다.

초기 화면에는 포트폴리오 시연을 위한 Seed / Demo 데이터가 포함되어
있습니다.

------------------------------------------------------------------------

### 5. Playlist

Feature Playlist 화면에서는 플레이리스트를 탐색하고 관련 인터랙션을
사용할 수 있습니다.

-   플레이리스트 표시
-   Playlist 관련 상태 처리
-   Web Share API 지원 환경에서 공유 메뉴 호출
-   Web Share API 미지원 시 Clipboard로 링크 복사

------------------------------------------------------------------------

### 6. Record Detail

상세 화면에서는 기록 콘텐츠와 사용자 액션을 확인할 수 있습니다.

-   기록 상세 정보
-   좋아요 상태 변경
-   Playlist 연결 관련 인터랙션
-   Web Share API를 이용한 공유
-   미지원 환경에서 링크 복사

------------------------------------------------------------------------

### 7. Search

음악 기록을 탐색하기 위한 Search 화면을 구현했습니다.

현재 검색 경험은 실제 외부 음악 API나 서버 검색 엔진이 아니라 **프로젝트
내부의 데모 데이터를 기반으로 동작하는 프로토타입**입니다.

------------------------------------------------------------------------

### 8. Profile

-   프로필 정보 표시
-   기록 수 / Playlist 수 반영
-   Profile Edit 화면
-   프로필 데이터 상태 관리

프로필 관련 상태는 `PlivyStore`를 통해 브라우저에 유지됩니다.

------------------------------------------------------------------------

### 9. Settings

설정 화면과 전역 상태를 연결했습니다.

설정 데이터 구조에는 다음 항목이 포함됩니다.

-   알림
-   좋아요 알림
-   팔로우 알림
-   리마인더
-   Dark Mode
-   AI Insights 설정
-   공개 프로필
-   Privacy Level

Dark Mode 상태는 `document.documentElement.dataset.theme`에 연결되어
실제 테마 UI에 반영됩니다.

> 일부 설정 항목은 실제 Push Notification이나 AI 서비스와 연결된 기능이
> 아니라 UI/상태 프로토타입입니다.

------------------------------------------------------------------------

## 데이터 저장 방식

PLIVY는 현재 별도의 데이터베이스 서버 대신 브라우저의 `localStorage`를
사용합니다.

주요 저장 Key:

``` text
plivy_users
plivy_session
plivy_react_state_v1
```

따라서 현재 버전은 **프론트엔드 중심의 인터랙티브 서비스
프로토타입**입니다.

브라우저나 기기가 달라지면 동일한 데이터가 자동 동기화되는 구조는
아닙니다.

------------------------------------------------------------------------

## Tech Stack

  구분                기술
  ------------------- -------------------------------
  Frontend            React 19
  Language            TypeScript
  Routing             React Router DOM
  Styling             styled-components, CSS
  Build               Vite
  State               React Context / Hooks
  Local Persistence   localStorage
  Share               Web Share API / Clipboard API
  Serverless API      Vercel Serverless Function
  Email               Resend API
  Deploy              Vercel

------------------------------------------------------------------------

## 프로젝트 구조

``` text
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

> `publising/org`에는 이전 정적 퍼블리싱 버전이 남아 있으며, 위 트리는
> 현재 React Feature App 중심으로 정리했습니다.

------------------------------------------------------------------------

## 실행 방법

### 설치

``` bash
npm install
```

### 개발 서버

``` bash
npm run dev
```

### Production Build

``` bash
npm run build
```

### Build Preview

``` bash
npm run preview
```

------------------------------------------------------------------------

## Resend 환경 변수

비밀번호 재설정 안내 메일 기능을 사용하려면 배포 환경에 Resend API Key가
필요합니다.

``` text
RESEND_API_KEY
```

API Key는 소스코드에 직접 작성하지 않고 Vercel 환경 변수로 관리합니다.

------------------------------------------------------------------------

## 구현 범위 / 주의사항

현재 PLIVY는 취업 포트폴리오를 위한 프론트엔드 중심 프로토타입입니다.

### 실제 코드에서 확인되는 구현

-   React 기반 다중 화면 웹앱
-   Hash Router 기반 화면 전환
-   로그인 / 회원가입 데모
-   LocalStorage 기반 사용자 및 앱 상태 유지
-   음악 기록 작성 UI
-   사진 선택 및 미리보기
-   기록 / Playlist / Profile / Settings UI
-   좋아요 / 팔로우 등 상태 인터랙션
-   Dark Mode
-   Web Share / Clipboard 기반 공유
-   Vercel Serverless Function
-   Resend 기반 비밀번호 재설정 안내 메일 발송

### 현재 구현 범위에 포함되지 않는 것

-   Firebase Authentication
-   서버 데이터베이스
-   사용자 간 실시간 데이터 동기화
-   실제 음악 스트리밍 API 연동
-   실제 Push Notification
-   실제 AI 분석/큐레이션 API
-   토큰 기반의 완전한 비밀번호 변경 시스템
-   Record 작성 폼과 Store의 신규 Record 영구 저장 연결

------------------------------------------------------------------------

## 제작 의도

음악 서비스의 재생 기록만으로는 남기기 어려운 **"그 음악을 왜 들었고, 그
순간이 어땠는지"**를 하나의 기록으로 남기는 경험을 디자인했습니다.

기획과 UI 디자인에 그치지 않고 React 기반 화면 구현, 상태 관리, 브라우저
저장, 공유 기능, Serverless API와 외부 메일 API 연결까지 직접 구현하며
서비스가 실제로 동작하는 흐름을 만드는 데 초점을 맞췄습니다.
