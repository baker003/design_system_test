import { IconProps } from './types';

export default function MinusFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 13H5V11H19V13Z" fill={color} />
    </svg>
  );
}
