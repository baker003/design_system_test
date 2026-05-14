import type { ProgressBarProps } from './types';

const sizeClasses: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorClasses: Record<NonNullable<ProgressBarProps['color']>, string> = {
  primary: 'bg-primary-regular',
  positive: 'bg-status-positive',
  caution: 'bg-status-caution',
  negative: 'bg-status-negative',
};

const trackColorClasses: Record<NonNullable<ProgressBarProps['trackColor']>, string> = {
  default: 'bg-fill-track-off',
  transparent: 'bg-transparent',
};

function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function ProgressBar({
  value = 0,
  mode = 'determinate',
  size = 'md',
  color = 'primary',
  trackColor = 'default',
  rounded = true,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className = '',
}: ProgressBarProps) {
  const isDeterminate = mode === 'determinate';
  const clampedValue = clampValue(value, 0, 100);
  const roundedClass = rounded ? 'rounded-full' : 'rounded-none';

  return (
    <div
      className={[
        'w-full overflow-hidden',
        sizeClasses[size],
        trackColorClasses[trackColor],
        roundedClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="progressbar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-valuemin={0}
      aria-valuemax={100}
      {...(isDeterminate ? { 'aria-valuenow': clampedValue } : {})}
    >
      <div
        className={[
          'h-full',
          colorClasses[color],
          roundedClass,
          isDeterminate
            ? 'transition-[width] duration-300 ease-out'
            : 'w-1/3 animate-progress-indeterminate',
        ]
          .filter(Boolean)
          .join(' ')}
        style={isDeterminate ? { width: `${clampedValue}%` } : undefined}
      />
    </div>
  );
}
