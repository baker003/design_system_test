# Button Components Design Spec

## 사전 조건: @theme inline 추가 토큰

`globals.css`의 `@theme inline` 블록에 아래 토큰 추가 필요:

```css
--color-status-negative-strong: var(--status-negative-strong);
--color-pressed-dark-weak: var(--pressed-dark-weak);
--color-gray-100: var(--gray-100);
--color-gray-200: var(--gray-200);
```

---

## 1. ActionButton

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'fill' \| 'outline' \| 'ghost'` | `'fill'` | 버튼 스타일 타입 |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'destructive'` | `'primary'` | 색상 변형 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 버튼 크기 |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `loading` | `boolean` | `false` | 로딩 상태 (스피너 표시, 클릭 비활성) |
| `fullWidth` | `boolean` | `false` | 부모 너비 100% |
| `leftIcon` | `React.ReactNode` | `undefined` | 텍스트 왼쪽 아이콘 |
| `rightIcon` | `React.ReactNode` | `undefined` | 텍스트 오른쪽 아이콘 |
| `children` | `React.ReactNode` | (required) | 버튼 텍스트 |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | 클릭 핸들러 |
| `htmlType` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type 속성 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
<button>                          ← 루트. 공통 + type/variant/size 클래스
│                                    base: inline-flex items-center justify-center gap-1.5
│                                          font-semibold whitespace-nowrap
│                                          transition-transform duration-150 ease-in-out
│                                          focus-visible:outline-none focus-visible:ring-2
│                                          focus-visible:ring-primary-strong focus-visible:ring-offset-2
│                                          disabled:pointer-events-none
│                                    fullWidth: w-full
│
│  ── SIZE 클래스 ──
│     xs: h-8   px-3  text-[12px] leading-[18px] font-medium rounded-lg
│     sm: h-9   px-3.5 text-[13px] leading-[20px] font-semibold rounded-lg
│     md: h-10  px-4  text-[14px] leading-[22px] font-semibold rounded-[10px]
│     lg: h-12  px-5  text-[16px] leading-[24px] font-semibold rounded-xl
│     xl: h-14  px-6  text-[18px] leading-[26px] font-semibold rounded-xl
│
│  ── TYPE x VARIANT 클래스 ──
│     fill+primary:       bg-primary-strong text-white
│     fill+secondary:     bg-gray-200 text-text-primary
│     fill+tertiary:      bg-gray-100 text-text-secondary
│     fill+destructive:   bg-status-negative-strong text-white
│     outline+primary:    bg-transparent text-primary-strong border border-primary-strong
│     outline+secondary:  bg-transparent text-text-primary border border-border
│     outline+tertiary:   bg-transparent text-text-secondary border border-border
│     outline+destructive:bg-transparent text-status-negative-strong border border-status-negative-strong
│     ghost+primary:      bg-transparent text-primary-strong
│     ghost+secondary:    bg-transparent text-text-primary
│     ghost+tertiary:     bg-transparent text-text-secondary
│     ghost+destructive:  bg-transparent text-status-negative-strong
│
│  ── DISABLED 클래스 ──
│     disabled: opacity-40
│
├─ {loading && <Spinner />}       ← absolute inset-0 flex items-center justify-center
│   <svg>                            animate-spin w-5 h-5 (md 기준, size에 따라 조정)
│
├─ <span>                         ← loading 시: invisible (공간 유지, 시각적 숨김)
│   │                                flex items-center gap-1.5
│   ├─ {leftIcon}                 ← [&>svg]:w-4 [&>svg]:h-4 (xs/sm) | w-5 h-5 (md/lg) | w-6 h-6 (xl)
│   ├─ {children}                 ← 텍스트
│   └─ {rightIcon}                ← leftIcon과 동일 사이즈
│
</button>
```

### States 리스트

- **Enabled**: 기본 type x variant 스타일 적용
- **Hover**: `hover:brightness-95` (fill) / `hover:bg-pressed-dark-weak` (outline, ghost)
- **Pressed (active)**: `active:scale-[0.96] transition-transform duration-150 ease-in-out`
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`
- **Loading**: `aria-busy="true"`, `pointer-events-none`, 텍스트/아이콘 `invisible`, 스피너 `absolute` 중앙 표시
- **Disabled**: `disabled` 속성 + `aria-disabled="true"`, `opacity-40`, `pointer-events-none`

