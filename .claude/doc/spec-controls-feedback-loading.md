# DS_2 컴포넌트 명세 — Controls / Feedback / Loading

작성일: 2026-05-14
대상 스택: Next.js (App Router) + Tailwind CSS v4 + TypeScript
색상 규칙: 시맨틱 토큰만 사용, 하드코딩 금지

---

## 개요

이 문서는 DS_2 디자인 시스템에 추가되는 3개 컴포넌트 그룹을 정의한다.

| 그룹 | 컴포넌트 | 미리보기 경로 |
|------|---------|-------------|
| Controls | Checkbox, Radio, Toggle | `/controls` |
| Feedback | Toast, Snackbar | `/feedback` |
| Loading | Spinner, ProgressBar | `/loading` |

---

## 1. Controls (Checkbox / Radio / Toggle)

### Summary

선택 입력 컨트롤 3종을 구현한다. Checkbox(다중 선택), Radio(단일 선택 그룹), Toggle/Switch(on-off 전환)로 구성된다. 세 컴포넌트 모두 label 텍스트를 포함할 수 있으며, disabled 상태를 지원한다. DS_2 Figma "Controls" 페이지의 디자인을 기반으로 한다.

### Figma Reference

- 파일: DS_2 (`9BojhdnvhQSi1wpWpLwPnH`)
- 페이지: Controls
- 주요 컴포넌트셋: Checkbox ComponentSet, Radio ComponentSet, Toggle ComponentSet
- 참고: Figma MCP로 Controls 페이지에서 node-id를 사전 조회 후 figma-sync 에이전트에 명시할 것

### Component API

```typescript
// src/components/Controls/types.ts

import type { ReactNode, ChangeEvent } from 'react';

// ── Checkbox ──────────────────────────────────────────────

/** Checkbox 체크 상태 */
export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';

export interface CheckboxProps {
  /** 체크 상태 (controlled) */
  checked?: boolean;
  /** indeterminate 상태 */
  indeterminate?: boolean;
  /** 기본값 (uncontrolled) */
  defaultChecked?: boolean;
  /** 상태 변경 콜백 */
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 라벨 텍스트 (optional) */
  label?: ReactNode;
  /** 라벨 배치 (기본 right) */
  labelPlacement?: 'right' | 'left';
  /** 폼 name */
  name?: string;
  /** 폼 value */
  value?: string;
  /** 고유 ID (자동 생성 시 생략 가능) */
  id?: string;
  className?: string;
}

// ── Radio ────────────────────────────────────────────────

export interface RadioProps {
  /** 선택된 value */
  value: string;
  /** 라디오 버튼의 value */
  radioValue: string;
  /** 상태 변경 콜백 */
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 라벨 텍스트 (optional) */
  label?: ReactNode;
  /** 라벨 배치 (기본 right) */
  labelPlacement?: 'right' | 'left';
  /** 폼 name (RadioGroup에서 주입됨) */
  name?: string;
  /** 고유 ID */
  id?: string;
  className?: string;
}

export interface RadioGroupProps {
  /** 선택된 value (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 상태 변경 콜백 */
  onChange?: (value: string) => void;
  /** 그룹 name (fieldset name) */
  name: string;
  /** 방향 */
  orientation?: 'vertical' | 'horizontal';
  /** 비활성화 여부 (모든 Radio에 전파) */
  disabled?: boolean;
  /** 접근성 레이블 */
  'aria-label'?: string;
  /** 접근성 레이블 참조 ID */
  'aria-labelledby'?: string;
  children: ReactNode;
  className?: string;
}

// ── Toggle (Switch) ───────────────────────────────────────

export interface ToggleProps {
  /** on 여부 (controlled) */
  checked?: boolean;
  /** 기본값 (uncontrolled) */
  defaultChecked?: boolean;
  /** 상태 변경 콜백 */
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 라벨 텍스트 (optional) */
  label?: ReactNode;
  /** 라벨 배치 (기본 right) */
  labelPlacement?: 'right' | 'left';
  /** 폼 name */
  name?: string;
  /** 크기 */
  size?: 'sm' | 'md';
  /** 고유 ID */
  id?: string;
  className?: string;
}
```

### Variants / States

#### Checkbox

