// Screen 5: 個人別売上 — staff picker, monthly goal progress, daily breakdown with delete

function ScreenPersonal({ dark = false }) {
  const staff = STAFF[0]; // 結城 蓮
  const goal = 800000;
  const current = 612400;
  const projected = 824000;
  const pct = current / goal * 100;
  const rank = 1;

  // Daily breakdown sample
  const days = [
    { d: 10, w: '火', total: 59100, stores: { gochi: 12500, dosu: 38400, goro: 0, uo: 8200 }, today: true },
    { d: 9,  w: '月', total: 42800, stores: { gochi: 8400, dosu: 22200, goro: 5800, uo: 6400 } },
    { d: 8,  w: '日', total: 88200, stores: { gochi: 24000, dosu: 31400, goro: 18800, uo: 14000 } },
    { d: 7,  w: '土', total: 102400, stores: { gochi: 32000, dosu: 41200, goro: 15800, uo: 13400 } },
    { d: 6,  w: '金', total: 76500, stores: { gochi: 22000, dosu: 28800, goro: 12200, uo: 13500 } },
    { d: 5,  w: '木', total: 48200, stores: { gochi: 11200, dosu: 24400, goro: 4400, uo: 8200 } },
    { d: 4,  w: '水', total: 0, off: true },
    { d: 3,  w: '火', total: 51800, stores: { gochi: 14000, dosu: 22400, goro: 6600, uo: 8800 } },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      <PageHeader
        dark={dark}
        title="個人別売上"
        sub="PERSONAL · 2026.11"
      />

      {/* Staff picker chips */}
      <div style={{ padding: '0 0 12px' }}>
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          padding: '0 20px',
        }}>
          {STAFF.slice(0, 6).map((s, i) => {
            const on = i === 0;
            return (
              <div key={s.id} style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: on ? '4px 14px 4px 4px' : '4px',
                borderRadius: 999,
                background: on
                  ? `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`
                  : (dark ? W.sumi2 : '#FFFCF5'),
                border: on ? 'none' : `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
                color: on ? W.goldL : (dark ? W.bone : W.ink),
                boxShadow: on ? `0 4px 12px ${W.crimson}40` : 'none',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: on ? `${W.crimsonD}` : (dark ? W.sumi3 : W.paper2),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: FSERIF, fontSize: 14, fontWeight: 600,
                  color: on ? W.goldL : (dark ? W.bone : W.ink),
                  border: on ? `1px solid ${W.gold}` : 'none',
                }}>{s.avatar}</div>
                {on && <div style={{ fontSize: 12, fontWeight: 600 }}>{s.nick}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero — staff card + goal progress */}
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{
          background: dark
            ? `linear-gradient(160deg, ${W.sumi2}, ${W.sumi})`
            : `linear-gradient(160deg, #FFFCF5, ${W.paper})`,
          border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          borderRadius: 18, padding: 18,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* faint kamon */}
          <svg width="120" height="120" viewBox="0 0 100 100"
               style={{ position: 'absolute', right: -20, top: -20, opacity: 0.08 }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke={W.gold} strokeWidth="0.4"/>
            {Array.from({length:8}).map((_,i)=>(
              <ellipse key={i} cx="50" cy="20" rx="8" ry="20"
                fill="none" stroke={W.gold} strokeWidth="0.4"
                transform={`rotate(${i*45} 50 50)`}/>
            ))}
          </svg>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: `conic-gradient(from 0deg, ${W.gold}, ${W.crimson}, ${W.gold})`,
              padding: 2,
              boxShadow: `0 0 16px ${W.gold}40`,
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FSERIF, fontSize: 30, fontWeight: 600,
                color: W.goldL,
              }}>{staff.avatar}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: FSERIF, fontSize: 22, fontWeight: 600,
                color: dark ? W.bone : W.ink,
              }}>{staff.name}</div>
              <div style={{ fontSize: 10, color: dark ? W.boneMute : W.inkMute, fontFamily: FMONO, letterSpacing: 1.5, marginTop: 2 }}>
                {staff.nick.toUpperCase()} · STAFF #s01
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6,
                padding: '3px 8px', borderRadius: 999,
                background: W.gold + '22', color: W.gold,
                fontSize: 10, fontWeight: 700, letterSpacing: 1,
              }}>
                <span style={{ display: 'flex' }}>{I.crown}</span>
                月間 {rank}位
              </div>
            </div>
          </div>

          {/* Goal progress */}
          <div style={{ marginTop: 16 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 10, letterSpacing: 1, marginBottom: 6,
              color: dark ? W.boneMute : W.inkMute,
            }}>
              <span>月目標</span>
              <span style={{ fontFamily: FMONO, color: dark ? W.bone : W.ink, fontWeight: 600 }}>
                {yen(current)} / {yen(goal)}
              </span>
            </div>
            <div style={{
              height: 12, borderRadius: 6,
              background: dark ? W.sumi3 : W.paper2,
              position: 'relative', overflow: 'hidden',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${W.crimson}, ${W.gold})`,
                borderRadius: 6,
                boxShadow: `0 0 12px ${W.gold}80`,
              }}/>
              {/* projected ghost */}
              <div style={{
                position: 'absolute', left: `${pct}%`, top: 0, bottom: 0,
                width: `${(projected-current)/goal*100}%`,
                background: `repeating-linear-gradient(45deg, ${W.gold}66, ${W.gold}66 4px, transparent 4px, transparent 8px)`,
              }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'baseline' }}>
              <div>
                <span style={{ fontFamily: FSERIF, fontSize: 24, fontWeight: 700, color: W.gold }}>
                  {Math.round(pct)}
                </span>
                <span style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute }}>% 達成</span>
              </div>
              <div style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute }}>
                残 <span style={{ fontFamily: FMONO, color: dark ? W.bone : W.ink, fontWeight: 600 }}>{yen(goal-current)}</span> · 20日
              </div>
            </div>
          </div>

          {/* mini stats row */}
          <div style={{
            display: 'flex', gap: 0, marginTop: 14,
            padding: '10px 0 0',
            borderTop: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          }}>
            {[
              { l: '日平均', v: yenK(61240) },
              { l: '最高日', v: yenK(102400) },
              { l: '稼働', v: '8日' },
              { l: '前月比', v: '+18%', c: W.gold },
            ].map((s, i) => (
              <div key={s.l} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < 3 ? `0.5px solid ${dark ? W.hairlineD : W.hairline}` : 'none',
              }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>{s.l}</div>
                <div style={{
                  fontFamily: FMONO, fontSize: 13, fontWeight: 700,
                  color: s.c || (dark ? W.bone : W.ink), marginTop: 2,
                }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section title */}
      <div style={{
        padding: '0 20px 8px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: FSERIF, fontSize: 13, fontWeight: 600,
          color: dark ? W.bone : W.ink, letterSpacing: 3,
        }}>日次内訳</div>
        <div style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute }}>長押しで削除</div>
      </div>

      {/* Daily breakdown rows */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {days.map((day, i) => {
          if (day.off) {
            return (
              <div key={day.d} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                background: 'transparent',
                border: `0.5px dashed ${dark ? W.hairlineD : W.hairline}`,
                borderRadius: 12,
              }}>
                <div style={{ width: 36, textAlign: 'center', fontFamily: FSERIF, fontSize: 16, color: (dark?W.boneMute:W.inkMute) }}>{day.d}</div>
                <div style={{ flex: 1, fontSize: 12, color: dark ? W.boneMute : W.inkMute }}>
                  {day.w} · 休み
                </div>
                <div style={{ fontFamily: FMONO, fontSize: 12, color: (dark?W.boneMute:W.inkMute) }}>―</div>
              </div>
            );
          }
          // example: show 4th row in "swipe" state to reveal delete
          const swiped = i === 4;
          return (
            <div key={day.d} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
              {/* delete reveal */}
              {swiped && (
                <div style={{
                  position: 'absolute', right: 0, top: 0, bottom: 0, width: 88,
                  background: `linear-gradient(90deg, ${W.crimsonD}, ${W.crimson})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: W.goldL, fontFamily: FSERIF, fontSize: 13, fontWeight: 600, letterSpacing: 2,
                }}>削除</div>
              )}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                background: day.today
                  ? (dark ? W.crimsonD+'40' : '#FFF6E8')
                  : (dark ? W.sumi2 : '#FFFCF5'),
                border: day.today ? `0.5px solid ${W.gold}66` : `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
                borderRadius: 12,
                transform: swiped ? 'translateX(-88px)' : 'none',
                transition: 'transform 0.2s',
              }}>
                <div style={{ width: 36, textAlign: 'center' }}>
                  <div style={{
                    fontFamily: FSERIF, fontSize: 18, fontWeight: 600,
                    color: dark ? W.bone : W.ink, lineHeight: 1,
                  }}>{day.d}</div>
                  <div style={{
                    fontSize: 9, color: dark ? W.boneMute : W.inkMute, marginTop: 1,
                  }}>{day.w}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 3, height: 6, borderRadius: 3, overflow: 'hidden', background: dark ? W.sumi3 : W.paper2 }}>
                    {STORES.map(s => {
                      const v = day.stores[s.id] || 0;
                      const w = v / day.total * 100;
                      if (w === 0) return null;
                      return <div key={s.id} style={{ width: `${w}%`, background: s.color }}/>;
                    })}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    {STORES.map(s => {
                      const v = day.stores[s.id] || 0;
                      if (!v) return null;
                      return (
                        <div key={s.id} style={{
                          display: 'flex', alignItems: 'center', gap: 3,
                          fontSize: 9, fontFamily: FMONO,
                          color: dark ? W.boneMute : W.inkMute,
                        }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: s.color }}/>
                          {yenK(v)}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{
                  fontFamily: FMONO, fontSize: 14, fontWeight: 700,
                  color: day.today ? W.gold : (dark ? W.bone : W.ink),
                }}>{yen(day.total)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav active="me" dark={dark} />
    </div>
  );
}

Object.assign(window, { ScreenPersonal });
