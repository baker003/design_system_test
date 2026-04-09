import { IconProps } from './types';

export default function SettingsFill({ size = 24, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M15 6H9L8.64 7.94C7.99 8.16 7.39 8.48 6.86 8.89L5.06 8.22L3.56 10.78L5.08 12C5.03 12.33 5 12.66 5 13C5 13.34 5.03 13.67 5.08 14L3.56 15.22L5.06 17.78L6.86 17.11C7.39 17.52 7.99 17.84 8.64 18.06L9 20H15L15.36 18.06C16.01 17.84 16.61 17.52 17.14 17.11L18.94 17.78L20.44 15.22L18.92 14C18.97 13.67 19 13.34 19 13C19 12.66 18.97 12.33 18.92 12L20.44 10.78L18.94 8.22L17.14 8.89C16.61 8.48 16.01 8.16 15.36 7.94L15 6ZM12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16Z" fill={color} />
    </svg>
  );
}
