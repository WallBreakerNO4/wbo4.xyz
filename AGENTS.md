# Repository Guidelines

## 项目结构与模块组织
- `app/`：Next.js App Router 入口与页面逻辑（`layout.tsx`、`page.tsx`、`globals.css`）。
- `data/`：站点内容配置（`links.json`、`translations.json`）。
- `public/`：静态资源；`out/` 为构建产物（不要手改）。
- 配置集中在 `next.config.ts`、`tsconfig.json`、`eslint.config.mjs`、`postcss.config.mjs`。

## 构建、测试与开发命令
```bash
pnpm dev    # 本地开发
pnpm build  # 生成静态导出到 out/
pnpm start  # 本地预览（需要先 build）
pnpm lint   # ESLint 检查
```
使用 pnpm 作为包管理器；默认开发地址是 `http://localhost:3000`。

## 代码风格与命名约定
- TypeScript + React；两空格缩进，双引号与分号保持一致。
- Tailwind CSS 通过 `className` 组织样式，避免行内样式。
- `links.json` 的 `id` 使用小写短词；`translations.json` 只维护 `zh`/`en` 两个键。

## 测试指南
当前未配置测试框架与覆盖率门槛；提交前以 `pnpm lint` 与手动回归为主。
手动检查重点：语言切换、主题切换、链接跳转、移动端布局。

## 提交与 Pull Request 指南
- 提交信息优先使用 Conventional Commits（如 `feat:`、`fix:`），也接受简短中文说明；保持单行、直述改动。
- PR 需包含：改动概述、影响范围、必要的截图（界面改动）、相关 issue/任务链接。

## 配置与内容提示
内容更新主要通过 `data/links.json` 与 `data/translations.json` 完成；不要在代码中硬编码文案。
静态导出由 `next.config.ts` 的 `output: "export"` 控制，构建后产物位于 `out/`。
