---
title: "Zennマークダウンを使う"
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2025-08-08T09:59:00.322Z"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

Zenn特有の記法（メッセージボックス、ファイル名付きコードブロック、脚注など）を使うと、記事の表現力がぐっと上がります。数ステップで、Zennと同様に見やすく美しい記事を公開できるブログになります。

始める前に、以下を確認してください。
* Node.js と npm/Yarn が開発環境にインストールされていること
* Next.js 製のブログプロジェクトがあること
* JavaScript / TypeScript の基本的な読み書きができること

## 必要パッケージのインストール
まず、Zenn Markdown を HTML に変換し、スタイルを適用するためのパッケージをインストールします。Zenn 公式の zenn-markdown-html と、スタイル適用用の zenn-content-css、YouTube などの埋め込みを扱う zenn-embed-elements を使います。

Next.js プロジェクトのルートで、以下を実行してください:
```bash
npm install zenn-markdown-html zenn-content-css zenn-embed-elements
# Or yarn add zenn-markdown-html zenn-content-css zenn-embed-elements
```
## Modify markdownToHtml.ts
次に、lib ディレクトリの markdownToHtml.ts を修正し、Markdown を HTML に変換する関数を定義します。

```ts:li/markdownToHtml.ts
import m2h from "zenn-markdown-html";

export default async function markdownToHtml(markdown: string) {
  return m2h(markdown)
}
```
このファイルでは、インポートした zennMarkdownToHtml 関数をそのまま使うだけで、複雑な設定なしに Zenn Markdown を変換できます。内部では unified や remark/rehype の各種プラグイン（ハイライトや外部リンク処理など）をまとめて扱ってくれるため、シンプルなコードで Zenn 風のレンダリングを実現できます。

## Next.js ページでの利用
最後に、Next.js のページ（またはコンポーネント）で markdownToHtml を呼び出して、Markdown コンテンツを描画します。典型的なブログでは、記事データを取得するタイミングでこの変換を行います。

例えばブログ記事の詳細ページで、getStaticProps（あるいは getServerSideProps）内で Markdown を読み込み、markdownToHtml で HTML に変換し、その結果をコンポーネントへ props で渡して dangerouslySetInnerHTML で描画する、という流れです。

```tsx:posts/[slug].tsx (Example)
import markdownToHtml from "@/lib/markdownToHtml";

{/* ... Other content ... */}

  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

```

```tsx:_components/post-body.tsx (Example)
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto mt-16 znc">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
```

## 注意点

`dangerouslySetInnerHTML` を使う場合は、信頼できるソースからの HTML のみに限定してください。ユーザー入力など信頼できないコンテンツには使用しないでください。

Zenn Markdown をきれいに表示するには zenn-content-css の適用が必要です。通常は Next.js のグローバル CSS（例: styles/globals.css）で `@import 'zenn-content-css';` を記述するか、必要な Zenn の CSS をプロジェクトに取り込みます。

記事内で Zenn 独自の埋め込み要素（例: YouTube 埋め込み）を使う場合は zenn-embed-elements を有効にします。CDN から読み込むか、Next.js では `next/script` で遅延読み込みする方法が一般的です。

Tailwind CSS を併用しているなら、@tailwindcss/typography プラグインの利用も検討してください。基本的な HTML のタイポグラフィを整えつつ、Zenn 独自要素へのカスタムスタイルも適用しやすくなります。

----
ここまでで、zenn-markdown-html / zenn-content-css / zenn-embed-elements を導入し、markdownToHtml.ts を用意してページで使う手順をまとめました。これであなたの Next.js ブログも Zenn のようにリッチな Markdown を表現できます。
Github:[Zenn-editor](https://github.com/zenn-dev/zenn-editor)