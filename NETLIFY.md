# Netlify 배포 가이드

이 폴더는 모노레포에서 **프론트엔드(Vite + React)** 만 분리한 것입니다.

## 배포 설정 (이미 포함됨)

- `netlify.toml` — 빌드 커맨드 `npm run build`, 배포 디렉터리 `dist`, SPA 리다이렉트
- `public/_redirects` — BrowserRouter 새로고침 시 404 방지용 SPA fallback

## 방법 1) Netlify 웹 UI (Git 연동)

1. 이 폴더를 별도 Git 저장소로 push
2. Netlify → **Add new site → Import an existing project** 에서 저장소 선택
3. 빌드 설정은 `netlify.toml` 이 자동 적용 (Build command: `npm run build`, Publish: `dist`)
4. **Site settings → Environment variables** 에 아래 값 등록
   - `VITE_API_BASE_URL` = 배포된 백엔드 API 주소 (끝 슬래시 없이)
   - 필요 시 `VITE_CARD_TYPE_*` 값

## 방법 2) Netlify CLI (수동 배포)

```bash
npm install
npm run build
npx netlify deploy --prod --dir=dist
```

## 주의사항

- API 요청은 `credentials: "include"`(쿠키) 를 사용합니다. 백엔드 CORS 에서
  이 Netlify 도메인을 `Access-Control-Allow-Origin` 에 허용하고
  `Access-Control-Allow-Credentials: true` 로 설정해야 로그인/인증이 동작합니다.
- OAuth(구글/네이버) 리다이렉트 URL 도 백엔드에 새 프론트 도메인을 등록해야 합니다.
- .. 