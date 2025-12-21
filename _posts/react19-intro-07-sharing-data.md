---
title: "React 19入門：コンポーネント間でのデータ共有"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T11:00:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

複数のコンポーネントで同じデータを共有し、同期して更新するには、状態を共通の親コンポーネントに「持ち上げる（lift up）」必要があります。この記事では、コンポーネント間でのデータ共有方法について、React公式ドキュメントに基づいて解説します。

## 状態の持ち上げ（Lifting State Up）

複数のコンポーネントが同じデータを表示し、常に同期して更新する必要がある場合、状態を共通の親コンポーネントに移動します。これを「状態の持ち上げ」と呼びます。

### 問題：独立した状態

以下の例では、各`MyButton`コンポーネントが独自の`count`状態を持っています：

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

この場合、各ボタンは独立してカウントを保持します。

### 解決：状態を親に移動

状態を親コンポーネントに移動し、Propsとして子コンポーネントに渡します：

```jsx
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

これで、どちらのボタンをクリックしても、両方のボタンのカウントが同期して更新されます。

## Propsの受け渡し

親コンポーネントから子コンポーネントにデータを渡すには、Propsを使用します：

```jsx
function Parent() {
  const [value, setValue] = useState('');

  return (
    <div>
      <Child
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

function Child({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
```

## 複数レベルのPropsの受け渡し

Propsは、複数のコンポーネントレベルを通過できます：

```jsx
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <Page theme={theme} onThemeChange={setTheme} />
  );
}

function Page({ theme, onThemeChange }) {
  return (
    <div>
      <Header theme={theme} />
      <Content theme={theme} />
      <ThemeToggle onThemeChange={onThemeChange} />
    </div>
  );
}

function Header({ theme }) {
  return <header className={theme}>Header</header>;
}

function Content({ theme }) {
  return <main className={theme}>Content</main>;
}

function ThemeToggle({ onThemeChange }) {
  return (
    <button onClick={() => onThemeChange('dark')}>
      Toggle Theme
    </button>
  );
}
```

## Context API（高度な方法）

多くのコンポーネントレベルで同じデータを共有する場合、Context APIを使用できます。これは、Propsの受け渡しを簡素化します：

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  return (
    <div>
      <Header />
      <Content />
      <ThemeToggle />
    </div>
  );
}

function Header() {
  const { theme } = useContext(ThemeContext);
  return <header className={theme}>Header</header>;
}

function Content() {
  const { theme } = useContext(ThemeContext);
  return <main className={theme}>Content</main>;
}

function ThemeToggle() {
  const { setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme('dark')}>
      Toggle Theme
    </button>
  );
}
```

## 状態の持ち上げの判断基準

状態をどこに配置すべきか判断するには、以下の質問を考えてください：

1. **この状態は複数のコンポーネントで使用されますか？**
   - はい → 共通の親コンポーネントに配置
   - いいえ → そのコンポーネント内に配置

2. **この状態は、他のコンポーネントの状態に依存しますか？**
   - はい → 共通の親コンポーネントに配置
   - いいえ → そのコンポーネント内に配置

## 実践例：検索フィルター

検索フィルターの例を見てみましょう：

```jsx
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const items = ['Apple', 'Banana', 'Cherry', 'Date'];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <ItemList items={filteredItems} />
    </div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
}

function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

この例では、`searchTerm`状態を`App`コンポーネントに配置し、`SearchInput`と`ItemList`の両方で使用しています。

## まとめ

- **状態の持ち上げ**: 複数のコンポーネントで共有する状態は、共通の親コンポーネントに配置
- **Propsの受け渡し**: 親から子コンポーネントにデータと関数を渡す
- **Context API**: 多くのレベルでデータを共有する場合の代替手段
- **判断基準**: 状態が複数のコンポーネントで使用されるかどうかで判断

これで、React 19の基本的な概念を一通り学びました。これらの概念を組み合わせて、より複雑なアプリケーションを構築していきましょう。

## 参考リンク

- [React公式ドキュメント - コンポーネント間でのデータ共有](https://react.dev/learn/sharing-state-between-components)
- [React公式ドキュメント - 状態の持ち上げ](https://react.dev/learn/sharing-state-between-components#lifting-state-up-by-example)
- [React公式ドキュメント - Context API](https://react.dev/reference/react/useContext)
- [React公式ドキュメント - チュートリアル](https://react.dev/learn/tutorial-tic-tac-toe)

