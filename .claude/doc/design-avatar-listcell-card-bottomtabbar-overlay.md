# Avatar / ListCell / Card / BottomTabBar / Overlay — Design Spec

작성일: 2026-05-14
Figma 파일: GXzbUcg1AtdzLi7XytKp1l

---

## globals.css 추가 토큰 (누락 토큰만)

`@theme inline` 블록에 아래 토큰이 없으면 추가한다.

```css
/* Avatar status dot */
--color-gray-400: var(--gray-400);
/* Overlay backdrop */
--color-dimmed: var(--dimmed-regular);   /* 이미 존재 — 재확인 후 스킵 가능 */
```

scale-in / fade-in keyframe — globals.css에 없으면 추가:

```css
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes scale-out {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.95); }
}
```

---

## 1. Avatar

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | 이미지 URL (Next.js Image) |
| `alt` | `string` | `undefined` | 이미지 alt 텍스트 |
| `initials` | `string` | `undefined` | 이니셜 fallback (최대 2자, 대문자 변환) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 크기 |
| `shape` | `'circle' \| 'square'` | `'circle'` | 형태 |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | `undefined` | 상태 dot |
| `aria-label` | `string` | `undefined` | 접근성 레이블 |
| `className` | `string` | `undefined` | 추가 클래스 |

### Component Tree

```
<span>                              ← 루트 래퍼
│   base: relative inline-flex items-center justify-center shrink-0
│   shape=circle: rounded-full
│   shape=square: rounded-lg
│
│   ── SIZE 클래스 (픽셀 고정) ──
│      xs: w-6 h-6   (24px)
│      sm: w-8 h-8   (32px)
│      md: w-10 h-10 (40px)
│      lg: w-12 h-12 (48px)
│      xl: w-14 h-14 (56px)
│
├── [BRANCH A] src && !imgError
│   └── <Image>                     ← Next.js Image
│       fill / object-cover / alt={alt}
│       onError → imgError=true
│
├── [BRANCH B] initials (no src or imgError)
│   └── <span>                      ← 이니셜
│       bg-gray-200 text-text-primary font-semibold select-none
│       typo 클래스: xs=typo-caption2 / sm=typo-caption1 / md=typo-label1 / lg=typo-body2 / xl=typo-body1
│
├── [BRANCH C] fallback (no src, no initials)
│   └── <UserIcon>                  ← svg 아이콘
│       bg-gray-100 text-text-tertiary
│       size: xs=12px / sm=16px / md=20px / lg=24px / xl=28px
│
└── [OPTIONAL] status dot
    └── <span aria-hidden="true">   ← status dot (조건부)
        absolute bottom-0 right-0
        ring-2 ring-surface rounded-full
        size: xs/sm=w-2 h-2(8px) / md=w-2.5 h-2.5(10px) / lg/xl=w-3 h-3(12px)
        online:  bg-status-positive
        offline: bg-gray-400
        busy:    bg-status-negative
        away:    bg-status-caution
```

### States 리스트

