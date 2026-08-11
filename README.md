# (주)한글과 세종 웹 프론트엔드

외국인을 위한 한국 이름 작명과 명예한국인증·명예시민증·학생증·방문증의 디자인 탐색, 제작 신청, 조회, 후기와 고객지원을 제공하는 React 웹 애플리케이션입니다.

## 기술 스택

- React 18, TypeScript 5.6, Vite 5
- React Router 6
- CSS Custom Properties 기반 디자인 토큰
- Netlify 정적 배포 및 SPA fallback

## 실행

```bash
npm install
npm run dev
npm run build
npm run preview
```

별도 `test`와 `lint` 스크립트는 아직 없습니다.

## 주요 경로

| 경로 | 기능 |
| --- | --- |
| `/` | 메인 카드, 십이지 디자인 선택, 서비스·기념품·협력기관 |
| `/design` | 카드 유형별 실제 디자인 갤러리 |
| `/apply/*` | 개인·단체 제작 신청 5단계와 유형별 견본품 |
| `/lookup`, `/mobile-card` | 신청 조회와 발급 카드 확인 |
| `/reviews` | 후기 검색·필터·작성 및 본인 후기 수정 |
| `/support`, `/inquiry`, `/faq`, `/notices` | 고객지원 |
| `/company`, `/greetings`, `/events` | 회사 소개·인사말·행사사업 |
| `/mypage`, `/admin` | 사용자 활동 내역과 데모 관리자 화면 |

## 데이터와 API

- 실제 API 계약은 `src/services/api.ts`에 있습니다.
- `AuthContext`에는 API 사용자와 로컬 데모 사용자가 함께 존재합니다.
- 후기·문의·공지·FAQ·행사 관리 일부는 `localStorage` 기반 데모 데이터입니다.
- 신청 초안은 `sessionStorage`에 저장하며 첨부 `File` 객체는 저장하지 않습니다.
- 관리자 화면 전환과 로컬 작성자 확인은 서버 보안 장치가 아닙니다.

환경 변수와 배포 절차는 `NETLIFY.md`, 구현 현황과 제한은 `PROJECT_STATUS.md`, 디자인 규칙은 `DESIGN.md`를 참고하세요.
