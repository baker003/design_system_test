# InputField 컴포넌트 명세

## Summary

SOCAR DS_2 디자인 시스템의 InputField 컴포넌트를 구현합니다. 모바일/웹 폼에서 사용되는 텍스트 입력 필드로, 상태(default, focused, filled, error, disabled)와 서브 요소(label, placeholder, helper text, error message, leading/trailing icon, clear button)를 지원합니다.

기존 Button, Tag 컴포넌트와 동일한 파일 구조 패턴(`types.ts` + 컴포넌트 파일 + `index.ts`)을 따릅니다.

---

## Figma Reference

- 파일: DS_2 — https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/
- 페이지: "input" (현재 빈 페이지 — 신규 구축 대상)
- 참조 노드: Button(698:35982), Spacing(3833:34403), Corner Radius(3833:34404)

---

## Component API

### Types

```typescript
// InputField 크기
type InputSize = 'lg' | 'md' | 'sm';

// InputField 상태 (시각적 상태, 내부 state로 관리)
type InputState = 'default' | 'focused' | 'filled' | 'error' | 'disabled';

// InputField variant (스타일 계열)
type InputVariant = 'outline' | 'fill';
```

### Props Interface

```typescript
interface InputFieldProps {
  // --- 핵심 ---
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  // --- 레이아웃 / 스타일 ---
  size?: InputSize;           // 기본값: 'md'
  variant?: InputVariant;     // 기본값: 'outline'
  fullWidth?: boolean;        // 기본값: false — true 시 width: 100%

  // --- 상태 ---
  disabled?: boolean;         // 기본값: false
  error?: boolean;            // 기본값: false — true 시 error 상태 강제 진입
  readOnly?: boolean;         // 기본값: false

  // --- 서브 요소 텍스트 ---
  label?: string;             // 입력 필드 위 라벨 (선택)
  placeholder?: string;       // 플레이스홀더 텍스트
  helperText?: string;        // 필드 아래 보조 안내 텍스트 (선택)
  errorMessage?: string;      // error 상태일 때 표시할 메시지 (선택)
  maxLength?: number;         // 최대 입력 길이 (characterCount 표시 조건)
  showCharCount?: boolean;    // 글자 수 카운터 표시 여부 (maxLength와 함께 사용)

  // --- 아이콘 / 액션 ---
  leadingIcon?: ReactNode;    // 입력 영역 왼쪽 아이콘 (선택)
  trailingIcon?: ReactNode;   // 입력 영역 오른쪽 아이콘 (선택, clearable과 동시 사용 불가)
  clearable?: boolean;        // 기본값: false — 입력값 있을 때 X 버튼 표시

  // --- HTML 표준 ---
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

  // --- 기타 ---
  className?: string;         // 최외곽 wrapper에 적용
  inputClassName?: string;    // input 엘리먼트에 직접 적용
  'aria-label'?: string;      // label 없는 경우 접근성용 필수
  'aria-describedby'?: string;
}
```

---

## Variants & States

### Variant