| State | 클래스 변화 |
|-------|-------------|
| image-loaded | Branch A 렌더, overflow-hidden 필요 |
| image-error | imgError=true → Branch B 또는 C로 전환 |
| initials | Branch B: `bg-gray-200 text-text-primary font-semibold` |
| icon-fallback | Branch C: `bg-gray-100 text-text-tertiary` |
| status:online | dot: `bg-status-positive` |
| status:offline | dot: `bg-gray-400` |
| status:busy | dot: `bg-status-negative` |
| status:away | dot: `bg-status-caution` |

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/Avatar/Avatar.tsx` | 메인 컴포넌트 (`'use client'` — imgError useState) |
| `src/components/Avatar/types.ts` | AvatarSize / AvatarShape / AvatarStatus / AvatarProps |
| `src/components/Avatar/index.ts` | 배럴 익스포트 |
| `src/app/avatar/page.tsx` | 프리뷰 페이지 |

### 접근성 속성

| 요소 | 속성 |
|------|------|
| Image fallback | `alt` 필수 |
| Initials / Icon fallback | `role="img"` + `aria-label` |
| Status dot | `aria-hidden="true"` (시각 전용) |

---

## 2. ListCell

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | (required) | 제목 |
| `subtitle` | `string` | `undefined` | 부제목 |
| `leadingIcon` | `ReactNode` | `undefined` | 좌측 아이콘 (24px) |
| `leadingAvatar` | `ReactNode` | `undefined` | 좌측 Avatar (leadingIcon보다 우선) |
| `trailingType` | `'none' \| 'icon' \| 'text' \| 'switch' \| 'badge'` | `'none'` | 우측 영역 타입 |
| `trailingIcon` | `ReactNode` | `undefined` | trailing=icon 시 사용할 아이콘 (기본: ChevronRight) |
| `trailingText` | `string` | `undefined` | trailing=text 시 표시할 텍스트 |
| `switchChecked` | `boolean` | `undefined` | trailing=switch Toggle 상태 |
| `onSwitchChange` | `(checked: boolean) => void` | `undefined` | Toggle onChange |
| `trailingBadge` | `ReactNode` | `undefined` | trailing=badge Badge 노드 |
| `onClick` | `() => void` | `undefined` | 클릭 핸들러 (제공 시 인터랙티브) |
| `showDivider` | `boolean` | `false` | 하단 Divider |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `className` | `string` | `undefined` | 추가 클래스 |

### Component Tree

```
<button type="button"> OR <div>     ← onClick 있으면 button, 없으면 div
│   base: flex items-center gap-3 px-4 min-h-14 w-full bg-surface
│   interactive: cursor-pointer active:bg-pressed-dark-weak transition-colors duration-100
│   disabled: opacity-40 pointer-events-none
│   (aria-disabled, tabIndex=-1 when disabled)
│
├── [OPTIONAL] Leading 영역 (40px 고정 너비)
│   ├── leadingAvatar → <Avatar> 노드 (우선)
│   └── leadingIcon  → <span className="text-text-secondary w-6 h-6 flex items-center">
│
├── Content 영역 (flex-1)
│   ├── <p>    title    typo-body2 font-semibold text-text-primary
│   └── <p>    subtitle typo-label1 text-text-secondary  (조건부)
│       gap-0.5 between title+subtitle
│
└── [OPTIONAL] Trailing 영역 (shrink-0)
    ├── trailingType=icon  → <span> text-text-secondary w-5 h-5
    │                         (ChevronRight 기본 or trailingIcon)
    ├── trailingType=text  → <span> typo-label1 text-text-tertiary
    ├── trailingType=switch→ <Toggle> checked={switchChecked} onChange={onSwitchChange}
    │                         onClick 전파 방지 (e.stopPropagation)
    └── trailingType=badge → trailingBadge 노드

└── [OPTIONAL] <Divider> (showDivider=true, Divider 컴포넌트 재사용)
```

### States 리스트

| State | 클래스 변화 |
|-------|-------------|
| default | `bg-surface` |
| pressed (active) | `active:bg-pressed-dark-weak` |
| disabled | `opacity-40 pointer-events-none` |
| no-leading | leading 영역 생략, content가 왼쪽 끝부터 시작 |
| no-trailing | trailing 영역 생략 |

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/ListCell/ListCell.tsx` | 메인 컴포넌트 (`'use client'` — Toggle 연동) |
| `src/components/ListCell/types.ts` | ListCellTrailingType / ListCellProps |
| `src/components/ListCell/index.ts` | 배럴 익스포트 |
| `src/app/list-cell/page.tsx` | 프리뷰 페이지 |

### 접근성 속성

| 요소 | 속성 |
|------|------|
| 인터랙티브 래퍼 | `<button type="button">` (키보드 접근) |
| disabled 상태 | `aria-disabled="true"` + `tabIndex={-1}` |
| trailing=switch | Toggle 컴포넌트의 `role="switch"` 위임 |

---

