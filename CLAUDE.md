# 반납지 찾기

## Project Overview
지도를 이동하여 차량 반납 위치를 설정하고, 내비게이션으로 바로 연결할 수 있는 모바일 서비스.
카셰어링/렌터카 이용자를 위한 서비스로, 반납 가능 영역(현 위치 반경 1km) 내에서 반납지를 설정할 수 있다.

## Default Workflow
새로운 기능에 대한 요청을 받으면 항상 `pipeline` 스킬을 실행하여 작업을 진행합니다.
PM -> (승인) -> Designer -> (승인) -> Frontend -> Reviewer

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Language: TypeScript
- Design System: SOCAR FRAME 2.0 기반

## Architecture

### Next.js App Router 구조
- `src/app/` -- 라우트 및 페이지
- `src/components/` -- 재사용 컴포넌트
- `src/lib/` -- 유틸리티
- `src/types/` -- TypeScript 타입 정의

### Layer Rules
- Server Component 기본, 'use client' 최소화
- Presentation -> Logic -> Data 방향으로만 의존
- 페이지에서 외부 서비스 직접 호출 지양 -- lib/ 레이어를 통해 접근

## Development Commands
- `npm run dev` -- 개발 서버
- `npm run build` -- 프로덕션 빌드
- `npm run lint` -- ESLint 실행

## Coding Conventions

### Next.js
- App Router 파일 컨벤션 준수 (layout.tsx, page.tsx, loading.tsx, error.tsx)
- Server Component에서 데이터 fetching, Client Component는 인터랙션만
- Server Actions 활용 (form 처리, mutation)

### Tailwind CSS (v4)
- 시맨틱 컬러 토큰만 사용 (bg-background, bg-surface, text-primary 등)
- 색상 하드코딩 금지 (bg-[#xxx], text-blue-500 등 금지)
- tailwind.config.ts 생성 금지 -- Tailwind v4는 globals.css의 @theme inline으로 설정
- 스페이싱/레디어스는 Tailwind 기본값 사용

### Mobile First
- 이 서비스는 모바일 전용입니다
- 모바일 뷰포트(375px~430px) 기준으로 구현
- 터치 인터랙션 우선 고려

### File Size Limits
- 파일당 ~300줄 권장, 초과 시 컴포넌트 추출
- 메서드 ~50줄 초과 시 분리 검토

## Design System Rules
- 색상/타이포 하드코딩 금지
- Core Widgets 우선 사용
- Tailwind v4: globals.css의 @theme inline으로 설정 (tailwind.config.ts 사용 금지)
- **동기화 규칙**: 토큰이나 위젯을 변경하면 `.claude/doc/design-system.md`와 `src/app/globals.css`를 반드시 함께 업데이트
- 상세: .claude/doc/design-system.md

## Figma Workflow
- 코드 구현 전 Figma에 먼저 디자인을 그려서 사용자에게 보여주기
- 작업 파일: https://www.figma.com/design/YT6pcmXXxEftnvfsiQHXES/
- 작업 위치: "🚧 베이커의 방" (node-id=1-50)
- 디자인 시스템: SOCAR FRAME 2.0

## Agent Configuration
- 에이전트: PM, Designer, Frontend-dev, Reviewer
- 파이프라인: pipeline 스킬이 조율 (메인 컨텍스트에서 실행되어 에이전트 호출 가능)
