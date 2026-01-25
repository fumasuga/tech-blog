---
title: "リストレンダリングと条件付きレンダリング"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-20T10:05:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

> **注**: この記事では、React Nativeアプリケーションのコード例を使用してReactの基本概念を説明しています。React NativeとWeb版のReactでは、使用するコンポーネント名（`View`/`div`、`Text`/`span`など）やイベントハンドラー名（`onPress`/`onClick`、`onChangeText`/`onChange`など）が異なりますが、基本的な概念（コンポーネント、JSX、props、状態管理など）は同じです。

動的なUIを構築するには、データのリストを表示したり、条件に応じて異なるコンテンツを表示したりする必要があります。この記事では、Reactでの**リストレンダリング**と**条件付きレンダリング**について、Todoアプリの実例を通じて解説します。

## リストレンダリング

配列データをリストとして表示するには、`map`メソッドを使用します。React Nativeでは、`FlatList`コンポーネントを使うとパフォーマンスが最適化されます。

### mapを使った基本的なリスト表示

```tsx
const items = ['Todo 1', 'Todo 2', 'Todo 3'];

{items.map((item, index) => (
  <View key={index}>
    <Text>{item}</Text>
  </View>
))}
```

### keyプロパティの重要性

Reactは、リストの各要素を識別するために`key`プロパティを使用します。`key`は一意である必要があり、通常はIDを使用します：

```tsx
{todos.map((todo) => (
  <TodoItem key={todo.id} item={todo} />
))}
```

**注意**: `index`を`key`として使うのは、リストの順序が変わらない場合のみ推奨されます。順序が変わる可能性がある場合は、一意のIDを使用してください。

### FlatListを使った最適化されたリスト

React Nativeでは、`FlatList`コンポーネントを使用すると、大量のデータでもパフォーマンスが最適化されます。`FlatList`はReact Native特有のコンポーネントで、仮想化（virtualization）により画面に表示される要素のみをレンダリングします。Web版のReactでは、通常`map`メソッドでリストを表示しますが、大量のデータの場合は仮想化ライブラリ（react-windowなど）を使用することがあります：

```tsx
export const TodoList: React.FC = () => {
  const { todos, loading, fetchTodos, toggleTodo, deleteTodo } = useTodoStore();

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TodoItem
          item={item}
          index={index}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
      contentContainerStyle={styles.list}
      scrollEnabled={false}
    />
  );
};
```

この例では：
- `data`: 表示するデータの配列
- `keyExtractor`: 各アイテムの一意のキーを抽出
- `renderItem`: 各アイテムのレンダリング方法を定義
- `scrollEnabled={false}`: スクロールを無効化（親のScrollViewでスクロール）

### フィルタリングされたリストの表示

`useMemo`を使って、フィルタリングされたリストを効率的に計算できます：

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

<FlatList
  data={todaysTodos}
  // ...
/>
```

## 条件付きレンダリング

条件に応じて異なるコンテンツを表示するには、いくつかの方法があります。

### 三項演算子（Ternary Operator）

最も一般的な方法です：

```tsx
{isLoading ? (
  <ActivityIndicator size="small" color={colors.accent.primary} />
) : (
  <Text>データが読み込まれました</Text>
)}
```

### 論理AND演算子（&&）

条件が`true`のときのみ表示する場合：

```tsx
{hasUrl && !expanded && (
  <TouchableOpacity onPress={() => Linking.openURL(item.url!)}>
    <Text>↗</Text>
  </TouchableOpacity>
)}
```

### 早期リターン

コンポーネントの最初で条件分岐する場合：

```tsx
function AppContent() {
  const { session, initialized } = useAuthStore();

  // 初期化中
  if (!initialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
        <Text>読み込み中...</Text>
      </View>
    );
  }

  // 未認証
  if (!session) {
    return <AuthScreen />;
  }

  // メインコンテンツ
  return (
    <View>
      <TodoList />
    </View>
  );
}
```

### 複数の条件分岐

複数の条件に応じて異なるコンテンツを表示：

```tsx
{activeTab === 'today' ? (
  <ScrollView>
    <AddTodo />
    <ContributionGraph />
    <TodoList />
  </ScrollView>
) : (
  <View>
    <CompletedHistory />
  </View>
)}
```

## 実践的な例

### 空の状態の表示

リストが空のときにメッセージを表示：

```tsx
<FlatList
  data={todaysTodos}
  renderItem={({ item }) => <TodoItem item={item} />}
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>✓</Text>
      </View>
      <Text style={styles.emptyTitle}>すべて完了しました</Text>
      <Text style={styles.emptySubtitle}>新しいタスクを追加してください</Text>
    </View>
  }
