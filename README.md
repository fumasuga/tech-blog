# SugaStack. - Tech Blog

Next.js 15とReact 19を使用した、Zennマークダウン対応の静的生成ブログです。

## 特徴

- **Next.js 15** - App Routerを使用した最新のNext.js
- **React 19** - 最新のReact機能を活用
- **TypeScript** - 型安全性を確保
- **Zennマークダウン** - Zennの記法（メッセージボックス、コードブロック、脚注など）に対応
- **静的エクスポート** - `output: "export"`による完全な静的サイト生成
- **ページング機能** - クライアントサイドでのページング実装
- **Tailwind CSS** - モダンなスタイリング
- **Docker環境** - 開発環境の統一

## 技術スタック

- **フレームワーク**: Next.js 15.0.2
- **UIライブラリ**: React 19.0.0-rc
- **言語**: TypeScript 5.5.2
- **スタイリング**: Tailwind CSS 3.4.4
- **マークダウン処理**: 
  - `zenn-markdown-html` - ZennマークダウンのHTML変換
  - `zenn-content-css` - Zennスタイルの適用
  - `zenn-embed-elements` - 埋め込み要素のサポート
  - `gray-matter` - フロントマターの解析
- **日付処理**: date-fns 3.6.0

## セットアップ

### 前提条件

- Node.js 20以上
- Docker と Docker Compose（推奨）
- Yarn または npm

### ローカル環境での開発

#### Dockerを使用する場合（推奨）

1. リポジトリをクローン
```bash
git clone <repository-url>
cd tech-blog
```

2. Docker Composeで開発サーバーを起動
```bash
docker-compose up
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

#### ローカルで直接実行する場合

1. 依存関係をインストール
```bash
yarn install
# または
npm install
```

2. 開発サーバーを起動
```bash
yarn dev
# または
npm run dev
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## ブログ投稿の追加

ブログ投稿は `/_posts` ディレクトリにMarkdownファイルとして追加します。

### ファイル形式

```markdown
---
title: "投稿タイトル"
coverImage: "/assets/blog/example/cover.jpg"
date: "2025-01-01T00:00:00.000Z"
ogImage:
  url: "/assets/blog/example/cover.jpg"
---

投稿の本文をここに記述します。Zennの記法が使用できます。
```

### Zennマークダウンの使用

このブログはZennマークダウンに対応しています。以下の機能が使用できます：

- メッセージボックス（info, alert, warning, error）
- ファイル名付きコードブロック
- 脚注
- 埋め込み要素（YouTubeなど）

詳細は `_posts/add-zenn-markdown.md` を参照してください。

## ビルドとデプロイ

### 静的サイトのビルド

```bash
yarn build
# または
npm run build
```

ビルドされたファイルは `out/` ディレクトリに出力されます。

### Firebase Hostingへのデプロイ

このプロジェクトはFirebase Hostingへのデプロイに対応しています。

1. Firebase CLIでログイン
```bash
firebase login
```

2. Firebaseプロジェクトを初期化
```bash
firebase init
```

3. デプロイ
```bash
firebase deploy
```

詳細な手順は `_posts/how-to-build.md` を参照してください。

## プロジェクト構造

```
tech-blog/
├── _posts/              # ブログ投稿（Markdownファイル）
├── public/              # 静的ファイル
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── _components/ # コンポーネント
│   │   ├── posts/       # 投稿詳細ページ
│   │   ├── layout.tsx   # ルートレイアウト
│   │   └── page.tsx     # トップページ
│   ├── interfaces/      # TypeScript型定義
│   └── lib/             # ユーティリティ関数
├── Dockerfile           # Dockerイメージ定義
├── docker-compose.yml   # Docker Compose設定
├── next.config.js       # Next.js設定
└── package.json         # 依存関係
```

## 主要な機能

### ページング

トップページでは投稿一覧がページング機能付きで表示されます。クライアントサイドで実装されており、URLパラメータ `?page=2` でページを切り替えられます。

### メタデータ

各投稿ページには適切なメタデータ（OGP、Twitterカード）が設定されています。

### ダークモード

Tailwind CSSのダークモードに対応しています。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Zenn Editor](https://github.com/zenn-dev/zenn-editor)
- [Tailwind CSS](https://tailwindcss.com)
