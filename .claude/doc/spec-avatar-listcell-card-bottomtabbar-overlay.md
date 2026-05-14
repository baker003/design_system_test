# DS_2 신규 컴포넌트 5종 명세

작성일: 2026-05-14
대상 스택: Next.js (App Router) + Tailwind CSS v4 + TypeScript
Figma 파일: GXzbUcg1AtdzLi7XytKp1l
색상 규칙: 시맨틱 토큰만 사용, 하드코딩 금지

---

## 1. Avatar

### Summary

사용자 프로필을 시각적으로 표시하는 컴포넌트. 이미지가 있으면 이미지를, 없으면 이니셜(initials) 또는 기본 User 아이콘을 보여준다. 상태 표시 dot(status indicator)을 선택적으로 오버레이한다. Badge 컴포넌트의 앵커로도 활용된다.

### Figma Reference

- **파일 키**: GXzbUcg1AtdzLi7XytKp1l
- **노드 ID**: 1028:2

### Component API

```typescript
// src/components/Avatar/types.ts

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  /** 이미지 URL */
  src?: string;
  /** 이미지 alt 텍스트 */
  alt?: string;
  /** 이니셜 텍스트 (src 없을 때 fallback, 최대 2자) */
  initials?: string;
  /** 크기 */
  size?: AvatarSize;
  /** 형태: circle(기본) / square(rounded-lg) */
  shape?: AvatarShape;
  /** 상태 dot 표시 */
  status?: AvatarStatus;
  /** 접근성 레이블 (이미지 alt가 없을 때 대체) */
  'aria-label'?: string;
  className?: string;
}
```

### Variants / States

#### Size 매핑
| size | px  | 이니셜 typo     | 아이콘 크기 |
|------|-----|-----------------|-------------|
| xs   | 24  | typo-caption2   | 12px        |
| sm   | 32  | typo-caption1   | 16px        |
| md   | 40  | typo-label1     | 20px        |
| lg   | 48  | typo-body2      | 24px        |
| xl   | 56  | typo-body1      | 28px        |

#### Shape
| shape  | border-radius                  |
|--------|--------------------------------|
| circle | rounded-full                   |
| square | rounded-lg (8px)               |

#### Fallback 우선순위
1. `src` — Next.js `<Image>` 렌더링, 로드 오류 시 onError로 initials 또는 아이콘으로 전환
2. `initials` — 대문자 1~2자, `bg-gray-200 text-text-primary`
3. 기본 아이콘 — `User` 아이콘 (`@/components/Icons/User`), `bg-gray-100 text-text-tertiary`

#### Status Dot 색상
| status  | 색상 토큰                        |
|---------|----------------------------------|
| online  | bg-status-positive-regular       |
| offline | bg-gray-400                      |
| busy    | bg-status-negative-regular       |
| away    | bg-status-caution-regular        |

Status dot은 오른쪽 하단에 절대 위치(`bottom-0 right-0`), 흰 테두리(`ring-2 ring-surface`)로 오버레이. dot 크기는 size에 따라 xs/sm=8px, md=10px, lg/xl=12px.

### Acceptance Criteria

- [ ] src 제공 시 Next.js Image로 렌더링되며 로드 오류 시 initials fallback 동작
- [ ] src/initials 모두 없으면 User 아이콘 fallback 렌더링
- [ ] 5가지 size variant 정확한 픽셀 크기로 렌더링
- [ ] circle/square shape 전환 동작
- [ ] status dot이 4가지 색상으로 올바른 위치에 렌더링
- [ ] 이미지: alt 또는 aria-label 중 하나 이상 제공 시 접근성 통과
- [ ] initials는 최대 2자까지만 표시

### Affected Files

| 파일 | 역할 |
|------|------|
| `src/components/Avatar/Avatar.tsx` | 메인 컴포넌트 |
| `src/components/Avatar/types.ts` | 타입 정의 |
| `src/components/Avatar/index.ts` | 배럴 익스포트 |
| `src/app/avatar/page.tsx` | 프리뷰 페이지 |
| `src/app/globals.css` | 신규 토큰 필요 시 추가 |

