# Controls / Feedback / Loading Components Design Spec

작성일: 2026-05-14
대상 스택: Next.js (App Router) + Tailwind CSS v4 + TypeScript

---

## 1. Controls

### 1-1. Checkbox

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | 체크 상태 (controlled) |
| `indeterminate` | `boolean` | `false` | 부분 선택 상태 |
| `defaultChecked` | `boolean` | `false` | 기본값 (uncontrolled) |
| `onChange` | `(checked: boolean, e) => void` | `undefined` | 상태 변경 콜백 |
| `disabled` | `boolean` | `false` | 비활성 |
| `label` | `ReactNode` | `undefined` | 라벨 텍스트 |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | 라벨 위치 |
| `name` | `string` | `undefined` | 폼 name |
| `value` | `string` | `undefined` | 폼 value |
| `id` | `string` | `useId()` | 고유 ID |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
<label>                                   ← label 있을 때 래퍼. label 없으면 <span>
│  base: inline-flex items-center gap-2 cursor-pointer
│  disabled: cursor-not-allowed opacity-40
│  labelPlacement='left': flex-row-reverse
│
├─ <span>                                 ← 체크박스 비주얼 컨테이너
│   │  base: relative flex-shrink-0 w-5 h-5 rounded-[5px]
│   │        border-2 transition-colors duration-150 ease-in-out
│   │        focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2
│   │
│   │  ── STATE 클래스 ──
│   │     unchecked:    border-border bg-surface
│   │     checked:      border-primary-regular bg-primary-regular
│   │     indeterminate: border-primary-regular bg-primary-regular
│   │     disabled+unchecked: border-border bg-surface opacity-40
│   │     disabled+checked:   border-primary-regular bg-primary-regular opacity-40
│   │
│   ├─ <input type="checkbox">            ← 실제 HTML input (숨김)
│   │     className: sr-only
│   │     aria-checked: "true" | "false" | "mixed" (indeterminate)
│   │     aria-disabled={disabled}
│   │     ref: (indeterminate 설정에 필요)
│   │
│   └─ <span>                             ← 아이콘 오버레이 (checked/indeterminate 시 표시)
│         │  base: absolute inset-0 flex items-center justify-center
│         │        pointer-events-none text-on-primary
│         │
│         │  ── checked: CheckIcon SVG (w-3 h-3) ──
│         └─ ── indeterminate: DashIcon SVG (w-3 h-3) ──
│
└─ {label && <span>}                      ← 라벨 텍스트
      typo-body1 font-normal text-text-primary
      disabled: text-text-disabled
```

#### States 리스트

| State | 비주얼 클래스 | aria |
|-------|-------------|------|
| unchecked | `border-border bg-surface` | `aria-checked="false"` |
| checked | `border-primary-regular bg-primary-regular` + CheckIcon | `aria-checked="true"` |
| indeterminate | `border-primary-regular bg-primary-regular` + DashIcon | `aria-checked="mixed"` |
| disabled | 위 세 상태에 `opacity-40 cursor-not-allowed` 추가 | `aria-disabled="true"` |
| focus-visible | `focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2` | — |

#### 디자인 토큰 매핑

| 위치 | 토큰 | Tailwind 클래스 |
|------|------|----------------|
| 미선택 테두리 | `--border-regular` | `border-border` |
| 미선택 배경 | `#FFFFFF` | `bg-surface` |
| 선택 테두리 | `--primary-regular` | `border-primary-regular` |
| 선택 배경 | `--primary-regular` | `bg-primary-regular` |
| 체크마크 색 | `#FFFFFF` | `text-on-primary` |
| 비활성 | opacity 40% | `opacity-40` |

---

### 1-2. Radio / RadioGroup

#### Radio Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | (required) | 그룹에서 현재 선택된 값 |
| `radioValue` | `string` | (required) | 이 Radio의 값 |
| `onChange` | `(value: string, e) => void` | `undefined` | 상태 변경 콜백 |
| `disabled` | `boolean` | `false` | 비활성 |
| `label` | `ReactNode` | `undefined` | 라벨 텍스트 |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | 라벨 위치 |
| `name` | `string` | `undefined` | RadioGroup에서 주입 |
| `id` | `string` | `useId()` | 고유 ID |
| `className` | `string` | `undefined` | 추가 클래스 |

