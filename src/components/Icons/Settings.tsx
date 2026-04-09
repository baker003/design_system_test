import { IconProps } from './types';

export default function Settings({ size = 24, color = 'currentColor', strokeWidth = 2, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM19 13C19 13.34 18.97 13.67 18.92 14L20.44 15.22L18.94 17.78L17.14 17.11C16.61 17.52 16.01 17.84 15.36 18.06L15 20H9L8.64 18.06C7.99 17.84 7.39 17.52 6.86 17.11L5.06 17.78L3.56 15.22L5.08 14C5.03 13.67 5 13.34 5 13C5 12.66 5.03 12.33 5.08 12L3.56 10.78L5.06 8.22L6.86 8.89C7.39 8.48 7.99 8.16 8.64 7.94L9 6H15L15.36 7.94C16.01 8.16 16.61 8.48 17.14 8.89L18.94 8.22L20.44 10.78L18.92 12C18.97 12.33 19 12.66 19 13Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
