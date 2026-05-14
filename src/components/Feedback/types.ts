export type FeedbackType = 'info' | 'success' | 'warning' | 'error';

export type ToastPosition =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

export interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: FeedbackType;
  duration?: number;
  position?: ToastPosition;
  className?: string;
}

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: FeedbackType;
  duration?: number;
  action?: { label: string; onClick: () => void };
  showCloseButton?: boolean;
  position?: ToastPosition;
  className?: string;
}

export type ToastVariant = 'toast' | 'snackbar';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  type?: FeedbackType;
  duration?: number;
  action?: { label: string; onClick: () => void };
  showCloseButton?: boolean;
  position?: ToastPosition;
}

export interface ToastContextValue {
  toast: (message: string, options?: Omit<ToastItem, 'id' | 'variant' | 'message'>) => void;
  snackbar: (message: string, options?: Omit<ToastItem, 'id' | 'variant' | 'message'>) => void;
  dismiss: (id: string) => void;
}
