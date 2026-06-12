---
name: ship
description: 릴리스 전 체크리스트를 자동 실행합니다. 빌드·린트·타입 체크 → 버전 확인 → 커밋 → 푸시까지 순서대로 처리합니다.
argument-hint: "[릴리스 설명 또는 버전, 예: v1.2.0 / 컴포넌트 8종 추가]"
---

# Ship — 릴리스 체크리스트

코드를 main에 올리기 전 자동으로 품질을 검사하고 커밋·푸시합니다.
(gstack `/ship` 패턴을 DS_2 Next.js 맥락에 맞게 재해석)

---

## 실행 순서

### Step 1 — 변경 사항 확인
```bash
git status
git diff --stat
```
미커밋 파일 목록과 변경 규모를 파악합니다.

### Step 2 — 린트 검사
```bash
npm run lint
```
- PASS → Step 3 진행
- FAIL → 오류 목록 출력 후 수정 요청 (자동 수정 가능한 항목은 직접 수정)

### Step 3 — 타입 체크
```bash
npx tsc --noEmit
```
- PASS → Step 4 진행
- FAIL → 타입 오류 목록 출력 후 수정 요청

### Step 4 — 프로덕션 빌드
```bash
npm run build
```
- PASS → Step 5 진행
- FAIL → 빌드 오류 출력 후 수정 요청

### Step 5 — 커밋 메시지 초안 작성
변경 파일 목록과 릴리스 설명을 기반으로 커밋 메시지 초안을 작성합니다.
형식: `{타입}: {요약}` (예: `feat: Button 컴포넌트 outlined variant 추가`)

사용자에게 메시지 확인을 요청합니다.

### Step 6 — 커밋 및 푸시
사용자 승인 후 실행합니다:
```bash
git add {변경 파일들}
git commit -m "{승인된 메시지}"
git push origin main
```

### Step 7 — 검증
```bash
git log --oneline -3
```
푸시 완료 후 최신 커밋이 반영됐는지 확인하고 결과를 보고합니다.

---

## 체크리스트 요약

| 단계 | 명령 | 결과 |
|------|------|------|
| 린트 | `npm run lint` | ✅/❌ |
| 타입 체크 | `npx tsc --noEmit` | ✅/❌ |
| 빌드 | `npm run build` | ✅/❌ |
| 커밋 | `git commit` | ✅/❌ |
| 푸시 | `git push` | ✅/❌ |

모든 항목이 ✅일 때만 "릴리스 완료"로 보고합니다.

---

## 언제 사용하나

- 기능 구현 완료 후 main에 올릴 때
- "커밋하고 푸시해" 요청 시 (빌드 검증 포함 버전)
- 여러 파일을 변경한 뒤 한 번에 정리할 때
