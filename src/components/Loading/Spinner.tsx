'use client';

import { createPortal } from 'react-dom';
import type { LoadingSpinnerProps } from './types';

const sizeClasses: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

const colorClasses: Record<NonNullable<LoadingSpinnerProps['color']>, string> = {
  primary: 'text-primary-regular',
  white: 'text-on-primary',
  current: '',
};

function SpinnerIcon({
  size = 'md',
  color = 'current',
  className = '',
}: Pick<LoadingSpinnerProps, 'size' | 'color' | 'className'>) {
  return (
    <svg
      className={[
        'animate-spin',
        sizeClasses[size],
        colorClasses[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LoadingSpinner({
  size = 'md',
  color = 'current',
  overlay = false,
  overlayDimmed = true,
  label = '로딩 중',
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <span role="status" aria-label={label}>
      <SpinnerIcon size={size} color={color} className={className} />
    </span>
  );

  if (!overlay) {
    return spinner;
  }

  const overlayContent = (
    <div
      className={[
        'fixed inset-0 z-[9999] flex items-center justify-center',
        overlayDimmed ? 'bg-dimmed' : 'bg-transparent',
      ].join(' ')}
      aria-live="polite"
    >
      <span role="status" aria-label={label}>
        <SpinnerIcon size={size} color={color} />
      </span>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(overlayContent, document.body);
}
