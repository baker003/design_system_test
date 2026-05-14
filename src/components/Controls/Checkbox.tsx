'use client';

import { useId, useRef, useEffect, useState, type ChangeEvent } from 'react';
import type { CheckboxProps } from './types';

// ─── Check SVG (w-3 h-3) ────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6L5 9L10 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Dash SVG (w-3 h-3, indeterminate) ─────────────────────────────────────

function DashIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 6H9.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Checkbox ────────────────────────────────────────────────────────────────

export function Checkbox({
  checked,
  indeterminate = false,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  labelPlacement = 'right',
  name,
  value,
  id: idProp,
  className,
}: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  // Uncontrolled internal state
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internalChecked;

  // Sync indeterminate to DOM (cannot be set via React prop)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next, e);
  }

  // Visual state
  const isActive = indeterminate || isChecked;

  // Container: label when label exists, otherwise span
  const Wrapper = label ? 'label' : 'span';
  const wrapperProps = label
    ? { htmlFor: id }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={[
        'inline-flex items-center gap-2',
        label ? 'cursor-pointer' : '',
        labelPlacement === 'left' ? 'flex-row-reverse' : '',
        disabled ? 'cursor-not-allowed opacity-40' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Visual container */}
      <span
        className={[
          'relative flex-shrink-0 w-5 h-5 rounded-[5px]',
          'border-2 transition-colors duration-150 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2',
          isActive
            ? 'border-primary-regular bg-primary-regular'
            : 'border-border bg-surface',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Hidden native input */}
        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={indeterminate ? 'mixed' : isChecked ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : undefined}
          className="sr-only"
        />

        {/* Icon overlay */}
        {isActive && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-on-primary">
            {indeterminate ? <DashIcon /> : <CheckIcon />}
          </span>
        )}
      </span>

      {/* Label text */}
      {label && (
        <span
          className={[
            'typo-body1 font-normal',
            disabled ? 'text-text-disabled' : 'text-text-primary',
          ].join(' ')}
        >
          {label}
        </span>
      )}
    </Wrapper>
  );
}