| State | 설명 |
|-------|------|
| unchecked | 미선택 (기본) |
| checked | 선택됨 — 체크마크 아이콘 + primary 배경 |
| indeterminate | 부분 선택 — 대시 아이콘 + primary 배경 |
| disabled (unchecked) | 비활성 미선택 |
| disabled (checked) | 비활성 선택 |
| disabled (indeterminate) | 비활성 부분 선택 |

#### Radio

| State | 설명 |
|-------|------|
| unselected | 미선택 (기본) — 빈 원 테두리 |
| selected | 선택됨 — 내부 원 dot + primary 테두리 |
| disabled (unselected) | 비활성 미선택 |
| disabled (selected) | 비활성 선택 |

#### Toggle

| Size | Track W×H | Thumb W×H |
|------|-----------|-----------|
| sm | 36×20px | 16×16px |
| md | 48×28px | 24×24px |

| State | 설명 |
|-------|------|
| off | Track: gray-200, Thumb: white |
| on | Track: primary-regular, Thumb: white |
| disabled-off | Track: gray-100, Thumb: gray-300 |
| disabled-on | Track: primary-regular @ 40% opacity, Thumb: white |

### Acceptance Criteria

- [ ] Checkbox: checked/unchecked/indeterminate 3가지 상태 모두 렌더링
- [ ] Checkbox: disabled prop 적용 시 pointer-events 없음, 시각적 비활성 처리
- [ ] Radio: RadioGroup 내 name 자동 공유, 단일 선택 동작
- [ ] Radio: RadioGroup orientation prop으로 vertical/horizontal 레이아웃 전환
- [ ] Toggle: on/off 트랙+썸 애니메이션 (transition-transform, 200ms ease)
- [ ] Toggle: size sm/md 모두 정확한 치수 렌더링
- [ ] 세 컴포넌트 모두 label prop 있을 때 `<label>` 요소로 감싸 클릭 영역 확장
- [ ] label 없는 단독 사용 시 반드시 aria-label 또는 외부 aria-labelledby 필요
- [ ] 키보드: Space(Checkbox/Toggle 토글), 방향키(Radio 그룹 이동)
- [ ] 시맨틱 토큰 전용 — 하드코딩 색상 없음
- [ ] `/controls` 미리보기 페이지에서 모든 state/size 조합 확인 가능

### Affected Files

| 파일 | 작업 | 이유 |
|------|------|------|
| `src/components/Controls/types.ts` | 생성 | CheckboxProps, RadioProps, RadioGroupProps, ToggleProps 타입 정의 |
| `src/components/Controls/Checkbox.tsx` | 생성 | Checkbox 컴포넌트 구현 |
| `src/components/Controls/Radio.tsx` | 생성 | Radio 컴포넌트 구현 |
| `src/components/Controls/RadioGroup.tsx` | 생성 | RadioGroup 컨텍스트 + 레이아웃 컴포넌트 |
| `src/components/Controls/Toggle.tsx` | 생성 | Toggle/Switch 컴포넌트 구현 |
| `src/components/Controls/index.ts` | 생성 | 공개 API 재내보내기 |
| `src/app/controls/page.tsx` | 생성 | 미리보기 페이지 (`/controls`) |
| `.claude/doc/design-system.md` | 수정 | Core Widgets 표에 Checkbox, Radio, RadioGroup, Toggle 추가 |

### Implementation Steps

1. `src/components/Controls/types.ts` 생성 — 위 API 타입 전부 정의
2. `Checkbox.tsx` 구현
   - `<input type="checkbox">` + SVG 아이콘 오버레이 패턴
   - indeterminate는 `ref.current.indeterminate = true` (DOM prop)
   - `useId()` (React 18)로 id 자동 생성
   - `'use client'` 필요 (onChange 핸들러)
3. `RadioGroup.tsx` 구현
   - React Context (`RadioGroupContext`)로 name, value, onChange, disabled 하위 전파
   - `<fieldset>` + `<legend className="sr-only">` 패턴
4. `Radio.tsx` 구현
   - `useContext(RadioGroupContext)`로 그룹 값 수신
   - `<input type="radio">` + 커스텀 원 오버레이
5. `Toggle.tsx` 구현
   - `<input type="checkbox">` 숨김 + `<span>` 트랙/썸 시각화
   - `translate-x` Tailwind 클래스로 썸 슬라이드 애니메이션