#### RadioGroup Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | (required) | 폼 name, 하위 Radio에 전파 |
| `value` | `string` | `undefined` | 선택된 값 (controlled) |
| `defaultValue` | `string` | `undefined` | 기본값 (uncontrolled) |
| `onChange` | `(value: string) => void` | `undefined` | 상태 변경 콜백 |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | 방향 |
| `disabled` | `boolean` | `false` | 전체 비활성 |
| `aria-label` | `string` | `undefined` | 접근성 레이블 |
| `aria-labelledby` | `string` | `undefined` | 접근성 레이블 참조 |
| `children` | `ReactNode` | (required) | Radio 컴포넌트들 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree (Radio)

```
<label>                                   ← label 있을 때. 없으면 <span>
│  base: inline-flex items-center gap-2 cursor-pointer
│  disabled: cursor-not-allowed opacity-40
│  labelPlacement='left': flex-row-reverse
│
├─ <span>                                 ← 라디오 비주얼 컨테이너
│   │  base: relative flex-shrink-0 w-5 h-5 rounded-full
│   │        border-2 transition-colors duration-150 ease-in-out
│   │        focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2
│   │
│   │  ── STATE 클래스 ──
│   │     unselected: border-border bg-surface
│   │     selected:   border-primary-regular bg-surface
│   │     disabled:   opacity-40 cursor-not-allowed
│   │
│   ├─ <input type="radio">               ← 실제 HTML input (숨김)
│   │     className: sr-only
│   │     aria-checked={isSelected}
│   │     aria-disabled={disabled}
│   │
│   └─ {isSelected && <span>}             ← 내부 채움 DOT
│         absolute inset-0 flex items-center justify-center
│         <span>: w-2.5 h-2.5 rounded-full bg-primary-regular
│
└─ {label && <span>}                      ← 라벨 텍스트
      typo-body1 font-normal text-text-primary
      disabled: text-text-disabled
```

#### Component Tree (RadioGroup)

```
<fieldset>                                ← 그룹 컨테이너
│  role="radiogroup"
│  aria-label / aria-labelledby 전달
│  base: border-0 p-0 m-0
│
├─ <legend className="sr-only">          ← 스크린리더용 레이블
│
└─ <div>                                 ← 레이아웃 컨테이너
      vertical: flex flex-col gap-3
      horizontal: flex flex-row gap-4 flex-wrap
```

#### States 리스트

| State | 테두리 | 내부 DOT | aria |
|-------|--------|---------|------|
| unselected | `border-border` | 없음 | `aria-checked="false"` |
| selected | `border-primary-regular` | `bg-primary-regular` w-2.5 h-2.5 | `aria-checked="true"` |
| disabled | `opacity-40 cursor-not-allowed` | 선택 시 유지 | `aria-disabled="true"` |
| focus-visible | `focus-within:ring-2 ring-primary-regular ring-offset-2` | — | — |

#### 디자인 토큰 매핑

| 위치 | 토큰 | Tailwind 클래스 |
|------|------|----------------|
| 미선택 테두리 | `--border-regular` | `border-border` |
| 미선택 배경 | `#FFFFFF` | `bg-surface` |
| 선택 테두리 | `--primary-regular` | `border-primary-regular` |
| 선택 DOT | `--primary-regular` | `bg-primary-regular` |
| 비활성 | opacity 40% | `opacity-40` |

---

### 1-3. Toggle

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | on 여부 (controlled) |
| `defaultChecked` | `boolean` | `false` | 기본값 (uncontrolled) |
| `onChange` | `(checked: boolean, e) => void` | `undefined` | 상태 변경 콜백 |
| `disabled` | `boolean` | `false` | 비활성 |
| `label` | `ReactNode` | `undefined` | 라벨 텍스트 |
| `labelPlacement` | `'right' \| 'left'` | `'right'` | 라벨 위치 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `name` | `string` | `undefined` | 폼 name |
| `id` | `string` | `useId()` | 고유 ID |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Size 매핑

| Size | Track W×H | Thumb W×H | Thumb 이동 거리 |
|------|-----------|-----------|----------------|
| sm | 36×20px | 16×16px | `translate-x-4` (16px) |
| md | 48×28px | 24×24px | `translate-x-5` (20px) |

#### Component Tree

