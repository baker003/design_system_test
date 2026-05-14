export interface LoadingSpinnerProps {
  /** 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 색상 */
  color?: 'primary' | 'white' | 'current';
  /** 전체 화면 오버레이 모드 */
  overlay?: boolean;
  /** overlay 시 딤 배경 표시 */
  overlayDimmed?: boolean;
  /** 스크린리더 레이블 */
  label?: string;
  /** 추가 클래스 */
  className?: string;
}

export interface ProgressBarProps {
  /** 진행률 0–100 (determinate 모드) */
  value?: number;
  /** 모드 */
  mode?: 'determinate' | 'indeterminate';
  /** 높이 */
  size?: 'sm' | 'md' | 'lg';
  /** 채움 색상 */
  color?: 'primary' | 'positive' | 'caution' | 'negative';
  /** 트랙 색상 */
  trackColor?: 'default' | 'transparent';
  /** 모서리 둥글기 */
  rounded?: boolean;
  /** 접근성 레이블 */
  'aria-label'?: string;
  /** 접근성 레이블 참조 */
  'aria-labelledby'?: string;
  /** 추가 클래스 */
  className?: string;
}