## 3. Card

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | 스타일 변형 |
| `header` | `ReactNode` | `undefined` | 헤더 슬롯 |
| `children` | `ReactNode` | `undefined` | 본문 콘텐츠 |
| `footer` | `ReactNode` | `undefined` | 푸터 슬롯 |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | 클릭 핸들러 (제공 시 button 렌더) |
| `disabled` | `boolean` | `false` | 비활성 (onClick 있을 때만 유효) |
| `noPadding` | `boolean` | `false` | 내부 패딩 제거 |
| `aria-label` | `string` | `undefined` | 인터랙티브 카드 접근성 레이블 |
| `className` | `string` | `undefined` | 추가 클래스 |

### Component Tree

```
<button> OR <div>                   ← onClick 있으면 button, 없으면 div
│   base: rounded-2xl overflow-hidden w-full text-left
│   interactive: transition-all duration-150 cursor-pointer
│                active:scale-[0.99] active:brightness-95
│                focus-visible:outline-none focus-visible:ring-2
│                focus-visible:ring-primary-regular focus-visible:ring-offset-2
│   disabled: opacity-40 pointer-events-none
│
│   ── VARIANT 클래스 ──
│      elevated: bg-surface shadow-sm
│      outlined: bg-surface border border-border
│      filled:   bg-background
│
├── [OPTIONAL] Header 슬롯
│   └── <div>  p-4 border-b border-border   ← header prop 있을 때만
│              (noPadding=true → px-0 py-0, 패딩 없음)
│
├── Content 슬롯
│   └── <div>  p-4                           ← noPadding=true → p-0
│
└── [OPTIONAL] Footer 슬롯
    └── <div>  px-4 py-3 border-t border-border  ← footer prop 있을 때만
```

### States 리스트

| State | 클래스 변화 |
|-------|-------------|
| elevated (default) | `bg-surface shadow-sm` |
| outlined | `bg-surface border border-border` |
| filled | `bg-background` |
| hover (interactive) | `hover:brightness-95` |
| pressed | `active:scale-[0.99] active:brightness-95` |
| focus | `focus-visible:ring-2 focus-visible:ring-primary-regular focus-visible:ring-offset-2` |
| disabled | `opacity-40 pointer-events-none` |

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/Card/Card.tsx` | 메인 컴포넌트 (Server Component 가능, interactive 아닐 때) |
| `src/components/Card/types.ts` | CardVariant / CardProps |
| `src/components/Card/index.ts` | 배럴 익스포트 |
| `src/app/card/page.tsx` | 프리뷰 페이지 |

### 접근성 속성

| 요소 | 속성 |
|------|------|
| 정적 카드 | `<div>` (role="article" 선택적) |
| 인터랙티브 카드 | `<button type="button">` + `aria-label` 권장 |
| disabled | `aria-disabled="true"` + `tabIndex={-1}` |

---

## 4. BottomTabBar

### Props 테이블

**BottomTabBarProps**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | (required) | 탭 아이템 목록 (3~5개) |
| `activeKey` | `string` | (required) | 현재 활성 탭 키 |
| `onChange` | `(key: string) => void` | (required) | 탭 변경 콜백 |
| `safeAreaBottom` | `boolean` | `true` | iOS safe area 하단 여백 |
| `className` | `string` | `undefined` | 추가 클래스 |

**TabItem**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | (required) | 고유 키 |
| `icon` | `ReactNode` | (required) | 비활성 아이콘 (24px) |
| `activeIcon` | `ReactNode` | `undefined` | 활성 아이콘 (없으면 icon 재사용) |
| `label` | `string` | (required) | 탭 레이블 |
| `badge` | `'dot' \| 'count' \| 'none'` | `'none'` | 배지 타입 |
| `badgeCount` | `number` | `undefined` | badge=count 시 숫자 |
| `disabled` | `boolean` | `false` | 탭 비활성 |

### Component Tree

```
<nav role="tablist" aria-label="메인 네비게이션">
│   base: fixed bottom-0 left-0 right-0 z-30
│         bg-surface border-t border-border
│         flex items-start
│         safeAreaBottom: pb-[env(safe-area-inset-bottom)]
│
└── items.map → <button role="tab">  ← 각 탭 버튼
    │   base: flex-1 flex flex-col items-center pt-2 pb-2 gap-1
    │         transition-colors duration-150
    │         disabled: pointer-events-none
    │
    │   aria-selected={isActive}
    │   aria-disabled={disabled}
    │   tabIndex={isActive ? 0 : -1}
    │
    ├── Icon 영역 (relative)
    │   └── <span> relative w-6 h-6 flex items-center justify-center
    │       active: text-primary-regular
    │       inactive: text-text-tertiary
    │       disabled: text-text-disabled
    │       ── [OPTIONAL] Badge 오버레이 (absolute -top-0.5 -right-1) ──
    │          badge=dot:   <Badge variant="dot" aria-hidden="true">
    │          badge=count: <Badge variant="count">{badgeCount}</Badge>
    │
    └── <span> typo-caption1
        active:   font-semibold text-primary-regular
        inactive: font-normal   text-text-tertiary
        disabled: font-normal   text-text-disabled
