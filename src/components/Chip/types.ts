export type ChipType = 'outlined' | 'filled';
export type ChipSize = 'lg' | 'md' | 'sm' | 'xs';
export type ChipFontStyle = 'title' | 'body';
export type ChipGroupLayout = 'carousel' | 'multiline';

export interface ChipProps {
  /** 칩 배경 스타일 */
  type?: ChipType;
  /** 크기 */
  size?: ChipSize;
  /** 선택 상태 */
  selected?: boolean;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 칩 라벨 텍스트 */
  label: string;
  /** 텍스트 폰트 스타일 -- title(SemiBold) 또는 body(Regular) */
  fontStyle?: ChipFontStyle;
  /** 선택 시 카운트 뱃지 (Selected 상태에서 표시) */
  count?: number;
  /** 왼쪽 아이콘 (ReactNode) */
  leadingIcon?: React.ReactNode;
  /** 왼쪽 아이콘 표시 여부 */
  showLeadingIcon?: boolean;
  /** 오른쪽 아이콘 (ReactNode) */
  trailingIcon?: React.ReactNode;
  /** 오른쪽 아이콘 표시 여부 */
  showTrailingIcon?: boolean;
  /** NEW 뱃지 (빨간 점) 표시 여부 */
  showNewBadge?: boolean;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 추가 className */
  className?: string;
}

export interface ChipGroupProps {
  /** 레이아웃 모드 */
  layout?: ChipGroupLayout;
  /** 칩 간 간격 (px, 최대 12) */
  gap?: number;
  /** 자식 Chip 요소들 */
  children: React.ReactNode;
  /** 추가 className */
  className?: string;
}
