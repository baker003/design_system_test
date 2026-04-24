import { type ReactNode } from 'react';

/** InputField 사이즈 */
export type InputSize = 'lg' | 'md' | 'sm';

/** InputField variant (스타일 계열) */
export type InputVariant = 'outline' | 'fill';

/** InputField Props */
export interface InputFieldProps {
  // --- 핵심 ---
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  // --- 레이아웃 / 스타일 ---
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;

  // --- 상태 ---
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  readOnly?: boolean;

  // --- 서브 요소 텍스트 ---
  label?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  maxLength?: number;
  showCharCount?: boolean;

  // --- 아이콘 / 액션 ---
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  clearable?: boolean;
  trailingButton?: { label: string; onClick: () => void; disabled?: boolean };

  // --- HTML 표준 ---
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search' | 'url';
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];

  // --- 기타 ---
  className?: string;
  inputClassName?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
