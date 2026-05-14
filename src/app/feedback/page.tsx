'use client';

import { useState } from 'react';
import { Toast, Snackbar, ToastProvider, useToast } from '@/components/Feedback';
import type { FeedbackType, ToastPosition } from '@/components/Feedback';

// ── 섹션: 개별 Toast 미리보기 ──────────────────────────────────────────────────

const feedbackTypes: FeedbackType[] = ['info', 'success', 'warning', 'error'];
const positions: ToastPosition[] = [
  'bottom-center', 'bottom-left', 'bottom-right',
  'top-center', 'top-left', 'top-right',
];

function ToastSection() {
  const [activeToasts, setActiveToasts] = useState<Record<string, boolean>>({});

  const show = (key: string) => setActiveToasts((p) => ({ ...p, [key]: true }));
  const hide = (key: string) => setActiveToasts((p) => ({ ...p, [key]: false }));

  return (
    <section className="space-y-6">
      <h2 className="typo-heading2 font-semibold text-text-strong">Toast</h2>

      {/* Type 별 */}
      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">타입 (type)</p>
        <div className="flex flex-wrap gap-3">
          {feedbackTypes.map((type) => {
            const key = `toast-type-${type}`;
            return (
              <div key={type}>
                <button
                  type="button"
                  onClick={() => show(key)}
                  className="px-4 py-2 rounded-lg bg-surface-inverse text-on-inverse typo-label1 font-medium hover:opacity-80 transition-opacity capitalize"
                >
                  {type}
                </button>
                <Toast
                  open={!!activeToasts[key]}
                  onClose={() => hide(key)}
                  message={`${type} 메시지입니다.`}
                  type={type}
                  position="bottom-center"
                  duration={3000}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Position 별 */}
      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">위치 (position)</p>
        <div className="flex flex-wrap gap-3">
          {positions.map((pos) => {
            const key = `toast-pos-${pos}`;
            return (
              <div key={pos}>
                <button
                  type="button"
                  onClick={() => show(key)}
                  className="px-4 py-2 rounded-lg bg-primary-regular text-on-primary typo-label1 font-medium hover:opacity-80 transition-opacity"
                >
                  {pos}
                </button>
                <Toast
                  open={!!activeToasts[key]}
                  onClose={() => hide(key)}
                  message={`${pos} 위치 Toast`}
                  type="info"
                  position={pos}
                  duration={3000}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 섹션: 개별 Snackbar 미리보기 ──────────────────────────────────────────────

function SnackbarSection() {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const show = (key: string) => setActive((p) => ({ ...p, [key]: true }));
  const hide = (key: string) => setActive((p) => ({ ...p, [key]: false }));

  return (
    <section className="space-y-6">
      <h2 className="typo-heading2 font-semibold text-text-strong">Snackbar</h2>

      {/* 타입 별 */}
      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">타입 (type)</p>
        <div className="flex flex-wrap gap-3">
          {feedbackTypes.map((type) => {
            const key = `snack-type-${type}`;
            return (
              <div key={type}>
                <button
                  type="button"
                  onClick={() => show(key)}
                  className="px-4 py-2 rounded-lg bg-surface-inverse text-on-inverse typo-label1 font-medium hover:opacity-80 transition-opacity capitalize"
                >
                  {type}
                </button>
                <Snackbar
                  open={!!active[key]}
                  onClose={() => hide(key)}
                  message={`${type} 스낵바 메시지입니다.`}
                  type={type}
                  position="bottom-center"
                  duration={4000}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">액션 버튼 포함</p>
        <div className="flex flex-wrap gap-3">
          {(['info', 'success', 'warning', 'error'] as FeedbackType[]).map((type) => {
            const key = `snack-action-${type}`;
            return (
              <div key={type}>
                <button
                  type="button"
                  onClick={() => show(key)}
                  className="px-4 py-2 rounded-lg bg-primary-regular text-on-primary typo-label1 font-medium hover:opacity-80 transition-opacity capitalize"
                >
                  {type} + 액션
                </button>
                <Snackbar
                  open={!!active[key]}
                  onClose={() => hide(key)}
                  message={`${type} 알림이 발생했습니다.`}
                  type={type}
                  position="bottom-center"
                  duration={6000}
                  action={{ label: '확인', onClick: () => hide(key) }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 닫기 버튼 없음 */}
      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">닫기 버튼 없음</p>
        <button
          type="button"
          onClick={() => show('snack-noclose')}
          className="px-4 py-2 rounded-lg bg-surface-inverse text-on-inverse typo-label1 font-medium hover:opacity-80 transition-opacity"
        >
          showCloseButton=false
        </button>
        <Snackbar
          open={!!active['snack-noclose']}
          onClose={() => hide('snack-noclose')}
          message="닫기 버튼이 없는 스낵바입니다."
          type="info"
          showCloseButton={false}
          position="bottom-center"
          duration={4000}
        />
      </div>
    </section>
  );
}

// ── 섹션: useToast 훅 데모 ─────────────────────────────────────────────────────

function UseToastDemo() {
  const { toast, snackbar } = useToast();

  return (
    <section className="space-y-6">
      <h2 className="typo-heading2 font-semibold text-text-strong">useToast 훅 (명령형 API)</h2>

      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">toast()</p>
        <div className="flex flex-wrap gap-3">
          {feedbackTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toast(`toast() — ${type} 메시지`, { type, position: 'bottom-right' })}
              className="px-4 py-2 rounded-lg bg-surface-inverse text-on-inverse typo-label1 font-medium hover:opacity-80 transition-opacity capitalize"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">snackbar()</p>
        <div className="flex flex-wrap gap-3">
          {feedbackTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                snackbar(`snackbar() — ${type} 메시지`, {
                  type,
                  position: 'bottom-left',
                  action: { label: '실행취소', onClick: () => {} },
                })
              }
              className="px-4 py-2 rounded-lg bg-primary-regular text-on-primary typo-label1 font-medium hover:opacity-80 transition-opacity capitalize"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="typo-label1 font-medium text-text-secondary mb-3">복수 누적 (top-center)</p>
        <button
          type="button"
          onClick={() => {
            toast('첫 번째 알림입니다.', { type: 'info', position: 'top-center' });
            setTimeout(() => toast('두 번째 알림입니다.', { type: 'success', position: 'top-center' }), 300);
            setTimeout(() => toast('세 번째 알림입니다.', { type: 'warning', position: 'top-center' }), 600);
          }}
          className="px-4 py-2 rounded-lg bg-status-caution text-on-inverse typo-label1 font-medium hover:opacity-80 transition-opacity"
        >
          3개 동시 표시
        </button>
      </div>
    </section>
  );
}

// ── 페이지 ────────────────────────────────────────────────────────────────────

export default function FeedbackPage() {
  return (
    <ToastProvider>
      <main className="min-h-screen bg-background px-6 py-10 space-y-12 max-w-3xl mx-auto">
        <header>
          <h1 className="typo-title2 font-bold text-text-strong">Feedback</h1>
          <p className="typo-body1 text-text-secondary mt-1">
            Toast, Snackbar 컴포넌트 프리뷰
          </p>
        </header>

        <ToastSection />
        <hr className="border-border" />
        <SnackbarSection />
        <hr className="border-border" />
        <UseToastDemo />
      </main>
    </ToastProvider>
  );
}
