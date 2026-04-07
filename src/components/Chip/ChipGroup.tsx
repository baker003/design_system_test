'use client';

import { forwardRef, useRef, useCallback } from 'react';
import clsx from 'clsx';
import type { ChipGroupProps } from './types';

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  function ChipGroup(
    { layout = 'carousel', gap = 8, children, className },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    /* carousel 모드: 좌/우 방향키로 형제 칩 포커스 이동 */
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (layout !== 'carousel') return;
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

        const container = containerRef.current;
        if (!container) return;

        const buttons = Array.from(
          container.querySelectorAll<HTMLButtonElement>(
            'button:not([disabled])',
          ),
        );
        if (buttons.length === 0) return;

        const currentIndex = buttons.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        if (currentIndex === -1) return;

        e.preventDefault();
        const nextIndex =
          e.key === 'ArrowRight'
            ? (currentIndex + 1) % buttons.length
            : (currentIndex - 1 + buttons.length) % buttons.length;

        buttons[nextIndex].focus();
        buttons[nextIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      },
      [layout],
    );

    /* gap: 기본 8px => gap-2, 그 외 style 주입 */
    const isDefaultGap = gap === 8;
    const clampedGap = Math.min(gap, 12);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="group"
        aria-label="칩 그룹"
        onKeyDown={handleKeyDown}
        style={isDefaultGap ? undefined : { gap: `${clampedGap}px` }}
        className={clsx(
          'flex min-w-[320px] max-w-[674px] px-4 py-2',
          isDefaultGap && 'gap-2',
          layout === 'carousel' && [
            'flex-nowrap overflow-x-auto',
            '[scrollbar-width:none]',
            '[&::-webkit-scrollbar]:hidden',
          ],
          layout === 'multiline' && 'flex-wrap',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
