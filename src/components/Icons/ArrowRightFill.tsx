import { IconProps } from './types';

export default function ArrowRightFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 13H16.17L11.59 17.59L13 19L20 12L13 5L11.59 6.41L16.17 11H5V13Z" fill={color} />
    </svg>
  );
}
