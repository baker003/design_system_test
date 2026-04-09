import { IconProps } from './types';

export default function FilterFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 4H21L14 13V20L10 21V13L3 4Z" fill={color} />
    </svg>
  );
}
