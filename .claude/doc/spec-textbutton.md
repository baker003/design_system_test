# TextButton Component Update Spec -- DS_2

## Summary

**무엇을**: DS_2 Figma 측정값 기준으로 TextButton 컴포넌트의 사이즈별 높이(h), 타이포그래피 토큰, primary 컬러 토큰, 아이콘 사이즈를 수정한다.

**왜**: 현재 구현의 높이·타이포·컬러·아이콘 값이 모두 Figma 스펙과 다르다. 구체적 불일치는 아래 "문제 정의" 섹션에 나열한다.

---

## Figma Reference

- **파일**: DS_2 — https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/
- **페이지 / Node**: Button 페이지 `698:35982` → `(New) Button/Text` 섹션
- **Variant 축**:
  - hierarchy: primary / secondary / tertiary / on-primary
  - type: bold (현재 구현 범위)
  - size: 20 / 18 / 16 / 14
  - state: 기본 / 비활성화(disabled) / 눌림(pressed) / 로딩(loading)
  - option: 전체(left+right icon) / 왼쪽(left icon) / 오른쪽(right icon) / 텍스트(no icon)

---

## 문제 정의 (현재 코드 vs Figma 스펙)

| 항목 | 현재 코드 | Figma 스펙 | 수정 방향 |
|------|-----------|------------|-----------|
| size 20 높이 | `h-12` (48px) | 32px | `h-8` |
| size 18 높이 | `h-10` (40px) | 32px | `h-8` |
| size 16 높이 | `h-9` (36px) | 26px | `h-[26px]` |
| size 14 높이 | `h-8` (32px) | 26px | `h-[26px]` |
| size 20 타이포 | `typo-heading2` (20px) | 20px — `typo-heading2` | 유지 (font-size 일치) |
| size 18 타이포 | `typo-headline2` (17px) | 18px — `typo-headline1` | `typo-headline1`으로 교체 |
| size 16 타이포 | `typo-body1` (16px) | 16px — `typo-body1` | 유지 (font-size 일치) |
| size 14 타이포 | `typo-label2` (13px) | 14px — `typo-label1` | `typo-label1`으로 교체 |
| size 20 타이포 rounded | `rounded-xl` (12px) | 8px | `rounded-lg` |
| size 18 타이포 rounded | `rounded-[10px]` | 8px | `rounded-lg` |
| size 20 아이콘 | `w-6 h-6` (24px) | 20px | `w-5 h-5` |
| primary 색상 | `text-primary-strong` | `--ds2_primary/regular` → `text-primary-regular` | `text-primary-regular`으로 교체 |

**타이포 토큰 매핑 근거** (globals.css @utility 기준):
- `typo-heading2`: 20px / line-height 28px
- `typo-headline1`: 18px / line-height 26px
- `typo-body1`: 16px / line-height 24px
- `typo-label1`: 14px / line-height 20px

**아이콘 사이즈 근거** (design-system.md §5 Carbon 규칙):
- size 20: line-height 28px → 20px ~ 26px 범위 → 20px 아이콘
- size 18: line-height 26px → 20px ~ 26px 범위 → 20px 아이콘
- size 16: line-height 24px → 20px ~ 26px 범위 → 20px 아이콘 (Figma 16px 측정값과 불일치 — Figma 측정값 우선)
- size 14: line-height 20px → ~20px 이하 범위 → 16px 아이콘 (Figma 14px 측정값과 불일치 — Figma 측정값 우선)

> Figma 측정값(size 16→16px, size 14→14px)은 Carbon 규칙(각각 20px, 16px)보다 작다.
> Figma 스펙이 기준이므로 Figma 측정값을 따른다.

---

## Component API

변경 없음. 타입 파일(`types.ts`)은 수정하지 않는다.

```tsx
interface TextButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'on-primary';  // 기존 유지
  size?: 14 | 16 | 18 | 20;                                        // 기존 유지
  weight?: 'bold' | 'light';                                        // 기존 유지
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
```

---

## 수정 대상 값 (TextButton.tsx)

### sizeClasses 수정

```ts
// 수정 전
const sizeClasses: Record<TextButtonSize, { height: string; typo: string; rounded: string }> = {
  20: { height: 'h-12',        typo: 'typo-heading2',  rounded: 'rounded-xl'      },
  18: { height: 'h-10',        typo: 'typo-headline2', rounded: 'rounded-[10px]'  },
  16: { height: 'h-9',         typo: 'typo-body1',     rounded: 'rounded-lg'      },
  14: { height: 'h-8',         typo: 'typo-label2',    rounded: 'rounded-lg'      },
};

// 수정 후
const sizeClasses: Record<TextButtonSize, { height: string; typo: string; rounded: string }> = {
  20: { height: 'h-8',         typo: 'typo-heading2',  rounded: 'rounded-lg'      },
  18: { height: 'h-8',         typo: 'typo-headline1', rounded: 'rounded-lg'      },
  16: { height: 'h-[26px]',    typo: 'typo-body1',     rounded: 'rounded-md'      },
  14: { height: 'h-[26px]',    typo: 'typo-label1',    rounded: 'rounded-md'      },
};
```

> rounded: size 20/18 → `rounded-lg` (8px), size 16/14 → `rounded-md` (6px)
> Tailwind v4 기본값: `rounded-md` = 6px, `rounded-lg` = 8px

### iconSizeClasses 수정