6. `index.ts` 작성 — Checkbox, Radio, RadioGroup, Toggle export
7. `src/app/controls/page.tsx` 작성 — Server Component, Section별 state 시연

### Reusable Components (design-system.md Core Widgets)

- 재사용 가능한 기존 위젯 없음 (Controls는 신규 영역)
- `Spinner` (Button 내부)는 참고만 — 재사용 불필요

### Accessibility

- Checkbox: `role="checkbox"`, `aria-checked="true|false|mixed"` (indeterminate = "mixed")
- Radio: `role="radio"`, `aria-checked`, RadioGroup은 `role="radiogroup"`
- Toggle: `role="switch"`, `aria-checked="true|false"`
- 모든 컨트롤: `disabled` → `aria-disabled="true"` + `tabIndex={-1}`
- 라벨 연결: `<label htmlFor={id}>` 패턴 또는 `aria-labelledby`
- 포커스 링: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-regular`
- WCAG 2.1 AA: 최소 터치 타겟 44×44px (모바일 기준), 데스크탑 24×24px 이상

### Dependencies

추가 패키지 없음 (React 18 `useId` 내장 사용)

---

## 2. Feedback (Toast / Snackbar)

### Summary

화면 하단에 잠깐 나타났다 사라지는 짧은 알림 메시지 컴포넌트를 구현한다. Toast는 단순 메시지 알림, Snackbar는 액션 버튼을 포함할 수 있는 확장형이다. 두 컴포넌트는 유사한 구조를 공유하며, info/success/warning/error 4가지 타입과 자동 dismiss(duration) 기능을 지원한다.

DS_2 Figma의 "Feedback" 페이지, Snackbar 노드 (`5954:34603`)를 참조한다.

### Figma Reference

- 파일: DS_2 (`9BojhdnvhQSi1wpWpLwPnH`)
- 페이지: Feedback / Snackbar — Node ID `5954:34603`
- 추가 참조: Alert — Node ID `5856:71629`
- 참고: Feedback 페이지 전체 node-id는 figma-sync 에이전트 호출 전 Figma MCP로 조회 필요

### Component API

```typescript
// src/components/Feedback/types.ts

import type { ReactNode } from 'react';

/** 알림 타입 */
export type FeedbackType = 'info' | 'success' | 'warning' | 'error';

// ── Toast ─────────────────────────────────────────────────

export interface ToastProps {
  /** 표시 여부 (controlled) */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 알림 메시지 */
  message: string;
  /** 알림 타입 (기본 info) */
  type?: FeedbackType;
  /** 자동 닫힘 시간 ms (기본 3000, 0이면 자동 닫힘 없음) */
  duration?: number;
  /** 위치 (기본 bottom-center) */
  position?: ToastPosition;
  className?: string;
}

export type ToastPosition =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

// ── Snackbar ─────────────────────────────────────────────

export interface SnackbarAction {
  /** 액션 버튼 라벨 */
  label: string;
  /** 액션 버튼 클릭 콜백 */
  onClick: () => void;
}

export interface SnackbarProps {
  /** 표시 여부 (controlled) */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 알림 메시지 */
  message: string;
  /** 알림 타입 (기본 info) */
  type?: FeedbackType;
  /** 자동 닫힘 시간 ms (기본 4000, 0이면 자동 닫힘 없음) */
  duration?: number;
  /** 액션 버튼 (optional) */
  action?: SnackbarAction;
  /** 닫기 버튼 표시 여부 (기본 true) */
  showCloseButton?: boolean;
  /** 위치 (기본 bottom-center) */
  position?: ToastPosition;
  className?: string;
}

// ── ToastProvider / useToast ──────────────────────────────

export interface ToastItem {
  id: string;
  message: string;
  type?: FeedbackType;
  duration?: number;
  action?: SnackbarAction;
  variant: 'toast' | 'snackbar';
}

