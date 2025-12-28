# @yd-hooks/core

YD Hooks - React hooks 库

## 安装

```bash
pnpm add @yd-hooks/core
```

## useImmer

使用 Immer 进行不可变状态更新的 React Hook。

### 用法

```tsx
import { useImmer } from '@yd-hooks/core';

function Counter() {
  const [state, updateState] = useImmer({ count: 0, name: 'test' });

  const handleIncrement = () => {
    updateState(draft => {
      draft.count += 1;
    });
  };

  const handleUpdate = () => {
    updateState(draft => {
      draft.count += 1;
      draft.name = 'updated';
    });
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Name: {state.name}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
```

### API

#### `useImmer<T>(initialValue: T | (() => T))`

**参数：**
- `initialValue`: 初始状态值或返回初始状态的函数

**返回值：**
- `[state, updateState]`: 状态和更新函数的元组
  - `state`: 当前状态
  - `updateState`: 更新函数，可以接受：
    - 一个函数 `(draft: Draft<T>) => void`，用于修改 draft 状态
    - 一个新值 `T`，直接替换整个状态

### 特性

- ✅ 使用 Immer 进行不可变状态更新
- ✅ 支持函数式更新
- ✅ 支持直接替换状态
- ✅ 完整的 TypeScript 类型支持

