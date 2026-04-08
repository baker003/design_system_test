'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ActionButtonProps, ButtonSize } from './types';
import { Spinner } from './Spinner';

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'h-8 px-[12px] typo-caption-1 font-medium rounded-lg',
  sm: 'h-9 px-[14px] typo-body-3 font-semibold rounded-lg',
  md: 'h-10 px-4 typo-body-2 font-semibold rounded-[10px]',
  lg: 'h-12 px-5 typo-title-3 font-semibold rounded-xl',
  xl: 'h-14 px-6 typo-title-2 font-semibold rounded-xl',
};

const typeVariantClasses: Record<string, string> = {
  'fill-primary': 'bg-primary-strong text-on-primary hover:brightness-95',
  'fill-secondary': 'bg-gray-200 text-text-primary hover:brightness-95',
  'fill-tertiary': 'bg-gray-100 text-text-secondary hover:brightness-95',
  'fill-destructive': 'bg-status-negative-strong text-on-primary hover:brightness-95',
  'outline-primary': 'bg-transparent text-primary-strong border border-primary-strong hover:bg-pressed-dark-weak',
  'outline-secondary': 'bg-transparent text-text-primary border border-border hover:bg-pressed-dark-weak',
  'outline-tertiary': 'bg-transparent text-text-secondary border border-border hover:bg-pressed-dark-weak',
  'outline-destructive': 'bg-transparent text-status-negative-strong border border-status-negative-strong hover:bg-pressed-dark-weak',
  'ghost-primary': 'bg-transparent text-primary-strong hover:bg-pressed-dark-weak',
  'ghost-secondary': 'bg-transparent text-text-primary hover:bg-pressed-dark-weak',
  'ghost-tertiary': 'bg-transparent text-text-secondary hover:bg-pressed-dark-weak',
  'ghost-destructive': 'bg-transparent text-status-negative-strong hover:bg-pressed-dark-weak',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  xs: '[&>svg]:w-4 [&>svg]:h-4',
  sm: '[&>svg]:w-4 [&>svg]:h-4',
  md: '[&>svg]:w-5 [&>svg]:h-5',
  lg: '[&>svg]:w-5 [&>svg]:h-5',
  xl: '[&>svg]:w-6 [&>svg]:h-6',
};

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function ActionButton(
    {
      type = 'fill',
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      onClick,
      htmlType = 'button',
      className,
    },
    ref,
  ) {
    const isDisabledOrLoading = disabled || loading;

    return (
      <button
        ref={ref}
        type={htmlType}
        disabled={disabled || loading}
        aria-disabled={(disabled || loading) || undefined}
        aria-busy={loading || undefined}
        onClick={isDisabledOrLoading ? undefined : onClick}
        className={clsx(
          'relative inline-flex items-center justify-center gap-[6px]',
          'font-semibold whitespace-nowrap',
          'transition-transform duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-strong focus-visible:ring-offset-2',
          'disabled:pointer-events-none',
          sizeClasses[size],
          typeVariantClasses[`${type}-${variant}`],
          disabled && 'opacity-40',
          loading && 'pointer-events-none',
          fullWidth && 'w-full',
          !isDisabledOrLoading && 'active:scale-[0.96]',
          className,
        )}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner size={size} />
          </span>
        )}
        <span
          className={clsx(
            'flex items-center gap-[6px]',
            loading && 'invisible',
          )}
        >
          {leftIcon && (
            <span className={clsx('flex-shrink-0 flex items-center', iconSizeClasses[size])}>
              {leftIcon}
            </span>
          )}
          <span className="leading-[1]">{children}</span>
          {rightIcon && (
            <span className={clsx('flex-shrink-0 flex items-center', iconSizeClasses[size])}>
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  },
);
