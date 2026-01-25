---
title: "カスタムフックとZustand"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-20T10:03:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

> **注**: この記事では、React Nativeアプリケーションのコード例を使用してReactの基本概念を説明しています。React NativeとWeb版のReactでは、使用するコンポーネント名（`View`/`div`、`Text`/`span`など）やイベントハンドラー名（`onPress`/`onClick`、`onChangeText`/`onChange`など）が異なりますが、基本的な概念（コンポーネント、JSX、props、状態管理など）は同じです。

複数のコンポーネント間で状態を共有したり、ロジックを再利用したりする場合、**カスタムフック**や**状態管理ライブラリ**が役立ちます。この記事では、カスタムフックの作成方法と、軽量な状態管理ライブラリである**Zustand**の使い方を、Todoアプリの実例を通じて解説します。

## カスタムフックとは

カスタムフックは、複数のコンポーネントで再利用できるロジックをまとめた関数です。`use`で始まる名前をつけ、他のフック（`useState`、`useEffect`など）を組み合わせて作成します。

### カスタムフックの基本形

```tsx
function useCustomHook() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // 何らかの処理
  }, []);

  return { state, setState };
}
```

### 実例：認証状態の管理

Todoアプリでは、認証状態を管理するカスタムフックとして`useAuthStore`を使用しています。これはZustandで実装されていますが、カスタムフックの概念を理解する良い例です：

```tsx
const { session, initialized, initialize, signOut } = useAuthStore();
```

## Zustandとは

Zustandは、軽量でシンプルな状態管理ライブラリです。Reduxのような複雑な設定は不要で、最小限のコードでグローバルな状態管理を実現できます。

### Zustandの特徴

- **シンプル**: ボイラープレートが少ない
- **軽量**: バンドルサイズが小さい
- **TypeScript対応**: 型安全性が高い
- **柔軟**: 必要な機能だけを選択できる

### Zustandストアの作成

Todoアプリの`todoStore.ts`を見てみましょう：

```tsx
import { create } from 'zustand';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string, isCompleted: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const { data, error } = await getSupabase()
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ todos: data ?? [] });
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      set({ loading: false });
    }
  },

  addTodo: async (title: string) => {
    try {
      const { data, error } = await getSupabase()
        .from('todos')
        .insert({ title: title.trim(), is_completed: false })
        .select()
        .single();

      if (error) throw error;
      set((state) => ({ todos: [data, ...state.todos] }));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  },

  // ... 他のメソッド
}));
```

### ストアの使用

コンポーネント内でストアを使用するには、フックとして呼び出します：

```tsx
export const TodoList: React.FC = () => {
  const { todos, loading, fetchTodos, toggleTodo, deleteTodo } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    />
  );
};
```

### 部分的な状態の取得

必要な部分だけを取得することで、不要な再レンダリングを防げます：

```tsx
// すべての状態を取得（非推奨）
const store = useTodoStore();

// 必要な部分だけを取得（推奨）
const todos = useTodoStore((state) => state.todos);
const fetchTodos = useTodoStore((state) => state.fetchTodos);

// または、複数の値を一度に取得
const { todos, loading } = useTodoStore((state) => ({
  todos: state.todos,
  loading: state.loading,
}));
```

## 楽観的更新（Optimistic Update）

Zustandでは、サーバーへのリクエストが完了する前にUIを更新する「楽観的更新」を簡単に実装できます：

```tsx
toggleTodo: async (id: string, isCompleted: boolean) => {
  const newCompleted = !isCompleted;
  const completedAt = newCompleted ? new Date().toISOString() : null;

  // 楽観的更新：即座にUIを更新
  set((state) => ({
    todos: state.todos.map((t) =>
      t.id === id 
        ? { ...t, is_completed: newCompleted, completed_at: completedAt } 
        : t
    ),
  }));

  try {
    // サーバーに更新を送信
    const { error } = await getSupabase()
      .from('todos')
      .update({ is_completed: newCompleted, completed_at: completedAt })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    // エラー時はロールバック
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id 
          ? { ...t, is_completed: isCompleted, completed_at: null } 
          : t
      ),
    }));
    Alert.alert('エラー', 'Todoの更新に失敗しました');
  }
},
```

この方法により、ユーザーは即座にフィードバックを受け取れ、アプリの応答性が向上します。

## 複数のストアの管理

Todoアプリでは、複数のストアを用途別に分けています：

```tsx
// 認証状態
const { session, signOut } = useAuthStore();

// Todo状態
const { todos, addTodo } = useTodoStore();

// テーマ状態
const { mode, toggleMode } = useThemeStore();

// 言語状態
const { t, changeLanguage } = useLanguageStore();
```

このように分けることで、各ストアの責務が明確になり、保守性が向上します。

## カスタムフックとZustandの使い分け

- **カスタムフック**: コンポーネント固有のロジックや、複数コンポーネントで共有するがグローバルでない状態
- **Zustand**: アプリ全体で共有するグローバルな状態（認証、テーマ、言語設定など）

### カスタムフックの例

カスタムフックの例として、ローカルストレージを使用するフックを示します。React Nativeでは`AsyncStorage`、Web版では`window.localStorage`を使用します：

```tsx
// React Native版（AsyncStorageを使用）
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then((value) => {
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      }
    });
  }, [key]);

  const setValue = async (value: string) => {
    try {
      setStoredValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Web版（window.localStorageを使用）
function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

## まとめ

- **カスタムフック**: 再利用可能なロジックをまとめた関数
- **Zustand**: 軽量でシンプルなグローバル状態管理ライブラリ
- **楽観的更新**: サーバー応答を待たずにUIを更新してUXを向上
- **ストアの分割**: 用途別にストアを分けることで保守性を向上

状態管理を適切に設計することで、スケーラブルで保守しやすいアプリケーションを構築できます。次回は、イベントハンドリングとフォーム処理について解説します。

