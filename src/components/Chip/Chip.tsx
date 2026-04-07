'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ChipProps, ChipSize } from './types';

/* ── Size 클래스 ── */
const sizeClasses: Record<ChipSize, string> = {
  md: 'h-10 text-[16px] leading-[24px]',
  sm: 'h-9 text-[14px] leading-[22px]',
  xs: 'h-8 text-[13px] leading-[20px]',
};

/* ── Leading Icon 크기 ── */
const leadingIconSizeClasses: Record<ChipSize, string> = {
  md: '[&>svg]:w-5 [&>svg]:h-5',
  sm: '[&>svg]:w-[18px] [&>svg]:h-[18px]',
  xs: '[&>svg]:w-4 [&>svg]:h-4',
};

/* ── Trailing Icon 크기 ── */
const trailingIconSizeClasses: Record<ChipSize, string> = {
  md: '[&>svg]:w-4 [&>svg]:h-4',
  sm: '[&>svg]:w-3.5 [&>svg]:h-3.5',
  xs: '[&>svg]:w-3 [&>svg]:h-3',
};

/* ── Type x State: 배경/텍스트/보더 ── */
function getStyleClasses(
  type: 'outlined' | 'filled',
  selected: boolean,
  disabled: boolean,
): string {
  if (disabled) {
    return type === 'outlined'
      ? 'bg-white border border-border text-text-disabled'
      : 'bg-background text-text-disabled';
  }
  if (selected) {
    return type === 'outlined'
      ? 'bg-white border border-primary-strong text-primary-strong'
      : 'bg-primary-strong text-white';
  }
  return type === 'outlined'
    ? 'bg-white border border-border text-text-primary'
    : 'bg-background text-text-primary';
}

/* ── Type x State: 아이콘 색상 ── */
function getIconColorClass(
  type: 'outlined' | 'filled',
  selected: boolean,
  disabled: boolean,
): string {
  if (disabled) return 'text-text-disabled';
  if (selected) {
    return type === 'filled' ? 'text-white' : 'text-primary-strong';
  }
  return 'text-text-secondary';
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  function Chip(
    {
      type = 'outlined',
      size = 'md',
      selected = false,
      disabled = false,
      label,
      fontStyle,
      count,
      leadingIcon,
      showLeadingIcon = true,
      trailingIcon,
      showTrailingIcon = true,
      showNewBadge = false,
      onClick,
      className,
    },
    ref,
  ) {
    const hasLeading = !!leadingIcon && showLeadingIcon;
    const hasTrailing = !!trailingIcon && showTrailingIcon;

    /* fontStyle 자동 결정 */
    const resolvedFontStyle = fontStyle ?? (selected ? 'title' : 'body');
    const fontWeightClass =
      resolvedFontStyle === 'title' ? 'font-semibold' : 'font-normal';

    const iconColor = getIconColorClass(type, selected, disabled);

    /* aria-label에 count 정보 포함 */
    const ariaLabel =
      selected && count != null
        ? `${label} ${count}개 선택됨`
        : undefined;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        onClick={disabled ? undefined : onClick}
        className={clsx(
          /* base */
          'inline-flex items-center justify-center',
          'gap-1.5 rounded-full min-w-[56px]',
          'transition-transform duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary-strong focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:pointer-events-none',
          /* size */
          sizeClasses[size],
          /* padding */
          hasLeading ? 'pl-2' : 'pl-3',
          hasTrailing ? 'pr-2' : 'pr-3',
          'py-2',
          /* font weight */
          fontWeightClass,
          /* type x state */
          getStyleClasses(type, selected, disabled),
          /* pressed */
          !disabled && 'active:scale-[0.96]',
          className,
        )}
      >
        {/* Leading Icon */}
        {hasLeading && (
          <span
            className={clsx(
              'flex-shrink-0',
              leadingIconSizeClasses[size],
              iconColor,
            )}
          >
            {leadingIcon}
          </span>
        )}

        {/* Label + NEW Badge */}
        <span className="relative inline-flex items-center">
          {label}

          {/* Count Badge */}
          {selected && count != null && (
            <span className="ml-0.5 text-current">{count}</span>
          )}

          {/* NEW Badge (빨간 점) */}
          {showNewBadge && (
            <span
              className={clsx(
                'absolute -top-0.5 -right-2',
                'w-1.5 h-1.5 rounded-full',
                disabled ? 'bg-text-disabled' : 'bg-notification-red',
              )}
            />
          )}
        </span>

        {/* Trailing Icon */}
        {hasTrailing && (
          <span
            className={clsx(
              'flex-shrink-0',
              trailingIconSizeClasses[size],
              iconColor,
            )}
          >
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);
