import { IconProps } from './types';

export default function UserFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill={color} />
      <path d="M12 14C8.13 14 5 17.13 5 21H19C19 17.13 15.87 14 12 14Z" fill={color} />
    </svg>
  );
}
