---
title: "React 19：イベントハンドリング"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T10:40:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

ユーザーの操作（クリック、入力など）に応答するには、**イベントハンドラー**を設定する必要があります。この記事では、Reactでのイベント処理の方法について、React公式ドキュメントに基づいて解説します。

## イベントハンドラーとは

イベントハンドラーは、ユーザーの操作（クリック、ホバー、フォーカスなど）に応答する関数です。Reactでは、JSX要素の属性としてイベントハンドラーを渡します。

### 基本的なイベントハンドラー

```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

`onClick={handleClick}`に注意してください。`handleClick`の後に括弧`()`を付けていません。イベントハンドラー関数を**呼び出す**のではなく、**渡す**必要があります。Reactがユーザーがボタンをクリックしたときに、この関数を呼び出します。

### インラインでの定義

イベントハンドラーは、インラインで定義することもできます：

```jsx
function MyButton() {
  return (
    <button onClick={() => alert('You clicked me!')}>
      Click me
    </button>
  );
}
```

## イベントオブジェクト

イベントハンドラーは、イベントオブジェクトを引数として受け取れます：

```jsx
function MyButton() {
  function handleClick(e) {
    e.preventDefault(); // デフォルトの動作を防ぐ
    console.log('Button clicked!', e);
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

## 状態更新と組み合わせる

イベントハンドラーは、状態の更新と組み合わせて使用することが多いです：

```jsx
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

## フォームのイベント処理

フォームの入力値を処理する場合、`onChange`イベントを使用します：

```jsx
import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('Submitted: ' + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## イベントの伝播

イベントは、DOMツリーを上に向かって伝播（バブリング）します。親要素のイベントを防ぐには、`stopPropagation`を使用します：

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => alert('Toolbar clicked!')}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
    </div>
  );
}
```

この例では、ボタンをクリックしても、親要素の`Toolbar`のクリックイベントは発火しません。

## イベントハンドラーの命名規則

イベントハンドラーには、`handle`で始まる名前を付けるのが慣習です：

- `handleClick`
- `handleSubmit`
- `handleChange`
- `handleMouseEnter`

## 複数のイベントハンドラー

1つの要素に複数のイベントハンドラーを設定できます：

```jsx
function MyInput() {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleFocus() {
    console.log('Input focused');
  }

  function handleBlur() {
    console.log('Input blurred');
  }

  return (
    <input
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Type something"
    />
  );
}
```

## カスタムイベント

Propsとして関数を渡すことで、カスタムイベントを実装できます：

```jsx
function Button({ onCustomClick, children }) {
  return (
    <button onClick={() => onCustomClick('Button was clicked!')}>
      {children}
    </button>
  );
}

function App() {
  function handleCustomEvent(message) {
    alert(message);
  }

  return (
    <Button onCustomClick={handleCustomEvent}>
      Click me
    </Button>
  );
}
```

## まとめ

- **イベントハンドラー**: ユーザーの操作に応答する関数
- **関数の渡し方**: 関数を呼び出すのではなく、渡す（`onClick={handleClick}`）
- **イベントオブジェクト**: イベントに関する情報を含むオブジェクト
- **状態との組み合わせ**: イベントハンドラーで状態を更新
- **イベントの伝播**: `stopPropagation`で伝播を防ぐ

次の記事では、条件付きレンダリングとリストの表示について詳しく解説します。

## 参考リンク

- [React公式ドキュメント - イベントへの応答](https://react.dev/learn/responding-to-events)
- [React公式ドキュメント - イベントハンドラー](https://react.dev/learn/responding-to-events#adding-event-handlers)
- [React公式ドキュメント - イベントの伝播](https://react.dev/learn/responding-to-events#event-propagation)

