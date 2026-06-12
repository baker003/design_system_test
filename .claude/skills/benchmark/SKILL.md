---
name: benchmark
description: 번들 크기, 빌드 시간, Core Web Vitals 기준치를 측정합니다. 성능 저하 여부를 수치로 확인합니다.
argument-hint: "[측정 대상, 예: 전체 / Button 컴포넌트 / src/app/return-satisfaction]"
---

# Benchmark — 성능 분석

코드 변경 전후의 성능 수치를 비교합니다.
"느린 것 같다"는 느낌이 아니라 수치로 판단합니다.
(gstack `/benchmark` 패턴을 DS_2 Next.js 맥락에 맞게 재해석)

---

## 측정 항목

### A — 빌드 시간
```bash
time npm run build
```
빌드 완료까지 걸린 시간(초)을 기록합니다.

### B — 번들 크기 분석
```bash
npm run build 2>&1 | grep -E "kB|MB|First Load"
```
Next.js 빌드 출력에서 페이지별 번들 크기를 추출합니다.

주목할 기준:
| 구분 | 권장 | 경고 |
|------|------|------|
| 공유 번들 | < 100kB | > 200kB |
| 페이지별 JS | < 50kB | > 100kB |
| 전체 First Load | < 200kB | > 500kB |

### C — 의존성 크기
```bash
du -sh node_modules
find node_modules -maxdepth 1 -type d | xargs du -sh 2>/dev/null | sort -rh | head -20
```
가장 큰 의존성 Top 20을 확인합니다.

### D — 코드 복잡도 (간이 측정)
```bash
# 컴포넌트별 줄 수
find src/components -name "*.tsx" | xargs wc -l | sort -rn | head -10

# 'use client' 선언 수 (클라이언트 번들 비율 지표)
grep -rl "'use client'" src/ | wc -l
```

### E — 타입 체크 속도
```bash
time npx tsc --noEmit
```

---

## 출력 형식

```markdown
## 성능 측정 보고서 — {날짜} / {측정 대상}

### 빌드 시간
- 총 빌드: {N}초

### 번들 크기
| 페이지 | JS 크기 | First Load | 판정 |
|--------|---------|------------|------|
| / (홈) | ...kB | ...kB | ✅/⚠️/❌ |
| /return-satisfaction | ...kB | ...kB | ✅/⚠️/❌ |

### 주요 의존성 크기 (Top 5)
| 패키지 | 크기 |
|--------|------|
| ... | ...MB |

### 클라이언트 컴포넌트 수
- 'use client' 선언: {N}개 / 전체 컴포넌트 {M}개

### 권고사항
1. (크기 초과 항목이 있으면 구체적 개선 방법)
2. ...
```

---

## 언제 사용하나

- 새 의존성 추가 후 번들 영향 확인
- 배포 전 성능 기준 달성 여부 확인
- "페이지가 느려진 것 같다" 느낌을 수치로 검증할 때
- 분기 1회 정기 성능 체크
