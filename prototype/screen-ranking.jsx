// Screen 2 & 3: Ranking (Half-month with #1 celebration) & Monthly (with AI prediction)

// Confetti pieces — small static SVG (no animation, but feel celebratory)
function Confetti({ dark }) {
  const pieces = [
    { x: 12, y: 22, r: -20, c: W.gold, w: 4, h: 10 },
    { x: 38, y: 8,  r: 25,  c: W.crimsonL, w: 4, h: 8 },
    { x: 62, y: 18, r: -10, c: W.goldL, w: 5, h: 10 },
    { x: 84, y: 30, r: 40,  c: W.gold, w: 3, h: 9 },
    { x: 22, y: 50, r: 15,  c: W.crimsonL, w: 3, h: 7 },
    { x: 78, y: 60, r: -30, c: W.goldL, w: 4, h: 8 },
    { x: 50, y: 4,  r: 0,   c: W.gold, w: 3, h: 6 },
    { x: 6,  y: 70, r: 30,  c: W.crimsonL, w: 3, h: 9 },
    { x: 92, y: 78, r: -45, c: W.gold, w: 3, h: 7 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.w, height: p.h, background: p.c,
          transform: `rotate(${p.r}deg)`, borderRadius: 1,
          opacity: 0.85,
        }}/>
      ))}
    </div>
  );
}

