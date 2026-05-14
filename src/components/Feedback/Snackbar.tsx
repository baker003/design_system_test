'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { SnackbarProps } from './types';
import FeedbackIcon from './FeedbackIcon';
import { positionClasses, ariaLiveMap, isTopPosition } from './utils';

export default function Snackbar({
  open,
  onClose,
  message,
  type = 'info',
  duration = 4000,
  action,
  showCloseButton = true,
  position = 'bottom-center',
  className = '',
}: SnackbarProps) {
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

  const handleClose = useCallback(() => {
    clearTimer();
    setVisible(false);
    setTimeout(onClose, 160);
  }, [clearTimer, onClose]);

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
          'inline-flex items-center gap-3',
          'min-w-[280px] max-w-[480px] px-4 py-3 rounded-xl',
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
        {action && (
          // A-3: 버튼 내부에 텍스트가 있으므로 aria-label 제거
          <button
            type="button"
            onClick={action.onClick}
            className="typo-label1 font-semibold text-primary-regular flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            {action.label}
          </button>
        )}
        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="알림 닫기"
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-on-inverse opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
