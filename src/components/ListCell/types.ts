import type { ReactNode } from 'react';

export type ListCellTrailingType = 'none' | 'icon' | 'text' | 'switch' | 'badge';

export interface ListCellProps {
  title: string;
  subtitle?: string;
  leadingIcon?: ReactNode;
  leadingAvatar?: ReactNode;
  trailingType?: ListCellTrailingType;
  trailingIcon?: ReactNode;
  trailingText?: string;
  switchChecked?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  trailingBadge?: ReactNode;
  onClick?: () => void;
  showDivider?: boolean;
  disabled?: boolean;
  className?: string;
}
