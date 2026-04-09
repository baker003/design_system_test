import { IconProps } from './types';

export default function MenuFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z" fill={color} />
    </svg>
  );
}
