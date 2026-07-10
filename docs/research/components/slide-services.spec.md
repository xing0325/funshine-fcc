# Services Slide Specification

## Overview
- Target: `src/components/slides/ServicesSlide.tsx` + ServicesSlide.css
- Interaction model: static（仅 hover 与入场）
- 原版结构: slide-services.source.html

## 布局（奶白底 slide, 红色系）
- 头部带: 左=SERVICES 描边标题结构(查 source.html) 右=红底矩形块内嵌白药丸钮 CONTACT ME(mailto,查 source.html href)
- 3 张等宽价目卡(1px 红描边,大圆角 ~24px,内部三段式):
  1. 标题带(浅粉底 #F9E9E4 近似,查 CSS;下缘 1px 红线): HARD WORK / BRANDING & REBRANDING / CREATIVE STRATEGY(arboria 700 uppercase ~22px 居中)
  2. 内容区(奶白底): 分组小标题(18px 700) + ◆ 前缀点列(14px,菱形 bullet 用图 /images/65f0062dcf97b67292e44e5d_point-icon.png 或 CSS 里的 point-icon)——各组内容从 source.html 原样取
  3. 价格底带(浅粉底,上缘 1px 红线): $110/ Hour / $10,000+ / $150/ Hour(粗体居中)
- 卡片高度拉齐(flex stretch)

## States & Behaviors
- .is-active 入场: 标题逐字 + 三卡级联上浮
- 卡/按钮 hover: 查 CSS
