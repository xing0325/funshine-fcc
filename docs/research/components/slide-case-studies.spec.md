# Case Studies Slide Specification

## Overview
- Target: `src/components/slides/CaseStudiesSlide.tsx` + CaseStudiesSlide.css
- Interaction model: click-driven（整卡链接）+ 视频常播
- 原版结构: slide-case-studies.source.html

## 布局（奶白底 slide）
- 顶部标题区(查 source.html: CASE STUDIES 描边标题等头部元素)
- 2×2 网格,外框 1px 红线(整个网格区有边框,查 CSS .casestudies 容器类):
  每格 = 药丸形视频卡 + 下方两行说明
  - 药丸卡: 超大圆角(borderRadius 视觉≈高度一半,查 CSS .casestudy-card-img-wpr), 1px 红描边, 内部 <video> autoplay muted loop playsInline 撑满 cover
  - 视频: /videos/tc-cover.mp4|webm、ettitude-cover、js-cover、lj-cover(lj 只有 webm,mp4 缺——video 里 webm source 在前,mp4 兜底可省)
  - 文字行(红色): 左列=品牌名(500) + 行业(400);右列=职位 + 年份(右对齐)——从 source.html 原样取(True Classic/Ettitude/Jordin Sparks/Lauren Jauregui 四组)
- 整卡外链 a → /case-study/<slug>（子页本期不建——链接保留原路径,点了 404 没关系,或 href="#" 加 TODO 注释,选保留原路径）

## States & Behaviors
- 卡 hover: 查 CSS(.casestudy-card-link:hover / img-wpr:hover——可能缩放或描边加深)
- .is-active 入场: 标题逐字 + 卡级联(查 CSS)

## 注意
- 视频加载失败时保持药丸空壳描边(原站在国内就这样)——无需 poster
