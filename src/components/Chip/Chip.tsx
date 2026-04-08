'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ChipProps, ChipSize } from './types';

/* ── Size 클래스 (높이 + 폰트 사이즈 + line-height) ── */
const sizeClasses: Record<ChipSize, string> = {
  lg: 'h-10 typo-body-1',
  md: 'h-9 typo-body-2',
  sm: 'h-8 typo-body-3',
  xs: 'h-7 typo-caption-1',
};

/* ── Icon 크기 (Figma 실측 기준: 모든 사이즈 16px, lg만 20px) ── */
const iconSizeClasses: Record<ChipSize, string> = {
  lg: '[&>svg]:w-5 [&>svg]:h-5',       /* leading 24px → 아이콘 20px */
  md: '[&>svg]:w-4 [&>svg]:h-4',       /* leading 22px → 아이콘 16px */
  sm: '[&>svg]:w-4 [&>svg]:h-4',       /* leading 20px → 아이콘 16px */
  xs: '[&>svg]:w-4 [&>svg]:h-4',       /* leading 18px → 아이콘 16px */
};

/* ── Type x State: 배경/텍스트/보더 ── */
function getStyleClasses(
  type: 'outlined' | 'filled',
  selected: boolean,
  disabled: boolean,
): string {
  if (disabled) {
    return type === 'outlined'
      ? 'bg-surface border border-border text-text-disabled'
      : 'bg-background text-text-disabled';
  }
  if (selected) {
    return type === 'outlined'
      ? 'bg-surface border border-primary-strong text-primary-strong'
      : 'bg-primary-strong text-on-primary';
  }
  return type === 'outlined'
    ? 'bg-surface border border-border text-text-primary'
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
    return type === 'filled' ? 'text-on-primary' : 'text-primary-strong';
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
          'relative inline-flex items-center justify-center',
          'gap-[6px] rounded-full min-w-[56px]',
          'whitespace-nowrap flex-shrink-0',
          'transition-transform duration-150 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-primary-strong focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:pointer-events-none',
          'overflow-visible',
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
              'flex-shrink-0 flex items-center',
              iconSizeClasses[size],
              iconColor,
            )}
          >
            {leadingIcon}
          </span>
        )}

        {/* Label */}
        <span className="inline-flex items-center leading-[1]">
          {label}

          {/* Count Badge */}
          {selected && count != null && (
            <span className="ml-[2px] text-current">{count}</span>
          )}
        </span>

        {/* Trailing Icon */}
        {hasTrailing && (
          <span
            className={clsx(
              'flex-shrink-0 flex items-center',
              iconSizeClasses[size],
              iconColor,
            )}
          >
            {trailingIcon}
          </span>
        )}

        {/* NEW Badge — 버튼의 가장 오른쪽 상단에 돌출 */}
        {showNewBadge && (
          <span
            className={clsx(
              'absolute -top-[6px] -right-[6px]',
              'flex items-center justify-center',
              'w-4 h-4 rounded-full',
              'text-[9px] font-bold text-on-primary leading-none',
              disabled ? 'bg-text-disabled' : 'bg-notification-red',
            )}
          >
            N
          </span>
        )}
      </button>
    );
  },
);
