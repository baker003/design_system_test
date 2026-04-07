# Chip / ChipGroup Components Design Spec

## 사전 조건: @theme inline 추가 토큰

`globals.css`의 `@theme inline` 블록에 아래 토큰 추가 필요:

```css
--color-notification-red: var(--notification-red);
--color-white: #FFFFFF;
```

---

## 1. Chip

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'outlined' \| 'filled'` | `'outlined'` | 칩 배경 스타일 |
| `size` | `'md' \| 'sm' \| 'xs'` | `'md'` | 칩 크기 |
| `selected` | `boolean` | `false` | 선택 상태 |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `label` | `string` | (required) | 칩 라벨 텍스트 |
| `fontStyle` | `'title' \| 'body'` | `undefined` | 폰트 스타일 강제 지정. 미지정 시 unselected=body, selected=title |
| `count` | `number` | `undefined` | 선택 시 카운트 뱃지 (selected 상태에서만 표시) |
| `leadingIcon` | `React.ReactNode` | `undefined` | 왼쪽 아이콘 |
| `showLeadingIcon` | `boolean` | `true` | 왼쪽 아이콘 표시 여부 |
| `trailingIcon` | `React.ReactNode` | `undefined` | 오른쪽 아이콘 |
| `showTrailingIcon` | `boolean` | `true` | 오른쪽 아이콘 표시 여부 |
| `showNewBadge` | `boolean` | `false` | 텍스트 우측 상단 빨간 점(6px) 표시 |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | `undefined` | 클릭 핸들러 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Size 매핑

| Size | Height | Padding (H) | Font Size | Line Height | Leading Icon | Trailing Icon | Tailwind Class |
|------|--------|-------------|-----------|-------------|-------------|--------------|----------------|
| md | 40px | 12px (텍스트만) / 8px (아이콘 포함 측) | 16px | 24px | 20px | 16px | `h-10 text-[16px] leading-[24px]` |
| sm | 36px | 12px (텍스트만) / 8px (아이콘 포함 측) | 14px | 22px | 18px | 14px | `h-9 text-[14px] leading-[22px]` |
| xs | 32px | 12px (텍스트만) / 8px (아이콘 포함 측) | 13px | 20px | 16px | 12px | `h-8 text-[13px] leading-[20px]` |

### Font Weight 로직

| 조건 | Font Weight | Tailwind Class |
|------|-------------|----------------|
| `fontStyle='title'` | SemiBold (600) | `font-semibold` |
| `fontStyle='body'` | Regular (400) | `font-normal` |
| `fontStyle` 미지정 + `selected=false` | Regular (400) | `font-normal` |
| `fontStyle` 미지정 + `selected=true` | SemiBold (600) | `font-semibold` |

### Component Tree

```
<button>                              ← 루트. pill 형태
│                                        base: inline-flex items-center justify-center
│                                              gap-1.5 rounded-full min-w-[56px]
│                                              transition-transform duration-150 ease-in-out
│                                              focus-visible:outline-none focus-visible:ring-2
│                                              focus-visible:ring-primary-strong focus-visible:ring-offset-2
│                                              disabled:cursor-not-allowed disabled:pointer-events-none
│                                        aria: aria-pressed={selected}
│                                              disabled={disabled} aria-disabled={disabled}
│
│  ── SIZE 클래스 ──
│     md: h-10 text-[16px] leading-[24px]
│     sm: h-9  text-[14px] leading-[22px]
│     xs: h-8  text-[13px] leading-[20px]
│
│  ── PADDING 클래스 (동적) ──
│     leadingIcon 표시:  pl-2
│     leadingIcon 미표시: pl-3
│     trailingIcon 표시:  pr-2
│     trailingIcon 미표시: pr-3
│     수직 패딩: py-2 (8px, 모든 size 공통)
│
│  ── FONT WEIGHT 클래스 ──
│     title (또는 selected 기본): font-semibold
│     body (또는 unselected 기본): font-normal
│
│  ── TYPE x STATE 클래스 ──
│     outlined + unselected: bg-white border border-border text-text-primary
│     outlined + selected:   bg-white border border-primary-strong text-primary-strong
│     outlined + disabled:   bg-white border border-border text-text-disabled
│     filled + unselected:   bg-background text-text-primary
│     filled + selected:     bg-primary-strong text-white
│     filled + disabled:     bg-background text-text-disabled
│
│  ── PRESSED (active) ──
│     active:scale-[0.96] (비활성 시 제외)
│
├─ {leadingIcon && showLeadingIcon &&
│   <span>}                           ← 아이콘 래퍼
│     │                                  flex-shrink-0
│     │  ── SIZE별 아이콘 크기 ──
│     │     md: [&>svg]:w-5 [&>svg]:h-5   (20px)
│     │     sm: [&>svg]:w-[18px] [&>svg]:h-[18px]  (18px)
│     │     xs: [&>svg]:w-4 [&>svg]:h-4   (16px)
│     │  ── 아이콘 색상 ──
│     │     outlined+unselected: text-text-secondary
│     │     outlined+selected:   text-primary-strong
│     │     outlined+disabled:   text-text-disabled
│     │     filled+unselected:   text-text-secondary
│     │     filled+selected:     text-white
│     │     filled+disabled:     text-text-disabled
│     └─ {leadingIcon}
│
├─ <span>                             ← 라벨 + NEW 뱃지 래퍼
│   │                                    relative inline-flex items-center
│   │
│   ├─ {label}                        ← 텍스트
│   │
│   ├─ {selected && count != null &&
│   │   <span>}                       ← 카운트 뱃지
│   │     ml-0.5 text-current
│   │     "{count}"
│   │
│   └─ {showNewBadge &&
│       <span>}                       ← NEW 빨간 점
│         absolute -top-0.5 -right-2
│         w-1.5 h-1.5 rounded-full
│         bg-notification-red
│         disabled 시: bg-text-disabled
│
├─ {trailingIcon && showTrailingIcon &&
│   <span>}                           ← 아이콘 래퍼
│     │                                  flex-shrink-0
│     │  ── SIZE별 아이콘 크기 ──
│     │     md: [&>svg]:w-4 [&>svg]:h-4   (16px)
│     │     sm: [&>svg]:w-3.5 [&>svg]:h-3.5  (14px)
│     │     xs: [&>svg]:w-3 [&>svg]:h-3   (12px)
│     │  ── 아이콘 색상: leadingIcon과 동일 규칙 ──
│     └─ {trailingIcon}
│
</button>
```

### States 리스트

- **Unselected**: 기본 type별 스타일. `font-normal`. `aria-pressed="false"`
- **Pressed (active)**: `active:scale-[0.96] transition-transform duration-150 ease-in-out`. 배경색은 Unselected/Selected 상태 유지
- **Selected**: type별 선택 스타일. `font-semibold`. `aria-pressed="true"`. count 뱃지 표시 가능
- **Disabled**: `text-text-disabled`, `cursor-not-allowed`, `pointer-events-none`. `disabled` + `aria-disabled="true"`. NEW 뱃지도 `bg-text-disabled`로 변경
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`

