import { IconProps } from './types';

export default function LogoutFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 3H10V5H5V19H10V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z" fill={color} />
      <path d="M16.17 13H9V11H16.17L13.59 8.41L15 7L20 12L15 17L13.59 15.59L16.17 13Z" fill={color} />
    </svg>
  );
}
