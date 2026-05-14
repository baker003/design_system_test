import type { DividerProps } from './types';

export function Divider({
  orientation = 'horizontal',
  strength = 'regular',
  className = '',
}: DividerProps) {
  const strengthClass =
    strength === 'weak' ? 'border-divider-weak' : 'border-divider';

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block self-stretch border-l ${strengthClass} ${className}`}
      />
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={`border-t ${strengthClass} ${className}`}
    />
  );
}
