# @yd-libs/core

YD Libs - 工具函数库

## 安装

```bash
pnpm add @yd-libs/core
```

## 功能模块

### 格式化工具 (format)

- `formatDate`: 格式化日期
- `formatNumber`: 格式化数字（添加千分位）
- `formatFileSize`: 格式化文件大小

### 验证工具 (validate)

- `isValidEmail`: 验证邮箱格式
- `isValidPhone`: 验证手机号格式
- `isValidUrl`: 验证 URL 格式
- `isValidIdCard`: 验证身份证号格式

### 存储工具 (storage)

- `setStorage`: 设置本地存储
- `getStorage`: 获取本地存储
- `removeStorage`: 删除本地存储
- `clearStorage`: 清空所有本地存储

### 钱包工具 (wallet)

- `formatAddress`: 格式化钱包地址（显示前几位和后几位）
- `shortenAddress`: 缩短钱包地址（默认格式）
- `isValidAddress`: 验证以太坊地址格式
- `isValidChecksumAddress`: 验证地址校验和格式（EIP-55）
- `toChecksumAddress`: 转换为校验和地址

## 使用示例

```typescript
import { 
  formatDate, 
  isValidEmail, 
  setStorage, 
  getStorage,
  formatAddress,
  isValidAddress
} from '@yd-libs/core';

// 格式化日期
const dateStr = formatDate(new Date(), 'YYYY-MM-DD');

// 验证邮箱
const isValid = isValidEmail('test@example.com');

// 存储数据
setStorage('user', { name: 'John', age: 30 });

// 获取数据
const user = getStorage('user');

// 格式化钱包地址
const address = '0x1234567890123456789012345678901234567890';
const formatted = formatAddress(address); // "0x1234...7890"
const shortened = shortenAddress(address); // "0x1234...7890"

// 验证地址
const isValid = isValidAddress(address); // true
```

