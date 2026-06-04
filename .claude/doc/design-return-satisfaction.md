# ReturnSatisfaction / StarRatingInput Design Spec

---

## 1. StarRatingInput (신규 컴포넌트)

### Props 테이블

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `null` | 현재 선택된 별점 (1~5). null=미선택 |
| `onChange` | `(rating: number) => void` | (required) | 별점 선택 콜백 |
| `disabled` | `boolean` | `false` | 비활성화 여부. pointer-events:none, opacity 감소 |
| `error` | `boolean` | `false` | 미선택 제출 시도 에러 상태. 안내 문구 노출 |
| `aria-label` | `string` | `"서비스 만족도 별점 선택"` | 컨테이너 role="radiogroup" aria-label |

### Component Tree

```
<div role="radiogroup">                   ← 루트 컨테이너
│   aria-label={aria-label}
│   aria-required="true"
│   base: flex flex-col items-center gap-2
│
├─ <div>                                  ← 별 행
│   │   base: flex items-center gap-2
│   │   ── hover 상태는 'use client' hoverIndex state로 관리
│   │
│   ├─ <button> × 5 (index 1~5)          ← 개별 별 버튼
│   │   │   role="radio"
│   │   │   aria-checked={value === index}
│   │   │   aria-label="{index}점"
│   │   │   tabIndex: value===null ? (index===1 ? 0 : -1) :
│   │   │             (value===index ? 0 : -1)   ← roving tabindex
│   │   │
│   │   │   ── TOUCH TARGET ──
│   │   │   base: w-12 h-12 flex items-center justify-center
│   │   │         rounded-full
│   │   │         focus-visible:outline-none
│   │   │         focus-visible:ring-2
│   │   │         focus-visible:ring-primary-regular
│   │   │         focus-visible:ring-offset-1
│   │   │         transition-transform duration-100
│   │   │         active:scale-90
│   │   │         disabled:cursor-not-allowed
│   │   │
│   │   └─ {아이콘 조건부 렌더}           ← 48px 터치 타겟 내 40px 아이콘
│   │       ── idle (index > value && index > hoverIndex):
│   │          <Star size={40} color="var(--gray-300)" />
│   │       ── hover (index <= hoverIndex && value === null):
│   │          <StarFill size={40} color="var(--primary-regular)" />
│   │       ── selected (index <= value):
│   │          <StarFill size={40} color="var(--status-caution-regular)" />
│   │       ── disabled:
│   │          <Star size={40} color="var(--text-disabled)" />
│   │
└─ {error && value === null &&
    <p role="alert" aria-live="polite">}  ← 에러 안내 문구
        base: typo-caption1 font-normal
              text-status-negative
        content: "별점을 선택해 주세요."
```

### States 리스트

| State | 트리거 | 아이콘 | 색상 토큰 |
|-------|--------|--------|-----------|
| `idle` | 초기 / value=null | `<Star>` | `--gray-300` |
| `hover` | 마우스 진입 (value=null 시) | `<StarFill>` | `--primary-regular` (blue-500) |
| `selected` | value 1~5 설정 | `<StarFill>` | `--status-caution-regular` (orange-500) |
| `error` | error=true && value=null | `<Star>` + 안내 문구 | `--gray-300` + `--status-negative-regular` |
| `disabled` | disabled=true | `<Star>` | `--text-disabled` |

---

## 2. ReturnSatisfactionClient 레이아웃 설계

### Props 테이블 (ReturnSatisfactionClient)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `reservationId` | `string` | (required) | 반납 완료된 예약 ID |
| `vehicleName` | `string` | (required) | 차량명 (예: "아반떼 CN7 · 가나1234") |
| `usagePeriod` | `string` | (required) | 이용 기간 문자열 |
| `onComplete` | `() => void` | `undefined` | 제출 완료 후 이동 콜백 |
| `onSkip` | `() => void` | `undefined` | 건너뛰기 콜백 |

### Component Tree (ReturnSatisfactionClient)