// #1 hero card — gold glow, laurel halo above avatar
function HeroFirst({ staff, amount, dark }) {
  return (
    <div style={{
      position: 'relative',
      margin: '8px 20px 20px',
      borderRadius: 20,
      padding: '28px 20px 22px',
      background: dark
        ? `radial-gradient(ellipse at 50% 0%, ${W.crimsonD} 0%, ${W.sumi2} 70%)`
        : `radial-gradient(ellipse at 50% 0%, #FFF1D4 0%, #FFFCF5 75%)`,
      border: `1px solid ${W.gold}55`,
      overflow: 'hidden',
      boxShadow: dark
        ? `0 0 0 1px ${W.gold}30, 0 0 40px ${W.gold}20, 0 12px 32px rgba(0,0,0,0.5)`
        : `0 0 0 1px ${W.gold}30, 0 0 40px ${W.gold}40, 0 8px 24px rgba(122,27,38,0.10)`,
    }}>
      <Confetti dark={dark} />

      {/* family-crest backdrop */}
      <svg style={{ position:'absolute', left:'50%', top: 8, transform:'translateX(-50%)', opacity: 0.10 }}
           width="200" height="200" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" fill="none" stroke={W.gold} strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="34" fill="none" stroke={W.gold} strokeWidth="0.5"/>
        {Array.from({length:16}).map((_,i)=>{
          const a = i*22.5*Math.PI/180;
          return <line key={i} x1={50} y1={50}
            x2={50+44*Math.cos(a)} y2={50+44*Math.sin(a)}
            stroke={W.gold} strokeWidth="0.3"/>
        })}
      </svg>

      {/* MVP banner */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: W.gold }}>
          <div style={{ width: 28, height: 1, background: W.gold }}/>
          <div style={{ fontFamily: FSERIF, fontSize: 11, fontWeight: 600, letterSpacing: 6 }}>第一位</div>
          <div style={{ width: 28, height: 1, background: W.gold }}/>
        </div>

        {/* Crown laurel */}
        <div style={{ marginTop: 8, position: 'relative', display: 'inline-block' }}>
          <svg width="100" height="22" viewBox="0 0 100 22" style={{
            position: 'absolute', left: '50%', top: -6, transform: 'translateX(-50%)',
            filter: `drop-shadow(0 0 6px ${W.gold})`,
          }}>
            <path d="M50 6 L42 0 L46 8 L36 4 L42 10 L30 8 L40 13 L50 14 L60 13 L70 8 L58 10 L64 4 L54 8 L58 0 z"
                  fill={W.gold} />
          </svg>
          {/* Avatar */}
          <div style={{
            width: 84, height: 84, borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${W.gold}, ${W.goldL}, ${W.gold}, ${W.crimson}, ${W.gold})`,
            padding: 3, marginTop: 8,
            boxShadow: `0 0 24px ${W.gold}80, inset 0 0 0 1px ${W.gold}`,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FSERIF, fontSize: 38, fontWeight: 600,
              color: W.goldL,
            }}>蓮</div>
          </div>
        </div>

        <div style={{
          marginTop: 12, fontFamily: FSERIF, fontSize: 24, fontWeight: 600,
          color: dark ? W.bone : W.ink, letterSpacing: 1,
        }}>{staff}</div>
        <div style={{
          fontFamily: FMONO, fontSize: 10, color: dark ? W.boneMute : W.inkMute, letterSpacing: 1.5,
        }}>YUKI · REN</div>

        {/* amount */}
        <div style={{
          marginTop: 10,
          fontFamily: FSERIF, fontSize: 36, fontWeight: 600,
          color: W.gold,
          textShadow: `0 0 20px ${W.gold}60`,
          letterSpacing: 1,
        }}>{yen(amount)}</div>
        <div style={{
          fontSize: 11, color: dark ? W.boneMute : W.inkMute,
          marginTop: 2,
        }}>2位との差 <span style={{ fontFamily: FMONO, color: W.gold, fontWeight: 600 }}>+¥48,200</span></div>
      </div>
    </div>
  );
}

function RankRow({ rank, staff, amount, delta, dark, color }) {
  const medalColors = { 2: '#C6C6CC', 3: '#B87333' };
  const c = color || medalColors[rank];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      background: dark ? W.sumi2 : '#FFFCF5',
      border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
      borderRadius: 14,
    }}>
      {/* rank badge */}
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: c ? `linear-gradient(135deg, ${c}, ${c}AA)` : 'transparent',
        border: c ? 'none' : `1px solid ${dark ? W.hairlineD : W.hairline}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FSERIF, fontSize: 14, fontWeight: 700,
        color: c ? '#fff' : (dark ? W.boneMute : W.inkMute),
        boxShadow: c ? `0 0 8px ${c}80` : 'none',
        flexShrink: 0,
      }}>{rank}</div>

      {/* avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: dark ? W.sumi3 : W.paper2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FSERIF, fontSize: 16, fontWeight: 600,
        color: dark ? W.bone : W.ink,
        flexShrink: 0,
      }}>{staff.avatar}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: dark ? W.bone : W.ink,
        }}>{staff.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <Delta value={delta} dark={dark} />
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: FMONO, fontSize: 15, fontWeight: 700,
          color: dark ? W.bone : W.ink,
        }}>{yen(amount)}</div>
        {/* sparkline (mini bar) */}
        <div style={{ display: 'flex', gap: 1.5, marginTop: 4, justifyContent: 'flex-end' }}>
          {[5,8,4,9,7,11,6].map((h,i)=>(
            <div key={i} style={{
              width: 2, height: h, background: dark ? W.gold : W.crimson, opacity: 0.4 + i*0.08,
              borderRadius: 1,
            }}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenRankHalf({ dark = false }) {
  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      <PageHeader
        dark={dark}
        title="半月ランキング"
        sub="11.01 ─ 11.15 · DAY 10/15"
        right={
          <div style={{
            padding: '6px 12px', borderRadius: 999,
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            fontSize: 11, fontWeight: 600,
            color: dark ? W.bone : W.ink,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>前半 {I.chev}</div>
        }
      />

      {/* segmented period */}
      <div style={{ padding: '0 20px 4px' }}>
        <div style={{
          display: 'flex', gap: 4,
          background: dark ? W.sumi2 : '#FFFCF5',
          border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          borderRadius: 10, padding: 3,
        }}>
          {['半月', '月間', '年間'].map((t, i) => (
            <div key={t} style={{
              flex: 1, padding: '7px 0', textAlign: 'center',
              background: i === 0 ? (dark ? W.crimson : W.ink) : 'transparent',
              color: i === 0 ? W.goldL : (dark ? W.bone : W.ink),
              borderRadius: 8,
              fontSize: 12, fontWeight: 600, letterSpacing: 1,
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <HeroFirst staff="結城 蓮" amount={428600} dark={dark} />

      {/* 2nd & 3rd as side-by-side podiums */}
      <div style={{
        padding: '0 20px 14px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        {[
          { rank: 2, staff: STAFF[5], amount: 380400, c: '#C6C6CC' },
          { rank: 3, staff: STAFF[3], amount: 312800, c: '#B87333' },
        ].map(p => (
          <div key={p.rank} style={{
            position: 'relative',
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${p.c}55`,
            borderRadius: 16, padding: '14px 12px 12px',
            textAlign: 'center',
            boxShadow: `0 4px 12px ${p.c}25`,
          }}>
            <div style={{
              position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
              width: 24, height: 24, borderRadius: '50%',
              background: `linear-gradient(135deg, ${p.c}, ${p.c}DD)`,
              color: '#fff', fontFamily: FSERIF, fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px ${p.c}80`,
            }}>{p.rank}</div>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
              color: W.goldL, fontFamily: FSERIF, fontSize: 22, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '6px auto 6px',
            }}>{p.staff.avatar}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: dark ? W.bone : W.ink }}>{p.staff.name}</div>
            <div style={{
              fontFamily: FMONO, fontSize: 13, fontWeight: 700,
              color: dark ? W.bone : W.ink, marginTop: 3,
            }}>{yen(p.amount)}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 0.5, background: dark ? W.hairlineD : W.hairline }}/>
        <div style={{
          fontFamily: FSERIF, fontSize: 11, letterSpacing: 4,
          color: dark ? W.boneMute : W.inkMute,
        }}>四位以降</div>
        <div style={{ flex: 1, height: 0.5, background: dark ? W.hairlineD : W.hairline }}/>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { rank: 4, staff: STAFF[0], amount: 248200, delta: 12 },
          { rank: 5, staff: STAFF[6], amount: 211400, delta: -3 },
          { rank: 6, staff: STAFF[2], amount: 188700, delta: 5 },
          { rank: 7, staff: STAFF[7], amount: 162400, delta: 0 },
          { rank: 8, staff: STAFF[4], amount: 142000, delta: -8 },
        ].map(r => <RankRow key={r.rank} {...r} dark={dark} />)}
      </div>

      <BottomNav active="rank" dark={dark} />
    </div>
  );
}

// ─── Monthly ranking with AI prediction ───
function ScreenRankMonth({ dark = false }) {
  const projected = 824000;
  const current = 612400;
  const confidence = 78;
  const goal = 900000;

  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      <PageHeader
        dark={dark}
        title="月間ランキング"
        sub="2026.11 · DAY 10/30"
        right={
          <div style={{
            padding: '6px 10px', borderRadius: 999,
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            fontSize: 11, fontWeight: 600,
            color: dark ? W.bone : W.ink,
          }}>11月 {I.chev}</div>
        }
      />

      <div style={{ padding: '0 20px 4px' }}>
        <div style={{
          display: 'flex', gap: 4,
          background: dark ? W.sumi2 : '#FFFCF5',
          border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          borderRadius: 10, padding: 3,
        }}>
          {['半月', '月間', '年間'].map((t, i) => (
            <div key={t} style={{
              flex: 1, padding: '7px 0', textAlign: 'center',
              background: i === 1 ? (dark ? W.crimson : W.ink) : 'transparent',
              color: i === 1 ? W.goldL : (dark ? W.bone : W.ink),
              borderRadius: 8,
              fontSize: 12, fontWeight: 600, letterSpacing: 1,
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* AI projection card */}
      <div style={{
        margin: '14px 20px 16px',
        background: dark
          ? `linear-gradient(160deg, ${W.sumi2}, ${W.sumi})`
          : `linear-gradient(160deg, #FFFCF5, #F8F2E2)`,
        border: `0.5px solid ${W.gold}40`,
        borderRadius: 18, padding: 16,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* AI badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 9px', borderRadius: 999,
          background: dark ? W.crimsonD : '#FFF1D4',
          color: W.gold,
          fontSize: 9, fontWeight: 700, letterSpacing: 2,
        }}>
          <span style={{ color: W.gold, display: 'flex' }}>{I.sparkle}</span>
          AI 月末予測
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
          {/* Confidence donut */}
          <div style={{
            width: 88, height: 88, position: 'relative', flexShrink: 0,
          }}>
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="38" fill="none"
                      stroke={dark ? W.sumi3 : W.paper2} strokeWidth="6"/>
              <circle cx="44" cy="44" r="38" fill="none"
                      stroke={W.gold} strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${238.7 * confidence/100} 238.7`}
                      transform="rotate(-90 44 44)"
                      style={{ filter: `drop-shadow(0 0 4px ${W.gold}80)` }}/>
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: FSERIF, fontSize: 22, fontWeight: 600,
                color: dark ? W.bone : W.ink, lineHeight: 1,
              }}>{confidence}<span style={{ fontSize: 12 }}>%</span></div>
              <div style={{ fontSize: 8, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute, marginTop: 2 }}>信頼度</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>11月末 着地予測</div>
            <div style={{
              fontFamily: FSERIF, fontSize: 30, fontWeight: 600,
              color: dark ? W.bone : W.ink, marginTop: 2, letterSpacing: 0.5,
            }}>{yen(projected)}</div>
            <div style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute, marginTop: 2 }}>
              範囲 <span style={{ fontFamily: FMONO, color: W.gold }}>{yenK(782000)} ─ {yenK(871000)}</span>
            </div>
          </div>
        </div>

        {/* progress to goal */}
        <div style={{ marginTop: 14 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            fontSize: 10, letterSpacing: 1, color: dark ? W.boneMute : W.inkMute,
            marginBottom: 4,
          }}>
            <span>目標 {yen(goal)}</span>
            <span style={{ fontFamily: FMONO, color: dark ? W.bone : W.ink, fontWeight: 600 }}>達成見込 {Math.round(projected/goal*100)}%</span>
          </div>
          <div style={{
            height: 8, borderRadius: 4,
            background: dark ? W.sumi3 : W.paper2,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* current */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${current/goal*100}%`,
              background: `linear-gradient(90deg, ${W.crimson}, ${W.crimsonL})`,
              borderRadius: 4,
            }}/>
            {/* projected (lighter gold tail) */}
            <div style={{
              position: 'absolute', left: `${current/goal*100}%`, top: 0, bottom: 0,
              width: `${(projected-current)/goal*100}%`,
              background: `repeating-linear-gradient(45deg, ${W.gold}66, ${W.gold}66 4px, ${W.gold}33 4px, ${W.gold}33 8px)`,
            }}/>
            {/* goal marker */}
            <div style={{
              position: 'absolute', right: 0, top: -2, bottom: -2,
              width: 1, background: W.gold,
            }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <div style={{ fontSize: 10, color: dark ? W.boneMute : W.inkMute }}>
              現在 <span style={{ fontFamily: FMONO, fontWeight: 600, color: dark ? W.bone : W.ink }}>{yen(current)}</span>
            </div>
            <div style={{ fontSize: 10, color: W.gold }}>
              <span style={{ fontFamily: FMONO, fontWeight: 600 }}>+{yen(projected-current)}</span> 予想
            </div>
          </div>
        </div>

        {/* reasoning tags */}
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            { t: '前月同曜日比 +14%', good: true },
            { t: '金土集中型', good: true },
            { t: '週末3回残', good: true },
            { t: '雨予報1日', good: false },
          ].map(tag => (
            <div key={tag.t} style={{
              padding: '4px 10px', borderRadius: 999,
              border: `0.5px solid ${tag.good ? W.gold+'66' : W.crimsonL+'66'}`,
              background: tag.good
                ? (dark ? W.gold+'15' : '#FFF8EA')
                : (dark ? W.crimsonD+'40' : '#FBEEF0'),
              fontSize: 10, fontWeight: 500,
              color: tag.good ? W.gold : W.crimsonL,
            }}>{tag.t}</div>
          ))}
        </div>
      </div>

      {/* ranking list */}
      <div style={{
        padding: '0 20px 8px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: FSERIF, fontSize: 13, letterSpacing: 3,
          color: dark ? W.bone : W.ink, fontWeight: 600,
        }}>月間スタッフ別</div>
        <div style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute, fontFamily: FMONO }}>
          (現在 / 予測)
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { rank: 1, staff: STAFF[0], amount: 612400, proj: 824000, c: W.gold },
          { rank: 2, staff: STAFF[5], amount: 548200, proj: 710000, c: '#C6C6CC' },
          { rank: 3, staff: STAFF[3], amount: 482600, proj: 658000, c: '#B87333' },
          { rank: 4, staff: STAFF[1], amount: 412800, proj: 552000 },
          { rank: 5, staff: STAFF[6], amount: 388100, proj: 510000 },
        ].map(r => (
          <div key={r.rank} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px',
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            borderRadius: 14,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: r.c ? `linear-gradient(135deg, ${r.c}, ${r.c}AA)` : 'transparent',
              border: r.c ? 'none' : `1px solid ${dark ? W.hairlineD : W.hairline}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FSERIF, fontSize: 13, fontWeight: 700,
              color: r.c ? '#fff' : (dark ? W.boneMute : W.inkMute),
              boxShadow: r.c ? `0 0 8px ${r.c}80` : 'none',
              flexShrink: 0,
            }}>{r.rank}</div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: dark ? W.sumi3 : W.paper2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FSERIF, fontSize: 14, fontWeight: 600,
              color: dark ? W.bone : W.ink, flexShrink: 0,
            }}>{r.staff.avatar}</div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: dark ? W.bone : W.ink }}>
              {r.staff.name}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FMONO, fontSize: 13, fontWeight: 700, color: dark ? W.bone : W.ink }}>
                {yen(r.amount)}
              </div>
              <div style={{ fontFamily: FMONO, fontSize: 10, color: W.gold, marginTop: 1 }}>
                {I.sparkle && <span style={{ marginRight: 2, verticalAlign: -1 }}>↗</span>}
                予測 {yenK(r.proj)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="rank" dark={dark} />
    </div>
  );
}

Object.assign(window, { ScreenRankHalf, ScreenRankMonth });
