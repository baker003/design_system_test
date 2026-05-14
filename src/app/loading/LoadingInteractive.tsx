'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@/components/Loading';
import { ProgressBar } from '@/components/Loading';

// ── Overlay 데모 (인터랙티브) ─────────────────────────────────────────────────

export function OverlayDemo() {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayDimmedOpen, setOverlayDimmedOpen] = useState(false);

  return (
    <div className="bg-surface rounded-2xl p-6 space-y-4">
      <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">Overlay</h3>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          className="px-4 py-2 bg-primary-regular text-on-primary rounded-xl typo-label1 font-medium"
          onClick={() => {
            setOverlayDimmedOpen(true);
            setTimeout(() => setOverlayDimmedOpen(false), 2000);
          }}
        >
          Overlay + Dimmed (2초)
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-surface-inverse text-on-inverse rounded-xl typo-label1 font-medium"
          onClick={() => {
            setOverlayOpen(true);
            setTimeout(() => setOverlayOpen(false), 2000);
          }}
        >
          Overlay (투명, 2초)
        </button>
      </div>
      {overlayDimmedOpen && (
        <LoadingSpinner
          overlay
          overlayDimmed
          size="xl"
          color="white"
          label="로딩 중"
        />
      )}
      {overlayOpen && (
        <LoadingSpinner
          overlay
          overlayDimmed={false}
          size="xl"
          color="primary"
          label="로딩 중"
        />
      )}
    </div>
  );
}

// ── Progress 슬라이더 데모 (인터랙티브) ──────────────────────────────────────

export function ProgressInteractiveDemo() {
  const [progress, setProgress] = useState(40);

  return (
    <div className="bg-surface rounded-2xl p-6 space-y-4">
      <h3 className="typo-label1 font-medium text-text-secondary uppercase tracking-wider">
        Determinate (interactive)
      </h3>
      <ProgressBar
        size="md"
        value={progress}
        aria-label={`진행률 ${progress}%`}
      />
      <div className="flex items-center gap-3 mt-2">
        <button
          type="button"
          className="px-3 py-1.5 bg-fill-track-off text-text-primary rounded-lg typo-label1"
          onClick={() => setProgress((v) => Math.max(0, v - 10))}
        >
          -10
        </button>
        <span className="typo-body2 text-text-primary w-12 text-center">{progress}%</span>
        <button
          type="button"
          className="px-3 py-1.5 bg-fill-track-off text-text-primary rounded-lg typo-label1"
          onClick={() => setProgress((v) => Math.min(100, v + 10))}
        >
          +10
        </button>
      </div>
    </div>
  );
}
