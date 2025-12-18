# 鉄道運行情報デジタルサイネージ

鉄道の運行状況をリアルタイムで表示するデジタルサイネージアプリケーションです。路線図と運行状況、振替輸送情報を視覚的にわかりやすく表示します。

> **⚠️ 免責事項**  
> このアプリケーションは鉄道会社非公式のサンプルアプリケーションです。実際の運行情報を提供するものではありません。

## 🎤 イベント情報

このアプリケーションは、国土交通省主催のイベント「[LINKS:POWER of DATA x DATA 2025](https://asciistartup.connpass.com/event/377258/)」のライトニングトークのために作成されたデモンストレーション用サンプルアプリケーションです。

## 主な機能

- 🗺️ **インタラクティブな路線図表示**  
  Deck.GLとMapLibreを使用した滑らかな地図表示
  
- 🚃 **運行状況の表示**  
  遅延・運休などの運行情報を日本語・英語で表示
  
- 🔄 **振替輸送情報**  
  東京メトロ、都営地下鉄、私鉄の振替路線を表示
  
- 📰 **スクロール速報**  
  画面下部にマーキー形式で最新情報を表示
  
- 📱 **レスポンシブデザイン**  
  モバイル表示時は運行情報・振替輸送情報をFABボタンでトグル表示
  - ハンバーガー/バツアイコンがスムーズにモーフィング
  - サイドバーとフッターがスライドアニメーションで表示/非表示

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **地図ライブラリ**: 
  - Deck.GL 9.2.5
  - MapLibre GL 5.15.0
  - react-map-gl 8.1.0
- **アニメーション**: @react-spring/web
- **スタイリング**: Tailwind CSS 4
- **UI コンポーネント**: 
  - react-fast-marquee

## セットアップ

### 必要要件

- Node.js 20以上
- npm / yarn / pnpm / bun

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを表示します。

### ビルド

```bash
npm run build
npm start
```

## プロジェクト構成

```
signage/
├── app/
│   ├── page.tsx           # メインページ
│   ├── layout.tsx         # レイアウト
│   ├── globals.css        # グローバルスタイル
│   ├── components/
│   │   ├── map.tsx        # マップコンポーネント
│   │   └── fab.tsx        # FAB（フローティングアクションボタン）
│   ├── data/
│   │   ├── jy.json        # 山手線駅データ
│   │   └── jk.json        # 京浜東北線駅データ
│   └── hooks/             # カスタムフック
├── public/                # 静的ファイル
└── package.json
```

## データ形式

路線の駅データは `app/data/jy.json` と `app/data/jk.json` に以下の形式で格納されています：

```json
[
  {
    "name": "駅名",
    "coordinates": [経度, 緯度]
  }
]
```

> **📝 注意**  
> `jy.json` と `jk.json` はライセンスの関係でリポジトリにプッシュしていません。

### ローカル開発時のデータ設定

ローカル開発時は、`app/data/` ディレクトリに直接 `jy.json` と `jk.json` を配置してください。

## デプロイ

### Vercelへのデプロイ

Vercel でのデプロイが推奨されます：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### 環境変数の設定

Vercelでビルドする際は、以下の環境変数を設定してください：

1. **`JY_JSON_DATA`**: 山手線の駅データ（JSON形式）
   ```json
   [{"name":"品川","coordinates":[139.74,35.63]},{"name":"大崎","coordinates":[139.73,35.62]}]
   ```

2. **`JK_JSON_DATA`**: 京浜東北線の駅データ（JSON形式）
   ```json
   [{"name":"東京","coordinates":[139.77,35.68]},{"name":"有楽町","coordinates":[139.76,35.67]}]
   ```

**設定手順:**
1. Vercelダッシュボードでプロジェクトを開く
2. `Settings` > `Environment Variables` に移動
3. 上記の環境変数を追加
4. 再デプロイ

詳細は [VERCEL_ENV.md](VERCEL_ENV.md) を参照してください。

### その他のプラットフォーム

その他のプラットフォームについては [Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## ライセンス

Private

## 開発

このプロジェクトは [Next.js](https://nextjs.org) で構築されています。詳細は以下を参照してください：

- [Next.js Documentation](https://nextjs.org/docs)
- [Deck.GL Documentation](https://deck.gl)
- [MapLibre Documentation](https://maplibre.org)
