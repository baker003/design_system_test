import { IconProps } from './types';

export default function PauseFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill={color} />
    </svg>
  );
}
