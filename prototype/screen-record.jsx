// Screen 1: 売上記録 (Sales Entry) — with custom numeric pad

function ScreenRecord({ dark = false }) {
  const [activeStore, setActiveStore] = React.useState('dosu');
  const [amounts, setAmounts] = React.useState({
    gochi: 12500, dosu: 38400, goro: 0, uo: 8200,
  });
  const total = Object.values(amounts).reduce((a, b) => a + b, 0);
  const staff = STAFF[1];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        dark={dark}
        title="売上記録"
        sub="DAILY RECORD"
        right={
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px',
            background: dark ? W.sumi2 : '#FFFCF5',
            border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
            borderRadius: 999,
            color: dark ? W.bone : W.ink,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
              color: W.goldL, fontFamily: FSERIF, fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{staff.avatar}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{staff.nick}</div>
            <span style={{ color: dark ? W.boneMute : W.inkMute }}>{I.chev}</span>
          </div>
        }
      />

      {/* Date strip */}
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{
          display: 'flex', gap: 6,
          background: dark ? W.sumi2 : '#FFFCF5',
          border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
          borderRadius: 12, padding: 4,
        }}>
          {[
            { d: 7,  w: '木' },
            { d: 8,  w: '金' },
            { d: 9,  w: '土' },
            { d: 10, w: '日', on: true },
            { d: 11, w: '月' },
          ].map(x => (
            <div key={x.d} style={{
              flex: 1, padding: '6px 0', textAlign: 'center',
              background: x.on ? (dark ? W.crimson : W.ink) : 'transparent',
              color: x.on ? W.goldL : (dark ? W.bone : W.ink),
              borderRadius: 9,
            }}>
              <div style={{ fontSize: 9, opacity: 0.6, fontFamily: FSANS, letterSpacing: 1 }}>{x.w}</div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: FSERIF, marginTop: 1 }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div style={{ padding: '8px 20px 12px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${dark ? '#241B14' : '#FFF8EA'}, ${dark ? W.sumi2 : '#FFFCF5'})`,
          border: `0.5px solid ${W.gold}40`,
          borderRadius: 16, padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -20, width: 100, height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${W.gold}25, transparent 70%)`,
          }}/>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: dark ? W.boneMute : W.inkMute }}>本日合計</div>
            <div style={{
              fontFamily: FSERIF, fontSize: 30, fontWeight: 600,
              color: dark ? W.bone : W.ink, marginTop: 2, letterSpacing: 0.5,
            }}>{yen(total)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: dark ? W.boneMute : W.inkMute }}>前日比</div>
            <Delta value={18} dark={dark} />
          </div>
        </div>
      </div>

      {/* Store grid */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {STORES.map(s => {
          const on = activeStore === s.id;
          const v = amounts[s.id];
          return (
            <div key={s.id} style={{
              background: dark ? W.sumi2 : '#FFFCF5',
              border: on ? `1.5px solid ${s.color}` : `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
              borderRadius: 14, padding: '12px 14px',
              position: 'relative', overflow: 'hidden',
              boxShadow: on ? `0 0 0 4px ${s.color}1A, 0 4px 12px ${s.color}30` : 'none',
              transition: 'all 0.2s',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: s.color,
                  boxShadow: on ? `0 0 6px ${s.color}` : 'none',
                }}/>
              </div>
              <div style={{
                fontFamily: FSERIF, fontSize: 18, fontWeight: 600,
                color: dark ? W.bone : W.ink,
              }}>{s.name}</div>
              <div style={{
                fontSize: 8, letterSpacing: 2, color: dark ? W.boneMute : W.inkMute,
                marginTop: 1, marginBottom: 8, fontFamily: FMONO,
              }}>{s.kana}</div>
              <div style={{
                fontFamily: FMONO, fontSize: v ? 18 : 14, fontWeight: 600,
                color: v ? (dark ? W.bone : W.ink) : (dark ? W.boneMute : W.inkMute),
              }}>{v ? yen(v) : '¥ ―'}</div>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>

      {/* Numeric pad */}
      <NumericPad dark={dark} value={amounts[activeStore]} store={STORES.find(s=>s.id===activeStore)} />

      <BottomNav active="rec" dark={dark} />
    </div>
  );
}

function NumericPad({ dark, value, store }) {
  const keys = ['1','2','3','4','5','6','7','8','9','000','0','⌫'];
  return (
    <div style={{
      background: dark ? '#0E0B09' : '#E8DFCC',
      borderTop: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
      padding: '12px 12px 78px',
    }}>
      {/* current target row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 8px 10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: store.color,
            boxShadow: `0 0 8px ${store.color}`,
          }}/>
          <div style={{
            fontFamily: FSERIF, fontSize: 14, fontWeight: 600,
            color: dark ? W.bone : W.ink,
          }}>{store.name} 入力中</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1000, 5000, 10000].map(q => (
            <div key={q} style={{
              padding: '4px 10px', borderRadius: 999,
              background: dark ? W.sumi3 : '#FFFCF5',
              border: `0.5px solid ${dark ? W.hairlineD : W.hairline}`,
              fontSize: 11, fontFamily: FMONO, fontWeight: 600,
              color: dark ? W.bone : W.ink,
            }}>+{(q/1000)}k</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {keys.map((k, i) => {
          const isDel = k === '⌫';
          const isAction = i === 9 || isDel; // 000 & ⌫
          return (
            <div key={k} style={{
              height: 46, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isAction
                ? (dark ? W.sumi3 : '#D9CFB8')
                : (dark ? '#241D17' : '#FFFCF5'),
              color: isDel ? W.crimsonL : (dark ? W.bone : W.ink),
              fontFamily: FSERIF, fontSize: 22, fontWeight: 500,
              boxShadow: dark ? '0 1px 0 rgba(0,0,0,0.4)' : '0 1px 0 rgba(0,0,0,0.08)',
            }}>{k}</div>
          );
        })}
      </div>
      {/* save bar */}
      <div style={{ marginTop: 10 }}>
        <div style={{
          height: 50, borderRadius: 14,
          background: `linear-gradient(135deg, ${W.crimson}, ${W.crimsonD})`,
          color: W.goldL,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FSERIF, fontSize: 17, fontWeight: 600, letterSpacing: 4,
          boxShadow: `0 4px 16px ${W.crimson}50, inset 0 1px 0 ${W.goldL}30`,
        }}>記録する</div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenRecord });
