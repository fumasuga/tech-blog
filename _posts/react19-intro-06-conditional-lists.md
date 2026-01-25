---
title: "React 19：条件付きレンダリングとリスト"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T10:50:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

条件に応じて異なるコンテンツを表示したり、データのリストを表示したりすることは、Reactアプリケーションでよく行われる操作です。この記事では、条件付きレンダリングとリストの表示方法について、React公式ドキュメントに基づいて解説します。

## 条件付きレンダリング

Reactでは、条件に応じて異なるJSXを表示するために、JavaScriptの`if`文、三項演算子、論理AND演算子（`&&`）を使用します。

### if文を使った条件分岐

```jsx
function Greeting({ isLoggedIn }) {
  let content;
  
  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }

  return (
    <div>
      {content}
    </div>
  );
}
```

### 三項演算子（? :）

より簡潔に記述するには、三項演算子を使用します：

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <AdminPanel />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
```

### 論理AND演算子（&&）

`else`分岐が不要な場合、論理AND演算子を使用できます：

```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      )}
    </div>
  );
}
```

この例では、`unreadMessages.length > 0`が`true`の場合のみ、メッセージ数を表示します。

### 早期リターン

コンポーネントの最初で条件分岐する場合、早期リターンを使用できます：

```jsx
function ItemList({ items }) {
  if (items.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## リストのレンダリング

配列データをリストとして表示するには、JavaScriptの`map()`メソッドを使用します。

### 基本的なリスト表示

```jsx
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

function ShoppingList() {
  const listItems = products.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

### keyプロパティ

リストの各要素には、`key`プロパティを指定する必要があります。`key`は、各要素を一意に識別するための文字列または数値です。通常、データのIDを使用します：

```jsx
function ProductList({ products }) {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.title}
        </li>
      ))}
    </ul>
  );
}
```

**重要**: `key`は、リストの順序が変わる可能性がある場合は、配列のインデックスではなく、一意のIDを使用してください。

### インラインでのmap

`map()`は、JSX内で直接使用できます：

```jsx
function ShoppingList() {
  const products = [
    { title: 'Cabbage', isFruit: false, id: 1 },
    { title: 'Garlic', isFruit: false, id: 2 },
    { title: 'Apple', isFruit: true, id: 3 },
  ];

  return (
    <ul>
      {products.map(product => (
        <li
          key={product.id}
          style={{
            color: product.isFruit ? 'magenta' : 'darkgreen'
          }}
        >
          {product.title}
        </li>
      ))}
    </ul>
  );
}
```

### フィルタリングとリスト

条件に応じてリストをフィルタリングできます：

```jsx
function ProductList({ products }) {
  const fruits = products.filter(product => product.isFruit);

  return (
    <ul>
      {fruits.map(product => (
        <li key={product.id}>
          {product.title}
        </li>
      ))}
    </ul>
  );
}
```

## 条件付きレンダリングとリストの組み合わせ

条件付きレンダリングとリストを組み合わせて使用できます：

```jsx
function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p>No todos yet.</p>;
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.completed ? (
            <span style={{ textDecoration: 'line-through' }}>
              {todo.text}
            </span>
          ) : (
            <span>{todo.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
```

## ネストされたリスト

リストの中にリストを表示することもできます：

```jsx
function Blog({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <ul>
            {post.tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
```

## まとめ

- **条件付きレンダリング**: `if`文、三項演算子、`&&`演算子を使用
- **リストのレンダリング**: `map()`メソッドで配列をJSX要素に変換
- **keyプロパティ**: リストの各要素に一意の`key`を指定
- **組み合わせ**: 条件付きレンダリングとリストを組み合わせて使用

次の記事では、コンポーネント間でのデータ共有について詳しく解説します。

## 参考リンク

- [React公式ドキュメント - 条件付きレンダリング](https://react.dev/learn/conditional-rendering)
- [React公式ドキュメント - リストのレンダリング](https://react.dev/learn/rendering-lists)
- [React公式ドキュメント - keyプロパティ](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

