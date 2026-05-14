import type { ReactNode } from 'react';

export interface TabItem {
  key: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  label: string;
  badge?: 'dot' | 'count' | 'none';
  badgeCount?: number;
  disabled?: boolean;
}

export interface BottomTabBarProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  safeAreaBottom?: boolean;
  className?: string;
}
