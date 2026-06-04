# 반납 후 만족도 평가 화면 명세

작성일: 2026-06-04
대상 스택: Next.js (App Router) + Tailwind CSS v4 + TypeScript
플랫폼: 모바일 앱 (iOS/Android), 390×844px 기준
키컬러: #00B8FF (`--lightblue-500`) / SOCAR 서비스 Primary: `--service-primary` (blue-500, #0078FF)

---

## Summary

**무엇을**: 쏘카 차량 반납 완료 직후 사용자에게 서비스 만족도를 묻는 인앱 화면 (ReturnSatisfactionScreen)을 구현한다.

**왜**: 반납 직후는 사용자의 경험 기억이 가장 생생한 시점이다. 이 시점에 별점 + 항목별 피드백 + 자유 텍스트를 수집하면 서비스 품질 개선을 위한 신뢰도 높은 데이터를 확보할 수 있다. 또한 낮은 별점 제출 시 즉각적인 고객 불만 감지 경로로 활용할 수 있다.

---

## Figma Reference

- **DS_2 파일**: `9BojhdnvhQSi1wpWpLwPnH` (SOCAR-FRAME-2.0-V.0.0.21~)
- 이 화면은 DS_2에 기존 화면 단위 컴포넌트가 없으므로 아래 페이지의 위젯을 조합하여 구성한다.

| 참조 항목 | 페이지 | Node ID |
|-----------|--------|---------|
| 별점 아이콘 (Star / StarFill) | Iconography | 3833:34405 |
| ActionButton (CTA) | Button | 698:35982 |
| TextButton (건너뛰기) | Button | 698:35982 |
| TopAppbar (헤더) | Top Appbar | 690:6564 |
| InputField (자유 텍스트) | — (구현된 컴포넌트 사용) | — |
| Chip (피드백 항목 선택) | — (구현된 컴포넌트 사용) | — |

---

## 화면 목적 및 사용자 시나리오

### 진입 조건
- 사용자가 쏘카 앱에서 차량 반납 처리를 완료한 직후 자동으로 이 화면으로 전환된다.
- 반납 완료 이벤트 (`RETURN_COMPLETED`) 수신 시 화면을 푸시한다.

### 사용자 시나리오 (Happy Path)
1. 사용자가 반납 완료 → 화면 자동 진입
2. 상단에 "반납이 완료됐어요!" 확인 메시지 확인
3. 별점(1~5) 탭으로 전체 만족도 선택
4. 별점에 따라 조건부 노출되는 빠른 피드백 Chip 중 해당 항목 복수 선택
5. (선택) 텍스트 입력창에 추가 의견 작성
6. "제출하기" 버튼 탭 → 제출 완료 Toast 표시 후 홈/예약 내역으로 이동
7. 또는 "건너뛰기" TextButton 탭 → 즉시 이동

### 사용자 시나리오 (Edge Cases)
- 별점을 선택하지 않은 채 "제출하기" 탭 → 별점 영역 하이라이트 + 인라인 안내 문구
- 네트워크 오류 발생 → 에러 Toast 표시, 화면 유지 (재시도 가능)
- 자유 텍스트 maxLength(500자) 초과 입력 → InputField 글자 수 카운터 + 초과 입력 차단

---

## 화면 구성 요소 (UI 컴포넌트 목록)

```
ReturnSatisfactionScreen (390×844px)
├── TopAppbar                        — 헤더 (닫기/건너뛰기 버튼)
├── ScrollView (콘텐츠 영역)
│   ├── ConfirmationHeader           — 반납 완료 확인 섹션 (신규 레이아웃)
│   │   ├── CheckCircleIcon          — 완료 아이콘 (SuccessFill 24px)
│   │   ├── ReturnTitle              — "반납이 완료됐어요!" (typo-title3, font-bold)
│   │   └── ReturnSubtitle           — 이용 일시 + 차량명 (typo-body2, text-secondary)
│   ├── SatisfactionSection          — 별점 선택 섹션
│   │   ├── SectionLabel             — "이번 쏘카 어떠셨나요?" (typo-headline1, font-semibold)
│   │   ├── StarRatingInput          — 별점 1~5 인터랙티브 (신규 컴포넌트)
│   │   └── RatingGuideLabel         — 별점 감정 레이블 (typo-caption1, text-tertiary)
│   ├── QuickFeedbackSection         — 빠른 피드백 Chip 섹션 (별점 선택 후 조건부 노출)
│   │   ├── SectionLabel             — "어떤 점이 [좋았나요 / 불편했나요]?" (typo-body1, font-semibold)
│   │   └── ChipGroup                — 다중 선택 Chip (layout="multiline")
│   └── CommentSection               — 추가 의견 섹션
│       ├── SectionLabel             — "추가 의견 (선택)" (typo-body1, font-semibold)
│       └── InputField               — 멀티라인 텍스트 입력 (variant="outline", showCharCount)
├── BottomCTAArea                    — 하단 고정 버튼 영역
│   ├── ActionButton                 — "제출하기" (fullWidth, disabled until 별점 선택)
│   └── TextButton                   — "건너뛰기" (variant="secondary", size="16")
└── [Toast]                          — 제출 완료 / 오류 피드백
```

