# Loader（进场屏）Specification

## Overview
- Target: `src/components/PageLoader.tsx`（+ 同目录 PageLoader.css）
- Interaction model: time-driven(入场) + click-driven(ENTER 退场)
- 原版结构: docs/research/components/loader.source.html

## 视觉
- 全屏 fixed 遮罩 z-1000, 底色 rgba(77,14,0,.8)（叠在红 body 上呈深锈红；克隆可直接用实色 #58180a 近似或同款 rgba 叠加）
- 竖直居中列: loader-icon(∞箭头图标 /images/65eff50be1bfcfdbe6c4a25d_loader-icon.png, 宽约 100px) → 两行文案 → ENTER 药丸按钮
- 文案(金黄 #FFC701): 第一行 campaign-serif 常规;第二行 bold italic —— 逐字拆分动画
- ENTER 按钮: 透明底 + 1px #FFC701 描边药丸(radius ~50px), 文字 #FFC701 15px 500, 宽 ~243px 高 ~44.5px, hover 反色(查 CSS .home-enter-btn:hover)

## States & Behaviors
1. 挂载后 100ms 加 `.active` → 图标 [move-down] 从上滑入、文字逐字上浮(char 级联)、按钮 [move-up] 从下滑入（keyframes 与延迟从 webflow CSS 的 .page-loader.active 规则块抄）
2. 点 ENTER: opacity → 0 (transition 1s), 1s 后 display none + sessionStorage.setItem("loader","hide") + 通知引擎(onEnter 回调 prop)
3. sessionStorage.loader === "hide" 时组件直接不渲染（由引擎判断,组件也可自检）

## Props 接口
```ts
export function PageLoader({ onEnter }: { onEnter?: () => void })
```

## Assets
- /images/65eff50be1bfcfdbe6c4a25d_loader-icon.png
