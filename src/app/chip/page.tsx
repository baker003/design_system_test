'use client';

import { Chip, ChipGroup } from '@/components/Chip';
import type { ChipType, ChipSize } from '@/components/Chip';

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="typo-headline2 font-semibold text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="typo-label2 font-medium text-text-secondary">{title}</h3>
      {children}
    </div>
  );
}

const types: ChipType[] = ['outlined', 'filled'];
const sizes: ChipSize[] = ['lg', 'md', 'sm', 'xs'];

export default function ChipPage() {
  return (
    <div className="min-h-screen bg-white p-8 space-y-10 max-w-3xl mx-auto">
      <h1 className="typo-title2 font-bold text-text-strong">Chip 컴포넌트 프리뷰</h1>

      {/* 1. Type x State */}
      <Section title="1. 타입 x 상태">
        {types.map((type) => (
          <SubSection key={type} title={`type="${type}"`}>
            <div className="flex flex-wrap gap-3 items-center">
              <Chip type={type}>미선택</Chip>
              <Chip type={type} selected>선택됨</Chip>
              <Chip type={type} disabled>비활성</Chip>
              <Chip type={type} selected disabled>선택됨+비활성</Chip>
            </div>
          </SubSection>
        ))}
      </Section>

      {/* 2. Size */}
      <Section title="2. 사이즈">
        {types.map((type) => (
          <SubSection key={type} title={`type="${type}"`}>
            <div className="flex flex-wrap gap-3 items-center">
              {sizes.map((size) => (
                <Chip key={size} type={type} size={size} selected>
                  {`사이즈 ${size}`}
                </Chip>
              ))}
            </div>
          </SubSection>
        ))}
      </Section>

      {/* 3. 아이콘 조합 */}
      <Section title="3. 아이콘">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip leadingIcon={<StarIcon />}>앞쪽</Chip>
          <Chip trailingIcon={<ChevronDownIcon />}>뒤쪽</Chip>
          <Chip leadingIcon={<StarIcon />} trailingIcon={<CloseIcon />}>양쪽</Chip>
          <Chip leadingIcon={<StarIcon />} showLeadingIcon={false}>앞쪽 숨김</Chip>
          <Chip trailingIcon={<ChevronDownIcon />} showTrailingIcon={false}>뒤쪽 숨김</Chip>
        </div>
        <SubSection title="선택됨 + 아이콘">
          <div className="flex flex-wrap gap-3 items-center">
            <Chip type="outlined" selected leadingIcon={<StarIcon />} trailingIcon={<ChevronDownIcon />}>
              아웃라인
            </Chip>
            <Chip type="filled" selected leadingIcon={<StarIcon />} trailingIcon={<ChevronDownIcon />}>
              채움
            </Chip>
            <Chip type="filled" disabled leadingIcon={<StarIcon />} trailingIcon={<CloseIcon />}>
              비활성
            </Chip>
          </div>
        </SubSection>
      </Section>

      {/* 4. 사이즈별 아이콘 */}
      <Section title="4. Chip 사이즈별 아이콘 크기">
        <div className="flex flex-wrap gap-3 items-center">
          {sizes.map((size) => (
            <Chip key={size} size={size} selected leadingIcon={<StarIcon />} trailingIcon={<ChevronDownIcon />}>
              {size}
            </Chip>
          ))}
        </div>
      </Section>

      {/* 5. NEW 뱃지 */}
      <Section title="5. NEW 뱃지">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip showNewBadge>새로운!</Chip>
          <Chip showNewBadge selected>선택됨 새로운</Chip>
          <Chip showNewBadge type="filled">채움 새로운</Chip>
          <Chip showNewBadge disabled>비활성 새로운</Chip>
        </div>
      </Section>

      {/* 6. ChipGroup - Carousel */}
      <Section title="6. ChipGroup - 캐러셀">
        <ChipGroup layout="carousel">
          {Array.from({ length: 12 }, (_, i) => (
            <Chip key={i} selected={i === 0} type={i % 2 === 0 ? 'outlined' : 'filled'}>
              {`칩 ${i + 1}`}
            </Chip>
          ))}
        </ChipGroup>
      </Section>

      {/* 7. ChipGroup - Multiline */}
      <Section title="7. ChipGroup - 멀티라인">
        <ChipGroup layout="multiline">
          {['전체', '대형', '중형', '소형', 'SUV', '전기차', '하이브리드', '수소차'].map((name, i) => (
            <Chip key={name} selected={i === 0} type="filled">{name}</Chip>
          ))}
        </ChipGroup>
      </Section>

      {/* 8. ChipGroup - 커스텀 간격 */}
      <Section title="8. ChipGroup - 커스텀 간격 (12px)">
        <ChipGroup layout="multiline" gap={12}>
          <Chip>간격 12</Chip>
          <Chip>사이</Chip>
          <Chip>칩들</Chip>
        </ChipGroup>
      </Section>

      {/* 9. 전체 조합 */}
      <Section title="9. 전체 조합">
        <ChipGroup layout="multiline">
          <Chip type="outlined" selected showNewBadge leadingIcon={<StarIcon />} trailingIcon={<ChevronDownIcon />}>
            필터
          </Chip>
          <Chip type="filled" selected size="sm" leadingIcon={<StarIcon />}>채움</Chip>
          <Chip type="outlined" size="xs" trailingIcon={<CloseIcon />}>XS 본문</Chip>
          <Chip type="filled" disabled leadingIcon={<StarIcon />} showNewBadge>비활성</Chip>
        </ChipGroup>
      </Section>
    </div>
  );
}
