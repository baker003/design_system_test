import type { ReactNode } from 'react';

export type OverlaySize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface OverlayProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 패널 크기 */
  size?: OverlaySize;
  /** 헤더 제목 */
  title?: string;
  /** X 버튼 표시 여부 */
  showCloseButton?: boolean;
  /** 커스텀 헤더 슬롯 (title 대체) */
  header?: ReactNode;
  /** 본문 콘텐츠 */
  children?: ReactNode;
  /** 액션 버튼 슬롯 */
  footer?: ReactNode;
  /** backdrop 클릭 시 닫기 */
  closeOnBackdropClick?: boolean;
  /** Escape 키 닫기 */
  closeOnEscape?: boolean;
  /** title 없을 때 접근성 레이블 */
  'aria-label'?: string;
  /** 패널 추가 클래스 */
  className?: string;
}
