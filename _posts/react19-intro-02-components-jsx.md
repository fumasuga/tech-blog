---
title: "React 19入門：コンポーネントとJSX"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T10:10:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Reactアプリケーションは、**コンポーネント**と呼ばれる独立した再利用可能な部品で構成されます。この記事では、コンポーネントの作成方法と、**JSX**という特殊な構文について、React公式ドキュメントに基づいて解説します。

## コンポーネントとは

コンポーネントは、UIの一部を表すJavaScript関数です。ボタンのように小さなものから、ページ全体のように大きなものまで、あらゆるサイズのコンポーネントを作成できます。

### コンポーネントの基本形

Reactコンポーネントは、マークアップ（JSX）を返すJavaScript関数です：

```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

この`MyButton`コンポーネントは、ボタン要素を返す関数です。

### コンポーネントの使用

コンポーネントを定義したら、他のコンポーネント内で使用できます：

```jsx
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

`<MyButton />`のように、コンポーネント名を大文字で始めることで、Reactコンポーネントとして認識されます。HTMLタグは小文字で始まります。

## JSXとは

JSX（JavaScript XML）は、JavaScriptの中にマークアップを記述できるようにするReactの拡張構文です。見た目はHTMLに似ていますが、実際にはJavaScriptの式として評価されます。

### JSXの基本ルール

1. **タグの閉じ方**: JSXはHTMLよりも厳格です。`<br />`のように、すべてのタグを閉じる必要があります。

2. **複数の要素**: コンポーネントは複数のJSX要素を返せません。共有の親要素（`<div>`や空の`<>...</>`フラグメント）で囲む必要があります：

```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

3. **属性名**: HTMLの`class`は`className`、`for`は`htmlFor`のように、JavaScriptの予約語と衝突しない名前を使用します。

### JSXでのスタイル指定

JSXでは、`className`属性でCSSクラスを指定します：

```jsx
<img className="avatar" />
```

インラインスタイルを指定する場合は、オブジェクト形式で記述します：

```jsx
<img 
  className="avatar"
  style={{
    width: user.imageSize,
    height: user.imageSize
  }}
/>
```

`style={{}}`は特殊な構文ではなく、通常のJavaScriptオブジェクトです。外側の`{}`はJSXの式、内側の`{}`はJavaScriptオブジェクトを表します。

## コンポーネントのネスト

コンポーネントは、他のコンポーネントの中に配置（ネスト）できます：

```jsx
function Header() {
  return <h1>My App</h1>;
}

function Navigation() {
  return <nav>Navigation</nav>;
}

function Footer() {
  return <footer>Footer</footer>;
}

export default function App() {
  return (
    <div>
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
}
```

このように、コンポーネントを組み合わせることで、複雑なUIを構築できます。

## コンポーネントの命名規則

- **コンポーネント名**: 大文字で始める（例：`MyButton`、`Header`）
- **HTMLタグ**: 小文字で始める（例：`<div>`、`<button>`）

この規則により、ReactはコンポーネントとHTMLタグを区別できます。

## 実践例：プロフィールカード

コンポーネントとJSXを使って、プロフィールカードを作成してみましょう：

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

この例では：
- `user`オブジェクトにデータを格納
- JSXの`{}`内でJavaScript式を使用（`{user.name}`、`{user.imageUrl}`など）
- `className`でCSSクラスを指定
- `style`属性でインラインスタイルを指定

## まとめ

- **コンポーネント**: UIを独立した再利用可能な部品に分割するReactの基本単位
- **JSX**: JavaScriptの中にマークアップを記述する構文
- **コンポーネントのネスト**: コンポーネントを組み合わせて複雑なUIを構築
- **命名規則**: コンポーネント名は大文字で始める

次の記事では、Propsを使ってコンポーネント間でデータを渡す方法について解説します。

## 参考リンク

- [React公式ドキュメント - コンポーネント](https://react.dev/learn/your-first-component)
- [React公式ドキュメント - JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React公式ドキュメント - コンポーネントのネスト](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)