export interface ToastContextValue {
  toast: (message: string, options?: Omit<ToastItem, 'id' | 'variant'>) => void;
  snackbar: (message: string, options?: Omit<ToastItem, 'id' | 'variant'>) => void;
  dismiss: (id: string) => void;
}
```

### Variants / States

#### 타입별 시각 디자인

| Type | 아이콘 | 배경 토큰 | 텍스트 토큰 |
|------|--------|-----------|------------|
| info | 정보 원형 아이콘 | `gray-900` (다크) | `white` |
| success | 체크 원형 아이콘 | `gray-900` (다크) | `status-positive-regular` |
| warning | 느낌표 삼각 아이콘 | `gray-900` (다크) | `status-caution-regular` |
| error | X 원형 아이콘 | `gray-900` (다크) | `status-negative-regular` |

DS_2 Snackbar는 다크 배경(gray-900) + 흰 텍스트 단일 surface가 기본이며, 타입은 아이콘 색상과 액션 버튼 색상으로 구분된다.

#### 애니메이션

| 방향 | 진입 | 퇴장 |
|------|------|------|
| bottom-* | `translate-y-2 → translate-y-0` + `opacity-0 → opacity-100` | 반대 방향 |
| top-* | `translate-y-[-8px] → translate-y-0` + `opacity-0 → opacity-100` | 반대 방향 |
| duration: 200ms ease-out |

### Acceptance Criteria

- [ ] Toast: open=true 시 지정 position에 렌더링, duration 후 자동 onClose 호출
- [ ] Toast: duration=0 이면 자동 닫힘 없음
- [ ] Snackbar: action prop 있을 때 액션 버튼 렌더링, 클릭 시 onClose 함께 호출
- [ ] Snackbar: showCloseButton=true(기본)일 때 X 버튼으로 수동 닫기 가능
- [ ] 4가지 type 모두 아이콘 + 색상 올바르게 렌더링
- [ ] 진입/퇴장 CSS 애니메이션 적용 (200ms)
- [ ] `createPortal`로 `document.body`에 마운트 — z-index 최상단
- [ ] 여러 개 동시 표시 시 세로 방향으로 stack (gap-2)
- [ ] ToastProvider + useToast 훅으로 명령형 호출 가능
- [ ] `/feedback` 미리보기 페이지에서 버튼 클릭으로 각 type 시연 가능
- [ ] 시맨틱 토큰 전용 — 하드코딩 색상 없음

### Affected Files

| 파일 | 작업 | 이유 |
|------|------|------|
| `src/components/Feedback/types.ts` | 생성 | FeedbackType, ToastProps, SnackbarProps, ToastItem, ToastContextValue 타입 정의 |
| `src/components/Feedback/Toast.tsx` | 생성 | Toast 컴포넌트 (controlled, single) |
| `src/components/Feedback/Snackbar.tsx` | 생성 | Snackbar 컴포넌트 (controlled, single) |
| `src/components/Feedback/ToastProvider.tsx` | 생성 | ToastProvider + useToast 훅 (명령형 API) |
| `src/components/Feedback/FeedbackIcon.tsx` | 생성 | type별 SVG 아이콘 내부 컴포넌트 |
| `src/components/Feedback/index.ts` | 생성 | 공개 API 재내보내기 |
| `src/app/feedback/page.tsx` | 생성 | 미리보기 페이지 (`/feedback`) — 'use client' |
| `.claude/doc/design-system.md` | 수정 | Core Widgets 표에 Toast, Snackbar, ToastProvider, useToast 추가 |

### Implementation Steps

1. `src/components/Feedback/types.ts` 생성
2. `FeedbackIcon.tsx` — type을 받아 SVG 아이콘을 반환하는 내부 컴포넌트
3. `Toast.tsx` 구현
   - `'use client'` 지시자
   - `useEffect`로 duration 타이머 관리 (open 변경 시 초기화)
   - `createPortal(…, document.body)` — SSR 안전을 위해 `mounted` state guard
   - 퇴장 애니메이션: open=false 시 CSS class 전환 후 300ms 뒤 DOM unmount
4. `Snackbar.tsx` 구현 — Toast 구조 상속, action + showCloseButton 추가
5. `ToastProvider.tsx` 구현
   - `Context.Provider`로 `toast()`, `snackbar()`, `dismiss()` 함수 제공
   - 내부 `items` state 배열 관리, 각 item에 고유 id(`crypto.randomUUID()`)
   - Stack 렌더링: position별로 그룹화 후 portal에 렌더
6. `useToast` 훅 — `useContext(ToastContext)` 래퍼
7. `index.ts` 작성
8. `src/app/feedback/page.tsx` — 각 type/action/duration 시나리오 버튼 제공

### Reusable Components (design-system.md Core Widgets)

- `ActionButton` (`@/components/Button`) — Snackbar 액션 버튼 (TextButton variant 사용)
- `IconButton` (`@/components/Button`) — Snackbar 닫기 버튼

### Accessibility

- `role="alert"` (info/success/warning) 또는 `role="alertdialog"` (error) 사용
- `aria-live="polite"` (info/success) / `aria-live="assertive"` (warning/error)
- `aria-atomic="true"` — 메시지 전체를 스크린리더가 읽음
- 닫기 버튼: `aria-label="알림 닫기"`
- 액션 버튼: 명확한 텍스트 레이블 필수
- 키보드: `Escape`로 수동 닫기, 포커스 트랩 없음 (비모달)
- duration이 있어도 마우스 hover/포커스 시 타이머 일시정지 (WCAG 2.1 SC 2.2.2)

### Dependencies

추가 패키지 없음

---

## 3. Loading (Spinner / ProgressBar)

### Summary

로딩 상태를 표시하는 인디케이터 컴포넌트를 구현한다. 기존 `Button/Spinner.tsx`는 버튼 내부 전용으로 설계되어 있으므로, 독립형 `Loading/Spinner`를 별도 컴포넌트로 구현한다. ProgressBar는 `TopAppbar` 내부의 `ProgressBar`와는 별개로, 독립 사용 가능한 determinate/indeterminate 모드의 바형 인디케이터다.

### Figma Reference

- 파일: DS_2 (`9BojhdnvhQSi1wpWpLwPnH`)
- 페이지: Loading
- 참고: Loading 페이지 node-id는 figma-sync 에이전트 호출 전 Figma MCP로 조회 필요
- 참고 비교: TopAppbar ProgressBar — Node ID `690:6564` (구조만 참조, 독립 컴포넌트로 재구현)

### Component API

```typescript
// src/components/Loading/types.ts

