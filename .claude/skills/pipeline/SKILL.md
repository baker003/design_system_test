---
name: pipeline
description: 사용자의 기능 요청을 받아 에이전트 팀(PM → Designer → Frontend → Reviewer)을 순서대로 조율하는 Pipeline Orchestrator
trigger: 새로운 기능 개발, 기능 요청, 기능 추가, "OO 만들어줘", "OO 기능 추가해줘" 등의 요청 시
---

# Pipeline Orchestrator

사용자의 기능 요청을 받아 에이전트 팀을 순서대로 조율합니다.

## 참조 문서
- `.claude/doc/project-brief.md` -- 서비스 정의
- `.claude/doc/tech-spec.md` -- 기술 스택
- `.claude/doc/design-system.md` -- 디자인 시스템

## 파이프라인 플로우

사용자의 기능 요청을 아래 6단계로 처리하세요. 각 단계를 순서대로 실행하세요.

### [1] Project Manager
Agent 도구로 `project-manager` 에이전트를 호출하세요.
- 사용자의 기능 요청을 전달하세요
- PM이 기능 명세를 작성하여 반환합니다
- 완료 후 보고: `"[1/6] PM 완료 -- {기능 명세 요약}"`

### [2] PM 승인 게이트
PM의 기능 명세를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [3]으로 진행
- **수정 요청** → 수정사항을 포함하여 PM 에이전트를 다시 호출한 후, 다시 승인 요청

### [3] Designer
Agent 도구로 `designer` 에이전트를 호출하세요.
- PM의 승인된 기능 명세를 전달하세요
- Designer가 화면 설계(Layout, Component Tree, States)를 작성하여 반환합니다
- 완료 후 보고: `"[3/6] Designer 완료 -- {디자인 계획 요약}"`

### [4] Designer 승인 게이트
디자인 계획을 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [5]로 진행
- **수정 요청** → 수정사항을 포함하여 Designer 에이전트를 다시 호출한 후, 다시 승인 요청

### [5] Frontend
Agent 도구로 `frontend-dev` 에이전트를 호출하세요.
- Designer의 승인된 디자인 계획을 전달하세요
- Frontend-dev가 코드를 구현합니다
- 완료 후 보고: `"[5/6] Frontend 완료 -- {구현 요약}"`

### [6] Reviewer
Agent 도구로 `reviewer` 에이전트를 호출하세요.
- Frontend-dev가 구현한 코드를 리뷰합니다
- **APPROVED** → 파이프라인 완료
- **CHANGES_REQUESTED** → 이슈 목록을 포함하여 `frontend-dev` 에이전트에게 수정 요청 후 재리뷰 (최대 3라운드)
- 3라운드 초과 시 남은 이슈 목록과 함께 사용자에게 에스컬레이션
- 완료 후 보고: `"[6/6] Reviewer 완료 -- {리뷰 결과}"`

## 완료 보고

모든 단계 완료 후 사용자에게 최종 요약을 보고하세요:
- 구현된 기능 요약
- 생성/변경된 파일 목록
- `npm run dev`로 확인 가능함을 안내
