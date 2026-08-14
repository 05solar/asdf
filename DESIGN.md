# 디자인 가이드

## 0. 스타일 파일 구조

디자인 시스템은 `src/styles`에 모여 있다. 새 스타일을 넣기 전에 담당 파일을 먼저 확인한다.

| 파일 | 역할 |
| --- | --- |
| `src/styles/tokens.css` | 색상·간격·반경·그림자·타이포 변수. **모든 값의 단일 기준** |
| `src/styles/globals.css` | 전역 요소 스타일과 `.page-container`·`.subpage-hero` 등 공통 클래스 |
| `src/styles/reset.css` | 브라우저 기본값 초기화 |
| `src/styles/fonts.css` | Pretendard·은평사가독서체 폰트 로드 |
| `src/styles/forms.css` | 입력·폼 공통 스타일 |
| `src/styles/ContentPages.css` | 여러 콘텐츠 페이지가 공유하는 스타일(Events·Greetings·Reviews) |

페이지별 세부 스타일은 각 페이지 폴더의 `PageName.css`(예: `src/pages/LookupPage/LookupPage.css`)에,
컴포넌트별 스타일은 컴포넌트 옆 `*.css`(예: `Button.css`, `home.css`)에 둔다. 여러 페이지가 함께
쓰는 스타일만 `src/styles`로 올린다.

## 1. 디자인 방향

이 프로젝트의 시각 언어는 한국 전통의 종이, 먹, 목재, 한글 서체에서 받은 인상을 현대적인 공공·문화 서비스 UI로 정돈하는 데 목적이 있다. 장식은 브랜드 분위기를 만들되 신청·조회 같은 핵심 과업의 가독성을 방해하지 않아야 한다.

핵심 키워드:

- 따뜻한 한지색 배경
- 짙은 남색의 신뢰감 있는 행동 요소
- 갈색·올리브 계열의 절제된 전통 색감
- 얇은 선, 넓은 여백, 낮은 그림자
- 전통 제목 서체와 읽기 쉬운 본문 서체의 조합

## 2. 색상 체계

색상의 단일 기준은 `src/styles/tokens.css`다. 아래 값은 의미를 설명하기 위한 요약이며 구현에서는 반드시 CSS 변수를 사용한다.

| 용도 | 토큰 | 현재 값 |
| --- | --- | --- |
| 기본 배경 | `--color-background` | `#f5f1ea` |
| 밝은 상단 배경 | `--color-bg-top` | `#f8f3ec` |
| 부드러운 패널 | `--color-surface-soft` | `#e5d8cd` |
| 강조 테두리 | `--color-border-accent` | `#bc996e` |
| 제목 | `--color-text-title` | `#594635` |
| 기본 본문 | `--color-text-secondary` | `#4d453e` |
| 보조 본문 | `--color-text-muted` | `#90867d` |
| 주요 행동 | `--color-primary` | `#263d5b` |
| 전통 갈색 강조 | `--color-icon-accent` | `#91683f` |

페이지 배경은 위쪽이 조금 더 밝은 세로 그라데이션이며, 카드와 패널은 강한 흰색보다 배경과 이어지는 크림·베이지 표면을 사용한다. 그림자는 요소가 살짝 떠 보일 정도로만 사용한다.

## 3. 타이포그래피

- 본문·버튼·폼: Pretendard (`--font-sans`)
- 브랜드 제목·섹션 제목: 은평사가독서체 (`--font-serif`)
- 폰트는 `src/styles/fonts.css`에서 CDN으로 불러온다.
- 제목은 진한 갈색, 본문은 회갈색, 핵심 버튼은 크림색 글자와 남색 배경을 사용한다.
- 긴 한글 제목에는 `word-break: keep-all`을 우선 적용한다.
- 크기는 고정 px보다 기존 `clamp()` 스케일을 따른다.

공통 텍스트 클래스:

- `.eyebrow`: 짧은 분류명과 앞쪽 수평선
- `.section-title`: 주요 섹션 제목
- `.section-lead`: 설명 문장
- `.subpage-hero__title`: 서브페이지 대표 제목

## 4. 레이아웃

- 최대 콘텐츠 폭: `1440px`
- 기본 좌우 여백: `20px`
- 공통 컨테이너: `.page-container`
- 헤더 기준 높이: `92px`
- 섹션 간격과 글자 크기는 뷰포트에 따라 유동적으로 변한다.

홈 화면은 히어로와 12지신 띠, 주요 카드, 서비스 핵심, 기념품, 연락처, 협력기관 순으로 흐른다. 서브페이지는 eyebrow, 제목, 설명으로 시작하는 동일한 도입 구조를 유지한다.

## 5. 형태와 컴포넌트

- 카드 모서리: 작고 절제된 `4px`
- 패널 모서리: `8px`
- pill UI: 완전한 원형 모서리
- 테두리: 연한 베이지 또는 갈색 계열의 얇은 선
- 그림자: 낮은 불투명도의 넓은 그림자
- 주요 버튼: 남색 배경, 크림색 글자
- 보조 버튼: outline 또는 ghost 변형

새 UI를 만들기 전에 다음 공통 요소를 확인한다.

- `src/components/ui/Button.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/toast.tsx`
- `src/components/ui/ImagePlaceholder.tsx`
- `src/components/ui/icons.tsx`

## 6. 브랜드 그래픽

홈 히어로는 한글 텍스처, 옅은 세종대왕 이미지, 건곤감리 문양, 12지신 이미지를 계층적으로 사용한다. 장식 레이어는 콘텐츠보다 낮은 시각적 우선순위를 가져야 하며 클릭을 막지 않아야 한다.

주요 에셋 위치:

- 로고: `public/images/logo`
- 배경: `public/images/background`
- 카드 시안: `public/images/cards`
- 12지신: `public/images/zodiac`
- 협력기관: `public/images/partners`
- 회사·인물: `public/images/company`

카드 갤러리의 2~5페이지 색상 변형은 현재 실제 최종 시안이 아닌 임시 표현이다. 최종 아트워크를 받으면 색상 필터보다 원본 에셋 교체를 우선한다.

## 7. 반응형·접근성 기준

- 1080px 이하에서는 복잡한 상단 장식을 줄이고 헤더를 축약한다.
- 모바일에서 캐러셀, 표, 관리자 상태 메뉴, 신청 미리보기가 화면 밖으로 넘치지 않아야 한다.
- hover만으로 정보를 전달하지 말고 focus와 터치에서도 같은 기능을 제공한다.
- 아이콘 단독 버튼에는 `aria-label`을 제공한다.
- 입력 오류는 색상뿐 아니라 텍스트로 설명한다.
- 브라우저의 `prefers-reduced-motion` 설정에서는 애니메이션을 사실상 제거한다.

## 8. 디자인 변경 원칙

1. 먼저 기존 토큰과 컴포넌트로 해결한다.
2. 새 색상이나 간격이 반복될 때만 의미 있는 토큰을 추가한다.
3. 한 페이지의 예외를 전역 규칙으로 만들지 않는다.
4. 실제 이미지 비율을 유지하고 강제 늘림을 피한다.
5. 데스크톱 시안 일치와 함께 모바일 과업 완료 가능성을 동일하게 검증한다.
6. 브랜드 장식보다 신청, 조회, 문의의 명확성과 접근성을 우선한다.
