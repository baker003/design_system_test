---
name: cso
description: OWASP Top 10 기반 보안 감사를 실행합니다. Next.js + TypeScript 프로젝트 특화 취약점을 점검합니다.
argument-hint: "[점검 범위, 예: 전체 / src/app/api / 특정 컴포넌트]"
---

# CSO — 보안 감사

코드베이스에서 보안 취약점을 찾아 보고합니다.
수정은 하지 않습니다. 발견한 취약점 목록과 권고사항만 출력합니다.
(gstack `/cso` 패턴을 DS_2 Next.js 맥락에 맞게 재해석)

---

## 점검 항목

### A — 입력 검증 (Injection)
- [ ] 사용자 입력을 그대로 DOM에 삽입하는 곳이 있나? (`dangerouslySetInnerHTML` 검색)
- [ ] URL 파라미터, searchParams를 sanitize 없이 사용하나?
- [ ] `eval()`, `Function()`, `innerHTML` 사용 여부

```bash
grep -rn "dangerouslySetInnerHTML\|eval(\|innerHTML" src/
```

### B — 인증·권한
- [ ] API Route에 인증 체크가 없는 엔드포인트가 있나?
- [ ] `searchParams`로 받은 사용자 ID를 검증 없이 사용하나?
- [ ] 환경 변수 노출 여부 (`NEXT_PUBLIC_` 접두어가 붙은 민감한 값)

```bash
grep -rn "NEXT_PUBLIC_" .env* 2>/dev/null
grep -rn "process.env" src/app/
```

### C — 민감 정보 노출
- [ ] API 키, 시크릿이 클라이언트 번들에 포함되나?
- [ ] `console.log`에 민감한 데이터를 출력하나?
- [ ] `.env` 파일이 .gitignore에 포함되나?

```bash
grep -rn "console.log" src/
cat .gitignore | grep env
```

### D — 의존성 취약점
```bash
npm audit --audit-level=high
```
HIGH 이상 취약점만 보고합니다.

### E — Next.js 특화
- [ ] `next.config.js`에 불필요한 도메인 허용 여부
- [ ] CSP(Content Security Policy) 헤더 설정 여부
- [ ] Server Action에 입력 검증 여부

```bash
grep -rn "allowedOrigins\|domains" next.config*
```

---

## 출력 형식

```markdown
## 보안 감사 보고서 — {날짜}

| 항목 | 심각도 | 발견 위치 | 설명 |
|------|--------|---------|------|
| dangerouslySetInnerHTML | HIGH | src/components/X.tsx:42 | XSS 위험 |
| npm audit | MODERATE | lodash@4.17.15 | ... |

### 권고사항
1. (HIGH 항목부터 우선 수정)
2. ...

### 미점검 항목
(권한 부족 또는 정보 없어 확인 못한 항목)
```

심각도 기준: `CRITICAL > HIGH > MODERATE > LOW > INFO`

---

## 언제 사용하나

- 새 기능 배포 전 보안 검토
- 외부 기여 코드 머지 전
- 정기 보안 점검 (월 1회 권장)
- 민감한 사용자 데이터를 다루는 기능 추가 후
