# Coaching Slide Specification

## Overview
- Target: `src/components/slides/CoachingSlide.tsx` + CoachingSlide.css
- Interaction model: click-driven（手风琴开合 + Read More）
- 原版结构: slide-coaching.source.html

## 布局（奶白底 slide, 全部红色系文字）
- 头部带: 左=COACHING 描边大标题(arboria 900 uppercase 40px, .text-outline-red) 中=Need coaching? 花体(campaign-serif italic) 右=红底矩形块内嵌白底药丸钮 SCHEDULE CALL(→calendly,查 source.html)
- 左列: 3 节手风琴 .each-faq(1px 红描边圆角框,间距~12px):
  - .accrd-hdr: 标题(15px 400) + 右侧下箭头 icon /images/…down-caret(查 source.html 文件名) —— 点击开合
  - .accrdn-cntnt: 内容(14px,富文本段落/加粗前缀点列)
  - 三节: WHAT IS CREATIVE COACHING? / WHO BENEFITS MOST?(默认展开) / MY BACKGROUND —— 内容从 source.html 原样取
- 右列(上下三块):
  1. 价目表(1px 红描边圆角,3 列): 表头行粗体 Free|$120|$300 $̶3̶6̶0̶(删除线) + 次行说明(20 min intro call.|Individual Sessions|3 Sessions) + 底行斜体 *Sliding scale available.（浅粉底 #F9E9E4 近似,查 CSS）
  2. WHAT WOULD A SESSION LOOK LIKE? 卡: 标题(粗体 18px) + 两段正文 + Read More…(点击展开更多内容,查 source.html 隐藏部分)
  3. 院校 logo 墙(浅粉底圆角): RISD/Columbia/Parsons/UCLA 4 个 logo 图(/images/,查 source.html) + 底部斜体注释行

## States & Behaviors
1. 手风琴: 点 header 切换本节(原站允许多节同开?查 CSS/交互——按独立 toggle 实现,内容区 max-height 过渡 ~0.3s,caret 旋转 180°)
2. Read More: 点击展开隐藏段落(source.html 里找完整文本)
3. .is-active 入场: 标题逐字 + 各卡级联

## 已知坑
- down-caret icon 原站在国内裂图——确认 /images/ 里有该文件(下载清单包含);若缺,用内联 SVG 画同款下箭头