```
<div>                                       ← 전체 레이아웃 루트 (use client)
│   base: relative flex flex-col
│         min-h-screen bg-surface
│
├─ <TopAppbar>                              ── [고정 영역] 상단 앱바
│   │   theme="light" sticky={true}
│   │   leading={<LeadingButton variant="close" onClick={onSkip} />}
│   │   trailing={undefined}
│   └─ instant={undefined}
│
├─ <div>                                    ── [스크롤 영역]
│   │   base: flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom,0px)+128px)]
│   │         px-5
│   │
│   ├─ [ConfirmationHeader 섹션]             ── 반납 완료 확인
│   │   │   base: flex flex-col items-center
│   │   │         pt-8 pb-6
│   │   │
│   │   ├─ <SuccessFill size={32}          ← 완료 아이콘
│   │   │    color="var(--status-positive-regular)" />
│   │   │
│   │   ├─ <h1>                            ← "반납이 완료됐어요!"
│   │   │       typo-title3 font-bold
│   │   │       text-text-strong
│   │   │       mt-3
│   │   │
│   │   └─ <p>                             ← 이용 일시 + 차량명
│   │           typo-body2 font-normal
│   │           text-text-secondary
│   │           mt-1 text-center
│   │
│   ├─ <div>                               ── [SatisfactionSection] 구분선
│   │   base: h-px bg-border-weak mx-[-20px]
│   │
│   ├─ [SatisfactionSection]               ── 별점 선택
│   │   │   base: pt-8 pb-6
│   │   │
│   │   ├─ <p>                             ← "이번 쏘카 어떠셨나요?"
│   │   │       typo-headline1 font-semibold
│   │   │       text-text-strong
│   │   │
│   │   ├─ {ratingError &&                 ← 에러 안내 문구
│   │   │   <p role="alert" aria-live="polite">}
│   │   │       typo-caption1 font-normal
│   │   │       text-status-negative
│   │   │       mt-1
│   │   │       content: "별점을 선택해 주세요."
│   │   │
│   │   ├─ <StarRatingInput>               ← 별점 입력 위젯
│   │   │       value={rating}
│   │   │       onChange={handleRatingChange}
│   │   │       error={ratingError}
│   │   │       className="mt-4"
│   │   │
│   │   └─ {rating !== null &&             ← 감정 레이블 (선택 후만 표시)
│   │       <p>}
│   │           typo-caption1 font-normal
│   │           text-text-tertiary
│   │           mt-2
│   │           transition-opacity duration-200
│   │           opacity-0 → opacity-100 (rating 설정 시)
│   │           content: RATING_LABELS[rating]
│   │
│   ├─ [QuickFeedbackSection]              ── 빠른 피드백 (조건부)
│   │   │   base: overflow-hidden
│   │   │         transition-all duration-300 ease-in-out
│   │   │         height: rating===null ? "0" : "auto"
│   │   │         opacity: rating===null ? 0 : 1
│   │   │
│   │   ├─ <p>                             ← 섹션 레이블
│   │   │       typo-body1 font-semibold
│   │   │       text-text-strong
│   │   │       mb-3
│   │   │       content: rating>=4 ? "어떤 점이 좋았나요?" : "어떤 점이 불편했나요?"
│   │   │
│   │   └─ <ChipGroup layout="multiline" gap={8}>
│   │           ── rating 4~5: POSITIVE_CHIPS (6개)
│   │           ── rating 1~3: NEGATIVE_CHIPS (7개)
│   │           각 Chip:
│   │             type="outlined"
│   │             size="md"
│   │             selected={selectedChips.includes(label)}
│   │             onClick={() => toggleChip(label)}
│   │
│   └─ [CommentSection]                    ── 추가 의견
│       │   base: pt-6 pb-4
│       │
│       ├─ <p>                             ← 섹션 레이블
│       │       typo-body1 font-semibold
│       │       text-text-strong
│       │       mb-2
│       │       content: "추가 의견 (선택)"
│       │
│       └─ <InputField>
│               size="lg"
│               variant="outline"
│               multiline={true}
│               rows={4}
│               placeholder="추가 의견을 입력해 주세요. (선택)"
│               maxLength={500}
│               showCharCount={true}
│               value={comment}
│               onChange={handleCommentChange}
│               fullWidth={true}
│
└─ <div>                                    ── [하단 고정 영역] BottomCTAArea
    │   base: fixed bottom-0 left-0 right-0
    │         bg-surface border-t border-border
    │         px-5 pt-4
    │         pb-[calc(env(safe-area-inset-bottom,0px)+16px)]
    │
    ├─ <ActionButton>                       ← "제출하기"
    │       variant="primary" size="lg"
    │       fullWidth={true}
    │       disabled={rating === null}
    │       loading={isSubmitting}
    │       onClick={handleSubmit}
    │
    └─ <TextButton>                         ← "건너뛰기"
            variant="secondary" size="16"
            className="w-full mt-3 mb-2"
            onClick={onSkip}
```

