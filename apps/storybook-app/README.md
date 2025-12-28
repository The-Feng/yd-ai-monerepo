# Storybook App

这是一个 Storybook 应用，用于展示和测试 `@yd-ui/core` 组件库的所有组件。

## 功能

- ✅ 组件可视化展示
- ✅ 交互式文档
- ✅ 组件属性控制
- ✅ Stories 文件与组件分离

## 运行

```bash
# 启动 Storybook
pnpm --filter storybook-app storybook

# 或直接进入目录
cd apps/storybook-app
pnpm storybook
```

## 构建

```bash
# 构建静态 Storybook
pnpm --filter storybook-app build-storybook
```

## 结构说明

- `src/stories/` - 所有组件的 stories 文件（与组件分离）
  - `Button.stories.tsx`
  - `Input.stories.tsx`
  - `Card.stories.tsx`
  - `Modal.stories.tsx`
  - `Switch.stories.tsx`
  - `Tag.stories.tsx`

组件代码位于 `packages/yd-ui/src/`，stories 文件位于 `apps/storybook-app/src/stories/`，实现了完全分离。