---

## 2. TextButton

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | 색상 변형 |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 버튼 크기 |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `leftIcon` | `React.ReactNode` | `undefined` | 텍스트 왼쪽 아이콘 |
| `rightIcon` | `React.ReactNode` | `undefined` | 텍스트 오른쪽 아이콘 |
| `children` | `React.ReactNode` | (required) | 버튼 텍스트 |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | 클릭 핸들러 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
<button>                          ← 루트. bg-transparent 항상
│                                    base: inline-flex items-center justify-center gap-1.5
│                                          bg-transparent font-semibold whitespace-nowrap
│                                          px-2
│                                          transition-transform duration-150 ease-in-out
│                                          focus-visible:outline-none focus-visible:ring-2
│                                          focus-visible:ring-primary-strong focus-visible:ring-offset-2
│                                          disabled:pointer-events-none
│
│  ── SIZE 클래스 (height/font만, padding은 px-2 고정) ──
│     xs: h-8  text-[12px] leading-[18px] font-medium rounded-lg
│     sm: h-9  text-[13px] leading-[20px] font-semibold rounded-lg
│     md: h-10 text-[14px] leading-[22px] font-semibold rounded-[10px]
│     lg: h-12 text-[16px] leading-[24px] font-semibold rounded-xl
│     xl: h-14 text-[18px] leading-[26px] font-semibold rounded-xl
│
│  ── VARIANT 클래스 (텍스트 색상만) ──
│     primary:   text-primary-strong
│     secondary: text-text-primary
│     tertiary:  text-text-secondary
│
│  ── DISABLED ──
│     disabled:  text-text-disabled
│
├─ {leftIcon}                     ← 아이콘 사이즈는 ActionButton과 동일 규칙
├─ {children}
└─ {rightIcon}
```

### States 리스트

- **Enabled**: variant별 텍스트 색상, 배경 transparent
- **Hover**: `hover:bg-pressed-dark-weak`
- **Pressed (active)**: `active:scale-[0.96] transition-transform duration-150 ease-in-out`
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`
- **Disabled**: `text-text-disabled`, `pointer-events-none`, `disabled` + `aria-disabled="true"`

---

## 3. IconButton

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 버튼 크기 |
| `shape` | `'square' \| 'circle'` | `'square'` | 버튼 모양 |
| `type` | `'fill' \| 'outline' \| 'ghost'` | `'ghost'` | 배경 스타일 |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `icon` | `React.ReactNode` | (required) | 아이콘 요소 |
| `aria-label` | `string` | (required) | 접근성 라벨 |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | 클릭 핸들러 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
<button>                          ← 루트. 정사각형, 아이콘 중앙 정렬
│                                    base: inline-flex items-center justify-center
│                                          text-text-primary
│                                          transition-transform duration-150 ease-in-out
│                                          focus-visible:outline-none focus-visible:ring-2
│                                          focus-visible:ring-primary-strong focus-visible:ring-offset-2
│                                          disabled:pointer-events-none
│
│  ── SIZE 클래스 (정사각형) ──
│     xs: w-8  h-8  rounded-lg       [&>svg]:w-4 [&>svg]:h-4
│     sm: w-9  h-9  rounded-lg       [&>svg]:w-5 [&>svg]:h-5
│     md: w-10 h-10 rounded-[10px]   [&>svg]:w-5 [&>svg]:h-5
│     lg: w-12 h-12 rounded-xl       [&>svg]:w-6 [&>svg]:h-6
│     xl: w-14 h-14 rounded-xl       [&>svg]:w-6 [&>svg]:h-6
│
│  ── SHAPE 오버라이드 ──
│     circle: rounded-full           (모든 size의 rounded-* 대체)
│
│  ── TYPE 클래스 ──
│     fill:    bg-gray-200
│     outline: bg-transparent border border-border
│     ghost:   bg-transparent
│
│  ── DISABLED ──
│     disabled: text-text-disabled opacity-40
│
└─ {icon}                         ← svg 아이콘. 부모의 [&>svg] 셀렉터로 사이즈 제어
```

### States 리스트

- **Enabled**: `text-text-primary`, type별 배경
- **Hover**: `hover:bg-pressed-dark-weak` (ghost/outline) / `hover:brightness-95` (fill)
- **Pressed (active)**: `active:scale-[0.96] transition-transform duration-150 ease-in-out`
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`
- **Disabled**: `text-text-disabled`, `opacity-40`, `pointer-events-none`, `disabled` + `aria-disabled="true"`

