import type { FeedbackType } from './types';

interface FeedbackIconProps {
  type: FeedbackType;
  className?: string;
}

const iconColorMap: Record<FeedbackType, string> = {
  info: 'text-status-info',
  success: 'text-status-positive',
  warning: 'text-status-caution',
  error: 'text-status-negative',
};

export default function FeedbackIcon({ type, className = '' }: FeedbackIconProps) {
  const colorClass = iconColorMap[type];
  const base = `flex-shrink-0 w-5 h-5 ${colorClass} ${className}`;

  if (type === 'info') {
    return (
      <span className={base} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
        </svg>
      </span>
    );
  }

  if (type === 'success') {
    return (
      <span className={base} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 10l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (type === 'warning') {
    return (
      <span className={base} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="14" r="0.75" fill="currentColor" />
        </svg>
      </span>
    );
  }

  // error
  return (
    <span className={base} aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