```
<label>                                   ← label 있을 때. 없으면 <span>
│  base: inline-flex items-center gap-2 cursor-pointer
│  disabled: cursor-not-allowed
│  labelPlacement='left': flex-row-reverse
│
├─ <span>                                 ← 트랙 (시각적 배경)
│   │  base: relative flex-shrink-0 rounded-full
│   │        transition-colors duration-200 ease-in-out
│   │        focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2
│   │
│   │  ── SIZE 클래스 ──
│   │     sm: w-9 h-5   (36×20px)
│   │     md: w-12 h-7  (48×28px)
│   │
│   │  ── STATE 클래스 ──
│   │     off:          bg-gray-200
│   │     on:           bg-primary-regular
│   │     disabled-off: bg-gray-100
│   │     disabled-on:  bg-primary-regular opacity-40
│   │
│   ├─ <input type="checkbox">            ← 실제 HTML input (숨김)
│   │     className: sr-only
│   │     role="switch"
│   │     aria-checked={checked}
│   │     aria-disabled={disabled}
│   │
│   └─ <span>                             ← 썸 (이동하는 원)
│         base: absolute top-0.5 left-0.5 rounded-full
│               bg-surface transition-transform duration-200 ease-in-out
│               shadow-sm
│         ── SIZE 클래스 ──
│            sm: w-4 h-4   (16×16px)
│            md: w-6 h-6   (24×24px)
│         ── TRANSFORM ──
│            off: translate-x-0
│            sm on: translate-x-4
│            md on: translate-x-5
│         ── disabled ──
│            disabled-off: bg-gray-300
│            disabled-on:  bg-surface (white)
│
└─ {label && <span>}                      ← 라벨 텍스트
      typo-body1 font-normal text-text-primary
      disabled: text-text-disabled opacity-40
```

#### States 리스트

| State | Track 색상 | Thumb 위치 | Thumb 색상 | aria |
|-------|-----------|-----------|-----------|------|
| off | `bg-gray-200` | `translate-x-0` | `bg-surface (white)` | `aria-checked="false"` |
| on | `bg-primary-regular` | sm:`translate-x-4` md:`translate-x-5` | `bg-surface (white)` | `aria-checked="true"` |
| disabled-off | `bg-gray-100` | `translate-x-0` | `bg-gray-300` | `aria-disabled="true"` |
| disabled-on | `bg-primary-regular opacity-40` | sm:`translate-x-4` md:`translate-x-5` | `bg-surface (white)` | `aria-disabled="true"` |
| focus-visible | `focus-within:ring-2 ring-primary-regular ring-offset-2` | — | — | — |

#### 디자인 토큰 매핑

| 위치 | 토큰 | Tailwind 클래스 |
|------|------|----------------|
| Track off | `--gray-200` | `bg-gray-200` |
| Track on | `--primary-regular` | `bg-primary-regular` |
| Track disabled-off | `--gray-100` | `bg-gray-100` |
| Thumb on/off | `#FFFFFF` | `bg-surface` |
| Thumb disabled-off | `--gray-300` | `bg-gray-300` |
| Thumb 비활성-on | `#FFFFFF` + `opacity-40` on track | `bg-surface` |

#### 애니메이션 정의

| 항목 | 구현 |
|------|------|
| Thumb 슬라이드 | `transition-transform duration-200 ease-in-out` — CSS transition |
| Track 색상 전환 | `transition-colors duration-200 ease-in-out` — CSS transition |
| keyframes | 별도 @keyframes 불필요 (CSS transition으로 충분) |

---

### Controls 파일 구조

| 파일 | 내용 |
|------|------|
| `src/components/Controls/types.ts` | CheckboxProps, RadioProps, RadioGroupProps, ToggleProps |
| `src/components/Controls/Checkbox.tsx` | `'use client'` — Checkbox 컴포넌트 |
| `src/components/Controls/Radio.tsx` | `'use client'` — Radio 컴포넌트 |
| `src/components/Controls/RadioGroup.tsx` | `'use client'` — Context + fieldset 레이아웃 |
| `src/components/Controls/Toggle.tsx` | `'use client'` — Toggle 컴포넌트 |
| `src/components/Controls/index.ts` | 공개 API 재내보내기 |
| `src/app/controls/page.tsx` | Server Component 미리보기 (`/controls`) |

---

## 2. Feedback