### States 리스트 (ReturnSatisfactionClient)

| State | 조건 | 변화 |
|-------|------|------|
| `idle` | 초기 진입 | 별점 미선택, ActionButton disabled, QuickFeedback 숨김, 감정 레이블 숨김 |
| `rating-selected` | rating 1~5 설정 | ActionButton 활성화, QuickFeedback 슬라이드다운, 감정 레이블 페이드인 |
| `chips-changed` | Chip 선택/해제 | selectedChips 토글 |
| `rating-changed` | 다른 별점 탭 | Chip 목록 교체 + selectedChips 초기화 |
| `validation-error` | rating=null 상태에서 제출 시도 | ratingError=true → 에러 문구 노출 + 별점 섹션으로 스크롤 |
| `submitting` | handleSubmit 실행 중 | isSubmitting=true → ActionButton loading=true |
| `submit-success` | API 200 | 완료 Toast + onComplete() 호출 |
| `submit-error` | API 4xx/5xx | 에러 Toast + isSubmitting=false, 화면 유지 |

---

## 3. 디자인 토큰 매핑

### 색상

| 요소 | Tailwind 클래스 | CSS 토큰 | 팔레트 값 |
|------|-----------------|----------|-----------|
| 페이지 배경 | `bg-surface` | `--color-surface` | #FFFFFF |
| 완료 아이콘 | `text-status-positive` | `--status-positive-regular` | green-500 #04CA81 |
| 섹션 타이틀 | `text-text-strong` | `--text-strong` | gray-1000 #141A24 |
| 보조 텍스트 (차량명, 이용기간) | `text-text-secondary` | `--text-secondary` | gray-600 #697383 |
| 감정 레이블 | `text-text-tertiary` | `--text-tertiary` | gray-500 #99A1B1 |
| 에러 문구 | `text-status-negative` | `--status-negative-regular` | red-500 #FF3A5B |
| 별 아이콘 (idle) | `color: var(--gray-300)` | `--gray-300` | #CBD1DC |
| 별 아이콘 (hover) | `color: var(--primary-regular)` | `--primary-regular` | blue-500 #0078FF |
| 별 아이콘 (selected) | `color: var(--status-caution-regular)` | `--status-caution-regular` | orange-500 #FF8800 |
| 별 아이콘 (disabled) | `color: var(--text-disabled)` | `--text-disabled` | gray-400 #B4BBCB |
| 하단 CTA 구분선 | `border-border` | `--border-regular` | gray-200 #E5E8EF |
| 섹션 구분선 | `bg-border-weak` | `--border-weak` | gray-100 #F2F3F8 |
| Focus ring | `ring-primary-regular` | `--primary-regular` | blue-500 #0078FF |

### 타이포그래피

| 요소 | 클래스 조합 |
|------|-------------|
| 반납 완료 타이틀 ("반납이 완료됐어요!") | `typo-title3 font-bold` |
| 차량명/이용기간 | `typo-body2 font-normal` |
| 별점 섹션 레이블 ("이번 쏘카 어떠셨나요?") | `typo-headline1 font-semibold` |
| 피드백/의견 섹션 레이블 | `typo-body1 font-semibold` |
| 감정 레이블 ("매우 만족" 등) | `typo-caption1 font-normal` |
| 에러 안내 문구 | `typo-caption1 font-normal` |
| Chip 라벨 | `typo-body1 font-normal` (Chip 컴포넌트 내부) |

### 간격 (Spacing)

