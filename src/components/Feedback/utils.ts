import type { ToastPosition, FeedbackType } from './types';

export const positionClasses: Record<ToastPosition, string> = {
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
  'bottom-left':   'fixed bottom-4 left-4 flex flex-col items-start gap-2',
  'bottom-right':  'fixed bottom-4 right-4 flex flex-col items-end gap-2',
  'top-center':    'fixed top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
  'top-left':      'fixed top-4 left-4 flex flex-col items-start gap-2',
  'top-right':     'fixed top-4 right-4 flex flex-col items-end gap-2',
};

export const ariaLiveMap: Record<FeedbackType, 'polite' | 'assertive'> = {
  info: 'polite',
  success: 'polite',
  warning: 'assertive',
  error: 'assertive',
};

export function isTopPosition(position: ToastPosition): boolean {
  return position.startsWith('top-');
}
