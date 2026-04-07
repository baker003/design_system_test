'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { TextButtonProps, ButtonSize, TextButtonVariant } from './types';

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'h-8 text-[12px] leading-[18px] font-medium rounded-lg',
  sm: 'h-9 text-[13px] leading-[20px] font-semibold rounded-lg',
  md: 'h-10 text-[14px] leading-[22px] font-semibold rounded-[10px]',
  lg: 'h-12 text-[16px] leading-[24px] font-semibold rounded-xl',
  xl: 'h-14 text-[18px] leading-[26px] font-semibold rounded-xl',
};

const variantClasses: Record<TextButtonVariant, string> = {
  primary: 'text-primary-strong',
  secondary: 'text-text-primary',
  tertiary: 'text-text-secondary',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  xs: '[&>svg]:w-4 [&>svg]:h-4',
  sm: '[&>svg]:w-4 [&>svg]:h-4',
  md: '[&>svg]:w-5 [&>svg]:h-5',
  lg: '[&>svg]:w-5 [&>svg]:h-5',
  xl: '[&>svg]:w-6 [&>svg]:h-6',
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  function TextButton(
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      leftIcon,
      rightIcon,
      children,
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
        onClick={disabled ? undefined : onClick}
        className={clsx(
          'inline-flex items-center justify-center gap-1.5',
          'bg-transparent px-2',
          'whitespace-nowrap',
          'transition-transform duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2',
          'disabled:pointer-events-none',
          sizeClasses[size],
          disabled ? 'text-text-disabled' : variantClasses[variant],
          !disabled && 'hover:bg-pressed-dark-weak',
          !disabled && 'active:scale-[0.96]',
          className,
        )}
      >
        <span className={clsx('flex items-center gap-1.5', iconSizeClasses[size])}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </button>
    );
  },
);
