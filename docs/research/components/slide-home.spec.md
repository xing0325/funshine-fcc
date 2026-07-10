# Home Slide Specification

## Overview
- Target: `src/components/slides/HomeSlide.tsx` + HomeSlide.css
- Interaction model: static + 入场逐字动画 + 循环背景视频
- 原版结构: slide-home.source.html（结构/文案/资产以此为准）

## 布局（100vh × 100vw, 红底 slide）
- 背景层: 置景摄影图 /images/65f96cc262e4ac5d8f996954_home-page.jpeg 全屏 cover（object-fit: cover）
- 背景视频层: div.home-slide-bg.hide.w-background-video —— 无缝循环视频 /videos/65fd24b60bdf4944200a935f_Home_Video_high_seamless-transcode.mp4(+webm), autoplay muted loop playsInline, poster 用 …seamless-poster-00001.jpg
  - 原站桌面用视频、静态图为兜底/移动(查 CSS .home-slide-bg 与 .hide 在各断点的 display)
- 顶部星星行: star-serise-wpr —— 一排八角星图(查 source.html 引用的 star 图文件)横向重复排列,间距均匀,可能有闪烁动画(查 CSS)
- 内容容器(垂直分布,左对齐,约在视口中带):
  1. h1 花体行: campaign-serif italic 500, 44.64px/60.26px, #FFC701 —— data-splitting 逐字入场
  2. 巨型描边行: BRANDING • COACHING • FINE ART（3 词间圆点分隔）—— arboria 900 uppercase, 描边黄(.text-outline-yellow), 尺寸查 CSS(视觉约 90-100px/1440), 同样逐字入场
  3. SCROLL ↑↓ OR USE ←→ KEYS 提示行: 15px 500 uppercase #FFC701, 箭头是字符或小图(查 source.html)

## States & Behaviors
- .is-active 时: h1/大字/提示行按 char 级联上浮进场(参数抄 webflow CSS)
- 视频常播(不依赖 active)

## 责任边界
- 只做 slide 内部; 外层 swiper-slide 壳由引擎提供
- 根元素类: `home-slide`(留 hook)——引擎映射 hash "#home"
