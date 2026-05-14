'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { OverlayProps } from './types';
import { useFocusTrap } from './useFocusTrap';
import Close from '@/components/Icons/Close';

const SIZE_CLASSES: Record<string, string> = {
  sm: 'w-full max-w-sm max-h-[90vh]',
  md: 'w-full max-w-md max-h-[90vh]',
  lg: 'w-full max-w-lg max-h-[90vh]',
  fullscreen: 'w-full h-full rounded-none max-h-none',
};

let overlayIdCounter = 0;

export function Overlay({
  open,
  onClose,
  size = 'md',
  title,
  showCloseButton = true,
  header,
  children,
  footer,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  'aria-label': ariaLabel,
  className = '',
}: OverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [animating, setAnimating] = useState<'in' | 'out' | null>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 고유 ID — 헤더 aria-labelledby 연결용
  const titleId = useRef(`overlay-title-${++overlayIdCounter}`).current;

  const containerRef = useFocusTrap(open);

  // SSR 안전: 클라이언트에서만 portal 마운트
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // open 변경에 따라 rendered / animating 제어
  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setRendered(true);
      setAnimating('in');
    } else {
      setAnimating('out');
      closeTimerRef.current = setTimeout(() => {
        setRendered(false);
        setAnimating(null);
        closeTimerRef.current = null;
      }, 150);
    }
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [open]);

  // Escape 키 닫기 (document 레벨)
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted || !rendered) return null;

  const isFullscreen = size === 'fullscreen';
  const hasHeader = !!(title || header);

  const backdropAnimation =
    animating === 'in' ? 'animate-backdrop-in' : 'animate-backdrop-out';
  const panelAnimation =
    animating === 'in' ? 'animate-overlay-in' : 'animate-overlay-out';

  const content = (
    <div
      className={[
        'fixed inset-0 z-50 flex items-center justify-center',
        isFullscreen ? 'items-stretch' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={['absolute inset-0 bg-dimmed', backdropAnimation].join(' ')}
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* Panel */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title || header ? titleId : undefined}
        aria-label={!title && !header ? ariaLabel : undefined}
        tabIndex={-1}
        className={[
          'relative bg-surface flex flex-col shadow-xl',
          isFullscreen ? '' : 'rounded-2xl',
          SIZE_CLASSES[size],
          panelAnimation,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Header */}
        {hasHeader && (
          <div className="px-5 pt-5 pb-4 flex justify-between items-start shrink-0">
            {header ? (
              <div id={titleId} className="flex-1 min-w-0">
                {header}
              </div>
            ) : (
              <h2
                id={titleId}
                className="flex-1 min-w-0 typo-headline2 font-semibold text-text-strong"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                aria-label="닫기"
                onClick={onClose}
                className="ml-3 shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-text-secondary hover:bg-fill-primary transition-colors"
              >
                <Close size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className={[
            'px-5 pb-5 overflow-y-auto flex-1',
            !hasHeader ? 'pt-5' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 pb-5 flex gap-2 justify-end shrink-0 border-t border-border pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
}

export default Overlay;
