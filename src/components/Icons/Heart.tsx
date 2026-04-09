import { IconProps } from './types';

export default function Heart({ size = 24, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 4 15 4 9.5C4 6.46 6.46 4 9.5 4C10.96 4 12 5 12 5C12 5 13.04 4 14.5 4C17.54 4 20 6.46 20 9.5C20 15 12 21 12 21Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
