import { IconProps } from './types';

export default function BookmarkFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 3H19V21L12 15L5 21V3Z" fill={color} />
    </svg>
  );
}
