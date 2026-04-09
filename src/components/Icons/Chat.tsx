import { IconProps } from './types';

export default function Chat({ size = 24, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M21 12C21 16.42 16.97 20 12 20C10.46 20 9.01 19.67 7.74 19.08L3 21L4.92 16.26C4.33 14.99 4 13.54 4 12C4 7.03 7.58 3 12 3C16.97 3 21 7.58 21 12Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
