import type { SkeletonProps } from './types';

export function Skeleton({
  length = '100%',
  className = '',
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="로딩 중"
      aria-hidden="true"
      className={`skeleton-base rounded-sm animate-[shimmer_1.5s_ease-in-out_infinite] ${className}`}
      style={{ width: length, height: '1em' }}
    />
  );
}
