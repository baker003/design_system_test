import { IconProps } from './types';

export default function Camera({ size = 24, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 9C3 7.9 3.9 7 5 7H7L9 4H15L17 7H19C20.1 7 21 7.9 21 9V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V9Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
