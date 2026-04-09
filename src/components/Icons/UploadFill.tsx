import { IconProps } from './types';

export default function UploadFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 15H9V21H15V15H19L12 8L5 15ZM5 4V6H19V4H5Z" fill={color} />
    </svg>
  );
}
