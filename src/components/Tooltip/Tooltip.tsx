'use client';

import React, {
  cloneElement,
  useCallback,
  useId,
  useRef,
  useState,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import type { TooltipProps, TooltipPlacement } from './types';

interface Position {
  top: number;
  left: number;
  placement: TooltipPlacement;
}

const ARROW_SIZE = 8;
const GAP = 6; // gap between anchor and tooltip
const MAX_WIDTH = 200;

function computePosition(
  anchor: DOMRect,
  tooltip: DOMRect,
  preferred: TooltipPlacement,
): Position {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placements: TooltipPlacement[] = [preferred, getOpposite(preferred)];

  for (const p of placements) {
    const pos = calcPos(anchor, tooltip, p);
    if (fitsInViewport(pos, tooltip, vw, vh)) {
      return { ...pos, placement: p };
    }
  }

  // Fallback: use preferred even if it overflows
  return { ...calcPos(anchor, tooltip, preferred), placement: preferred };
}

function getOpposite(p: TooltipPlacement): TooltipPlacement {
  return p === 'top' ? 'bottom' : 'top';
}

function calcPos(
  anchor: DOMRect,
  tooltip: DOMRect,
  placement: TooltipPlacement,
): { top: number; left: number } {
  const effectiveWidth = Math.min(tooltip.width || MAX_WIDTH, MAX_WIDTH);
  const tooltipHeight = tooltip.height || 32;

  switch (placement) {
    case 'top':
      return {
        top: anchor.top - tooltipHeight - GAP - ARROW_SIZE / 2,
        left: anchor.left + anchor.width / 2 - effectiveWidth / 2,
      };
    case 'bottom':
      return {
        top: anchor.bottom + GAP + ARROW_SIZE / 2,
        left: anchor.left + anchor.width / 2 - effectiveWidth / 2,
      };
  }
}

function fitsInViewport(
  pos: { top: number; left: number },
  tooltip: DOMRect,
  vw: number,
  vh: number,
): boolean {
  const w = Math.min(tooltip.width || MAX_WIDTH, MAX_WIDTH);
  const h = tooltip.height || 32;
  return pos.top >= 0 && pos.left >= 0 && pos.top + h <= vh && pos.left + w <= vw;
}

function getArrowClass(placement: TooltipPlacement): string {
  switch (placement) {
    case 'top':
      return 'bottom-[-4px] left-1/2 -translate-x-1/2';
    case 'bottom':
      return 'top-[-4px] left-1/2 -translate-x-1/2';
  }
}

export function Tooltip({
  content,
  placement = 'top',
  size = 'medium',
  trigger = ['hover', 'focus'],
  delay = 200,
  hideDelay = 100,
  disabled = false,
  children,
  className,
}: TooltipProps) {
  const tooltipId = useId();
  const anchorRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, placement });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const updatePosition = useCallback(() => {
    if (!anchorRef.current || !tooltipRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const pos = computePosition(anchorRect, tooltipRect, placement);
    setPosition(pos);
  }, [placement]);

  const scheduleShow = useCallback(() => {
    if (disabled) return;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    showTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [disabled, delay]);

  const scheduleHide = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, hideDelay);
  }, [hideDelay]);

  const handleToggleClick = useCallback(() => {
    if (disabled) return;
    setVisible((prev) => !prev);
  }, [disabled]);

  // Update position after tooltip renders
  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [visible, updatePosition]);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const extraProps: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> } = {
    ref: (el: HTMLElement | null) => {
      anchorRef.current = el;
    },
    'aria-describedby': visible ? tooltipId : undefined,
  };

  if (!disabled) {
    if (triggers.includes('hover')) {
      extraProps.onMouseEnter = scheduleShow;
      extraProps.onMouseLeave = scheduleHide;
    }
    if (triggers.includes('focus')) {
      extraProps.onFocus = scheduleShow;
      extraProps.onBlur = scheduleHide;
    }
    if (triggers.includes('click')) {
      extraProps.onClick = handleToggleClick;
    }
  }

  const arrowClass = getArrowClass(position.placement);
  const sizeClass = size === 'small' ? 'typo-caption2 font-medium px-2.5 py-1.5' : 'typo-caption1 font-medium px-3 py-2';

  return (
    <>
      {cloneElement(children, extraProps)}
      {mounted && visible &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={`fixed z-50 pointer-events-none
              bg-text-strong text-on-primary
              rounded-lg
              animate-scale-in
              ${sizeClass}
              ${className ?? ''}`}
            style={{ top: position.top, left: position.left, maxWidth: MAX_WIDTH }}
          >
            {content}
            <div
              className={`absolute w-2 h-2 bg-text-strong rotate-45 ${arrowClass}`}
              aria-hidden="true"
            />
          </div>,
          document.body,
        )
      }
    </>
  );
}

export default Tooltip;
