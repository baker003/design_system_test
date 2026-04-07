'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { IconButtonProps, ButtonSize, IconButtonType } from './types';

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'w-8 h-8 rounded-lg [&>svg]:w-4 [&>svg]:h-4',
  sm: 'w-9 h-9 rounded-lg [&>svg]:w-5 [&>svg]:h-5',
  md: 'w-10 h-10 rounded-[10px] [&>svg]:w-5 [&>svg]:h-5',
  lg: 'w-12 h-12 rounded-xl [&>svg]:w-6 [&>svg]:h-6',
  xl: 'w-14 h-14 rounded-xl [&>svg]:w-6 [&>svg]:h-6',
};

const typeClasses: Record<IconButtonType, string> = {
  fill: 'bg-gray-200 hover:brightness-95',
  outline: 'bg-transparent border border-border hover:bg-pressed-dark-weak',
  ghost: 'bg-transparent hover:bg-pressed-dark-weak',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      size = 'md',
      shape = 'square',
      type = 'ghost',
      disabled = false,
      icon,
      'aria-label': ariaLabel,
      onClick,
      className,
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        onClick={disabled ? undefined : onClick}
        className={clsx(
          'inline-flex items-center justify-center',
          'text-text-primary',
          'transition-transform duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2',
          'disabled:pointer-events-none',
          sizeClasses[size],
          shape === 'circle' && 'rounded-full',
          typeClasses[type],
          disabled && 'text-text-disabled opacity-40',
          !disabled && 'active:scale-[0.96]',
          className,
        )}
      >
        {icon}
      </button>
    );
  },
);
