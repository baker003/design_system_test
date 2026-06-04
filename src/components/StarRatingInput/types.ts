export interface StarRatingInputProps {
  /** 현재 선택된 별점 (1~5, null=미선택) */
  value: number | null;
  /** 별점 선택 콜백 */
  onChange: (rating: number) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 (미선택 제출 시도) */
  error?: boolean;
  /** 컨테이너 role="radiogroup" aria-label */
  'aria-label'?: string;
  /** 추가 className */
  className?: string;
}
