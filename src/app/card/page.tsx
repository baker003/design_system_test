'use client';

import { Card } from '@/components/Card';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="typo-headline1 font-semibold text-text-strong mb-3">{children}</h2>
  );
}

function PreviewGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default function CardPage() {
  return (
    <main className="min-h-screen bg-background p-6">
      <h1 className="typo-title3 font-bold text-text-strong mb-8">Card</h1>

      {/* Variants */}
      <PreviewGroup title="Variants">
        <Card variant="elevated">
          <p className="typo-body2 text-text-primary">Elevated — shadow-sm, white background</p>
        </Card>

        <Card variant="outlined">
          <p className="typo-body2 text-text-primary">Outlined — border, white background</p>
        </Card>

        <Card variant="filled">
          <p className="typo-body2 text-text-primary">Filled — gray-100 background</p>
        </Card>
      </PreviewGroup>

      {/* Header / Footer slots */}
      <PreviewGroup title="Header + Footer">
        <Card
          variant="elevated"
          header={
            <p className="typo-label1 font-semibold text-text-strong">카드 헤더</p>
          }
          footer={
            <p className="typo-caption1 text-text-tertiary">카드 푸터 — 보조 정보 영역</p>
          }
        >
          <p className="typo-body2 text-text-primary">본문 콘텐츠 영역입니다. header 아래 Divider, footer 위 Divider가 자동으로 추가됩니다.</p>
        </Card>

        <Card
          variant="outlined"
          header={
            <div className="flex items-center justify-between">
              <p className="typo-label1 font-semibold text-text-strong">이용 내역</p>
              <p className="typo-caption1 text-text-tertiary">2026.05.14</p>
            </div>
          }
        >
          <p className="typo-body2 text-text-secondary">header만 있고 footer가 없는 경우입니다.</p>
        </Card>
      </PreviewGroup>

      {/* Interactive (onClick) */}
      <PreviewGroup title="Interactive Card">
        <Card
          variant="elevated"
          aria-label="인터랙티브 카드 예시"
          onClick={(e) => {
            console.log('card clicked', e);
          }}
        >
          <p className="typo-body2 text-text-primary">클릭 가능한 카드입니다. hover / active / focus-visible 상태가 있습니다.</p>
          <p className="typo-caption1 text-text-tertiary mt-1">button으로 렌더됩니다.</p>
        </Card>

        <Card
          variant="outlined"
          aria-label="비활성 카드 예시"
          disabled
          onClick={() => {}}
        >
          <p className="typo-body2 text-text-primary">disabled 상태의 인터랙티브 카드입니다.</p>
        </Card>
      </PreviewGroup>

      {/* noPadding */}
      <PreviewGroup title="noPadding">
        <Card variant="elevated" noPadding>
          <div className="bg-background h-32 flex items-center justify-center rounded-2xl">
            <p className="typo-label1 text-text-secondary">패딩 없음 — 이미지/미디어 전체 영역</p>
          </div>
        </Card>
      </PreviewGroup>

      {/* Complex content */}
      <PreviewGroup title="복합 콘텐츠">
        <Card
          variant="elevated"
          header={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-regular flex items-center justify-center">
                <span className="typo-label1 font-semibold text-on-primary">DS</span>
              </div>
              <div>
                <p className="typo-label1 font-semibold text-text-strong">디자인 시스템</p>
                <p className="typo-caption1 text-text-tertiary">DS_2 v2.0</p>
              </div>
            </div>
          }
          footer={
            <div className="flex gap-2 justify-end">
              <span className="typo-caption1 text-text-tertiary">상세보기</span>
            </div>
          }
        >
          <p className="typo-body2 text-text-primary">Card 컴포넌트는 elevated / outlined / filled 세 가지 variant를 지원하며, header / children / footer 슬롯을 통해 자유롭게 구성할 수 있습니다.</p>
        </Card>
      </PreviewGroup>
    </main>
  );
}
