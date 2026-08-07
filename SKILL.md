---
name: hc-netlify-frontend
description: 한글과 세종(HC-netlify) 프론트엔드 데모 작업 가이드. React + Vite + TypeScript 기반의 카드 탐색·제작 신청·조회·고객지원 사이트를 수정할 때 참고한다. 라우트/컴포넌트 위치, 색상 토큰, 제작 신청 플로우 구조, 검증 방법을 다룬다.
---

# HC-netlify 프론트엔드 작업 스킬

한글 오행 기반 한국 이름 작명 및 명예한국인증·명예시민증·학생증·방문증 발급 데모
사이트의 프론트엔드를 수정할 때 사용하는 가이드다. 자세한 규칙은 저장소의 `AGENTS.md`,
`PROJECT_STATUS.md`, `DESIGN.md`를 함께 확인한다.

## 시작 전 확인
1. `PROJECT_STATUS.md`와 `progress.md`에서 현재 구현 범위/진행 상황 확인.
2. `DESIGN.md`, `src/styles/tokens.css`에서 시각 규칙과 색상 토큰 확인.
3. `git status`로 사용자의 기존 변경사항 보존.
4. 수정 대상과 가까운 컴포넌트·데이터·CSS를 먼저 읽는다.

## 핵심 위치
- 라우트: `src/App.tsx` · 메뉴: `src/config/navigation.ts`
- 회사/계좌 정보: `src/config/company.ts` · 반복 콘텐츠: `src/data`
- 공용 UI(버튼/모달/토스트/아이콘): `src/components/ui`
- 색상 등 디자인 토큰: `src/styles/tokens.css` (하드코딩 금지, 변수 사용)
- 페이지 폭: `.page-container`, 서브페이지 도입부: `.subpage-hero`

## 색상 규칙
- 색은 반드시 `tokens.css` 변수로 참조한다. 대표 네이비는 `--color-primary`(#263d5b),
  버튼용 네이비는 `--color-button-navy`.
- 제목 앞 세로 마커/강조선 등은 네이비(`--color-primary`)로 통일한다.
- 호버 시 네이비로 채우는 버튼 패턴: 배경 `--color-primary`, 글자 `--color-primary-foreground`.

## 제작 신청 플로우
- 위치: `src/pages/apply/ApplyPage.tsx`, 단계별 컴포넌트 `src/components/apply/steps/*`,
  상태 타입 `src/features/apply/types.ts`, 초안 훅 `useApplicationDraft.ts`.
- 5단계: 유형 선택 → 정보 입력 → 사진/파일 → 최종 확인 → 신청 완료.
- **입력 항목과 업로드는 신청 유형(개인 / 법인·단체)으로 분기**한다. 카드 종류(cardType)는
  학생증 여부(학번·학과, 학교명 라벨)에만 추가로 영향을 준다.
- 초안은 `sessionStorage`에 저장하되 `File` 객체/미리보기 URL은 저장하지 않는다.
- 실제 API 제출은 `user.source === "api"`일 때만 동작하고, 그 외에는 로컬 데모 데이터를 쓴다.

## 데이터 처리 주의
- `src/services/api.ts`가 서버 계약의 중심. 타입/경로 변경 시 호출부를 함께 수정한다.
- `AuthContext`에는 API 사용자와 로컬 데모 사용자가 공존한다(`source: "api" | "local"`).
- `adminMock.ts`, `reviews.ts`, `inquiries.ts` 등은 `localStorage`를 쓰며 운영 데이터가 아니다.
- 개인정보/토큰을 로그·문서·샘플에 남기지 않는다.

## UI 기준
- 데스크톱과 좁은 모바일 화면 모두에서 가로 스크롤·잘림·겹침을 확인한다.
- 의미 있는 HTML, 연결된 `label`, 명확한 버튼 이름, 키보드 조작을 유지한다.
- 피드백은 `alert` 대신 기존 toast 시스템을 사용한다.
- 모션 추가 시 `prefers-reduced-motion`을 존중한다.
- 모든 텍스트 파일은 UTF-8로 저장한다(한글 깨짐 금지).

## 검증
- 최소: `npm run build` (tsc + vite).
- 로컬 실행: `npm run dev`.
- 기능 변경 시 관련 화면을 브라우저에서 직접 확인하고, 확인하지 못한 항목은 결과에 명시한다.
- `dist`, `node_modules`는 편집/커밋하지 않는다.
