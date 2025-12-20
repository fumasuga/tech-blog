---
title: "Reactの状態管理：useStateとuseEffect"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-20T10:02:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

Reactコンポーネントで動的なUIを実現するには、**状態（state）**の管理が不可欠です。この記事では、Reactの基本的な状態管理フックである`useState`と`useEffect`について、Todoアプリの実例を通じて解説します。

## useState：コンポーネントの状態を管理

`useState`は、コンポーネント内で状態を保持し、その状態が変更されたときにコンポーネントを再レンダリングするためのフックです。

### 基本的な使い方

```tsx
import { useState } from 'react';

const [state, setState] = useState(initialValue);
```

- `state`: 現在の状態値
- `setState`: 状態を更新する関数
- `initialValue`: 初期値

### 実例：入力フィールドの状態管理

Todoアプリの`AddTodo`コンポーネントでは、入力テキストを`useState`で管理しています：

```tsx
export const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      value={text}
      onChangeText={setText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
```

この例では：
- `text`: 入力フィールドの現在の値を保持
- `setText`: 入力値が変更されたときに呼び出される関数
- `isFocused`: フィールドがフォーカスされているかどうかを管理

### 複数の状態を管理

1つのコンポーネントで複数の状態を管理することもできます：

```tsx
const [refreshing, setRefreshing] = useState(false);
const [activeTab, setActiveTab] = useState<Tab>('today');
const [showSettings, setShowSettings] = useState(false);
```

## useEffect：副作用の処理

`useEffect`は、コンポーネントのレンダリング後に実行される処理（副作用）を定義するフックです。データの取得、イベントリスナーの登録、タイマーの設定などに使用されます。

### 基本的な使い方

```tsx
import { useEffect } from 'react';

useEffect(() => {
  // 実行したい処理
}, [依存配列]);
```

### 依存配列の役割

依存配列は、`useEffect`をいつ実行するかを制御します：

1. **依存配列なし**: 毎回のレンダリング後に実行
```tsx
useEffect(() => {
  console.log('毎回実行');
});
```

2. **空の依存配列**: 初回レンダリング時のみ実行
```tsx
useEffect(() => {
  console.log('初回のみ実行');
}, []);
```

3. **依存配列に値**: 指定した値が変更されたときのみ実行
```tsx
useEffect(() => {
  console.log('countが変更されたときのみ実行');
}, [count]);
```

### 実例：初期化処理

Todoアプリの`App.tsx`では、アプリ起動時の初期化処理に`useEffect`を使用しています：

```tsx
useEffect(() => {
  initializeAuth();
  initializeTheme();
  initializeLang();
}, []);
```

この`useEffect`は、コンポーネントがマウントされたとき（初回レンダリング時）に1回だけ実行され、認証、テーマ、言語の初期化を行います。

### 実例：データの取得

`TodoList`コンポーネントでは、コンポーネントのマウント時にTodoリストを取得しています：

```tsx
export const TodoList: React.FC = () => {
  const { todos, loading, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  // ...
};
```

### クリーンアップ処理

`useEffect`は、クリーンアップ関数を返すことができます。これは、コンポーネントがアンマウントされる前や、依存配列の値が変更される前に実行されます：

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('1秒ごとに実行');
  }, 1000);

  // クリーンアップ関数
  return () => {
    clearInterval(timer);
  };
}, []);
```

## 実践的な組み合わせ例

実際のアプリケーションでは、`useState`と`useEffect`を組み合わせて使用することが多いです：

```tsx
const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [outputText, setOutputText] = useState(item.output || '');

  // item.outputが変更されたときにoutputTextを更新
  useEffect(() => {
    setOutputText(item.output || '');
  }, [item.output]);

  return (
    <View>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
      {expanded && (
        <TextInput
          value={outputText}
          onChangeText={setOutputText}
        />
      )}
    </View>
  );
};
```

この例では：
- `expanded`状態で展開/折りたたみを制御
- `outputText`状態で入力値を管理
- `useEffect`で`item.output`の変更を監視し、`outputText`を同期

## パフォーマンスの考慮

### useMemo：計算結果のメモ化

重い計算処理の結果をキャッシュするには`useMemo`を使用します：

```tsx
const todaysTodos = React.useMemo(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return todos.filter(t => {
    if (!t.is_completed) return true;
    if (!t.completed_at) return true;

    const completedDate = new Date(t.completed_at);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  });
}, [todos]);
```

`todos`が変更されたときのみ再計算され、不要な再計算を防ぎます。

## まとめ

- **useState**: コンポーネント内の状態を管理し、変更時に再レンダリングをトリガー
- **useEffect**: レンダリング後の副作用（データ取得、初期化など）を処理
- **依存配列**: `useEffect`の実行タイミングを制御
- **useMemo**: 重い計算結果をメモ化してパフォーマンスを最適化

これらのフックを適切に組み合わせることで、動的で反応的なUIを構築できます。次回は、カスタムフックと状態管理ライブラリ（Zustand）について解説します。

