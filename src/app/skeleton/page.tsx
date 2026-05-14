import { Skeleton } from '@/components/Skeleton';

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
      <div className="bg-surface rounded-xl p-4">{children}</div>
    </div>
  );
}

export default function SkeletonPage() {
  return (
    <main className="min-h-screen bg-bg-secondary p-8">
      <h1 className="typo-title3 font-bold text-text-strong mb-10">Skeleton</h1>

      <Section title="Length">
        <DemoRow label="100% (기본)">
          <Skeleton length="100%" />
        </DemoRow>

        <DemoRow label="75%">
          <Skeleton length="75%" />
        </DemoRow>

        <DemoRow label="50%">
          <Skeleton length="50%" />
        </DemoRow>

        <DemoRow label="25%">
          <Skeleton length="25%" />
        </DemoRow>
      </Section>
    </main>
  );
}