### Implementation Steps

1. `types.ts` — AvatarSize, AvatarShape, AvatarStatus, AvatarProps 정의
2. `Avatar.tsx` — `'use client'` 선언, useState로 imgError 추적
3. 크기 룩업테이블 — SIZE_CLASS, INITIALS_TYPO, ICON_SIZE, DOT_SIZE 상수 맵
4. 렌더 분기 — src && !imgError → Image, initials → span, else → User 아이콘
5. Status dot — status prop 있을 때만 렌더, 절대 위치 + ring
6. 프리뷰 페이지 — 5 size × 2 shape × 3 fallback 타입 × 4 status 조합 그리드

### Reusable Components

| 컴포넌트 | 출처 | 용도 |
|----------|------|------|
| `User` | `@/components/Icons/User` | 기본 아이콘 fallback |
| `Badge` | `@/components/Badge` | 알림 배지 앵커(프리뷰 예시) |

### Accessibility

- `<img>`에 `alt` 필수 (Next.js Image alt prop)
- 이니셜/아이콘 fallback 시 `aria-label` 또는 `role="img"` + `aria-label` 제공
- status dot은 시각 전용 → `aria-hidden="true"`, 상태 정보는 부모에서 `aria-label`로 제공
- 색상 대비: 이니셜 배경 `--gray-200` 위 `--text-primary(#354153)` → 9.32:1 (PASS)

### Dependencies

- 신규 패키지 없음 (Next.js `Image` 컴포넌트 기본 사용)

---

## 2. List Cell

### Summary

리스트 아이템 단위 컴포넌트. leading(좌측) / content(중앙) / trailing(우측) 영역의 3단 레이아웃으로 구성된다. 설정 화면, 메뉴, 알림 목록 등 반복 아이템 UI에 사용된다.

### Figma Reference

- **파일 키**: GXzbUcg1AtdzLi7XytKp1l
- **노드 ID**: 1129:2

### Component API

```typescript
// src/components/ListCell/types.ts

import type { ReactNode } from 'react';

export type ListCellTrailingType = 'icon' | 'text' | 'switch' | 'badge' | 'none';

export interface ListCellProps {
  /** 제목 (필수) */
  title: string;
  /** 부제목 */
  subtitle?: string;
  /** 왼쪽 아이콘 (ReactNode — 24px 기준 Icon 컴포넌트) */
  leadingIcon?: ReactNode;
  /** 왼쪽 Avatar (leadingIcon 대신 사용) */
  leadingAvatar?: ReactNode;
  /** 오른쪽 영역 타입 */
  trailingType?: ListCellTrailingType;
  /** trailing=icon: 아이콘 ReactNode */
  trailingIcon?: ReactNode;
  /** trailing=text: 텍스트 */
  trailingText?: string;
  /** trailing=switch: checked 여부 */
  switchChecked?: boolean;
  /** trailing=switch: 변경 콜백 */
  onSwitchChange?: (checked: boolean) => void;
  /** trailing=badge: Badge ReactNode */
  trailingBadge?: ReactNode;
  /** 클릭 핸들러 (제공 시 클릭 가능 스타일 적용) */
  onClick?: () => void;
  /** 하단 구분선 표시 */
  showDivider?: boolean;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 추가 클래스 */
  className?: string;
}
```

### Variants / States

#### 상태
| state    | 설명                                         |
|----------|----------------------------------------------|
| default  | 기본 표시                                    |
| pressed  | onClick 있을 때 active — `bg-pressed-dark-weak` |
| disabled | opacity-40, pointer-events-none              |

#### trailing 타입 조합
| trailingType | 렌더 요소                              |
|--------------|----------------------------------------|
| none         | trailing 영역 없음                     |
| icon         | ChevronRight 또는 커스텀 아이콘        |
| text         | `typo-label1 text-text-tertiary`       |
| switch       | `Toggle` 컴포넌트                      |
| badge        | `Badge` 컴포넌트                       |

