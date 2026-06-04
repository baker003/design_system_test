'use client';

import { useCallback, useRef, useState } from 'react';
import { TopAppbar, LeadingButton } from '@/components/TopAppbar';
import { ActionButton, TextButton } from '@/components/Button';
import { Chip, ChipGroup } from '@/components/Chip';
import { useToast } from '@/components/Feedback/ToastProvider';
import StarRatingInput from '@/components/StarRatingInput';
import SuccessFill from '@/components/Icons/SuccessFill';

// ── 상수 ──────────────────────────────────────────────────────────

const RATING_LABELS: Record<number, string> = {
  1: '매우 불만족',
  2: '불만족',
  3: '보통',
  4: '만족',
  5: '매우 만족',
};

const POSITIVE_CHIPS = [
  '차량이 깨끗했어요',
  '인수 과정이 편했어요',
  '반납이 간편했어요',
  '차량 상태가 좋았어요',
  '앱이 편리했어요',
  '가격이 합리적이었어요',
];

const NEGATIVE_CHIPS = [
  '차량이 더러웠어요',
  '차량 상태가 불량했어요',
  '인수 과정이 불편했어요',
  '반납 처리가 오래 걸렸어요',
  '앱이 불편했어요',
  '고객 응대가 아쉬웠어요',
  '주차 공간 찾기 어려웠어요',
];

const MAX_COMMENT_LENGTH = 500;

// ── 타입 ──────────────────────────────────────────────────────────

interface ReturnSatisfactionClientProps {
  reservationId: string;
  vehicleName: string;
  usagePeriod: string;
  onComplete?: () => void;
  onSkip?: () => void;
}

interface SatisfactionFormState {
  rating: number | null;
  selectedChips: string[];
  comment: string;
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────

export default function ReturnSatisfactionClient({
  reservationId,
  vehicleName,
  usagePeriod,
  onComplete,
  onSkip,
}: ReturnSatisfactionClientProps) {
  const { toast } = useToast();
  const satisfactionSectionRef = useRef<HTMLDivElement>(null);
  const feedbackSectionRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<SatisfactionFormState>({
    rating: null,
    selectedChips: [],
    comment: '',
  });
  const [ratingError, setRatingError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── 핸들러 ──

  const handleRatingChange = useCallback((rating: number) => {
    setForm((prev) => {
      const prevRating = prev.rating;

      // 최초 선택(null → 숫자)이면 chip 초기화
      if (prevRating === null) {
        return { ...prev, rating, selectedChips: [] };
      }

      const isSamePolarity =
        (prevRating >= 4 && rating >= 4) ||
        (prevRating <= 3 && rating <= 3);

      return {
        ...prev,
        rating,
        selectedChips: isSamePolarity ? prev.selectedChips : [],
      };
    });
    setRatingError(false);
  }, []);

  const handleChipToggle = useCallback((label: string) => {
    setForm((prev) => {
      const isSelected = prev.selectedChips.includes(label);
      return {
        ...prev,
        selectedChips: isSelected
          ? prev.selectedChips.filter((c) => c !== label)
          : [...prev.selectedChips, label],
      };
    });
  }, []);

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= MAX_COMMENT_LENGTH) {
        setForm((prev) => ({ ...prev, comment: value }));
      }
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (form.rating === null) {
      setRatingError(true);
      satisfactionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        reservationId,
        rating: form.rating,
        quickFeedbackItems: form.selectedChips,
        comment: form.comment.trim() || null,
        submittedAt: new Date().toISOString(),
        platform: 'web' as const,
      };

      const response = await fetch(
        `/api/reservations/${reservationId}/satisfaction`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 409) {
        toast('이미 평가를 완료했어요.', { type: 'info' });
        onComplete?.();
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message ?? '제출에 실패했어요.');
      }

