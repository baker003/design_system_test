'use client';

import { useState } from 'react';
import { BottomTabBar } from '@/components/BottomTabBar';

function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {active ? (
        <path
          d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5zm2-16.31L19 10v8h-3v-6H8v6H5v-8l7-6.31z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        fill="currentColor"
      />
    </svg>
  );
}

function BookingIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {active ? (
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2zm-7 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 10H8v-1a4 4 0 0 1 8 0v1z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-3a4 4 0 0 0-4 4v1h8v-1a4 4 0 0 0-4-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {active ? (
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm6 4H6v-.99c.2-.72 3.3-2.01 6-2.01 2.7 0 5.8 1.29 6 2v1z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

export default function BottomTabBarPage() {
  const [activeKey, setActiveKey] = useState('home');
  const [activeKey2, setActiveKey2] = useState('home');
  const [activeKey3, setActiveKey3] = useState('home');

  const basicItems = [
    {
      key: 'home',
      icon: <HomeIcon />,
      activeIcon: <HomeIcon active />,
      label: '홈',
    },
    {
      key: 'search',
      icon: <SearchIcon />,
      label: '검색',
    },
    {
      key: 'booking',
      icon: <BookingIcon />,
      activeIcon: <BookingIcon active />,
      label: '예약',
    },
    {
      key: 'profile',
      icon: <ProfileIcon />,
      activeIcon: <ProfileIcon active />,
      label: '마이',
    },
  ];

  const badgeItems = [
    {
      key: 'home',
      icon: <HomeIcon />,
      activeIcon: <HomeIcon active />,
      label: '홈',
    },
    {
      key: 'search',
      icon: <SearchIcon />,
      label: '검색',
      badge: 'dot' as const,
    },
    {
      key: 'booking',
      icon: <BookingIcon />,
      activeIcon: <BookingIcon active />,
      label: '예약',
      badge: 'count' as const,
      badgeCount: 5,
    },
    {
      key: 'notification',
      icon: <NotificationIcon />,
      label: '알림',
      badge: 'count' as const,
      badgeCount: 102,
    },
    {
      key: 'profile',
      icon: <ProfileIcon />,
      activeIcon: <ProfileIcon active />,
      label: '마이',
    },
  ];

  const disabledItems = [
    {
      key: 'home',
      icon: <HomeIcon />,
      activeIcon: <HomeIcon active />,
      label: '홈',
    },
    {
      key: 'search',
      icon: <SearchIcon />,
      label: '검색',
      disabled: true,
    },
    {
      key: 'booking',
      icon: <BookingIcon />,
      activeIcon: <BookingIcon active />,
      label: '예약',
    },
    {
      key: 'profile',
      icon: <ProfileIcon />,
      activeIcon: <ProfileIcon active />,
      label: '마이',
      disabled: true,
    },
  ];

  return (
    <main className="min-h-screen bg-background p-6 pb-48">
      <h1 className="typo-title3 font-bold text-text-strong mb-2">BottomTabBar</h1>
      <p className="typo-body2 text-text-secondary mb-8">화면 하단 고정 네비게이션. 아래 실제 컴포넌트가 렌더됩니다.</p>

      {/* 섹션 1: 기본 4탭 */}
      <section className="mb-10">
        <h2 className="typo-headline1 font-semibold text-text-strong mb-1">기본 4탭</h2>
        <p className="typo-caption1 text-text-tertiary mb-3">활성 탭: <strong>{activeKey}</strong></p>
        <div className="relative h-20 bg-surface rounded-xl overflow-hidden border border-border">
          <nav
            role="tablist"
            aria-label="메인 네비게이션 (미리보기)"
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border flex items-start"
          >
            {basicItems.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <button
                  key={item.key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveKey(item.key)}
                  className="flex-1 flex flex-col items-center pt-2 pb-2 gap-1 transition-colors duration-150"
                >
                  <span className={`relative w-6 h-6 flex items-center justify-center ${isActive ? 'text-primary-regular' : 'text-text-tertiary'}`}>
                    {isActive && item.activeIcon ? item.activeIcon : item.icon}
                  </span>
                  <span className={`typo-caption1 ${isActive ? 'font-semibold text-primary-regular' : 'font-normal text-text-tertiary'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* 섹션 2: 배지 */}
      <section className="mb-10">
        <h2 className="typo-headline1 font-semibold text-text-strong mb-1">배지 (dot / count)</h2>
        <p className="typo-caption1 text-text-tertiary mb-3">활성 탭: <strong>{activeKey2}</strong></p>
        <div className="relative h-20 bg-surface rounded-xl overflow-hidden border border-border">
          <nav
            role="tablist"
            aria-label="배지 탭바 (미리보기)"
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border flex items-start"
          >
            {badgeItems.map((item) => {
              const isActive = item.key === activeKey2;
              const count = item.badgeCount ?? 0;
              const countLabel = count > 99 ? '99+' : String(count);
              return (
                <button
                  key={item.key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveKey2(item.key)}
                  className="flex-1 flex flex-col items-center pt-2 pb-2 gap-1 transition-colors duration-150"
                >
                  <span className={`relative w-6 h-6 flex items-center justify-center ${isActive ? 'text-primary-regular' : 'text-text-tertiary'}`}>
                    {isActive && item.activeIcon ? item.activeIcon : item.icon}
                    {item.badge === 'dot' && (
                      <span aria-hidden="true" className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-status-negative" />
                    )}
                    {item.badge === 'count' && (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-status-negative text-white typo-caption2 font-semibold flex items-center justify-center leading-none">
                        {countLabel}
                      </span>
                    )}
                  </span>
                  <span className={`typo-caption1 ${isActive ? 'font-semibold text-primary-regular' : 'font-normal text-text-tertiary'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* 섹션 3: disabled */}
      <section className="mb-10">
        <h2 className="typo-headline1 font-semibold text-text-strong mb-1">Disabled 탭</h2>
        <p className="typo-caption1 text-text-tertiary mb-3">활성 탭: <strong>{activeKey3}</strong></p>
        <div className="relative h-20 bg-surface rounded-xl overflow-hidden border border-border">
          <nav
            role="tablist"
            aria-label="비활성 탭바 (미리보기)"
            className="absolute bottom-0 left-0 right-0 bg-surface border-t border-border flex items-start"
          >
            {disabledItems.map((item) => {
              const isActive = item.key === activeKey3;
              const isDisabled = item.disabled ?? false;
              return (
                <button
                  key={item.key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-disabled={isDisabled || undefined}
                  tabIndex={isActive ? 0 : -1}
                  disabled={isDisabled}
                  onClick={() => { if (!isDisabled) setActiveKey3(item.key); }}
                  className={`flex-1 flex flex-col items-center pt-2 pb-2 gap-1 transition-colors duration-150 ${isDisabled ? 'pointer-events-none' : ''}`}
                >
                  <span className={`relative w-6 h-6 flex items-center justify-center ${isDisabled ? 'text-text-disabled' : isActive ? 'text-primary-regular' : 'text-text-tertiary'}`}>
                    {isActive && item.activeIcon ? item.activeIcon : item.icon}
                  </span>
                  <span className={`typo-caption1 ${isDisabled ? 'font-normal text-text-disabled' : isActive ? 'font-semibold text-primary-regular' : 'font-normal text-text-tertiary'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* 실제 컴포넌트 */}
      <section className="mb-4">
        <h2 className="typo-headline1 font-semibold text-text-strong mb-2">실제 BottomTabBar 컴포넌트 (하단 고정)</h2>
        <p className="typo-body2 text-text-secondary">아래에 실제 BottomTabBar가 fixed로 마운트되어 있습니다.</p>
      </section>

      <BottomTabBar
        items={basicItems}
        activeKey={activeKey}
        onChange={setActiveKey}
        safeAreaBottom={true}
      />
    </main>
  );
}
