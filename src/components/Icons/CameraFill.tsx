import { IconProps } from './types';

export default function CameraFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17C13.66 17 15 15.66 15 14C15 12.34 13.66 11 12 11ZM20 7H17.83L16 5H8L6.17 7H4C3 7 2 8 2 9V19C2 20 3 21 4 21H20C21 21 22 20 22 19V9C22 8 21 7 20 7ZM12 19C9.24 19 7 16.76 7 14C7 11.24 9.24 9 12 9C14.76 9 17 11.24 17 14C17 16.76 14.76 19 12 19Z" fill={color} />
    </svg>
  );
}
