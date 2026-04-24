# InputField 컴포넌트 설계

## 1. Props 테이블

| Prop | Type | Default | 비고 |
|------|------|---------|------|
| `value` | `string` | — | controlled 모드 |
| `defaultValue` | `string` | — | uncontrolled 모드 |
| `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | — | |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` | — | |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` | — | |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | |
| `variant` | `'outline' \| 'fill'` | `'outline'` | |
| `fullWidth` | `boolean` | `false` | wrapper에 `w-full` |
| `disabled` | `boolean` | `false` | |
| `error` | `boolean` | `false` | |
| `readOnly` | `boolean` | `false` | |
| `label` | `string` | — | |
| `placeholder` | `string` | — | |
| `helperText` | `string` | — | |
| `errorMessage` | `string` | — | error=true 시 helperText 대체 |
| `maxLength` | `number` | — | |
| `showCharCount` | `boolean` | `false` | maxLength와 함께 사용 |
| `leadingIcon` | `ReactNode` | — | |
| `trailingIcon` | `ReactNode` | — | clearable과 동시 사용 불가, trailingIcon 우선 |
| `clearable` | `boolean` | `false` | value 있을 때 X 버튼 표시 |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'search' \| 'url'` | `'text'` | |
| `name` | `string` | — | |
| `id` | `string` | — | 미전달 시 useId() 자동 생성 |
| `autoComplete` | `string` | — | |
| `autoFocus` | `boolean` | — | |
| `inputMode` | `React.HTMLAttributes<HTMLInputElement>['inputMode']` | — | |
| `className` | `string` | — | 최외곽 wrapper 적용 |
| `inputClassName` | `string` | — | input 엘리먼트 직접 적용 |
| `aria-label` | `string` | — | label 없는 경우 필수 |
| `aria-describedby` | `string` | — | |
| `ref` | `React.Ref<HTMLInputElement>` | — | forwardRef로 input 전달 |

---

## 2. 사이즈별 토큰 매핑표

| Size | height | px (수평 패딩) | rounded | 입력 타이포 | 라벨 타이포 | 헬퍼/에러 타이포 | 아이콘 사이즈 |
|------|--------|--------------|---------|------------|------------|----------------|-------------|
| `lg` | `h-14` (56px) | `px-4` (16px) | `rounded-[14px]` | `typo-body1` | `typo-label1` | `typo-caption1` | `w-5 h-5` (20px) |
| `md` | `h-[46px]` | `px-[14px]` (14px) | `rounded-xl` (12px) | `typo-body2` | `typo-label1` | `typo-caption1` | `w-5 h-5` (20px) |
| `sm` | `h-[38px]` | `px-3` (12px) | `rounded-lg` (8px) | `typo-label1` | `typo-label2` | `typo-caption2` | `w-4 h-4` (16px) |

> 아이콘 사이즈 근거 — design-system.md §5 텍스트 line-height 기준:
> - lg: body1 line-height 24px → 20px ~ 26px 구간 → 20px
> - md: body2 line-height 22px → 20px ~ 26px 구간 → 20px
> - sm: label1 line-height 20px → ~20px 이하 → 16px

---

## 3. 상태별 스타일 매핑

### outline variant

| State | border | background | ring |
|-------|--------|------------|------|
| `default` | `border border-border` (1px, gray-200) | `bg-surface` (white) | — |
| `focused` | `border-2 border-primary-regular` | `bg-surface` | `focus-visible:ring-2 focus-visible:ring-primary-regular` |
| `filled` | `border border-border` | `bg-surface` | — |
| `error` | `border border-status-negative` | `bg-surface` | — |
| `disabled` | `border border-border opacity-40` | `bg-surface` | — |
| `readOnly` | `border border-border` | `bg-surface` | — |

### fill variant

| State | border | background | ring |
|-------|--------|------------|------|
| `default` | — | `bg-background` (gray-100) | — |
| `focused` | `border-2 border-primary-regular` | `bg-background` | `focus-visible:ring-2 focus-visible:ring-primary-regular` |
| `filled` | — | `bg-background` | — |
| `error` | `border border-status-negative` | `bg-background` | — |
| `disabled` | `opacity-40` | `bg-background` | — |
| `readOnly` | — | `bg-background` | — |

### 텍스트/플레이스홀더 색상 (variant 무관)

