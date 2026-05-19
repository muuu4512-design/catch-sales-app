# キャッチ売上アプリ — Codex 引き継ぎリスト

作成日: 2026-05-19

---

## 1. プロジェクト概要

岡山のキャッチ（客引き）スタッフの売上を記録・集計するPWAアプリ。
フロントエンド（`v4/index.html`）＋ Supabase（DB）＋ GAS（LINE通知）の3層構成。

---

## 2. ファイル構成

```
/Users/murakamishoya/Projects/catch-sales-app/
├── v4/
│   ├── index.html      ← メインアプリ（全コードが1ファイル, 約1850行）
│   └── manifest.json   ← PWA設定
├── .claude/
│   └── launch.json     ← python3 -m http.server 5577 でローカル確認
└── HANDOFF.md          ← このファイル
```

ローカル確認: `python3 -m http.server 5577` → `http://localhost:5577/v4/`

---

## 3. 技術スタック

| 層 | 技術 |
|---|---|
| フロントエンド | React 18 + Babel standalone（CDN）、1ファイル完結 |
| DB | Supabase REST API |
| LINE通知 | Google Apps Script（GAS）+ LINE Messaging API |
| ホスティング | GitHub Pages |

---

## 4. Supabase

- URL: `https://jpjqdpzbaujxholvzlto.supabase.co`
- API Key (publishable): `sb_publishable_j6hImkmNd2S1zXHDfSo4iw_DCF5nL0c`

### テーブル

**`players`** — スタッフ情報
```
id, name, active(bool), monthly_goal(int), created_at
```

**`sales`** — 売上記録
```
id, date(YYYY-MM-DD), player(name), store(gochi/dosu/goro/uo),
amount(int), half_month_start(YYYY-MM-DD), created_at, updated_at
```

**`settings`** — キーバリュー設定
```
key, value(text), updated_at
```
現在使用中のキー:
- `team_monthly_goal` — チーム月目標（数値文字列）
- `off_days` — オフ日設定（JSON: `{ "playerId": ["YYYY-MM-DD", ...] }`）

---

## 5. Google Apps Script（GAS）

- プロジェクトID: `1q2cj-NkSQSduuvF0c6PQYCc5PEaciQji9pRBFBOd2wItLlOPy1uZVe7N`
- 編集URL: `https://script.google.com/home/projects/1q2cj-NkSQSduuvF0c6PQYCc5PEaciQji9pRBFBOd2wItLlOPy1uZVe7N/edit`

### Script Properties
| キー | 内容 |
|---|---|
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE Botのトークン |
| `LINE_GROUP_ID` | `Caee494aa699e6e6bfedba4bf0717bb6b`（岡山キャッチ重要事項） |
| `GEMINI_API_KEY` | Gemini API |

### 現在のトリガー
- 関数: `weeklyRankingNotification`
- スケジュール: 毎週月曜 9時〜10時

### GAS関数（末尾 ~966行付近に追加済み）
- `weeklyRankingNotification()` — トリガーから呼ばれるエントリポイント
- `sendWeeklyRankingNotification_()` — 実処理
- `getWeekSalesFromSB_(dateFrom, dateTo)` — Supabaseからデータ取得
- `getLastWeekRange_()` — 先週の月〜日の日付範囲を返す
- `setupWeeklyTrigger()` — トリガーを手動で再作成する用

---

## 6. LINE 通知

- 送信先グループ: **岡山キャッチ重要事項**（`Caee494aa699e6e6bfedba4bf0717bb6b`）
- API: `POST https://api.line.me/v2/bot/message/push`

---

## 7. このセッションで完了した作業

### ① 週ランキングLINE通知の復活
- GASに `weeklyRankingNotification` 系関数を新規追加
- 毎週月曜9時のトリガーを設定
- 集計対象: 月〜木・日（金・土除外）

### ② LINE送信先グループを変更
- 旧: 岡山キャッチ予約確認 → 新: **岡山キャッチ重要事項**
- `LINE_GROUP_ID` をScript Propertiesで更新済み

### ③ オフ日設定機能の追加（`v4/index.html`）
- **カレンダータブ**でプレイヤー選択 → 日付タップ → 「☽ オフ日にする」
- オフ日は `settings` テーブルの `off_days` キーに保存
- **今日のノルマ**（売上記録画面）がオフ日を除いた稼働日ベースで再計算
- **月末予測**（個人売上画面）もオフ日除外の稼働日ペースで再計算
- `workingDaysInRange(startStr, endStr, offDates[])` ヘルパー関数を追加

---

## 8. ⚠️ 未完了・要対応タスク

### 【重要】GASのLINE通知ロジックを「途中経過」に変更

**現状**: 毎週月曜に「先週の完了ランキング」を送信
**要望**: **毎日お昼頃に「今週（日曜始まり）の途中経過ランキング」を送信**

#### 必要な変更

1. **GAS関数の修正**

`getLastWeekRange_()` を廃止し、以下のロジックに変更:
```javascript
// 今週の日曜（週の起点）から今日までの範囲を返す
function getCurrentWeekRange_() {
  var now = new Date();
  var dow = now.getDay(); // 0=日, 1=月, ...
  var thisSunday = new Date(now.getTime() - dow * 86400000);
  var fmt = function(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth()+1).padStart(2,"0") + "-" +
      String(d.getDate()).padStart(2,"0");
  };
  return { start: fmt(thisSunday), end: fmt(now) };
}
```

2. **メッセージフォーマット変更**
```
📊 週ランキング（途中経過）
5/17(日)〜5/19(火)現在
（金土除く）

🥇 しょうや  ¥148,834
🥈 なお  ¥72,144
🥉 ゆめ  ¥67,047
```

3. **トリガー変更**: 週次（月曜）→ **日次（毎日12時）**
```javascript
function setupDailyTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) {
    if (t.getHandlerFunction() === 'dailyRankingNotification') ScriptApp.deleteTrigger(t);
    if (t.getHandlerFunction() === 'weeklyRankingNotification') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('dailyRankingNotification').timeBased().atHour(12).everyDays(1).create();
}
```

4. **関数名変更**: `weeklyRankingNotification` → `dailyRankingNotification`

---

## 9. アプリ画面構成

| タブ | コンポーネント | 概要 |
|---|---|---|
| 記録 | `ScreenRecord` | 日別売上入力、今日のノルマ表示 |
| ランキング | `ScreenRanking` | 週・月別ランキング、AI予測 |
| カレンダー | `ScreenCalendar` | 月カレンダー＋**オフ日設定**（今回追加） |
| 売上 | `ScreenPersonal` | 個人月次グラフ・目標進捗 |
| 設定 | `ScreenSettings` | ダークモード・個人月目標・CSVエクスポート |

---

## 10. 注意事項

- `v4/index.html` はBabel standaloneでブラウザ上でトランスパイルされるため、**ビルド不要**
- Supabaseのpublishable keyはフロントエンドに直書き（読み取り専用想定）
- GASエディタはMonacoベース。`getLineContent()` / `getValue()` はCORS制限でJS実行不可。コード挿入は `model.applyEdits()` を使う
- LINE_GROUP_IDは `doPost` 関数が自動更新する仕組みになっている（メッセージ受信時）
