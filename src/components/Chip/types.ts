export type ChipType = 'outlined' | 'filled';
export type ChipSize = 'lg' | 'md' | 'sm' | 'xs';

export interface ChipProps {
  /** 칩 배경 스타일 */
  type?: ChipType;
  /** 크기 */
  size?: ChipSize;
  /** 선택 상태 */
  selected?: boolean;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 왼쪽 아이콘 표시 여부 */
  showLeadingIcon?: boolean;
  /** 오른쪽 아이콘 표시 여부 */
  showTrailingIcon?: boolean;
  /** NEW 뱃지 표시 여부 */
  showNewBadge?: boolean;
  /** 왼쪽 아이콘 (ReactNode) */
  leadingIcon?: React.ReactNode;
  /** 오른쪽 아이콘 (ReactNode) */
  trailingIcon?: React.ReactNode;
  /** 라벨 텍스트 */
  children?: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 추가 className */
  className?: string;
}
