import { IconProps } from './types';

export default function NotificationFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C8.69 3 6 5.69 6 8C6 14 3 17 3 17H21C21 17 18 14 18 8C18 5.69 15.31 3 12 3Z" fill={color} />
      <path d="M13.73 21C13.2 21.6 12.64 21.9 12 21.9C11.36 21.9 10.8 21.6 10.27 21" fill={color} />
    </svg>
  );
}
