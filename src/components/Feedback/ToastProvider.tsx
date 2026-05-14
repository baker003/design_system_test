'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type {
  ToastContextValue,
  ToastItem,
  ToastPosition,
  FeedbackType,
} from './types';
import FeedbackIcon from './FeedbackIcon';
import { positionClasses, ariaLiveMap, isTopPosition } from './utils';

// ── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ── Single item renderer ──────────────────────────────────────────────────────

interface ItemRendererProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

function ItemRenderer({ item, onDismiss }: ItemRendererProps) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovered = useRef(false);
  const type: FeedbackType = item.type ?? 'info';
  const duration = item.duration ?? (item.variant === 'snackbar' ? 4000 : 3000);
  const position: ToastPosition = item.position ?? 'bottom-center';

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onDismiss(item.id), 160);
  }, [item.id, onDismiss]);

  const startTimer = useCallback(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(dismiss, duration);
  }, [duration, dismiss]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  // Escape key via document-level listener (A-2)
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') dismiss();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dismiss]);

  const handleMouseEnter = () => { hovered.current = true; clearTimer(); };
  const handleMouseLeave = () => { hovered.current = false; startTimer(); };

  const isTop = isTopPosition(position);
  const animClass = visible
    ? isTop
      ? 'animate-[toast-in-top_200ms_ease-out]'
      : 'animate-[toast-in-bottom_200ms_ease-out]'
    : 'animate-[toast-out_150ms_ease-in_forwards]';

  const isSnackbar = item.variant === 'snackbar';

  return (
    <div
      role="alert"
      aria-live={ariaLiveMap[type]}
      aria-atomic="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={[
        'inline-flex items-center',
        isSnackbar ? 'gap-3 min-w-[280px] max-w-[480px]' : 'gap-2 min-w-[240px] max-w-[360px]',
        'px-4 py-3 rounded-xl bg-surface-inverse text-on-inverse shadow-lg',
        animClass,
      ].join(' ')}
    >
      <FeedbackIcon type={type} />
      <span className="typo-label1 font-medium text-on-inverse flex-1 min-w-0">
        {item.message}
      </span>
      {isSnackbar && item.action && (
        // A-3: 버튼 내부에 텍스트가 있으므로 aria-label 제거
        <button
          type="button"
          onClick={item.action.onClick}
          className="typo-label1 font-semibold text-primary-regular flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          {item.action.label}
        </button>
      )}
      {isSnackbar && (item.showCloseButton ?? true) && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="알림 닫기"
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-on-inverse opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ── Portal group by position ──────────────────────────────────────────────────

interface PortalGroupProps {
  position: ToastPosition;
  items: ToastItem[];
  onDismiss: (id: string) => void;
}

function PortalGroup({ position, items, onDismiss }: PortalGroupProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || items.length === 0) return null;

  return createPortal(
    <div
      className={positionClasses[position]}
      style={{ zIndex: 'var(--z-toast, 9000)' as unknown as number }}
    >
      {items.map((item) => (
        <ItemRenderer key={item.id} item={item} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, options?: Omit<ToastItem, 'id' | 'variant' | 'message'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setItems((prev) => [...prev, { id, variant: 'toast', message, ...options }]);
    },
    [],
  );

  const snackbar = useCallback(
    (message: string, options?: Omit<ToastItem, 'id' | 'variant' | 'message'>) => {
      const id = `snackbar-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setItems((prev) => [...prev, { id, variant: 'snackbar', message, ...options }]);
    },
    [],
  );

  const value = useMemo(() => ({ toast, snackbar, dismiss }), [toast, snackbar, dismiss]);

  // Group items by position
  const groups = useMemo(() => {
    const map = new Map<ToastPosition, ToastItem[]>();
    for (const item of items) {
      const pos = item.position ?? 'bottom-center';
      if (!map.has(pos)) map.set(pos, []);
      map.get(pos)!.push(item);
    }
    return map;
  }, [items]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {Array.from(groups.entries()).map(([position, posItems]) => (
        <PortalGroup
          key={position}
          position={position}
          items={posItems}
          onDismiss={dismiss}
        />
      ))}
    </ToastContext.Provider>
  );
}

// ── useToast hook ─────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
