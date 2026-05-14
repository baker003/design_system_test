'use client';

import type { BottomTabBarProps, TabItem } from './types';

function Badge({ item }: { item: TabItem }) {
  if (!item.badge || item.badge === 'none') return null;

  if (item.badge === 'dot') {
    return (
      <span
        aria-label={`${item.label} (새 알림 있음)`}
        className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-status-negative"
      />
    );
  }

  if (item.badge === 'count') {
    const count = item.badgeCount ?? 0;
    const label = count > 99 ? '99+' : String(count);
    return (
      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-status-negative text-white typo-caption2 font-semibold flex items-center justify-center leading-none">
        {label}
      </span>
    );
  }

  return null;
}

export function BottomTabBar({
  items,
  activeKey,
  onChange,
  safeAreaBottom = true,
  className = '',
}: BottomTabBarProps) {
  const enabledKeys = items
    .filter((item) => !item.disabled)
    .map((item) => item.key);

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    const currentIndex = enabledKeys.indexOf(activeKey);
    if (currentIndex === -1) return;

    const direction = e.key === 'ArrowRight' ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + enabledKeys.length) % enabledKeys.length;
    onChange(enabledKeys[nextIndex]);
  }

  return (
    <nav
      role="tablist"
      aria-label="메인 네비게이션"
      onKeyDown={handleKeyDown}
      className={[
        'fixed bottom-0 left-0 right-0 z-30',
        'bg-surface border-t border-border',
        'flex items-start',
        safeAreaBottom ? 'pb-[env(safe-area-inset-bottom)]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;
        const isDisabled = item.disabled ?? false;

        const iconColor = isDisabled
          ? 'text-text-disabled'
          : isActive
          ? 'text-primary-regular'
          : 'text-text-tertiary';

        const labelColor = isDisabled
          ? 'text-text-disabled font-normal'
          : isActive
          ? 'text-primary-regular font-semibold'
          : 'text-text-tertiary font-normal';

        const countBadgeAriaLabel =
          item.badge === 'count' && item.badgeCount != null
            ? `${item.label} (알림 ${item.badgeCount}개)`
            : item.label;

        return (
          <button
            key={item.key}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-disabled={isDisabled || undefined}
            aria-label={item.badge === 'count' ? countBadgeAriaLabel : undefined}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                onChange(item.key);
              }
            }}
            className={[
              'flex-1 flex flex-col items-center pt-2 pb-2 gap-1',
              'transition-colors duration-150',
              isDisabled ? 'pointer-events-none' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={`relative w-6 h-6 flex items-center justify-center ${iconColor}`}>
              {isActive && item.activeIcon ? item.activeIcon : item.icon}
              <Badge item={item} />
            </span>
            <span className={`typo-caption1 ${labelColor}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