### 2-1. Toast

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | 표시 여부 |
| `onClose` | `() => void` | (required) | 닫기 콜백 |
| `message` | `string` | (required) | 메시지 텍스트 |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 알림 타입 |
| `duration` | `number` | `3000` | 자동 닫힘 ms. 0 = 자동 닫힘 없음 |
| `position` | `ToastPosition` | `'bottom-center'` | 화면 위치 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
<div>                                     ← Portal 컨테이너 (body에 mount)
│  position: fixed
│  z-index: var(--z-toast, 9000)
│  ── POSITION 클래스 ──
│     bottom-center: bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
│     bottom-left:   bottom-4 left-4 flex flex-col items-start gap-2
│     bottom-right:  bottom-4 right-4 flex flex-col items-end gap-2
│     top-center:    top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
│     top-left:      top-4 left-4 flex flex-col items-start gap-2
│     top-right:     top-4 right-4 flex flex-col items-end gap-2
│
└─ <div>                                  ← Toast 본체
      base: inline-flex items-center gap-2
            min-w-[240px] max-w-[360px] px-4 py-3 rounded-xl
            bg-gray-900 text-white
            shadow-lg
      ── 진입 애니메이션 ──
         open=true:  animate-toast-in
         open=false: animate-toast-out
      role="alert"
      aria-live="polite" (info/success) | "assertive" (warning/error)
      aria-atomic="true"
      │
      ├─ <span>                           ← 타입 아이콘
      │     flex-shrink-0 w-5 h-5
      │     ── TYPE 색상 ──
      │        info:    text-status-info
      │        success: text-status-positive
      │        warning: text-status-caution
      │        error:   text-status-negative
      │     ── 아이콘 SVG (16×16) ──
      │        info:    InfoCircle
      │        success: CheckCircle
      │        warning: WarningTriangle
      │        error:   XCircle
      │
      └─ <span>                           ← 메시지 텍스트
            typo-label1 font-medium text-on-primary
            flex-1 min-w-0
```

#### 애니메이션 정의

| 이름 | Keyframes | 적용 방향 |
|------|-----------|---------|
| `toast-in` (bottom-*) | `from: translateY(8px) opacity-0` → `to: translateY(0) opacity-1` | bottom 진입 |
| `toast-in` (top-*) | `from: translateY(-8px) opacity-0` → `to: translateY(0) opacity-1` | top 진입 |
| `toast-out` | `from: opacity-1` → `to: opacity-0 translateY(4px)` | 모든 방향 퇴장 |

duration: 200ms ease-out (진입), 150ms ease-in (퇴장)

globals.css `@theme inline`에 추가:
```
--animate-toast-in: toast-in 200ms ease-out;
--animate-toast-out: toast-out 150ms ease-in forwards;
```

---

### 2-2. Snackbar

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | 표시 여부 |
| `onClose` | `() => void` | (required) | 닫기 콜백 |
| `message` | `string` | (required) | 메시지 텍스트 |
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 알림 타입 |
| `duration` | `number` | `4000` | 자동 닫힘 ms |
| `action` | `{ label: string; onClick: () => void }` | `undefined` | 액션 버튼 |
| `showCloseButton` | `boolean` | `true` | X 버튼 표시 |
| `position` | `ToastPosition` | `'bottom-center'` | 화면 위치 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Component Tree

```
<div>                                     ← Portal 컨테이너 (Toast와 동일 구조)
│
└─ <div>                                  ← Snackbar 본체
      base: inline-flex items-center gap-3
            min-w-[280px] max-w-[480px] px-4 py-3 rounded-xl
            bg-gray-900 text-white
            shadow-lg
      animate-toast-in / animate-toast-out (Toast와 동일)
      role="alert"
      aria-live: polite(info/success) | assertive(warning/error)
      aria-atomic="true"
      │
      ├─ <span>                           ← 타입 아이콘 (Toast와 동일 규칙)
      │
      ├─ <span>                           ← 메시지 텍스트
      │     typo-label1 font-medium text-on-primary flex-1 min-w-0
      │
      ├─ {action && <button>}             ← 액션 버튼
      │     typo-label1 font-semibold text-primary-regular
      │     flex-shrink-0 hover:opacity-80
      │     aria-label={action.label}
      │
      └─ {showCloseButton && <button>}    ← 닫기 버튼
            flex-shrink-0 w-5 h-5 text-on-primary opacity-60
            hover:opacity-100
            aria-label="알림 닫기"
            ── X 아이콘 SVG (16×16) ──
