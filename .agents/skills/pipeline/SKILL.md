---
name: pipeline
description: "OO 만들어줘", "OO 추가해줘", "OO 컴포넌트 구현해줘" 같은 새 컴포넌트/기능 요청을 받아 PM→Designer→Frontend→Reviewer→Figma 순으로 에이전트 팀을 조율합니다. 단순 수정이나 버그 픽스에는 사용하지 마세요.
argument-hint: "[컴포넌트/기능 요청]"
---

# Pipeline Orchestrator

사용자의 컴포넌트/기능 요청을 받아 에이전트 팀을 순서대로 조율합니다.

## 참조 문서
- `.Codex/doc/project-brief.md` -- 서비스 정의
- `.Codex/doc/tech-spec.md` -- 기술 스택
- `.Codex/doc/design-system.md` -- 디자인 시스템

## 파이프라인 플로우

### [1] Project Manager
Agent 도구로 `project-manager` 에이전트를 호출하세요.
- 사용자의 요청을 전달하세요
- PM이 컴포넌트/기능 명세를 작성하여 반환합니다
- 완료 후 보고: `"[1/6] PM 완료 -- {명세 요약}"`

### [2] PM 승인 게이트
PM의 명세를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [3]으로 진행
- **수정 요청** → PM 에이전트 재호출

### [3] Designer
Agent 도구로 `designer` 에이전트를 호출하세요.
- PM의 승인된 명세를 전달하세요
- Designer가 컴포넌트 설계를 작성하여 반환합니다
- 완료 후 보고: `"[3/6] Designer 완료 -- {설계 요약}"`

### [4] Designer 승인 게이트
설계를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → [5]로 진행
- **수정 요청** → Designer 에이전트 재호출

### [5] Frontend
Agent 도구로 `frontend-dev` 에이전트를 호출하세요.
- Designer의 승인된 설계를 전달하세요
- Frontend-dev가 코드를 구현합니다
- **아이콘 작업이 포함된 경우**: `icon-designer` 에이전트를 별도로 호출하여 아이콘을 그리게 하세요 (general-purpose 에이전트로 아이콘을 직접 그리지 않음)
- 완료 후 보고: `"[5/6] Frontend 완료 -- {구현 요약}"`

### [6] Reviewer
Agent 도구로 `reviewer` 에이전트를 호출하세요.
- Frontend-dev가 구현한 코드를 리뷰합니다
- **APPROVED** → [7]로 진행
- **CHANGES_REQUESTED** → frontend-dev에게 수정 요청 후 재리뷰 (최대 3라운드)
- 완료 후 보고: `"[6/8] Reviewer 완료 -- {리뷰 결과}"`

### [6.5] Figma 사전 조사 (figma-sync 호출 전 필수)

figma-sync 에이전트를 호출하기 **전에** 오케스트레이터가 직접 다음을 수행한다:

**① 기존 컴포넌트 확인**
`mcp__claude_ai_Figma__use_figma`로 파일 내 페이지 목록을 읽어 동일 이름 페이지가 있는지 확인한다:
```js
figma.root.children.map(p => ({ id: p.id, name: p.name }))
```
- 이미 있으면 → 해당 페이지의 node ID를 추출해 figma-sync에 "기존 노드 업데이트" 모드로 전달
- 없으면 → 신규 생성 모드

**② 레퍼런스 노드 구조 읽기 (신규 생성 시)**
기존 컴포넌트 페이지 중 하나를 `get_design_context`로 읽어 문서 프레임 구조(크기, 배경, 텍스트 스타일, 배지 위치 등)를 추출한다.
이 구조 데이터를 figma-sync 에이전트 프롬프트에 포함시켜야 한다.

### [6.5] Figma 사전 조사 (figma-sync 호출 전 오케스트레이터 직접 실행)

figma-sync 에이전트를 호출하기 **전에** 오케스트레이터가 직접 다음을 수행한다:

**① 기존 컴포넌트 확인**
```js
figma.root.children.map(p => ({ id: p.id, name: p.name }))
```
- 이미 있으면 → 해당 node ID 추출 → figma-sync에 "기존 노드 업데이트" 모드로 전달
- 없으면 → 신규 생성 모드

**② 레퍼런스 노드 구조 읽기 (신규 생성 시)**
`get_design_context`로 기존 컴포넌트 섹션 1개를 읽어 문서 프레임 구조(크기, 여백, 텍스트 스타일)를 추출하고 figma-sync 프롬프트에 포함한다.

**③ 사용할 아이콘 키 확인**
컴포넌트에 필요한 아이콘을 figma-sync.md의 아이콘 키 목록에서 찾아 프롬프트에 명시한다. 키 없이 "아이콘 그려라"고 지시하면 회색 박스가 그려진다.

**④ 관련 DS2 컴포넌트 키 확인**
섹션 내 인스턴스로 배치할 DS2 컴포넌트(Button, Chip 등)가 있으면 해당 ComponentSet 키를 파악해 프롬프트에 포함한다.

### [7] Figma 반영 — 컴포넌트 1개 = 에이전트 1개

**에이전트 1개에 여러 컴포넌트를 묶지 않는다.** tool call이 부족해지면 뒤 컴포넌트 품질이 급격히 낮아진다.

각 figma-sync 에이전트 호출 시 프롬프트에 반드시 포함:
- 대상 node ID (부모 섹션 또는 페이지)
- 배치 좌표 (x, y)
- 레퍼런스 노드 구조 수치
- 사용할 아이콘 키
- 사용할 DS2 컴포넌트 키 (있는 경우)

완료 후 보고: `"[7/8] Figma 반영 완료 -- {반영 내용}"`

### [8] Figma 승인 게이트
Figma 반영 결과를 사용자에게 보여주고 승인을 요청하세요.
- **승인** → 파이프라인 완료
- **수정 요청** → Figma 수정 후 재승인

## 완료 보고
모든 단계 완료 후 사용자에게 최종 요약:
- 구현된 컴포넌트/기능 요약
- 생성/변경된 파일 목록
- Figma 반영 내용
- `npm run dev`로 확인 가능함을 안내
