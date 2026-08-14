# 에이전트 작업 지침

이 문서는 이 저장소에서 작업하는 코딩 에이전트가 따라야 할 프로젝트별 규칙이다.

## 프로젝트 목표

한글과 세종의 전통적 브랜드 인상을 유지하면서 카드 탐색부터 제작 신청, 조회, 고객지원까지 안정적으로 연결한다. 현재는 프론트엔드 데모와 실제 API 연동 코드가 공존하므로 두 경로를 구분해서 다뤄야 한다.

## 프로젝트 구조

React 18 + TypeScript 5.6 + Vite 5 단일 SPA다. 주요 디렉터리는 다음과 같다.

```
HC-netlify/
├─ index.html                # Vite 진입 HTML
├─ netlify.toml              # 빌드·배포·SPA 리다이렉트 설정
├─ vite.config.ts            # Vite 설정
├─ tsconfig.json             # TypeScript 설정
├─ .env.example              # 환경 변수 예시 (VITE_API_BASE_URL 등)
│
├─ public/                   # 정적 자산 (빌드 시 그대로 /… 로 제공)
│  ├─ _redirects             #   SPA fallback
│  └─ images/                #   로고·배경·카드·십이지·협력기관 등 (README.md 참고)
│
├─ dist/                     # 빌드 산출물 — 직접 편집·커밋 금지
│
└─ src/
   ├─ App.tsx                # 라우트 정의
   ├─ main.tsx               # React 진입점
   ├─ components/            # UI 컴포넌트
   │  ├─ ui/                 #   공용 Button·Modal·toast·icons·ImagePlaceholder
   │  ├─ layout/             #   PublicLayout·ScrollToTop
   │  ├─ header/·footer/     #   공통 헤더·푸터
   │  ├─ home/               #   홈 섹션 (Hero·MainDesigns·ServiceCore·Merchandise·Partners·Contact)
   │  ├─ apply/              #   제작 신청 스텝퍼와 steps/*
   │  ├─ brand/·gallery/     #   로고·샘플카드·십이지 아이콘·카드 캐러셀
   │  └─ admin/              #   콘텐츠 관리 패널
   ├─ pages/                 # 라우트별 페이지. 페이지마다 폴더: pages/PageName/PageName.tsx(+ PageName.css)
   ├─ features/              # 도메인 로직 (apply·auth·i18n)
   ├─ services/api.ts        # 실제 서버 API 계약의 중심
   ├─ config/                # company.ts(회사·계좌) · navigation.ts(메뉴)
   ├─ data/                  # 반복 콘텐츠·데모 데이터 (cards·zodiac·reviews·inquiries·nameResults.json 등)
   ├─ lib/                   # 유틸 (postcode·shuffle·useScrollReveal·cardDownload)
   └─ styles/               # 전역·공유 스타일 (tokens·globals·reset·fonts·forms·ContentPages)
```

문서 안내: 구현 현황·제한은 `PROJECT_STATUS.md`, 최근 작업 기록은 `progress.md`,
시각 규칙은 `DESIGN.md`, 배포는 `NETLIFY.md`, 개요는 `README.md`를 참고한다.

## 시작 전 확인

1. `PROJECT_STATUS.md`에서 현재 구현 범위와 미완성 항목을 확인한다.
2. `DESIGN.md`와 `src/styles/tokens.css`에서 시각 규칙을 확인한다.
3. `git status --short`로 사용자의 기존 변경사항을 확인하고 보존한다.
4. 변경 대상과 가까운 컴포넌트, 데이터 파일, CSS를 먼저 읽는다.

## 필수 작업 규칙

- 모든 텍스트 파일은 UTF-8로 유지한다. 한글이 깨진 상태로 저장하지 않는다.
- 색상은 컴포넌트에 직접 하드코딩하지 말고 `src/styles/tokens.css`의 변수를 사용한다.
- 공통 버튼, 모달, 토스트, 아이콘은 `src/components/ui`의 기존 구현을 우선 재사용한다.
- 페이지 폭은 `.page-container`, 서브페이지 도입부는 `.subpage-hero` 규칙을 우선 사용한다.
- 라우트는 `src/App.tsx`, 메뉴는 `src/config/navigation.ts`에서 관리한다.
- 새 페이지는 `src/pages/PageName/` 폴더에 `PageName.tsx`와 `PageName.css`를 함께 둔다. 여러
  페이지가 공유하는 스타일은 `src/styles`에 둔다(예: `ContentPages.css`).
- 회사·계좌 정보는 `src/config/company.ts`, 반복 콘텐츠는 `src/data`에서 관리한다.
- 빌드 산출물인 `dist`와 설치 의존성인 `node_modules`를 직접 편집하거나 커밋하지 않는다.
- 사용자의 관련 없는 변경사항을 되돌리거나 덮어쓰지 않는다.

## 데이터 처리 주의사항

- `src/services/api.ts`는 실제 서버 계약의 중심이다. API 타입이나 경로를 바꿀 때 모든 호출부를 함께 확인한다.
- `AuthContext`에는 실제 API 사용자와 로컬 데모 사용자가 공존한다. `source: "api" | "local"` 분기를 제거하기 전에 백엔드 준비 여부를 확인한다.
- `src/data/adminMock.ts`, `reviews.ts`, `inquiries.ts`와 관리 콘텐츠 일부는 `localStorage`를 사용한다. 이를 운영 데이터로 간주하지 않는다.
- 신청 초안은 `sessionStorage`에 저장하지만 `File` 객체는 직렬화하지 않는다.
- 프론트엔드의 관리자 리다이렉트는 보안 장치가 아니다. 민감한 API는 서버에서 반드시 권한을 검사해야 한다.
- 개인정보나 인증 토큰을 로그, 문서, 샘플 데이터에 추가하지 않는다.

## UI 구현 기준

- 데스크톱뿐 아니라 좁은 모바일 화면에서도 가로 스크롤, 잘림, 버튼 겹침을 확인한다.
- 의미 있는 HTML 요소, 연결된 `label`, 명확한 버튼 이름, 키보드 조작을 유지한다.
- 동작 피드백은 임의의 `alert`보다 기존 toast 시스템 사용을 우선한다.
- 모션을 추가할 때 `prefers-reduced-motion` 환경을 존중한다.
- 최종 이미지가 없는 경우 기존 placeholder 패턴을 사용하고 임의의 저품질 이미지를 추가하지 않는다.

## 검증 명령

최소 검증:

```powershell
npm run build
```

로컬 실행:

```powershell
npm run dev
```

현재 별도 `test`와 `lint` 스크립트는 없다. 기능 변경 시 관련 경로를 브라우저에서 직접 확인하고, 검증하지 못한 항목은 작업 결과에 명시한다.

## 완료 보고

- 변경한 파일과 사용자에게 보이는 결과를 요약한다.
- 실행한 검증과 결과를 적는다.
- 데모 데이터, 외부 API, 확정되지 않은 콘텐츠 때문에 남은 제한을 숨기지 않는다.
- 진행 상황이 달라졌다면 `PROJECT_STATUS.md`도 함께 갱신한다.