```

### States 리스트

| State | 아이콘 클래스 | 레이블 클래스 |
|-------|--------------|--------------|
| active | `text-primary-regular` | `typo-caption1 font-semibold text-primary-regular` |
| inactive | `text-text-tertiary` | `typo-caption1 font-normal text-text-tertiary` |
| disabled | `text-text-disabled` | `typo-caption1 font-normal text-text-disabled` |

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/BottomTabBar/BottomTabBar.tsx` | 메인 컴포넌트 (`'use client'`) |
| `src/components/BottomTabBar/types.ts` | TabItem / BottomTabBarProps |
| `src/components/BottomTabBar/index.ts` | 배럴 익스포트 |
| `src/app/bottom-tab-bar/page.tsx` | 프리뷰 페이지 |

### 접근성 속성

| 요소 | 속성 |
|------|------|
| 래퍼 nav | `role="tablist"` + `aria-label="메인 네비게이션"` |
| 각 탭 버튼 | `role="tab"` + `aria-selected={isActive}` + `aria-disabled={disabled}` |
| roving tabindex | `tabIndex={isActive ? 0 : -1}` |
| count 배지 | 탭 버튼에 `aria-label="레이블 (알림 N개)"` 포함 |
| dot 배지 | `aria-hidden="true"` (시각 전용) |

---

## 5. Overlay

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | (required) | 열림 여부 |
| `onClose` | `() => void` | (required) | 닫기 콜백 |
| `size` | `'sm' \| 'md' \| 'lg' \| 'fullscreen'` | `'md'` | 패널 크기 |
| `title` | `string` | `undefined` | 헤더 제목 |
| `showCloseButton` | `boolean` | `true` | X 버튼 표시 |
| `header` | `ReactNode` | `undefined` | 커스텀 헤더 슬롯 (title 대체) |
| `children` | `ReactNode` | `undefined` | 본문 콘텐츠 |
| `footer` | `ReactNode` | `undefined` | 액션 버튼 슬롯 |
| `closeOnBackdropClick` | `boolean` | `true` | backdrop 클릭 닫기 |
| `closeOnEscape` | `boolean` | `true` | Escape 키 닫기 |
| `aria-label` | `string` | `undefined` | title 없을 때 접근성 레이블 |
| `className` | `string` | `undefined` | 패널 추가 클래스 |

### Component Tree

```
createPortal(…, document.body)      ← Portal 마운트

<div>                               ← fixed 래퍼 (z-50)
│   fixed inset-0 z-50 flex items-center justify-center
│   size=fullscreen: items-stretch
│
├── <div>                           ← Backdrop
│   absolute inset-0 bg-dimmed
│   animate: fade-in 150ms / fade-out 150ms
│   onClick → closeOnBackdropClick 시 onClose
│
└── <div role="dialog">             ← 패널
    │   relative bg-surface rounded-2xl shadow-xl
    │   flex flex-col
    │   animate: scale-in 150ms ease-out (open) / scale-out 150ms ease-in (close)
    │
    │   ── SIZE 클래스 ──
    │      sm:         w-full max-w-sm max-h-[90vh]
    │      md:         w-full max-w-md max-h-[90vh]
    │      lg:         w-full max-w-lg max-h-[90vh]
    │      fullscreen: w-full h-full rounded-none max-h-none
    │
    │   aria-modal="true"
    │   aria-labelledby="overlay-title" (title 있을 때)
    │   aria-label={aria-label} (title 없을 때)
    │
    ├── [OPTIONAL] Header
    │   └── <div> px-5 pt-5 pb-4 flex justify-between items-start shrink-0
    │       ├── <h2 id="overlay-title"> typo-headline2 font-semibold text-text-strong
    │       │   OR header 슬롯 (커스텀)
    │       └── [showCloseButton] <IconButton> text-text-secondary aria-label="닫기"
    │               → <XIcon> 20px
    │
    ├── Content
    │   └── <div> px-5 pb-5 overflow-y-auto flex-1
    │       header 없을 때 pt-5 추가
    │
    └── [OPTIONAL] Footer
        └── <div> px-5 pb-5 flex gap-2 justify-end shrink-0
            border-t border-border pt-4 (children 있을 때)
```

