// Server Component (F-1: 'use client' 제거)
import { LoadingSpinner } from '@/components/Loading';
import { ProgressBar } from '@/components/Loading';
import { OverlayDemo, ProgressInteractiveDemo } from './LoadingInteractive';

export default function LoadingPreviewPage() {
  return (
    <main className="min-h-screen bg-background p-8 space-y-12">
      <header>
        <h1 className="typo-title2 font-bold text-text-strong">Loading Components</h1>
        <p className="typo-body2 text-text-secondary mt-1">
          LoadingSpinner · ProgressBar 프리뷰
        </p>
      </header>

      {/* ── LoadingSpinner ── */}
      <section className="space-y-6">
        <h2 className="typo-heading2 font-semibold text-text-primary">LoadingSpinner</h2>

        {/* Size variants */}
        <div className="bg-surface rounded-2xl p-6 space-y-4">
          <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">Size</h3>
          <div className="flex items-center gap-6 flex-wrap">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <LoadingSpinner size={size} color="primary" label={`로딩 중 (${size})`} />
                <span className="typo-caption1 text-text-tertiary">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color variants */}
        <div className="bg-surface rounded-2xl p-6 space-y-4">
          <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">Color</h3>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <LoadingSpinner size="lg" color="primary" label="로딩 중 (primary)" />
              <span className="typo-caption1 text-text-tertiary">primary</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-primary-regular p-4 rounded-xl">
              <LoadingSpinner size="lg" color="white" label="로딩 중 (white)" />
              <span className="typo-caption1 text-on-primary">white</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-status-positive">
              <LoadingSpinner size="lg" color="current" label="로딩 중 (current)" />
              <span className="typo-caption1 text-text-tertiary">current (green)</span>
            </div>
          </div>
        </div>

        {/* Overlay — 인터랙티브 Client Component */}
        <OverlayDemo />
      </section>

      {/* ── ProgressBar ── */}
      <section className="space-y-6">
        <h2 className="typo-heading2 font-semibold text-text-primary">ProgressBar</h2>

        {/* Size variants */}
        <div className="bg-surface rounded-2xl p-6 space-y-4">
          <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">Size</h3>
          <div className="space-y-4">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size} className="space-y-1">
                <span className="typo-caption1 text-text-tertiary">{size}</span>
                <ProgressBar
                  size={size}
                  value={65}
                  aria-label={`진행률 65% (${size})`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Color variants */}
        <div className="bg-surface rounded-2xl p-6 space-y-4">
          <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">Color</h3>
          <div className="space-y-4">
            {(['primary', 'positive', 'caution', 'negative'] as const).map((color) => (
              <div key={color} className="space-y-1">
                <span className="typo-caption1 text-text-tertiary">{color}</span>
                <ProgressBar
                  size="md"
                  color={color}
                  value={70}
                  aria-label={`진행률 70% (${color})`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Indeterminate */}
        <div className="bg-surface rounded-2xl p-6 space-y-4">
          <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">Indeterminate</h3>
          <div className="space-y-4">
            <ProgressBar
              mode="indeterminate"
              size="md"
              color="primary"
              aria-label="로딩 중"
            />
            <ProgressBar
              mode="indeterminate"
              size="md"
              color="positive"
              aria-label="로딩 중"
            />
          </div>
        </div>

        {/* Determinate — 인터랙티브 Client Component */}
        <ProgressInteractiveDemo />

        {/* Track color + rounded */}
        <div className="bg-surface rounded-2xl p-6 space-y-4">
          <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">
            trackColor · rounded
          </h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="typo-caption1 text-text-tertiary">trackColor=default, rounded=true</span>
              <ProgressBar value={55} aria-label="진행률 55%" />
            </div>
            <div className="space-y-1 bg-fill-track-off p-3 rounded-xl">
              <span className="typo-caption1 text-text-tertiary">trackColor=transparent, rounded=true</span>
              <ProgressBar value={55} trackColor="transparent" aria-label="진행률 55%" />
            </div>
            <div className="space-y-1">
              <span className="typo-caption1 text-text-tertiary">rounded=false</span>
              <ProgressBar value={55} rounded={false} aria-label="진행률 55%" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
