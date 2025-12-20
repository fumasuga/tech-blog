---
title: "イベントハンドリングとフォーム処理"
coverImage: "/assets/blog/preview/cover.jpg"
date: "2025-12-20T10:04:00.000Z"
ogImage:
  url: "/assets/blog/preview/cover.jpg"
---

> **注**: この記事では、React Nativeアプリケーションのコード例を使用してReactの基本概念を説明しています。React NativeとWeb版のReactでは、使用するコンポーネント名（`View`/`div`、`Text`/`span`など）やイベントハンドラー名（`onPress`/`onClick`、`onChangeText`/`onChange`など）が異なりますが、基本的な概念（コンポーネント、JSX、props、状態管理など）は同じです。

ユーザーとの対話的なUIを構築するには、**イベントハンドリング**と**フォーム処理**が重要です。この記事では、Reactでのイベント処理の方法と、フォーム入力の管理について、Todoアプリの実例を通じて解説します。

## イベントハンドリングの基本

Reactでは、イベントハンドラーをJSX要素の属性として渡します。イベント名はキャメルケースで記述し、関数を値として指定します。

### 基本的なイベントハンドラー

```tsx
const handleClick = () => {
  console.log('ボタンがクリックされました');
};

<TouchableOpacity onPress={handleClick}>
  <Text>クリック</Text>
</TouchableOpacity>
```

### インライン関数での記述

イベントハンドラーはインラインで定義することもできます：

```tsx
<TouchableOpacity onPress={() => console.log('クリック')}>
  <Text>クリック</Text>
</TouchableOpacity>
```

### イベントオブジェクトの利用

イベントハンドラーは、イベントオブジェクトを引数として受け取れます：

```tsx
const handleChange = (event: any) => {
  console.log('入力値:', event.nativeEvent.text);
};

<TextInput onChange={handleChange} />
```

## フォーム入力の管理

Reactでは、フォーム入力は**制御コンポーネント（Controlled Component）**として管理するのが一般的です。React Nativeでは、入力値は`useState`で管理し、`value`と`onChangeText`で制御します（Web版のReactでは`onChange`を使用します）。

### 基本的な入力フィールド

Todoアプリの`AddTodo`コンポーネントを見てみましょう：

```tsx
export const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, { color: colors.text.primary }]}
      placeholder={t('whatNeedsToBeDone')}
      placeholderTextColor={colors.text.muted}
      value={text}
      onChangeText={setText}
      onSubmitEditing={handleSubmit}
      returnKeyType="done"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
```

この例では：
- `value={text}`: 入力値を`text`状態で制御
- `onChangeText={setText}`: 入力値が変更されたときに`text`を更新
- `onSubmitEditing`: Enterキーが押されたときの処理
- `onFocus`/`onBlur`: フォーカス状態の管理

### フォーム送信の処理

```tsx
const handleSubmit = async () => {
  const trimmed = text.trim();
  if (trimmed.length === 0) return;

  await addTodo(trimmed);
  setText('');
  Keyboard.dismiss();
};
```

この関数では：
1. 入力値の前後の空白を削除
2. 空でないことを確認
3. Todoを追加
4. 入力フィールドをクリア
5. キーボードを閉じる

## 複数フィールドの管理

複数の入力フィールドがある場合、各フィールドごとに`useState`を作成するか、オブジェクトでまとめて管理します：

### 個別の状態管理

```tsx
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [url, setUrl] = useState('');
```

### オブジェクトでの状態管理

```tsx
const [formData, setFormData] = useState({
  title: '',
  description: '',
  url: '',
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value,
  }));
};

<TextInput
  value={formData.title}
  onChangeText={(value) => handleChange('title', value)}
/>
```

## バリデーション（検証）

入力値の検証は、送信前や入力中に行います：