#### 레이아웃 구조
```
[leading 40px?] [content flex-1] [trailing auto]
padding: py-3 px-4
leading-content gap: 12px
content gap (title+subtitle): 2px
```

### Acceptance Criteria

- [ ] title 단독, title+subtitle 두 경우 모두 렌더링
- [ ] leadingIcon, leadingAvatar 각각 정상 표시
- [ ] trailingType 5가지 모두 렌더링
- [ ] onClick 있을 때 pressed 상태 시각 표시
- [ ] disabled 상태 opacity 처리
- [ ] showDivider=true 시 하단 Divider 렌더링
- [ ] switch trailing 클릭이 Toggle onChange 호출

### Affected Files

| 파일 | 역할 |
|------|------|
| `src/components/ListCell/ListCell.tsx` | 메인 컴포넌트 |
| `src/components/ListCell/types.ts` | 타입 정의 |
| `src/components/ListCell/index.ts` | 배럴 익스포트 |
| `src/app/list-cell/page.tsx` | 프리뷰 페이지 |

### Implementation Steps

1. `types.ts` — ListCellTrailingType, ListCellProps 정의
2. `ListCell.tsx` — `'use client'` 필요 (Toggle onChange 때문)
3. leading 영역 — leadingAvatar 우선, 없으면 leadingIcon, 둘 다 없으면 생략
4. content 영역 — title(typo-body2 font-semibold) + optional subtitle(typo-label1 text-text-secondary)
5. trailing 영역 — trailingType switch로 렌더 분기
6. onClick 있을 때 wrapper를 `<button>` 또는 `cursor-pointer` + active 클래스 처리
7. showDivider — `<Divider>` 컴포넌트 하단 삽입
8. 프리뷰 페이지 — trailing 5가지 × 상태 3가지 조합 목록

### Reusable Components

| 컴포넌트 | 출처 | 용도 |
|----------|------|------|
| `Toggle` | `@/components/Controls` | trailing=switch |
| `Badge` | `@/components/Badge` | trailing=badge |
| `Divider` | `@/components/Divider` | 구분선 |
| `Avatar` | `@/components/Avatar` | leadingAvatar |
| `ChevronRight` | `@/components/Icons` | 기본 trailing 아이콘 |

### Accessibility

- `onClick` 있을 때 wrapper를 `<button type="button">`으로 렌더링 → 키보드 접근 가능
- `disabled` 시 `aria-disabled="true"` + `tabIndex={-1}`
- trailing switch: `Toggle` 컴포넌트 자체의 role="switch" 그대로 위임
- title이 셀의 접근성 레이블 역할 → heading 수준은 부모 컨텍스트에 위임

### Dependencies

- 신규 패키지 없음

---

## 3. Card

### Summary

관련 콘텐츠를 그룹화하는 컨테이너 컴포넌트. header / content / footer 슬롯 구조를 제공하며, variant에 따라 elevated(그림자), outlined(테두리), filled(배경색) 스타일을 지원한다. 클릭 가능한 카드(인터랙티브)와 정적 카드를 모두 커버한다.

### Figma Reference

- **파일 키**: GXzbUcg1AtdzLi7XytKp1l
- **노드 ID**: 1150:2

### Component API

```typescript
// src/components/Card/types.ts

import type { ReactNode, MouseEvent } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  /** 스타일 변형 */
  variant?: CardVariant;
  /** 헤더 슬롯 */
  header?: ReactNode;
  /** 본문 슬롯 (children과 동일, children 우선) */
  content?: ReactNode;
  /** 본문 콘텐츠 */
  children?: ReactNode;
  /** 푸터 슬롯 */
  footer?: ReactNode;
  /** 클릭 핸들러 (제공 시 인터랙티브 카드) */
  onClick?: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  /** 비활성 (onClick 있을 때만 의미 있음) */
  disabled?: boolean;
  /** 내부 패딩 제거 (이미지 전체 채움 등) */
  noPadding?: boolean;
  /** 추가 클래스 */
  className?: string;
  /** 접근성 레이블 (인터랙티브 카드에서 권장) */
  'aria-label'?: string;
}
```

### Variants / States

