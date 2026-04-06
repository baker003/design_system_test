# 반납지 찾기 Design System Reference

## 1. Core Widgets Inventory

| Widget | Import Path | Use For | Key Props |
|--------|-------------|---------|-----------|
| (개발 진행 시 등록) | | | |

> 새 위젯을 만들기 전에 이 표를 먼저 확인하세요.
> 새로 만든 재사용 위젯은 반드시 여기에 등록하세요.

## 2. Color Tokens

### Brand 팔레트

SOCAR Blue (#00B8FF)를 500 기준으로 확장한 팔레트:

```css
:root {
  --brand-50: #E5F7FF; --brand-100: #B3EAFF; --brand-200: #80DDFF; --brand-300: #4DD0FF;
  --brand-400: #26C5FF; --brand-500: #00B8FF; --brand-600: #00A3E6; --brand-700: #0082B8;
  --brand-800: #00618A; --brand-900: #00405C;
}
```

### Gray 선택

`neutral` -- 모던/클린 느낌에 적합한 무채색 기반 Gray.
Semantic Tokens에서 `var(--color-neutral-{단계})` 형태로 참조합니다.

### Status 컬러

Tailwind v4 기본 팔레트를 그대로 사용합니다.
모던/클린 느낌에 따라 라이트 모드 500, 다크 모드 400 단계를 참조합니다.

### Semantic Tokens

Semantic 토큰은 Brand 변수 또는 Tailwind 기본 컬러 변수를 참조 — 직접 색상값(HEX) 금지.
Light/Dark 테마 분기는 Semantic 레이어에서만 처리합니다.

```css
/* Semantic — Light (기본) */
:root {
  --background: var(--color-neutral-50);
  --surface: var(--color-white);
  --primary: var(--brand-500);
  --primary-hover: var(--brand-600);
  --secondary: var(--color-neutral-100);
  --secondary-hover: var(--color-neutral-200);
  --foreground: var(--color-neutral-900);
  --border: var(--color-neutral-200);
  --ring: var(--brand-300);
  --error: var(--color-red-500);
  --warning: var(--color-yellow-500);
  --success: var(--color-green-500);
  --destructive: var(--color-red-600);
  --muted: var(--color-neutral-500);
}

/* Semantic — Dark */
.dark {
  --background: var(--color-neutral-900);
  --surface: var(--color-neutral-800);
  --primary: var(--brand-400);
  --primary-hover: var(--brand-300);
  --secondary: var(--color-neutral-800);
  --secondary-hover: var(--color-neutral-700);
  --foreground: var(--color-neutral-100);
  --border: var(--color-neutral-700);
  --ring: var(--brand-500);
  --error: var(--color-red-400);
  --warning: var(--color-yellow-400);
  --success: var(--color-green-400);
  --destructive: var(--color-red-500);
  --muted: var(--color-neutral-400);
}
```

### 시맨틱 토큰 용도 가이드

| CSS 변수 | Tailwind 클래스 | 용도 |
|----------|----------------|------|
| --background | bg-background | 페이지 전체 배경 |
| --surface | bg-surface | 카드, 모달, 바텀시트 등 올라온 영역 |
| --primary | bg-primary, text-primary | 주요 버튼, 강조 텍스트, 링크 |
| --primary-hover | hover:bg-primary-hover | 주요 버튼 호버 |
| --secondary | bg-secondary | 보조 버튼, 덜 강조된 액션 |
| --secondary-hover | hover:bg-secondary-hover | 보조 버튼 호버 |
| --foreground | text-foreground | 본문 텍스트 |
| --border | border-border | 구분선, 입력 필드 테두리 |
| --ring | ring-ring | 포커스 링 |
| --error | text-error, bg-error | 에러 메시지, 유효성 검증 실패 |
| --warning | text-warning, bg-warning | 경고 상태 |
| --success | text-success, bg-success | 성공 상태 |
| --destructive | bg-destructive | 삭제 버튼, 위험한 액션 |
| --muted | text-muted | 보조 텍스트, 힌트, 플레이스홀더 |

> 위 토큰으로 부족한 경우 필요에 따라 추가할 수 있습니다. 추가 시 design-system.md와 globals.css를 함께 업데이트하세요.

## 3. Typography

Tailwind v4의 기본 `--font-sans` (System Font Stack)을 그대로 사용합니다.
별도의 폰트 설정이나 외부 폰트 로딩이 필요 없습니다.

## 4. Tailwind 테마 등록 (Tailwind v4)

Tailwind v4는 `tailwind.config.ts` 없이 CSS에서 직접 테마를 등록합니다.
`globals.css`에 `@theme inline` 블록을 추가하여 시맨틱 CSS 변수를 Tailwind 유틸리티 클래스로 매핑합니다:

```css
@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-secondary: var(--secondary);
  --color-secondary-hover: var(--secondary-hover);
  --color-foreground: var(--foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-error: var(--error);
  --color-warning: var(--warning);
  --color-success: var(--success);
  --color-destructive: var(--destructive);
  --color-muted: var(--muted);
}
```

## 5. 금지사항
- 색상 하드코딩 금지 -- 반드시 시맨틱 토큰(Tailwind 클래스) 사용
- `bg-[#FF0000]` 같은 arbitrary value 금지
- Core Widgets에 등재된 위젯을 중복 구현 금지
- 스페이싱/레디어스는 Tailwind 기본값 사용 (커스텀 토큰 만들지 않음)
- `tailwind.config.ts` 파일 생성 금지 -- Tailwind v4는 CSS 기반 설정만 사용

## 6. Figma 참조

### 디자인 시스템
- SOCAR FRAME 2.0: https://www.figma.com/design/9BojhdnvhQSi1wpWpLwPnH/SOCAR-FRAME-2.0-V.0.0.21~/

### 작업 파일
- 반납 장소 변경 퍼널: https://www.figma.com/design/YT6pcmXXxEftnvfsiQHXES/
- 디자인 작업 위치: "🚧 베이커의 방" (node-id=1-50)
- 워크플로우: 코드 구현 전 Figma에 먼저 디자인 → 승인 → 코딩
