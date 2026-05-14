import { Divider } from '@/components/Divider';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="typo-headline1 font-semibold text-text-strong mb-6">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
    </section>
  );
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="typo-caption1 text-text-tertiary mb-2">{label}</p>
      {children}
    </div>
  );
}

export default function DividerPage() {
  return (
    <main className="min-h-screen bg-bg-secondary p-8">
      <h1 className="typo-title3 font-bold text-text-strong mb-10">Divider</h1>

      <Section title="Horizontal — Strength">
        <DemoRow label="regular (기본)">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">위 콘텐츠</p>
            <Divider strength="regular" />
            <p className="typo-body1 text-text-primary mt-3">아래 콘텐츠</p>
          </div>
        </DemoRow>

        <DemoRow label="weak">
          <div className="bg-surface rounded-xl p-4">
            <p className="typo-body1 text-text-primary mb-3">위 콘텐츠</p>
            <Divider strength="weak" />
            <p className="typo-body1 text-text-primary mt-3">아래 콘텐츠</p>
          </div>
        </DemoRow>
      </Section>

      <Section title="Vertical">
        <DemoRow label="vertical — regular">
          <div className="bg-surface rounded-xl p-4 flex items-stretch gap-4 h-16">
            <span className="typo-body1 text-text-primary flex items-center">항목 A</span>
            <Divider orientation="vertical" strength="regular" />
            <span className="typo-body1 text-text-primary flex items-center">항목 B</span>
            <Divider orientation="vertical" strength="regular" />
            <span className="typo-body1 text-text-primary flex items-center">항목 C</span>
          </div>
        </DemoRow>

        <DemoRow label="vertical — weak">
          <div className="bg-surface rounded-xl p-4 flex items-stretch gap-4 h-16">
            <span className="typo-body1 text-text-primary flex items-center">항목 A</span>
            <Divider orientation="vertical" strength="weak" />
            <span className="typo-body1 text-text-primary flex items-center">항목 B</span>
          </div>
        </DemoRow>
      </Section>
    </main>
  );
}
