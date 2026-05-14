import type { ReactNode, ChangeEvent } from 'react';

// ─── Checkbox ───────────────────────────────────────────────────────────────

export interface CheckboxProps {
  /** 체크 상태 (controlled) */
  checked?: boolean;
  /** 부분 선택 상태 */
  indeterminate?: boolean;
  /** 기본값 (uncontrolled) */
  defaultChecked?: boolean;
  /** 상태 변경 콜백 */
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /** 비활성 */
  disabled?: boolean;
  /** 라벨 텍스트 */
  label?: ReactNode;
  /** 라벨 위치 */
  labelPlacement?: 'right' | 'left';
  /** 폼 name */
  name?: string;
  /** 폼 value */
  value?: string;
  /** 고유 ID (없으면 useId() 자동 생성) */
  id?: string;
  /** 추가 클래스 */
  className?: string;
}

// ─── Radio ──────────────────────────────────────────────────────────────────

export interface RadioProps {
  /** 그룹에서 현재 선택된 값 (RadioGroupContext 또는 직접 전달) */
  value?: string;
  /** 이 Radio의 값 */
  radioValue: string;
  /** 상태 변경 콜백 */
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  /** 비활성 */
  disabled?: boolean;
  /** 라벨 텍스트 */
  label?: ReactNode;
  /** 라벨 위치 */
  labelPlacement?: 'right' | 'left';
  /** 폼 name (RadioGroup에서 주입) */
  name?: string;
  /** 고유 ID (없으면 useId() 자동 생성) */
  id?: string;
  /** 추가 클래스 */
  className?: string;
}

// ─── RadioGroup ─────────────────────────────────────────────────────────────

export interface RadioGroupProps {
  /** 폼 name (하위 Radio에 전파) */
  name: string;
  /** 선택된 값 (controlled) */
  value?: string;
  /** 기본값 (uncontrolled) */
  defaultValue?: string;
  /** 상태 변경 콜백 */
  onChange?: (value: string) => void;
  /** 방향 */
  orientation?: 'vertical' | 'horizontal';
  /** 전체 비활성 */
  disabled?: boolean;
  /** 접근성 레이블 */
  'aria-label'?: string;
  /** 접근성 레이블 참조 */
  'aria-labelledby'?: string;
  /** Radio 컴포넌트들 */
  children: ReactNode;
  /** 추가 클래스 */
  className?: string;
}

/** RadioGroup이 하위 Radio에 주입하는 Context 값 */
export interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

// ─── Toggle ─────────────────────────────────────────────────────────────────

export interface ToggleProps {
  /** on 여부 (controlled) */
  checked?: boolean;
  /** 기본값 (uncontrolled) */
  defaultChecked?: boolean;
  /** 상태 변경 콜백 */
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  /** 비활성 */
  disabled?: boolean;
  /** 라벨 텍스트 */
  label?: ReactNode;
  /** 라벨 위치 */
  labelPlacement?: 'right' | 'left';
  /** 크기 */
  size?: 'sm' | 'md';
  /** 폼 name */
  name?: string;
  /** 고유 ID (없으면 useId() 자동 생성) */
  id?: string;
  /** 추가 클래스 */
  className?: string;
}
