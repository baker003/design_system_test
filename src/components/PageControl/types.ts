export interface PageControlProps {
  total: number;
  current: number;
  size?: 'medium' | 'small';
  alternative?: boolean;
  className?: string;
}