/>
```

### ローディング状態の表示

データ取得中はローディング表示：

```tsx
if (loading && todos.length === 0) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color={colors.accent.primary} />
      <Text style={styles.loadingText}>タスクを読み込み中...</Text>
    </View>
  );
}
```

### 展開/折りたたみ機能

条件に応じて詳細を表示/非表示：

```tsx
const [expanded, setExpanded] = useState(false);

return (
  <View>
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <Text>{item.title}</Text>
      <Text>{expanded ? '▲' : '▼'}</Text>
    </TouchableOpacity>
    
    {expanded && (
      <View style={styles.expandedContent}>
        <Text>詳細情報</Text>
        <TextInput value={item.output} />
      </View>
    )}
  </View>
);
```

### バッジの条件付き表示

条件に応じてバッジを表示：

```tsx
<View style={styles.metaRow}>
  <Text style={styles.dateText}>
    {item.is_completed && item.completed_at
      ? `完了: ${formatDate(item.completed_at)}`
      : `作成: ${formatDate(item.created_at)}`}
  </Text>
  {hasUrl && !expanded && (
    <TouchableOpacity style={styles.linkBadge}>
      <Text>↗</Text>
    </TouchableOpacity>
  )}
  {hasOutput && !expanded && (
    <View style={styles.outputBadge}>
      <Text>出力</Text>
    </View>
  )}
</View>
```

### スタイルの条件付き適用

条件に応じてスタイルを変更：

```tsx
<View style={[
  styles.inputWrapper,
  { backgroundColor: colors.bg.card, borderColor: colors.border.primary },
  isFocused && { borderColor: colors.accent.primary, backgroundColor: colors.bg.elevated },
]}>
  <TextInput
    style={[styles.input, { color: colors.text.primary }]}
    // ...
  />
</View>
```

### テキストスタイルの条件付き適用

完了済みのタスクに取り消し線を表示：

```tsx
<Text style={[
  styles.title,
  { color: colors.text.primary },
  item.is_completed && { 
    textDecorationLine: 'line-through', 
    color: colors.text.muted 
  }
]}>
  {item.title}
</Text>
```

## パフォーマンスの最適化

### useMemoでフィルタリング結果をメモ化

```tsx
const todaysTodos = React.useMemo(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return todos.filter(t => {
    // フィルタリングロジック
  });
}, [todos]); // todosが変更されたときのみ再計算
```

### FlatListの最適化オプション

```tsx
<FlatList
  data={todos}
  keyExtractor={(item) => item.id}
  renderItem={renderTodoItem}
  removeClippedSubviews={true} // 画面外の要素をアンマウント
  maxToRenderPerBatch={10} // 一度にレンダリングする要素数
  windowSize={10} // レンダリングするウィンドウサイズ
/>
```

## まとめ

- **リストレンダリング**: `map`や`FlatList`で配列データを表示
- **keyプロパティ**: 一意のIDを使用してReactが要素を識別できるようにする
- **条件付きレンダリング**: 三項演算子、`&&`演算子、早期リターンで条件に応じた表示
- **空の状態**: `ListEmptyComponent`で空のリストにメッセージを表示
- **パフォーマンス**: `useMemo`や`FlatList`の最適化オプションで効率化

リストレンダリングと条件付きレンダリングを適切に組み合わせることで、動的で反応的なUIを構築できます。これでReactの基本を一通り学びました。これらの概念を組み合わせて、より複雑なアプリケーションを構築していきましょう。

