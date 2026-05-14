import type { PageControlProps } from './types';

export function PageControl({
  total,
  current,
  size = 'medium',
  alternative = false,
  className = '',
}: PageControlProps) {
  if (total <= 0) return null;

  const isMedium = size === 'medium';

  const containerClass = isMedium
    ? 'inline-flex items-center h-[34px] typo-label1'
    : 'inline-flex items-center h-[24px] typo-label2';

  const currentClass = alternative
    ? 'text-text-secondary'
    : 'text-text-strong font-semibold';

  const sepTotalClass = 'text-text-secondary';

  return (
    <span
      className={`${containerClass} ${className}`}
      aria-label={`현재 ${current}페이지, 전체 ${total}페이지`}
    >
      <span className={currentClass}>{current}</span>
      <span className={sepTotalClass}>&nbsp;/&nbsp;</span>
      <span className={sepTotalClass}>{total}</span>
    </span>
  );
}
