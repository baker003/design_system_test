import { IconProps } from './types';

export default function StarFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3L14.47 9.6L21 10.2L16.18 14.4L17.64 21L12 17.27L6.36 21L7.82 14.4L3 10.2L9.53 9.6L12 3Z" fill={color} />
    </svg>
  );
}
