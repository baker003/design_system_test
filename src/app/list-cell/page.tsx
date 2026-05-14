'use client';

import { useState } from 'react';
import { ListCell } from '@/components/ListCell';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';

// Simple icon components for demo
function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function ListCellPage() {
  const [notifOn, setNotifOn] = useState(true);
  const [darkOn, setDarkOn] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="typo-title3 font-semibold text-text-strong mb-8">ListCell</h1>

      {/* Basic — title only */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-3">Basic</h2>
        <div className="bg-surface rounded-xl overflow-hidden">
          <ListCell title="제목만 있는 셀" showDivider />
          <ListCell title="부제목도 있는 셀" subtitle="보조 설명 텍스트입니다" showDivider />
          <ListCell title="마지막 셀" subtitle="divider 없음" />
        </div>
      </section>

      {/* Leading icon */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-3">Leading Icon</h2>
        <div className="bg-surface rounded-xl overflow-hidden">
          <ListCell
            title="설정"
            subtitle="앱 환경 설정"
            leadingIcon={<SettingsIcon />}
            trailingType="icon"
            onClick={() => alert('설정 클릭')}
            showDivider
          />
          <ListCell
            title="알림"
            subtitle="푸시 알림 관리"
            leadingIcon={<BellIcon />}
            trailingType="icon"
            onClick={() => alert('알림 클릭')}
            showDivider
          />
          <ListCell
            title="보안"
            leadingIcon={<LockIcon />}
            trailingType="icon"
            onClick={() => alert('보안 클릭')}
          />
        </div>
      </section>

      {/* Leading avatar */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-3">Leading Avatar</h2>
        <div className="bg-surface rounded-xl overflow-hidden">
          <ListCell
            title="김소카"
            subtitle="socar@example.com"
            leadingAvatar={<Avatar size="md" initials="김소" status="online" />}
            trailingType="icon"
            onClick={() => alert('프로필 클릭')}
            showDivider
          />
          <ListCell
            title="이드라이브"
            subtitle="drive@example.com"
            leadingAvatar={<Avatar size="md" src="https://i.pravatar.cc/150?img=8" alt="이드라이브" status="busy" />}
            trailingType="icon"
            onClick={() => alert('프로필 클릭')}
          />
        </div>
      </section>

      {/* Trailing types */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-3">Trailing Types</h2>
        <div className="bg-surface rounded-xl overflow-hidden">
          <ListCell
            title="trailing: text"
            subtitle="우측에 텍스트"
            leadingIcon={<SettingsIcon />}
            trailingType="text"
            trailingText="v1.0.0"
            showDivider
          />
          <ListCell
            title="trailing: icon (chevron)"
            leadingIcon={<HelpIcon />}
            trailingType="icon"
            onClick={() => alert('이동')}
            showDivider
          />
          <ListCell
            title="알림 수신"
            subtitle="푸시 알림 허용"
            leadingIcon={<BellIcon />}
            trailingType="switch"
            switchChecked={notifOn}
            onSwitchChange={setNotifOn}
            showDivider
          />
          <ListCell
            title="다크 모드"
            leadingIcon={<SettingsIcon />}
            trailingType="switch"
            switchChecked={darkOn}
            onSwitchChange={setDarkOn}
            showDivider
          />
          <ListCell
            title="trailing: badge"
            leadingIcon={<BellIcon />}
            trailingType="badge"
            trailingBadge={<Badge variant="count" count={5} color="error" />}
          />
        </div>
      </section>

      {/* States */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-3">States</h2>
        <div className="bg-surface rounded-xl overflow-hidden">
          <ListCell
            title="인터랙티브 (클릭 가능)"
            subtitle="눌러보세요"
            leadingIcon={<SettingsIcon />}
            trailingType="icon"
            onClick={() => alert('클릭!')}
            showDivider
          />
          <ListCell
            title="disabled 상태"
            subtitle="비활성화된 셀"
            leadingIcon={<LockIcon />}
            trailingType="icon"
            onClick={() => alert('클릭 안됨')}
            disabled
            showDivider
          />
          <ListCell
            title="정적 셀 (onClick 없음)"
            subtitle="button 태그가 아닌 div"
            leadingIcon={<HelpIcon />}
            trailingType="text"
            trailingText="읽기 전용"
          />
        </div>
      </section>
    </div>
  );
}
