import { IconProps } from './types';

export default function PlayFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 4V20L19 12L7 4Z" fill={color} />
    </svg>
  );
}
