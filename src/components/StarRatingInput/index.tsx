'use client';

import { useRef, useState, useCallback, KeyboardEvent } from 'react';
import Star from '@/components/Icons/Star';
import StarFill from '@/components/Icons/StarFill';
import type { StarRatingInputProps } from './types';

const STAR_COUNT = 5;

/**
 * StarRatingInput
 *
 * 별 5개를 radiogroup 패턴으로 구현한 별점 입력 컴포넌트.
 * - idle: 빈 별 (border-regular)
 * - hover: value=null 일 때 호버 위치까지 채운 별 (primary-regular)
 * - selected: 선택된 별점까지 채운 별 (status-caution-regular, orange)
 * - disabled: pointer-events 없음, 흐린 별 (text-disabled)
 *   - 기선택 상태(value !== null)면 StarFill을 text-disabled 색으로 표시
 * - error 표시는 부모 컴포넌트에서 일원화 (role="alert")
 *
 * 키보드: ArrowLeft/ArrowRight 로 값 변경, roving tabindex
 */
export default function StarRatingInput({
  value,
  onChange,
  disabled = false,
  error = false,
  'aria-label': ariaLabel = '서비스 만족도 별점 선택',
  className,
}: StarRatingInputProps) {
  const [hoverIndex, setHoverIndex] = useState<number>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleMouseEnter = useCallback((index: number) => {
    if (disabled) return;
    setHoverIndex(index);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setHoverIndex(0);
  }, [disabled]);

  const handleClick = useCallback((index: number) => {
    if (disabled) return;
    onChange(index);
  }, [disabled, onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (disabled) return;

      let next: number | null = null;

      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = Math.min(index + 1, STAR_COUNT);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = Math.max(index - 1, 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(index);
        return;
      }

      if (next !== null) {
        onChange(next);
        buttonRefs.current[next - 1]?.focus();
      }
    },
    [disabled, onChange],
  );

  function getStarIcon(index: number) {
    const isSelected = value !== null && index <= value;
    const isHovered = value === null && index <= hoverIndex;

    if (disabled) {
      if (isSelected) {
        return (
          <StarFill
            size={40}
            color="var(--text-disabled)"
          />
        );
      }
      return (
        <Star
          size={40}
          color="var(--text-disabled)"
        />
      );
    }

    if (isSelected) {
      return (
        <StarFill
          size={40}
          color="var(--status-caution-regular)"
        />
      );
    }

    if (isHovered) {
      return (
        <StarFill
          size={40}
          color="var(--primary-regular)"
        />
      );
    }

    return (
      <Star
        size={40}
        color="var(--border-regular)"
      />
    );
  }

  function getTabIndex(index: number): number {
    if (value === null) {
      return index === 1 ? 0 : -1;
    }
    return value === index ? 0 : -1;
  }

  return (
    <div
      className={['flex items-center gap-2', className].filter(Boolean).join(' ')}
    >
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-required="true"
        className="flex items-center gap-2"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: STAR_COUNT }, (_, i) => i + 1).map((index) => (
          <button
            key={index}
            ref={(el) => { buttonRefs.current[index - 1] = el; }}
            type="button"
            role="radio"
            aria-checked={value === index}
            aria-label={`${index}점`}
            tabIndex={getTabIndex(index)}
            disabled={disabled}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={[
              'w-12 h-12 flex items-center justify-center',
              'rounded-full',
              'transition-transform duration-100',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-primary-regular focus-visible:ring-offset-1',
              'active:scale-90',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {getStarIcon(index)}
          </button>
        ))}
      </div>
    </div>
  );
}
