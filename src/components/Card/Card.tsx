'use client';

import type { CardProps } from './types';

const variantClasses: Record<string, string> = {
  elevated: 'bg-surface shadow-sm',
  outlined: 'bg-surface border border-border',
  filled: 'bg-background',
};

export function Card({
  variant = 'elevated',
  header,
  children,
  footer,
  onClick,
  disabled = false,
  noPadding = false,
  'aria-label': ariaLabel,
  className = '',
}: CardProps) {
  const baseClasses = [
    'rounded-2xl overflow-hidden w-full text-left',
    variantClasses[variant],
    className,
  ].join(' ');

  const interactiveClasses = onClick
    ? [
        'transition-all duration-150 cursor-pointer',
        'hover:brightness-95',
        'active:scale-[0.99] active:brightness-95',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-primary-regular focus-visible:ring-offset-2',
        disabled ? 'opacity-40 pointer-events-none' : '',
      ].join(' ')
    : '';

  const contentPadding = noPadding ? 'p-0' : 'p-4';
  const headerPadding = noPadding ? 'px-0 py-0' : 'p-4';

  const inner = (
    <>
      {header !== undefined && (
        <div className={`${headerPadding} border-b border-border`}>
          {header}
        </div>
      )}
      <div className={contentPadding}>{children}</div>
      {footer !== undefined && (
        <div className={`${noPadding ? 'px-0 py-0' : 'px-4 py-3'} border-t border-border`}>
          {footer}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={`${baseClasses} ${interactiveClasses}`}
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {inner}
    </div>
  );
}
