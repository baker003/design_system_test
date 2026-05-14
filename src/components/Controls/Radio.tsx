'use client';

import { useId, type ChangeEvent } from 'react';
import type { RadioProps } from './types';
import { useRadioGroup } from './RadioGroup';

// ─── Radio ────────────────────────────────────────────────────────────────────

export function Radio({
  value: valueProp,
  radioValue,
  onChange,
  disabled: disabledProp = false,
  label,
  labelPlacement = 'right',
  name: nameProp,
  id: idProp,
  className,
}: RadioProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  // Consume RadioGroup context if available
  const group = useRadioGroup();

  const name = group?.name ?? nameProp;
  const currentValue = group?.value ?? valueProp ?? '';
  const isSelected = currentValue === radioValue;
  const disabled = group?.disabled ?? disabledProp;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (group) {
      group.onChange(radioValue, e);
    } else {
      onChange?.(radioValue, e);
    }
  }

  const Wrapper = label ? 'label' : 'span';
  const wrapperProps = label ? { htmlFor: id } : {};

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
          'relative flex-shrink-0 w-5 h-5 rounded-full',
          'border-2 transition-colors duration-150 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-2',
          isSelected
            ? 'border-primary-regular bg-surface'
            : 'border-border bg-surface',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Hidden native input */}
        <input
          type="radio"
          id={id}
          name={name}
          value={radioValue}
          checked={isSelected}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={isSelected ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : undefined}
          className="sr-only"
        />

        {/* Inner selection dot */}
        {isSelected && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-regular" />
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