| State | 입력 텍스트 | 플레이스홀더 |
|-------|-----------|------------|
| `default` | `text-text-primary` | `placeholder:text-text-disabled` |
| `focused` | `text-text-primary` | `placeholder:text-text-disabled` |
| `filled` | `text-text-primary` | — |
| `error` | `text-text-primary` | `placeholder:text-text-disabled` |
| `disabled` | `text-text-disabled cursor-not-allowed` | `placeholder:text-text-disabled` |
| `readOnly` | `text-text-primary` | — |

> focused 상태는 내부 `isFocused` state(useState)로 관리. error prop은 외부에서 주입.
> disabled는 wrapper 전체에 `opacity-40` 적용 (input 네이티브 disabled + wrapper opacity 중첩 없도록 input에는 opacity 미적용).

---

## 4. 서브 요소 스타일

### Label

| 속성 | 값 |
|------|-----|
| 엘리먼트 | `<label htmlFor={inputId}>` |
| 타이포 | size별 라벨 타이포 (위 매핑표 참조) |
| font-weight | `font-medium` |
| 색상 (기본) | `text-text-primary` |
| 색상 (disabled) | `text-text-disabled` |
| margin-bottom | `mb-1` (4px) |

### Helper Text

| 속성 | 값 |
|------|-----|
| 표시 조건 | `error={false}` AND `helperText` 존재 |
| 타이포 | size별 헬퍼 타이포 |
| font-weight | `font-normal` |
| 색상 | `text-text-tertiary` |
| margin-top | `mt-1` (4px) |
| id | `{inputId}-helper` (aria-describedby 연결) |

### Error Message

| 속성 | 값 |
|------|-----|
| 표시 조건 | `error={true}` AND `errorMessage` 존재 |
| 타이포 | size별 헬퍼 타이포 (helperText와 동일) |
| font-weight | `font-normal` |
| 색상 | `text-status-negative` |
| 경고 아이콘 | 16px, `text-status-negative`, `flex-shrink-0` |
| 레이아웃 | `flex items-center gap-1` |
| margin-top | `mt-1` (4px) |
| id | `{inputId}-error` (aria-describedby 연결) |

### Character Count

| 속성 | 값 |
|------|-----|
| 표시 조건 | `showCharCount={true}` AND `maxLength` 존재 |
| 위치 | footer row 오른쪽 끝 (`ml-auto`) |
| 포맷 | `{currentLength}/{maxLength}` |
| 타이포 | size별 헬퍼 타이포 |
| 색상 (정상) | `text-text-tertiary` |
| 색상 (초과) | `text-status-negative` |

### Leading Icon

| 속성 | 값 |
|------|-----|
| 위치 | input row 안, 입력 좌측 (`mr-2`) |
| 사이즈 | size별 아이콘 사이즈 클래스 (`w-5 h-5` / `w-4 h-4`) |
| 색상 (default/filled) | `text-text-tertiary` |
| 색상 (focused) | `text-primary-regular` |
| 색상 (disabled) | `text-text-disabled` |
| 색상 (error) | `text-status-negative` |
| 정렬 | `flex-shrink-0 flex items-center` |

### Trailing Icon / Clear Button

| 속성 | 값 |
|------|-----|
| trailingIcon 위치 | input row 안, 입력 우측 (`ml-2`) |
| clearable X 버튼 | `value` 존재 시만 렌더, `button type="button"` |
| clearable 색상 | `text-text-tertiary` |
| clearable aria-label | `"입력 내용 지우기"` |
| 우선순위 | `trailingIcon` 존재 시 `clearable` 무시 |
| 사이즈 | size별 아이콘 사이즈 클래스 |
| 정렬 | `flex-shrink-0 flex items-center` |

---

## 5. Component Tree

