'use client';

import { useState } from 'react';
import type { AvatarProps, AvatarSize, AvatarShape, AvatarStatus } from './types';

// ── Size lookup tables ─────────────────────────────────────────────────────────

const WRAPPER_SIZE: Record<AvatarSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
};

const INITIALS_TYPO: Record<AvatarSize, string> = {
  xs: 'typo-caption2',
  sm: 'typo-caption1',
  md: 'typo-label1',
  lg: 'typo-body2',
  xl: 'typo-body1',
};

const ICON_SIZE: Record<AvatarSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

const DOT_SIZE: Record<AvatarSize, string> = {
  xs: 'w-2 h-2',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3 h-3',
};

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online: 'bg-status-positive',
  offline: 'bg-gray-400',
  busy: 'bg-status-negative',
  away: 'bg-status-caution',
};

const STATUS_LABEL: Record<AvatarStatus, string> = {
  online: '온라인',
  offline: '오프라인',
  busy: '바쁨',
  away: '자리 비움',
};

const SHAPE_CLASS: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};

// ── User SVG Icon ──────────────────────────────────────────────────────────────

function UserIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────────

export function Avatar({
  src,
  alt,
  initials,
  size = 'md',
  shape = 'circle',
  status,
  'aria-label': ariaLabel,
  className = '',
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const shapeClass = SHAPE_CLASS[shape];
  const sizeClass = WRAPPER_SIZE[size];

  // Determine display mode
  const showImage = Boolean(src) && !imgError;
  const showInitials = !showImage && Boolean(initials);
  const showIcon = !showImage && !showInitials;

  // Accessible label
  const baseLabel =
    ariaLabel ?? alt ?? (initials ? `${initials} 아바타` : '사용자 아바타');
  const fullLabel = status ? `${baseLabel}, ${STATUS_LABEL[status]}` : baseLabel;

  return (
    <span
      className={[
        'relative inline-flex items-center justify-center shrink-0 overflow-hidden',
        sizeClass,
        shapeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="img"
      aria-label={fullLabel}
    >
      {/* Branch A: Image */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? ''}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}

      {/* Branch B: Initials */}
      {showInitials && (
        <span
          className={[
            'w-full h-full flex items-center justify-center',
            'bg-background text-text-primary font-semibold select-none',
            INITIALS_TYPO[size],
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        >
          {initials!.slice(0, 2).toUpperCase()}
        </span>
      )}

      {/* Branch C: Icon fallback */}
      {showIcon && (
        <span
          className="w-full h-full flex items-center justify-center bg-background text-text-tertiary"
          aria-hidden="true"
        >
          <UserIcon size={ICON_SIZE[size]} />
        </span>
      )}

      {/* Status dot */}
      {status && (
        <span
          aria-hidden="true"
          className={[
            'absolute bottom-0 right-0 rounded-full ring-2 ring-surface',
            DOT_SIZE[size],
            STATUS_COLOR[status],
          ]
            .filter(Boolean)
            .join(' ')}
        />
      )}
    </span>
  );
}
