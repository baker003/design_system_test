'use client';

import { useId, useState, type ChangeEvent } from 'react';
import type { ToggleProps } from './types';

// Size lookup tables
const TRACK_SIZE: Record<'sm' | 'md', string> = {
  sm: 'w-9 h-5',   // 36×20px
  md: 'w-12 h-7',  // 48×28px
};

const THUMB_SIZE: Record<'sm' | 'md', string> = {
  sm: 'w-4 h-4',   // 16×16px
  md: 'w-6 h-6',   // 24×24px
};

const THUMB_TRANSLATE_ON: Record<'sm' | 'md', string> = {
  sm: 'translate-x-4',  // 16px
  md: 'translate-x-5',  // 20px
};

// ─── Toggle ──────────────────────────────────────────────────────────────────

export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  labelPlacement = 'right',
  size = 'md',
  name,
  id: idProp,
  className,
}: ToggleProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isOn = isControlled ? checked : internalChecked;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next, e);
  }

  // Track color — M-2: disabled opacity는 wrapper에서 단일 처리
  const trackColor = (() => {
    if (isOn) return 'bg-primary-regular';
    return 'bg-fill-track-off';
  })();

  // Thumb color
  const thumbColor = (() => {
    if (disabled && !isOn) return 'bg-fill-thumb-disabled';
    return 'bg-surface';
  })();

  const Wrapper = label ? 'label' : 'span';
  const wrapperProps = label ? { htmlFor: id } : {};

  return (
    // M-2: wrapper에서 disabled 상태를 한 번만 처리
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={[
        'inline-flex items-center gap-2',
        label ? 'cursor-pointer' : '',
        labelPlacement === 'left' ? 'flex-row-reverse' : '',
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Track */}
      <span
        className={[
          'relative flex-shrink-0 rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2',
          TRACK_SIZE[size],
          trackColor,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Hidden native input (role="switch" must be on input) */}
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isOn}
          disabled={disabled}
          onChange={handleChange}
          role="switch"
          aria-checked={isOn ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : undefined}
          className="sr-only"
        />

        {/* Thumb */}
        <span
          className={[
            'absolute top-0.5 left-0.5 rounded-full shadow-sm',
            'transition-transform duration-200 ease-in-out',
            THUMB_SIZE[size],
            thumbColor,
            isOn ? THUMB_TRANSLATE_ON[size] : 'translate-x-0',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
      </span>

      {/* Label text */}
      {label && (
        <span className="typo-body1 font-normal text-text-primary">
          {label}
        </span>
      )}
    </Wrapper>
  );
}
