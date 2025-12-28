# YD AI Monorepo

这是一个基于 **Lerna + pnpm workspaces** 的 monorepo 项目。

## 项目结构

```
yd-ai-monorepo/
├── packages/
│   ├── yd-hooks/      # React Hooks 库
│   ├── yd-libs/       # 工具库
│   └── yd-ui/         # UI 组件库
├── apps/              # 应用目录
│   └── demo-app/      # 演示应用
├── package.json       # 根 package.json
├── lerna.json         # Lerna 配置
├── pnpm-workspace.yaml # pnpm workspace 配置
└── tsconfig.json      # TypeScript 配置
```

## 安装依赖

```bash
# 安装所有依赖（pnpm + Lerna）
pnpm install

# 或者使用 Lerna bootstrap（会链接本地包）
pnpm bootstrap
```

## 开发

```bash
# 开发所有包（并行执行）
pnpm dev

# 构建所有包
pnpm build

# 运行 lint（并行执行）
pnpm lint

# 运行测试（并行执行）
pnpm test
```

## Lerna 命令

**注意**: Lerna 已作为本地依赖安装，请使用 `pnpm` 脚本来运行命令，或使用 `pnpm exec lerna` / `npx lerna`。

```bash
# 查看变更的包
pnpm changed
# 或: pnpm exec lerna changed

# 查看包之间的差异
pnpm diff
# 或: pnpm exec lerna diff

# 版本管理（基于 conventional commits）
pnpm version
# 或: pnpm exec lerna version

# 发布包
pnpm publish
# 或: pnpm exec lerna publish

# 发布特定包
pnpm exec lerna publish --scope @yd-hooks/core

# 发布 canary 版本
pnpm publish:canary

# 从 package.json 发布
pnpm publish:from-package

# 发布所有包（仅 packages）
pnpm publish:packages

# 发布前测试（dry-run）
pnpm publish:dry-run

# 清理所有包的 node_modules
pnpm clean
```

## 发布到本地 Registry

所有包配置为发布到 `http://localhost:4873/`（本地 Verdaccio）。

**发布前准备：**
1. 确保本地 registry 运行：`verdaccio`
2. 构建所有包：`pnpm build`
3. 查看变更：`pnpm changed`

**发布命令：**
```bash
# 发布所有变更的包
pnpm publish

# 发布特定包
lerna publish --scope @yd-hooks/core
```

详细发布指南请查看 [PUBLISH.md](./PUBLISH.md)

## 包说明

### @yd-hooks/core

React Hooks 库，提供常用的 React Hooks。

**主要功能：**
- `useImmer`: 使用 Immer 进行不可变状态更新

### @yd-libs/core

工具函数库，提供常用的工具函数。

**主要功能：**
- **格式化工具**: `formatDate`, `formatNumber`, `formatFileSize`
- **验证工具**: `isValidEmail`, `isValidPhone`, `isValidUrl`, `isValidIdCard`
- **存储工具**: `setStorage`, `getStorage`, `removeStorage`, `clearStorage`

### @yd-ui/core

React UI 组件库，提供常用的 UI 组件。

**主要组件：**
- `Button`: 按钮组件（支持多种类型和尺寸）
- `Input`: 输入框组件（支持前缀、后缀、错误状态）
- `Card`: 卡片组件（支持标题、操作区域、悬浮效果）
- `Modal`: 对话框组件（支持自定义内容和底部）
- `Switch`: 开关组件（支持受控和非受控）
- `Tag`: 标签组件（支持多种颜色和可关闭）

## 应用说明

### demo-app

演示应用，展示如何使用所有包的功能。

**运行方式：**
```bash
# 使用 Lerna
lerna run dev --scope demo-app

# 或使用 pnpm
pnpm --filter demo-app dev
```

### storybook-app

Storybook 应用，用于展示和测试 `@yd-ui/core` 组件库的所有组件。

**特点：**
- ✅ Stories 文件与组件完全分离
- ✅ 组件位于 `packages/yd-ui/src/`
- ✅ Stories 位于 `apps/storybook-app/src/stories/`

**运行方式：**
```bash
# 启动 Storybook
pnpm --filter storybook-app storybook

# 构建静态 Storybook
pnpm --filter storybook-app build-storybook
```

## Lerna 特性

- ✅ **版本管理**: 独立版本或统一版本管理
- ✅ **依赖链接**: 自动链接本地包
- ✅ **并行执行**: 支持并行运行脚本
- ✅ **变更检测**: 只构建/测试变更的包
- ✅ **发布管理**: 自动发布到 npm registry
- ✅ **Conventional Commits**: 支持语义化提交

## 技术栈

- **Monorepo 工具**: Lerna
- **包管理**: pnpm workspaces
- **构建工具**: microbundle (packages, 基于 Rollup), Vite (apps)
- **语言**: TypeScript
- **框架**: React

