# TextButton 컴포넌트 설계 문서

## 1. Props 테이블

| Prop | Type | Default | 변경 여부 | 설명 |
|------|------|---------|-----------|------|
| variant | `'primary' \| 'secondary' \| 'tertiary' \| 'on-primary'` | `'primary'` | 없음 | 색상 계층 |
| size | `14 \| 16 \| 18 \| 20` | `16` | 없음 | 타이포·높이·아이콘 크기 결정 |
| weight | `'bold' \| 'light'` | `'bold'` | 없음 | font-weight |
| disabled | `boolean` | `false` | 없음 | 비활성 상태 |
| loading | `boolean` | `false` | 없음 | 로딩 상태 (Spinner 표시) |
| leftIcon | `ReactNode` | — | 없음 | 왼쪽 아이콘 슬롯 |
| rightIcon | `ReactNode` | — | 없음 | 오른쪽 아이콘 슬롯 |
| children | `ReactNode` | — | 없음 | 버튼 레이블 |
| onClick | `(e: MouseEvent<HTMLButtonElement>) => void` | — | 없음 | 클릭 핸들러 |
| className | `string` | — | 없음 | 외부 클래스 확장 |

---

## 2. Component Tree

```
<button>                          ← 루트: h-* / rounded-* / typo-* / text-{variant} / px-2
  ├── <span.absolute>             ← loading=true 시만 렌더 (Spinner 컨테이너)
  │     └── <Spinner size="sm">
  └── <span.flex.gap-[6px]>      ← loading=true 시 invisible (내용 레이어)
        ├── <span.iconSizeClass>  ← leftIcon 있을 때만 렌더
        │     └── {leftIcon}
        ├── <span.leading-[1]>   ← 텍스트 레이블
        │     └── {children}
        └── <span.iconSizeClass>  ← rightIcon 있을 때만 렌더
              └── {rightIcon}
```

---

## 3. 디자인 토큰 매핑 (수정 후 기준)

### sizeClasses — 수정 전 vs 수정 후

| size | height (전) | height (후) | typo (전) | typo (후) | rounded (전) | rounded (후) |
|------|------------|------------|-----------|-----------|-------------|-------------|
| 20 | `h-12` (48px) | `h-8` (32px) | `typo-heading2` | `typo-heading2` | `rounded-xl` (12px) | `rounded-lg` (8px) |
| 18 | `h-10` (40px) | `h-8` (32px) | `typo-headline2` (17px) | `typo-headline1` (18px) | `rounded-[10px]` | `rounded-lg` (8px) |
| 16 | `h-9` (36px) | `h-[26px]` | `typo-body1` | `typo-body1` | `rounded-lg` (8px) | `rounded-md` (6px) |
| 14 | `h-8` (32px) | `h-[26px]` | `typo-label2` (13px) | `typo-label1` (14px) | `rounded-lg` (8px) | `rounded-md` (6px) |

### iconSizeClasses — 수정 전 vs 수정 후

| size | 전 | 후 | 근거 |
|------|----|----|------|
| 20 | `[&>svg]:w-6 [&>svg]:h-6` (24px) | `[&>svg]:w-5 [&>svg]:h-5` (20px) | Figma 스펙 20px |
| 18 | `[&>svg]:w-5 [&>svg]:h-5` (20px) | `[&>svg]:w-5 [&>svg]:h-5` (20px) | 변경 없음 |
| 16 | `[&>svg]:w-4 [&>svg]:h-4` (16px) | `[&>svg]:w-4 [&>svg]:h-4` (16px) | 변경 없음 |
| 14 | `[&>svg]:w-4 [&>svg]:h-4` (16px) | `[&>svg]:w-4 [&>svg]:h-4` (16px) | 변경 없음 |

### variantClasses — 수정 전 vs 수정 후

| variant | 전 | 후 | CSS 변수 | 값 |
|---------|----|----|----------|-----|
| primary | `text-primary-strong` | `text-primary-regular` | `--primary-regular` → `--blue-600` | `#0069FF` |
| secondary | `text-text-primary` | `text-text-primary` | 변경 없음 | — |
| tertiary | `text-text-secondary` | `text-text-secondary` | 변경 없음 | — |
| on-primary | `text-on-primary` | `text-on-primary` | 변경 없음 | — |

---

## 4. States 리스트

| State | 조건 | 시각적 처리 |
|-------|------|------------|
| Default | `disabled=false`, `loading=false` | variant 색상 + hover/active 클래스 활성 |
| Hover | 마우스 오버 (default 상태에서만) | `hover:bg-pressed-dark-weak` |
| Active / Pressed | 클릭 중 | `active:scale-[0.96]` |
| Disabled | `disabled=true` | `text-text-disabled`, pointer-events-none, hover·active 없음 |
| Loading | `loading=true` | Spinner 표시(절대 위치), 레이블 invisible, pointer-events-none |

---

## 5. 수정 대상 라인 (TextButton.tsx)

| 위치 | 라인 | 수정 전 값 | 수정 후 값 |
|------|------|-----------|-----------|
| sizeClasses[20].height | 8 | `h-12` | `h-8` |
| sizeClasses[20].rounded | 8 | `rounded-xl` | `rounded-lg` |
| sizeClasses[18].height | 9 | `h-10` | `h-8` |
| sizeClasses[18].typo | 9 | `typo-headline2` | `typo-headline1` |
| sizeClasses[18].rounded | 9 | `rounded-[10px]` | `rounded-lg` |
| sizeClasses[16].height | 10 | `h-9` | `h-[26px]` |
| sizeClasses[16].rounded | 10 | `rounded-lg` | `rounded-md` |
| sizeClasses[14].height | 11 | `h-8` | `h-[26px]` |
| sizeClasses[14].typo | 11 | `typo-label2` | `typo-label1` |
| sizeClasses[14].rounded | 11 | `rounded-lg` | `rounded-md` |
| variantClasses.primary | 15 | `text-primary-strong` | `text-primary-regular` |
| iconSizeClasses[20] | 22 | `[&>svg]:w-6 [&>svg]:h-6` | `[&>svg]:w-5 [&>svg]:h-5` |

---

## 6. 반응형 동작

- TextButton은 고정 높이(h-8 / h-[26px]) 사용 — 반응형 높이 변환 없음
- `whitespace-nowrap` 유지 — 텍스트 줄바꿈 없음
- `px-2` 수평 패딩 — 변경 없음
- fullWidth 옵션 없음 (inline-flex 기준)

---

## 7. 토큰 사전 등록 확인

| 토큰 클래스 | globals.css 등록 | 값 |
|------------|-----------------|-----|
| `text-primary-regular` | `--color-primary-regular: var(--primary-regular)` | `#0069FF` (blue-600) |
| `typo-headline1` | `@utility typo-headline1` | 18px / lh 26px |
| `typo-label1` | `@utility typo-label1` | 14px / lh 20px |
| `typo-heading2` | `@utility typo-heading2` | 20px / lh 28px |
| `typo-body1` | `@utility typo-body1` | 16px / lh 24px |

모든 토큰 사전 등록 확인 완료. globals.css 수정 불필요.

---

## 8. 접근성 검토

| 항목 | 결과 |
|------|------|
| `text-primary-regular` (#0069FF) vs 흰 배경 (#FFFFFF) 대비율 | 4.70:1 — WCAG AA PASS |
| disabled 상태 대비율 미달 | WCAG 1.4.3 비활성 UI 예외 적용 — 허용 |
| `aria-disabled` | disabled 또는 loading 시 적용 — 유지 |
| `aria-busy` | loading 시 적용 — 유지 |

