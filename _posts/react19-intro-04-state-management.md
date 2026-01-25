---
title: "React 19：状態管理（useState）"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T10:30:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

コンポーネントが「記憶」を持ち、ユーザーの操作に応じて画面を更新するには、**状態（state）**が必要です。この記事では、Reactの`useState`フックを使った状態管理について、React公式ドキュメントに基づいて解説します。

## 状態（State）とは

状態は、コンポーネントが「記憶」する情報です。例えば、ボタンがクリックされた回数や、入力フィールドの値などです。状態が変更されると、Reactは自動的にコンポーネントを再レンダリングし、画面を更新します。

## useStateフック

`useState`は、Reactが提供する組み込みフック（Hook）です。コンポーネントに状態を追加するために使用します。

### 基本的な使い方

まず、`useState`をReactからインポートします：

```jsx
import { useState } from 'react';
```

次に、コンポーネント内で状態を宣言します：

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
}
```

`useState`は2つの値を返します：
- **現在の状態値**（`count`）
- **状態を更新する関数**（`setCount`）

慣習として、`[something, setSomething]`という命名規則を使用します。

### 状態の更新

状態を更新するには、更新関数を呼び出します：

```jsx
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

ボタンをクリックするたびに、`setCount(count + 1)`が呼び出され、`count`の値が1増加します。Reactは状態の変更を検知し、コンポーネントを再レンダリングして、新しい`count`値を表示します。

## 複数のコンポーネントと状態

同じコンポーネントを複数回使用すると、それぞれが独立した状態を持ちます：

```jsx
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

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

各`MyButton`コンポーネントは、独自の`count`状態を持ちます。1つのボタンをクリックしても、他のボタンの状態には影響しません。

## 状態の更新方法

### 関数形式の更新

状態の更新が前の状態に依存する場合、関数形式を使用します：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // 関数形式を使用
    setCount(count + 1); // または
    setCount(c => c + 1); // より安全
  }

  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}
```

複数回の更新を連続して行う場合、関数形式が推奨されます：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // 関数形式を使用することで、前の状態を確実に参照
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    // countは3増加する
  }

  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}
```

### オブジェクトと配列の更新

オブジェクトや配列の状態を更新する場合、新しいオブジェクトや配列を作成する必要があります：

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  function handleNameChange(e) {
    // 新しいオブジェクトを作成
    setFormData({
      ...formData,
      name: e.target.value
    });
  }

  return (
    <form>
      <input
        value={formData.name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={e => setFormData({
          ...formData,
          email: e.target.value
        })}
        placeholder="Email"
      />
    </form>
  );
}
```

## 複数の状態変数

1つのコンポーネントで複数の状態変数を使用できます：

```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={e => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

## Hooksのルール

Hooksには、以下のルールがあります：

1. **トップレベルでのみ呼び出す**: 条件分岐やループの中でHooksを呼び出してはいけません
2. **React関数でのみ呼び出す**: 通常のJavaScript関数ではなく、Reactコンポーネントまたはカスタムフック内でのみ使用

```jsx
// ❌ 間違い：条件分岐内でHooksを呼び出している
function MyComponent() {
  if (condition) {
    const [count, setCount] = useState(0); // エラー！
  }
  // ...
}

// ✅ 正しい：トップレベルでHooksを呼び出す
function MyComponent() {
  const [count, setCount] = useState(0);
  
  if (condition) {
    // 条件分岐はOK
  }
  // ...
}
```

## まとめ

- **状態（State）**: コンポーネントが「記憶」する情報
- **useState**: 状態を追加するためのフック
- **状態の更新**: `setCount`などの更新関数を使用
- **関数形式の更新**: 前の状態に依存する更新には関数形式を使用
- **Hooksのルール**: トップレベルでのみ呼び出し、React関数内でのみ使用

次の記事では、イベントハンドリングについて詳しく解説します。

## 参考リンク

- [React公式ドキュメント - 状態管理](https://react.dev/learn/state-a-components-memory)
- [React公式ドキュメント - useState](https://react.dev/reference/react/useState)
- [React公式ドキュメント - 状態の更新](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React公式ドキュメント - Hooksのルール](https://react.dev/reference/rules/rules-of-hooks)

