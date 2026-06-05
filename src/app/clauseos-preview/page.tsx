'use client';

// ClauseOS Design System — 3-screen mobile preview
// Tokens: bg #000B1A | panel rgba(255,255,255,0.06) | point #68E78E | text-primary #FFF | text-secondary #B4BBCB | border rgba(255,255,255,0.12)

const C = {
  bg: '#000B1A',
  panel: 'rgba(255,255,255,0.06)',
  panelMed: 'rgba(255,255,255,0.10)',
  panelStrong: 'rgba(255,255,255,0.14)',
  point: '#68E78E',
  pointDim: 'rgba(104,231,142,0.30)',
  pointDimLight: 'rgba(104,231,142,0.15)',
  textPrimary: '#FFFFFF',
  textSecondary: '#B4BBCB',
  textMuted: 'rgba(255,255,255,0.45)',
  border: 'rgba(255,255,255,0.12)',
  borderStrong: 'rgba(255,255,255,0.20)',
};

// ── SVG Icons ──────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke={C.textSecondary} strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke={C.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3C7.24 3 5 5.24 5 8v4l-1.5 2h13L15 12V8c0-2.76-2.24-5-5-5z" stroke={C.textSecondary} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 16.5a1.5 1.5 0 003 0" stroke={C.textSecondary} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconFolder({ color = C.textSecondary }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M3 8C3 6.9 3.9 6 5 6h7l2 2h9c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8z" fill={color} opacity="0.9" />
      <rect x="6" y="11" width="10" height="1.5" rx="0.75" fill="white" opacity="0.5" />
      <rect x="6" y="14" width="7" height="1.5" rx="0.75" fill="white" opacity="0.35" />
    </svg>
  );
}

function IconFolderLg({ color = C.point }: { color?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M4 12C4 9.8 5.8 8 8 8H20l4 4H40c2.2 0 4 1.8 4 4V36c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V12z" fill={color} opacity="0.85" />
      <rect x="12" y="20" width="18" height="2.5" rx="1.25" fill="white" opacity="0.6" />
      <rect x="12" y="25" width="13" height="2.5" rx="1.25" fill="white" opacity="0.4" />
      <rect x="12" y="30" width="8" height="2.5" rx="1.25" fill="white" opacity="0.25" />
    </svg>
  );
}

