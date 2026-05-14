'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * useFocusTrap
 *
 * - open=true 시 containerRef 내 첫 포커스 가능 요소로 이동
 * - Tab / Shift+Tab 순환 처리
 * - open=false 시 triggerRef 요소로 포커스 복귀
 */
export function useFocusTrap(open: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // open될 때 트리거 기억 + 첫 포커스 이동
  useEffect(() => {
    if (open) {
      // 현재 포커스된 요소를 트리거로 저장
      triggerRef.current = document.activeElement as HTMLElement;

      // 다음 프레임에서 첫 포커스 가능 요소로 이동
      const frame = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          containerRef.current.focus();
        }
      });

      return () => cancelAnimationFrame(frame);
    } else {
      // close 시 트리거로 복귀
      if (triggerRef.current) {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    }
  }, [open]);

  // Tab / Shift+Tab 순환 처리
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!containerRef.current) return;

      const focusables = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        // Shift+Tab: 첫 번째에서 마지막으로 순환
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: 마지막에서 첫 번째로 순환
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return containerRef;
}