---

## 4. LinkTextButton

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 텍스트 크기 |
| `disabled` | `boolean` | `false` | 비활성 상태 |
| `children` | `React.ReactNode` | (required) | 버튼 텍스트 |
| `onClick` | `(e: MouseEvent) => void` | `undefined` | 클릭 핸들러 |
| `href` | `string` | `undefined` | 제공 시 `<a>` 태그로 렌더링 |
| `className` | `string` | `undefined` | 추가 Tailwind 클래스 |

### Component Tree

```
<button|a>                        ← href 유무에 따라 <a> 또는 <button> 렌더링
│                                    base: inline-flex items-center
│                                          text-primary-strong underline
│                                          decoration-primary-strong underline-offset-2
│                                          transition-transform duration-150 ease-in-out
│                                          focus-visible:outline-none focus-visible:ring-2
│                                          focus-visible:ring-primary-strong focus-visible:ring-offset-2
│                                          disabled:pointer-events-none
│
│  ── SIZE 클래스 (텍스트 크기만) ──
│     xs: text-[12px] leading-[18px] font-medium
│     sm: text-[13px] leading-[20px] font-semibold
│     md: text-[14px] leading-[22px] font-semibold
│     lg: text-[16px] leading-[24px] font-semibold
│     xl: text-[18px] leading-[26px] font-semibold
│
│  ── DISABLED ──
│     disabled: text-text-disabled decoration-text-disabled
│
└─ {children}                     ← 텍스트
```

### States 리스트

- **Enabled**: `text-primary-strong`, `underline`
- **Hover**: `hover:text-primary-heavy hover:decoration-primary-heavy`
- **Pressed (active)**: `active:scale-[0.96] transition-transform duration-150 ease-in-out`
- **Focus-visible**: `focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2`
- **Disabled**: `text-text-disabled`, `decoration-text-disabled`, `pointer-events-none`
- **`<a>` 렌더링 시**: `href` prop이 존재하면 `<a>` 태그 사용, `role` 불필요 (네이티브 시맨틱)

---

## 공통 사항

### Spinner 컴포넌트 (ActionButton 내부용)

```
<svg>                             ← animate-spin
│                                    fill: none, stroke: currentColor
│                                    사이즈: size prop에 따라 w-4 h-4 ~ w-6 h-6
└─ <circle cx="12" cy="12" r="10" stroke-width="2" opacity="0.25" />
└─ <path d="M12 2a10 10 0 0 1 10 10" stroke-width="2" stroke-linecap="round" />
```

### Icon Size 매핑 (공통 참조)

| Size | Icon (px) | Tailwind Class |
|------|-----------|----------------|
| xs | 16 | `w-4 h-4` |
| sm | 16 | `w-4 h-4` |
| md | 20 | `w-5 h-5` |
| lg | 20 | `w-5 h-5` |
| xl | 24 | `w-6 h-6` |

### 접근성 체크리스트

- `<button>` 네이티브 요소 사용 (role 자동)
- `disabled` + `aria-disabled="true"` 동시 적용
- `loading` 시 `aria-busy="true"` 적용
- IconButton: `aria-label` TypeScript 필수 prop
- 키보드: Enter/Space 활성화 (네이티브), Tab 포커스 이동
- focus-visible 링: `ring-2 ring-primary-strong ring-offset-2`
- 최소 터치 타겟: 32px (xs)
- 색상 대비: WCAG AA 충족 (blue-600 on white = 4.75:1)
