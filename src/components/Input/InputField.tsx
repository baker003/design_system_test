'use client';

import { forwardRef, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import type { InputFieldProps, InputSize } from './types';
import { TextButton } from '@/components/Button';
import type { TextButtonSize } from '@/components/Button/types';

// ── 사이즈별 클래스 매핑 ──────────────────────────────────────────

const inputRowSizeClasses: Record<InputSize, string> = {
  lg: 'h-14 px-4 rounded-[14px]',
  md: 'h-[46px] px-[14px] rounded-xl',
  sm: 'h-[38px] px-3 rounded-lg',
};

const inputTypoClasses: Record<InputSize, string> = {
  lg: 'typo-body1',
  md: 'typo-body2',
  sm: 'typo-label1',
};

const labelTypoClasses: Record<InputSize, string> = {
  lg: 'typo-label1',
  md: 'typo-label1',
  sm: 'typo-label2',
};

const helperTypoClasses: Record<InputSize, string> = {
  lg: 'typo-caption1',
  md: 'typo-caption1',
  sm: 'typo-caption2',
};

const iconSizeClasses: Record<InputSize, string> = {
  lg: 'w-5 h-5',
  md: 'w-5 h-5',
  sm: 'w-4 h-4',
};

const trailingButtonSizeMap: Record<InputSize, TextButtonSize> = {
  lg: 20,
  md: 16,
  sm: 14,
};

// ── ref 병합 유틸 ─────────────────────────────────────────────────

function mergeRefs<T>(...refs: React.Ref<T>[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<T>).current = node;
    });
  };
}

// ── 아이콘 색상 결정 헬퍼 ────────────────────────────────────────

function getIconColorClass(
  disabled: boolean,
  error: boolean,
  success: boolean,
  isFocused: boolean,
): string {
  if (disabled) return 'text-text-disabled';
  if (error) return 'text-status-negative';
  if (success) return 'text-status-positive';
  if (isFocused) return 'text-primary-regular';
  return 'text-text-tertiary';
}

// ── input-row border/bg 클래스 결정 헬퍼 ─────────────────────────

function getInputRowStateClasses(
  variant: 'outline' | 'fill',
  isFocused: boolean,
  error: boolean,
  success: boolean,
  disabled: boolean,
  readOnly: boolean,
): string {
  if (readOnly) {
    return variant === 'outline'
      ? 'bg-surface border border-border'
      : 'bg-background';
  }

  if (disabled) {
    return variant === 'outline'
      ? 'bg-surface border border-border opacity-40'
      : 'bg-background opacity-40';
  }

  if (error) {
    return variant === 'outline'
      ? 'bg-surface border border-status-negative'
      : 'bg-background border border-status-negative';
  }

  if (success) {
    return variant === 'outline'
      ? 'bg-surface border border-status-positive'
      : 'bg-background border border-status-positive';
  }

  if (isFocused) {
    return variant === 'outline'
      ? 'bg-surface border-2 border-primary-regular'
      : 'bg-background border-2 border-primary-regular';
  }

  // default / filled
  return variant === 'outline'
    ? 'bg-surface border border-border'
    : 'bg-background';
}

// ── Clear 버튼 X 아이콘 (inline SVG) ─────────────────────────────

function ClearIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  );
}

