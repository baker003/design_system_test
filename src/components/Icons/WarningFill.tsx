import { IconProps } from './types';

export default function WarningFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 21H21L12 4L3 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill={color} />
    </svg>
  );
}
