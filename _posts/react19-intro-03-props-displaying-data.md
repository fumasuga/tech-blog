---
title: "React 19入門：Propsとデータの表示"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-21T10:20:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

コンポーネントにデータを渡して表示するには、**Props（プロパティ）**を使用します。この記事では、Propsの使い方と、JSXでデータを表示する方法について、React公式ドキュメントに基づいて解説します。

## Propsとは

Propsは、親コンポーネントから子コンポーネントにデータを渡すための仕組みです。関数の引数のようなもので、コンポーネントを再利用可能にする重要な機能です。

### Propsの受け取り方

コンポーネントは、関数の引数としてPropsを受け取ります：

```jsx
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

この`Avatar`コンポーネントは、`person`と`size`という2つのPropsを受け取ります。

### Propsの渡し方

親コンポーネントから子コンポーネントにPropsを渡すには、属性のように記述します：

```jsx
export default function Profile() {
  return (
    <div>
      <Avatar
        person={{ name: 'Lin Lanying', imageUrl: 'https://i.imgur.com/1bX5QH6.jpg' }}
        size={100}
      />
      <Avatar
        person={{ name: 'Katsuko Saruhashi', imageUrl: 'https://i.imgur.com/YfeOqp2.jpg' }}
        size={80}
      />
    </div>
  );
}
```

## JSXでのデータ表示

JSXでは、中括弧`{}`を使ってJavaScriptの式を埋め込めます。これにより、変数や計算結果を表示できます。

### 基本的なデータ表示

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

`{user.name}`のように、中括弧内でJavaScriptの変数や式を記述できます。

### 属性での式の使用

JSXの属性でも、中括弧を使ってJavaScript式を使用できます。引用符の代わりに中括弧を使うことに注意してください：

```jsx
// ❌ 間違い：引用符は文字列として扱われる
<img src="user.imageUrl" />

// ✅ 正しい：中括弧でJavaScript式を使用
<img src={user.imageUrl} />
```

### 複雑な式の使用

中括弧内では、より複雑な式も使用できます：

```jsx
const user = {
  firstName: 'Hedy',
  lastName: 'Lamarr'
};

export default function Profile() {
  return (
    <h1>
      {user.firstName} {user.lastName}
    </h1>
  );
}
```

## Propsのデフォルト値

Propsにデフォルト値を設定できます：

```jsx
function Avatar({ person, size = 100 }) {
  return (
    <img
      className="avatar"
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

`size`が渡されない場合、デフォルト値の`100`が使用されます。

## スプレッド構文でのPropsの渡し方

オブジェクトのすべてのプロパティをPropsとして渡す場合、スプレッド構文を使用できます：

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}

// スプレッド構文を使用
function App() {
  return (
    <Profile
      {...{
        person: { name: 'Lin Lanying', imageUrl: 'https://i.imgur.com/1bX5QH6.jpg' },
        size: 100,
        isSepia: true,
        thickBorder: true
      }}
    />
  );
}
```

## 子要素としてのProps（children）

コンポーネントは、`children`という特別なPropsを受け取ることができます。これは、コンポーネントの開始タグと終了タグの間に記述された内容です：

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <h1>About</h1>
      <p>This is a card component.</p>
    </Card>
  );
}
```

## Propsは読み取り専用

Propsは読み取り専用です。コンポーネント内でPropsを変更してはいけません。データを変更する必要がある場合は、状態（state）を使用します（次の記事で解説します）。

```jsx
// ❌ 間違い：Propsを変更してはいけない
function Avatar({ person }) {
  person.name = 'New Name'; // これは間違い！
  return <img src={person.imageUrl} alt={person.name} />;
}

// ✅ 正しい：Propsは読み取り専用として扱う
function Avatar({ person }) {
  return <img src={person.imageUrl} alt={person.name} />;
}
```

## まとめ

- **Props**: 親コンポーネントから子コンポーネントにデータを渡す仕組み
- **JSXでのデータ表示**: 中括弧`{}`でJavaScript式を埋め込む
- **デフォルト値**: Propsにデフォルト値を設定可能
- **children**: コンポーネントの子要素としてコンテンツを渡せる
- **読み取り専用**: Propsは変更してはいけない

次の記事では、状態管理（useState）について詳しく解説します。

## 参考リンク

- [React公式ドキュメント - Props](https://react.dev/learn/passing-props-to-a-component)
- [React公式ドキュメント - データの表示](https://react.dev/learn/displaying-data)
- [React公式ドキュメント - Propsの読み取り専用](https://react.dev/learn/passing-props-to-a-component#props-are-read-only)