// ── 에러 경고 아이콘 (inline SVG) ────────────────────────────────

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      size = 'md',
      variant = 'outline',
      fullWidth = false,
      disabled = false,
      error = false,
      success = false,
      readOnly = false,
      label,
      required = false,
      placeholder,
      helperText,
      errorMessage,
      maxLength,
      showCharCount = false,
      leadingIcon,
      trailingIcon,
      clearable = false,
      trailingButton,
      type = 'text',
      name,
      id,
      autoComplete,
      autoFocus,
      inputMode,
      className,
      inputClassName,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    // HIGH-6: 내부 ref (clear 후 포커스 복귀 및 uncontrolled value 접근용)
    const inputRef = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);

    // CRITICAL-5/6: uncontrolled 모드 내부 값 추적
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentLength = (value ?? internalValue).length;

    // aria-describedby 결정 (복수 ID 조합)
    const describedByParts: string[] = [];
    if (error && errorMessage) describedByParts.push(errorId);
    if (!error && helperText) describedByParts.push(helperId);
    if (ariaDescribedBy) describedByParts.push(ariaDescribedBy);
    const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    // trailing 영역 렌더 결정
    // trailingButton > trailingIcon > clearable
    const showTrailingButton = Boolean(trailingButton);
    const showTrailingIcon = !trailingButton && Boolean(trailingIcon);
    // CRITICAL-5/6: uncontrolled 모드에서도 clearButton 표시 여부 정상 추적
    const showClearButton =
      !trailingButton && clearable && !trailingIcon && (value ?? internalValue).length > 0;

    // MEDIUM-2: showFooter 타입을 Boolean()으로 명시
    const showFooter = Boolean(
      (!error && helperText) ||
        (error && errorMessage) ||
        (showCharCount && maxLength !== undefined),
    );

    // error가 true이면 success 무시 (error 우선)
    const effectiveSuccess = success && !error;
    const iconColorClass = getIconColorClass(disabled, error, effectiveSuccess, isFocused);
    const inputRowStateClasses = getInputRowStateClasses(
      variant,
      isFocused,
      error,
      effectiveSuccess,
      disabled,
      readOnly,
    );

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setIsFocused(true);
      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setIsFocused(false);
      onBlur?.(e);
    }

    // CRITICAL-5/6: uncontrolled 모드 내부 상태 추적
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (value === undefined) setInternalValue(e.target.value);
      onChange?.(e);
    }

    function handleClear() {
      // uncontrolled 모드: 내부 상태 초기화
      if (value === undefined) {
        setInternalValue('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
      // controlled 모드: onChange로 빈 값 전달
      if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      // HIGH-2: clear 후 input으로 포커스 복귀
      inputRef.current?.focus();
    }

    return (
      <div className={clsx(fullWidth && 'w-full', className)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              labelTypoClasses[size],
              'font-medium block mb-1',
              disabled ? 'text-text-disabled' : 'text-text-primary',
            )}
          >
            {label}
            {required && (
              <span className="text-status-negative ml-0.5" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* Input Row */}
        <div
          className={clsx(
            'flex items-center',
            inputRowSizeClasses[size],
            inputRowStateClasses,
          )}
        >
          {/* Leading Icon */}
          {leadingIcon && (
            <span
              className={clsx(
                'flex-shrink-0 flex items-center mr-2',
                iconSizeClasses[size],
                iconColorClass,
              )}
            >
              {leadingIcon}
            </span>
          )}

          {/* Input */}
          <input
            ref={mergeRefs(inputRef, ref)}
            id={inputId}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            inputMode={inputMode}
            maxLength={maxLength}
            aria-invalid={error ? true : false}
            aria-describedby={describedBy}
            aria-label={!label ? ariaLabel : undefined}
            className={clsx(
              'flex-1 min-w-0 bg-transparent outline-none',
              inputTypoClasses[size],
              'text-text-primary',
              'placeholder:text-text-disabled',
              disabled && 'cursor-not-allowed',
              inputClassName,
            )}
          />

          {/* Trailing Button */}
          {showTrailingButton && trailingButton && (
            <span className="flex-shrink-0 flex items-center ml-2">
              <TextButton
                variant="primary"
                size={trailingButtonSizeMap[size]}
                disabled={trailingButton.disabled || disabled}
                onClick={trailingButton.onClick}
              >
                {trailingButton.label}
              </TextButton>
            </span>
          )}

          {/* Trailing Icon 또는 Clear Button */}
          {(showTrailingIcon || showClearButton) && (
            <span
              className={clsx(
                'flex-shrink-0 flex items-center ml-2',
                iconSizeClasses[size],
              )}
            >
              {showTrailingIcon && (
                <span className={clsx(iconColorClass)}>{trailingIcon}</span>
              )}
              {showClearButton && (
                <button
                  type="button"
                  aria-label="입력 내용 지우기"
                  onClick={handleClear}
                  className={clsx(
                    'flex items-center justify-center text-text-tertiary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-regular rounded-sm',
                  )}
                >
                  <ClearIcon className={iconSizeClasses[size]} />
                </button>
              )}
            </span>
          )}
        </div>

        {/* Footer Row: helperText / errorMessage / charCount */}
        {showFooter && (
          <div className="flex items-start justify-between mt-1">
            {/* Helper Text */}
            {!error && helperText && (
              <p
                id={helperId}
                className={clsx(
                  helperTypoClasses[size],
                  'font-normal',
                  effectiveSuccess ? 'text-status-positive' : 'text-text-tertiary',
                )}
              >
                {helperText}
              </p>
            )}

            {/* Error Message */}
            {error && errorMessage && (
              <p
                id={errorId}
                role="alert"
                className={clsx(
                  'flex items-center gap-1',
                  helperTypoClasses[size],
                  'font-normal text-status-negative',
                )}
              >
                <WarningIcon className="w-4 h-4 flex-shrink-0" />
                {errorMessage}
              </p>
            )}

            {/* Character Count */}
            {showCharCount && maxLength !== undefined && (
              <span
                className={clsx(
                  'ml-auto',
                  helperTypoClasses[size],
                  currentLength > maxLength
                    ? 'text-status-negative'
                    : 'text-text-tertiary',
                )}
              >
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export { InputField };
