import type { ReactNode, MouseEvent } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  disabled?: boolean;
  noPadding?: boolean;
  'aria-label'?: string;
  className?: string;
}
