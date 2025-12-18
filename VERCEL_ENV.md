# Vercel環境変数設定

Vercelでビルドする際に、以下の環境変数を設定してください：

## JY_JSON_DATA

山手線の駅データをJSON形式で設定します。

```json
[{"name":"品川","coordinates":[139.74,35.63]},{"name":"大崎","coordinates":[139.73,35.62]}...]
```

## JK_JSON_DATA

京浜東北線の駅データをJSON形式で設定します。

```json
[{"name":"東京","coordinates":[139.77,35.68]},{"name":"有楽町","coordinates":[139.76,35.67]}...]
```

## 設定方法

1. Vercelダッシュボードでプロジェクトを開く
2. Settings > Environment Variables に移動
3. 各環境変数を追加
4. 再デプロイ

## ローカル開発

ローカルでビルドする場合は、`.env.local`ファイルに環境変数を設定するか、直接`app/data/`ディレクトリにjy.jsonとjk.jsonを配置してください。
