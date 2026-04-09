import { IconProps } from './types';

export default function ErrorFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM16.59 15.17L15.17 16.59L12 13.41L8.83 16.59L7.41 15.17L10.59 12L7.41 8.83L8.83 7.41L12 10.59L15.17 7.41L16.59 8.83L13.41 12L16.59 15.17Z" fill={color} />
    </svg>
  );
}
