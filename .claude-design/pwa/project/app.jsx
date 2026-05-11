// Main canvas assembly — 8 artboards across 2 sections (Light/Dark)

function App() {
  return (
    <DesignCanvas
      title="キャッチ売上ランキング · PWA リニューアル"
      subtitle="iOS PWA · モバイル縦 · 和モダン (深紅 + 金) · 全画面一括表示"
    >
      <DCSection id="light" title="ライトモード · 和紙" subtitle="日中の店舗確認用 — 和紙ベース + 深紅+金アクセント">
        <DCArtboard id="rec-l"   label="① 売上記録"           width={390} height={844}><Phone dark={false}><ScreenRecord    dark={false}/></Phone></DCArtboard>
        <DCArtboard id="halfR-l" label="② 半月ランキング"      width={390} height={844}><Phone dark={false}><ScreenRankHalf  dark={false}/></Phone></DCArtboard>
        <DCArtboard id="monR-l"  label="③ 月間 + AI予測"       width={390} height={844}><Phone dark={false}><ScreenRankMonth dark={false}/></Phone></DCArtboard>
        <DCArtboard id="cal-l"   label="④ カレンダー"          width={390} height={844}><Phone dark={false}><ScreenCalendar  dark={false}/></Phone></DCArtboard>
        <DCArtboard id="me-l"    label="⑤ 個人 + 月目標"        width={390} height={844}><Phone dark={false}><ScreenPersonal  dark={false}/></Phone></DCArtboard>
        <DCArtboard id="gra-l"   label="⑥ グラフ"               width={390} height={844}><Phone dark={false}><ScreenGraph     dark={false}/></Phone></DCArtboard>
        <DCArtboard id="set-l"   label="⑦ 設定"                 width={390} height={844}><Phone dark={false}><ScreenSettings  dark={false}/></Phone></DCArtboard>
        <DCArtboard id="alt-l"   label="⑧ 24h未入力警告"        width={390} height={844}><Phone dark={false}><ScreenAlert     dark={false}/></Phone></DCArtboard>
      </DCSection>

      <DCSection id="dark" title="ダークモード · 漆黒" subtitle="夜営業中の手元用 — 墨ベース + 金グロー強め">
        <DCArtboard id="rec-d"   label="① 売上記録"           width={390} height={844}><Phone dark={true}><ScreenRecord    dark={true}/></Phone></DCArtboard>
        <DCArtboard id="halfR-d" label="② 半月ランキング"      width={390} height={844}><Phone dark={true}><ScreenRankHalf  dark={true}/></Phone></DCArtboard>
        <DCArtboard id="monR-d"  label="③ 月間 + AI予測"       width={390} height={844}><Phone dark={true}><ScreenRankMonth dark={true}/></Phone></DCArtboard>
        <DCArtboard id="cal-d"   label="④ カレンダー"          width={390} height={844}><Phone dark={true}><ScreenCalendar  dark={true}/></Phone></DCArtboard>
        <DCArtboard id="me-d"    label="⑤ 個人 + 月目標"        width={390} height={844}><Phone dark={true}><ScreenPersonal  dark={true}/></Phone></DCArtboard>
        <DCArtboard id="gra-d"   label="⑥ グラフ"               width={390} height={844}><Phone dark={true}><ScreenGraph     dark={true}/></Phone></DCArtboard>
        <DCArtboard id="set-d"   label="⑦ 設定"                 width={390} height={844}><Phone dark={true}><ScreenSettings  dark={true}/></Phone></DCArtboard>
        <DCArtboard id="alt-d"   label="⑧ 24h未入力警告"        width={390} height={844}><Phone dark={true}><ScreenAlert     dark={true}/></Phone></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
