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

### Modal 对话框

```tsx
import { Modal, Button } from '@yd-ui/core';

const [visible, setVisible] = useState(false);

<Modal
  visible={visible}
  title="对话框标题"
  onClose={() => setVisible(false)}
  onOk={() => setVisible(false)}
>
  对话框内容
</Modal>
```

**Props:**
- `visible`: boolean - 是否显示
- `title`: React.ReactNode - 标题
- `closable`: boolean - 是否显示关闭按钮
- `maskClosable`: boolean - 点击遮罩是否关闭
- `onClose`: () => void - 关闭回调
- `onOk`: () => void - 确认回调
- `footer`: React.ReactNode | null - 自定义底部
- `width`: number | string - 宽度

### Switch 开关

```tsx
import { Switch } from '@yd-ui/core';

<Switch 
  checked={checked}
  onChange={setChecked}
  checkedChildren="开"
  unCheckedChildren="关"
/>
```

**Props:**
- `checked`: boolean - 是否选中（受控）
- `defaultChecked`: boolean - 默认是否选中
- `disabled`: boolean - 是否禁用
- `onChange`: (checked: boolean) => void - 变化回调
- `checkedChildren`: React.ReactNode - 选中时的内容
- `unCheckedChildren`: React.ReactNode - 未选中时的内容

### Tag 标签

```tsx
import { Tag } from '@yd-ui/core';

<Tag color="primary" closable onClose={handleClose}>
  标签
</Tag>
```

**Props:**
- `color`: 'default' | 'primary' | 'success' | 'warning' | 'error'
- `closable`: boolean - 是否可关闭
- `onClose`: (e: React.MouseEvent) => void - 关闭回调

