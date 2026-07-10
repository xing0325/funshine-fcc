# Builder 公共约定（每个 builder prompt 内联此块）

## 技术栈与硬规则
- Next.js 16 App Router + React 19 + TypeScript strict + Tailwind v4；交互组件加 "use client"
- 组件放 `src/components/<Name>.tsx`，命名导出；内容自包含（不接 props，硬编码原站内容）
- 样式用 Tailwind 工具类 + 任意值（如 `text-[15px] leading-[1.5]`）；复杂动画/伪元素可在组件内用 `<style jsx>` 不行——用全局注入？不。**统一：复杂 keyframes 写进组件同名 .css 文件并在组件内 import**（Tailwind v4 兼容普通 CSS import）
- 颜色一律用 CSS 变量: `var(--dd-red)` #C3482D / `var(--dd-cream)` #FFF7F0 / `var(--dd-yellow)` #FFC701 / `var(--dd-maroon)` #4D0E00
- 字体: 原站 arboria → `font-family: var(--font-arboria), sans-serif`；campaign-serif → `var(--font-campaign), serif`（Tailwind 类 `font-sans` / `font-display` 也已映射）
- 描边字工具类已有: `.text-outline-red` / `.text-outline-yellow` / `.text-outline-cream`（透明填充+1px描边）
- 图片视频用原生 `<img>` / `<video>`（项目走静态导出，不用 next/image）
- **资产映射**: 原站 `https://cdn.prod.website-files.com/<hash>/<文件名>` → `/images/<文件名>`（文件已在 public/images/，哈希文件名原样）；视频（deena-e.github.io/* 和 website-files 的 mp4/webm）→ `/videos/<文件名>`
- 禁止任何外部网络引用（CDN/Google Fonts/原站 URL 都不行——用户在中国，外链=白屏。这正是本次克隆的教训）

## 权威参照（本地文件，必读）
- 你的 section 原版 HTML: `docs/research/components/<你的>.source.html` —— DOM 结构/类名/文案/资产引用的唯一真源
- 原站完整 CSS: `docs/research/dabbledee-webflow.css` —— 用你 source.html 里出现的类名去查精确规则（含 hover/媒体查询/keyframes）。**值以此文件为准，不要猜**
- 设计令牌: docs/research/DESIGN_TOKENS.md（已在 prompt 里给你要点）

## 响应式
- 断点跟原站 CSS 的媒体查询: 991px / 767px / 479px（Webflow 默认）
- 你只需实现你的 section 在各断点的样式（从 CSS 文件的 @media 块里查你的类）

## 入场动画约定（slide 组件）
- 引擎会在当前 slide 的根元素上加 `is-active` class（对应原站 .swiper-slide-active）
- 原站行为: slide 激活时 [data-splitting] 文本逐字上浮进场、[move-up]/[move-down] 元素按 --data-delay 级联位移
- 实现: 标题文字在 React 里 split 成 <span>（保留空格），CSS 里 `.is-active .char { animation: charUp ... }` 配 `animation-delay: calc(var(--ci) * 30ms)` 之类，参数从 webflow CSS 的对应 keyframes 抄
- 未激活时字符透明,激活后进场——确保来回切换可重放（animation 由 .is-active 触发）

## 完成标准
- `npx tsc --noEmit` 通过（你必须自己跑）
- 不跑 npm run dev / build（编排者统一跑）
- 返回: 创建的文件清单 + 实现要点 + 任何与原站有出入的地方（如实报告）