---

## Component API

### StarRatingInput (신규 컴포넌트)

이 화면 전용으로 새로 구현하는 컴포넌트. Core Widgets에 해당 항목 없음.

```typescript
// src/components/StarRatingInput/types.ts

export interface StarRatingInputProps {
  /** 현재 선택된 별점 (1~5, null=미선택) */
  value: number | null;
  /** 별점 선택 콜백 */
  onChange: (rating: number) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 (미선택 제출 시도) */
  error?: boolean;
  /** aria-label */
  'aria-label'?: string;
}
```

**States**

| State | 설명 |
|-------|------|
| idle | 모든 별 빈 상태 (Star 아이콘, gray-300) |
| hover | 호버/포커스 위치까지 별 채움 (StarFill, primary-regular) |
| selected | 선택된 별점까지 채움 (StarFill, --status-caution-regular orange-500) |
| error | 미선택 상태에서 제출 시도 — 테두리 강조 + 안내 문구 |
| disabled | 모든 별 비활성 (gray-300, pointer-events:none) |

**별점별 감정 레이블**

| 별점 | 레이블 |
|------|--------|
| 1 | 매우 불만족 |
| 2 | 불만족 |
| 3 | 보통 |
| 4 | 만족 |
| 5 | 매우 만족 |

**별 아이콘 사이즈**: 40×40px (터치 타겟 48px 이상 확보), 간격 8px

---

### QuickFeedbackChips (조건부 렌더링)

Core Widgets의 `Chip` + `ChipGroup`을 그대로 사용. 별점 값에 따라 표시할 항목을 전환한다.

**별점 4~5 (긍정 피드백 항목)**
```
차량이 깨끗했어요 / 인수 과정이 편했어요 / 반납이 간편했어요 /
차량 상태가 좋았어요 / 앱이 편리했어요 / 가격이 합리적이었어요
```

**별점 1~3 (부정 피드백 항목)**
```
차량이 더러웠어요 / 차량 상태가 불량했어요 / 인수 과정이 불편했어요 /
반납 처리가 오래 걸렸어요 / 앱이 불편했어요 / 고객 응대가 아쉬웠어요 /
주차 공간 찾기 어려웠어요
```

Chip Props:
- `type="filter"`, `size="md"`, `selected` (다중 선택), `disabled=false`

---

### ReturnSatisfactionScreen (페이지 컴포넌트)

```typescript
// src/app/return-satisfaction/page.tsx (또는 Screen 컴포넌트로 분리)

interface ReturnSatisfactionProps {
  /** 반납 완료된 예약 ID */
  reservationId: string;
  /** 차량명 (예: "아반떼 CN7 · 가나1234") */
  vehicleName: string;
  /** 이용 기간 (예: "06.01(일) 09:00 ~ 06.02(월) 18:00") */
  usagePeriod: string;
  /** 제출 완료 후 이동할 경로 (기본: "/") */
  onComplete?: () => void;
  /** 건너뛰기 후 이동할 경로 (기본: "/") */
  onSkip?: () => void;
}
```

---

## 데이터 구조

### 입력 상태 (Client State)

```typescript
interface SatisfactionFormState {
  rating: number | null;           // 1~5, 미선택 null
  quickFeedbackItems: string[];    // 선택된 Chip label 배열
  comment: string;                 // 자유 텍스트, 최대 500자
}
```

### 제출 페이로드 (API Request Body)

```typescript
interface SubmitSatisfactionPayload {
  reservationId: string;
  rating: number;                  // 필수, 1~5
  quickFeedbackItems: string[];    // 선택 항목 key 배열 (빈 배열 허용)
  comment: string | null;          // 미입력 시 null
  submittedAt: string;             // ISO 8601
  platform: 'ios' | 'android' | 'web';
}
```

### API 엔드포인트

```
POST /api/reservations/{reservationId}/satisfaction
Content-Type: application/json
Authorization: Bearer {token}
```

**응답**
```typescript
// 성공 200
{ success: true }

// 실패 4xx/5xx
{ success: false; message: string }
```

---

## 화면 플로우

