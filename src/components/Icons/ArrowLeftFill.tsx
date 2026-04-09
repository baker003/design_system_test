import { IconProps } from './types';

export default function ArrowLeftFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 11H7.83L12.41 6.41L11 5L4 12L11 19L12.41 17.59L7.83 13H19V11Z" fill={color} />
    </svg>
  );
}