#### variant 스타일
| variant  | 배경        | 테두리                          | 그림자                          |
|----------|-------------|----------------------------------|--------------------------------|
| elevated | bg-surface  | 없음                             | shadow-sm (0 1px 3px rgba(0,0,0,0.08)) |
| outlined | bg-surface  | border border-border (gray-200)  | 없음                           |
| filled   | bg-background | 없음                           | 없음                           |

#### 인터랙티브 상태 (onClick 있을 때)
| state   | 처리                              |
|---------|-----------------------------------|
| hover   | bg-pressed-dark-weak 오버레이     |
| pressed | scale(0.99) + opacity-95          |
| focus   | ring-2 ring-primary-regular outline-none |
| disabled | opacity-40 pointer-events-none   |

#### 레이아웃
```
rounded-xl (12px)
overflow-hidden
[header]   — 경계: border-b border-border (있을 때만)
[content]  — py-4 px-4 (noPadding 시 p-0)
[footer]   — 경계: border-t border-border (있을 때만), py-3 px-4
```

### Acceptance Criteria

- [ ] elevated / outlined / filled 3가지 variant 렌더링
- [ ] header / content / footer 슬롯 조합 (없으면 생략)
- [ ] onClick 없을 때 정적 div, 있을 때 button으로 렌더링
- [ ] hover/pressed 상태 시각 피드백
- [ ] disabled 상태 처리
- [ ] noPadding prop 동작
- [ ] 키보드 Enter/Space로 onClick 트리거 (button 태그 기본 동작)

### Affected Files

| 파일 | 역할 |
|------|------|
| `src/components/Card/Card.tsx` | 메인 컴포넌트 |
| `src/components/Card/types.ts` | 타입 정의 |
| `src/components/Card/index.ts` | 배럴 익스포트 |
| `src/app/card/page.tsx` | 프리뷰 페이지 |

### Implementation Steps

1. `types.ts` — CardVariant, CardProps 정의
2. `Card.tsx` — Server Component 가능 (인터랙티브 아닐 때). onClick 여부로 `<button>` vs `<div>` 분기
3. variant별 클래스 룩업테이블 정의
4. 슬롯 렌더 — header 있을 때 하단 border-b, footer 있을 때 상단 border-t
5. 인터랙티브 스타일 — transition-all, hover/active 클래스
6. 프리뷰 페이지 — 3 variant × (정적/인터랙티브) 예시, 슬롯 조합 예시

### Reusable Components

| 컴포넌트 | 출처 | 용도 |
|----------|------|------|
| `Tag` | `@/components/Tag` | 헤더 내 태그 예시(프리뷰) |
| `ActionButton` | `@/components/Button` | 푸터 CTA 예시(프리뷰) |
| `Avatar` | `@/components/Avatar` | 헤더 사용자 정보 예시(프리뷰) |

### Accessibility

- 클릭 가능 카드: `<button type="button">` + `aria-label` 권장
- 정적 카드: `<div>` (role="article" 또는 의미 없는 컨테이너)
- disabled 시 `aria-disabled="true"` + `tabIndex={-1}`
- 내부 header/footer가 시맨틱 구조를 가지면 카드 내부에서 heading 태그 허용

### Dependencies

- 신규 패키지 없음

---

## 4. Bottom Tab Bar

### Summary

모바일 앱 하단 네비게이션. 3~5개 탭 아이템(아이콘 + 레이블)으로 구성되며, 활성 탭을 시각적으로 강조하고 선택적으로 배지를 표시한다. fixed 위치로 화면 하단에 고정된다.

### Figma Reference

- **파일 키**: GXzbUcg1AtdzLi7XytKp1l
- **노드 ID**: 1154:2

### Component API

