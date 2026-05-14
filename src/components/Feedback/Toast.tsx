'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ToastProps } from './types';
import FeedbackIcon from './FeedbackIcon';
import { positionClasses, ariaLiveMap, isTopPosition } from './utils';

export default function Toast({
  open,
  onClose,
  message,
  type = 'info',
  duration = 3000,
  position = 'bottom-center',
  className = '',
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovered = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startTimer = useCallback(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 160);
    }, duration);
  }, [duration, onClose]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (open) {
      setVisible(true);
      if (!hovered.current) startTimer();
    } else {
      clearTimer();
      setVisible(false);
    }
    return () => clearTimer();
  }, [open, startTimer, clearTimer]);

  // Escape key via document-level listener (A-2)
  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setVisible(false);
        setTimeout(onClose, 160);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const handleMouseEnter = useCallback(() => {
    hovered.current = true;
    clearTimer();
  }, [clearTimer]);

  const handleMouseLeave = useCallback(() => {
    hovered.current = false;
    startTimer();
  }, [startTimer]);

  if (!mounted || !open) return null;

  const isTop = isTopPosition(position);
  const animClass = visible
    ? isTop
      ? 'animate-[toast-in-top_200ms_ease-out]'
      : 'animate-[toast-in-bottom_200ms_ease-out]'
    : 'animate-[toast-out_150ms_ease-in_forwards]';

  return createPortal(
    <div
      className={positionClasses[position]}
      style={{ zIndex: 'var(--z-toast, 9000)' as unknown as number }}
    >
      <div
        role="alert"
        aria-live={ariaLiveMap[type]}
        aria-atomic="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={[
          'inline-flex items-center gap-2',
          'min-w-[240px] max-w-[360px] px-4 py-3 rounded-xl',
          'bg-surface-inverse text-on-inverse',
          'shadow-lg',
          animClass,
          className,
        ].join(' ')}
      >
        <FeedbackIcon type={type} />
        <span className="typo-label1 font-medium text-on-inverse flex-1 min-w-0">
          {message}
        </span>
      </div>
    </div>,
    document.body,
  );
}
