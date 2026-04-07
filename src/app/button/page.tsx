'use client';

import {
  ActionButton,
  TextButton,
  IconButton,
  LinkTextButton,
} from '@/components/Button';

/* Simple placeholder icon for demo */
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const actionTypes = ['fill', 'outline', 'ghost'] as const;
const actionVariants = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const textVariants = ['primary', 'secondary', 'tertiary'] as const;
const iconTypes = ['fill', 'outline', 'ghost'] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-text-strong mb-6 border-b border-border pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-text-secondary mb-3">{title}</h3>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-text-strong mb-2">
        SOCAR FRAME 2.0 -- Button Components
      </h1>
      <p className="text-text-secondary mb-10">
        All variant / size / state combinations for the Button component family.
      </p>

      {/* ── ActionButton ── */}
      <Section title="1. ActionButton">
        {actionTypes.map((type) => (
          <div key={type} className="mb-8">
            <h3 className="text-base font-semibold text-text-primary mb-4 capitalize">
              Type: {type}
            </h3>
            {actionVariants.map((variant) => (
              <SubSection key={variant} title={`${type} / ${variant}`}>
                {sizes.map((size) => (
                  <ActionButton key={size} type={type} variant={variant} size={size}>
                    {size.toUpperCase()}
                  </ActionButton>
                ))}
              </SubSection>
            ))}
          </div>
        ))}

        <SubSection title="With Icons">
          <ActionButton leftIcon={<PlusIcon />}>Left Icon</ActionButton>
          <ActionButton rightIcon={<ChevronRight />}>Right Icon</ActionButton>
          <ActionButton leftIcon={<PlusIcon />} rightIcon={<ChevronRight />}>
            Both Icons
          </ActionButton>
        </SubSection>

        <SubSection title="Full Width">
          <div className="w-full">
            <ActionButton fullWidth>Full Width Button</ActionButton>
          </div>
        </SubSection>

        <SubSection title="Loading State">
          {actionTypes.map((type) => (
            <ActionButton key={type} type={type} loading>
              Loading
            </ActionButton>
          ))}
        </SubSection>

        <SubSection title="Disabled State">
          {actionTypes.map((type) =>
            actionVariants.map((variant) => (
              <ActionButton key={`${type}-${variant}`} type={type} variant={variant} disabled>
                Disabled
              </ActionButton>
            )),
          )}
        </SubSection>
      </Section>

      {/* ── TextButton ── */}
      <Section title="2. TextButton">
        {textVariants.map((variant) => (
          <SubSection key={variant} title={`Variant: ${variant}`}>
            {sizes.map((size) => (
              <TextButton key={size} variant={variant} size={size}>
                {size.toUpperCase()}
              </TextButton>
            ))}
          </SubSection>
        ))}

        <SubSection title="With Icons">
          <TextButton leftIcon={<PlusIcon />}>Left Icon</TextButton>
          <TextButton rightIcon={<ChevronRight />}>Right Icon</TextButton>
        </SubSection>

        <SubSection title="Disabled">
          {textVariants.map((variant) => (
            <TextButton key={variant} variant={variant} disabled>
              Disabled {variant}
            </TextButton>
          ))}
        </SubSection>
      </Section>

      {/* ── IconButton ── */}
      <Section title="3. IconButton">
        {iconTypes.map((type) => (
          <SubSection key={type} title={`Type: ${type}`}>
            {sizes.map((size) => (
              <IconButton
                key={size}
                type={type}
                size={size}
                icon={<CloseIcon />}
                aria-label={`Close (${size})`}
              />
            ))}
          </SubSection>
        ))}

        <SubSection title="Circle Shape">
          {sizes.map((size) => (
            <IconButton
              key={size}
              shape="circle"
              size={size}
              icon={<HeartIcon />}
              aria-label={`Like (${size})`}
            />
          ))}
        </SubSection>

        <SubSection title="Circle + Fill">
          {sizes.map((size) => (
            <IconButton
              key={size}
              shape="circle"
              type="fill"
              size={size}
              icon={<HeartIcon />}
              aria-label={`Like (${size})`}
            />
          ))}
        </SubSection>

        <SubSection title="Disabled">
          {iconTypes.map((type) => (
            <IconButton
              key={type}
              type={type}
              disabled
              icon={<CloseIcon />}
              aria-label={`Close (disabled ${type})`}
            />
          ))}
        </SubSection>
      </Section>

      {/* ── LinkTextButton ── */}
      <Section title="4. LinkTextButton">
        <SubSection title="Sizes">
          {sizes.map((size) => (
            <LinkTextButton key={size} size={size}>
              Link {size.toUpperCase()}
            </LinkTextButton>
          ))}
        </SubSection>

        <SubSection title="As Anchor (<a>)">
          <LinkTextButton href="https://socar.kr">Visit SOCAR</LinkTextButton>
        </SubSection>

        <SubSection title="Disabled">
          <LinkTextButton disabled>Disabled Link</LinkTextButton>
          <LinkTextButton href="https://socar.kr" disabled>
            Disabled Anchor
          </LinkTextButton>
        </SubSection>
      </Section>
    </div>
  );
}
