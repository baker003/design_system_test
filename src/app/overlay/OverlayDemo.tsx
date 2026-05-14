'use client';

import { useState } from 'react';
import { Overlay } from '@/components/Overlay';
import { ActionButton } from '@/components/Button';
import type { OverlaySize } from '@/components/Overlay';

interface DemoConfig {
  size: OverlaySize;
  title?: string;
  hasFooter: boolean;
  closeOnBackdropClick: boolean;
  closeOnEscape: boolean;
  longContent: boolean;
}

const SIZES: OverlaySize[] = ['sm', 'md', 'lg', 'fullscreen'];

const DEFAULT_CONFIG: DemoConfig = {
  size: 'md',
  title: '모달 제목',
  hasFooter: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  longContent: false,
};

export default function OverlayDemo() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const [noTitleOpen, setNoTitleOpen] = useState(false);
  const [customHeaderOpen, setCustomHeaderOpen] = useState(false);

  const openWith = (partial: Partial<DemoConfig>) => {
    setConfig({ ...DEFAULT_CONFIG, ...partial });
    setOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* 크기 변형 */}
      <section>
        <h2 className="typo-headline1 font-semibold text-text-strong mb-4">크기 변형</h2>
        <div className="flex flex-wrap gap-3">
          {SIZES.map((size) => (
            <ActionButton
              key={size}
              variant="secondary"
              size="medium"
              onClick={() => openWith({ size, title: `Size: ${size}` })}
            >
              {size}
            </ActionButton>
          ))}
        </div>
      </section>

      {/* 헤더 변형 */}
      <section>
        <h2 className="typo-headline1 font-semibold text-text-strong mb-4">헤더 변형</h2>
        <div className="flex flex-wrap gap-3">
          <ActionButton
            variant="secondary"
            size="medium"
            onClick={() => setNoTitleOpen(true)}
          >
            제목 없음
          </ActionButton>
          <ActionButton
            variant="secondary"
            size="medium"
            onClick={() => setCustomHeaderOpen(true)}
          >
            커스텀 헤더
          </ActionButton>
          <ActionButton
            variant="secondary"
            size="medium"
            onClick={() => openWith({ title: '닫기 버튼 없음', hasFooter: false })}
          >
            닫기 버튼 제거 (backdrop 클릭)
          </ActionButton>
        </div>
      </section>

      {/* 동작 설정 */}
      <section>
        <h2 className="typo-headline1 font-semibold text-text-strong mb-4">동작 설정</h2>
        <div className="flex flex-wrap gap-3">
          <ActionButton
            variant="secondary"
            size="medium"
            onClick={() =>
              openWith({
                title: 'Backdrop 닫기 비활성',
                closeOnBackdropClick: false,
                hasFooter: true,
              })
            }
          >
            Backdrop 닫기 비활성
          </ActionButton>
          <ActionButton
            variant="secondary"
            size="medium"
            onClick={() =>
              openWith({
                title: 'Escape 닫기 비활성',
                closeOnEscape: false,
                hasFooter: true,
              })
            }
          >
            Escape 닫기 비활성
          </ActionButton>
          <ActionButton
            variant="secondary"
            size="medium"
            onClick={() =>
              openWith({ title: '긴 콘텐츠 (스크롤)', longContent: true, hasFooter: true })
            }
          >
            긴 콘텐츠 (스크롤)
          </ActionButton>
        </div>
      </section>

      {/* 메인 데모 Overlay */}
      <Overlay
        open={open}
        onClose={() => setOpen(false)}
        size={config.size}
        title={config.title}
        closeOnBackdropClick={config.closeOnBackdropClick}
        closeOnEscape={config.closeOnEscape}
        footer={
          config.hasFooter ? (
            <>
              <ActionButton
                variant="secondary"
                size="medium"
                onClick={() => setOpen(false)}
              >
                취소
              </ActionButton>
              <ActionButton
                variant="primary"
                size="medium"
                onClick={() => setOpen(false)}
              >
                확인
              </ActionButton>
            </>
          ) : undefined
        }
      >
        {config.longContent ? (
          <div className="space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i} className="typo-body2 text-text-primary">
                콘텐츠 단락 {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        ) : (
          <p className="typo-body2 text-text-primary">
            모달 본문 콘텐츠입니다. 여기에 필요한 내용을 넣을 수 있습니다.
          </p>
        )}
      </Overlay>

      {/* 제목 없는 Overlay */}
      <Overlay
        open={noTitleOpen}
        onClose={() => setNoTitleOpen(false)}
        aria-label="제목 없는 모달"
        footer={
          <ActionButton
            variant="primary"
            size="medium"
            onClick={() => setNoTitleOpen(false)}
          >
            닫기
          </ActionButton>
        }
      >
        <p className="typo-body2 text-text-primary">
          title prop 없이 aria-label만 설정한 모달입니다.
        </p>
      </Overlay>

      {/* 커스텀 헤더 Overlay */}
      <Overlay
        open={customHeaderOpen}
        onClose={() => setCustomHeaderOpen(false)}
        header={
          <div className="flex flex-col gap-1">
            <span className="typo-headline2 font-semibold text-text-strong">커스텀 헤더</span>
            <span className="typo-label1 text-text-secondary">부제목을 자유롭게 구성</span>
          </div>
        }
        footer={
          <ActionButton
            variant="primary"
            size="medium"
            onClick={() => setCustomHeaderOpen(false)}
          >
            확인
          </ActionButton>
        }
      >
        <p className="typo-body2 text-text-primary">
          header prop으로 헤더 영역을 커스터마이징할 수 있습니다.
        </p>
      </Overlay>
    </div>
  );
}
