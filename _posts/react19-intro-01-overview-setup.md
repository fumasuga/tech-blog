---
title: "React 19入門：概要とセットアップ"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T10:00:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

React 19は、Meta（旧Facebook）が開発するユーザーインターフェース構築のためのJavaScriptライブラリの最新バージョンです。この記事では、React 19の概要と、開発環境のセットアップ方法について解説します。

## Reactとは

Reactは、ユーザーインターフェース（UI）を構築するためのJavaScriptライブラリです。以下の特徴があります：

- **コンポーネントベース**: UIを独立した再利用可能な部品（コンポーネント）に分割
- **宣言的**: データの状態に基づいてUIを記述し、Reactが自動的に更新を処理
- **効率的**: 仮想DOM（Virtual DOM）により、必要な部分のみを更新
- **柔軟**: 既存のプロジェクトに段階的に導入可能

## React 19の主な新機能

React 19では、以下のような新機能と改善が追加されました：

### React Server Components

サーバー側でコンポーネントをレンダリングできるようになり、初期ロード時間の短縮とバンドルサイズの削減が可能になりました。

### Actions

フォーム送信などの非同期処理を簡潔に記述できる新しいAPIです。`useActionState`や`useFormStatus`などのフックが追加されました。

### 改善されたHooks

既存のHooksが改善され、より直感的で使いやすくなりました。また、`use`フックが正式に追加され、PromiseやContextを直接扱えるようになりました。

### パフォーマンスの向上

コンパイラの最適化により、不要な再レンダリングが削減され、アプリケーションのパフォーマンスが向上しました。

## 開発環境のセットアップ

Reactアプリケーションを始めるには、いくつかの方法があります。

### 方法1: Create React App（推奨されていない）

従来は`create-react-app`が使われていましたが、現在は推奨されていません。

### 方法2: Vite（推奨）

Viteは高速なビルドツールで、Reactアプリケーションの作成に最適です。

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

### 方法3: Next.js

フルスタックのReactフレームワークです。サーバーサイドレンダリング（SSR）や静的サイト生成（SSG）が可能です。

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### 方法4: CodeSandboxやStackBlitz（オンライン）

ブラウザ上でReactアプリケーションを開発できます。環境構築不要で、すぐに始められます。

- [CodeSandbox](https://codesandbox.io/)
- [StackBlitz](https://stackblitz.com/)

## 最小限のReactアプリケーション

セットアップが完了したら、最小限のReactアプリケーションを作成してみましょう。

```jsx
function App() {
  return (
    <div>
      <h1>Hello, React 19!</h1>
      <p>Welcome to React 19</p>
    </div>
  );
}

export default App;
```

このコードは、シンプルな見出しと段落を表示するコンポーネントです。

## 必要な前提知識

Reactを学ぶ前に、以下の知識があると役立ちます：

- **HTML/CSS**: 基本的なマークアップとスタイリング
- **JavaScript**: ES6以降の構文（アロー関数、分割代入、テンプレートリテラルなど）
- **Node.jsとnpm**: パッケージ管理とコマンドラインツール

## 次のステップ

環境が整ったら、次は以下のトピックを学びましょう：

1. **コンポーネントとJSX**: UIを部品として分割する方法
2. **Props**: コンポーネント間でデータを渡す方法
3. **状態管理**: 動的なUIを実現する方法
4. **イベントハンドリング**: ユーザー操作に応答する方法

## まとめ

- React 19は、最新の機能と改善を含むUI構築ライブラリ
- ViteやNext.jsなどのモダンなツールで開発環境を構築
- コンポーネントベースのアーキテクチャで再利用可能なUIを構築
- React Server ComponentsやActionsなどの新機能により、より効率的な開発が可能

次の記事では、コンポーネントとJSXの基本について詳しく解説します。

## 参考リンク

- [React公式ドキュメント](https://react.dev/)
- [React 19の新機能](https://react.dev/blog/2024/04/25/react-19)
- [Reactのインストール方法](https://react.dev/learn/installation)
- [Vite公式サイト](https://vitejs.dev/)
- [Next.js公式サイト](https://nextjs.org/)

