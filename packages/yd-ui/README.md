# @yd-ui/core

YD UI - React UI 组件库

## 安装

```bash
pnpm add @yd-ui/core
```

## 组件

### Button 按钮

```tsx
import { Button } from '@yd-ui/core';

<Button type="primary" size="large" onClick={handleClick}>
  点击我
</Button>
```

**Props:**
- `type`: 'primary' | 'default' | 'dashed' | 'text' | 'link'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `loading`: boolean
- `onClick`: (e: React.MouseEvent) => void

### Input 输入框

```tsx
import { Input } from '@yd-ui/core';

<Input 
  placeholder="请输入内容" 
  size="large"
  prefix={<span>🔍</span>}
/>
```

**Props:**
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `error`: boolean
- `prefix`: React.ReactNode
- `suffix`: React.ReactNode
- 支持所有原生 input 属性

### Card 卡片

```tsx
import { Card } from '@yd-ui/core';

<Card 
  title="卡片标题" 
  extra={<a>更多</a>}
  hoverable
>
  卡片内容
</Card>
```

**Props:**
- `title`: React.ReactNode
- `extra`: React.ReactNode
- `bordered`: boolean
- `hoverable`: boolean

