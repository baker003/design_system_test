import { IconProps } from './types';

export default function PlusFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={color} />
    </svg>
  );
}
