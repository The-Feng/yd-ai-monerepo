# 发布指南

本指南说明如何将包发布到本地 registry (`http://localhost:4873/`)。

## 前置条件

1. **确保本地 registry 运行**
   ```bash
   # 如果使用 Verdaccio
   verdaccio
   
   # 或使用其他本地 registry 工具
   # 确保 http://localhost:4873/ 可访问
   ```

2. **构建所有包**
   ```bash
   pnpm build
   ```

3. **确保已登录（如果需要）**
   ```bash
   npm login --registry=http://localhost:4873/
   ```

## 发布流程

### 1. 检查变更的包

```bash
# 查看哪些包有变更
pnpm changed

# 查看具体差异
pnpm diff
```

### 2. 版本管理

Lerna 使用独立版本模式（`independent`），每个包可以有自己的版本号。

#### 自动版本（推荐）

使用 Conventional Commits 自动确定版本：

```bash
# 自动根据提交信息确定版本
pnpm version

# 或使用 Lerna 命令
lerna version
```

提交信息格式：
- `feat:` → 小版本 (minor)
- `fix:` → 补丁版本 (patch)
- `BREAKING CHANGE:` → 主版本 (major)

#### 手动版本

```bash
# 更新特定包的版本
lerna version 1.1.0 --force-publish=@yd-hooks/core

# 更新所有包的版本
lerna version 1.1.0
```

### 3. 发布包

**重要提示**: Lerna 8.x 的 `publish` 命令不支持 `--scope` 选项。如果需要发布特定包，需要先手动更新该包的版本号。

#### 方法 1: 发布所有变更的包（推荐）

```bash
# 1. 先构建所有包
pnpm build

# 2. 查看哪些包有变更
pnpm changed

# 3. 发布所有变更的包（会自动更新版本并发布）
pnpm publish

# 或直接使用 lerna
pnpm exec lerna publish
```

#### 方法 2: 发布特定包

由于 Lerna 8.x 不支持 `--scope`，需要手动操作：

```bash
# 1. 先构建特定包
pnpm --filter @yd-hooks/core build

# 2. 手动更新该包的版本号（编辑 packages/yd-hooks/package.json）
# 例如：将 version 从 "1.0.0" 改为 "1.0.1"

# 3. 使用 from-package 模式发布（只发布已更新版本的包）
pnpm exec lerna publish from-package

# 或者发布所有包（Lerna 会跳过未变更的包）
pnpm exec lerna publish
```

#### 方法 3: 发布 Canary 版本

```bash
# 发布 canary 版本（用于测试）
pnpm publish:canary

# 或
pnpm exec lerna publish --canary
```

#### 方法 4: 从 package.json 发布

如果包已经更新了版本号，可以直接发布：

```bash
# 发布所有已更新版本的包
pnpm exec lerna publish from-package
```

#### 方法 5: Dry-run（测试）

发布前先测试，不会真正发布：

```bash
# 注意：Lerna 8.x 不支持 --dry-run，但可以先查看会发布什么
pnpm changed
```

## 发布配置

### Registry 配置

- `.npmrc`: 设置默认 registry 为 `http://localhost:4873/`
- `lerna.json`: 发布时使用该 registry
- 各包的 `package.json`: 包含 `publishConfig.registry`

### 发布文件

每个包的 `package.json` 中配置了 `files` 字段，只发布以下文件：
- `dist/` - 构建产物
- `README.md` - 文档

## 常见问题

### 1. 发布失败：包已存在

如果包已存在，需要更新版本号：

```bash
# 更新版本
lerna version patch  # 或 minor, major

# 然后发布
pnpm publish
```

### 2. 跳过某些包

如果某个包不需要发布（如 demo-app），已在 `lerna.json` 中配置忽略。

### 3. 发布到不同的 registry

临时发布到其他 registry：

```bash
lerna publish --registry https://registry.npmjs.org/
```

## 验证发布

发布后，可以在浏览器访问 `http://localhost:4873/` 查看已发布的包。

或使用命令：

```bash
npm view @yd-hooks/core --registry=http://localhost:4873/
```

## 使用已发布的包

在其他项目中使用：

```bash
# 安装
npm install @yd-hooks/core --registry=http://localhost:4873/

# 或在 .npmrc 中配置
registry=http://localhost:4873/
```

