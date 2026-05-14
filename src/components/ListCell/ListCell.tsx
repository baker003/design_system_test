'use client';

import type { MouseEvent } from 'react';
import { Toggle } from '@/components/Controls';
import { Divider } from '@/components/Divider';
import type { ListCellProps } from './types';

// ── ChevronRight SVG (default trailing icon) ───────────────────────────────────

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── ListCell ───────────────────────────────────────────────────────────────────

export function ListCell({
  title,
  subtitle,
  leadingIcon,
  leadingAvatar,
  trailingType = 'none',
  trailingIcon,
  trailingText,
  switchChecked,
  onSwitchChange,
  trailingBadge,
  onClick,
  showDivider = false,
  disabled = false,
  className = '',
}: ListCellProps) {
  const isInteractive = Boolean(onClick);

  const baseClass = [
    'flex items-center gap-3 px-4 min-h-14 w-full bg-surface',
    isInteractive
      ? 'cursor-pointer transition-colors duration-100 active:bg-pressed-dark-weak'
      : '',
    disabled ? 'opacity-40 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasLeading = Boolean(leadingAvatar) || Boolean(leadingIcon);

  const content = (
    <>
      {/* Leading area */}
      {hasLeading && (
        <span className="shrink-0 flex items-center justify-center w-10 h-10">
          {leadingAvatar ?? (
            <span className="text-text-secondary w-6 h-6 flex items-center justify-center">
              {leadingIcon}
            </span>
          )}
        </span>
      )}

      {/* Content area */}
      <span className="flex-1 flex flex-col gap-0.5 min-w-0 py-3">
        <span className="typo-body2 font-semibold text-text-primary truncate">
          {title}
        </span>
        {subtitle && (
          <span className="typo-label1 text-text-secondary truncate">
            {subtitle}
          </span>
        )}
      </span>

      {/* Trailing area */}
      {trailingType !== 'none' && (
        <span className="shrink-0 flex items-center">
          {trailingType === 'icon' && (
            <span className="text-text-secondary w-5 h-5 flex items-center justify-center">
              {trailingIcon ?? <ChevronRight />}
            </span>
          )}

          {trailingType === 'text' && (
            <span className="typo-label1 text-text-tertiary">
              {trailingText}
            </span>
          )}

          {trailingType === 'switch' && (
            <span
              role="presentation"
              onClick={(e: MouseEvent) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Toggle
                checked={switchChecked}
                onChange={onSwitchChange}
                size="md"
              />
            </span>
          )}

          {trailingType === 'badge' && trailingBadge}
        </span>
      )}
    </>
  );

  return (
    <div>
      {isInteractive ? (
        <button
          type="button"
          className={baseClass}
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          aria-disabled={disabled ? 'true' : undefined}
          tabIndex={disabled ? -1 : undefined}
        >
          {content}
        </button>
      ) : (
        <div
          className={baseClass}
          aria-disabled={disabled ? 'true' : undefined}
        >
          {content}
        </div>
      )}

      {showDivider && <Divider />}
    </div>
  );
}