```tsx
const validateTodoTitle = (title: string) => {
  if (title.trim().length === 0) {
    return { isValid: false, error: 'タスク名を入力してください' };
  }
  if (title.length > 100) {
    return { isValid: false, error: 'タスク名は100文字以内で入力してください' };
  }
  return { isValid: true };
};

const handleSubmit = async () => {
  const validation = validateTodoTitle(text);
  if (!validation.isValid) {
    Alert.alert('入力エラー', validation.error);
    return;
  }
  // 送信処理
};
```

## 条件付きのボタン有効化

入力値に応じてボタンの有効/無効を切り替えます：

```tsx
const canSubmit = text.trim().length > 0;

<TouchableOpacity
  onPress={handleSubmit}
  disabled={!canSubmit}
  activeOpacity={0.8}
>
  <LinearGradient
    colors={canSubmit 
      ? [colors.accent.primary, colors.accent.secondary] 
      : [colors.bg.tertiary, colors.bg.tertiary]
    }
    style={[styles.button, canSubmit && shadows.glow]}
  >
    <Text style={[styles.buttonIcon, !canSubmit && { color: colors.text.muted }]}>
      +
    </Text>
  </LinearGradient>
</TouchableOpacity>
```

## モーダルでのフォーム処理

Todoアプリでは、モーダル内で出力やURLを編集できます：

```tsx
const [showOutputModal, setShowOutputModal] = useState(false);
const [modalOutputText, setModalOutputText] = useState('');

const openOutputModal = () => {
  setModalOutputText(item.output || '');
  setShowOutputModal(true);
};

const handleSaveOutput = async () => {
  if (modalOutputText === (item.output || '')) {
    setShowOutputModal(false);
    return;
  }
  setIsSaving(true);
  await onUpdateOutput(item.id, modalOutputText);
  setIsSaving(false);
  setModalOutputText(modalOutputText);
  setShowOutputModal(false);
  Keyboard.dismiss();
};
```

この実装では：
- モーダルを開くときに現在の値を初期値として設定
- 変更がない場合は保存処理をスキップ
- 保存中はローディング状態を表示
- 保存後にモーダルを閉じてキーボードを非表示

## アニメーションとの組み合わせ

イベントハンドラーとアニメーションを組み合わせることで、視覚的なフィードバックを提供できます：

```tsx
const scaleAnim = useRef(new Animated.Value(1)).current;

const handleSubmit = async () => {
  // アニメーションで視覚的フィードバック
  Animated.sequence([
    Animated.timing(scaleAnim, { 
      toValue: 0.95, 
      duration: 100, 
      useNativeDriver: Platform.OS !== 'web' 
    }),
    Animated.timing(scaleAnim, { 
      toValue: 1, 
      duration: 100, 
      useNativeDriver: Platform.OS !== 'web' 
    }),
  ]).start();

  await addTodo(trimmed);
  setText('');
  Keyboard.dismiss();
};

<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
  <TouchableOpacity onPress={handleSubmit}>
    <Text>送信</Text>
  </TouchableOpacity>
</Animated.View>
```

## イベントの伝播と防止

React Nativeでは、イベントの伝播を制御する必要がある場合があります：

```tsx
// 親要素のイベントを防ぐ
<TouchableOpacity 
  onPress={(e) => {
    e.stopPropagation();
    handleItemPress();
  }}
>
  <Text>アイテム</Text>
</TouchableOpacity>
```

## まとめ

- **イベントハンドラー**: 関数を属性として渡してイベントを処理（React Nativeでは`onPress`、Web版では`onClick`）
- **制御コンポーネント**: `value`と`onChangeText`（React Native）または`onChange`（Web版）で入力値を管理
- **バリデーション**: 入力値の検証でデータの整合性を保つ
- **条件付きレンダリング**: 入力状態に応じてUIを変更
- **アニメーション**: イベントと組み合わせて視覚的フィードバックを提供

適切なイベントハンドリングとフォーム処理により、ユーザーフレンドリーなインターフェースを構築できます。次回は、リストレンダリングと条件付きレンダリングについて解説します。