      toast('의견을 보내주셔서 감사해요!', { type: 'success' });
      onComplete?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '잠시 후 다시 시도해 주세요.';
      toast(message, { type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [form, reservationId, toast, onComplete]);


  // ── 파생 상태 ──

  const currentChips =
    form.rating !== null
      ? form.rating >= 4
        ? POSITIVE_CHIPS
        : NEGATIVE_CHIPS
      : [];

  const feedbackLabel =
    form.rating !== null && form.rating >= 4
      ? '어떤 점이 좋았나요?'
      : '어떤 점이 불편했나요?';

  return (
    <div className="relative flex flex-col min-h-screen bg-surface">
      {/* 상단 앱바 */}
      <TopAppbar
        theme="white"
        sticky
        leading={
          <LeadingButton
            variant="close"
            onClick={onSkip}
            aria-label="닫기"
          />
        }
      />

      {/* 스크롤 영역 */}
      <div
        className="flex-1 overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom,0px)+128px)]"
      >
        {/* 반납 완료 확인 헤더 */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <SuccessFill
            size={32}
            color="var(--status-positive-regular)"
          />
          <h1 className="typo-title3 font-bold text-text-strong mt-3 text-center">
            반납이 완료됐어요!
          </h1>
          <p className="typo-body2 font-normal text-text-secondary mt-1 text-center">
            {usagePeriod}
            <br />
            {vehicleName}
          </p>
        </div>

        {/* 섹션 구분선 */}
        <div className="h-px bg-border-weak -mx-5" />

        {/* 별점 선택 섹션 */}
        <div ref={satisfactionSectionRef} className="pt-8 pb-6">
          <p className="typo-headline1 font-semibold text-text-strong">
            이번 쏘카 어떠셨나요?
          </p>

          {ratingError && (
            <p
              role="alert"
              className="typo-caption1 font-normal text-status-negative mt-1"
            >
              별점을 선택해 주세요.
            </p>
          )}

          <StarRatingInput
            value={form.rating}
            onChange={handleRatingChange}
            error={ratingError}
            className="mt-4"
          />

          {/* 감정 레이블 */}
          <p
            className={[
              'typo-caption1 font-normal text-text-tertiary mt-2 text-center',
              'transition-opacity duration-200',
              form.rating !== null ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            aria-live="polite"
            aria-atomic="true"
          >
            {form.rating !== null ? RATING_LABELS[form.rating] : ''}
          </p>
        </div>

        {/* 빠른 피드백 섹션 — 별점 선택 후 노출 */}
        <div
          ref={feedbackSectionRef}
          className={[
            'overflow-hidden transition-all duration-300 ease-in-out',
            form.rating !== null
              ? 'opacity-100 max-h-[600px]'
              : 'opacity-0 max-h-0',
          ].join(' ')}
          aria-hidden={form.rating === null}
        >
          <div className="pb-6">
            <p className="typo-body1 font-semibold text-text-strong mb-3">
              {feedbackLabel}
            </p>
            <ChipGroup layout="multiline" gap={8}>
              {currentChips.map((label) => (
                <Chip
                  key={label}
                  type="outlined"
                  size="md"
                  selected={form.selectedChips.includes(label)}
                  onClick={() => handleChipToggle(label)}
                  tabIndex={form.rating === null ? -1 : undefined}
                >
                  {label}
                </Chip>
              ))}
            </ChipGroup>
          </div>
        </div>

        {/* 추가 의견 섹션 */}
        <div className="pt-2 pb-4">
          <p className="typo-body1 font-semibold text-text-strong mb-2">
            추가 의견 (선택)
          </p>

          {/* 멀티라인 텍스트 입력 */}
          <div
            className={[
              'flex flex-col rounded-[14px] border border-border bg-surface',
              'transition-colors',
              'focus-within:ring-2 focus-within:ring-primary-regular focus-within:ring-offset-0',
            ].join(' ')}
          >
            <textarea
              value={form.comment}
              onChange={handleCommentChange}
              rows={4}
              placeholder="추가 의견을 입력해 주세요. (선택)"
              maxLength={MAX_COMMENT_LENGTH}
              aria-label="추가 의견"
              aria-describedby="comment-char-count"
              className={[
                'flex-1 bg-transparent outline-none resize-none',
                'px-4 pt-4 pb-2',
                'typo-body1 text-text-primary',
                'placeholder:text-text-disabled',
              ].join(' ')}
            />
            <div className="flex justify-end px-4 pb-3">
              <span
                id="comment-char-count"
                className="typo-caption1 font-normal text-text-tertiary"
              >
                {form.comment.length}/{MAX_COMMENT_LENGTH}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 CTA 영역 */}
      <div
        className={[
          'fixed bottom-0 left-0 right-0',
          'bg-surface border-t border-border',
          'px-5 pt-4',
          'pb-[calc(env(safe-area-inset-bottom,0px)+16px)]',
        ].join(' ')}
      >
        <ActionButton
          variant="primary"
          size="large"
          fullWidth
          disabled={form.rating === null}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          의견 보내기
        </ActionButton>
        <TextButton
          variant="secondary"
          size={16}
          className="w-full mt-3 mb-2 flex justify-center"
          onClick={onSkip}
        >
          다음에 할게요
        </TextButton>
      </div>
    </div>
  );
}
