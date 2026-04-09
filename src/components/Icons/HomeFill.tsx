import { IconProps } from './types';

export default function HomeFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={color} />
    </svg>
  );
}
