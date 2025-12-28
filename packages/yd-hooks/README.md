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

## useWallet

管理钱包连接状态和操作的 React Hook。

### 用法

```tsx
import { useWallet } from '@yd-hooks/core';

function WalletComponent() {
  const { wallet, actions } = useWallet({
    autoConnect: true,
    onAccountsChanged: (accounts) => {
      console.log('Accounts changed:', accounts);
    },
    onChainChanged: (chainId) => {
      console.log('Chain changed:', chainId);
    }
  });

  return (
    <div>
      {wallet.connected ? (
        <div>
          <p>已连接: {wallet.address}</p>
          <p>余额: {wallet.balance}</p>
          <button onClick={actions.disconnect}>断开连接</button>
          <button onClick={actions.refreshBalance}>刷新余额</button>
        </div>
      ) : (
        <button onClick={actions.connect} disabled={wallet.connecting}>
          {wallet.connecting ? '连接中...' : '连接钱包'}
        </button>
      )}
      {wallet.error && <p>错误: {wallet.error}</p>}
    </div>
  );
}
```

### API

#### `useWallet(options?)`

**参数：**
- `options.autoConnect`: 是否自动连接（默认 false）
- `options.onAccountsChanged`: 账户变化回调
- `options.onChainChanged`: 链变化回调
- `options.onError`: 错误回调

**返回值：**
- `wallet`: 钱包状态对象
  - `connected`: 是否已连接
  - `address`: 钱包地址
  - `chainId`: 链 ID
  - `balance`: 余额（wei）
  - `error`: 错误信息
  - `connecting`: 是否正在连接
- `actions`: 操作函数
  - `connect`: 连接钱包
  - `disconnect`: 断开连接
  - `refreshBalance`: 刷新余额
  - `switchChain`: 切换网络

## useWalletBalance

管理钱包余额的 React Hook。

### 用法

```tsx
import { useWalletBalance } from '@yd-hooks/core';

function BalanceComponent({ address }) {
  const { balance, refreshBalance } = useWalletBalance(address, {
    autoRefresh: true,
    refreshInterval: 5000, // 每5秒刷新一次
    onBalanceChanged: (balance) => {
      console.log('Balance changed:', balance);
    }
  });

  return (
    <div>
      {balance.loading ? (
        <p>加载中...</p>
      ) : balance.error ? (
        <p>错误: {balance.error}</p>
      ) : (
        <div>
          <p>余额: {balance.formattedBalance} ETH</p>
          <button onClick={refreshBalance}>刷新</button>
        </div>
      )}
    </div>
  );
}
```

### API

#### `useWalletBalance(address, options?)`

**参数：**
- `address`: 钱包地址
- `options.autoRefresh`: 是否自动刷新（默认 false）
- `options.refreshInterval`: 刷新间隔（毫秒）
- `options.onBalanceChanged`: 余额变化回调

**返回值：**
- `balance`: 余额状态对象
  - `balance`: 余额（wei）
  - `formattedBalance`: 格式化的余额（ETH）
  - `loading`: 是否正在加载
  - `error`: 错误信息
- `refreshBalance`: 手动刷新余额函数