```
<div>                          ← wrapper (className, fullWidth → w-full)
  │
  ├── <label>                  ← label prop 존재 시만 렌더
  │     htmlFor={inputId}
  │     className: size별 라벨 타이포 + font-medium + text-text-primary (disabled: text-text-disabled)
  │
  ├── <div>                    ← input-row (border/bg/rounded/opacity 적용 주체)
  │     className: flex items-center
  │                + variant별 bg (bg-surface / bg-background)
  │                + size별 rounded + size별 px
  │                + state별 border (border-border / border-2 border-primary-regular / border-status-negative)
  │                + disabled → opacity-40
  │
  │   ├── <span>               ← leadingIcon wrapper (leadingIcon prop 존재 시만)
  │   │     className: flex-shrink-0 flex items-center mr-2 + size별 아이콘 클래스 + 상태별 색상
  │   │     {leadingIcon}
  │   │
  │   ├── <input>              ← ref 전달 대상 (forwardRef)
  │   │     id={inputId}
  │   │     className: flex-1 min-w-0 bg-transparent outline-none
  │   │                + size별 타이포 + text-text-primary
  │   │                + placeholder:text-text-disabled
  │   │                + disabled → cursor-not-allowed
  │   │                + inputClassName (override)
  │   │     aria-invalid={error}
  │   │     aria-describedby: error ? errorId : (helperText ? helperId : aria-describedby prop)
  │   │     disabled, readOnly, type, ...rest
  │   │
  │   └── <span>               ← trailingIcon or clearButton wrapper (조건부 렌더)
  │         className: flex-shrink-0 flex items-center ml-2 + size별 아이콘 클래스
  │         trailingIcon 있으면 → {trailingIcon}
  │         clearable + value 있으면 → <button aria-label="입력 내용 지우기"> X아이콘 </button>
  │
  └── <div>                    ← footer-row (helperText/errorMessage + charCount)
        className: flex items-start justify-between mt-1
        (helperText도 없고 errorMessage도 없고 showCharCount도 false면 렌더 자체 생략)
        │
        ├── <p id={helperId}>  ← helperText (error=false, helperText 존재 시)
        │     className: size별 헬퍼 타이포 + font-normal + text-text-tertiary
        │
        ├── <p id={errorId}>   ← errorMessage (error=true, errorMessage 존재 시)
        │     role="alert"
        │     className: flex items-center gap-1 + size별 헬퍼 타이포 + font-normal + text-status-negative
        │     <span> 경고아이콘(16px) </span> {errorMessage}
        │
        └── <span>             ← charCount (showCharCount=true, maxLength 존재 시)
              className: ml-auto + size별 헬퍼 타이포 + (초과: text-status-negative / 정상: text-text-tertiary)
              {currentLength}/{maxLength}
```

---

## 6. 구현 가이드

### 파일 구조

```
src/components/Input/
├── index.ts
├── types.ts
└── InputField.tsx
```

### clsx 조합 전략

#### input-row 클래스 조합

| 조건 | 추가 클래스 |
|------|------------|
| variant === 'outline' | `bg-surface border` |
| variant === 'fill' | `bg-background` |
| !error && !isFocused | `border-border` (outline만) |
| isFocused | `border-2 border-primary-regular` |
| error | `border border-status-negative` |
| disabled | `opacity-40` |

> border-2는 focused 전용. default/filled는 border(1px) 유지. error는 border(1px) + status-negative.

#### leadingIcon 색상 조합

| 조건 | 클래스 |
|------|--------|
| disabled | `text-text-disabled` |
| error | `text-status-negative` |
| isFocused | `text-primary-regular` |
| default/filled | `text-text-tertiary` |

### forwardRef 패턴

```typescript
// ActionButton과 달리 input은 ref 전달이 필수 (폼 라이브러리 연동)
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(props, ref) {
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    const [isFocused, setIsFocused] = useState(false);
    const currentLength = (props.value ?? '').length;
    // ...
  }
);
InputField.displayName = 'InputField';
export { InputField };
```

### aria-describedby 조합

| 상황 | aria-describedby |
|------|-----------------|
| error=true + errorMessage 있음 | `{inputId}-error` |
| error=false + helperText 있음 | `{inputId}-helper` |
| 외부 aria-describedby prop | prop 값 그대로 사용 |

### 상호 배타 규칙

| 조합 | 처리 |
|------|------|
| `trailingIcon` + `clearable` | `trailingIcon` 렌더, `clearable` 무시 |
| `error=true` + `helperText` + `errorMessage` | `errorMessage`만 표시, `helperText` 숨김 |
| `showCharCount=true` + `maxLength` 없음 | charCount 미렌더 |

### 상태 우선순위 (내부 state 결정 시)

```
disabled > error > isFocused > filled(value 있음) > default
```