```ts
// 수정 전
const iconSizeClasses: Record<TextButtonSize, string> = {
  20: '[&>svg]:w-6 [&>svg]:h-6',
  18: '[&>svg]:w-5 [&>svg]:h-5',
  16: '[&>svg]:w-4 [&>svg]:h-4',
  14: '[&>svg]:w-4 [&>svg]:h-4',
};

// 수정 후
const iconSizeClasses: Record<TextButtonSize, string> = {
  20: '[&>svg]:w-5 [&>svg]:h-5',  // 20px
  18: '[&>svg]:w-5 [&>svg]:h-5',  // 20px (Figma: 18px → w-[18px] 대신 가장 가까운 Tailwind 단위 사용)
  16: '[&>svg]:w-4 [&>svg]:h-4',  // 16px
  14: '[&>svg]:w-[14px] [&>svg]:h-[14px]',  // 14px (Figma 측정값)
};
```

> size 18 아이콘: Figma 측정값 18px. `w-[18px]` arbitrary value가 필요하지만, Figma에서
> size 18/20 모두 20px 아이콘 그룹으로 묶여 있을 가능성이 높다. 최종 확인 후 구현자가 판단한다.

### variantClasses 수정

```ts
// 수정 전
const variantClasses: Record<string, string> = {
  primary:      'text-primary-strong',   // 잘못됨
  secondary:    'text-text-primary',
  tertiary:     'text-text-secondary',
  'on-primary': 'text-on-primary',
};

// 수정 후
const variantClasses: Record<string, string> = {
  primary:      'text-primary-regular',  // --primary-regular (blue-600)
  secondary:    'text-text-primary',
  tertiary:     'text-text-secondary',
  'on-primary': 'text-on-primary',
};
```

---

## Acceptance Criteria

1. size 20 버튼의 렌더링 높이가 32px(h-8)이다.
2. size 18 버튼의 렌더링 높이가 32px(h-8)이다.
3. size 16 버튼의 렌더링 높이가 26px(h-[26px])이다.
4. size 14 버튼의 렌더링 높이가 26px(h-[26px])이다.
5. size 18 버튼의 font-size가 18px(typo-headline1)이다.
6. size 14 버튼의 font-size가 14px(typo-label1)이다.
7. size 20 버튼의 corner radius가 8px(rounded-lg)이다.
8. size 16/14 버튼의 corner radius가 6px(rounded-md)이다.
9. size 20 버튼의 아이콘 크기가 20px(w-5 h-5)이다.
10. primary variant의 텍스트 색상이 `--primary-regular`(blue-600, #0069FF)이다.
    - `text-primary-strong`(blue-700) 클래스가 코드에 남아있지 않다.
11. secondary / tertiary / on-primary / disabled 색상은 현재와 동일하게 유지된다.
12. 로딩·disabled 상태의 동작이 수정 전과 동일하다.

---

## Affected Files

| 파일 | 변경 유형 | 이유 |
|------|-----------|------|
| `src/components/Button/TextButton.tsx` | 수정 | sizeClasses(height·typo·rounded), iconSizeClasses, variantClasses 수정 |
| `src/components/Button/types.ts` | 변경 없음 | TextButtonProps API 변경 없음 |
| `src/app/globals.css` | 변경 없음 | 필요한 토큰(`text-primary-regular`, `typo-headline1`, `typo-label1`)이 이미 등록되어 있음 |

---

## Implementation Steps

1. `TextButton.tsx` 열기
2. `sizeClasses` 객체 수정:
   - size 20: `h-12` → `h-8`, `rounded-xl` → `rounded-lg`
   - size 18: `h-10` → `h-8`, `typo-headline2` → `typo-headline1`, `rounded-[10px]` → `rounded-lg`
   - size 16: `h-9` → `h-[26px]`, `rounded-lg` → `rounded-md`
   - size 14: `h-8` → `h-[26px]`, `typo-label2` → `typo-label1`, `rounded-lg` → `rounded-md`
3. `iconSizeClasses` 객체 수정:
   - size 20: `[&>svg]:w-6 [&>svg]:h-6` → `[&>svg]:w-5 [&>svg]:h-5`
4. `variantClasses` 객체 수정:
   - primary: `text-primary-strong` → `text-primary-regular`
5. 파일 저장 후 재읽기로 의도한 값과 일치하는지 검증
6. 개발 서버(`npm run dev`)에서 프리뷰 페이지 확인

---

## Reusable Components (design-system.md Core Widgets)

- `Spinner` — 로딩 상태에 이미 사용 중. 변경 없음.
- 그 외 Core Widgets 재사용 없음. TextButton은 단독 원자 컴포넌트.

---

## Accessibility

- `disabled` prop 전달 시 네이티브 `disabled` 속성 + `aria-disabled` 적용 — 현재 구현 유지
- `loading` 상태 시 `aria-busy="true"` 적용 — 현재 구현 유지
- primary variant 색상 변경(`text-primary-strong` blue-700 → `text-primary-regular` blue-600) 대비 검토:
  - `text-primary-regular` = `--primary-regular` = `--blue-600` = `#0069FF`
  - 흰 배경(#FFFFFF) 대비율: WCAG AA 일반 텍스트(4.5:1) 충족 여부 확인 필요
  - design-system.md §2 대비 검증 표에서 `primary-strong(#0069FF) / bg-secondary(#FFFFFF)` = 4.70:1 PASS 기재
  - globals.css에서 `--primary-regular: var(--blue-600)` → `blue-600 = #0069FF`이므로 동일 값. 4.70:1 PASS.
- on-primary variant는 흰 배경이 아닌 primary 색 배경 위에서 사용 — 색상 변경 없으므로 대비 영향 없음.

---

## Dependencies

신규 패키지 없음. 모든 수정은 기존 Tailwind 토큰 및 @utility 클래스 범위 내에서 처리된다.