```typescript
// src/components/BottomTabBar/types.ts

import type { ReactNode } from 'react';

export interface TabItem {
  /** 고유 키 */
  key: string;
  /** 아이콘 (ReactNode — 24px 기준) */
  icon: ReactNode;
  /** 활성 상태 아이콘 (선택적, 없으면 icon 재사용) */
  activeIcon?: ReactNode;
  /** 탭 레이블 */
  label: string;
  /** 배지 타입 */
  badge?: 'dot' | 'count' | 'none';
  /** 배지 숫자 (badge='count'일 때) */
  badgeCount?: number;
  /** 탭 비활성 */
  disabled?: boolean;
}

export interface BottomTabBarProps {
  /** 탭 아이템 목록 (3~5개) */
  items: TabItem[];
  /** 현재 활성 탭 키 */
  activeKey: string;
  /** 탭 변경 콜백 */
  onChange: (key: string) => void;
  /** Safe Area 하단 여백 적용 (iOS PWA) */
  safeAreaBottom?: boolean;
  /** 추가 클래스 */
  className?: string;
}
```

### Variants / States

#### 탭 아이템 상태
| state    | 아이콘 색상          | 레이블 색상           | 레이블 weight |
|----------|----------------------|-----------------------|--------------|
| active   | text-primary-regular | text-primary-regular  | font-semibold |
| inactive | text-text-tertiary   | text-text-tertiary    | font-normal   |
| disabled | text-text-disabled   | text-text-disabled    | font-normal   |

#### 배지
- dot: `Badge variant="dot"` — 아이콘 오른쪽 상단
- count: `Badge variant="count"` — 아이콘 오른쪽 상단

#### 레이아웃
```
fixed bottom-0 left-0 right-0
bg-surface border-t border-border
flex items-start
[탭수]개 → 각 탭 flex-1
각 탭: flex-col items-center gap-1 pt-2 pb-2 (safeAreaBottom 시 pb-safe)
아이콘 영역: relative w-6 h-6
레이블: typo-caption1 font-normal/semibold
z-30
```

### Acceptance Criteria

- [ ] 3/4/5탭 균등 분배 렌더링
- [ ] activeKey 변경 시 활성 탭 스타일 전환
- [ ] 비활성 탭 클릭 시 onChange 호출
- [ ] disabled 탭 클릭 무시
- [ ] dot/count 배지 표시
- [ ] safeAreaBottom 적용 시 iOS 홈 인디케이터 영역 여백 추가
- [ ] role="tablist", 각 탭 role="tab", aria-selected 적용

### Affected Files

| 파일 | 역할 |
|------|------|
| `src/components/BottomTabBar/BottomTabBar.tsx` | 메인 컴포넌트 |
| `src/components/BottomTabBar/types.ts` | 타입 정의 |
| `src/components/BottomTabBar/index.ts` | 배럴 익스포트 |
| `src/app/bottom-tab-bar/page.tsx` | 프리뷰 페이지 |

### Implementation Steps

1. `types.ts` — TabItem, BottomTabBarProps 정의
2. `BottomTabBar.tsx` — `'use client'` 선언
3. 아이템 렌더 — items.map으로 탭 버튼 생성, flex-1 균등 분배
4. 활성/비활성 클래스 룩업 — activeKey === item.key 비교
5. 배지 렌더 — item.badge가 있을 때 아이콘 위 `<Badge>` 절대 위치
6. safeAreaBottom — `pb-[env(safe-area-inset-bottom)]` Tailwind 임의값 또는 CSS 변수
7. 프리뷰 페이지 — 모바일 프레임 내 3/4/5탭 데모, 탭 전환 인터랙션

### Reusable Components

| 컴포넌트 | 출처 | 용도 |
|----------|------|------|
| `Badge` | `@/components/Badge` | dot/count 배지 |
| `Home`, `Search`, `Notification`, `User`, `Settings` | `@/components/Icons` | 탭 아이콘 예시(프리뷰) |

### Accessibility

- wrapper: `role="tablist"`, `aria-label="메인 네비게이션"`
- 각 탭 버튼: `role="tab"`, `aria-selected={isActive}`, `aria-disabled={disabled}`
- 활성 탭: `tabIndex={0}`, 비활성: `tabIndex={-1}` (roving tabindex 패턴)
- 배지: 숫자 배지는 `aria-label="알림 {count}개"`를 탭 버튼에 포함

### Dependencies