```
[반납 완료 처리]
      │
      ▼
[ReturnSatisfactionScreen 진입]
      │
      ├─ 별점 탭 ──────────────────────────────────────────────┐
      │       │                                                │
      │       ▼                                                │
      │  [QuickFeedback Chip 섹션 노출 (조건부)]               │
      │       │                                                │
      │       ├─ Chip 선택 (선택/해제, 다중)                    │
      │       │                                                │
      │       ▼                                                │
      │  [InputField — 추가 의견 입력 (선택)]                  │
      │       │                                                │
      │       └────────────────────────────────────────────────┤
      │                                                        │
      ├─ "제출하기" 탭 (별점 선택 전) → [별점 영역 에러 표시]  │
      │                                                        │
      ├─ "제출하기" 탭 (별점 선택 후) ─────────────────────────┘
      │       │
      │       ├─ 성공 → [완료 Toast] → [홈 or 예약 내역 이동]
      │       │
      │       └─ 실패 → [에러 Toast] → [화면 유지, 재시도 가능]
      │
      └─ "건너뛰기" 탭 → [홈 or 예약 내역 이동]
```

---

## 각 컴포넌트 상태 및 인터랙션 상세

### TopAppbar
- `leading`: `LeadingButton` variant="close" (X 아이콘) → 건너뛰기와 동일 동작
- `trailing`: 없음 (단순 화면, 별도 액션 불필요)
- `title`: 없음 (콘텐츠 영역 타이틀로 대체)
- `theme`: light, `sticky`: true

### ConfirmationHeader
- SuccessFill 아이콘: 32px, `text-status-positive-regular` (green-500)
- ReturnTitle: `typo-title3 font-bold text-text-strong`
- ReturnSubtitle: `typo-body2 font-normal text-text-secondary`
- 상단 여백: padding-top 32px, 가운데 정렬

### SatisfactionSection
- SectionLabel: `typo-headline1 font-semibold text-text-strong`, padding-top 32px
- StarRatingInput: 별 5개 가로 정렬, 가운데 정렬, padding-top 16px
- RatingGuideLabel: 별점 선택 전 숨김, 선택 후 해당 레이블 페이드인 (opacity transition 200ms)
- error 상태: SectionLabel 아래 `typo-caption1 text-status-negative-regular` 안내 문구 노출

### QuickFeedbackSection
- 별점 선택 전: `display:none` (height:0, overflow:hidden)
- 별점 선택 후: 슬라이드다운 애니메이션 (height auto, transition 300ms)
- 별점 변경 시 (4→5→3 등): Chip 목록 교체, 이전 선택 초기화
- ChipGroup layout="multiline", gap="sm"

### CommentSection
- InputField size="lg", variant="outline", multiline, rows=4
- placeholder="추가 의견을 입력해 주세요. (선택)"
- maxLength=500, showCharCount=true
- label은 별도 SectionLabel로 상단에 표시 (InputField label prop 미사용)

### BottomCTAArea
- 하단 고정 (position:sticky bottom:0 또는 fixed)
- safe area 하단 패딩 적용 (`padding-bottom: env(safe-area-inset-bottom, 0px) + 16px`)
- 배경: white, 상단 separator 1px (`--border-regular`)
- ActionButton: fullWidth, variant="primary", size="lg"
  - 별점 미선택: disabled=true
  - 별점 선택: disabled=false
  - 제출 중: loading=true
- TextButton: variant="secondary", size="16", 가운데 정렬, padding-top 12px, padding-bottom 8px

---

## Acceptance Criteria

1. 화면 진입 시 별점 미선택 상태이며, "제출하기" 버튼은 disabled
2. 별 1~5를 탭하면 해당 별점까지 채워진 StarFill 아이콘으로 전환되고, 감정 레이블이 노출된다
3. 별점 선택 직후 QuickFeedback Chip 섹션이 애니메이션과 함께 노출된다
4. 별점이 4~5이면 긍정 항목, 1~3이면 부정 항목 Chip이 노출된다
5. 별점 변경 시 기존에 선택된 Chip은 모두 초기화된다
6. Chip은 다중 선택이 가능하다
7. InputField는 500자 초과 입력이 불가하며, 현재 글자 수가 표시된다
8. 별점 없이 "제출하기" 탭 시 별점 섹션에 에러 상태(빨간 안내 문구)가 표시된다
9. 정상 제출 시 로딩 스피너가 표시되고, 성공 후 완료 Toast와 함께 화면을 벗어난다
10. 네트워크 오류 시 에러 Toast가 표시되고, 화면은 유지되며 재시도 가능하다
11. 건너뛰기 / TopAppbar X 버튼 탭 시 API 호출 없이 화면을 벗어난다
12. 모든 터치 타겟은 최소 44×44px 이상 (Star 아이콘 40px + 패딩으로 48px 확보)
13. 스크린리더로 별점 조작 시 "N점 선택됨, 5점 중 N점" 형식으로 읽힌다

---

## Affected Files

