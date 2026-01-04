# wbo4.xyz

一个极简的个人主页/链接导航站点，支持中英文切换与明暗主题切换，内容由本地 JSON 配置驱动。

## 功能特性

- 中英文切换：语言文案集中在 `data/translations.json`
- 明暗主题切换：自动读取系统主题偏好并持久化到本地存储
- 可配置链接列表：链接数据集中在 `data/links.json`
- 纯前端静态页面，适合部署到任意静态/Node 托管环境

## 技术栈

- Next.js（App Router）
- React
- TypeScript
- Tailwind CSS（通过 PostCSS 集成）

## 快速开始

安装依赖：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

生产构建与启动：

```bash
pnpm build
pnpm start
```

代码检查：

```bash
pnpm lint
```

默认开发地址：`http://localhost:3000`

## 项目结构

```text
app/
  page.tsx            # 页面入口
data/
  links.json          # 链接列表数据
  translations.json   # 中英文文案
public/               # 静态资源
```

## 配置说明

### 链接数据

编辑 `data/links.json`，每条链接包含：

- `id`: 唯一标识
- `label`: 中英文标题
- `href`: 跳转地址
- `display`: 展示用域名/短文本

### 文案与站点信息

编辑 `data/translations.json`，可修改：

- 站点名称（`name`）
- ICP 备案号展示（`icp`）
- 语言/主题按钮文本
- `<html lang>` 属性

## 开发提示

- 页面逻辑在 `app/page.tsx` 中实现
- 语言与主题使用 `localStorage` 持久化，并通过事件触发刷新