| 영역 | 값 | Tailwind |
|------|----|----------|
| 좌우 콘텐츠 패딩 | 20px | `px-5` |
| ConfirmationHeader 상단 패딩 | 32px | `pt-8` |
| ConfirmationHeader 아이콘↔타이틀 간격 | 12px | `mt-3` |
| SatisfactionSection 상단 패딩 | 32px | `pt-8` |
| StarRatingInput 상단 마진 | 16px | `mt-4` |
| 별 간 간격 | 8px | `gap-2` |
| 별 터치 타겟 | 48px | `w-12 h-12` |
| 별 아이콘 실제 크기 | 40px | `size={40}` (IconProps) |
| QuickFeedback Chip 간격 | 8px | ChipGroup `gap={8}` |
| CommentSection 상단 패딩 | 24px | `pt-6` |
| BottomCTAArea 가로 패딩 | 20px | `px-5` |
| BottomCTAArea 상단 패딩 | 16px | `pt-4` |
| TextButton 상단 마진 | 12px | `mt-3` |
| TextButton 하단 마진 | 8px | `mb-2` |

---

## 4. QuickFeedback Chip 데이터 상수

### RATING_LABELS

| value | 레이블 |
|-------|--------|
| 1 | 매우 불만족 |
| 2 | 불만족 |
| 3 | 보통 |
| 4 | 만족 |
| 5 | 매우 만족 |

### POSITIVE_CHIPS (rating 4~5)

| 순서 | 레이블 |
|------|--------|
| 1 | 차량이 깨끗했어요 |
| 2 | 인수 과정이 편했어요 |
| 3 | 반납이 간편했어요 |
| 4 | 차량 상태가 좋았어요 |
| 5 | 앱이 편리했어요 |
| 6 | 가격이 합리적이었어요 |

### NEGATIVE_CHIPS (rating 1~3)

| 순서 | 레이블 |
|------|--------|
| 1 | 차량이 더러웠어요 |
| 2 | 차량 상태가 불량했어요 |
| 3 | 인수 과정이 불편했어요 |
| 4 | 반납 처리가 오래 걸렸어요 |
| 5 | 앱이 불편했어요 |
| 6 | 고객 응대가 아쉬웠어요 |
| 7 | 주차 공간 찾기 어려웠어요 |

---

## 5. 반응형 동작

| 항목 | 동작 |
|------|------|
| 뷰포트 | 390×844px 기준 (모바일 단일 뷰) |
| 스크롤 | 콘텐츠 영역 (`flex-1 overflow-y-auto`) 스크롤. BottomCTAArea `fixed` 고정 |
| Safe Area | BottomCTAArea: `pb-[calc(env(safe-area-inset-bottom,0px)+16px)]` |
| 스크롤 여백 | 스크롤 영역 하단: `pb-[calc(env(safe-area-inset-bottom,0px)+128px)]` (CTA 영역 높이 확보) |
| QuickFeedback 애니메이션 | `transition-all duration-300 ease-in-out` — height 0→auto, opacity 0→1 |
| 감정 레이블 페이드인 | `transition-opacity duration-200` — opacity 0→1 |

---

## 6. 위임 사항 (Frontend-dev)

| 항목 | 세부 내용 |
|------|-----------|
| `StarRatingInput` hover 인터랙션 | `onMouseEnter` / `onMouseLeave` / `onFocus` 이벤트로 hoverIndex state 관리 |
| 키보드 탐색 | `onKeyDown` — ArrowLeft/ArrowRight로 값 변경, Enter/Space로 선택 확정 |
| Roving tabindex | value 설정 전 첫 번째 별만 tabIndex=0, 설정 후 선택된 별만 tabIndex=0 |
| QuickFeedback height 트랜지션 | `height: 0` → `height: auto` CSS 트랜지션 (JS로 실제 scrollHeight 계산) |
| Submit 핸들러 | fetch POST, loading/error 상태, 409 별도 처리 |
| Toast 호출 | `useToast` 훅 또는 전역 Toast 인스턴스 활용 |
| 에러 시 스크롤 | `scrollIntoView({ behavior: 'smooth' })` — 별점 섹션으로 이동 |
| 뒤로가기 제출 중 확인 | `beforeunload` 또는 router.beforePopState 가드 |
