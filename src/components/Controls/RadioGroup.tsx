'use client';

import { createContext, useContext, useState, type ChangeEvent } from 'react';
import type { RadioGroupProps, RadioGroupContextValue } from './types';

// ─── Context ─────────────────────────────────────────────────────────────────

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}

// ─── RadioGroup ──────────────────────────────────────────────────────────────

export function RadioGroup({
  name,
  value,
  defaultValue = '',
  onChange,
  orientation = 'vertical',
  disabled = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  children,
  className,
}: RadioGroupProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : internalValue;

  function handleChange(nextValue: string, _e: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }

  const contextValue: RadioGroupContextValue = {
    name,
    value: currentValue,
    onChange: handleChange,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <fieldset
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-disabled={disabled ? 'true' : undefined}
        className={[
          'border-0 p-0 m-0',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* legend는 aria-label이 없을 때만 렌더링 (A-1: 중복 제거) */}
        {!ariaLabel && !ariaLabelledby && (
          <legend className="sr-only">라디오 그룹</legend>
        )}

        <div
          className={[
            'flex',
            orientation === 'horizontal'
              ? 'flex-row gap-4 flex-wrap'
              : 'flex-col gap-3',
          ].join(' ')}
        >
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
}