```

#### 타입별 디자인 토큰 매핑

| Type | 배경 | 텍스트 | 아이콘 색 |
|------|------|--------|---------|
| info | `bg-gray-900` | `text-on-primary` | `text-status-info` |
| success | `bg-gray-900` | `text-on-primary` | `text-status-positive` |
| warning | `bg-gray-900` | `text-on-primary` | `text-status-caution` |
| error | `bg-gray-900` | `text-on-primary` | `text-status-negative` |
| 액션 버튼 | — | `text-primary-regular` | — |

#### States 리스트

- **Mounted (open=true)**: `animate-toast-in` 재생. hover/focus 시 duration 타이머 일시정지
- **Dismissing (open=false)**: `animate-toast-out` 재생. 200ms 후 DOM에서 제거
- **Hover/Focus**: duration 타이머 `clearTimeout` — WCAG 2.1 SC 2.2.2 준수
- **Stacked**: 동일 position에 여러 개 표시 시 `gap-2` flex column으로 쌓임

---

### 2-3. ToastProvider / useToast

#### Component Tree (Provider)

```
<ToastContext.Provider>                   ← Context 제공 (toast, snackbar, dismiss)
│  children
│
└─ {Portal}                              ← position별 그룹화 후 body에 mount
      ── 내부 items 배열을 position 기준으로 그룹화 ──
      ── 각 position 컨테이너: fixed + z-toast + position 클래스 ──
      ── 각 item: variant='toast' → <Toast>, variant='snackbar' → <Snackbar> ──