- 신규 패키지 없음 (safe-area CSS 변수는 브라우저 네이티브)

---

## 5. Overlay

### Summary

Modal/Dialog 컴포넌트. 딤드 배경 위에 콘텐츠 패널을 표시한다. createPortal로 document.body에 마운트하고, 포커스 트랩(focus trap)을 내장한다. X버튼/배경클릭/Escape 3가지 닫기 수단을 지원한다.

### Figma Reference

- **파일 키**: GXzbUcg1AtdzLi7XytKp1l
- **노드 ID**: 1159:2

### Component API

```typescript
// src/components/Overlay/types.ts

import type { ReactNode } from 'react';

export type OverlaySize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface OverlayProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 크기 */
  size?: OverlaySize;
  /** 헤더 제목 */
  title?: string;
  /** 닫기 버튼 표시 (기본 true) */
  showCloseButton?: boolean;
  /** 헤더 슬롯 (title 대신 커스텀 헤더) */
  header?: ReactNode;
  /** 본문 콘텐츠 */
  children?: ReactNode;
  /** 액션 버튼 영역 슬롯 */
  footer?: ReactNode;
  /** 배경 클릭으로 닫기 (기본 true) */
  closeOnBackdropClick?: boolean;
  /** Escape 키로 닫기 (기본 true) */
  closeOnEscape?: boolean;
  /** 접근성 레이블 (title 없을 때) */
  'aria-label'?: string;
  /** 추가 클래스 */
  className?: string;
}
```

### Variants / States

#### Size 매핑
| size       | 최대 너비   | 동작                         |
|------------|-------------|------------------------------|
| sm         | max-w-sm (384px) | 중앙 정렬                |
| md         | max-w-md (448px) | 중앙 정렬 (기본)         |
| lg         | max-w-lg (512px) | 중앙 정렬                |
| fullscreen | w-full h-full | 전체 화면, rounded-none    |

#### 애니메이션
- 딤드: fade-in/out 150ms ease
- 패널: scale-in (opacity 0→1, scale 0.95→1) 150ms ease-out / fade-out 150ms ease-in
- 닫힘 애니메이션 완료 후 DOM unmount (BottomSheet와 동일 패턴)

#### 레이아웃
```
fixed inset-0 z-50
backdrop: bg-dimmed-regular
panel:
  bg-surface rounded-2xl
  flex flex-col
  max-h-[90vh] (fullscreen 제외)
  [header] px-5 pt-5 pb-4 — flex justify-between items-start
  [content] px-5 pb-5 overflow-y-auto flex-1
  [footer] px-5 pb-5 — flex gap-2 justify-end
```

### Acceptance Criteria

- [ ] open prop 변경 시 fade 애니메이션으로 열리고 닫힘
- [ ] 4가지 size 정확한 너비로 렌더링
- [ ] header/children/footer 슬롯 조합 동작
- [ ] X버튼 클릭 → onClose 호출
- [ ] 배경(backdrop) 클릭 → closeOnBackdropClick일 때 onClose
- [ ] Escape 키 → closeOnEscape일 때 onClose
- [ ] 포커스 트랩 — Overlay 안에서만 Tab 이동, Shift+Tab 역방향
- [ ] 열릴 때 첫 번째 포커스 가능 요소로 포커스 이동
- [ ] 닫힐 때 트리거 요소로 포커스 복귀
- [ ] body scroll lock (overflow: hidden)
- [ ] createPortal로 document.body에 마운트
- [ ] role="dialog", aria-modal="true", aria-labelledby 적용

### Affected Files

| 파일 | 역할 |
|------|------|
| `src/components/Overlay/Overlay.tsx` | 메인 컴포넌트 |
| `src/components/Overlay/useFocusTrap.ts` | 포커스 트랩 커스텀 훅 |
| `src/components/Overlay/types.ts` | 타입 정의 |
| `src/components/Overlay/index.ts` | 배럴 익스포트 |
| `src/app/overlay/page.tsx` | 프리뷰 페이지 |
| `src/app/globals.css` | scale-in 키프레임 확인 (이미 있으면 재사용) |

