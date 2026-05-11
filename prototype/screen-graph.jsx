// Screen 6: グラフ — pie (store share) + bar (daily trend) + sub-charts

function ScreenGraph({ dark = false }) {
  // Store breakdown (month-to-date)
  const storeData = [
    { id: 'dosu',  v: 248400 },
    { id: 'gochi', v: 184200 },
    { id: 'uo',    v:  98800 },
    { id: 'goro',  v:  81000 },
  ];
  const total = storeData.reduce((a, b) => a + b.v, 0);

  // Donut math
  const R = 64, r = 42;
  let acc = 0;
  const slices = storeData.map(d => {
    const s = STORES.find(x => x.id === d.id);
    const frac = d.v / total;
    const start = acc; acc += frac;
    return { ...d, s, frac, start, end: acc };
  });

  const arc = (cx, cy, R, r, a0, a1) => {
    const p = (a, rad) => {
      const t = (a - 0.25) * Math.PI * 2;
      return [cx + Math.cos(t) * rad, cy + Math.sin(t) * rad];
    };
    const [x0, y0] = p(a0, R);
    const [x1, y1] = p(a1, R);
    const [x2, y2] = p(a1, r);
    const [x3, y3] = p(a0, r);
    const large = a1 - a0 > 0.5 ? 1 : 0;
    return `M${x0},${y0} A${R},${R} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${large} 0 ${x3},${y3} Z`;
  };

  // Daily bar data (last 14 days)
  const dailyData = [
    52, 38, 71, 88, 42, 61, 95, 102, 76, 48, 88, 102, 42, 59,
  ]; // in thousands
  const maxD = Math.max(...dailyData);

  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      <PageHeader
        dark={dark}
        title="グラフ"
        sub="ANALYTICS · 2026.11"
        right={
          <div style={{
            padding: '6px 10px', borderRadius: 999,
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            fontSize: 11, fontWeight: 600,
            color: dark ? W.bone : W.ink,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>結城 蓮 {I.chev}</div>
        }
      />

      {/* Tab pills */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', gap: 4,
          background: dark ? W.sumi2 : '#FFFCF5',
          border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          borderRadius: 10, padding: 3,
        }}>
          {['店舗別', '日別', '時間帯', '曜日'].map((t, i) => (
            <div key={t} style={{
              flex: 1, padding: '7px 0', textAlign: 'center',
              background: i === 0 ? (dark ? W.crimson : W.ink) : 'transparent',
              color: i === 0 ? W.goldL : (dark ? W.bone : W.ink),
              borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: 1,
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Donut pie */}
      <div style={{ padding: '0 20px 14px' }}>
        <Card dark={dark} pad={18}>
          <div style={{
            fontFamily: FSERIF, fontSize: 13, fontWeight: 600, letterSpacing: 3,
            color: dark ? W.bone : W.ink,
          }}>店舗別 構成比</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 12 }}>
            <div style={{ position: 'relative', width: 140, height: 140 }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                {/* outer hairline */}
                <circle cx="70" cy="70" r={R+2} fill="none" stroke={dark ? W.hairlineD : W.hairline} strokeWidth="0.5"/>
                {slices.map(sl => (
                  <path key={sl.id} d={arc(70, 70, R, r, sl.start, sl.end)}
                        fill={sl.s.color} stroke={dark ? W.sumi : W.paper} strokeWidth="1.5"/>
                ))}
                {/* center */}
                <text x="70" y="66" textAnchor="middle"
                  fontFamily={FMONO} fontSize="9" fill={dark ? W.boneMute : W.inkMute} letterSpacing="2">TOTAL</text>
                <text x="70" y="84" textAnchor="middle"
                  fontFamily={FSERIF} fontSize="16" fontWeight="600" fill={dark ? W.bone : W.ink}>
                  {yenK(total)}
                </text>
              </svg>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {slices.map(sl => (
                <div key={sl.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: 2, background: sl.s.color,
                  }}/>
                  <div style={{
                    fontFamily: FSERIF, fontSize: 13, fontWeight: 600,
                    color: dark ? W.bone : W.ink, width: 36,
                  }}>{sl.s.name}</div>
                  <div style={{
                    fontFamily: FMONO, fontSize: 12, color: dark ? W.boneMute : W.inkMute,
                    width: 36,
                  }}>{Math.round(sl.frac*100)}%</div>
                  <div style={{
                    fontFamily: FMONO, fontSize: 12, fontWeight: 700,
                    color: dark ? W.bone : W.ink, marginLeft: 'auto',
                  }}>{yenK(sl.v)}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Daily bar */}
      <div style={{ padding: '0 20px 14px' }}>
        <Card dark={dark} pad={16}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: FSERIF, fontSize: 13, fontWeight: 600, letterSpacing: 3,
              color: dark ? W.bone : W.ink,
            }}>日別 推移</div>
            <div style={{ fontSize: 10, color: dark ? W.boneMute : W.inkMute, fontFamily: FMONO }}>
              14日間 · 単位 千円
            </div>
          </div>

          {/* y-axis values */}
          <div style={{ position: 'relative', height: 140, marginTop: 14, paddingLeft: 22 }}>
            {/* y-axis grid */}
            {[100, 75, 50, 25, 0].map((g, i) => (
              <React.Fragment key={g}>
                <div style={{
                  position: 'absolute', left: 22, right: 0,
                  top: `${i * 25}%`, height: 0.5,
                  background: dark ? W.hairlineD : W.hairline,
                }}/>
                <div style={{
                  position: 'absolute', left: 0, top: `calc(${i * 25}% - 6px)`,
                  fontSize: 9, fontFamily: FMONO, color: dark ? W.boneMute : W.inkMute,
                }}>{g}</div>
              </React.Fragment>
            ))}
            {/* bars */}
            <div style={{
              position: 'absolute', left: 26, right: 0, top: 0, bottom: 0,
              display: 'flex', alignItems: 'flex-end', gap: 3,
            }}>
              {dailyData.map((v, i) => {
                const h = v / 110 * 100;
                const today = i === dailyData.length - 1;
                return (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`,
                    background: today
                      ? `linear-gradient(180deg, ${W.gold}, ${W.crimson})`
                      : `linear-gradient(180deg, ${W.crimson}, ${W.crimsonD})`,
                    borderRadius: '3px 3px 1px 1px',
                    boxShadow: today ? `0 0 12px ${W.gold}80` : 'none',
                    position: 'relative',
                  }}>
                    {today && (
                      <div style={{
                        position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                        marginBottom: 4,
                        fontSize: 9, fontFamily: FMONO, fontWeight: 700,
                        color: W.gold, whiteSpace: 'nowrap',
                      }}>{v}k</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* x-axis labels */}
          <div style={{
            display: 'flex', gap: 3, marginTop: 4, paddingLeft: 26,
            fontSize: 9, fontFamily: FMONO, color: dark ? W.boneMute : W.inkMute,
          }}>
            {dailyData.map((_, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                {i % 2 === 0 ? (i + 1) : ''}
              </div>
            ))}
          </div>

          {/* avg line stat */}
          <div style={{
            display: 'flex', gap: 16, marginTop: 12,
            paddingTop: 10,
            borderTop: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          }}>
            <Stat label="平均" v="68k" dark={dark} />
            <Stat label="最高" v="102k" c={W.gold} dark={dark} />
            <Stat label="最低" v="38k" dark={dark} />
            <Stat label="変動" v="±18%" dark={dark} />
          </div>
        </Card>
      </div>

      {/* Hour-of-day heat strip */}
      <div style={{ padding: '0 20px 14px' }}>
        <Card dark={dark} pad={14}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: FSERIF, fontSize: 13, fontWeight: 600, letterSpacing: 3,
              color: dark ? W.bone : W.ink,
            }}>時間帯 ヒート</div>
            <div style={{ fontSize: 10, color: dark ? W.boneMute : W.inkMute, fontFamily: FMONO }}>
              ピーク <span style={{ color: W.gold, fontWeight: 700 }}>21:00</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, marginTop: 10 }}>
            {Array.from({length: 12}).map((_, i) => {
              const hour = 18 + i % 12;
              const intensity = [0.1,0.18,0.32,0.5,0.65,0.78,1,0.92,0.6,0.42,0.25,0.15][i];
              return (
                <div key={i} style={{
                  height: 28,
                  borderRadius: 4,
                  background: `linear-gradient(180deg, ${W.gold}${Math.round(intensity*255).toString(16).padStart(2,'0')}, ${W.crimson}${Math.round(intensity*200).toString(16).padStart(2,'0')})`,
                }}/>
              );
            })}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, marginTop: 4 }}>
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} style={{
                fontSize: 8, fontFamily: FMONO, textAlign: 'center',
                color: dark ? W.boneMute : W.inkMute,
              }}>{18 + i < 24 ? `${18+i}` : `${(18+i-24)}`}</div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav active="rank" dark={dark} />
    </div>
  );
}

function Stat({ label, v, c, dark }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 9, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>{label}</div>
      <div style={{
        fontFamily: FMONO, fontSize: 13, fontWeight: 700,
        color: c || (dark ? W.bone : W.ink), marginTop: 1,
      }}>{v}</div>
    </div>
  );
}

Object.assign(window, { ScreenGraph });
