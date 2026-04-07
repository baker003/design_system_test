import { type ReactNode, type MouseEvent } from 'react';

/** Common button sizes */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** ActionButton style types */
export type ActionButtonType = 'fill' | 'outline' | 'ghost';

/** ActionButton color variants */
export type ActionButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';

/** TextButton color variants */
export type TextButtonVariant = 'primary' | 'secondary' | 'tertiary';

/** IconButton style types */
export type IconButtonType = 'fill' | 'outline' | 'ghost';

/** IconButton shape */
export type IconButtonShape = 'square' | 'circle';

/** ActionButton Props */
export interface ActionButtonProps {
  /** Button style type */
  type?: ActionButtonType;
  /** Color variant */
  variant?: ActionButtonVariant;
  /** Size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state (shows spinner, disables click) */
  loading?: boolean;
  /** Full width (100% of parent) */
  fullWidth?: boolean;
  /** Icon on the left side of text */
  leftIcon?: ReactNode;
  /** Icon on the right side of text */
  rightIcon?: ReactNode;
  /** Button text */
  children: ReactNode;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** HTML button type attribute */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Additional Tailwind classes */
  className?: string;
}

/** TextButton Props */
export interface TextButtonProps {
  /** Color variant */
  variant?: TextButtonVariant;
  /** Size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Icon on the left side of text */
  leftIcon?: ReactNode;
  /** Icon on the right side of text */
  rightIcon?: ReactNode;
  /** Button text */
  children: ReactNode;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Additional Tailwind classes */
  className?: string;
}

/** IconButton Props */
export interface IconButtonProps {
  /** Size */
  size?: ButtonSize;
  /** Button shape */
  shape?: IconButtonShape;
  /** Background style type */
  type?: IconButtonType;
  /** Disabled state */
  disabled?: boolean;
  /** Icon element (required) */
  icon: ReactNode;
  /** Accessibility label (required) */
  'aria-label': string;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Additional Tailwind classes */
  className?: string;
}

/** LinkTextButton Props */
export interface LinkTextButtonProps {
  /** Size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /** Button text */
  children: ReactNode;
  /** Click handler */
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** When provided, renders as <a> tag */
  href?: string;
  /** Additional Tailwind classes */
  className?: string;
}

/** Spinner Props */
export interface SpinnerProps {
  /** Size */
  size?: ButtonSize;
  /** Additional className */
  className?: string;
}
