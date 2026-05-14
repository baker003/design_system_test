'use client';

import { useState } from 'react';
import { Checkbox, Radio, RadioGroup, Toggle } from '@/components/Controls';

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="typo-heading2 font-semibold text-text-strong border-b border-border pb-2">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <span className="typo-label1 text-text-tertiary w-36 shrink-0">{label}</span>
      <div className="flex items-center gap-6 flex-wrap">{children}</div>
    </div>
  );
}

// ─── Interactive demos ────────────────────────────────────────────────────────

function CheckboxDemo() {
  const [single, setSingle] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [all, setAll] = useState(false);
  const [items, setItems] = useState([false, false, false]);

  function handleAllChange(checked: boolean) {
    setAll(checked);
    setItems([checked, checked, checked]);
    setIndeterminate(false);
  }

  function handleItemChange(index: number, checked: boolean) {
    const next = items.map((v, i) => (i === index ? checked : v));
    setItems(next);
    const checkedCount = next.filter(Boolean).length;
    setAll(checkedCount === next.length);
    setIndeterminate(checkedCount > 0 && checkedCount < next.length);
  }

  return (
    <Section title="Checkbox">
      <Row label="기본 상태">
        <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
        <Checkbox label="Checked" checked={true} onChange={() => {}} />
        <Checkbox label="Indeterminate" indeterminate={true} checked={false} onChange={() => {}} />
      </Row>

      <Row label="비활성">
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled checked={true} onChange={() => {}} />
        <Checkbox label="Disabled indeterminate" disabled indeterminate checked={false} onChange={() => {}} />
      </Row>

      <Row label="라벨 위치">
        <Checkbox label="라벨 오른쪽 (default)" labelPlacement="right" />
        <Checkbox label="라벨 왼쪽" labelPlacement="left" />
      </Row>

      <Row label="라벨 없음">
        <Checkbox />
        <Checkbox checked={true} onChange={() => {}} />
      </Row>

      <Row label="인터랙티브">
        <Checkbox
          label="토글해보세요"
          checked={single}
          onChange={(v) => setSingle(v)}
        />
      </Row>

      <Row label="전체 선택 패턴">
        <div className="flex flex-col gap-2">
          <Checkbox
            label="전체 선택"
            checked={all}
            indeterminate={indeterminate}
            onChange={handleAllChange}
          />
          <div className="pl-6 flex flex-col gap-2">
            {items.map((v, i) => (
              <Checkbox
                key={i}
                label={`항목 ${i + 1}`}
                checked={v}
                onChange={(checked) => handleItemChange(i, checked)}
              />
            ))}
          </div>
        </div>
      </Row>
    </Section>
  );
}

function RadioDemo() {
  const [single, setSingle] = useState('');
  const [group, setGroup] = useState('b');
  const [horizontal, setHorizontal] = useState('option1');

  return (
    <Section title="Radio / RadioGroup">
      <Row label="개별 Radio">
        <Radio radioValue="a" value={single} label="옵션 A" onChange={setSingle} />
        <Radio radioValue="b" value={single} label="옵션 B" onChange={setSingle} />
        <Radio radioValue="c" value={single} label="옵션 C" onChange={setSingle} />
      </Row>

      <Row label="비활성">
        <Radio radioValue="x" value="" label="Disabled unselected" disabled />
        <Radio radioValue="y" value="y" label="Disabled selected" disabled />
      </Row>

      <Row label="RadioGroup (vertical)">
        <RadioGroup
          name="vertical-demo"
          value={group}
          onChange={setGroup}
          aria-label="수직 라디오 그룹 데모"
        >
          <Radio radioValue="a" label="항목 A" />
          <Radio radioValue="b" label="항목 B" />
          <Radio radioValue="c" label="항목 C" />
        </RadioGroup>
      </Row>

      <Row label="RadioGroup (horizontal)">
        <RadioGroup
          name="horizontal-demo"
          value={horizontal}
          onChange={setHorizontal}
          orientation="horizontal"
          aria-label="수평 라디오 그룹 데모"
        >
          <Radio radioValue="option1" label="옵션 1" />
          <Radio radioValue="option2" label="옵션 2" />
          <Radio radioValue="option3" label="옵션 3" />
        </RadioGroup>
      </Row>

      <Row label="RadioGroup (disabled)">
        <RadioGroup
          name="disabled-demo"
          value="a"
          onChange={() => {}}
          disabled
          aria-label="비활성 라디오 그룹"
        >
          <Radio radioValue="a" label="선택됨 (비활성)" />
          <Radio radioValue="b" label="미선택 (비활성)" />
        </RadioGroup>
      </Row>

      <Row label="라벨 왼쪽">
        <RadioGroup
          name="left-label-demo"
          value="a"
          onChange={() => {}}
          orientation="horizontal"
          aria-label="라벨 왼쪽"
        >
          <Radio radioValue="a" label="왼쪽 A" labelPlacement="left" />
          <Radio radioValue="b" label="왼쪽 B" labelPlacement="left" />
        </RadioGroup>
      </Row>
    </Section>
  );
}

function ToggleDemo() {
  const [md, setMd] = useState(false);
  const [sm, setSm] = useState(true);

  return (
    <Section title="Toggle">
      <Row label="기본 상태">
        <Toggle label="Off (md)" size="md" checked={false} onChange={() => {}} />
        <Toggle label="On (md)" size="md" checked={true} onChange={() => {}} />
        <Toggle label="Off (sm)" size="sm" checked={false} onChange={() => {}} />
        <Toggle label="On (sm)" size="sm" checked={true} onChange={() => {}} />
      </Row>

      <Row label="비활성">
        <Toggle label="Disabled off" size="md" disabled checked={false} onChange={() => {}} />
        <Toggle label="Disabled on" size="md" disabled checked={true} onChange={() => {}} />
        <Toggle label="Disabled off (sm)" size="sm" disabled checked={false} onChange={() => {}} />
        <Toggle label="Disabled on (sm)" size="sm" disabled checked={true} onChange={() => {}} />
      </Row>

      <Row label="라벨 위치">
        <Toggle label="라벨 오른쪽" labelPlacement="right" />
        <Toggle label="라벨 왼쪽" labelPlacement="left" />
      </Row>

      <Row label="라벨 없음">
        <Toggle size="md" />
        <Toggle size="sm" />
      </Row>

      <Row label="인터랙티브 (md)">
        <Toggle
          label={md ? '알림 ON' : '알림 OFF'}
          size="md"
          checked={md}
          onChange={(v) => setMd(v)}
        />
      </Row>

      <Row label="인터랙티브 (sm)">
        <Toggle
          label={sm ? '활성화' : '비활성화'}
          size="sm"
          checked={sm}
          onChange={(v) => setSm(v)}
        />
      </Row>
    </Section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ControlsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10 max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="typo-title2 font-bold text-text-strong">Controls</h1>
        <p className="typo-body1 text-text-secondary mt-1">
          Checkbox / Radio / RadioGroup / Toggle 컴포넌트 프리뷰
        </p>
      </header>

      <div className="space-y-12">
        <CheckboxDemo />
        <RadioDemo />
        <ToggleDemo />
      </div>
    </main>
  );
}
