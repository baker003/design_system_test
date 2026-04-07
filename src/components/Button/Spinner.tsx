import clsx from 'clsx';
import type { SpinnerProps } from './types';

const sizeClasses: Record<string, string> = {
  xs: 'w-4 h-4',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <svg
      className={clsx('animate-spin', sizeClasses[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
