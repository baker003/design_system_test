---
name: pipeline
description: "OO 만들어줘", "OO 추가해줘", "OO 컴포넌트 구현해줘" 같은 새 컴포넌트/기능 요청을 받아 Memory Read→PM→Designer→Frontend→Reviewer→Memory Write 순으로 에이전트 팀을 조율합니다. 단순 수정이나 버그 픽스에는 사용하지 마세요.
argument-hint: "[컴포넌트/기능 요청]"
---

# Pipeline Orchestrator

사용자의 컴포넌트/기능 요청을 받아 에이전트 팀을 순서대로 조율합니다.
파이프라인은 과거 결정을 먼저 읽고(Memory Read), 작업을 수행한 뒤, 이번 결정을 남기며(Memory Write) 끝납니다.

## 참조 문서
- `.claude/doc/project-brief.md` -- 서비스 정의
- `.claude/doc/tech-spec.md` -- 기술 스택
- `.claude/doc/design-system.md` -- 디자인 시스템

## 메모리 저장소
- `.claude/memory/principles.md` -- 반복된 결정에서 승격된 도메인별 원칙 (Memory Read에서 주입, Memory Write에서 승격)
- `.claude/memory/decision-log.jsonl` -- 작업별 핵심 결정 누적 로그 (한 줄 = 결정 하나)

## 파이프라인 플로우

### [1] Memory Read
코드를 작성하기 전에, 과거의 결정을 먼저 읽어 컨텍스트에 주입합니다.
- `.claude/memory/principles.md`를 읽어 누적된 원칙 전체를 로드하세요. (파일이 없으면 건너뜀)
- `.claude/memory/decision-log.jsonl`에서 이번 요청과 관련된 항목을 찾으세요. 매칭 기준: 요청에 등장하는 도메인/컴포넌트 키워드가 로그의 `domain` 또는 `component` 또는 `topic`에 포함되는 항목. (파일이 없거나 매칭이 없으면 건너뜀)
- 로드한 원칙과 관련 결정을 **요약하여 이후 모든 단계(특히 PM·Designer)에 함께 전달**하세요. 이들은 이 요청에서 기본값으로 따라야 할 제약입니다.
- 완료 후 보고: `"[1/8] Memory Read 완료 -- 적용 원칙 {N}건, 참고 결정 {M}건"`

### [2] Project Manager
Agent 도구로 `project-manager` 에이전트를 호출하세요.
- 사용자의 요청 + Memory Read에서 로드한 원칙·관련 결정을 함께 전달하세요
- PM이 컴포넌트/기능 명세를 작성하여 반환합니다
- 완료 후 보고: `"[2/8] PM 완료 -- {명세 요약}"`

### [3] PM 승인 게이트
PM의 명세를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [4]으로 진행
- **수정 요청** → PM 에이전트 재호출

### [4] Designer
Agent 도구로 `designer` 에이전트를 호출하세요.
- PM의 승인된 명세 + Memory Read의 원칙을 전달하세요
- Designer가 컴포넌트 설계를 작성하여 반환합니다
- 완료 후 보고: `"[4/8] Designer 완료 -- {설계 요약}"`

### [5] Designer 승인 게이트
설계를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [6]으로 진행
- **수정 요청** → Designer 에이전트 재호출

### [6] Frontend
Agent 도구로 `frontend-dev` 에이전트를 호출하세요.
- Designer의 승인된 설계를 전달하세요
- Frontend-dev가 코드를 구현합니다
- **아이콘 작업이 포함된 경우**: `icon-designer` 에이전트를 별도로 호출하여 아이콘을 그리게 하세요 (general-purpose 에이전트로 아이콘을 직접 그리지 않음)
- 완료 후 보고: `"[6/8] Frontend 완료 -- {구현 요약}"`

### [7] Reviewer
Agent 도구로 `reviewer` 에이전트를 호출하세요.
- Frontend-dev가 구현한 코드를 리뷰합니다
- **APPROVED** → [8]로 진행
- **CHANGES_REQUESTED** → frontend-dev에게 수정 요청 후 재리뷰 (최대 3라운드)
- 완료 후 보고: `"[7/8] Reviewer 완료 -- {리뷰 결과}"`

### [8] Memory Write
이번 작업에서 내려진 핵심 결정을 메모리에 남깁니다.
- 이번 파이프라인에서 실제로 내려진 **설계·구현 결정**을 추출하세요. 추출 대상 예: 컴포넌트 선택, 색상/토큰 선택, 레이아웃 방식, 상태 처리 방식, 승인 게이트에서 사용자가 교정한 내용.
- 각 결정을 아래 형식의 JSON 한 줄로 `.claude/memory/decision-log.jsonl`에 **append**하세요 (기존 내용 덮어쓰기 금지):
  `{"date":"YYYY-MM-DD","domain":"{도메인}","component":"{컴포넌트명}","topic":"{결정 주제}","decision":"{무엇을 결정했는지}","rationale":"{왜}"}`
- **원칙 승격 검사**: 같은 `topic`에 대한 동일한 `decision`이 decision-log 전체에서 **3회 이상** 반복되면, 이를 `principles.md`에 원칙으로 승격할 후보로 사용자에게 제안하세요. 사용자가 승인하면 `principles.md`의 해당 도메인 섹션에 추가하세요. (사용자 승인 없이 principles.md를 수정하지 않음)
- 완료 후 보고: `"[8/8] Memory Write 완료 -- 기록 {K}건, 승격 제안 {P}건"`

## Figma 반영 (선택, 사용자 요청 시만)

Figma 반영은 사용자가 명시적으로 요청한 경우에만 진행합니다. 요청이 없으면 건너뜁니다.

### Figma 사전 조사 (figma-sync 호출 전 오케스트레이터 직접 실행)

**① 기존 컴포넌트 확인**
`mcp__figma__get_figma_data`로 파일 내 페이지 목록을 읽어 동일 이름 페이지가 있는지 확인한다.
- 이미 있으면 → 해당 node ID 추출 → figma-sync에 "기존 노드 업데이트" 모드로 전달
- 없으면 → 신규 생성 모드

**② 레퍼런스 노드 구조 읽기 (신규 생성 시)**
기존 컴포넌트 섹션 1개를 읽어 문서 프레임 구조(크기, 여백, 텍스트 스타일)를 추출하고 figma-sync 프롬프트에 포함한다.

**③ 사용할 아이콘 키 확인**
컴포넌트에 필요한 아이콘 키를 사전에 파악해 프롬프트에 명시한다.

**④ 관련 DS2 컴포넌트 키 확인**
인스턴스로 배치할 DS2 컴포넌트(Button, Chip 등)가 있으면 해당 ComponentSet 키를 파악해 프롬프트에 포함한다.

### Figma 반영 — 컴포넌트 1개 = 에이전트 1개

**에이전트 1개에 여러 컴포넌트를 묶지 않는다.**

각 figma-sync 에이전트 호출 시 프롬프트에 반드시 포함:
- 대상 node ID (부모 섹션 또는 페이지)
- 배치 좌표 (x, y)
- 레퍼런스 노드 구조 수치
- 사용할 아이콘 키
- 사용할 DS2 컴포넌트 키 (있는 경우)

## 완료 보고
모든 단계 완료 후 사용자에게 최종 요약:
- 구현된 컴포넌트/기능 요약
- 생성/변경된 파일 목록
- 이번 작업에서 기록된 결정 / 승격 제안된 원칙 (있다면)
- `npm run dev`로 확인 가능함을 안내