| Variant | 설명 | 배경 | 테두리 |
|---------|------|------|--------|
| `outline` | 기본 outlined 스타일 | `bg-surface` (#FFFFFF) | `border-border` (gray-200) |
| `fill` | 배경 채워진 스타일 | `bg-background` (gray-100) | 없음 |

### States

| State | 트리거 조건 | 테두리/배경 변화 | 텍스트 색상 |
|-------|------------|-----------------|-------------|
| `default` | 초기 상태 (value 없음, focus 없음) | outline: `border-border` / fill: 없음 | placeholder: `text-text-disabled` |
| `focused` | `onFocus` 발생 시 | outline: `border-primary-regular` (2px) / fill: `border-primary-regular` (2px, 하단) | 입력 텍스트: `text-text-primary` |
| `filled` | value 있고 blur 상태 | outline: `border-border` / fill: 없음 | 입력 텍스트: `text-text-primary` |
| `error` | `error={true}` 또는 유효성 실패 | `border-status-negative` (모든 variant 동일) | 입력 텍스트: `text-text-primary`, errorMessage: `text-status-negative` |
| `disabled` | `disabled={true}` | `border-border` + `opacity-40` | `text-text-disabled`, `cursor-not-allowed` |

---

## Size Specs

DS_2 Spacing/Corner Radius 토큰 기반.

| Size | 높이 | 수평 패딩 | 수직 패딩 | 라운드 | 입력 타이포 | 라벨 타이포 | 헬퍼 타이포 |
|------|------|----------|----------|--------|------------|------------|------------|
| `lg` | 56px (`h-14`) | 16px (`px-4`) | 16px | `rounded-[14px]` | `typo-body1` (16px/24px) | `typo-label1` (14px/20px) | `typo-caption1` (12px/16px) |
| `md` | 46px (`h-[46px]`) | 14px (`px-[14px]`) | 12px | `rounded-xl` (12px) | `typo-body2` (15px/22px) | `typo-label1` (14px/20px) | `typo-caption1` (12px/16px) |
| `sm` | 38px (`h-[38px]`) | 12px (`px-3`) | 8px | `rounded-lg` (8px) | `typo-label1` (14px/20px) | `typo-label2` (13px/18px) | `typo-caption2` (11px/14px) |

### 아이콘 사이즈 (line-height 기준)

| Size | 입력 line-height | 아이콘 사이즈 |
|------|----------------|--------------|
| `lg` | 24px | 20px (`w-5 h-5`) |
| `md` | 22px | 20px (`w-5 h-5`) |
| `sm` | 20px | 16px (`w-4 h-4`) |

---

## Sub-elements

### Label
- 필드 위 텍스트 라벨
- 색상: `text-text-primary` (일반), `text-text-disabled` (disabled)
- font-weight: `font-medium`
- 타이포: `size` 별 라벨 타이포 (위 사이즈 테이블 참조)
- `for` 속성으로 input `id`와 연결 (접근성)

### Placeholder
- input native placeholder 사용
- 색상: `text-text-disabled` (gray-500)
- 스타일: `placeholder:text-text-disabled`

### Helper Text
- 필드 아래 보조 안내 텍스트
- `error={false}` 상태에서만 표시
- 색상: `text-text-tertiary`
- 타이포: `size` 별 헬퍼 타이포 (위 사이즈 테이블 참조)
- font-weight: `font-normal`

### Error Message
- `error={true}` 시 helperText 대신 표시
- 색상: `text-status-negative`
- 앞에 경고 아이콘 16px 표시 (선택 사항)
- 타이포: helperText와 동일

### Character Count
- `showCharCount={true}` + `maxLength` 있을 때 표시
- 위치: helper text 행 오른쪽 끝 정렬
- 포맷: `{현재글자수}/{maxLength}`
- 색상: `text-text-tertiary` (일반), `text-status-negative` (초과 시)

### Leading Icon
- 입력 영역 왼쪽
- 색상: `text-text-tertiary` (default/filled), `text-primary-regular` (focused), `text-text-disabled` (disabled)
- 입력 텍스트와 수직 center 정렬

### Trailing Icon / Clear Button
- `clearable={true}`: value 있을 때 X 아이콘 버튼 표시 (클릭 시 value 초기화)
- `trailingIcon`: 커스텀 트레일링 아이콘 (clearable과 동시 사용 불가 — trailingIcon 우선)
- 색상: `text-text-tertiary`
- 클리어 버튼: `aria-label="입력 내용 지우기"` 필수

---

## Design Token Mapping

| 요소 | 상태 | Token (CSS 변수) | Tailwind 클래스 |
|------|------|----------------|----------------|
| 입력 배경 (outline) | all | `--bg-secondary` → #FFFFFF | `bg-surface` |
| 입력 배경 (fill) | all | `--gray-100` | `bg-background` |
| 테두리 (default) | default/filled | `--border-regular` | `border-border` |
| 테두리 (focused) | focused | `--primary-regular` | `border-primary-regular` |
| 테두리 (error) | error | `--status-negative-regular` | `border-status-negative` |
| 입력 텍스트 | default→filled | `--text-primary` | `text-text-primary` |
| 플레이스홀더 | default | `--text-disabled` | `text-text-disabled` |
| 라벨 텍스트 | all | `--text-primary` | `text-text-primary` |
| 라벨 텍스트 | disabled | `--text-disabled` | `text-text-disabled` |
| 헬퍼 텍스트 | default | `--text-tertiary` | `text-text-tertiary` |
| 에러 메시지 | error | `--status-negative-regular` | `text-status-negative` |
| 아이콘 (기본) | default/filled | `--text-tertiary` | `text-text-tertiary` |
| 아이콘 (focused) | focused | `--primary-regular` | `text-primary-regular` |
| 아이콘 (disabled) | disabled | `--text-disabled` | `text-text-disabled` |
| 전체 opacity | disabled | — | `opacity-40` |

---

## File Structure

```
src/components/Input/
├── index.ts             -- public export
├── types.ts             -- InputSize, InputVariant, InputState, InputFieldProps
└── InputField.tsx       -- 메인 컴포넌트 ('use client' 필요)
```

### index.ts 내용 (예상)
```typescript
export { InputField } from './InputField';
export type { InputFieldProps, InputSize, InputVariant, InputState } from './types';
```

---

## Acceptance Criteria

1. `size` prop (`lg` / `md` / `sm`) 에 따라 높이, 패딩, 타이포, 아이콘 사이즈가 사이즈 스펙 테이블과 일치한다.
2. `variant` prop (`outline` / `fill`) 에 따라 배경과 테두리 스타일이 올바르게 적용된다.
3. 포커스 시 테두리가 `border-primary-regular` 2px로 변경된다.
4. `error={true}` 시 테두리가 `border-status-negative`로 변경되고 `errorMessage`가 표시된다.
5. `disabled={true}` 시 `opacity-40` 적용, 클릭/포커스 불가, `cursor-not-allowed`.
6. `label` prop 전달 시 `<label>` 엘리먼트가 렌더링되고 `htmlFor`로 input과 연결된다.
7. `clearable={true}` 이고 value가 있을 때 X 버튼이 렌더링되며, 클릭 시 value가 빈 문자열로 초기화된다.
8. `leadingIcon` / `trailingIcon` 이 각각 input 좌우에 렌더링되고 size에 맞는 아이콘 사이즈가 적용된다.
9. `helperText`와 `errorMessage`가 동시에 전달될 때, `error={true}` 이면 `errorMessage`만 표시된다.
10. `showCharCount={true}` + `maxLength` 조합에서 글자 수 카운터가 올바르게 표시된다.
11. 색상 하드코딩 없이 시맨틱 토큰(Tailwind 클래스)만 사용한다.
12. TypeScript strict 모드에서 타입 에러 없이 빌드된다 (`npm run build` 통과).
13. `label` 없는 경우 `aria-label` prop이 input에 적용된다.

---

## Implementation Steps

1. `src/components/Input/types.ts` 생성 — `InputSize`, `InputVariant`, `InputState`, `InputFieldProps` 정의
2. `src/components/Input/InputField.tsx` 생성
   - `'use client'` 선언 (useState, useId 사용)
   - `useId()`로 input id 자동 생성 (id prop 없는 경우)
   - `useState<boolean>(false)` — focused 상태 관리
   - size별 클래스 매핑 객체 정의 (sizeClasses, labelSizeClasses, helperSizeClasses, iconSizeClasses)
   - variant별 클래스 매핑 객체 정의
   - state 조합 계산 함수 (`getInputBorderClass`)
   - JSX 구조: wrapper div → label → input row (leadingIcon + input + trailingIcon/clearButton) → footer row (helperText/errorMessage + charCount)
3. `src/components/Input/index.ts` 생성 — export 정의
4. `src/app/globals.css` 확인 — 필요한 토큰이 이미 등록되어 있는지 검증 (추가 토큰 불필요 예상)
5. design-system.md의 Core Widgets 테이블에 `InputField` 항목 추가

---

## Reusable Components (design-system.md Core Widgets)

현재 Core Widgets 중 InputField 내부에서 직접 재사용할 수 있는 것:
- **없음** — 아이콘은 `leadingIcon` / `trailingIcon` prop으로 외부에서 주입받는 방식 사용 (Icons 폴더의 SVG 컴포넌트를 사용처에서 전달)
- Clear 버튼(X)은 InputField 내부에서 자체 렌더링

---

## Accessibility

| 항목 | 요구사항 |
|------|---------|
| label 연결 | `<label htmlFor={inputId}>` — input의 `id`와 일치시켜 스크린 리더 연결 |
| label 없는 경우 | `aria-label` prop 필수 (TypeScript: label 없으면 aria-label 필수로 유도) |
| error 상태 | `aria-invalid="true"` input에 적용 |
| error message 연결 | `aria-describedby={errorId}` — errorMessage 영역의 id와 연결 |
| helper text 연결 | `aria-describedby={helperId}` — helperText 영역의 id와 연결 |
| clear 버튼 | `aria-label="입력 내용 지우기"` 명시 |
| disabled 상태 | `disabled` attribute (네이티브 속성) 사용 |
| 포커스 ring | `focus-visible:ring-2 focus-visible:ring-primary-regular` — 키보드 포커스 표시 |
| 색상 대비 | `text-text-primary` (#354153) on white: 10.33:1 (WCAG AA PASS) |
| 색상 대비 | `text-status-negative` (#F51441) on white: 4.63:1 (WCAG AA PASS) |
| 색상 대비 | placeholder `text-text-disabled` (#99A1B1): 2.60:1 — WCAG 비활성 요소 예외 적용 |

---

## Dependencies

신규 패키지 불필요. 기존 스택으로 구현 가능:
- `clsx` — 이미 프로젝트에 설치됨 (Button, Tag에서 사용 중)
- `react` — `useState`, `useId`, `forwardRef` 사용
- Tailwind v4 (`globals.css` 기반) — 추가 토큰 등록 불필요

---

## Notes

- `forwardRef` 사용 — input 엘리먼트로 ref 전달 지원 (폼 라이브러리 연동 대비)
- `'use client'` 선언 필수 — useState, 이벤트 핸들러 사용
- clearable + trailingIcon 동시 전달 시: trailingIcon 우선 적용, clearable 무시 (내부 처리)
- fill variant의 focused 상태: 하단 보더만 2px 표시하는 패턴 대신, 전체 테두리 2px 표시로 통일 (접근성 및 구현 일관성)
- `tailwind.config.ts` 생성 금지 — 모든 토큰은 `globals.css` `@theme inline`에 이미 등록됨
