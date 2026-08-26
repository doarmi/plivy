# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Password reset email (Vercel)
비밀번호 찾기에서 실제 메일을 보내려면 Vercel 프로젝트의 Environment Variables에 아래 값을 추가합니다.

- `RESEND_API_KEY`: Resend API Key
- `RESET_FROM_EMAIL`: Resend에서 발송 가능한 인증된 From 주소 (예: `PLIVY <noreply@yourdomain.com>`)
- `SITE_URL`: 배포된 PLIVY 주소 (예: `https://your-project.vercel.app`)

일반 `npm run dev`에서는 `/api/password-reset` Vercel Function이 실행되지 않습니다. 실제 발송 테스트는 Vercel 배포 후 진행하거나 `vercel dev`를 사용하세요.