---

## 2. ChipGroup

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `'carousel' \| 'multiline'` | `'carousel'` | 레이아웃 모드 |
| `gap` | `number` | `8` | 칩 간 간격 (px, 최대 12) |
| `children` | `React.ReactNode` | (required) | 자식 Chip 요소들 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
<div>                                 ← 루트 컨테이너
│                                        base: flex min-w-[320px] max-w-[674px] px-4 py-2
│
│  ── LAYOUT 클래스 ──
│     carousel: flex-nowrap overflow-x-auto
│               [scrollbar-width:none]
│               [-webkit-scrollbar]:hidden
│     multiline: flex-wrap
│
│  ── GAP ──
│     gap-2 (기본 8px)
│     또는 style={{ gap: `${gap}px` }} (커스텀 gap 전달 시)
│
│  ── CAROUSEL 스크롤바 숨김 (globals.css 유틸리티) ──
│     .scrollbar-hide::-webkit-scrollbar { display: none }
│     .scrollbar-hide { scrollbar-width: none }
│
│  ── 접근성 (carousel 모드) ──
│     role="group"
│     aria-label="칩 그룹"
│     키보드: 좌/우 방향키로 포커스 이동 (onKeyDown 핸들러)
│
├─ {children}                         ← Chip 컴포넌트들
│
</div>
```

### States 리스트

- **Carousel**: `flex-nowrap overflow-x-auto scrollbar-hide px-4`. 한 줄 가로 스크롤. 좌/우 방향키 탐색 지원
- **Multiline**: `flex-wrap px-4`. 여러 줄 자동 줄바꿈

---

## 접근성 체크리스트

| 항목 | 구현 방법 |
|------|-----------|
| 시맨틱 HTML | 네이티브 `<button>` 요소 사용 (role 자동 부여) |
| 키보드 지원 | Enter/Space로 선택/해제 (네이티브), Tab 포커스 이동 |
| Carousel 탐색 | ChipGroup `onKeyDown`에서 ArrowLeft/ArrowRight로 형제 칩 포커스 이동 |
| 포커스 표시 | `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2` |
| 선택 상태 | `aria-pressed="true/false"` |
| 비활성 상태 | `disabled` 속성 + `aria-disabled="true"` 동시 적용 |
| 색상 대비 | blue-600 on white = 4.75:1, gray-800 on white = 9.73:1 (WCAG AA 충족) |
| 터치 타겟 | 최소 32px (xs) -- WCAG 2.5.8 권장 24px 이상 충족 |
| 스크린리더 | selected + count 시 `aria-label`에 카운트 포함 (예: "필터명 3개 선택됨") |
