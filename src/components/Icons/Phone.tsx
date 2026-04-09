import { IconProps } from './types';

export default function Phone({ size = 24, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 4H9L11 9L8.5 10.5C9.57 12.57 11.43 14.43 13.5 15.5L15 13L20 15V19C20 20.1 19.1 21 18 21C9.72 21 3 14.28 3 6C3 4.9 3.9 4 5 4Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
