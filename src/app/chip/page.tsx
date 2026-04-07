'use client';

import { Chip, ChipGroup } from '@/components/Chip';
import type { ChipType, ChipSize } from '@/components/Chip';

/* ── 간단한 인라인 SVG 아이콘 ── */
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

/* ── 섹션 래퍼 ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[18px] font-semibold text-text-strong">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[14px] font-medium text-text-secondary">{title}</h3>
      {children}
    </div>
  );
}

const types: ChipType[] = ['outlined', 'filled'];
const sizes: ChipSize[] = ['md', 'sm', 'xs'];

export default function ChipPage() {
  return (
    <div className="min-h-screen bg-white p-8 space-y-10 max-w-3xl mx-auto">
      <h1 className="text-[24px] font-bold text-text-strong">
        Chip Component Preview
      </h1>

      {/* 1. Type x State 매트릭스 */}
      <Section title="1. Type x State">
        {types.map((type) => (
          <SubSection key={type} title={`type="${type}"`}>
            <div className="flex flex-wrap gap-3 items-center">
              <Chip type={type} label="Unselected" />
              <Chip type={type} label="Selected" selected />
              <Chip type={type} label="Disabled" disabled />
              <Chip type={type} label="Selected+Disabled" selected disabled />
            </div>
          </SubSection>
        ))}
      </Section>

      {/* 2. Size 비교 */}
      <Section title="2. Sizes">
        {types.map((type) => (
          <SubSection key={type} title={`type="${type}"`}>
            <div className="flex flex-wrap gap-3 items-center">
              {sizes.map((size) => (
                <Chip
                  key={size}
                  type={type}
                  size={size}
                  label={`Size ${size}`}
                  selected
                />
              ))}
            </div>
          </SubSection>
        ))}
      </Section>

      {/* 3. 아이콘 조합 */}
      <Section title="3. Icons">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="Leading" leadingIcon={<StarIcon />} />
          <Chip label="Trailing" trailingIcon={<ChevronDownIcon />} />
          <Chip
            label="Both"
            leadingIcon={<StarIcon />}
            trailingIcon={<CloseIcon />}
          />
          <Chip
            label="Leading hidden"
            leadingIcon={<StarIcon />}
            showLeadingIcon={false}
          />
          <Chip
            label="Trailing hidden"
            trailingIcon={<ChevronDownIcon />}
            showTrailingIcon={false}
          />
        </div>
        <SubSection title="Selected with icons">
          <div className="flex flex-wrap gap-3 items-center">
            <Chip
              label="Outlined"
              type="outlined"
              selected
              leadingIcon={<StarIcon />}
              trailingIcon={<ChevronDownIcon />}
            />
            <Chip
              label="Filled"
              type="filled"
              selected
              leadingIcon={<StarIcon />}
              trailingIcon={<ChevronDownIcon />}
            />
            <Chip
              label="Disabled"
              type="filled"
              disabled
              leadingIcon={<StarIcon />}
              trailingIcon={<CloseIcon />}
            />
          </div>
        </SubSection>
      </Section>

      {/* 4. Icon sizes per chip size */}
      <Section title="4. Icon Sizes per Chip Size">
        <div className="flex flex-wrap gap-3 items-center">
          {sizes.map((size) => (
            <Chip
              key={size}
              size={size}
              selected
              label={size}
              leadingIcon={<StarIcon />}
              trailingIcon={<ChevronDownIcon />}
            />
          ))}
        </div>
      </Section>

      {/* 5. Count 뱃지 */}
      <Section title="5. Count Badge">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="Filter" selected count={3} />
          <Chip label="Filter" selected count={12} type="filled" />
          <Chip label="No count (unselected)" count={5} />
        </div>
      </Section>

      {/* 6. NEW 뱃지 */}
      <Section title="6. NEW Badge (빨간 점)">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="New!" showNewBadge />
          <Chip label="Selected New" showNewBadge selected />
          <Chip label="Filled New" showNewBadge type="filled" />
          <Chip label="Disabled New" showNewBadge disabled />
        </div>
      </Section>

      {/* 7. fontStyle */}
      <Section title="7. fontStyle Prop">
        <div className="flex flex-wrap gap-3 items-center">
          <Chip label="Auto (unselected=body)" />
          <Chip label="Auto (selected=title)" selected />
          <Chip label="Force title" fontStyle="title" />
          <Chip label="Force body" fontStyle="body" selected />
        </div>
      </Section>

      {/* 8. ChipGroup -- Carousel */}
      <Section title="8. ChipGroup - Carousel">
        <ChipGroup layout="carousel">
          {Array.from({ length: 12 }, (_, i) => (
            <Chip
              key={i}
              label={`Chip ${i + 1}`}
              selected={i === 0}
              type={i % 2 === 0 ? 'outlined' : 'filled'}
            />
          ))}
        </ChipGroup>
      </Section>

      {/* 9. ChipGroup -- Multiline */}
      <Section title="9. ChipGroup - Multiline">
        <ChipGroup layout="multiline">
          {['전체', '대형', '중형', '소형', 'SUV', '전기차', '하이브리드', '수소차'].map(
            (name, i) => (
              <Chip
                key={name}
                label={name}
                selected={i === 0}
                type="filled"
              />
            ),
          )}
        </ChipGroup>
      </Section>

      {/* 10. ChipGroup -- Custom gap */}
      <Section title="10. ChipGroup - Custom Gap (12px)">
        <ChipGroup layout="multiline" gap={12}>
          <Chip label="Gap 12" />
          <Chip label="Between" />
          <Chip label="Chips" />
        </ChipGroup>
      </Section>

      {/* 11. 종합 -- 다양한 조합 */}
      <Section title="11. Full Combination">
        <ChipGroup layout="multiline">
          <Chip
            label="Filter"
            type="outlined"
            selected
            count={5}
            leadingIcon={<StarIcon />}
            trailingIcon={<ChevronDownIcon />}
            showNewBadge
          />
          <Chip
            label="Filled"
            type="filled"
            selected
            size="sm"
            leadingIcon={<StarIcon />}
          />
          <Chip
            label="XS Body"
            type="outlined"
            size="xs"
            fontStyle="body"
            trailingIcon={<CloseIcon />}
          />
          <Chip
            label="Disabled"
            type="filled"
            disabled
            leadingIcon={<StarIcon />}
            showNewBadge
          />
        </ChipGroup>
      </Section>
    </div>
  );
}