| 파일 경로 | 변경 유형 | 이유 |
|-----------|-----------|------|
| `src/components/StarRatingInput/index.tsx` | 신규 생성 | 별점 입력 전용 컴포넌트, Core Widgets에 없음 |
| `src/components/StarRatingInput/types.ts` | 신규 생성 | Props 타입 정의 |
| `src/app/return-satisfaction/page.tsx` | 신규 생성 | 만족도 화면 페이지 |
| `src/app/return-satisfaction/ReturnSatisfactionClient.tsx` | 신규 생성 | 인터랙션 로직 분리 (use client) |
| `src/app/globals.css` | 수정 없음 | 기존 토큰으로 충분 |
| `.claude/doc/design-system.md` | 수정 | StarRatingInput을 Core Widgets 표에 등록 |

---

## Implementation Steps

1. **StarRatingInput 컴포넌트 구현**
   - `src/components/StarRatingInput/types.ts` 작성
   - `src/components/StarRatingInput/index.tsx` 작성
   - 기존 `Star`, `StarFill` 아이콘 컴포넌트 재사용
   - hover/selected/error 상태 스타일 구현
   - keyboard navigation (ArrowLeft/ArrowRight로 별점 조작)
   - aria-label, role="radiogroup" + 각 별 role="radio" 적용

2. **ReturnSatisfactionClient 컴포넌트 구현**
   - `use client` 선언
   - `SatisfactionFormState` useState로 관리
   - 별점 변경 시 QuickFeedback 항목 전환 + 선택 초기화 로직
   - 제출 핸들러 (loading/error 상태 관리)
   - validation 로직 (별점 미선택 에러)

3. **page.tsx 구현**
   - Server Component로 reservationId, vehicleName, usagePeriod props 수신
   - ReturnSatisfactionClient에 props 전달
   - searchParams 또는 route params에서 데이터 추출

4. **Core Widgets 표 업데이트**
   - `design-system.md`의 Core Widgets 표에 StarRatingInput 항목 추가

---

## Reusable Components (Core Widgets 재사용)

| 위젯 | 용도 |
|------|------|
| `TopAppbar` + `LeadingButton` | 화면 상단 앱바, X(닫기) 버튼 |
| `ActionButton` | "제출하기" CTA |
| `TextButton` | "건너뛰기" 보조 버튼 |
| `Chip` + `ChipGroup` | 빠른 피드백 항목 선택 |
| `InputField` | 자유 텍스트 의견 입력 |
| `Toast` (Feedback) | 제출 완료 / 오류 피드백 |
| `Star`, `StarFill` (Icons) | StarRatingInput 내부에서 사용 |
| `SuccessFill` (Icons) | 반납 완료 확인 아이콘 |

---

## Accessibility

| 항목 | 요구사항 |
|------|----------|
| 별점 입력 | `role="radiogroup"` 컨테이너, 각 별은 `role="radio"`, `aria-checked`, `aria-label="N점"` |
| 별점 키보드 조작 | ArrowLeft/ArrowRight로 값 변경, Enter/Space로 선택 |
| 스크린리더 별점 안내 | `aria-label="서비스 만족도 별점 선택, 현재 N점 선택됨"` (동적 업데이트) |
| 에러 안내 | `role="alert"` + `aria-live="polite"` 로 에러 문구 스크린리더에 전달 |
| Chip 선택 | 각 Chip `aria-pressed` + `aria-label="[항목명], 선택됨/선택 안 됨"` |
| 터치 타겟 | 별 아이콘 40px + 주변 패딩으로 48×48px 터치 타겟 확보 |
| 색상 대비 | 선택된 별(orange-500 on white): 3.0:1 이상 (AA Large 통과) |
| 포커스 표시 | focus-visible:ring-2, ring-primary-regular |

---

## Dependencies

신규 패키지 필요 없음. 기존 스택(Next.js + Tailwind CSS v4 + TypeScript)과 구현된 컴포넌트(Chip, InputField, ActionButton, TextButton, TopAppbar, Toast, Star/StarFill 아이콘)만으로 구현 가능하다.

---

## 엣지 케이스 정리

| 케이스 | 처리 방법 |
|--------|-----------|
| 별점 미선택 제출 시도 | 별점 섹션 에러 표시 + 스크롤 해당 섹션으로 이동 |
| 네트워크 오류 | 에러 Toast, 화면 유지, "제출하기" 버튼 재활성화 |
| 이미 평가 제출한 예약 재진입 | 서버 409 응답 시 "이미 평가를 완료했어요" 안내 후 이동 |
| 텍스트 500자 초과 입력 | InputField 차단 + 카운터 빨간색 표시 |
| 별점 변경 (4→2로 바꿈) | Chip 목록 교체 + 기존 선택 Chip 전체 초기화 |
| 빠른 뒤로가기 (제출 중) | 제출 완료 전 이탈 시도 → Overlay 확인 다이얼로그 표시 |
| 오프라인 상태 | 제출 시도 시 즉시 에러 Toast ("인터넷 연결을 확인해 주세요") |
