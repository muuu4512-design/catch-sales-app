// Screen 4: カレンダー — month grid with store-dot breakdown

function ScreenCalendar({ dark = false }) {
  // Mock month data — 11月 (Nov) 2026, starts on Sun (Nov 1 = Sun)
  // Build calendar grid: 6 rows × 7 cols
  // day data: total, dots per store (gochi/dosu/goro/uo)
  const today = 10;
  const buildDay = (d) => {
    if (d < 1 || d > 30) return null;
    if (d > today) return { d, future: true };
    // Pseudo-random but deterministic
    const seed = d * 7 % 11;
    const stores = [
      seed > 1 ? 'gochi' : null,
      seed > 2 ? 'dosu' : null,
      seed > 5 ? 'goro' : null,
      seed > 7 ? 'uo' : null,
    ].filter(Boolean);
    if (stores.length === 0) return { d, empty: true };
    const total = (15000 + d * 3200 + seed * 4400);
    return { d, total, stores, today: d === today };
  };

  const cells = [];
  // Nov 1 2026 is a Sunday → first row starts col 0
  for (let i = 0; i < 35; i++) {
    const d = i + 1;
    cells.push(buildDay(d));
  }

  const monthTotal = 612400;
  const dayAvg = Math.round(monthTotal / today);

  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      <PageHeader
        dark={dark}
        title="カレンダー"
        sub="2026 · NOVEMBER 霜月"
        right={
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: dark ? W.sumi2 : '#FFFCF5',
              border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? W.bone : W.ink, transform: 'rotate(180deg)',
            }}>{I.chev}</div>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: dark ? W.sumi2 : '#FFFCF5',
              border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? W.bone : W.ink,
            }}>{I.chev}</div>
          </div>
        }
      />

      {/* Month summary */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', gap: 8,
        }}>
          <div style={{
            flex: 1,
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            borderRadius: 12, padding: '10px 12px',
          }}>
            <div style={{ fontSize: 9, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>累計</div>
            <div style={{ fontFamily: FSERIF, fontSize: 18, fontWeight: 600, color: dark ? W.bone : W.ink, marginTop: 1 }}>
              {yen(monthTotal)}
            </div>
          </div>
          <div style={{
            flex: 1,
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            borderRadius: 12, padding: '10px 12px',
          }}>
            <div style={{ fontSize: 9, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>日平均</div>
            <div style={{ fontFamily: FSERIF, fontSize: 18, fontWeight: 600, color: dark ? W.bone : W.ink, marginTop: 1 }}>
              {yen(dayAvg)}
            </div>
          </div>
          <div style={{
            flex: 1,
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            borderRadius: 12, padding: '10px 12px',
          }}>
            <div style={{ fontSize: 9, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>稼働</div>
            <div style={{ fontFamily: FSERIF, fontSize: 18, fontWeight: 600, color: dark ? W.bone : W.ink, marginTop: 1 }}>
              8<span style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute }}>/10日</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekday labels */}
      <div style={{ padding: '0 16px 4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {['日','月','火','水','木','金','土'].map((w, i) => (
            <div key={w} style={{
              textAlign: 'center', fontSize: 10, fontWeight: 600,
              letterSpacing: 1.5,
              color: i === 0 ? W.crimsonL : i === 6 ? W.ind : (dark ? W.boneMute : W.inkMute),
              padding: '4px 0',
            }}>{w}</div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {cells.map((c, i) => {
            if (!c) return <div key={i}/>;
            const dow = i % 7;
            const isSun = dow === 0;
            return (
              <div key={i} style={{
                aspectRatio: '1 / 1.15',
                borderRadius: 10,
                background: c.today
                  ? (dark ? `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})` : `linear-gradient(135deg, ${W.ink}, ${W.ink2})`)
                  : c.future ? 'transparent'
                  : (dark ? W.sumi2 : '#FFFCF5'),
                border: c.future
                  ? `0.5px dashed ${dark ? W.hairlineD : W.hairline}`
                  : c.today ? 'none' : `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
                padding: '4px 5px 3px',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
                boxShadow: c.today ? `0 4px 12px ${dark ? W.crimson : W.ink}50` : 'none',
              }}>
                <div style={{
                  fontFamily: FSERIF, fontSize: 12, fontWeight: 600,
                  color: c.today ? W.goldL
                    : c.future ? (dark ? W.boneMute : W.inkMute)+'80'
                    : isSun ? W.crimsonL
                    : (dark ? W.bone : W.ink),
                }}>{c.d}</div>
                {!c.future && !c.empty && (
                  <>
                    <div style={{
                      fontFamily: FMONO, fontSize: 8.5, fontWeight: 700,
                      color: c.today ? W.goldL : (dark ? W.bone : W.ink),
                      marginTop: 'auto', lineHeight: 1,
                    }}>{yenK(c.total)}</div>
                    <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                      {c.stores.map(sid => {
                        const s = STORES.find(x => x.id === sid);
                        return <div key={sid} style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: s.color,
                        }}/>;
                      })}
                    </div>
                  </>
                )}
                {c.empty && (
                  <div style={{
                    margin: 'auto', fontSize: 11,
                    color: (dark ? W.boneMute : W.inkMute)+'60',
                  }}>―</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend / detail of selected day */}
      <div style={{ padding: '14px 20px 0' }}>
        <Card dark={dark} pad={14}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10,
          }}>
            <div style={{
              fontFamily: FSERIF, fontSize: 22, fontWeight: 600,
              color: dark ? W.bone : W.ink, letterSpacing: 0.5,
            }}>11.10</div>
            <div style={{ fontSize: 10, color: dark ? W.boneMute : W.inkMute, letterSpacing: 1 }}>火曜日 · 今日</div>
            <div style={{ flex: 1 }}/>
            <div style={{
              fontFamily: FMONO, fontSize: 18, fontWeight: 700,
              color: W.gold,
            }}>{yen(59100)}</div>
          </div>
          {STORES.map(s => {
            const v = { gochi: 12500, dosu: 38400, goro: 0, uo: 8200 }[s.id];
            const pct = v / 59100 * 100;
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 0',
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0,
                }}/>
                <div style={{ fontFamily: FSERIF, fontSize: 13, fontWeight: 600, width: 32, color: dark ? W.bone : W.ink }}>
                  {s.name}
                </div>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: dark ? W.sumi3 : W.paper2, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', background: s.color, borderRadius: 3,
                  }}/>
                </div>
                <div style={{
                  fontFamily: FMONO, fontSize: 12, fontWeight: 600, width: 64, textAlign: 'right',
                  color: v ? (dark ? W.bone : W.ink) : (dark ? W.boneMute : W.inkMute),
                }}>{v ? yen(v) : '―'}</div>
              </div>
            );
          })}
        </Card>
      </div>

      <BottomNav active="cal" dark={dark} />
    </div>
  );
}

Object.assign(window, { ScreenCalendar });
