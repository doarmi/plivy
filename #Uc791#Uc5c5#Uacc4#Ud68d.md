# 퍼블리싱 산출물 React (Vite) 변환 작업 계획

## 1. 프로젝트 개요
- **프로젝트 경로**: `D:\안효진\project001`
- **원본 위치**: `publising/org/` (퍼블리싱 산출물 디렉토리)
- **프레임워크**: React (Vite)
- **언어**: TypeScript (TSX)
- **스타일링**: Styled Components
- **라우터 기반 경로**: `/`

## 2. 프로젝트 초기화 및 환경 설정
1. **React(Vite) + TS 프로젝트 생성**
   - `D:\안효진\project001` 경로 내에 Vite 템플릿을 사용하여 프로젝트 구성.
   - 명령어: `npm create vite@latest . -- --template react-ts`
2. **필요 라이브러리 설치**
   - 라우팅 및 스타일링 필수 라이브러리 추가.
   - 명령어: `npm install react-router-dom styled-components`
   - 타입 정의: `npm install -D @types/styled-components`
3. **디렉토리 구조 세팅**
   ```text
   src/
   ├── assets/       # 이미지 등 정적 리소스 (원본 org/img 파일 이동)
   ├── components/   # 공통 컴포넌트 (Header, Footer 등)
   ├── pages/        # 각 화면별 페이지 컴포넌트
   ├── styles/       # 전역 스타일 및 Theme 설정
   ├── App.tsx       # 애플리케이션 라우터 및 레이아웃 설정
   └── main.tsx      # 진입점 파일
   ```

## 3. 공통 요소 컴포넌트화 (src/components)
원본 HTML을 분석하여 다수의 페이지에서 공통으로 사용되는 UI 요소들을 독립된 React 컴포넌트로 분리합니다.

1. **Footer (Bottom Navigation)**
   - 파일 위치: `src/components/Footer.tsx`
   - 역할: 홈, 검색, 기록추가, 플레이리스트, 프로필 간의 이동 네비게이션.
   - 적용 위치: 하단 탭바가 필요한 메인 화면들에 공통 레이아웃으로 적용.
2. **Header (Top Navigation / Header)**
   - 파일 위치: `src/components/Header.tsx`
   - 역할: 상단 타이틀, 뒤로 가기 버튼 등 공통 상단바.
   - 적용 위치: 서브 페이지나 상세 페이지 상단에 삽입, Props를 통해 타이틀 동적 변경.
3. **UI 공통 컴포넌트**
   - 버튼(`Button`), 입력창(`Input`), 토스트 메시지(`Toast`) 등의 UI를 재사용할 수 있도록 Styled Components 기반의 모듈로 분리.

## 4. 페이지 컴포넌트 분리 및 변환 (src/pages)
퍼블리싱된 12개의 `.html` 파일을 대응하는 React 컴포넌트(`.tsx`)로 변환합니다.

| 퍼블리싱 파일 | React 페이지 컴포넌트 | 라우터 경로 (Path) | 설명 |
|---|---|---|---|
| splash.html | `Splash.tsx` | `/splash` | 스플래시 (초기 진입/로딩) |
| index.html | `Login.tsx` | `/login` | 로그인 및 회원가입 메인 |
| home.html | `Home.tsx` | `/` | 홈 화면 (메인) |
| search.html | `Search.tsx` | `/search` | 검색 화면 |
| record.html | `Record.tsx` | `/record` | 기록 작성 화면 |
| records.html | `Records.tsx` | `/records` | 작성된 기록 목록 |
| detail.html | `Detail.tsx` | `/detail/:id` | 특정 기록의 상세 정보 |
| playlists.html | `Playlists.tsx` | `/playlists` | 플레이리스트 관리 |
| profile.html | `Profile.tsx` | `/profile` | 프로필 홈 화면 |
| profile-detail.html | `ProfileDetail.tsx` | `/profile/detail` | 프로필 상세 정보 조회 |
| profile-edit.html | `ProfileEdit.tsx` | `/profile/edit` | 프로필 수정 폼 |
| settings.html | `Settings.tsx` | `/settings` | 앱 환경 설정 |

## 5. CSS → Styled Components 변환 전략
1. **전역 스타일 구성**
   - `org/css/common.css`의 폰트, CSS Reset, CSS 변수 설정을 `src/styles/GlobalStyle.ts`의 `createGlobalStyle`로 변환하여 앱 전체에 적용합니다.
2. **페이지별 스타일 컴포넌트화**
   - 기존의 페이지별 CSS(`home.css`, `index.css` 등) 및 HTML 클래스를 Styled Components 형태로 작성합니다.
   - 예: `<div class="app-container">` → `<AppContainer>` 컴포넌트로 선언 및 스타일 적용.

## 6. 기능 이관 및 라우팅 설정
1. **라우팅 (App.tsx)**
   - `react-router-dom`의 `<BrowserRouter>`, `<Routes>`, `<Route>`를 사용하여 페이지 간의 탐색 구조를 설계합니다.
   - Header와 Footer가 포함되어야 하는 페이지 묶음을 위해 `Layout` 패턴을 적용합니다.
2. **상태 관리 및 이벤트 로직 (JS → React)**
   - `org/js/*.js` 파일들에 작성된 DOM 제어 이벤트(클릭, 탭 전환, 클래스 토글)를 React의 선언적 상태(`useState`) 관리 로직으로 교체합니다.
   - `data.js` 파일 내의 테스트용 더미 데이터는 상태 초기값 혹은 별도의 상수 파일로 이동하여 컴포넌트에 주입합니다.

## 7. 작업 수행 순서
1. [x] Vite 프로젝트 생성 및 패키지(Router, Styled Components) 설치
2. [x] `src/assets` 폴더로 리소스 이동 및 `GlobalStyle` 구성
3. [x] `App.tsx` 에 기본 라우터 설정 및 빈 페이지들 연결
4. [x] `Header`, `Footer` 등 공통 컴포넌트 작성 및 레이아웃 반영
5. [ ] 페이지별 마크업 이관 및 Styled Components 작성
6. [ ] Javascript 동작 스크립트를 React 상태 및 훅(Hooks)으로 변환
