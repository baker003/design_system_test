import { PageControl } from '@/components/PageControl';

export default function PageControlPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <h1 className="typo-title3 font-bold text-text-strong">Page Indicator</h1>

        {/* Medium / Alternative=false */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Size=Medium · Alternative=False</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={5} current={1} size="medium" alternative={false} />
          </div>
        </section>

        {/* Medium / Alternative=true */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Size=Medium · Alternative=True</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={5} current={1} size="medium" alternative={true} />
          </div>
        </section>

        {/* Small / Alternative=false */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Size=Small · Alternative=False</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={10} current={3} size="small" alternative={false} />
          </div>
        </section>

        {/* Small / Alternative=true */}
        <section className="space-y-4">
          <h2 className="typo-headline1 font-semibold text-text-primary">Size=Small · Alternative=True</h2>
          <div className="bg-surface rounded-2xl p-6 flex justify-center">
            <PageControl total={10} current={3} size="small" alternative={true} />
          </div>
        </section>
      </div>
    </main>
  );
}
