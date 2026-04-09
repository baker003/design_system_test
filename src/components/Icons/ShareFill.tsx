import { IconProps } from './types';

export default function ShareFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M16 6L12 2L8 6H11V14H13V6H16ZM20 10H15V12H20V20H4V12H9V10H4C3 10 2 11 2 12V20C2 21 3 22 4 22H20C21 22 22 21 22 20V12C22 11 21 10 20 10Z" fill={color} />
    </svg>
  );
}
