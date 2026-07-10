# Fine Art Slide Specification

## Overview
- Target: `src/components/slides/FineArtSlide.tsx` + FineArtSlide.css
- Interaction model: click-driven（点作品图开 Fancybox 画廊灯箱）
- 原版结构: slide-fine-art.source.html

## 布局（奶白底 slide）
- 顶部区: 大标题区域(查 source.html——FINE ART 描边标题 + 可能的花体副行,同 coaching 屏的头部模式)
- 3 张作品卡横排(slick 轮播壳,3 张时箭头隐藏→克隆可直接 flex 三列,保留左右箭头结构但默认隐藏):
  - 卡 = 作品图(1px 红描边,固定高约 315px 视觉) + 下方四行文字(标题 加粗红 / 材质 / 尺寸 / 年份,红色,行距紧)
  - 作品与文案(从 source.html 原样取): Botanical Babe(oil on canvas) + Tea Table ×2(mycelium 等)
  - 图: /images/ 下对应哈希文件(source.html 里查)
- slider 箭头图: alider-arrow-img 类,/images/…(左右箭头 svg/png)

## States & Behaviors
1. 点作品图 → Fancybox 5 灯箱(npm @fancyapps/ui 已装,import { Fancybox } from "@fancyapps/ui" + 其 CSS):
   - 三图同组(data-fancybox="artgallery"), caption=作品标题
   - 默认工具栏(计数/缩略图条/放大/关闭) —— Fancybox 默认配置即可,视觉已接近原站
2. 卡片/图 hover: 查 CSS(.artwork-img / .fancy_div :hover)
3. .is-active 入场: 标题逐字 + 卡片级联上浮(查 CSS [move-up] 相关)

## 注意
- @fancyapps/ui 的 CSS 从 node_modules import("@fancyapps/ui/dist/fancybox/fancybox.css")——本地包,无外链
