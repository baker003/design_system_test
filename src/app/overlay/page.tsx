import OverlayDemo from './OverlayDemo';

export default function OverlayPage() {
  return (
    <main className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="typo-title3 font-bold text-text-strong mb-2">Overlay</h1>
        <p className="typo-body2 text-text-secondary mb-8">
          Modal / Dialog 컴포넌트 — 포커스 트랩, 4가지 크기, backdrop/Escape 닫기 지원
        </p>
        <OverlayDemo />
      </div>
    </main>
  );
}
