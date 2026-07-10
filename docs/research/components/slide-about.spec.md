# About Slide Specification

## Overview
- Target: `src/components/slides/AboutSlide.tsx` + AboutSlide.css
- Interaction model: static + 入场动画
- 原版结构: slide-about.source.html

## 布局（红底 slide）
- 顶部标题区(查 source.html: ABOUT 相关头部,含右上角两颗星星装饰的细框线结构)
- 左列(约 55% 宽): 富文本自述 3 段(#FFC701 金黄, 15px/1.7, 关键词 <strong>/<em> 混排)+ 底部两链接行: Download CV(下划线,href 查 source.html 的 CV 文件链接) 与 Privacy Policy | Deena Creative Inc.
  - 文案从 source.html 原样取(勿改写)
- 右侧: 大幅单线线稿插画(卷发女子+烟浪纹), /images/ 对应文件查 source.html——绝对定位贴右下,宽约 45%

## States & Behaviors
- .is-active: 文本块/插画级联进场(查 CSS [move-up])
- 链接 hover: 查 CSS(a:hover 下划线/变色)