### States 리스트

| State | 클래스 변화 |
|-------|-------------|
| open=true (enter) | backdrop: `animate-fade-in` / panel: `animate-scale-in` |
| open=false (exit) | backdrop: `animate-fade-out` / panel: `animate-scale-out` → 150ms 후 DOM unmount |
| size=sm | `max-w-sm` |
| size=md | `max-w-md` (기본) |
| size=lg | `max-w-lg` |
| size=fullscreen | `w-full h-full rounded-none max-h-none` |
| no-header | content에 `pt-5` 추가 |
| no-footer | footer 슬롯 생략 |

### @theme inline 애니메이션 토큰 (globals.css 추가)

```css
--animate-overlay-in:       scale-in 150ms ease-out;
--animate-overlay-out:      scale-out 150ms ease-in forwards;
--animate-backdrop-in:      fade-in 150ms ease;
--animate-backdrop-out:     fade-out 150ms ease forwards;
```

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/Overlay/Overlay.tsx` | 메인 컴포넌트 (`'use client'`) |
| `src/components/Overlay/useFocusTrap.ts` | 포커스 트랩 훅 |
| `src/components/Overlay/types.ts` | OverlaySize / OverlayProps |
| `src/components/Overlay/index.ts` | 배럴 익스포트 |
| `src/app/overlay/page.tsx` | 프리뷰 페이지 |

### 접근성 속성

| 요소 | 속성 |
|------|------|
| 패널 | `role="dialog"` + `aria-modal="true"` |
| 제목 있을 때 | `aria-labelledby="overlay-title"` |
| 제목 없을 때 | `aria-label` prop |
| 닫기 버튼 | `aria-label="닫기"` |
| 포커스 트랩 | `useFocusTrap` 훅 — Tab/Shift+Tab 순환, 열릴 때 첫 요소 포커스, 닫힐 때 트리거로 복귀 |
| body scroll lock | `document.body.style.overflow = 'hidden'` (open 시), 복원 (close 시) |
| 배경 | `aria-hidden="true"` (body 콘텐츠, open 중) |

---

## design-system.md Core Widgets 등록 대상

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| Avatar | `@/components/Avatar` | 사용자 프로필 이미지 (이미지/이니셜/아이콘 fallback, 상태 dot) | size, shape, src, alt, initials, status, aria-label |
| ListCell | `@/components/ListCell` | 리스트 아이템 단위 (leading icon/avatar, title, subtitle, trailing 5종) | title, subtitle, leadingIcon, leadingAvatar, trailingType, trailingIcon, trailingText, switchChecked, trailingBadge, onClick, showDivider, disabled |
| Card | `@/components/Card` | 콘텐츠 그룹화 컨테이너 (elevated/outlined/filled, header/content/footer 슬롯) | variant, header, children, footer, onClick, disabled, noPadding |
| BottomTabBar | `@/components/BottomTabBar` | 모바일 하단 네비게이션 (3~5탭, 배지, safe area) | items, activeKey, onChange, safeAreaBottom |
| Overlay | `@/components/Overlay` | Modal/Dialog (포커스 트랩, 4가지 크기, 3가지 닫기 수단) | open, onClose, size, title, showCloseButton, header, children, footer, closeOnBackdropClick, closeOnEscape |