// ── Spinner ───────────────────────────────────────────────

/** 독립형 Spinner 사이즈 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingSpinnerProps {
  /** 크기 (기본 md) */
  size?: SpinnerSize;
  /**
   * 스피너 색상
   * 'primary' | 'white' | 'current' (currentColor, 기본)
   */
  color?: 'primary' | 'white' | 'current';
  /** 전체 화면 오버레이 모드 */
  overlay?: boolean;
  /**
   * overlay=true일 때 딤 배경 표시 여부 (기본 true)
   */
  overlayDimmed?: boolean;
  /** 스크린리더용 레이블 (기본 "로딩 중") */
  label?: string;
  className?: string;
}

// ── ProgressBar ───────────────────────────────────────────

export type ProgressBarMode = 'determinate' | 'indeterminate';

/** ProgressBar 크기 (높이) */
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  /** 진행률 0–100 (determinate 모드) */
  value?: number;
  /** 모드 (기본 determinate) */
  mode?: ProgressBarMode;
  /** 높이 사이즈 (기본 md) */
  size?: ProgressBarSize;
  /** 색상 (기본 primary) */
  color?: 'primary' | 'positive' | 'caution' | 'negative';
  /** 트랙 색상 (기본 gray-200) */
  trackColor?: 'default' | 'transparent';
  /** 모서리 둥글기 (기본 full) */
  rounded?: boolean;
  /** 스크린리더용 레이블 */
  'aria-label'?: string;
  /** 레이블 참조 ID */
  'aria-labelledby'?: string;
  className?: string;
}
```

### Variants / States

#### Spinner 사이즈

| size | w × h |
|------|-------|
| xs | 16 × 16px |
| sm | 20 × 20px |
| md | 24 × 24px |
| lg | 32 × 32px |
| xl | 40 × 40px |

#### Spinner 색상

| color | CSS |
|-------|-----|
| primary | `text-primary-regular` |
| white | `text-white` |
| current | `currentColor` (기본, 부모 색상 상속) |

#### Spinner overlay 모드

| overlayDimmed | 배경 |
|---------------|------|
| true (기본) | `bg-[var(--dimmed-regular)]` 전체 화면 딤 + 중앙 스피너 |
| false | 투명 전체 화면 + 중앙 스피너 |

`overlay=true` 시 `createPortal`로 body에 렌더, `z-index: 9999`.

#### ProgressBar 사이즈 (높이)

| size | h |
|------|---|
| sm | 4px |
| md | 8px (기본) |
| lg | 12px |

#### ProgressBar 색상

| color | 토큰 |
|-------|------|
| primary | `--primary-regular` |
| positive | `--status-positive-regular` |
| caution | `--status-caution-regular` |
| negative | `--status-negative-regular` |

#### ProgressBar 모드

| mode | 동작 |
|------|------|
| determinate | `value` prop 0–100, 바 width = `value%` |
| indeterminate | CSS `@keyframes` 슬라이딩 애니메이션 (value 무시) |

### Acceptance Criteria

- [ ] LoadingSpinner: xs/sm/md/lg/xl 5가지 사이즈 모두 정확한 치수
- [ ] LoadingSpinner: color primary/white/current 3가지 색상 렌더링
- [ ] LoadingSpinner: `animate-spin` CSS 클래스로 무한 회전
- [ ] LoadingSpinner: overlay=true 시 `createPortal`로 body에 마운트, 전체 화면 커버
- [ ] LoadingSpinner: overlay=true + overlayDimmed=false 시 투명 배경
- [ ] ProgressBar: determinate 모드 — value=0~100 대응, width 비례 렌더링
- [ ] ProgressBar: indeterminate 모드 — CSS 애니메이션 무한 실행, value prop 무시
- [ ] ProgressBar: sm/md/lg 높이 정확히 4/8/12px
- [ ] ProgressBar: primary/positive/caution/negative 4가지 색상 토큰 적용
- [ ] ProgressBar: value=0 시 바 보이지 않음, value=100 시 전체 채움
- [ ] Button/Spinner.tsx와 Loading/Spinner.tsx는 별개 파일 유지 (Button 내부용은 그대로)
- [ ] `/loading` 미리보기 페이지에서 모든 variant 확인 가능
- [ ] 시맨틱 토큰 전용 — 하드코딩 색상 없음

### Affected Files

| 파일 | 작업 | 이유 |
|------|------|------|
| `src/components/Loading/types.ts` | 생성 | LoadingSpinnerProps, ProgressBarProps 타입 정의 |
| `src/components/Loading/Spinner.tsx` | 생성 | 독립형 Spinner 컴포넌트 (overlay 모드 포함) |
| `src/components/Loading/ProgressBar.tsx` | 생성 | 독립형 ProgressBar (determinate/indeterminate) |
| `src/components/Loading/index.ts` | 생성 | 공개 API 재내보내기 |
| `src/app/loading/page.tsx` | 생성 | 미리보기 페이지 (`/loading`) |
| `src/app/globals.css` | 수정 | indeterminate ProgressBar용 `@keyframes loading-slide` 애니메이션 추가 |
| `.claude/doc/design-system.md` | 수정 | Core Widgets 표에 LoadingSpinner, ProgressBar (Loading) 추가 |
| `src/components/Button/Spinner.tsx` | 변경 없음 | 버튼 내부 전용 유지 — 충돌 없음 |

> 주의: `src/app/loading/page.tsx`는 Next.js App Router의 로딩 UI 컨벤션(`loading.tsx`)이 아닌 일반 라우트 페이지다. 파일명을 `page.tsx`로 유지해야 `/loading` 경로로 접근 가능하다.

### Implementation Steps

1. `src/components/Loading/types.ts` 생성
2. `Spinner.tsx` 구현
   - `'use client'`는 overlay 모드에서만 필요 → `'use client'` 선언
   - 기본 모드: `<svg className="animate-spin …">` — Button/Spinner와 동일한 SVG 구조이나 sizeClasses 확장
   - overlay 모드: `mounted` state guard + `createPortal`
   - `aria-label` + `role="status"` 처리
3. `ProgressBar.tsx` 구현
   - Server Component 가능 (상태 없음)
   - determinate: `style={{ width: \`${value}%\` }}` + `transition-[width] duration-300 ease-out`
   - indeterminate: `animate-loading-slide` CSS 클래스 사용
4. `src/app/globals.css` 수정 — `@keyframes loading-slide` 추가
   ```css
   @keyframes loading-slide {
     0% { transform: translateX(-100%); }
     100% { transform: translateX(400%); }
   }
   ```
   Tailwind `@theme inline`에 `--animate-loading-slide` 등록
5. `index.ts` 작성 — `LoadingSpinner`, `ProgressBar` export (이름 충돌 방지 위해 `Spinner`가 아닌 `LoadingSpinner`로 export)
6. `src/app/loading/page.tsx` — 'use client', Spinner 사이즈/색상/overlay 토글 버튼, ProgressBar determinate 슬라이더 포함

### Reusable Components (design-system.md Core Widgets)

- `ProgressBar` (`@/components/TopAppbar`) — 구조 참고만, 재사용 불가 (TopAppbar 내부 전용)
- `Button/Spinner` — 참고만, 재사용 불가 (ButtonSize 타입에 종속)

### Accessibility

- LoadingSpinner:
  - `role="status"` + `aria-label={label}` (기본값 "로딩 중")
  - SVG에 `aria-hidden="true"` — 의미는 role="status"에서 전달
  - overlay 모드: `aria-live="polite"` 컨테이너로 감싸 스크린리더에 상태 전달
- ProgressBar:
  - `role="progressbar"`
  - determinate: `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={100}`
  - indeterminate: `aria-valuenow` 생략 (ARIA 스펙 준수)
  - `aria-label` 또는 `aria-labelledby` 중 하나 필수

### Dependencies

추가 패키지 없음

---

## 공통 구현 규칙

### 파일 구조 패턴

```
src/components/
├── Controls/
│   ├── types.ts
│   ├── Checkbox.tsx       ('use client')
│   ├── Radio.tsx          ('use client')
│   ├── RadioGroup.tsx     ('use client')
│   ├── Toggle.tsx         ('use client')
│   └── index.ts
├── Feedback/
│   ├── types.ts
│   ├── FeedbackIcon.tsx   (Server Component)
│   ├── Toast.tsx          ('use client')
│   ├── Snackbar.tsx       ('use client')
│   ├── ToastProvider.tsx  ('use client')
│   └── index.ts
└── Loading/
    ├── types.ts
    ├── Spinner.tsx        ('use client')
    ├── ProgressBar.tsx    (Server Component)
    └── index.ts

src/app/
├── controls/page.tsx      (Server Component — 정적 시연)
├── feedback/page.tsx      ('use client' — 버튼 인터랙션 필요)
└── loading/page.tsx       ('use client' — 오버레이 토글 필요)
```

### 코딩 규칙

- 2칸 들여쓰기
- 파일당 ~300줄 권장
- Props 인터페이스 `export interface` 명시
- 색상 하드코딩 금지 — 시맨틱 토큰만 사용
- `tailwind.config.ts` 생성 금지
- `'use client'` 최소화 — 인터랙션이 필요한 컴포넌트에만 선언

### design-system.md Core Widgets 업데이트 항목

완료 후 아래 항목을 Core Widgets 표에 추가한다:

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| Checkbox | `@/components/Controls` | 다중 선택 체크박스 | checked, indeterminate, disabled, label, labelPlacement, onChange |
| Radio | `@/components/Controls` | 단일 선택 라디오 버튼 | radioValue, value, disabled, label, labelPlacement, onChange |
| RadioGroup | `@/components/Controls` | Radio 그룹 컨테이너 | name, value, onChange, orientation, disabled |
| Toggle | `@/components/Controls` | on/off 스위치 | checked, size, disabled, label, onChange |
| Toast | `@/components/Feedback` | 단순 알림 메시지 | open, onClose, message, type, duration, position |
| Snackbar | `@/components/Feedback` | 액션 포함 알림 | open, onClose, message, type, action, showCloseButton, duration |
| ToastProvider | `@/components/Feedback` | 명령형 알림 컨텍스트 | (Context Provider, children) |
| useToast | `@/components/Feedback` | 명령형 Toast/Snackbar 호출 훅 | returns { toast, snackbar, dismiss } |
| LoadingSpinner | `@/components/Loading` | 원형 로딩 인디케이터 (독립형) | size, color, overlay, overlayDimmed, label |
| ProgressBar (Loading) | `@/components/Loading` | 선형 진행 바 (독립형) | value, mode, size, color, trackColor, rounded |
