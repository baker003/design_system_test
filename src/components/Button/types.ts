import { type ReactNode, type MouseEvent } from 'react';

/** Common button sizes */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ActionButton style types */
export type ActionButtonStyle = 'fill' | 'outline';

/** ActionButton 위계 */
export type ActionButtonVariant = 'primary' | 'secondary' | 'tertiary';

/** ActionButton 종류 */
export type ActionButtonWeight = 'bold' | 'light';

/** ActionButton 사이즈 */
export type ActionButtonSize = 'large' | 'medium' | 'small';

/** TextButton 위계 */
export type TextButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'on-primary';

/** TextButton 종류 */
export type TextButtonWeight = 'bold' | 'light';

/** TextButton 사이즈 (px) */
export type TextButtonSize = 14 | 16 | 18 | 20;

/** IconButton style types */
export type IconButtonType = 'fill' | 'outline' | 'ghost';

/** IconButton shape */
export type IconButtonShape = 'square' | 'circle';

/** ActionButton Props */
export interface ActionButtonProps {
  style?: ActionButtonStyle;
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  weight?: ActionButtonWeight;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
}

/** TextButton Props */
export interface TextButtonProps {
  variant?: TextButtonVariant;
  size?: TextButtonSize;
  weight?: TextButtonWeight;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/** IconButton Props */
export interface IconButtonProps {
  size?: ButtonSize;
  shape?: IconButtonShape;
  type?: IconButtonType;
  disabled?: boolean;
  icon: ReactNode;
  'aria-label': string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/** LinkTextButton Props */
export interface LinkTextButtonProps {
  size?: ButtonSize;
  disabled?: boolean;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  className?: string;
}

/** Spinner Props */
export interface SpinnerProps {
  size?: ButtonSize;
  className?: string;
}
