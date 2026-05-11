// Screen 7: 設定 (Settings + dark/light + alerts) & Screen 8: 24h warning notification

function ScreenSettings({ dark = false }) {
  const Row = ({ icon, label, sub, right, accent }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: accent || (dark ? W.sumi3 : W.paper2),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent ? W.goldL : (dark ? W.bone : W.ink),
        flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: dark ? W.bone : W.ink }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: dark ? W.boneMute : W.inkMute, marginTop: 1 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );

  const Toggle = ({ on }) => (
    <div style={{
      width: 44, height: 26, borderRadius: 999,
      background: on ? W.crimson : (dark ? W.sumi3 : W.paper2),
      position: 'relative', transition: '0.2s',
      boxShadow: on ? `0 0 12px ${W.crimson}50, inset 0 0 0 1px ${W.gold}40` : 'none',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: on ? W.goldL : '#fff',
        position: 'absolute', top: 2, left: on ? 20 : 2,
        transition: '0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}/>
    </div>
  );

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        padding: '0 20px 6px',
        fontFamily: FSERIF, fontSize: 11, letterSpacing: 4, fontWeight: 600,
        color: dark ? W.boneMute : W.inkMute,
      }}>{title}</div>
      <div style={{
        margin: '0 16px',
        background: dark ? W.sumi2 : '#FFFCF5',
        border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
        borderRadius: 14, overflow: 'hidden',
      }}>{children}</div>
    </div>
  );

  const Divider = () => (
    <div style={{ height: 0.5, background: dark ? W.hairlineD : W.hairline, marginLeft: 58 }}/>
  );

  return (
    <div style={{ height: '100%', overflow: 'auto', paddingBottom: 100 }}>
      <PageHeader dark={dark} title="設定" sub="SETTINGS" />

      {/* Profile hero */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: dark
            ? `linear-gradient(135deg, ${W.crimsonD}, ${W.sumi2})`
            : `linear-gradient(135deg, ${W.ink}, ${W.ink2})`,
          borderRadius: 16, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
          border: `0.5px solid ${W.gold}40`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${W.gold}, ${W.goldL}, ${W.gold})`,
            padding: 2,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: W.crimsonD,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FSERIF, fontSize: 22, fontWeight: 600, color: W.goldL,
            }}>店</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FSERIF, fontSize: 16, fontWeight: 600, color: W.bone }}>
              新宿東口 · 統括店長
            </div>
            <div style={{ fontSize: 11, color: W.boneMute, fontFamily: FMONO, letterSpacing: 1, marginTop: 2 }}>
              MANAGER · 8 STAFF · 4 STORES
            </div>
          </div>
          <div style={{ color: W.goldL, opacity: 0.6 }}>{I.chev}</div>
        </div>
      </div>

      <Section title="表示">
        <Row
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1"/>
          </svg>}
          label="ダークモード"
          sub={dark ? '夜の和 · 漆黒' : '昼の和 · 和紙'}
          right={<Toggle on={dark}/>}
        />
        <Divider/>
        <Row
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M3 5h12M3 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>}
          label="文字サイズ"
          right={<div style={{
            display: 'flex', gap: 4, alignItems: 'center',
            fontSize: 11, color: dark ? W.boneMute : W.inkMute,
          }}>標準 {I.chev}</div>}
        />
        <Divider/>
        <Row
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="9" cy="9" r="2" fill="currentColor"/>
          </svg>}
          label="アクセント"
          right={<div style={{ display: 'flex', gap: 6 }}>
            {[W.gold, W.crimsonL, W.pine].map((c, i) => (
              <div key={i} style={{
                width: 22, height: 22, borderRadius: '50%', background: c,
                border: i === 0 ? `2px solid ${dark ? W.bone : W.ink}` : 'none',
                boxShadow: i === 0 ? `0 0 8px ${c}80` : 'none',
              }}/>
            ))}
          </div>}
        />
      </Section>

      <Section title="通知 · 警告">
        <Row
          icon={I.bell}
          label="24時間未入力警告"
          sub="入力忘れを通知"
          right={<Toggle on={true}/>}
        />
        <Divider/>
        <Row
          icon={I.trophy}
          label="ランキング更新通知"
          sub="毎日 23:30"
          right={<Toggle on={true}/>}
        />
        <Divider/>
        <Row
          icon={<span style={{ color: W.gold }}>{I.sparkle}</span>}
          label="AI予測 着地アラート"
          sub="目標超過/未達の見込時"
          accent={W.crimson}
          right={<Toggle on={true}/>}
        />
      </Section>

      <Section title="目標">
        <Row
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="9" cy="9" r="1" fill="currentColor"/>
          </svg>}
          label="月目標"
          right={<div style={{ display: 'flex', gap: 4, alignItems: 'center', fontFamily: FMONO, fontSize: 12, fontWeight: 600, color: W.gold }}>¥800,000 {I.chev}</div>}
        />
        <Divider/>
        <Row
          icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 7h12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>}
          label="ランキング期間"
          right={<div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11, color: dark ? W.boneMute : W.inkMute }}>半月+月間 {I.chev}</div>}
        />
      </Section>

      <Section title="データ">
        <Row icon={<span>↓</span>} label="CSV書き出し" right={I.chev}/>
        <Divider/>
        <Row icon={<span>☁</span>} label="クラウドバックアップ" sub="最終: 11/10 02:14" right={I.chev}/>
      </Section>

      <div style={{
        textAlign: 'center', padding: '4px 0 20px',
        fontFamily: FMONO, fontSize: 9, letterSpacing: 2,
        color: dark ? W.boneMute : W.inkMute,
      }}>
        キャッチ売上 · v2.4 · 和
      </div>

      <BottomNav active="set" dark={dark} />
    </div>
  );
}

// ──── 8. 24h警告 (Alert modal on top of dimmed Record screen) ────
function ScreenAlert({ dark = false }) {
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      {/* Dimmed background — mini fake content */}
      <div style={{ filter: 'blur(2px)', opacity: 0.55, pointerEvents: 'none' }}>
        <PageHeader dark={dark} title="売上記録" sub="DAILY RECORD"/>
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {STORES.map(s => (
            <div key={s.id} style={{
              background: dark ? W.sumi2 : '#FFFCF5',
              border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
              borderRadius: 14, padding: '14px 16px', height: 80,
            }}>
              <div style={{ fontFamily: FSERIF, fontSize: 18, fontWeight: 600, color: dark ? W.bone : W.ink }}>{s.name}</div>
              <div style={{ fontFamily: FMONO, fontSize: 14, marginTop: 12, color: dark ? W.boneMute : W.inkMute }}>¥ ―</div>
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark ? 'rgba(19,16,14,0.75)' : 'rgba(26,20,16,0.45)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      }}/>

      {/* Top banner (system-style) */}
      <div style={{
        position: 'absolute', top: 56, left: 12, right: 12, zIndex: 10,
        background: dark ? 'rgba(40,32,26,0.92)' : 'rgba(255,252,245,0.96)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: `0.5px solid ${W.crimsonL}66`,
        borderRadius: 18, padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: W.goldL,
        }}>{I.warn}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: W.crimsonL,
          }}>24時間未入力</div>
          <div style={{
            fontFamily: FSERIF, fontSize: 14, fontWeight: 600,
            color: dark ? W.bone : W.ink, marginTop: 2,
          }}>11/9 ごち の売上が未入力です</div>
        </div>
        <div style={{
          fontFamily: FMONO, fontSize: 10, color: dark ? W.boneMute : W.inkMute,
        }}>今</div>
      </div>

      {/* Center modal */}
      <div style={{
        position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%, -50%)',
        width: 320, zIndex: 11,
      }}>
        <div style={{
          background: dark
            ? `linear-gradient(160deg, ${W.sumi2}, ${W.sumi})`
            : `linear-gradient(160deg, #FFFCF5, ${W.paper})`,
          border: `0.5px solid ${W.crimsonL}55`,
          borderRadius: 22, padding: '22px 22px 16px',
          boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${W.crimsonL}30`,
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* tear-stripe */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
            background: `linear-gradient(180deg, ${W.crimson}, ${W.crimsonL}, ${W.crimson})`,
          }}/>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            margin: '0 auto 12px',
            background: `radial-gradient(circle, ${W.crimson}40, transparent 70%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: W.goldL,
              boxShadow: `0 0 16px ${W.crimson}80`,
            }}>{I.warn}</div>
          </div>
          <div style={{
            fontFamily: FSERIF, fontSize: 11, letterSpacing: 4, fontWeight: 600,
            color: W.crimsonL,
          }}>未入力アラート</div>
          <div style={{
            fontFamily: FSERIF, fontSize: 19, fontWeight: 600,
            color: dark ? W.bone : W.ink, marginTop: 8, lineHeight: 1.4,
          }}>昨日の売上、まだ<br/>入力されていません</div>
          <div style={{
            fontSize: 12, color: dark ? W.boneMute : W.inkMute, marginTop: 8,
            lineHeight: 1.6,
          }}>11月9日 (月) · 24時間以上経過<br/>記録漏れがないか確認してください</div>

          {/* Pending stores */}
          <div style={{
            margin: '14px 0 16px', padding: '10px 12px',
            background: dark ? W.sumi3 : W.paper2,
            borderRadius: 12,
            display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
          }}>
            <div style={{ fontSize: 10, color: dark ? W.boneMute : W.inkMute, letterSpacing: 1 }}>未入力店舗</div>
            {[STORES[0], STORES[2]].map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '3px 8px', borderRadius: 999,
                background: s.color + '22', color: s.color,
                fontSize: 11, fontWeight: 700,
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }}/>
                {s.name}
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex', gap: 8,
          }}>
            <div style={{
              flex: 1, padding: '12px 0', textAlign: 'center',
              background: dark ? W.sumi3 : W.paper2,
              borderRadius: 12,
              fontFamily: FSERIF, fontSize: 14, fontWeight: 600,
              color: dark ? W.bone : W.ink,
            }}>後で</div>
            <div style={{
              flex: 1.6, padding: '12px 0', textAlign: 'center',
              background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
              color: W.goldL,
              borderRadius: 12,
              fontFamily: FSERIF, fontSize: 14, fontWeight: 600, letterSpacing: 2,
              boxShadow: `0 4px 12px ${W.crimson}50, inset 0 1px 0 ${W.goldL}30`,
            }}>今すぐ入力</div>
          </div>
        </div>
      </div>

      <BottomNav active="rec" dark={dark} />
    </div>
  );
}

Object.assign(window, { ScreenSettings, ScreenAlert });