function IconDoc({ color = C.textSecondary }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="2" width="12" height="14" rx="2" fill={color} opacity="0.4" stroke={color} strokeWidth="1" />
      <rect x="6" y="6" width="6" height="1" rx="0.5" fill={color} />
      <rect x="6" y="8.5" width="4" height="1" rx="0.5" fill={color} opacity="0.7" />
      <rect x="6" y="11" width="5" height="1" rx="0.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12 5L7 10l5 5" stroke={C.textPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMore() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="5" r="1.5" fill={C.textPrimary} />
      <circle cx="10" cy="10" r="1.5" fill={C.textPrimary} />
      <circle cx="10" cy="15" r="1.5" fill={C.textPrimary} />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="5" cy="4" r="2" fill={C.textSecondary} />
      <path d="M1 10c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={C.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="3.5" r="1.5" fill={C.textSecondary} opacity="0.7" />
      <path d="M9.5 7c1.1.5 1.8 1.6 1.8 2.8" stroke={C.textSecondary} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function IconTabFolders({ active = false }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2 7C2 5.9 2.9 5 4 5h5l2 2h7c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7z"
        fill={active ? C.point : 'none'}
        stroke={active ? C.point : C.textSecondary}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconTabWorkspace({ active = false }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5"
        fill={active ? C.point : 'none'}
        stroke={active ? C.point : C.textSecondary}
        strokeWidth="1.5"
      />
      <rect x="12" y="3" width="7" height="7" rx="1.5"
        fill={active ? C.point : 'none'}
        stroke={active ? C.point : C.textSecondary}
        strokeWidth="1.5"
      />
      <rect x="3" y="12" width="7" height="7" rx="1.5"
        fill={active ? C.point : 'none'}
        stroke={active ? C.point : C.textSecondary}
        strokeWidth="1.5"
      />
      <rect x="12" y="12" width="7" height="7" rx="1.5"
        fill={active ? C.point : 'none'}
        stroke={active ? C.point : C.textSecondary}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconTabLaunch({ active = false }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polygon
        points="11,3 19,19 11,15 3,19"
        fill={active ? C.point : 'none'}
        stroke={active ? C.point : C.textSecondary}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Shared Components ──────────────────────────────────────────────────────

function GlassCard({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: C.panel,
        border: `1px solid ${C.border}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BottomTabBar({ activeTab }: { activeTab: 'folders' | 'workspace' | 'launch' }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background: 'rgba(0,11,26,0.85)',
        borderTop: `1px solid ${C.border}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      {/* Folders */}
      <button
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Folders tab"
      >
        <IconTabFolders active={activeTab === 'folders'} />
        <span style={{ fontSize: 10, color: activeTab === 'folders' ? C.point : C.textSecondary, fontFamily: 'Inter, sans-serif' }}>
          Folders
        </span>
      </button>

      {/* Workspace */}
      <button
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Workspace tab"
      >
        <IconTabWorkspace active={activeTab === 'workspace'} />
        <span style={{ fontSize: 10, color: activeTab === 'workspace' ? C.point : C.textSecondary, fontFamily: 'Inter, sans-serif' }}>
          Workspace
        </span>
      </button>

      {/* Launch — center highlight */}
      <button
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          background: activeTab === 'launch' ? C.pointDim : 'rgba(255,255,255,0.06)',
          border: `1px solid ${activeTab === 'launch' ? C.point : C.border}`,
          borderRadius: 20,
          padding: '8px 20px',
          cursor: 'pointer',
        }}
        aria-label="Launch tab"
      >
        <IconTabLaunch active={activeTab === 'launch'} />
        <span style={{ fontSize: 10, color: activeTab === 'launch' ? C.point : C.textSecondary, fontFamily: 'Inter, sans-serif' }}>
          Launch
        </span>
      </button>
    </div>
  );
}

// ── Screen 1: Folder Home ──────────────────────────────────────────────────

const FOLDER_ITEMS = [
  { name: 'Corp', count: 4 },
  { name: 'Lic', count: 2 },
  { name: 'Fir', count: 3 },
  { name: 'Tra', count: 5 },
  { name: 'Compliance', count: 4, highlight: true },
  { name: 'Unc', count: 1 },
  { name: 'Templates', count: 7 },
  { name: 'Sales', count: 3 },
  { name: 'Leases', count: 2 },
];

function FolderCard({ name, count, highlight }: { name: string; count: number; highlight?: boolean }) {
  return (
    <div
      style={{
        background: highlight ? C.point : C.panel,
        border: `1px solid ${highlight ? 'transparent' : C.border}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 14,
        padding: '10px 10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        minHeight: 88,
      }}
    >
      <IconFolder color={highlight ? '#000B1A' : C.point} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconUsers />
          <span style={{ fontSize: 10, color: highlight ? 'rgba(0,11,26,0.6)' : C.textSecondary, fontFamily: 'Inter, sans-serif' }}>
            {count}
          </span>
        </div>
        <span style={{
          fontSize: highlight ? 11 : 11,
          fontWeight: 600,
          color: highlight ? '#000B1A' : C.textPrimary,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {name}
        </span>
      </div>
    </div>
  );
}

function Screen1FolderHome() {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, borderRadius: 40, overflow: 'hidden', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <rect x="0" y="4" width="3" height="6" rx="0.5" fill={C.textPrimary} />
            <rect x="4.5" y="2.5" width="3" height="7.5" rx="0.5" fill={C.textPrimary} />
            <rect x="9" y="1" width="3" height="9" rx="0.5" fill={C.textPrimary} />
            <rect x="13.5" y="0" width="2.5" height="10" rx="0.5" fill={C.textPrimary} />
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path d="M7.5 2C9.8 2 11.8 3 13.2 4.7" stroke={C.textPrimary} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M7.5 5C8.9 5 10.1 5.6 11 6.6" stroke={C.textPrimary} strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7.5" cy="9" r="1" fill={C.textPrimary} />
            <path d="M1.8 4.7C3.2 3 5.2 2 7.5 2" stroke={C.textPrimary} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M4 6.6C4.9 5.6 6.1 5 7.5 5" stroke={C.textPrimary} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={C.textPrimary} strokeOpacity="0.35" />
            <rect x="2" y="2" width="16" height="8" rx="2" fill={C.textPrimary} />
            <path d="M23 4.5v3c.8-.3 1.4-1 1.4-1.5S23.8 4.8 23 4.5z" fill={C.textPrimary} opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* TopBar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 12px' }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: C.textPrimary, letterSpacing: -0.5 }}>ClauseOS</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Search">
            <IconSearch />
          </button>
          <button style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Notifications">
            <IconBell />
          </button>
        </div>
      </div>

      {/* Corporate popup card */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          background: C.textPrimary,
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#000B1A' }}>Corporate</div>
            <div style={{ fontSize: 10, color: '#637080', marginTop: 1 }}>Jan 01 – Mar 31</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.point, lineHeight: 1 }}>87%</div>
            <div style={{ fontSize: 9, color: '#99A1B1', marginTop: 1 }}>completion</div>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 14px', overflowX: 'auto' }}>
        {[
          { label: 'Folders (14)', active: true },
          { label: 'Tags (44)' },
          { label: 'Small ▾' },
        ].map(({ label, active }) => (
          <button
            key={label}
            style={{
              background: active ? C.panelStrong : C.panel,
              border: `1px solid ${active ? C.borderStrong : C.border}`,
              borderRadius: 999,
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: active ? 600 : 400,
              color: active ? C.textPrimary : C.textSecondary,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Folder grid */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {FOLDER_ITEMS.map((item) => (
          <FolderCard key={item.name} {...item} />
        ))}
      </div>

      <BottomTabBar activeTab="folders" />
    </div>
  );
}

// ── Screen 2: Compliance Dashboard ────────────────────────────────────────

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
      <div style={{ width: `${progress}%`, height: '100%', background: C.point, borderRadius: 2 }} />
      <div style={{
        position: 'absolute',
        right: `${100 - progress}%`,
        top: '50%',
        transform: 'translate(50%, -50%)',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: C.point,
        boxShadow: `0 0 6px ${C.point}`,
      }} />
    </div>
  );
}

function DocThumbnail({ label }: { label: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.08)',
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: '8px',
      width: 72,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ height: 2, flex: 1, background: 'rgba(255,255,255,0.25)', borderRadius: 1 }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[80, 60, 70, 50].map((w, i) => (
          <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(255,255,255,0.15)', borderRadius: 1 }} />
        ))}
      </div>
      <span style={{ fontSize: 8, color: C.textMuted, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{label}</span>
    </div>
  );
}

function Screen2ComplianceDashboard() {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, borderRadius: 40, overflow: 'hidden', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <rect x="0" y="4" width="3" height="6" rx="0.5" fill={C.textPrimary} />
            <rect x="4.5" y="2.5" width="3" height="7.5" rx="0.5" fill={C.textPrimary} />
            <rect x="9" y="1" width="3" height="9" rx="0.5" fill={C.textPrimary} />
            <rect x="13.5" y="0" width="2.5" height="10" rx="0.5" fill={C.textPrimary} />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={C.textPrimary} strokeOpacity="0.35" />
            <rect x="2" y="2" width="16" height="8" rx="2" fill={C.textPrimary} />
            <path d="M23 4.5v3c.8-.3 1.4-1 1.4-1.5S23.8 4.8 23 4.5z" fill={C.textPrimary} opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* TopBar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="Back">
            <IconArrowLeft />
          </button>
          <span style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary }}>Compliance</span>
        </div>
        <button style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} aria-label="More options">
          <IconMore />
        </button>
      </div>

      {/* Header card with green tint */}
      <div style={{ padding: '0 16px 12px' }}>
        <div style={{
          background: `rgba(104,231,142,0.18)`,
          border: `1px solid rgba(104,231,142,0.3)`,
          borderRadius: 18,
          padding: 16,
        }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>Compliance</div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>Recent activity</div>
          </div>

          {/* Tab chips */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {['Incident', 'Vendor', 'DPIA'].map((tab, i) => (
              <button
                key={tab}
                style={{
                  background: i === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${i === 0 ? 'rgba(255,255,255,0.3)' : C.border}`,
                  borderRadius: 999,
                  padding: '4px 11px',
                  fontSize: 11,
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? C.textPrimary : C.textSecondary,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Progress bar section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: C.textSecondary }}>Annual Data Privacy Audit</span>
              <span style={{ fontSize: 10, color: C.point, fontWeight: 600 }}>Final Validation</span>
            </div>
            <ProgressBar progress={78} />
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* GDPR doc row */}
        <GlassCard style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: 'rgba(104,231,142,0.15)', border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconDoc color={C.point} />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>GDPR Compliance Report v4.pdf</div>
            <div style={{ fontSize: 10, color: C.textSecondary, marginTop: 1 }}>compliance@aegis.legal</div>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.point, flexShrink: 0 }} />
        </GlassCard>

        {/* Audit committee row */}
        <GlassCard style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: C.panelMed, border: `1px solid ${C.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7" cy="7" r="3" fill={C.textSecondary} opacity="0.7" />
              <circle cx="11.5" cy="5.5" r="2" fill={C.textSecondary} opacity="0.5" />
              <path d="M2 14c0-2.2 1.8-4 4-4h2c2.2 0 4 1.8 4 4" stroke={C.textSecondary} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>Audit Committee Review</div>
            <div style={{ fontSize: 10, color: C.textSecondary, marginTop: 1 }}>Internal Board · 09:00 AM</div>
          </div>
        </GlassCard>

        {/* Doc thumbnails */}
        <div style={{ display: 'flex', gap: 8 }}>
          <DocThumbnail label="Q4 Report" />
          <DocThumbnail label="Policy v2" />
          <DocThumbnail label="Audit Log" />
        </div>

        {/* Comment row */}
        <GlassCard style={{ padding: '11px 14px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #68E78E, #3AC4FF)', flexShrink: 0 }} />
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '8px 10px', flex: 1 }}>
              <span style={{ fontSize: 11, color: C.textSecondary, fontStyle: 'italic' }}>&ldquo;Please review the highlighted risks...&rdquo;</span>
            </div>
          </div>
        </GlassCard>

        {/* Key dates */}
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>Key Dates</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { duration: '2 Weeks', date: '01/02/2025', label: 'Autorenew date', color: C.point },
              { duration: '2 Months', date: '01/02/2025', label: 'Termination date', color: '#FF7686' },
            ].map(({ duration, date, label, color }) => (
              <GlassCard
                key={label}
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginTop: 3, marginRight: 8, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textPrimary }}>{duration}</div>
                    <div style={{ fontSize: 10, color: C.textSecondary }}>{label}</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: C.textSecondary }}>{date}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen 3: Document Add Onboarding ─────────────────────────────────────

function ConnectionNode({ label, x, y, size = 40, color = C.panelStrong }: {
  label: string; x: number; y: number; size?: number; color?: string;
}) {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      background: color,
      border: `1px solid ${C.borderStrong}`,
      borderRadius: size * 0.28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 700, color: C.textPrimary, fontFamily: 'Inter, sans-serif' }}>{label}</span>
    </div>
  );
}

function MiniDoc({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 44,
      height: 56,
      background: 'rgba(255,255,255,0.09)',
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      transform: `rotate(${rotate}deg)`,
      padding: 6,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}>
      {[90, 70, 80, 60].map((w, i) => (
        <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
      ))}
    </div>
  );
}

function ConnectorLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 390 320"
    >
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(104,231,142,0.25)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

function Screen3Onboarding() {
  return (
    <div style={{ width: 390, height: 844, background: C.bg, borderRadius: 40, overflow: 'hidden', position: 'relative', fontFamily: 'Inter, sans-serif' }}>
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <rect x="0" y="4" width="3" height="6" rx="0.5" fill={C.textPrimary} />
            <rect x="4.5" y="2.5" width="3" height="7.5" rx="0.5" fill={C.textPrimary} />
            <rect x="9" y="1" width="3" height="9" rx="0.5" fill={C.textPrimary} />
            <rect x="13.5" y="0" width="2.5" height="10" rx="0.5" fill={C.textPrimary} />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={C.textPrimary} strokeOpacity="0.35" />
            <rect x="2" y="2" width="16" height="8" rx="2" fill={C.textPrimary} />
            <path d="M23 4.5v3c.8-.3 1.4-1 1.4-1.5S23.8 4.8 23 4.5z" fill={C.textPrimary} opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Ambient green glow */}
      <div style={{
        position: 'absolute',
        bottom: 160,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 260,
        height: 260,
        background: `radial-gradient(ellipse at center, rgba(104,231,142,0.22) 0%, transparent 70%)`,
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      {/* Connection diagram area */}
      <div style={{ position: 'relative', height: 320, marginTop: 10 }}>
        {/* Connector lines */}
        <ConnectorLine x1={80} y1={100} x2={195} y2={170} />
        <ConnectorLine x1={310} y1={80} x2={195} y2={170} />
        <ConnectorLine x1={60} y1={210} x2={195} y2={170} />
        <ConnectorLine x1={320} y1={220} x2={195} y2={170} />

        {/* Satellite nodes */}
        <ConnectionNode label="B" x={44} y={72} size={44} color="rgba(255,255,255,0.12)" />
        <ConnectionNode label="E" x={286} y={52} size={44} color="rgba(255,255,255,0.10)" />
        <ConnectionNode label="V" x={30} y={182} size={36} color="rgba(104,231,142,0.14)" />

        {/* Mini doc previews on left side */}
        <MiniDoc x={56} y={240} rotate={-6} />
        <MiniDoc x={104} y={254} rotate={2} />

        {/* Small floating nodes */}
        <div style={{
          position: 'absolute', right: 52, top: 200, width: 32, height: 32,
          background: 'rgba(255,255,255,0.08)', border: `1px solid ${C.border}`,
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconDoc color={C.textSecondary} />
        </div>
        <div style={{
          position: 'absolute', right: 88, top: 240, width: 28, height: 28,
          background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
          borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4" fill={C.textMuted} />
            <path d="M4 6h4M6 4v4" stroke="white" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>

        {/* Central folder icon */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 130,
          transform: 'translate(-50%, -50%)',
          width: 80,
          height: 80,
          background: `radial-gradient(circle, rgba(104,231,142,0.3) 0%, rgba(104,231,142,0.08) 70%)`,
          border: `1.5px solid rgba(104,231,142,0.4)`,
          borderRadius: 22,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: `0 0 32px rgba(104,231,142,0.2)`,
        }}>
          <IconFolderLg />
        </div>

        {/* Floating doc snippets around center */}
        <div style={{
          position: 'absolute', left: 230, top: 100,
          background: 'rgba(255,255,255,0.07)',
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: '6px 8px',
          width: 80,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[100, 80, 90].map((w, i) => (
              <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(255,255,255,0.18)', borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ fontSize: 8, color: C.textMuted, marginTop: 4 }}>Contract.pdf</div>
        </div>

        <div style={{
          position: 'absolute', left: 240, top: 168,
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: '5px 8px',
          width: 72,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[90, 70].map((w, i) => (
              <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(255,255,255,0.15)', borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ fontSize: 8, color: C.textMuted, marginTop: 4 }}>NDA v3.pdf</div>
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ padding: '20px 24px 0', position: 'absolute', bottom: 88, left: 0, right: 0 }}>
        {/* Headline */}
        <div style={{ marginBottom: 10 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.textPrimary, lineHeight: 1.25, margin: 0, letterSpacing: -0.7 }}>
            Ready to take{' '}
            <span style={{ color: C.point }}>control?</span>
          </h1>
          <p style={{ fontSize: 14, color: C.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
            It&apos;s time to organize your legal workflow
          </p>
        </div>

        {/* CTA button */}
        <button
          style={{
            width: '100%',
            padding: '15px 0',
            background: C.point,
            border: 'none',
            borderRadius: 14,
            fontSize: 15,
            fontWeight: 700,
            color: '#000B1A',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: -0.2,
            boxShadow: `0 4px 24px rgba(104,231,142,0.35)`,
          }}
        >
          Set up your workspace
        </button>
      </div>

      <BottomTabBar activeTab="launch" />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ClauseOSPreviewPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0A0A0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 40px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: -0.4 }}>ClauseOS</h1>
          <p style={{ fontSize: 13, color: '#6B7280', margin: '6px 0 0', fontFamily: 'Inter, sans-serif' }}>
            Mobile Preview · 3 Screens
          </p>
        </div>

        {/* 3 screens side by side */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Screen1FolderHome />
            <span style={{ fontSize: 12, color: '#6B7280' }}>1 — Folder Home</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Screen2ComplianceDashboard />
            <span style={{ fontSize: 12, color: '#6B7280' }}>2 — Compliance Dashboard</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Screen3Onboarding />
            <span style={{ fontSize: 12, color: '#6B7280' }}>3 — Document Add Onboarding</span>
          </div>
        </div>
      </div>
    </main>
  );
}