### Implementation Steps

1. `types.ts` — OverlaySize, OverlayProps 정의
2. `useFocusTrap.ts` — 포커스 가능 요소 선택자로 목록 추출, Tab/Shift+Tab 키 인터셉트, 첫 요소 자동 포커스
3. `Overlay.tsx` — `'use client'` 선언
   - mounted + rendered 두 상태로 portal/animation 제어 (BottomSheet 패턴 동일)
   - ESC 키 이벤트 리스너
   - body scroll lock
   - createPortal(content, document.body)
4. 딤드 backdrop — click handler + pointer-events 제어
5. 패널 — role="dialog" aria-modal aria-labelledby
6. Size 클래스 룩업테이블
7. 닫기 애니메이션 — open 변경 감지, 150ms 후 rendered=false
8. 프리뷰 페이지 — 4가지 size, 슬롯 조합 (제목만/제목+액션/커스텀헤더), 포커스트랩 데모

### Reusable Components

| 컴포넌트 | 출처 | 용도 |
|----------|------|------|
| `IconButton` | `@/components/Button` | 헤더 닫기 버튼 |
| `Close` | `@/components/Icons/Close` | 닫기 아이콘 |
| `ActionButton` | `@/components/Button` | footer CTA 예시(프리뷰) |
| `TextButton` | `@/components/Button` | footer 취소 버튼 예시(프리뷰) |

### Accessibility

- `role="dialog"`, `aria-modal="true"` — 스크린리더에 모달 컨텍스트 전달
- `aria-labelledby` — title 있을 때 헤더 id 연결, 없을 때 `aria-label` prop 사용
- 포커스 트랩 — `useFocusTrap` 훅으로 Tab 순환 구현
- 열릴 때 첫 번째 포커스 가능 요소(또는 패널 자체)로 포커스 이동
- 닫힐 때 Overlay를 열었던 트리거 요소로 포커스 복귀 (`triggerRef` 저장)
- body 스크롤 잠금 중 배경에 `aria-hidden="true"` 적용

### Dependencies

- 신규 패키지 없음 (ReactDOM.createPortal 기본 제공)

---

## globals.css 추가 필요 사항

### @theme inline 추가 토큰 (누락 시에만)

```css
/* Bottom Tab Bar safe area */
--color-tab-bar-bg: var(--bg-elevated);
```

### @keyframes 추가 (spec-components-15.md와 중복 시 생략)

```css
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

globals.css에 이미 해당 keyframe이 정의된 경우 중복 추가하지 않는다.

---

## design-system.md Core Widgets 등록 대상 (구현 완료 후)

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| Avatar | `@/components/Avatar` | 사용자 프로필 이미지 (이미지/이니셜/아이콘 fallback, 상태 dot) | size, shape, src, alt, initials, status, aria-label |
| ListCell | `@/components/ListCell` | 리스트 아이템 단위 (leading icon/avatar, title, subtitle, trailing 5종) | title, subtitle, leadingIcon, leadingAvatar, trailingType, trailingIcon, trailingText, switchChecked, trailingBadge, onClick, showDivider, disabled |
| Card | `@/components/Card` | 콘텐츠 그룹화 컨테이너 (elevated/outlined/filled, header/content/footer 슬롯) | variant, header, children, footer, onClick, disabled, noPadding |
| BottomTabBar | `@/components/BottomTabBar` | 모바일 하단 네비게이션 (3~5탭, 배지, safe area) | items, activeKey, onChange, safeAreaBottom |
| Overlay | `@/components/Overlay` | Modal/Dialog (포커스 트랩, 4가지 크기, 3가지 닫기 수단) | open, onClose, size, title, showCloseButton, header, children, footer, closeOnBackdropClick, closeOnEscape |

---

## 미리보기 경로

| 컴포넌트 | 경로 |
|----------|------|
| Avatar | `/avatar` |
| List Cell | `/list-cell` |
| Card | `/card` |
| Bottom Tab Bar | `/bottom-tab-bar` |
| Overlay | `/overlay` |
