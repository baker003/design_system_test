import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom';
export type TooltipTrigger = 'hover' | 'click' | 'focus';
export type TooltipSize = 'medium' | 'small';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  size?: TooltipSize;
  trigger?: TooltipTrigger | TooltipTrigger[];
  delay?: number;
  hideDelay?: number;
  disabled?: boolean;
  children: ReactElement;
  className?: string;
}
