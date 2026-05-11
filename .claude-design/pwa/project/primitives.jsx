// Shared UI primitives — bottom nav, status, glyphs, icons

// Outline glyph icons (24)
const I = {
  edit: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 20h4l10-10-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M14 6l4 4" stroke="currentColor" strokeWidth="1.6"/></svg>,
  trophy: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 4h10v4a5 5 0 11-10 0V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M7 6H4a2 2 0 002 4M17 6h3a2 2 0 01-2 4M10 14h4M9 20h6M12 14v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  cal: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 3v4M16 3v4M3.5 10h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  user: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  gear: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.5-6.5l-1.4 1.4M7.9 16.1l-1.4 1.4m0-11l1.4 1.4m8.2 8.2l1.4 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  chart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 19V8m6 11V4m6 15v-7m6 7V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  chev: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  back: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 5l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  sparkle: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v3M8 12v3M1 8h3M12 8h3M3 3l2 2M11 11l2 2M13 3l-2 2M5 11l-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  bell: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a4 4 0 014 4v4l2 3H4l2-3V6a4 4 0 014-4zM8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  crown: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 6l3 8h10l3-8-4 3-4-5-4 5-4-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18"/></svg>,
  down: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4l3 4 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  up: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 7l3-4 3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  flat: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  warn: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l9 16H1L10 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 8v4M10 15v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
};

// Bottom tab bar — 5 tabs, with active glow underline
function BottomNav({ active = 'rec', dark = false }) {
  const items = [
    { id: 'rec',   label: '記録',       icon: I.edit },
    { id: 'rank',  label: 'ランキング', icon: I.trophy },
    { id: 'cal',   label: 'カレンダー', icon: I.cal },
    { id: 'me',    label: '個人',       icon: I.user },
    { id: 'set',   label: '設定',       icon: I.gear },
  ];
  const bg = dark ? 'rgba(19,16,14,0.88)' : 'rgba(244,238,226,0.92)';
  const border = dark ? 'rgba(240,230,210,0.10)' : 'rgba(26,20,16,0.10)';
  const inactive = dark ? 'rgba(240,230,210,0.45)' : 'rgba(26,20,16,0.45)';
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingTop: 8, paddingBottom: 34,
      background: bg,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderTop: `0.5px solid ${border}`,
      zIndex: 30,
      fontFamily: FSANS,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        {items.map(it => {
          const on = it.id === active;
          return (
            <div key={it.id} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              color: on ? W.gold : inactive,
              padding: '4px 8px',
              position: 'relative',
            }}>
              {on && <div style={{
                position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                width: 24, height: 2, borderRadius: 2, background: W.gold,
                boxShadow: `0 0 8px ${W.gold}`,
              }}/>}
              <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {it.icon}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 500, letterSpacing: 0.4,
                fontFamily: FSANS,
              }}>{it.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Tiny KPI delta indicator
function Delta({ value, dark = false }) {
  const positive = value > 0;
  const flat = value === 0;
  const c = flat ? (dark ? W.boneMute : W.inkMute) : (positive ? '#3A8F5F' : W.crimsonL);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      color: c, fontFamily: FMONO, fontSize: 11, fontWeight: 600,
    }}>
      {flat ? I.flat : (positive ? I.up : I.down)}
      {flat ? '±0' : `${positive ? '+' : ''}${value}%`}
    </span>
  );
}

// Generic page header (large title + right action)
function PageHeader({ title, sub, right, dark = false }) {
  return (
    <div style={{
      padding: '8px 20px 12px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    }}>
      <div>
        <div style={{
          fontFamily: FSERIF, fontSize: 28, fontWeight: 600,
          color: dark ? W.bone : W.ink, letterSpacing: 1,
          lineHeight: 1.15,
        }}>{title}</div>
        {sub && <div style={{
          fontFamily: FSANS, fontSize: 11, fontWeight: 500,
          letterSpacing: 1.5, marginTop: 4,
          color: dark ? W.boneMute : W.inkMute,
        }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// Card surface
function Card({ children, dark = false, style = {}, pad = 16 }) {
  return (
    <div style={{
      background: dark ? W.sumi2 : '#FFFCF5',
      border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
      borderRadius: 14,
      padding: pad,
      ...style,
    }}>{children}</div>
  );
}

// Phone frame with safe top inset (no IOSNavBar — we draw our own)
function Phone({ children, dark = false }) {
  return (
    <IOSDevice dark={dark} width={390} height={844}>
      <div style={{
        height: '100%',
        background: dark ? W.sumi : W.paper,
        color: dark ? W.bone : W.ink,
        position: 'relative',
        fontFamily: FSANS,
        paddingTop: 54, // status bar
      }}>
        {children}
      </div>
    </IOSDevice>
  );
}

Object.assign(window, { I, BottomNav, Delta, PageHeader, Card, Phone });
