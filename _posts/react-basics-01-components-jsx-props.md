---
title: "Reactの基本：コンポーネント、JSX、props"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-20T10:01:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

> **注**: この記事では、React Nativeアプリケーションのコード例を使用してReactの基本概念を説明しています。React NativeとWeb版のReactでは、使用するコンポーネント名（`View`/`div`、`Text`/`span`など）やイベントハンドラー名（`onPress`/`onClick`、`onChangeText`/`onChange`など）が異なりますが、基本的な概念（コンポーネント、JSX、props、状態管理など）は同じです。

Reactは、ユーザーインターフェースを構築するためのJavaScriptライブラリです。この記事では、Reactの最も基本的な概念である**コンポーネント**、**JSX**、**props**について、実際のTodoアプリケーションのコードを例に解説します。

## コンポーネントとは

コンポーネントは、UIを独立した再利用可能な部品に分割するReactの基本単位です。関数として定義し、必要なときに呼び出して使用します。

### 関数コンポーネントの基本形

```tsx
export const AddTodo: React.FC = () => {
  return (
    <View>
      <Text>Todoを追加</Text>
    </View>
  );
};
```

この例では、`AddTodo`という名前のコンポーネントを定義しています。`React.FC`はTypeScriptで関数コンポーネントの型を表します。

## JSXとは

JSX（JavaScript XML）は、JavaScriptの中にXMLライクな構文を書けるようにするReactの拡張構文です。React Nativeでは、`<View>`や`<Text>`などのコンポーネントを使用します（Web版のReactでは`<div>`や`<span>`などのHTML要素を使用します）。見た目はHTMLに似ていますが、実際にはJavaScriptの式として評価されます。

### JSXの特徴

1. **要素の記述**: XMLライクな構文で記述できます。React Nativeでは`<View>`や`<Text>`などのコンポーネントを使用し、大文字で始まるものはカスタムReactコンポーネントです。

```tsx
// React Nativeの基本コンポーネント
<View style={styles.container}>
  <Text>Hello React</Text>
</View>

// カスタムReactコンポーネント
<AddTodo />
```

2. **JavaScript式の埋め込み**: 中括弧`{}`を使ってJavaScriptの式を埋め込めます。

```tsx
const name = "React";
<Text>Hello, {name}!</Text>  // "Hello, React!" と表示
```

3. **属性の指定**: HTMLの属性のようにpropsを渡せますが、JavaScriptの予約語（class、forなど）は別名（className、htmlFor）を使います。

```tsx
<TextInput
  style={styles.input}
  placeholder="タスクを入力"
  value={text}
  onChangeText={setText}
/>
```

## Props（プロパティ）とは

Propsは、親コンポーネントから子コンポーネントにデータを渡すための仕組みです。関数の引数のようなもので、コンポーネントを再利用可能にする重要な機能です。

### Propsの受け取り方

```tsx
interface TodoItemProps {
  item: Todo;
  index: number;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
  colors: ReturnType<typeof getColors>;
  t: (key: string) => string;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  item, 
  index, 
  onToggle, 
  onDelete, 
  colors, 
  t 
}) => {
  return (
    <View>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => onToggle(item.id, item.is_completed)}>
        <Text>完了</Text>
      </TouchableOpacity>
    </View>
  );
};
```

この例では、`TodoItem`コンポーネントが親から`item`、`index`、`onToggle`などのpropsを受け取っています。

### Propsの渡し方

親コンポーネントから子コンポーネントにpropsを渡すには、属性のように記述します。

```tsx
<TodoItem
  item={todo}
  index={0}
  onToggle={toggleTodo}
  onDelete={deleteTodo}
  colors={colors}
  t={t}
/>
```

## 実際のコード例

Todoアプリの`AddTodo`コンポーネントを見てみましょう：

```tsx
export const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((s) => s.addTodo);
  const { mode } = useThemeStore();
  const { t } = useLanguageStore();
  const colors = getColors(mode);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: colors.text.primary }]}
        placeholder={t('whatNeedsToBeDone')}
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={() => addTodo(text)}>
        <Text>追加</Text>
      </TouchableOpacity>
    </View>
  );
};
```

このコンポーネントでは：
- `View`、`TextInput`、`TouchableOpacity`などのJSX要素を使用
- `style`属性でスタイルを適用
- `value`、`onChangeText`などのpropsで入力値を制御

## まとめ

- **コンポーネント**: UIを独立した再利用可能な部品に分割
- **JSX**: JavaScriptの中にXMLライクな構文を記述（React Nativeでは`<View>`、`<Text>`など、Web版では`<div>`、`<span>`など）
- **Props**: 親から子コンポーネントにデータを渡す仕組み

これらの基本概念を理解することで、Reactアプリケーションの構造を把握し、効率的に開発を進められるようになります。次回は、コンポーネント内で状態を管理する`useState`と`useEffect`について解説します。