```

#### useToast 반환값

| 함수 | 시그니처 | 설명 |
|------|---------|------|
| `toast` | `(msg, opts?) => void` | Toast 추가 |
| `snackbar` | `(msg, opts?) => void` | Snackbar 추가 |
| `dismiss` | `(id) => void` | 특정 id 제거 |

---

### Feedback 파일 구조

| 파일 | 내용 |
|------|------|
| `src/components/Feedback/types.ts` | FeedbackType, ToastProps, SnackbarProps, ToastItem, ToastContextValue |
| `src/components/Feedback/FeedbackIcon.tsx` | Server Component — type별 SVG 아이콘 |
| `src/components/Feedback/Toast.tsx` | `'use client'` — Toast 컴포넌트 |
| `src/components/Feedback/Snackbar.tsx` | `'use client'` — Snackbar 컴포넌트 |
| `src/components/Feedback/ToastProvider.tsx` | `'use client'` — Provider + useToast |
| `src/components/Feedback/index.ts` | 공개 API 재내보내기 |
| `src/app/feedback/page.tsx` | `'use client'` 미리보기 (`/feedback`) |

#### globals.css 추가 항목

```css
@keyframes toast-in-bottom {
  from { transform: translateY(8px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@keyframes toast-in-top {
  from { transform: translateY(-8px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
@keyframes toast-out {
  from { opacity: 1; }
  to   { transform: translateY(4px); opacity: 0; }
}
```

@theme inline 등록:
```
--animate-toast-in: toast-in-bottom 200ms ease-out;
--animate-toast-out: toast-out 150ms ease-in forwards;
```

z-index 추가 (`:root`):
```
--z-toast: 9000;
```

---

## 3. Loading

### 3-1. LoadingSpinner

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 |
| `color` | `'primary' \| 'white' \| 'current'` | `'current'` | 색상 |
| `overlay` | `boolean` | `false` | 전체 화면 오버레이 모드 |
| `overlayDimmed` | `boolean` | `true` | overlay시 딤 배경 표시 |
| `label` | `string` | `'로딩 중'` | 스크린리더 레이블 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Size 매핑

| Size | w × h | Tailwind 클래스 |
|------|-------|----------------|
| xs | 16×16px | `w-4 h-4` |
| sm | 20×20px | `w-5 h-5` |
| md | 24×24px | `w-6 h-6` |
| lg | 32×32px | `w-8 h-8` |
| xl | 40×40px | `w-10 h-10` |

#### 색상 매핑

| Color | CSS 값 | Tailwind 클래스 |
|-------|--------|----------------|
| `primary` | `--primary-regular` | `text-primary-regular` |
| `white` | `#FFFFFF` | `text-on-primary` |
| `current` | 부모 색 상속 | `text-current` (기본값, 별도 클래스 불필요) |

#### Component Tree (기본 모드)

```
<span>                                    ← role="status" 컨테이너
│  role="status"
│  aria-label={label}
│
└─ <svg>                                  ← 회전 SVG
      className: animate-spin
      ── SIZE 클래스 ──
         xs: w-4 h-4 | sm: w-5 h-5 | md: w-6 h-6 | lg: w-8 h-8 | xl: w-10 h-10
      ── COLOR 클래스 ──
         primary: text-primary-regular
         white:   text-on-primary
         current: (currentColor 기본, 클래스 불필요)
      aria-hidden="true"
      viewBox="0 0 24 24"
      │
      ├─ <circle>                         ← 배경 트랙 원
      │     cx=12 cy=12 r=10 stroke=currentColor
      │     strokeWidth=2 opacity=0.25
      │
      └─ <path>                           ← 회전 호
            d="M12 2a10 10 0 0 1 10 10"
            stroke=currentColor strokeWidth=2 strokeLinecap="round"
```

#### Component Tree (overlay 모드)

```
{createPortal(
  <div>                                   ← 전체 화면 오버레이 (body에 mount)
  │  fixed inset-0
  │  z-[9999]
  │  flex items-center justify-center
  │  ── overlayDimmed=true ──
  │     bg-[var(--dimmed-regular)]  (rgba(0,0,0,0.44))
  │  ── overlayDimmed=false ──
  │     bg-transparent
  │  aria-live="polite"
  │
  └─ <LoadingSpinner>                     ← 중앙 스피너
        size, color, label props 전달
  , document.body
)}
```

#### States 리스트

- **기본**: `animate-spin` 무한 회전. `role="status"` + `aria-label`
- **overlay=true + overlayDimmed=true**: 딤 전체 화면 + 중앙 스피너. `z-[9999]`
- **overlay=true + overlayDimmed=false**: 투명 전체 화면 + 중앙 스피너

---

### 3-2. ProgressBar

#### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | 진행률 0–100 (determinate) |
| `mode` | `'determinate' \| 'indeterminate'` | `'determinate'` | 모드 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 높이 |
| `color` | `'primary' \| 'positive' \| 'caution' \| 'negative'` | `'primary'` | 채움 색상 |
| `trackColor` | `'default' \| 'transparent'` | `'default'` | 트랙 색상 |
| `rounded` | `boolean` | `true` | 모서리 둥글기 |
| `aria-label` | `string` | `undefined` | 접근성 레이블 |
| `aria-labelledby` | `string` | `undefined` | 접근성 레이블 참조 |
| `className` | `string` | `undefined` | 추가 클래스 |

#### Size 매핑 (높이)

| Size | 높이 | Tailwind 클래스 |
|------|------|----------------|
| sm | 4px | `h-1` |
| md | 8px | `h-2` |
| lg | 12px | `h-3` |

#### 색상 매핑 (채움)

| Color | 토큰 | Tailwind 클래스 |
|-------|------|----------------|
| primary | `--primary-regular` | `bg-primary-regular` |
| positive | `--status-positive-regular` | `bg-status-positive` |
| caution | `--status-caution-regular` | `bg-status-caution` |
| negative | `--status-negative-regular` | `bg-status-negative` |

#### Component Tree

```
<div>                                     ← 트랙 (배경)
│  base: w-full overflow-hidden
│  ── SIZE 클래스 ──
│     sm: h-1 | md: h-2 | lg: h-3
│  ── TRACK COLOR 클래스 ──
│     default:     bg-gray-200
│     transparent: bg-transparent
│  ── ROUNDED 클래스 ──
│     true:  rounded-full
│     false: rounded-none
│  role="progressbar"
│  aria-label / aria-labelledby
│  aria-valuemin="0" aria-valuemax="100"
│  aria-valuenow={value} (determinate만)
│
└─ <div>                                  ← 채움 바
      base: h-full
      ── COLOR 클래스 ──
         primary: bg-primary-regular
         positive: bg-status-positive
         caution:  bg-status-caution
         negative: bg-status-negative
      ── ROUNDED 클래스 ──
         true:  rounded-full
         false: rounded-none
      ── DETERMINATE ──
         style={{ width: `${clamp(value, 0, 100)}%` }}
         transition-[width] duration-300 ease-out
      ── INDETERMINATE ──
         w-1/3
         animate-progress-indeterminate
         (aria-valuenow 생략)
```

#### States 리스트

| Mode | 채움 동작 | 애니메이션 |
|------|---------|---------|
| determinate | `width: value%`. `transition-[width] duration-300 ease-out` | 없음 |
| indeterminate | `width: 33%` 고정. 좌→우 슬라이딩 | `animate-progress-indeterminate` |

#### 애니메이션 정의

globals.css에 이미 정의된 `progress-indeterminate` keyframes 재사용:

```css
@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
```

`--animate-progress-indeterminate: progress-indeterminate 1.5s ease-in-out infinite;` — 이미 등록됨

---

### Loading 파일 구조

| 파일 | 내용 |
|------|------|
| `src/components/Loading/types.ts` | LoadingSpinnerProps, ProgressBarProps |
| `src/components/Loading/Spinner.tsx` | `'use client'` — overlay 모드 포함 |
| `src/components/Loading/ProgressBar.tsx` | Server Component — determinate/indeterminate |
| `src/components/Loading/index.ts` | `LoadingSpinner`, `ProgressBar` export |
| `src/app/loading/page.tsx` | `'use client'` 미리보기 (`/loading`) |

---

## globals.css 추가 사항 요약

| 항목 | 위치 | 내용 |
|------|------|------|
| `--z-toast: 9000` | `:root` | Toast z-index 변수 |
| `@keyframes toast-in-bottom` | 전역 | bottom 진입 애니메이션 |
| `@keyframes toast-in-top` | 전역 | top 진입 애니메이션 |
| `@keyframes toast-out` | 전역 | 퇴장 애니메이션 |
| `--animate-toast-in` | `@theme inline` | Toast 진입 단축 |
| `--animate-toast-out` | `@theme inline` | Toast 퇴장 단축 |
| `progress-indeterminate` | 이미 존재 | 재사용 (추가 불필요) |
| `--color-gray-200` | `@theme inline` | 이미 존재 — ProgressBar 트랙에 사용 |

---

## 접근성 체크리스트

| 컴포넌트 | role | aria 속성 | 키보드 |
|---------|------|-----------|-------|
| Checkbox | `checkbox` | `aria-checked` (true/false/mixed), `aria-disabled` | Space 토글 |
| Radio | `radio` | `aria-checked`, `aria-disabled` | 방향키로 그룹 이동 |
| RadioGroup | `radiogroup` | `aria-label` 또는 `aria-labelledby` | — |
| Toggle | `switch` | `aria-checked`, `aria-disabled` | Space 토글 |
| Toast | `alert` | `aria-live` (polite/assertive), `aria-atomic="true"` | Escape 닫기 |
| Snackbar | `alert` | `aria-live`, `aria-atomic`, 닫기버튼 `aria-label="알림 닫기"` | Escape 닫기 |
| LoadingSpinner | `status` | `aria-label` | — |
| ProgressBar | `progressbar` | `aria-valuemin/max/now`, `aria-label` 또는 `aria-labelledby` | — |

---

## design-system.md Core Widgets 추가 항목

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| Checkbox | `@/components/Controls` | 다중 선택 체크박스 | checked, indeterminate, disabled, label, labelPlacement, onChange |
| Radio | `@/components/Controls` | 단일 선택 라디오 버튼 | radioValue, value, disabled, label, labelPlacement, onChange |
| RadioGroup | `@/components/Controls` | Radio 그룹 컨테이너 | name, value, onChange, orientation, disabled |
| Toggle | `@/components/Controls` | on/off 스위치 | checked, size, disabled, label, onChange |
| Toast | `@/components/Feedback` | 단순 알림 메시지 | open, onClose, message, type, duration, position |
| Snackbar | `@/components/Feedback` | 액션 포함 알림 | open, onClose, message, type, action, showCloseButton, duration |
| ToastProvider | `@/components/Feedback` | 명령형 알림 컨텍스트 | (Context Provider) |
| useToast | `@/components/Feedback` | 명령형 Toast/Snackbar 훅 | returns { toast, snackbar, dismiss } |
| LoadingSpinner | `@/components/Loading` | 원형 로딩 인디케이터 | size, color, overlay, overlayDimmed, label |
| ProgressBar (Loading) | `@/components/Loading` | 선형 진행 바 | value, mode, size, color, trackColor, rounded |
